Introduction to the function and usage method of HDMI.
Provides 1 HDMI interface, supports HDMI1.4, and supports up to 1080P@60FPS.
## pinctrl
Supports two groups of hdmi pinctrl: pinctrl_hdmi_0 and pinctrl_hdmi_1, and only one of them can be selected.
```c
pinctrl_hdmi_0: hdmi_0_grp {
    pinctrl-single,pins = <
        K1X_PADCONF(GPIO_86, MUX_MODE1, (EDGE_NONE | PULL_UP | PAD_1V8_DS2))         /* hdmi_tx_hscl */
        K1X_PADCONF(GPIO_87, MUX_MODE1, (EDGE_NONE | PULL_UP | PAD_1V8_DS2))         /* hdmi_tx_hsda */
        K1X_PADCONF(GPIO_88, MUX_MODE1, (EDGE_NONE | PULL_DOWN | PAD_1V8_DS2))       /* hdmi_tx_hcec */
        K1X_PADCONF(GPIO_89, MUX_MODE1, (EDGE_NONE | PULL_DOWN | PAD_1V8_DS2))       /* hdmi_tx_pdp */
    >;
};
pinctrl_hdmi_1: hdmi_1_grp {
    pinctrl-single,pins = <
        K1X_PADCONF(GPIO_59, MUX_MODE1, (EDGE_NONE | PULL_UP | PAD_1V8_DS2))         /* hdmi_tx_hscl */
        K1X_PADCONF(GPIO_60, MUX_MODE1, (EDGE_NONE | PULL_UP | PAD_1V8_DS2))         /* hdmi_tx_hsda */
        K1X_PADCONF(GPIO_61, MUX_MODE1, (EDGE_NONE | PULL_UP | PAD_1V8_DS2))         /* hdmi_tx_hcec */
        K1X_PADCONF(GPIO_62, MUX_MODE1, (EDGE_NONE | PULL_UP | PAD_1V8_DS2))         /* hdmi_tx_pdp */
    >;
};
```
## dts Configuration
The HDMI-related configuration content is in k1 - x - hdmi.dtsi, including irq, clock, and power domain related configurations.
```c
display - subsystem - hdmi {
        compatible = "spacemit, saturn - hdmi";
        reg = <0 0xc0440000 0 0x2A000>;
        ports = <&dpu_online2_hdmi>;
};
dpu_online2_hdmi: port@c0440000 {
        compatible = "spacemit, dpu - online2";
        interrupt - parent = <&intc>;
        interrupts = <139>, <138>;
        interrupt - names = "ONLINE_IRQ", "OFFLINE_IRQ";
        clocks = <&ccu CLK_HDMI>;
        clock - names = "hmclk";
        assigned - clocks = <&ccu CLK_HDMI>;
        assigned - clock - parents = <&ccu CLK_PLL1_491>;
        assigned - clock - rates = <491520000>;
        resets = <&reset RESET_HDMI>;
        reset - names = "hdmi_reset";
        power - domains = <&power K1X_PMU_HDMI_PWR_DOMAIN>;
        pipeline - id = <ONLINE2>;
        ip = "spacemit - saturn";
        status = "disabled";
        dpu_online2_hdmi_out: endpoint@0 {
                remote - endpoint = <&hdmi_in>;
        };
};
hdmi: hdmi@C0400500 {
        compatible = "spacemit, hdmi";
        reg = <0 0xC0400500 0 0x200>;
        status = "disabled";
        port {
                #address - cells = <1>;
                #size - cells = <0>;
                hdmi_in: endpoint@0 {
                        reg = <0>;
                        remote - endpoint = <&dpu_online2_hdmi_out>;
                };
        };
};
```
The HDMI function is disabled by default, and whether to enable it is selected in the scheme configuration file.
```c
&dpu_online2_hdmi {
        memory - region = <&dpu_resv>;
        status = "okay";
};
&hdmi{
        pinctrl - names = "default";
        pinctrl - 0 = <&pinctrl_hdmi_0>;
        status = "okay";
};
```