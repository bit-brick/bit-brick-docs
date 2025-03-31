# K1 Pro GPIO Extension Interface
K1 Pro reserves a 40-pin GPIO extension interface, using a 2.54 double-row straight insertion socket, which is convenient for enthusiasts to connect peripherals according to their own needs and expand different functions. Our system will set these IOs to some specific functions by default, but users can reconfigure them through software to make these general-purpose IOs have some special functions, because these IOs are all multi-functional multiplexed pins.
![img](/img/k1pro/hardware/gpio_detail.png)

## 1. Multifunctional Pin Definition List
All GPIOs can be set as general-purpose inputs or outputs, and can also be configured into more functions through the kernel. The following table shows the extended functions of each GPIO.


| Pin Number | Pin Definition |
|------------|----------------|
| 1          | 3.3V           |
| 2          | 5.0V           |
| 3          | PWM2_CH1_M2/I2C6_SDA_M2/UART4_RX_M0/SAI4_SDO_M3/ETH1_RXD0_M0/ GPIO2_D1_d |
| 4          | 5.0V           |
| 5          | PWM2_CH0_M2/I2C6_SCL_M2/UART4_TX_M0/SAI4_SDI_M3/ETH1_TXCTL_M0/GPIO2_D0_d |
| 6          | GND            |
| 7          | CAN0_TX_M2/I2C4_SCL_M1/UART6_TX_M0/SPI3_MOSI_M2/FLEXBUS0_D13_M1/PDM1_SDI3_M1/SAI4_SCLK_M0/GPIO4_A4_d |
| 8          | PWM2_CH2_M2/I3C1_SCL_M0/UART6_TX_M1/SAI4_MCLK_M3/ETH1_RXD1_M/CAM_CLK0_OUT_M1/GPIO2_D2_d |
| 9          | GND            |
| 10         | PWM2_CH3_M2/I3C1_SDA_M0/UART6_RX_M1/ETH1_RXCTL_M0/GPIO2_D3_d |
| 11         | CAN0_RX_M2/I2C4_SDA_M1/UART6_RX_M0/SPI3_MISO_M2/FLEXBUS0_D14_M1/PDM1_CLK0_M1/SAI4_LRCK_M0/GPIO4_A6_ |
| 12         | PWM2_CH4_M2/I2C9_SDA_M2/UART6_RTSN_M1/ETH1_MDC_M0/ISP_PRELIGHT_TRIG_M0/GPIO2_D4_d |
| 13         | PWM2_CH6_M0/SPI3_CLK_M2/SAI4_SDI_M0/SAI1_SDO0_M0/GPIO4_A7_d |
| 14         | GND            |
| 15         | UART2_RTSN_M1/UART6_RTSN_M0/UART5_TX_M1/SPI4_CLK_M2/FLEXBUS1_D13_M1/PDM1_CLK1_M1/SAI1_SDI3_M0/SAI1_SDO1_M0/GPIO4_B0_d |
| 16         | PWM2_CH5_M2/I2C9_SCL_M2/UART6_CTSN_M1/ETH1_MDIO_M0/ISP_FLASH_TRIGOUT_M0/GPIO2_D5_d |
| 17         | 3.3V           |
| 18         | PWM2_CH6_M2/I3C1_SDA_PU_M0/UART9_RTSN_M0/SPDIF_RX0_M2/SAI3_MCLK_M2/ETH0_MCLK_M1/ETH_CLK1_25M_OUT_M0/CAM_CLK1_OUT_M1/GPIO2_D6_d |
| 19         | I2C7_SDA_M1/SPI3_MOSI_M0/UART3_RX_M0/SAI3_LRCK_M2/ETH0_MDC_M1/ETH1_PPSTRIG_M0/VI_CIF_VSYNC/GPIO3_A1_d |
| 20         | GND            |
| 21         | MIPI_TE_M1/CAN1_TX_M3/SPI3_MISO_M0/UART3_CTSN_M0/SPDIF_RX1_M1/SAI3_SDO_M2/ETH0_RXCTL_M1/ETH1_PPSCLK_M0/VI_CIF_CLKO/GPIO3_A2_d |
| 22         | PWM1_CH0_M3/SPI2_CLK_M2/UART1_CTSN_M2/FLEXBUS0_CSN_M0/FLEXBUS1_D11/DSMC_RDYN/SAI4_SDI_M1/ETH_CLK0_25M_OUT_M0/VO_EBC_SDSHR/VO_LCDC_D23/GPIO3_A4_d |
| 23         | I2C7_SCL_M1/SPI3_CLK_M0/UART3_TX_M0/SAI3_SCLK_M2/ETH0_MDIO_M1/VI_CIF_HREF/GPIO3_A0_d |
| 24         | CAN1_RX_M3/SPI3_CSN0_M0/UART3_RTSN_M0/SPDIF_TX1_M1/SAI3_SDI_M2/ETH0_RXD1_M1/ETH1_PTP_REFCLK_M0/VI_CIF_CLKI/GPIO3_A3_d |
| 25         | GND            |
| 26         | PWM0_CH0_M3/SPI2_MOSI_M2/UART10_RX_M0/FLEXBUS0_D8/DSMC_CSN1/SAI4_MCLK_M1/ETH0_MCLK_M0/VO_EBC_SDCE3/VO_LCDC_D19/GPIO3_B0_d |
| 27         | I2C7_SDA_M2/UART3_RX_M1/FLEXBUS0_CSN_M1/FLEXBUS1_D13_M0/FLEXBUS0_D14_M0/DSMC_INT2/SAI4_SDO_M1/CAM_CLK2_OUT_M0/SPDIF_TX0_M1/VO_POST_EMPTY/GPIO4_A1_d |
| 28         | MIPI_TE_M2/I2C7_SCL_M2/SPI1_CSN1_M2/UART3_TX_M1/FLEXBUS1_CSN_M3/FLEXBUS1_D14_M0/FLEXBUS0_D13_M0/DSMC_INT0/SAI4_LRCK_M1/CAM_CLK1_OUT_M0/SPDIF_RX0_M1/GPIO4_A0_d |
| 29         | MIPI_TE_M0/SPI4_MISO_M2/FLEXBUS1_D15_M1/PDM1_SDI1_M1/SAI1_SDI1_M0/SAI1_SDO3_M0/GPIO4_B2_d |
| 30         | GND            |
| 31         | CAN1_RX_M2/I2C3_SDA_M0/UART2_RX_M1/FLEXBUS0_CSN_M4/SPDIF_RX0_M0/GPIO4_B4_d |
| 32         | PWM2_CH2_M3/SPI1_MISO_M2/UART8_RX_M0/FLEXBUS1_D6/DSMC_DATA4/SAI1_SDO0_M1/VO_EBC_SDDO6/VO_LCDC_D6/GPIO3_C5_d |
| 33         | CAN1_TX_M2/PCIE0_CLKREQN_M2/I2C3_SCL_M0/UART2_TX_M1/FLEXBUS0_D15_M1/SPDIF_TX0_M0/GPIO4_B5_d |
| 34         | GND            |
| 35         | CAN0_TX_M3/I2C5_SCL_M3/SPI2_CSN0_M2/UART11_TX_M0/FLEXBUS1_D7/DSMC_DATA5/SAI1_SDO1_M1/VO_EBC_SDDO7/VO_LCDC_D7/GPIO3_C4_d |
| 36         | SPI1_MOSI_M2/UART8_TX_M0/FLEXBUS1_D5/DSMC_DATA3/SAI1_LRCK_M1/VO_EBC_SDDO5/VO_LCDC_D5/GPIO3_C6_d |
| 37         | PWM2_CH2_M3/SPI1_MISO_M2/UART8_RX_M0/FLEXBUS1_D6/DSMC_DATA4/SAI1_SDO0_M1/VO_EBC_SDDO6/VO_LCDC_D6/GPIO3_C5_d |
| 38         | PWM2_CH3_M3/SPI1_CSN0_M2/UART8_CTSN_M0/FLEXBUS1_D3/DSMC_DATA1/SAI1_MCLK_M1/VO_EBC_SDDO3/VO_LCDC_D3/GPIO3_D0_d |
| 39         | GND            |
| 40         | PWM2_CH3_M1/CAN1_RX_M1/SPI4_CLK_M0/I2C6_SDA_M3/VP2_SYNC_OUT/SAI4_SCLK_M2/GPIO4_C7_d |

## Remarks:
### Voltage
All 3.3V, 5V, and ground on the board are not configurable, and all remaining pins are 3.3V, that is, the input and output of the GPIO are 3.3V. Of course, these pins are not 3.3V from the chip end, but all IOs are converted to 3.3V through level conversion.
### Input and Output
The high level of the GPIO is set to 3.3V, and the low level is 0V.