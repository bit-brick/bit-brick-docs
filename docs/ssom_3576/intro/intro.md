# Product Introduction


<span style={{
  display: 'flex',
  justifyContent: 'center',
  margin: '10px 0',
  }}>
 ![alt text](./static/image.png)
</span>


SSOM-3576 is a high-performance core module developed and designed based on the Rockchip RK3576 processor, suitable for applications such as smart terminals, industrial control, and edge computing.
It integrates a quad-core Cortex-A72 and a quad-core Cortex-A53 CPU, with a maximum frequency of up to 2.2GHz. The integrated ARM Mali-G52 MP4 GPU provides strong capabilities for multitasking and advanced graphics processing. The built-in NPU offers up to 6 TOPS of AI computing power, enabling efficient terminal AI workload inference and supporting applications such as edge computing and intelligent interaction.

The module leads out all functional signals through a 260-pin gold finger connector and features a wealth of high-speed interface signals, including Gigabit Ethernet, PCIe 2.1, USB 3.0, MIPI DSI/CSI, etc., facilitating flexible peripheral expansion and system integration. It supports ultra-high-definition video decoding up to 4K@120fps and multiple display configurations, meeting the needs of a wide range of multimedia and display-centric application scenarios.

With high performance, high stability, and excellent scalability, the SSOM-3576 is suitable for deployment in smart terminals, industrial tablet PCs, AI vision systems, and smart home control centers, providing developers with a stable and efficient embedded hardware platform.


## Functional Block Diagram

![alt text](./static/image-1.png)

## 规格参数
| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| CPU           | Rockchip RK3576, 四核Cortex-A72 + 四核Cortex-A53，主频最高可达2.2GHz |
| GPU           | ARM Mali-G52 MC3 GPU, 支持0penGL ES 1.1, 2.0 and 3.2/0penCL 2.1/Vulkan 1.2 |
| NPU           | 6 TOPS@INT8,支持INT4/INT8/INT16/FP16/BF16/TF32, 支持TensorFlow, PyTorch, Caffe等 |
| VPU           | 解码: 8K@30fps or 4K@120fps(H.265 HEVC/VP9/AVS2/AV1); 4K@60fps (H.264 AVC); 1080P@60fps(H.264 MVC);编码: 4K@60fps(H.265/H.264) |
| RAM           | 4GB/8GB LPDDR4X SDRAM                                        |
| Flash         | 32GB/64GB eMMC                                               |
| 视频          | 输出: 1x HDMI2.1(4K@120fps)/eDP(4K@60fps) combo; 1x MIPI-DSI(2560x1600@60fps) 输入:  1x DVP, support HDCP2.3; 1x MIPI-CSI DC PHY; 2x MIPI DPHY |
| ISP           | 1x 16MP ISP with HDR & 3DNR                                  |
| PCIe          | 2x PCIe2.1                                                   |
| Ethernet      | 2x Gigabit Ethernet                                          |
| USB           | 1x USB3.0; 2x USB2.0                                         |
| UART          | 9x                                                           |
| SDIO          | 2x                                                           |
| I2C           | 10x                                                          |
| SPI           | 4x                                                           |
| CAN FD        | 2x                                                           |
| PWM           | 8x                                                           |
| MIPI DSI      | 1x                                                           |
| MIPI CSI      | 2x                                                           |
| SATA          | 2x                                                           |
| eDP           | 1x                                                           |
| 电源          | DC 4V                                                        |
| 工作温度      | -20 ~ 75 °C                                                  |
| 尺寸（长X宽） | 69.6 x 43mm                                                  |
| 操作系统      | Linux/Android                                                |


