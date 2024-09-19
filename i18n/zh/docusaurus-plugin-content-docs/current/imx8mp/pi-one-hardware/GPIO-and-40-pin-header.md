# GPIO and 40-pin header

A powerful feature of the PI ONE is the row of GPIO (general-purpose input/output) pins along the top edge of the board. A 40-pin GPIO header is found on all current Pi series boards. The GPIO headers on all boards have a 0.1in (2.54mm) pin pitch.

![img](/img/imx8mp/hardware/gpio_detail.png)

## Pin Assignment

| Pin # | Function                | Pin # | Function                |
|-------|-------------------------|-------|-------------------------|
| 1     | CAN_TX                  | 2     | CAN_RX                  |
| 3     | ECSPI2_SS0             | 4     | ECSPI2_SCLK            |
| 5     | ECSPI2_MOSI            | 6     | ECSPI2_MISO            |
| 7     | GPIO1_IO08             | 8     | GPIO1_IO14              |
| 9     | GPIO1_IO09             | 10    | GPIO1_IO10              |
| 11    | GPIO1_IO06             | 12    | GPIO1_IO07              |
| 13    | UART3_CTS_3V3          | 14    | UART3_RTS_3V3          |
| 15    | GND                     | 16    | GND                     |
| 17    | UART4_RXD_3V3          | 18    | UART4_TXD_3V3          |
| 19    | UART3_TXD_3V3          | 20    | UART3_RXD_3V3          |
| 21    | QSPIA_nSS0             | 22    | QSPIA_DATA0            |
| 23    | QSPIA_SCLK            | 24    | QSPIA_DATA1            |
| 25    | SD3_DATA0              | 26    | QSPIA_DATA2            |
| 27    | SD3_DATA1              | 28    | QSPIA_DATA3            |
| 29    | SD3_DATA2              | 30    | SD3_DATA5              |
| 31    | GND                     | 32    | GND                     |
| 33    | SD3_DATA3              | 34    | SD3_DATA4              |
| 35    | I2C4_SCL_3V3           | 36    | I2C4_SDA_3V3           |
| 37    | I2C3_SCL_3V3           | 38    | I2C3_SDA_3V3           |
| 39    | 3.3V                   | 40    | 5V                       |

## Voltages

5V pins and 3.3V pins are present on the board, as well as a number of ground pins (GND), which cannot be reconfigured. The remaining pins are all general-purpose 3.3V pins, meaning outputs are set to 3.3V and inputs are 3.3V-tolerant.

## Outputs

A GPIO pin designated as an output pin can be set to high (3.3V) or low (0V).

## Inputs

A GPIO pin designated as an input pin can be read as high (3.3V) or low (0V). This is made easier with the use of internal pull-up or pull-down resistors. Pins GPIO2 and GPIO3 have fixed pull-up resistors, but for other pins, this can be configured in software.