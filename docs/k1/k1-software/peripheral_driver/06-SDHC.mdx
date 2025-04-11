Introduction to the Functions and Usage Methods of SDHC.
## pinctrl
There are three slots for sdhc, slot1 supports sd/sdio (1/4 bit), slot2 supports sdio/emmc (1/4 bit), and slot3 only supports emmc (1/4/8 bit).
In the solution, generally, slot1 is used for sd, slot2 is used for sdio, and slot3 is used for emmc.
Both sd and sdio need to configure the pinctl of the signal lines of the card to be in mode0 mode, corresponding to pinctrl_mmc1 and pinctrl_mmc2 respectively.
The pinctl of mmc1 also has a fast mode, and when the clock is higher than 100M, it needs to be switched to the pinctrl_mmc1_fast mode.
```c
    pinctrl_mmc1: mmc1_grp {
        pinctrl - single, pins = <
            K1X_PADCONF(MMC1_DAT3, MUX_MODE0, (EDGE_NONE | PULL_UP | PAD_3V_DS4))         /* mmc1_d3 */
            K1X_PADCONF(MMC1_DAT2, MUX_MODE0, (EDGE_NONE | PULL_UP | PAD_3V_DS4))         /* mmc1_d2 */
            K1X_PADCONF(MMC1_DAT1, MUX_MODE0, (EDGE_NONE | PULL_UP | PAD_3V_DS4))         /* mmc1_d1 */
            K1X_PADCONF(MMC1_DAT0, MUX_MODE0, (EDGE_NONE | PULL_UP | PAD_3V_DS4))         /* mmc1_d0 */
            K1X_PADCONF(MMC1_CMD,  MUX_MODE0, (EDGE_NONE | PULL_UP | PAD_3V_DS4))         /* mmc1_cmd */
            K1X_PADCONF(MMC1_CLK,  MUX_MODE0, (EDGE_NONE | PULL_DOWN | PAD_3V_DS4))       /* mmc1_clk */
        >;
    };
    pinctrl_mmc1_fast: mmc1_fast_grp {
        pinctrl - single, pins = <
            K1X_PADCONF(MMC1_DAT3, MUX_MODE0, (EDGE_NONE | PULL_UP | PAD_1V8_DS3))         /* mmc1_d3 */
            K1X_PADCONF(MMC1_DAT2, MUX_MODE0, (EDGE_NONE | PULL_UP | PAD_1V8_DS3))         /* mmc1_d2 */
            K1X_PADCONF(MMC1_DAT1, MUX_MODE0, (EDGE_NONE | PULL_UP | PAD_1V8_DS3))         /* mmc1_d1 */
            K1X_PADCONF(MMC1_DAT0, MUX_MODE0, (EDGE_NONE | PULL_UP | PAD_1V8_DS3))         /* mmc1_d0 */
            K1X_PADCONF(MMC1_CMD,  MUX_MODE0, (EDGE_NONE | PULL_UP | PAD_1V8_DS3))         /* mmc1_cmd */
            K1X_PADCONF(MMC1_CLK,  MUX_MODE0, (EDGE_NONE | PULL_DOWN | PAD_1V8_DS3))       /* mmc1_clk */
        >;
    };
```
## gpio
The detection of sd is completed through gpio, and the gpio for card detection needs to be configured according to the actual schematic diagram.
```c
&sdhci0 {
        cd - gpios = <&gpio 80 0>;
        cd - inverted;
};
```
For example, the solution uses gpio80 for card detection, and the pintcl function of gpio80 also needs to be configured.
```c
&pinctrl {
        pinctrl - single, gpio - range = <
                &range GPIO_80  1 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_3V_DS4)
        >;
};
&gpio{
        gpio - ranges = <
                &pinctrl 80  GPIO_80  4
        >;
};
## Power Configuration
sd and sdio need to be configured with two power supplies, namely vmmc - supply and vqmmc - supply, which correspond to the function and io power supply of the card respectively. vqmmc - supply will dynamically switch the power supply according to the operating mode of the card. In the hardware design, it needs to ensure that it can support 3.3v and 1.8v.
The emmc is designed to ensure power supply and does not need to configure the power supply.
```c
&sdhci0 { 
        vmmc - supply = <&dcdc_4>;
        vqmmc - supply = <&ldo_1>;
}；
```
## tuning Configuration
sd needs to be tuned when running in high - speed mode, and the relevant parameters of tx and rx need to be adjusted for different hardware versions.
## dts Configuration
The complete solution configuration for sd is as follows:
```c
&sdhci0 {
        pinctrl - names = "default", "fast";
        pinctrl - 0 = <&pinctrl_mmc1>;
        pinctrl - 1 = <&pinctrl_mmc1_fast>;
        bus - width = <4>;
        cd - gpios = <&gpio 80 0>;
        cd - inverted;
        vmmc - supply = <&dcdc_4>;
        vqmmc - supply = <&ldo_1>;
        no - mmc;
        no - sdio;
        spacemit, sdh - host - caps - disable = <(
                        MMC_CAP_UHS_SDR12 |
                        MMC_CAP_UHS_SDR25
                        )>;
        spacemit, sdh - quirks = <(
                        SDHCI_QUIRK_BROKEN_CARD_DETECTION |
                        SDHCI_QUIRK_INVERTED_WRITE_PROTECT |
                        SDHCI_QUIRK_BROKEN_TIMEOUT_VAL
                        )>;
        spacemit, sdh - quirks2 = <(
                        SDHCI_QUIRK2_PRESET_VALUE_BROKEN |
                        SDHCI_QUIRK2_BROKEN_PHY_MODULE |
                        SDHCI_QUIRK2_SET_AIB_MMC
                        )>;
        spacemit, aib_mmc1_io_reg = <0xD401E81C>;
        spacemit, apbc_asfar_reg = <0xD4015050>;
        spacemit, apbc_assar_reg = <0xD4015054>;
        spacemit, rx_dline_reg = <0x0>;
        spacemit, tx_dline_reg = <0x0>;
        spacemit, tx_delaycode = <0xA0>;
        spacemit, rx_tuning_limit = <50>;
        spacemit, sdh - freq = <204800000>;
        status = "okay";
};
```
The complete solution configuration for emmc is as follows:
```c
/* eMMC */
&sdhci2 {
        bus - width = <8>;
        non - removable;
        mmc - hs400 - 1_8v;
        mmc - hs400 - enhanced - strobe;
        no - sd;
        no - sdio;
        spacemit, sdh - quirks = <(
                        SDHCI_QUIRK_BROKEN_CARD_DETECTION |
                        SDHCI_QUIRK_BROKEN_TIMEOUT_VAL
                        )>;
        spacemit, sdh - quirks2 = <(
                        SDHCI_QUIRK2_PRESET_VALUE_BROKEN
                        )>;
        spacemit, sdh - freq = <375000000>;
        status = "okay";
};
```