## 引脚定义
| 引脚编号 | 引脚定义 | 对应GPIO | 引脚编号 | 引脚定义      | 对应GPIO |
| ---------------------------- | ---------------------------- | ---------------------------- | ---------------------------- | ----------------------- | ---------------------------- |
| 1                            | GND                          |                              | 2                            | GND                     |                              |
| 3                            | PHY1_LED1/CFG_LDO0           |                              | 4                            | CSI1_DP0                |                              |
| 5                            | PHY1_LED2/CFG_LDO1           |                              | 6                            | CSI1_DN0                |                              |
| 7                            | GND                          |                              | 8                            | GND                     |                              |
| 9                            | PHY1_MDI0+                   |                              | 10                           | CSI1_CKP                |                              |
| 11                           | PHY1_MDI0-                   |                              | 12                           | CSI1_CKN                |                              |
| 13                           | GND                          |                              | 14                           | GND                     |                              |
| 15                           | PHY1_MDI1+                   |                              | 16                           | CSI1_DP1                |                              |
| 17                           | PHY1_MDI1-                   |                              | 18                           | CSI1_DN1                |                              |
| 19                           | GND                          |                              | 20                           | GND                     |                              |
| 21                           | PHY1_MDI2+                   |                              | 22                           | CSI1_DP2                |                              |
| 23                           | PHY1_MDI2-                   |                              | 24                           | CSI1_DN2                |                              |
| 25                           | GND                          |                              | 26                           | GND                     |                              |
| 27                           | PHY1_MDI3+                   |                              | 28                           | CSI1_DP3                |                              |
| 29                           | PHY1_MDI3-                   |                              | 30                           | CSI1_DN3                |                              |
| 31                           | GND                          |                              | 32                           | GND                     |                              |
| 33                           | PHY0_LED1/CFG_LDO0           |                              | 34                           | CSI3_DP0                |                              |
| 35                           | PHY0_LED2/CFG_LDO1           |                              | 36                           | CSI3_DN0                |                              |
| 37                           | GND                          |                              | 38                           | GND                     |                              |
| 39                           | PHY0_MDI0+                   |                              | 40                           | CSI3_CKP                |                              |
| 41                           | PHY0_MDI0-                   |                              | 42                           | CSI3_CKN                |                              |
| 43                           | GND                          |                              | 44                           | GND                     |                              |
| 45                           | PHY0_MDI1+                   |                              | 46                           | CSI3_DP1                |                              |
| 47                           | PHY0_MDI1-                   |                              | 48                           | CSI3_DN1                |                              |
| 49                           | GND                          |                              | 50                           | GND                     |                              |
| 51                           | PHY0_MDI2+                   |                              | 52                           | CSI3_DP2                |                              |
| 53                           | PHY0_MDI2-                   |                              | 54                           | CSI3_DN2                |                              |
| 55                           | GND                          |                              | 56                           | GND                     |                              |
| 57                           | PHY0_MDI3+                   |                              | 58                           | CSI3_DP3                |                              |
| 59                           | PHY0_MDI3-                   |                              | 60                           | CSI3_DN3                |                              |
| 61                           | GND                          |                              | 62                           | GND                     |                              |
| 63                           | ETH_CLK0_25M_OUT_M0          | GPIO3_A4_d                   | 64                           | CSI2_CKP                |                              |
| 65                           | ETH_CLK1_25M_OUT_M0          | GPIO2_D6_d                   | 66                           | CSI2_CKN                |                              |
| 67                           | GND                          |                              | 68                           | GND                     |                              |
| 69                           | USB3_OTG0_SSTX1P             |                              | 70                           | CSI1_PWDN               | GPIO4_A4_d                   |
| 71                           | USB3_OTG0_SSTX1N             |                              | 72                           | CSI1_RST                | GPIO4_A6_d                   |
| 73                           | GND                          |                              | 74                           | GND                     |                              |
| 75                           | EDP_TX_AUXP                  |                              | 76                           | I2C4_SCL_M3_MIPI_CAM0/2 | GPIO3_C0_d                   |
| 77                           | EDP_TX_AUXN                  |                              | 78                           | I2C4_SDA_M3_MIPI_CAM0/2 | GPIO3_B7_d                   |
| 79                           | GND                          |                              | 80                           | GND                     |                              |
| 81                           | USB2_OTG0_DP                 |                              | 82                           | CSI3_RST                | GPIO3_D4_d                   |
| 83                           | USB2_OTG0_DM                 |                              | 84                           | CSI3_PWDN               | GPIO3_C7_d                   |
| 85                           | GND                          |                              | 86                           | GND                     |                              |
| 87                           | USB2_OTG1_DP                 |                              | 88                           | CSI_MCLK                | GPIO3_D7_d                   |
| 89                           | USB2_OTG1_DM                 |                              | 90                           | USB2_PWREN              | GPIO2_B7_d                   |
| 91                           | GND                          |                              | 92                           | GND                     |                              |
| 93                           | USB3_OTG0_SSRX1P             |                              | 94                           | USB3_PWREN              | GPIO3_A1_d                   |
| 95                           | USB3_OTG0_SSRX1N             |                              | 96                           | LCD_BL_PWM1_CH1_M0      | GPIO0_B5_d                   |
| 97                           | GND                          |                              | 98                           | GND                     |                              |
| 99                           | MIPI_DSI1_D3N                |                              | 100                          | I2C3_SCL_M2             | GPIO3_D5_d                   |
| 101                          | MIPI_DSI1_D3P                |                              | 102                          | I2C3_SDA_M2             | GPIO3_D6_d                   |
| 103                          | GND                          |                              | 104                          | GND                     |                              |
| 105                          | MIPI_DSI1_D2N                |                              | 106                          | USB1_PWREN              | GPIO2_B6_d                   |
| 107                          | MIPI_DSI1_D2P                |                              | 108                          | GPIO3_B0                | GPIO3_B0_d                   |
| 109                          | GND                          |                              | 110                          | GPIO3_D0                | GPIO3_D0_d                   |
| 111                          | MIPI_DSI1_CLKN               |                              | 112                          | GMAC1_MCLKINOUT_M0      | GPIO2_D7_d                   |
| 113                          | MIPI_DSI1_CLKP               |                              | 114                          | GPIO3_A0_d              | GPIO3_A0_d                   |
| 115                          | GND                          |                              | 116                          | PCIE0_CLKREQn_M0        | GPIO2_B2_d                   |
| 117                          | MIPI_DSI1_D1N                |                              | 118                          | PCIE1_PERSTn            | GPIO2_A6_d                   |
| 119                          | MIPI_DSI1_D1P                |                              | 120                          | PCIE0_PERSTn            | GPIO2_B1_d                   |
| 121                          | GND                          |                              | 122                          | PCIE0_WAKEN_M0          | GPIO0_D2_d                   |
| 123                          | MIPI_DSI1_D0N                |                              | 124                          | SDMMC0_PWREN_H          | GPIO0_B6_d                   |
| 125                          | MIPI_DSI1_D0P                |                              | 126                          | CLK1_32K_OUT_WIFI       | GPIO1_D5_d                   |
| 127                          | GND                          |                              | 128                          | GND                     |                              |
| 129                          | HDMI_TXCN                    |                              | 130                          | GPIO0_C3_d              | GPIO0_C3_d                   |
| 131                          | HDMI_TXCP                    |                              | 132                          | GPIO0_C4_d              | GPIO0_C4_d                   |
| 133                          | GND                          |                              | 134                          | GND                     |                              |
| 135                          | HDMI_TX0N                    |                              | 136                          | HDMI_CEC                | GPIO4_C0_d                   |
| 137                          | HDMI_TX0P                    |                              | 138                          | HDMI_HPD                | GPIO4_C1_d                   |
| 139                          | GND                          |                              | 140                          | LCD_BL_EN               | GPIO0_D1_d                   |
| 141                          | HDMI_TX1N                    |                              | 142                          | LCD_PWREN_H             | GPIO0_C6_d                   |
| 143                          | HDMI_TX1P                    |                              | 144                          | LCD_RST_3V3             | GPIO0_C7_d                   |
| 145                          | GND                          |                              | 146                          | GND                     |                              |
| 147                          | HDMI_TX2N                    |                              | 148                          | SDMMC0_D1               | GPIO2_A1_d                   |
| 149                          | HDMI_TX2P                    |                              | 150                          | SDMMC0_CLK              | GPIO2_A5_d                   |
| 151                          | GND                          |                              | 152                          | SDMMC0_D3               | GPIO2_A3_d                   |
| 153                          | USB3_OTG0_SSRX2N             |                              | 154                          | SDMMC0_DET_L            | GPIO0_A6_u                   |
| 155                          | USB3_OTG0_SSRX2P             |                              | 156                          | SDMMC0_D2               | GPIO2_A2_d                   |
| 157                          | GND                          |                              | 158                          | SDMMC0_CMD              | GPIO2_A4_d                   |
| 159                          | PCIE0_REFCLKN                |                              | 160                          | SDMMC0_D0               | GPIO2_A0_d                   |
| 161                          | PCIE0_REFCLKP                |                              | 162                          | HDMI_SCL                | GPIO4_C2_d                   |
| 163                          | GND                          |                              | 164                          | HDMI_SDA                | GPIO4_C3_d                   |
| 165                          | PCIE0_RXN                    |                              | 166                          | I2C5_SDA_M3/CAN0_RX_M3  | GPIO3_C1_d                   |
| 167                          | PCIE0_RXP                    |                              | 168                          | I2C5_SCL_M3/CAN0_TX_M3  | GPIO3_C0_d                   |
| 169                          | GND                          |                              | 170                          | I2C7_SCL_M2             | GPIO4_A0_d                   |
| 171                          | USB3_OTG0_SSTX2N             |                              | 172                          | I2C7_SDA_M2             | GPIO4_A1_d                   |
| 173                          | USB3_OTG0_SSTX2P             |                              | 174                          | I2C0_SCL_M1_TP          | GPIO0_C1_d                   |
| 175                          | GND                          |                              | 176                          | I2C0_SDA_M1_TP          | GPIO0_C2_d                   |
| 177                          | PCIE0_TXN                    |                              | 178                          | GND                     |                              |
| 179                          | PCIE0_TXP                    |                              | 180                          | MIPI_LCD_ADC_1V8        | GPIO4_A7_d                   |
| 181                          | GND                          |                              | 182                          | GND                     |                              |
| 183                          | DP_TX_AUXN                   |                              | 184                          | SARADC_VIN3_HP_HOOK     |                              |
| 185                          | DP_TX_AUXP                   |                              | 186                          | UART8_RX_M0             | GPIO3_C5_d                   |
| 187                          | GND                          |                              | 188                          | UART8_TX_M0             | GPIO3_C6_d                   |
| 189                          | PCIE1_RXN                    |                              | 190                          | GND                     |                              |
| 191                          | PCIE1_RXP                    |                              | 192                          | UART2_RX_M1             | GPIO4_B4_d                   |
| 193                          | GND                          |                              | 194                          | UART2_TX_M1             | GPIO4_B5_d                   |
| 195                          | NC                           |                              | 196                          | SARADC_VIN0_BOOT        |                              |
| 197                          | NC                           |                              | 198                          | SARADC_VIN2_HW_ID       |                              |
| 199                          | GND                          |                              | 200                          | GND                     |                              |
| 201                          | PCIE1_REFCLKN                |                              | 202                          | TP_INT_L                | GPIO0_C5_d                   |
| 203                          | PCIE1_REFCLKP                |                              | 204                          | TP_RST                  | GPIO0_D0_d                   |
| 205                          | GND                          |                              | 206                          | GND                     |                              |
| 207                          | PCIE1_TXN                    |                              | 208                          | UART0_RX_M0_DEBUG       | GPIO0_D5_u                   |
| 209                          | PCIE1_TXP                    |                              | 210                          | UART0_TX_M0_DEBUG       | GPIO0_D4_u                   |
| 211                          | GND                          |                              | 212                          | UART4_CTSN_M1           | GPIO1_C3_u                   |
| 213                          | PCIE1_WAKEN_M0               | GPIO2_A7_d                   | 214                          | UART4_RTSN_M1           | GPIO1_C2_u                   |
| 215                          | GND                          |                              | 216                          | UART4_RX_M1             | GPIO1_C5_u                   |
| 217                          | PCIE1_CLKREQn_M0             | GPIO2_B3_d                   | 218                          | UART4_TX_M1             | GPIO1_C4_u                   |
| 219                          | GPIO0_B4_d                   | GPIO0_B4_d                   | 220                          | SAI2_SCLK_M0            | GPIO1_D1_d                   |
| 221                          | GND                          |                              | 222                          | SAI2_LRCK_M0            | GPIO1_D2_d                   |
| 223                          | SDMMC1_D0_M0                 | GPIO1_B4_d                   | 224                          | SAI2_SDI_M0             | GPIO1_D3_d                   |
| 225                          | SDMMC1_D1_M0                 | GPIO1_B5_d                   | 226                          | SAI2_SDO_M0             | GPIO1_D0_d                   |
| 227                          | SDMMC1_D2_M0                 | GPIO1_B6_d                   | 228                          | SAI1_SDO2_M0            | GPIO4_B1_d                   |
| 229                          | SDMMC1_D3_M0                 | GPIO1_B7_d                   | 230                          | SAI1_SCLK_M0            | GPIO4_A3_d                   |
| 231                          | SDMMC1_CMD_M0                | GPIO1_C0_d                   | 232                          | SAI1_LRCK_M0            | GPIO4_A5_d                   |
| 233                          | SDMMC1_CLK_M0                | GPIO1_C1_d                   | 234                          | SAI1_MCLK_M0            | GPIO4_A2_d                   |
| 235                          | GND                          |                              | 236                          | SAI1_SDI0_M0            | GPIO4_B3_d                   |
| 237                          | WL_DIS_N                     | GPIO4_B2_d                   | 238                          | HP_DET_L                | GPIO2_B5_d                   |
| 239                          | WIFI_REG_ON_H                | GPIO1_C6_d                   | 240                          | PA_SHUTDOWN             | GPIO4_B0_d                   |
| 241                          | HOST_WAKE_BT_H               | GPIO1_D4_d                   | 242                          | SPI4_CLK_M0             | GPIO4_C7_d                   |
| 243                          | BT_REG_ON_H                  | GPIO1_C7_d                   | 244                          | SPI4_MISO_M0            | GPIO4_C6_d                   |
| 245                          | WIFI_WAKE_HOST_H             | GPIO0_B0_z                   | 246                          | SPI4_MOSI_M0            | GPIO4_C5_d                   |
| 247                          | BT_WAKE_HOST_H               | GPIO0_B1_z                   | 248                          | SPI4_CSN0_M0            | GPIO4_C4_d                   |
| 249                          | PCIE0_PWREN_H                | GPIO0_D3_d                   | 250                          | PWRON_L                 |                              |
| 251                          | SARADC_VIN1_KEY/RECOVERY     |                              | 252                          | RESET_L                 |                              |
| 253                          | VCC5V0_SYS_S5                |                              | 254                          | VCC5V0_SYS_S5           |                              |
| 255                          | VCC5V0_SYS_S5                |                              | 256                          | VCC5V0_SYS_S5           |                              |
| 257                          | VCC5V0_SYS_S5                |                              | 258                          | VCC5V0_SYS_S5           |                              |
| 259                          | VCC5V0_SYS_S5                |                              | 260                          | RTC_VBAT                |                              |



## Mechanical Dimensions

![alt text](./static/image-2.png)