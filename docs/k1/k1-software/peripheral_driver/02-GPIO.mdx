Introduction to the function and usage method of GPIO.
The usage of the gpio scheme is divided into 3 steps.
1. Description of the gpio used in the scheme
2. Setting the corresponding pin
3. Usage of the gpio
Note:
1. The pin number is defined in linux-6.1\include\dt-bindings\pinctrl\k1-x-pinctrl.h.
2. If the pin configurations are the same, it means that when a group of pins is set as the gpio function, the configurations are the same, including the mux mode, pull-up/down, edge detection, and driving capability configurations.
## Scheme gpio Description
Used to describe all the gpio used in the scheme.
It is defined using the gpio-ranges attribute of the linux gpio framework. If the pin numbers corresponding to a certain segment of gpio are also consecutive, they are defined as a group.
The definition of the gpio controller in the dts file of the above example scheme is as follows:
```c
&gpio{
        gpio-ranges = <
                &pinctrl 49  GPIO_49  2
                &pinctrl 58  GPIO_58  1
                &pinctrl 63  GPIO_63  5
                &pinctrl 70  PRI_TDI  4
                &pinctrl 74  GPIO_74  1
                &pinctrl 80  GPIO_80  4
                &pinctrl 90  GPIO_90  3
                &pinctrl 96  DVL0     2
                &pinctrl 110 GPIO_110 1
                &pinctrl 114 GPIO_114 3
                &pinctrl 123 GPIO_123 5
        >;
};
```
## gpio pin Configuration
Set the pins corresponding to the gpio used in the scheme as the gpio function and configure them (edge detection/pull-up/down/driving capability).
It is set using the pinctrl-single,gpio-range attribute. If there is a certain segment of pin numbers that are consecutive and have the same configuration, they are configured as a group.
The pin configuration parameters refer to [pin configuration parameters](PINCTRL#pin-Configuration Parameters).
For example:
```c
&pinctrl {
        pinctrl-single,gpio-range = <
                &range GPIO_49  2 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_3V_DS4)
                &range GPIO_58  1 (MUX_MODE0 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
                &range GPIO_63  2 (MUX_MODE0 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
                &range GPIO_65  1 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_1V8_DS2)
                &range GPIO_66  2 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_3V_DS4)
                &range PRI_TDI  2 (MUX_MODE1 | EDGE_NONE | PULL_UP   | PAD_1V8_DS2)
                &range PRI_TCK  1 (MUX_MODE1 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
                &range PRI_TDO  1 (MUX_MODE1 | EDGE_NONE | PULL_UP   | PAD_1V8_DS2)
                &range GPIO_74  1 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_1V8_DS2)
                &range GPIO_80  1 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_3V_DS4)
                &range GPIO_81  3 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_1V8_DS2)
                &range GPIO_90  1 (MUX_MODE0 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
                &range GPIO_91  2 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_1V8_DS2)
                &range DVL0     2 (MUX_MODE1 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
                &range GPIO_110 1 (MUX_MODE0 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
                &range GPIO_114 1 (MUX_MODE0 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
                &range GPIO_115 1 (MUX_MODE0 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
                &range GPIO_116 1 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_1V8_DS2)
                &range GPIO_123 1 (MUX_MODE0 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
                &range GPIO_124 1 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_1V8_DS2)
                &range GPIO_125 3 (MUX_MODE0 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
        >;
};
```
## gpio Usage
If the scheme eth0 uses gpio 110 as the reset signal of the phy, then the usage of gpio 110 by eth0 is as follows.
```c
&eth0 {
    emac,reset-gpio = <&gpio 110 0>;
};
```