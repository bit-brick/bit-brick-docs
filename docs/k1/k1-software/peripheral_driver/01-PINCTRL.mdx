Introduction to the functions and usage methods of PINs.
## Pin Configuration Parameters
Define the pin ID, multiplexing function, and attributes.
The detailed definition is in `linux-6.1/include/dt-bindings/pinctrl/k1-x-pinctrl.h`.
### Pin ID
That is, the pin number.
The pin number range of K1 is 1 to 147, corresponding to the macro definitions `GPIO_00 ~ GPIO_147`.
### Pin Function
The K1 pin supports multiplexing selection.
The list of multiplexing functions of the K1 pin is shown in [K1 Pin Multiplex](https://developer.spacemit.com/#/documentation?token=CzJlwnDYNigRgDk7qS2cvYHPnkh).
The multiplexing function numbers of the pin are 0 to 7, which are defined as `MUX_MODE0 ~ MUX_MODE7`, respectively.
### Pin Attributes
The attributes of the pin include edge detection, pull - up/pull - down, and driving capability.
#### Edge Detection
When using the functional pin to wake up the system, set the signal detection method that generates the wake - up event.
The following four modes are supported:
- Edge detection disabled: `EDGE_NONE`
- Rising edge detection: `EDGE_RISE`
- Falling edge detection: `EDGE_FALL`
- Rising and falling edges: `EDGE_BOTH`
#### Pull - up/Pull - down
The following three modes are supported:
- Pull-up/pull-down disabled: `PULL_DIS`
- Pull-up: `PULL_UP`
- Pull-down: `PULL_DOWN`
#### Driving Capability
1. Pin voltage is 1.8v
It is divided into 4 levels, and the larger the value, the stronger the driving capability.
- PAD_1V8_DS0
- PAD_1V8_DS1
- PAD_1V8_DS2
- PAD_1V8_DS3
2. Pin voltage is 3.3v
It is divided into 7 levels, and the larger the value, the stronger the driving capability.
- PAD_3V_DS0
- PAD_3V_DS1
- PAD_3V_DS2
- PAD_3V_DS3
- PAD_3V_DS4
- PAD_3V_DS5
- PAD_3V_DS6
- PAD_3V_DS7
## Pin Configuration Definition
### Configuration of a Single Pin
Select the pin function, set the edge detection, pull - up/pull - down, and driving capability of the pin.
Use the macro K1X_PADCONF for setting, and the format is pin_id, mux_mode, pin_config.
For example, set the pin GPIO_00 to the gmac0 rxdv function, disable edge detection, disable pull - up/pull - down, and set the driving capability to 2 (1.8v).
Referring to the K1 pin function multiplexing list [K1 Pin Multiplex.xls], to set GPIO_00 to the gmac0 rxdv function, the function mode needs to be set to 1, that is, MUX_MODE1.
The setting is as follows:
```c
K1X_PADCONF(GPIO_00,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rxdv */
```
### Definition of a Group of Pins
Configure the functional pin group used by the controller (such as gmac, pcie, usb, and emmc).
The default functional pin group definition is in `linux-6.1/arch/riscv/boot/dts/spacemit/k1-x_pinctrl.dtsi`.
1. Whether the functional pin group is defined in k1 - x_pinctrl.dtsi. If it is defined and meets the configuration, use it directly; if it is not defined or the configuration does not meet the requirements, set it according to step 2;
2. Set the pin group used by the controller
Take eth0 as an example. Suppose the eth0 pin group of the development board uses GPIO00 ~ GPIO14, GPIO45, and the tx needs to enable pull - up.
The default definition of the gmac0 pins in k1 - x_pinctrl.dtsi is as follows:
```c
pinctrl_gmac0: gmac0_grp {
        pinctrl - single, pins =<
            K1X_PADCONF(GPIO_00,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rxdv */
            K1X_PADCONF(GPIO_01,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rx_d0 */
            K1X_PADCONF(GPIO_02,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rx_d1 */
            K1X_PADCONF(GPIO_03,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rx_clk */
            K1X_PADCONF(GPIO_04,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rx_d2 */
            K1X_PADCONF(GPIO_05,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rx_d3 */
            K1X_PADCONF(GPIO_06,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_tx_d0 */
            K1X_PADCONF(GPIO_07,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_tx_d1 */
            K1X_PADCONF(GPIO_08,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_tx */
            K1X_PADCONF(GPIO_09,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_tx_d2 */
            K1X_PADCONF(GPIO_10,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_tx_d3 */
            K1X_PADCONF(GPIO_11,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_tx_en */
            K1X_PADCONF(GPIO_12,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_mdc */
            K1X_PADCONF(GPIO_13,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_mdio */
            K1X_PADCONF(GPIO_14,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_int_n */
            K1X_PADCONF(GPIO_45,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_clk_ref */
        >;
};
```
The pull - up/pull - down function of the Tx pin does not meet the requirements. The default definition is to disable pull - up/pull - down. Currently, pull - up needs to be enabled.
There are two methods:
1. Rewrite the default definition of the pin group in the solution dts.
2. Add a set of pin definitions in the solution dts.
These are introduced separately below.
1. Rewrite the Default Definition of the Pin Group
Add the following configuration in the solution dts file to rewrite the default configuration of gmac0 and set the gmac0 tx to pull - up.
```c
&pinctrl {
    pinctrl_gmac0: gmac0_grp {
        pinctrl - single, pins =<
            K1X_PADCONF(GPIO_00,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rxdv */
            K1X_PADCONF(GPIO_01,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rx_d0 */
            K1X_PADCONF(GPIO_02,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rx_d1 */
            K1X_PADCONF(GPIO_03,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rx_clk */
            K1X_PADCONF(GPIO_04,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rx_d2 */
            K1X_PADCONF(GPIO_05,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rx_d3 */
            K1X_PADCONF(GPIO_06,    MUX_MODE1, (EDGE_NONE | PULL_PULL | PAD_1V8_DS2))   /* gmac0_tx_d0 */
            K1X_PADCONF(GPIO_07,    MUX_MODE1, (EDGE_NONE | PULL_PULL | PAD_1V8_DS2))   /* gmac0_tx_d1 */
            K1X_PADCONF(GPIO_08,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_tx */
            K1X_PADCONF(GPIO_09,    MUX_MODE1, (EDGE_NONE | PULL_PULL | PAD_1V8_DS2))   /* gmac0_tx_d2 */
            K1X_PADCONF(GPIO_10,    MUX_MODE1, (EDGE_NONE | PULL_PULL | PAD_1V8_DS2))   /* gmac0_tx_d3 */
            K1X_PADCONF(GPIO_11,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_tx_en */
            K1X_PADCONF(GPIO_12,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_mdc */
            K1X_PADCONF(GPIO_13,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_mdio */
            K1X_PADCONF(GPIO_14,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_int_n */
            K1X_PADCONF(GPIO_45,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_clk_ref */
        >;
    };
};
```
2. Newly Define the gmac0 Pin Group
Add the following configuration in the solution dts file to set the gmac0 tx to pull - up.
```c
&pinctrl {
    pinctrl_gmac0_1: gmac0_1_grp {
        pinctrl - single, pins =<
            K1X_PADCONF(GPIO_00,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rxdv */
            K1X_PADCONF(GPIO_01,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rx_d0 */
            K1X_PADCONF(GPIO_02,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rx_d1 */
            K1X_PADCONF(GPIO_03,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rx_clk */
            K1X_PADCONF(GPIO_04,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rx_d2 */
            K1X_PADCONF(GPIO_05,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_rx_d3 */
            K1X_PADCONF(GPIO_06,    MUX_MODE1, (EDGE_NONE | PULL_PULL | PAD_1V8_DS2))   /* gmac0_tx_d0 */
            K1X_PADCONF(GPIO_07,    MUX_MODE1, (EDGE_NONE | PULL_PULL | PAD_1V8_DS2))   /* gmac0_tx_d1 */
            K1X_PADCONF(GPIO_08,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_tx */
            K1X_PADCONF(GPIO_09,    MUX_MODE1, (EDGE_NONE | PULL_PULL | PAD_1V8_DS2))   /* gmac0_tx_d2 */
            K1X_PADCONF(GPIO_10,    MUX_MODE1, (EDGE_NONE | PULL_PULL | PAD_1V8_DS2))   /* gmac0_tx_d3 */
            K1X_PADCONF(GPIO_11,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_tx_en */
            K1X_PADCONF(GPIO_12,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_mdc */
            K1X_PADCONF(GPIO_13,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_mdio */
            K1X_PADCONF(GPIO_14,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_int_n */
            K1X_PADCONF(GPIO_45,    MUX_MODE1, (EDGE_NONE | PULL_DIS | PAD_1V8_DS2))   /* gmac0_clk_ref */
        >;
    };
};
```
## Pin Usage
eth0 references the pinctrl_gmac0 rewritten and defined in the solution.
```c
eth0 {
    pinctrl - names = "default";
    pinctrl - 0 = <&pinctrl_gmac0>;
};
```
Or references the newly added pinctrl_gmac0_1 in the solution.
```c
eth0 {
    pinctrl - names = "default";
    pinctrl - 0 = <&pinctrl_gmac0_1>;
};
```