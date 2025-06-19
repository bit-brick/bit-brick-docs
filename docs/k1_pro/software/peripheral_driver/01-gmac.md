#  GMAC

### Overview

This document provides usage documentation for the Rockchip platform's Ethernet GMAC interface to resolve most Ethernet-related issues.

### Product Version

### Target Audience

This document (guide) is primarily intended for the following engineers:

- Technical Support Engineers
- Software Development Engineers



## 1. Code Location

The hardware-related driver code for the Ethernet module primarily includes GMAC and PHY. The PHY driver generally uses generic PHY drivers. If special register modifications are needed, please use the corresponding PHY driver. All code is in `drivers/net/phy`. Additionally, RK322x/RK3328 comes with a built-in 100Mbps PHY chip.

- Linux3.10 GMAC driver code：`driver/net/ethernet/rockchip/gmac/*`
- Other kernel GMAC driver code (kernel version higher than 3.10): `drivers/net/ethernet/stmicro/stmmac/*`
- RK internal EPHY driver code：`drivers/net/phy/rockchip.c`

---

## 2. DTS

DTS configuration refers to `Documentation/devicetree/bindings/net/rockchip-dwmac.txt`。



```dts
gmac: ethernet@ff290000 {
    compatible = "rockchip,rk3288-gmac";
    reg = <0xff290000 0x10000>;
    interrupts = <GIC_SPI 27 IRQ_TYPE_LEVEL_HIGH>;
    interrupt-names = "macirq";
    rockchip,grf = <&grf>;
    clocks = <&cru SCLK_MAC>,
             <&cru SCLK_MAC_RX>, <&cru SCLK_MAC_TX>,
             <&cru SCLK_MACREF>, <&cru SCLK_MACREF_OUT>,
             <&cru ACLK_GMAC>, <&cru PCLK_GMAC>;
    clock-names = "stmmaceth",
             "mac_clk_rx", "mac_clk_tx",
             "clk_mac_ref", "clk_mac_refout",
             "aclk_mac", "pclk_mac";
    phy-mode = "rgmii";
    pinctrl-names = "default";
    pinctrl-0 = <&rgmii_pins /*&rmii_pins*/>;
    clock_in_out = "input";
    snps,reset-gpio = <&gpio4 7 0>;
    snps,reset-active-low;
    snps,reset-delays-us = <0 10000 1000000>;
    assigned-clocks = <&cru SCLK_MAC>;
    assigned-clock-parents = <&ext_gmac>;
    tx_delay = <0x30>;
    rx_delay = <0x10>;
    status = "ok";
};
```
The parts of the board-level configuration that need attention are as follows:
- `phy-mode`: Mainly divided into RMII and RGMII modes.
- `snps,reset-gpio`: The hardware reset pin of the PHY.
- `snps,reset-delays-us`: The reset timing of the PHY. The three timings represent the reset timing of different stages of the PHY. The reset timing of different PHYs is different. If it is the `snps,reset-active-low` attribute, it means that the three timings represent the timing of the Reset pin being pulled high, low, and then high; if it is the `snps,reset-active-high` attribute, it is the opposite.
- `phy-supply`: If the power supply of the PHY is always-on, this does not need to be configured; otherwise, the corresponding regulator needs to be configured.
- Clock configuration: Please refer to the third chapter of this article.
- `pinctrl`: Configuration is different under RGMII and RMII modes. In addition, for clock output pins, the driving strength of the pin is generally different. For example, in RMII mode, when the ref_clock pin outputs the clock, the driving strength is also configured to be larger.
- `tx_delay`/`rx_delay`: This attribute needs to be configured in RGMII mode. Please refer to the eighth chapter of this article on RGMII Delayline.

Due to the large number of configurations in different modes under different chips, please refer to another document "Rockchip_Developer_Guide_Linux_GMAC_Mode_Configuration_CN.pdf".

---

## 3. PHY Register Read/Write Debugging

The driver provides interfaces for reading and writing registers. Currently, there are two sets of interfaces on different kernel versions. Path: `/sys/bus/mdio_bus/devices/stmmac-0:00`, where `stmmac-0:00` indicates that the PHY address is 0.

### 3.1 Linux 3.10
```
/sys/bus/mdio_bus/devices/stmmac-0:00/phy_reg
/sys/bus/mdio_bus/devices/stmmac-0:00/phy_regValue
```
- **Write**: For example, to write 0xabcd to Reg0

  ```
    echo 0x00 > /sys/bus/mdio_bus/devices/stmmac-0:00/phy_reg
    echo 0xabcd > /sys/bus/mdio_bus/devices/stmmac-0:00/phy_regValue
  ```
