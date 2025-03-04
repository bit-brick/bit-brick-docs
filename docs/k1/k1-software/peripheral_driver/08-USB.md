Introduction to the Functions and Usage Methods of USB.
K1 has three USB controllers, namely usb2.0otg, usb2.0host, and usb3.0drd.
## usb2.0otg
The usb2.0otg controller supports device mode, host mode, and otg mode. The phy of the usb2.0otg controller is the usbphy node, and enabling the usbphy node is required when using any mode of the controller.
### Working in device only mode
The device tree node corresponding to the device mode of the usb2.0otg controller is udc. When working as a device mode, it is necessary to configure the spacemit, udc - mode attribute of the dts node to MV_USB_MODE_UDC to select the device mode.
The configuration in the solution dts is as follows:
```c
&usbphy {
        status = "okay";
};
&udc {
        spacemit, udc - mode = <MV_USB_MODE_UDC>;
        status = "okay";
};
```
### Working in host only mode
The device tree node corresponding to the host mode of the usb2.0otg controller is ehci. When working as a host mode, the host mode can be selected by configuring the spacemit, udc - mode attribute of the dts to MV_USB_MODE_HOST (the default value). The udc node needs to be disabled.
If the host only controller needs to control the vbus switch, the corresponding pinctrl attribute subnode needs to be configured according to the needs (refer to [PINCTRL](PINCTRL)).
```c
&usbphy {
        status = "okay";
};
&ehci {
        spacemit, udc - mode = <MV_USB_MODE_HOST>;
        status = "okay";
};
```
### Working in otg mode
To work in otg mode, the solution needs to be designed as follows:
1. The USB_ID0 Pin (INPUT) is connected to the OTG ID Pin. When the ID is grounded, the usb2.0otg works as a host. When the ID is floating/high, the usb2.0otg works as a device.
2. The VBUS_ON0 Pin (INPUT) is connected to the VBUS on the OTG interface. When the VBUS has an external output or external input, the VBUS_ON0 is high.
3. It is necessary to reserve an OUTPUT GPIO (it is recommended to use GPIO63) as the vbus - gpio for driving the external 5v power supply switch according to whether it is in the host mode.
4. When the usb2.0otg is switched to the host mode, the VBUS_ON0 cannot be high before the vbus - gpio is output high.
5. When the usb2.0otg is switched to the device mode, after the port is connected to the external vbus power supply, the VBUS_ON0 is pulled high.
The dts needs to be configured as follows:
1. Use pinctrl to configure GPIO64 as the VBUS_ON0 function and GPIO65 as the USB_ID0 function to detect the status of the otg interface.
2. Enable the usbphy, extcon, otg, udc, and ehci nodes.
3. Configure the spacemit, udc - mode attribute of the udc node, ehci node, and otg node in the dts to MV_USB_MODE_OTG.
4. In the dts, the detection support of vbus and idpin needs to be configured through the spacemit, extern - attr configuration of the otg node and the udc node, and configured to MV_USB_HAS_VBUS_IDPIN_DETECTION.
5. The otg node needs to configure the vbus - gpio for driving the external 5v power supply switch according to the situation of entering the host mode. When switching to the host mode, the VBUS_ON0 cannot be high before the vbus - gpio is driven high.
An example of the configuration of the otg node in the solution dts is as follows (assuming that the pinctrl configuration uses the pinctrl_usb0_1 node in k1 - x_pinctrl.dtsi), refer to k1 - x_evb.dts:
```c
&extcon {
        status = "okay";
};
&otg {
        spacemit, udc - mode = <MV_USB_MODE_OTG>;
        spacemit, extern - attr = <MV_USB_HAS_VBUS_IDPIN_DETECTION>;
        pinctrl - names = "default";
        pinctrl - 0 = <&pinctrl_usb0_1>;
        vbus - gpios = <&gpio 63 0>;
        status = "okay";
};
&usbphy {
        status = "okay";
};
&udc {
        spacemit, udc - mode = <MV_USB_MODE_OTG>;
        spacemit, extern - attr = <MV_USB_HAS_VBUS_IDPIN_DETECTION>;
        status = "okay";
};
&ehci {
        spacemit, udc - mode = <MV_USB_MODE_OTG>;
        status = "okay";
};
```
The recognition and switching process of the otg mode is as follows:
1. In the default case of no connection, the USB_ID0 is in a floating state, the VBUS_ON0 is low, and the corresponding VBUS has no input and no output.
2. In the default state, if the VBUS_ON0 is suddenly detected as high (the USB_ID0 remains unchanged), it indicates that a host is supplying power to the usb2otg port, and the driver will switch to the device mode.
3. In the default state, if the USB_ID0 is suddenly detected as being pulled low (until the vbus - gpio is pulled high, the VBUS_ON0 cannot be high), the driver will operate the vbus - gpio to output high, and then the usb2otg port can provide VBUS 5V power supply to the outside. Then the hardware needs to pull the VBUS_ON0 high (it is recommended that the VBUS_ON0 is connected to the actual VBUS of the usb2otg port). After the driver detects that the VBUS_ON0 is pulled high, it switches to the host mode.
## usb2.0host
The device tree node of the usb2.0host controller is ehci1, and the corresponding phy node is usbphy1. These two nodes need to be enabled, and there are no configuration parameters for the nodes. If there is a dynamic switch circuit for the external vbus, the pinctrl attribute subnode needs to be configured.
## usb3.0drd
The device tree node of the usb3.0drd controller is usbdrd3, the corresponding high - speed utmi phy node is usb2phy, and the corresponding superspeed pipe phy node is combphy. When using the usb3.0drd controller, these two nodes need to be enabled. There are no parameter configurations for the phy nodes.
Some parameters of the usb3.0drd controller are configured through the subnode dwc3 node of the usbdrd3 node in the dts, and the following parameters need to be configured:
```c
&usbdrd3 {
        status = "okay";
        dwc3@c0a00000 {
                dr_mode = "host";
                phy_type = "utmi";
                snps, hsphy_interface = "utmi";
                snps, dis_enblslpm_quirk;
                snps, dis_u2_susphy_quirk;
                snps, dis_u3_susphy_quirk;
                snps, dis - del - phy - power - chg - quirk;
                snps, dis - tx - ipgap - linecheck - quirk;
        };
};
```
### Working in device only mode
The role of the usb3.0drd controller is configured through the dr_mode attribute of the subnode dwc3 of the usbdrd3 node. The optional values are host, peripheral, and otg. If the dr_mode attribute is configured as peripheral, it works in device only mode.
### Working in host only mode
Refer to the section on working in device only mode, and if the dr_mode attribute is configured as host, it works in host only mode.
### Working in otg mode
When configuring the dr_mode to otg mode, the usb - role - switch option needs to be configured in the dts node. The corresponding default role can be configured through the role - switch - default - mode, and the optional values are host and peripheral.
```c
dwc3@c0a00000 {
        dr_mode = "otg";
        usb - role - switch;
       .... Other parameters are omitted, please refer to the above configuration
        role - switch - default - mode = "host";
};
```
After the configuration, a c0a00000.dwc3 - role - switch node will appear under /sys/class/usb_role/. Currently, the dwc3 driver does not enable the function of switching roles through the sysfs of the usb_role framework, and the role can be switched through debugfs:
```c
# Check the current role of the controller:
cat /sys/kernel/debug/usb/c0a00000.dwc3/mode
# Switch to the host role:
echo host > /sys/kernel/debug/usb/c0a00000.dwc3/mode
# Switch to the device role:
echo device > /sys/kernel/debug/usb/c0a00000.dwc3/mode
```
The above is the configuration description for supporting manual switching of the controller role. If the function of automatically detecting the otg needs to be supported, an additional detection chip driver needs to be configured, such as the typec port controller driver connected to the kernel typec framework or the pin detection hardware driver connected to the extcon framework.