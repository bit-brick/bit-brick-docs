# UART

### Overview

This document mainly explains the usage and debugging methods of the UART in the Rockchip series chips, including two different usage scenarios: UART as a general serial port and as a console.

### Product Version

### Target Audience

This document (guide) is mainly intended for the following engineers:
- Technical Support Engineers
- Software Development Engineers

## Features

Rockchip UART (Universal Asynchronous Receiver/Transmitter) is based on the 16550A serial port standard. The complete module supports the following features:
- Supports 5, 6, 7, 8 bits data bits.
- Supports 1, 1.5, 2 bits stop bits.
- Supports odd and even parity, does not support mark and space parity.
- Supports receive FIFO and transmit FIFO, generally 32 bytes or 64 bytes.
- Supports up to 4M baud rate. The actual supported baud rate depends on the chip clock division strategy.
- Supports interrupt transfer mode and DMA transfer mode.
- Supports hardware auto flow control, RTS+CTS.

Note: The actual UART features supported in the chip should be based on the description in the UART chapter of the chip manual. Some UART features may be appropriately trimmed.

---

## As a General Serial Port

### 2.1 Driver Path

In Linux kernel 3.10, the following driver file is used:
- `drivers/tty/serial/rk_serial.c`

In Linux kernel 4.4 and Linux kernel 4.19, the 8250 universal serial port driver is used. The main driver files are as follows:
- `drivers/tty/serial/8250/8250_core.c` # 8250 serial driver core
- `drivers/tty/serial/8250/8250_dw.c` # Synopsis DesignWare 8250 serial driver
- `drivers/tty/serial/8250/8250_dma.c` # 8250 serial DMA driver
- `drivers/tty/serial/8250/8250_port.c` # 8250 serial port operations
- `drivers/tty/serial/8250/8250_early.c` # 8250 serial early console driver

### 2.2 menuconfig Configuration

In different versions of the Linux kernel, UART-related menuconfig configurations are all under the following path options. The options are very detailed and will not be expanded here:

```
Device Drivers --->
  Character devices --->
    Serial drivers --->
```

It is recommended to use the default UART configuration provided in the Rockchip SDK.

### 2.3 dts Configuration

In different versions of the Linux kernel, the UART dts configuration is similar to the following typical configuration. The following typical configuration takes the Linux kernel 4.19 RK3568 chip as an example, in `rk3568.dtsi`:

The board-level dts configuration of UART only allows modification of the following parameters:
- `dma-names`:
  - `"tx"` Enable tx dma
  - `"rx"` Enable rx dma
  - `"!tx"` Disable tx dma
  - `"!rx"` Disable rx dma
- `pinctrl-0`:
  - `&uart1m0_xfer` Configure tx and rx pins as iomux group 0
  - `&uart1m1_xfer` Configure tx and rx pins as iomux group 1
  - `&uart1m0_ctsn` and `&uart1m0_rtsn` Configure hardware auto flow control cts and rts pins as iomux group 0
  - `&uart1m1_ctsn` and `&uart1m1_rtsn` Configure hardware auto flow control cts and rts pins as iomux group 1
- `status`:
  - `"okay"` Enable
  - `"disabled"` Disable

For example, to enable RK3568 UART1, enable dma, and configure the tx, rx, cts, and rts of UART1 with hardware auto flow control to iomux group 0, the configuration in the board-level dts is as follows:

```dts
uart1: serial@fe650000 {
    compatible = "rockchip,rk3568-uart", "snps,dw-apb-uart";
    reg = <0x0 0xfe650000 0x0 0x100>;
    interrupts = <GIC_SPI 117 IRQ_TYPE_LEVEL_HIGH>;
    clocks = <&cru SCLK_UART1>, <&cru PCLK_UART1>;
    clock-names = "baudclk", "apb_pclk";
    reg-shift = <2>;
    reg-io-width = <4>;
    dmas = <&dmac0 2>, <&dmac0 3>;
    dma-names = "tx", "rx";
    pinctrl-names = "default";
    pinctrl-0 = <&uart1m0_xfer>;
    status = "disabled";
};
&uart1 {
    dma-names = "tx", "rx";
    pinctrl-names = "default";
    pinctrl-0 = <&uart1m0_xfer &uart1m0_ctsn &uart1m0_rtsn>;
    status = "okay";
};
```

Note: The operation of `pinctrl-0` for hardware auto flow control is only to configure the pin iomux. The actual enabling of hardware auto flow control is done in the UART driver. If hardware auto flow control is not needed, the iomux configuration of the cts and rts pins can be removed.