- **Read**: For example, to read the value of Reg0

  ```
    echo 0x00 > /sys/bus/mdio_bus/devices/stmmac-0:00/phy_reg
    cat /sys/bus/mdio_bus/devices/stmmac-0:00/phy_regValue
  ```

### 3.2 Other Versions

```
/sys/bus/mdio_bus/devices/stmmac-0:00/phy_registers
```
- **Write**:
    For example, to write 0xabcd to Reg0
  ```bash
  echo 0x00 0xabcd > /sys/bus/mdio_bus/devices/stmmac-0:00/phy_registers
  ```
- **Read**：
  ```bash
  cat /sys/bus/mdio_bus/devices/stmmac-0:00/phy_registers
  ```
  This command will read all registers from 0 to 31, so you can check the corresponding register values.


## 4. MAC Address

Currently, the strategy for reading the MAC address is to use the MAC address in the DTB as the priority (which is also written by uboot), followed by the MAC address burned in the IDB. If the burned address is compliant with the specification, it will be used; if not, or if not burned, a randomly generated address will be used (the MAC address will change on reboot). In RK3399, RK3328/RK3228H, and later versions, the strategy has been improved: priority is given to the MAC address burned in the IDB or vendor Storage. If this address is compliant with the specification, it will be used; if not, or if not burned, a random MAC address will be generated, saved to the Vendor partition, and used. This address will not be lost on reboot or factory reset.

For details on the MAC address burning tool, refer to the document "Rockchip_User_Guide_RKDevInfoWriteTool_CN.pdf".


## 5. Loopback Test

The loopback test mainly includes MAC and PHY loopbacks. For details, please refer to the document "Rockchip_Developer_Guide_Linux_GMAC_RGMII_Delayline_CN.pdf" regarding the `phy_lb` and `mac_lb` nodes.

---

## 6. RGMII Delayline

The RGMII interface provides tx and rx delay lines to adjust the RGMII timing. For information on how to obtain the appropriate RGMII Delayline, please refer to the document "Rockchip_Developer_Guide_Linux_GMAC_RGMII_Delayline_CN.pdf".

---

## 7. LED Lights

PHYs have their own LED control. Below are the macphy configurations for RK3228 and RK3328. For other external PHYs, please refer to their datasheets. The following is the LED configuration for RK3228 and RK3328:

- RK3228: Requires patch `kernel_4.4_rk322x_phy_led_control.patch` to be applied.
- RK3328: Configure the iomux on the dts, for example, to control the led through rx and link, configure the corresponding pinctrl.

```bash
phy: phy@0 {
        compatible = "ethernet-phy-id1234.d400", "ethernet-phy-ieee802.3-c22";
        reg = <0>;
        clocks = <&cru SCLK_MAC2PHY_OUT>;
        resets = <&cru SRST_MACPHY>;
        pinctrl-names = "default";
        pinctrl-0 = <&fephyled_rxm1 &fephyled_linkm1>;
        phy-is-integrated;
};
```

---

## 8. WOL

The Wake On Lan function requires different register configurations for each PHY. Currently, the collected patches include RTL8211E/F and RTL8201F.

---

## 9. MAC To MAC Direct Connection

Refer to the document "Rockchip_Developer_Guide_Linux_MAC_TO_MAC_CN.pdf".

---

## 10. Jumbo Frame

Jumbo Frame 9K is supported from the RV1126/1109 chips. The MTU of the test network needs to be configured to 9000. The following are the test results:

```bash
[root@Puma:/]# ping -s 9000 192.168.1.100
PING 192.168.1.100 (192.168.1.100) 9000(9028) bytes of data.
9008 bytes from 192.168.1.100: icmp_seq=1 ttl=64 time=0.784 ms
9008 bytes from 192.168.1.100: icmp_seq=2 ttl=64 time=0.675 ms
9008 bytes from 192.168.1.100: icmp_seq=3 ttl=64 time=0.666 ms
9008 bytes from 192.168.1.100: icmp_seq=4 ttl=64 time=0.656 ms
9008 bytes from 192.168.1.100: icmp_seq=5 ttl=64 time=0.677 ms
9008 bytes from 192.168.1.100: icmp_seq=6 ttl=64 time=0.637 ms
9008 bytes from 192.168.1.100: icmp_seq=7 ttl=64 time=0.641 ms
9008 bytes from 192.168.1.100: icmp_seq=8 ttl=64 time=0.692 ms
9008 bytes from 192.168.1.100: icmp_seq=9 ttl=64 time=0.656 ms
```

