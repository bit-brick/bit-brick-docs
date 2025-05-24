# CAN

## 1. CAN Driver

### 1.1 Driver Files

Driver file locations:

- **For RV1126/RV1109**: `drivers/net/can/rockchip/rockchip_can.c`
- **For RK3568/RK3588**: `drivers/net/can/rockchip/rockchip_canfd.c`
- **For RK3562**: `drivers/net/can/rockchip/rk3562_canfd.c`

### 1.2 DTS Node Configuration

Main parameters:

```dts
interrupts = <GIC_SPI 100 IRQ_TYPE_LEVEL_HIGH>;
```

After conversion, an interrupt signal is generated.

- **Clock Frequency**: Can be modified. If the CAN bitrate is 1M, it is recommended to set the CAN clock to 300M for more stable signals. For bitrates below 1M, set the clock to 200M. The CAN clock is best set to an even multiple of the bitrate for more accurate frequency division.
- **compatible**:
    - For RV1126/RV1109 use `"rockchip,can-1.0"`.
    - For RK3568 use `"rockchip,rk3568-can-2.0"`.
    - For RK3588 use `"rockchip,can-2.0"`.
    - For RK3562 use `"rockchip,rk3562-can"`.
- **pinctrl**:
    ```dts
    assigned-clocks = <&cru CLK_CAN>;
    assigned-clock-rates = <200000000>;
    clocks = <&cru CLK_CAN>, <&cru PCLK_CAN>;
    clock-names = "baudclk", "apb_pclk";
    .compatible = "rockchip,can-1.0",
    ```
    Configure the iomux of can_h and can_l for CAN function.

### 1.3 Kernel Configuration

```dts
&can {
    pinctrl-names = "default";
    pinctrl-0 = <&canm0_pins>;
    status = "okay";
};
```

- **Symbol**:
    ```plaintext
    Symbol: CAN_ROCKCHIP [=y] 
    | Type : tristate 
    | Prompt: Rockchip CAN controller 
    | Location: 
    | -> Networking support (NET [=y]) 
    | -> CAN bus subsystem support (CAN [=y]) 
    | -> CAN Device Drivers 
    | -> Platform CAN drivers with Netlink support (CAN_DEV [=y]) 
    | Defined at drivers/net/can/rockchip/Kconfig:1 
    | Depends on: NET [=y] && CAN [=y] && CAN_DEV [=y] && ARCH_ROCKCHIP [=y]
    ```

    ```plaintext
    Symbol: CANFD_ROCKCHIP [=y] 
    | Type : tristate 
    | Prompt: Rockchip CANFD controller 
    | Location: 
    | -> Networking support (NET [=y]) 
    | -> CAN bus subsystem support (CAN [=y]) 
    | -> CAN Device Drivers 
    | -> Platform CAN drivers with Netlink support (CAN_DEV [=y]) 
    | Defined at drivers/net/can/rockchip/Kconfig:10 
    | Depends on: NET [=y] && CAN [=y] && CAN_DEV [=y] && ARCH_ROCKCHIP [=y]
    ```

    ```plaintext
    CONFIG_CAN_RK3562=y
    ```

---

## 2. CAN Communication Test Tools

`canutils` is a commonly used CAN communication test tool package, containing 5 independent programs: `canconfig`, `candump`, `canecho`, `cansend`, `cansequence`. The functions of these programs are briefly described as follows:

- **canconfig**: Used to configure CAN bus interface parameters, mainly baud rate and mode.
- **candump**: Receives data from the CAN bus interface and prints it in hexadecimal to standard output, or can output to a specified file.
- **canecho**: Resends all data received from the CAN bus interface back to the CAN bus interface.
- **cansend**: Sends specified data to the specified CAN bus interface.
- **cansequence**: Automatically sends incrementing numbers to the specified CAN bus interface, can also specify receive mode and check the received incrementing numbers.
- **ip**: Configuration for CAN baud rate, functions, etc.

**Note**: `busybox` also integrates the `ip` tool, but the `ip` in `busybox` is a stripped-down version and does not support CAN operations. Please confirm the version of the `ip` command (`iproute2`) before use.

There are detailed compilation instructions for the above tool package available online. If you compile `buildroot` yourself, just enable the macro to support the above tool package. You can also contact us to obtain it.

---

## 3. Common CAN Command Interfaces

1. **Query current network devices**:
    ```bash
    ifconfig -a
    ```

2. **CAN startup**:
    ```bash
    ip link set can0 up
    ```
    **Disable CAN**:
    ```bash
    ip link set can0 down
    ```
    **Set bitrate to 500KHz**:
    ```bash
    ip link set can0 type can bitrate 500000
    ```
    **Print can0 information**:
    ```bash
    ip -details -statistics link show can0
    ```

3. **CAN send**:
    - **Send (standard frame, data frame, ID:123, data:DEADBEEF)**:
        ```bash
        cansend can0 123#DEADBEEF
        ```
    - **Send (standard frame, remote frame, ID:123)**:
        ```bash
        cansend can0 123#R
        ```
    - **Send (extended frame, data frame, ID:00000123, data:DEADBEEF)**:
        ```bash
        cansend can0 00000123#12345678
        ```
    - **Send (extended frame, remote frame, ID:00000123)**:
        ```bash
        cansend can0 00000123#R
        ```

4. **CAN receive**:
    - **Enable print, wait to receive**:
        ```bash
        candump can0
        ```

---

## 4. Common CAN Troubleshooting

### 4.1 Unable to Send/Receive

**Loopback mode test**:
After starting CAN, use the io command to enable loopback self-test (base address depends on the actual can configuration in dts):
```bash
io -4 0xfe580000 0x8415
```
In loopback mode, after `cansend`, `candump` can receive, indicating the controller is working properly. In this state, just check: whether IOMUX is correct; whether the hardware connection is correct; whether the terminal 120-ohm resistor is connected; whether the transceiver chip is normal.

### 4.2 Probabilistic Send/Receive Failure

First confirm whether the bitrate is accurate. The following command can show the actual bitrate and configuration information of the current CAN. If there is a bitrate deviation, it will cause abnormal send/receive, and you need to adjust the input clock according to the bitrate to get an accurate bitrate.
```bash
ip -details -statistics link show can0
```
Sampling point adjustment: the above CAN command will print the current configured sampling point. Try to ensure that the sampling point is consistent within the network. This can ensure the stability of send/receive.

---

## 5. CAN Bitrate and Sampling Point Calculation

Currently, the CAN architecture automatically calculates based on input frequency and bitrate. The sampling point rule follows the CIA standard protocol:

**Bitrate calculation formula** (for detailed principle, please refer to Baidu, here only chip configuration related):
```plaintext
BitRate = clk_can / (2 * (brq + 1) / ((tseg2 + 1) + (tseg1 + 1) + 1)
Sample = (1 + (tseg1 + 1)) / (1 + (tseg1 + 1) + (tseg2 + 1))
```
`brq`, `tseg1`, `tseg2` refer to the BITTIMING register in the CAN TRM.

```c
/* Use CiA recommended sample points */
if (bt->sample_point) {
    sample_point_nominal = bt->sample_point;
} else {
    if (bt->bitrate > 800000)
        sample_point_nominal = 750;
    else if (bt->bitrate > 500000)
        sample_point_nominal = 800;
    else
        sample_point_nominal = 875;
}
```