### 2.4 Baud Rate Configuration

UART baud rate = working clock source / internal division factor / 16. When the working clock source is directly provided by a 24M crystal oscillator, the UART will use an internal clock division factor to obtain the required baud rate. When the working clock source is provided by the CRU module through PLL division, the UART baud rate is generally 1/16 of the working clock source. The actual configurable baud rate of UART and the stability of data transmission at this baud rate are mainly determined by the UART working clock division strategy in software.

Currently, the UART driver will automatically obtain the required working clock frequency based on the configured baud rate. The working clock frequency of UART can be queried using the following command:

```bash
cat /sys/kernel/debug/clk/clk_summary | grep uart
```

Rockchip UART ensures stable support for common baud rates such as 115200, 460800, 921600, 1500000, 3000000, 4000000. For some special baud rates, it may be necessary to modify the working clock division strategy to support them.

### 2.5 Using DMA

The UART DMA transfer mode only significantly reduces CPU load when the data volume is large. Generally, compared to using interrupt transfer mode, using DMA transfer mode for UART does not necessarily improve data transfer speed. On the one hand, current CPU performance is very high, and the transfer bottleneck lies in peripherals. On the other hand, starting DMA consumes additional resources, and due to the uncertain length of UART data, DMA transfer efficiency may decrease.

Therefore, it is generally recommended to use the default interrupt transfer mode, which will have the following print:

In scenarios where DMA channel resources are tight, consider turning off TX DMA transfer, which will have the following print:

```
failed to request DMA, use interrupt mode
got rx dma channels only
```

### 2.6 Using Hardware Auto Flow Control

When using hardware auto flow control for UART, ensure that the UART driver enables the hardware auto flow control function and that the cts and rts flow control pins have been switched to iomux in the dts. It is recommended to use hardware auto flow control, i.e., four-wire UART, in high baud rate (1.5M baud rate and above) and large data volume scenarios.

### 2.7 Using Serial Port to Wake Up the System

The serial port wake-up system function keeps the serial port open during system standby and sets the serial port interrupt as a wake-up source. To use it, add the following parameter in the dts:

```dts
&uart1 {
    wakeup-source;
};
```

Note: The serial port wake-up system also requires modifications to the trust firmware. Please contact Rockchip for support.

### 2.8 Device Registration

After enabling UART in the dts, the corresponding print can be seen in the system startup log, indicating that the device is registered normally:

General serial port devices will be numbered according to the aliases in the dts and registered as ttySx devices. The aliases in the dts are as follows:

```dts
aliases {
    serial0 = &uart0;
    serial1 = &uart1;
    serial2 = &uart2;
    serial3 = &uart3;
    ......
};
```

If you need to register uart3 as ttyS1, you can make the following modifications:

```dts
aliases {
    serial0 = &uart0;
    serial1 = &uart3;
    serial2 = &uart2;
    serial3 = &uart1;
    ......
};
```

---

## As a Console

### 3.1 Driver Path

Rockchip UART as a console uses the fiq_debugger process. The Rockchip SDK generally configures uart2 as the ttyFIQ0 device. The following driver files are used:

- `drivers/staging/android/fiq_debugger/fiq_debugger.c` # Driver file
- `drivers/soc/rockchip/rk_fiq_debugger.c` # Implementation for platforms after kernel 4.4
- `arch/arm/mach-rockchip/rk_fiq_debugger.c` # Implementation for kernel 3.10 platforms

### 3.2 menuconfig Configuration

In different versions of the Linux kernel, fiq_debugger-related menuconfig configurations are all under the following path options:

```
Device Drivers --->
  [*] Staging drivers --->
    Android --->
```

It is recommended to use the default configuration provided in the Rockchip SDK.

### 3.3 dts Configuration

Taking Linux kernel 4.19 RK3568 as an example, the fiq_debugger node configuration in the dts is as follows. Since fiq_debugger and general serial ports are mutually exclusive, the corresponding general serial port uart node must be disabled after enabling the fiq_debugger node.

The following parameters are explained:
- `rockchip,serial-id`: UART number used. Modifying serial-id to a different UART will also register the fiq_debugger device as ttyFIQ0.
- `rockchip,irq-mode-enable`: Configure as 1 to use irq interrupt, configure as 0 to use fiq interrupt.
- `interrupts`: Auxiliary interrupt configuration, keep the default.