---

## 11. PTP1588

PTP1588 is supported from the RV1126/1109 chips. The following are the test results:



### 11.1 PC master and RK slave
```
ubuntu@thinkpad: sudo ptp4l -i enp0s31f6 -m -H
ptp4l[1790161.443]: selected /dev/ptp0 as PTP clock
ptp4l[1790161.443]: port 1: INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[1790161.443]: port 0: INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[1790168.489]: port 1: LISTENING to MASTER on 
ANNOUNCE_RECEIPT_TIMEOUT_EXPIRES
ptp4l[1790168.489]: selected local clock 54e1ad.fffe.dfa454 as best master
ptp4l[1790168.490]: assuming the grand master role
```

```bash
[root@Puma:/]# ptp4l -i eth0 -m -H -s
ptp4l[39.868]: selected /dev/ptp0 as PTP clock
[   39.871092] rk_gmac-dwmac ffc40000.ethernet eth0: stmmac_hwtstamp_set config 
flags:0x0, tx_type:0x1, rx_filter:0xc
[   39.872029] stmmac_hwtstamp_set, value: 0x17e03
ptp4l[39.870]: port 1: INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[39.871]: port 0: INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[41.251]: port 1: new foreign master 54e1ad.fffe.dfa454-1
[   43.817340] rk_gmac-dwmac ffc40000.ethernet eth0: stmmac_hwtstamp_set config 
flags:0x0, tx_type:0x1, rx_filter:0xc
[   43.818262] stmmac_hwtstamp_set, value: 0x17e03
ptp4l[45.251]: selected best master clock 54e1ad.fffe.dfa454
ptp4l[45.251]: port 1: LISTENING to UNCALIBRATED on RS_SLAVE
ptp4l[49.251]: master offset      -1608 s0 freq      +0 path delay      5691
ptp4l[50.251]: master offset      -5579 s0 freq      +0 path delay      9435
ptp4l[51.251]: master offset      -4831 s2 freq    +748 path delay      9435
ptp4l[51.251]: port 1: UNCALIBRATED to SLAVE on MASTER_CLOCK_SELECTED
ptp4l[52.251]: master offset      12189 s2 freq  +12937 path delay      7563
ptp4l[53.251]: master offset      14413 s2 freq  +18818 path delay      8287
ptp4l[54.251]: master offset      10712 s2 freq  +19441 path delay      8861
ptp4l[55.251]: master offset       7185 s2 freq  +19127 path delay      8861
ptp4l[56.251]: master offset       3234 s2 freq  +17332 path delay      9435
ptp4l[57.251]: master offset       1787 s2 freq  +16855 path delay      9454
ptp4l[58.251]: master offset        785 s2 freq  +16389 path delay      9454
ptp4l[59.251]: master offset         89 s2 freq  +15928 path delay      9473
ptp4l[60.251]: master offset         31 s2 freq  +15897 path delay      9454
ptp4l[61.251]: master offset        -71 s2 freq  +15804 path delay      9454
ptp4l[62.251]: master offset       -100 s2 freq  +15754 path delay      9406
ptp4l[63.251]: master offset        -27 s2 freq  +15797 path delay      9406
ptp4l[64.251]: master offset        -69 s2 freq  +15747 path delay      9395
ptp4l[65.251]: master offset         29 s2 freq  +15824 path delay      9395
ptp4l[66.251]: master offset        -73 s2 freq  +15731 path delay      9395
ptp4l[67.251]: master offset         32 s2 freq  +15814 path delay      9388
ptp4l[68.251]: master offset        -20 s2 freq  +15772 path delay      9388
ptp4l[69.251]: master offset       -104 s2 freq  +15682 path delay      9395
ptp4l[70.251]: master offset        -56 s2 freq  +15699 path delay      9395
ptp4l[71.251]: master offset         24 s2 freq  +15762 path delay      9388
ptp4l[72.251]: master offset         11 s2 freq  +15756 path delay      9395     9395
```

