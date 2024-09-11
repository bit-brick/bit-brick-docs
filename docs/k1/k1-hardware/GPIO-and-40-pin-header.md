# GPIO 扩展接口

K1预留了一个40Pin的GPIO扩展接口，采用2.54双列直插的座子，方便爱好者们可以根据自己的需求连接外设，扩展出来不同的功能。我们的系统会将这些IO默认设置为一些特定功能，但是用户可以通过软件的重新配置是这些通用的IO具备一些特殊的功能，因为这些IO都是多功能复用的引脚。
![图1 k1_gpio](/img/k1/hardware/k1_gpio.png)

## 1.引脚定义

| Pin | Pin Number | Pin Number | Pin |
|-----|------------|------------|-----|
| VCC_3.3V | 1 | 2 | VCC_5.0V |
| I2C4_SDA | 3 | 4 | VCC_5.0V |
| I2C4_SCL | 5 | 6 | GND |
| GPIO7_IO00 | 7 | 8 | UART0_TXD |
| GND | 9 | 10 | UART0_RXD |
| GPIO7_IO01 | 11 | 12 | GPIO7_IO04 |
| GPIO7_IO02 | 13 | 14 | GND |
| GPIO7_IO03 | 15 | 16 | GPIO9_IO01 |
| VCC_3.3V | 17 | 18 | GPIO9_IO02 |
| SPI3_MOSI | 19 | 20 | GND |
| SPI3_MISO | 21 | 22 | GPIO4_IO09 |
| SPI3_SCLK | 23 | 24 | SPI3_CS |
| GND | 25 | 26 | GPIO5_IO00 |
| I2C3_SDA | 27 | 28 | I2C3_SCL |
| GPIO2_IO09 | 29 | 30 | GND |
| GPIO3_IO00 | 31 | 32 | GPIO3_IO04 |
| GPIO3_IO01 | 33 | 34 | GND |
| GPIO3_IO02 | 35 | 36 | GPIO3_IO05 |
| GPIO3_IO03 | 37 | 38 | GPIO3_IO06 |
| GND | 39 | 40 | GPIO3_IO07 |

## 2.多功能引脚定义列表
所有的GPIO都可以设置成通用的输入或者输出，也能通过内核配置成更多功能。下面的表格给我们展示了各个GPIO的扩展功能。


| 引脚号 | 功能1 | 功能2 | 功能3 | 功能4 | 功能5 | 功能6 |
|---|---|---|---|---|---|---|
| 3 | I2C4_SDA | GPIO[52] | R_SPI_RXD | R_UART1_RXD | R_PWM7 |  |
| 5 | I2C4_SCL | GPIO[51] | R_SPI_TXD | R_UART1_TXD | R_PWM6 |  |
| 7 | GPIO_70 | AP_I2C2_SCL | DCLK \<SPI_LCD\> | UART5_TXD |  |  |
| 8 | R_UART0_TXD | GPIO[47] | R_CAN_TX0 | R_PWM8 | AP_I2C3_SCL | ONE_WIRE |
| 10 | R_UART0_RXD | GPIO[48] | R_CAN_RX0 | R_IR_RX | AP_I2C3_SDA | KP_MKOUT[2] |
| 11 | GPIO_71 | AP_I2C2_SDA | DCX/DOUT1 \<SPI_LCD\> | UART5_RXD |  |  |
| 12 | GPIO_74 | PWM9 | CS\<SPI_LCD\> | PCIe2_WAKEN |  |  |
| 13 | GPIO_72 | UART9_TXD | DIN\<SPI_LCD\> | UART5_CTS_N |  |  |
| 15 | GPIO_73 | UART9_RXD | DOUT0 \<SPI_LCD\> | UART5_RTS_N |  |  |
| 16 | GPIO_91 | MN_CLK2 | VCXO_OUT | DSI_TE | R_I2C0_SCL |  |
| 18 | GPIO_92 | MN_CLK | PWM7 | R_I2C0_SDA |  |  |
| 19 | SPI3_MOSI | SPI2_TXD | AP_I2C3_SCL | UART8_CTS_N | R_PWM0 | KP_MKOUT[2] |
| 20 | GPIO_49 | R_SPI_SCLK | R_UART1_CTS_N | R_PWM4 | R_I2C0_SCL | KP_MKIN[3] |
| 21 | SPI3_MISO | SPI2_RXD | AP_I2C3_SDA | UART8_RTS_N | R_PWM1 | KP_MKIN[3] |
| 23 | SPI3_SCLK | SPI2_SCLK | CAN_TX0 | UART8_TXD | AP_I2C4_SCL |  |
| 24 | SPI3_CS | SPI2_FRM | CAN_RX0 | UART8_RXD | AP_I2C4_SDA |  |
| 26 | GPIO_50 | R_SPI_FRM | R_UART1_RTS_N | R_PWM5 | R_I2C0_SDA | KP_MKOUT[3] |
| 27 | I2C3_SDA | GPIO[39] | GMAC1_TX_D3 | R_I2S3_LRCK | PWM9 |  |
| 28 | I2C3_SCL | GPIO[38] | GMAC1_TX_D2 | R_I2S3_SCLK | PWM8 |  |
| 29 | GPIO_29 | GMAC1_RXDV | UART1_TXD | PWM1 | PCIe0_PERSTN |  |
| 31 | GPIO_30 | GMAC1_RX_D0 | UART1_RXD | PWM2 | PCIe0_WAKEN |  |
| 32 | GPIO_34 | GMAC1_RX_D3 | UART4_RXD | PWM4 | PCIe1_CLKREQN |  |
| 33 | GPIO_31 | GMAC1_RX_D1 | UART1_CTS_N | 32K_OUT | PCIe0_CLKREQN |  |
| 35 | GPIO_32 | GMAC1_RX_CLK | UART1_RTS_N | MN_CLK | PCIe1_PERSTN |  |
| 36 | GPIO_35 | GMAC1_TX_D0 | UART4_CTS_N | PWM5 | PCIe2_PERSTN |  |
| 37 | GPIO_33 | GMAC1_RX_D2 | UART4_TXD | PWM3 | PCIe1_WAKEN |  |
| 38 | GPIO_36 | GMAC1_TX_D1 | UART4_RTS_N | PWM6 | PCIe2_WAKEN |  |
| 40 | GPIO_37 | GMAC1_TX | PWM7 | PCIe2_CLKREQN |  |

## 备注：

### 电压

板子上所有的3.3V，5V和地都是不能配置的，剩下的所有引脚都是3.3V的，也就是说GPIO的输入和输出都是3.3V的，当然这些引脚从芯片端并不是3.3V，而是通过电平转换将所有的IO都转换成3.3V。

### 输入输出

GPIO的高电平设置为3.3V,低电平是0V。