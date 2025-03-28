Introduction to the function and usage method of QSPI.
## pinctrl
Refer to the schematic diagram of the scheme to find the pin group used by qsoi. Determine the pin group used by qspi by referring to Section 1.2.2.
Assume that qspi can directly use the pinctrl_qspi group defined in k1 - x_pinctrl.dtsi.
## spi Device Configuration
It is necessary to confirm the type of spi device, the communication frequency and the multiplication factor between the qspi and the spi device.
### Device Type
Confirm the type of spi device connected under qspi, whether it is spi - nor or spi - nand.
### Communication Frequency
The maximum communication rate between the qspi controller and the spi device.
The current qspi controller supports a maximum of 102MHz, and the supported communication frequency list is as follows:
| Maximum Frequency (MHz) | Divisor Factor (x) | Actual Frequency |
| ----------------------- | ----------------- | -------------- |
| 409                     | 4, 5, 6, 7, 8     | 409 / x        |
| 307                     | 2, 3, 4, 5, 6, 7, 8 | 307 / x        |
| 245                     | 3, 4, 5, 6, 7, 8   | 245 / x        |
| 223                     | 3, 4, 5, 6, 7, 8   | 223 / x        |
| 106                     | 2, 3, 4, 5, 6, 7, 8 | 106 / x        |
| 495                     | 5, 6, 7, 8         | 495 / x        |
| 189                     | 2, 3, 4, 5, 6, 7, 8 | 189 / x        |
### Communication Multiplication Factor
The qspi communication multiplication factor supports x1 / x2 / x4.
### spi Device dts
Taking spi nor as an example, using the maximum communication frequency of 26.5MHz, and both transmission and reception use x4 communication.
The default maximum communication frequency of the qspi controller is 26.5MHz. When the maximum communication frequency is 26.5MHz, the scheme dts does not need to configure "k1x, qspi - freq".
```c
&qspi {
    k1x, qspi - freq = <26500000>;
    flash@0 {
                compatible = "jedec, spi - nor";
                reg = <0>;
                spi - max - frequency = <26500000>;
                spi - tx - bus - width = <4>;
                spi - rx - bus - width = <4>;
                m25p, fast - read;
                broken - flash - reset;
                status = "okay";
        };
};
```
### dts
#### spi - nor
Based on the above information, qspi is connected to the spi - nor flash, the maximum communication frequency is 26.5MHz, and x4 communication is used.
The scheme dts is configured as follows:
```c
&qspi {
        pinctrl - names = "default";
        pinctrl - 0 = <&pinctrl_qspi>;
        status = "okay";
        k1x, qspi - freq = <26500000>;
        flash@0 {
                compatible = "jedec, spi - nor";
                reg = <0>;
                spi - max - frequency = <26500000>;
                spi - tx - bus - width = <4>;
                spi - rx - bus - width = <4>;
                m25p, fast - read;
                broken - flash - reset;
                status = "okay";
        };
};
```
#### spi - nand
When qspi is connected to the spi - nand flash, the maximum communication frequency is 26.5MHz, and x4 communication is used.
The scheme dts configuration can refer to spi - nor, only the flash device node needs to be modified.
```c
&qspi {
        pinctrl - names = "default";
        pinctrl - 0 = <&pinctrl_qspi>;
        status = "okay";
        k1x, qspi - freq = <26500000>;
        spinand: spinand@0 {
                compatible = "spi - nand";
                spi - max - frequency = <26500000>;
                reg = <0>;
                spi - tx - bus - width = <4>;
                spi - rx - bus - width = <4>;
                status = "okay";
        };
};
```