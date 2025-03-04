Introduction to the configuration method of the camera.
The dts configurations related to the camera are mainly distributed in the following files (there may be slight differences between schemes):
```bash
Path: arch/riscv/boot/dts/spacemit/k1-x-camera-sensor.dtsi
Function: Configuration information for various sensors
Path: arch/riscv/boot/dts/spacemit/k1-x-camera-sdk.dtsi
Function: Configuration information for ccic, csiphy, isp, vi, and cpp
Path: arch/riscv/boot/dts/spacemit/k1-x_pinctrl.dtsi
Function: pinctrl configuration information relied on by the camera
Path: arch/riscv/boot/dts/spacemit/k1-x_xxx.dts
Function: Board-related configuration for different schemes
```
## pinctrl
Use the method in the pinctrl chapter to find the pins group used by the camera. For example, camera0 can use the pinctrl_camera0 group defined in k1 - x_pinctrl.dtsi to configure the mclk pin.
## gpio
Check the schematic diagram of the development board to find the reset signal gpio and the power-on/off signal gpio of the mipi csi (0/1/2) hardware interface. Usually, there will be at least one group of GPIOs. Assume that the reset gpio of the mipi csi0 hardware interface is gpio 111, and the power-on/off signal gpio is gpio 113, and it is connected to camera0: imx135 mipi. (It is recommended that the camera ID corresponds to the number of the mipi csi.)
In the scheme dts, the use of gpio 110 by backsensor is as follows.
```c
Path: arch/riscv/boot/dts/spacemit/k1-x_xxx.dts
/* imx315 */
&backsensor {
        pwdn-gpios = <&gpio 113 GPIO_ACTIVE_HIGH>;
        reset-gpios = <&gpio 111 GPIO_ACTIVE_HIGH>;
        status = "okay";
};
Path: arch/riscv/boot/dts/spacemit/k1-x-camera-sensor.dtsi
&soc {
        /* imx315 */
        backsensor: cam_sensor@0 {
                cell-index = <0>;
                status = "okay";
        };
};
```
pwdn - gpios and reset - gpios are related to the power supply configuration of the sensor module, and this group of configurations is used in the sensor driver to complete the power-on, power-off, and reset operations of the sensor. Different sensor modules may have different configurations, and they need to be carefully modified during bring up.
## dts
### Sensor Configuration
The sensor configuration defined in k1 - x - camera - sensor.dtsi is as follows:
```c
    backsensor: cam_sensor@0 {
            cell-index = <0>;
            twsi-index = <0>;
            dphy-index = <0>;
            compatible = "spacemit,cam-sensor";
            clocks = <&ccu CLK_CAMM0>;
            clock-names = "cam_mclk0";
            /*    This part of the content has been moved to the top-level dts
                afvdd28-supply = <&ldo_12>;
                avdd28-supply = <&ldo_10>;
                dvdd12-supply = <&ldo_20>;
                iovdd18-supply = <&ldo_11>;
                cam-supply-names = "afvdd28", "avdd28", "dvdd12", "iovdd18";
            */

            ......
            status = "okay";
    };
```
cell - index represents the device ID of the entire sensor, and this device ID exactly matches the sensor device ID used in the upper layer.
twsi - index represents the ID of the I2C core used by the sensor. Before using it, ensure that the corresponding i2c bus dts configuration has been enabled. For details, please refer to the i2c chapter.
dphy - index represents the PHY ID used by the sensor.
clocks/clock - names represent the clock source of the mclk used by the sensor.