```dts
fiq-debugger {
    compatible = "rockchip,fiq-debugger";
    rockchip,serial-id = <2>;
    rockchip,wake-irq = <0>;
    /* If enable uart uses irq instead of fiq */
    rockchip,irq-mode-enable = <1>;
    rockchip,baudrate = <1500000>; /* Only 115200 and 1500000 */
    interrupts = <GIC_SPI 252 IRQ_TYPE_LEVEL_LOW>;
    pinctrl-names = "default";
    pinctrl-0 = <&uart2m0_xfer>;
    status = "okay";
};
&uart2 {
    status = "disabled";
};
```

### 3.4 parameter.txt Configuration

If using Linux kernel 3.10 and Linux kernel 4.4, ensure that the parameter.txt file contains the following command to specify the console:

```dts
chosen: chosen {
    bootargs = "earlycon=uart8250,mmio32,0xfe660000 console=ttyFIQ0";
};
```

---

## Driver Debugging

Rockchip UART debugging provides a test program `ts_uart.uart` and two test files `send_0x55` and `send_00_ff`. This program can be obtained from Rockchip FAE.

Use the adb tool to place the test program in an executable path on the development board. The following places it in the data path:

Modify the test program permissions on the development board:

Use the following command to get program help:

```bash
adb root
adb remount
adb push ts_uart.uart /data
adb push send_0x55 /data
adb push send_00_ff /data
su
chmod +x /data/ts_uart.uart
console:/ # ./data/ts_uart.uart
```

```
Use the following format to run the HS-UART TEST PROGRAM
ts_uart v1.1
For sending data:
./ts_uart <tx_rx(s/r)> <file_name> <baudrate> <flow_control(0/1)> <max_delay(0-100)> <random_size(0/1)>
tx_rx : send data from file (s) or receive data (r) to put in file
file_name : file name to send data from or place data in
baudrate : baud rate used for TX/RX
flow_control : enables (1) or disables (0) Hardware flow control using RTS/CTS lines
max_delay : defines delay in seconds between each data burst when sending. Choose 0 for continuous stream.
random_size : enables (1) or disables (0) random size data bursts when sending. Choose 0 for max size.
max_delay and random_size are useful for sleep/wakeup over UART testing. ONLY meaningful when sending data
Examples:
Sending data (no delays)
ts_uart s init.rc 1500000 0 0 0 /dev/ttyS0
loop back mode:
ts_uart m init.rc 1500000 0 0 0 /dev/ttyS0
receive, data must be 0x55
ts_uart r init.rc 1500000 0 0 0 /dev/ttyS0
```

### 4.1 Testing Transmission

The command for testing transmission is as follows. `send_0x55` and `send_00_ff` are the files to be sent:

```bash
./data/ts_uart.uart s ./data/send_0x55 1500000 0 0 0 /dev/ttyS1
./data/ts_uart.uart s ./data/send_00_ff 1500000 0 0 0 /dev/ttyS1
```

Successful transmission can be verified by connecting a USB-to-UART adapter to the PC and using a serial debugging tool on the PC.

### 4.2 Testing Reception

The command for testing reception is as follows. `receive_0x55` is the file to receive:

```bash
./data/ts_uart.uart r ./data/receive_0x55 1500000 0 0 0 /dev/ttyS1
```

You can use a serial debugging tool on the PC to send data. The test program will automatically detect it. If it detects U (0x55), the reception is correct. If it detects other characters, it will print the hexadecimal ASCII code value, which can be compared to check if the reception is correct.

### 4.3 Testing Internal Loopback

The command for testing internal loopback is as follows:

```bash
./data/ts_uart.uart m ./data/send_00_ff 1500000 0 0 0 /dev/ttyS1
```

Press Ctrl+C to stop the test. The following log will be observed at the end. Compare the sent and received data to see if they match:

```
Sending data from file to port...
send:1172, receive:1172 total:1172 # Data sent and received match, test successful
send:3441, receive:3537 total:3441 # Data sent and received do not match, test failed
```

If the test fails, it indicates that there is an issue with the current serial port or another program is also using the same serial port. Use the following command to check which programs have opened this serial port:

```bash
lsof | grep ttyS1
```

### 4.4 Testing Flow Control

To verify CTS, first manually pull the CTS pin high, then use the following command to send data:

```bash
./data/ts_uart.uart s ./data/send_0x55 1500000 1 0 0 /dev/ttyS1
```

When the CTS pin is pulled high, data transmission is blocked. When the CTS pin is released to low, the blocked data is sent.

To verify RTS, measure whether the RTS pin can be pulled high and low normally.