### 11.2 RK master and PC slave
```
[root@Puma:/]# ptp4l -i eth0 -m -H
ptp4l[15.668]: selected /dev/ptp0 as PTP clock
ptp4l[15.670]: port 1: INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[15.670]: port 0: INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[22.120]: port 1: LISTENING to MASTER on ANNOUNCE_RECEIPT_TIMEOUT_EXPIRES
ptp4l[22.120]: selected local clock aadc46.fffe.5da6d9 as best master
ptp4l[22.121]: assuming the grand master role
```

```bash
ubuntu@thinkpad: sudo ptp4l -i enp0s31f6 -m -H -s
ptp4l[1879661.603]: selected /dev/ptp0 as PTP clock
ptp4l[1879661.603]: port 1: INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[1879661.603]: port 0: INITIALIZING to LISTENING on INIT_COMPLETE
ptp4l[1879662.249]: port 1: new foreign master aadc46.fffe.5da6d9-1
ptp4l[1879665.849]: selected best master clock aadc46.fffe.5da6d9
ptp4l[1879665.849]: port 1: LISTENING to UNCALIBRATED on RS_SLAVE
ptp4l[1879667.649]: master offset         49 s0 freq   -9515 path delay      9364
ptp4l[1879668.549]: master offset        128 s2 freq   -9436 path delay      9338
ptp4l[1879668.549]: port 1: UNCALIBRATED to SLAVE on MASTER_CLOCK_SELECTED
ptp4l[1879669.449]: master offset        256 s2 freq   -9180 path delay      9338
ptp4l[1879670.349]: master offset       -230 s2 freq   -9589 path delay      9338
ptp4l[1879671.249]: master offset       -399 s2 freq   -9827 path delay      9360
ptp4l[1879672.149]: master offset        142 s2 freq   -9406 path delay      9360
ptp4l[1879673.049]: master offset        232 s2 freq   -9273 path delay      9347
ptp4l[1879673.949]: master offset       -303 s2 freq   -9739 path delay      9347
ptp4l[1879674.849]: master offset       -267 s2 freq   -9794 path delay      9338
ptp4l[1879675.749]: master offset        327 s2 freq   -9280 path delay      9335
ptp4l[1879676.649]: master offset        405 s2 freq   -9104 path delay      9335
ptp4l[1879677.549]: master offset       -156 s2 freq   -9543 path delay      9335
ptp4l[1879678.449]: master offset       -178 s2 freq   -9612 path delay      9335
ptp4l[1879679.349]: master offset       -100 s2 freq   -9587 path delay      9335
ptp4l[1879680.249]: master offset        -73 s2 freq   -9590 path delay      9335
ptp4l[1879681.149]: master offset        -79 s2 freq   -9618 path delay      9344
ptp4l[1879682.049]: master offset        -76 s2 freq   -9639 path delay      9344
ptp4l[1879682.949]: master offset        -59 s2 freq   -9645 path delay      9329
ptp4l[1879683.849]: master offset        -31 s2 freq   -9634 path delay      9329
ptp4l[1879684.750]: master offset         22 s2 freq   -9591 path delay      9329
ptp4l[1879685.650]: master offset         -9 s2 freq   -9615 path delay      9337
ptp4l[1879686.550]: master offset        -31 s2 freq   -9640 path delay      9337
ptp4l[1879687.450]: master offset         -3 s2 freq   -9621 path delay      9337
ptp4l[1879688.350]: master offset        -15 s2 freq   -9634 path delay      9351
```

---

## 12. Hardware Signal Testing

Refer to the signal testing documents released by Rockchip Hardware, including RMII or RGMII, and PHY eye diagram tests.

