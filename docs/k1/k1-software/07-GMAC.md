Introduction to the function and usage method of GMAC.
The GMAC dts configuration requires determining the pin group used by the Ethernet, the phy reset gpio, the phy model, and the address. The tx phase and rx phase generally use the default values.
## pinctrl
Check the schematic diagram of the development board to find the pin group used by the gmac.
Assume that eth0 uses the GPIO00 ~ GPIO14, GPIO45 pin group, and the configuration can adopt the configuration of the pinctrl_gmac0 group in k1 - x_pinctrl.dtsi.
The eth0 in the scheme dts uses the gmac0 pinctrl as follows:
```c
&eth0 {
    pinctrl - names = "default";
    pinctrl - 0 = <&pinctrl_gmac0>;
};
```
## gpio
Check the schematic diagram of the development board to find the gpio of the Ethernet phy reset signal. Assume that the phy reset gpio of eth0 is gpio 110.
The eth0 in the scheme dts uses gpio 110 as follows.
```c
&eth0 {
    emac, reset - gpio = <&gpio 110 0>;
```
## phy Configuration
### phy Identification
Check the schematic diagram of the development board to confirm the model and phy id of the Ethernet phy.
For example, the Ethernet phy RTL8821F - CG has a phy id of 001c.c916.
The phy id information can be found in the phy spec or obtained by contacting the phy manufacturer.
### phy Address
Check the schematic diagram of the development board to confirm the address of the Ethernet phy. Assume it is 1.
### phy Configuration
According to the phy identification id and phy address obtained in 5.3.1 and 5.3.2, configure the phy.
The eth0 configuration in the scheme dts is as follows:
```c
&eth0 {
   ...
    mdio - bus {
                #address - cells = <0x1>;
                #size - cells = <0x0>;
                rgmii0: phy@0 {
                        compatible = "ethernet - phy - id001c.c916";
                        device_type = "ethernet - phy";
                        reg = <0x1>;
                        phy - mode = "rgmii";
                };
    };
};
```
## tx phase and rx phase
The default value of tx - phase is 90, and the rx - phase is 73.
The tx - phase and rx - phase may need to be adjusted for different boards. If the eth0 port can be up, but cannot obtain an IP address, contact Jindi Shikong to adjust the tx - phase and rx - phase.
```c
&eth0 {
    tx - phase = <90>;
    rx - phase = <73>;
};
```
## dts Configuration
Based on the Ethernet hardware information of the development board, the configuration is as follows.
```c
&eth0 {
        pinctrl - names = "default";
        pinctrl - 0 = <&pinctrl_gmac0>;
        emac, reset - gpio = <&gpio 110 0>;
        emac, reset - active - low;
        emac, reset - delays - us = <0 10000 100000>;
        /* store forward mode */
        tx - threshold = <1518>;
        rx - threshold = <12>;
        tx - ring - num = <128>;
        rx - ring - num = <128>;
        dma - burst - len = <5>;
        ref - clock - from - phy;
        clk - tuning - enable;
        clk - tuning - by - delayline;
        tx - phase = <90>;
        rx - phase = <73>;
        phy - handle = <&rgmii0>;
        status = "okay";
        mdio - bus {
                #address - cells = <0x1>;
                #size - cells = <0x0>;
                rgmii0: phy@0 {
                        compatible = "ethernet - phy - id001c.c916";
                        device_type = "ethernet - phy";
                        reg = <0x1>;
                        phy - mode = "rgmii";
                };
        };
};
```