- [Rockchip Hardware Department 100base-t Testing Guide-V1.1.doc](#)
- [Rockchip Hardware Department 1000base-t Testing Guide_V1.0.doc](#)

---

## 13. Problem Analysis

### 13.1 DMA Initialization Failed

If the GMAC driver boot log shows: `DMA engine initialization failed`, it can be assumed that there is a problem with the GMAC working clock. First, measure whether the clock pin has a clock, and whether the clock frequency and amplitude are normal. Mainly check the following aspects:

- IOMUX error, check whether the register value of the clock pin is correct.
- Clock direction and configuration do not match the hardware, refer to the clock settings in the fourth chapter of this article.
- Check the clock tree and CRU registers to confirm the clock frequency and whether the clock is enabled.

### 13.2 PHY Initialization Failed

If the GMAC driver boot log shows: `No PHY found` or `Cannot attach to PHY`, it means the PHY cannot be found. The driver will first read the PHY ID through MDIO. You can measure the MDC and MDIO waveforms to see if they are normal. This bus is similar to I2C, and the MDC frequency is required to be less than 2.5M. Generally, if the PHY cannot be found, it is due to the following reasons:

- Check whether the MDC/MDIO IOMUX register values are correct.
- Whether the PHY power supply is normal.
- Reset IO configuration is incorrect.
- Reset IO timing does not meet the PHY datasheet requirements. The timing requirements for different PHYs are different. For specific configurations, refer to the DTS chapter of this article.
- Test whether the MDIO/MDC waveforms are abnormal, where the MDC clock frequency is required to be less than 2.5M.

### 13.3 Link Issues

If there is a Link issue, one troubleshooting method is to disconnect MDC/MDIO from the main control and connect it directly to the computer to see if the same issue occurs on the computer side. This can help rule out software interference, and if the problem persists, it may be due to hardware issues. First, test whether TXN/P and RXN/P have Link waveforms.

If Link up/Link down keeps occurring, possible reasons include:

- The PHY receives incorrect data.
- In EEE mode, the transmitted waveform may cause continuous link up/down if the delay line is configured incorrectly.
- Supplying the PHY with an incorrect clock can also cause this problem.

### 13.4 Data Transmission Issues

First, check whether it is a TX issue, an RX issue, or both.

#### 13.4.1 TX

- Use `ifconfig -a` to check whether the TX packets of the eth0 node are increasing. If it is 0, the network cable may not be linked.
- You can also check the node to see if the network cable is connected. `carrier` = 1 means link up, 0 means link down. For example, RK3328:
  ```bash
  console:/ # cat /sys/devices/platform/ff550000.ethernet/net/eth0/carrier
  1
  eth0      Link encap:Ethernet HWaddr 16:21:8d:d9:67:0b Driver rk_gmac-dwmac
            inet6 addr: fe80::c43d:3e5d:533:b7ea/64 Scope: Link
            UP BROADCAST RUNNING MULTICAST MTU:1500 Metric:1
            RX packets:0 errors:0 dropped:0 overruns:0 frame:0
            TX packets:19 errors:0 dropped:0 overruns:0 carrier:0
            collisions:0 txqueuelen:1000
            RX bytes:0 TX bytes:2848
            Interrupt:45
  ```

Assuming the TX packets are increasing, indicating that the TX data is being sent from the GMAC. Connect the board to the PC within the same local area network, ping the PC from the board, and use a packet capture tool (like Wireshark) on the PC side to check if data from the board is captured. If data is captured, the TX data is confirmed to be通. If not, you need to confirm where the TX异常 occurs in the link. You can test the GMAC's TX Clock and TX Data waveforms to rule out whether the issue is with the MAC or PHY. For the MAC, you can check the following aspects:

- Check the iomux of TX Clock/TX Data.
- Whether the TXC clock is correct.
- In RGMII mode, whether the Tx Delayline configuration is correct.
- On the PHY side, you can also test the PHY's TXN/P signals to confirm whether the PHY is sending data. The configuration for different PHYs may vary, and you need to refer to their Datasheets for specifics.

#### 13.4.2 RX

If it is determined that the issue is not with TX, focus on checking RX. After connecting the network cable, use `ifconfig -a` to check whether the RX packets of the eth0 node are increasing. If it is 0, it means the GMAC RX has not received data. Similarly, you can test the PHY's RXN/P and GMAC's RX Clock/RX Data to rule out whether the issue is with the MAC or PHY. For the MAC, you can check the following aspects:
```
eth0     Link encap:Ethernet HWaddr 16:21:8d:d9:67:0b Driver rk_gmac-dwmac
         inet6 addr: fe80::c43d:3e5d:533:b7ea/64 Scope: Link
         UP BROADCAST RUNNING MULTICAST MTU:1500 Metric:1
         RX packets:341 errors:0 dropped:0 overruns:0 frame:0
         TX packets:26 errors:0 dropped:0 overruns:0 carrier:0
         collisions:0 txqueuelen:1000
         RX bytes:48928 TX bytes:3741
         Interrupt:355
```

- Check the iomux of RX Clock/RX Data.
- Whether the RXC clock is correct.
- In RGMII mode, whether the Rx Delayline configuration is correct.

Assuming the TX packets are increasing, but the Ethernet still cannot communicate normally, it may be due to the following reasons:

- In RMII mode, the reference clocks for MAC and PHY are not the same.
- The PHY mode configuration is incorrect, for example, it is硬件上 configured as MII mode.
