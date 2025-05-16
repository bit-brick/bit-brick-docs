

# Rockchip Pinctrl开发文档



## 芯片名称与内核版本

| 芯片名称 | 内核版本 |
| --- | --- |
| RK3568/RK3399/RK3368/RK3288/PX30/RK3128/RK3126/RV1126 | Linux-4.19 |
| RK3588/RV1106 | Linux-5.10 |



## 前言

### 概述

本文介绍 Rockchip PIN-CTRL 驱动及 DTS 使用方法。

### 读者对象

本文档主要适用于以下工程师：
- 技术支持工程师
- 软件开发工程师



## 1. 引脚命名规则

Rockchip Pin 的 ID 按照 **控制器(bank)+端口(port)+索引序号(pin)** 组成。

### 1.1 GPIO（通用输入输出）

控制器和 GPIO 控制器数量一致，端口固定为 A、B、C 和 D，索引序号固定为 0、1、2、3、4、5、6、7。  
例如 RK3588，从 RK3588-TRM.pdf 的 Chapter 20 GPIO 章节可以看到，有 5 个 GPIO 控制器，每个控制器可以控制 32 个 IO，作为 GPIO 功能时，端口行为由 GPIO 控制器寄存器配置。

### 1.2 IOMUX（输入输出复用）

Rockchip Pin 可以复用成多种功能，同一个控制器如果存在多种复用引脚，一般叫做 m0、m1、m2 等等。例如 I2C 控制器有两组复用引脚，分别是 2cm0、i2cm1。  
引脚复用配置的寄存器是在 GRF/PMUGRF（RK3588 叫做 IOC）。  
例如 RK3588 BUS_IOC_GPIO1B_IOMUX_SEL_H Address: Operational Base + offset (0x002C)：
- gpio1b7_sel
    - 4'h0: GPIO
    - 4'h2: MIPI_CAMERA2_CLK_M0
    - 4'h3: SPDIF1_TX_M0
    - 4'h4: PCIE30X2_PERSTN_M3
    - 4'h5: HDMI_RX_CEC_M2
    - 4'h6: SATA2_ACT_LED_M1
    - 4'h9: I2C5_SDA_M3
    - 4'ha: UART1_RX_M1
    - 4'hb: PWM13_M2

如下是 RK3588 I2C5 的 IOMUX：  
多通路复用支持硬件设计更为灵活，当外设工作电压是 1.8V 或 3.3V 时，可以选择不同电压域 VCCIO 的引脚。  
**注意**：多通路复用的寄存器配置，对 TX 类的引脚没有用，对 RX 类的引脚起作用。

### 1.3 PULL（端口上下拉）

Rockchip IO PAD 的 bias 一般支持 3 种模式：
- bias-disable
- bias-pull-up
- bias-pull-down

上下拉配置是作用于 IO PAD，配置对 GPIO/IOMUX 都起作用。

### 1.4 DRIVE-STRENGTH（端口驱动强度）

Rockchip IO PAD 的驱动强度，根据不同工艺，支持不同强度配置。RK3399 之前的芯片，驱动强度配置按 mA 为单位配置；RK1808 之后芯片，一般按照 Level 为单位，档位的数值即为寄存器配置值。  
例如 RK3588 TRM 中 GPIO0_C7 的驱动强度等级如下：
- gpio0c7_ds
    - GPIO0C7 DS control Driver Strength Selection
        - 3'b000: 100ohm
        - 3'b100: 66ohm
        - 3'b010: 50ohm
        - 3'b110: 40ohm
        - 3'b001: 33ohm
        - 3'b101: 25ohm

软件驱动依然按照 Level 来处理，即上述寄存器描述对应：
- 3'b000: Level0
- 3'b100: Level4
- 3'b010: Level2
- 3'b110: Level6
- 3'b001: Level1
- 3'b101: Level5

DTS 中 `drive-strength=<5>;` 表示配置为 Level5，即寄存器写 3'b101。

### 1.5 SMT（端口斯密特触发器）

Rockchip IO PAD 大多数芯片支持 SMT 功能，默认不使能；使能 SMT 可以消除边沿抖动，加大 VIH VIL 的电压区间，增强 IO 的信号稳定性。一般 I2C 的 SCL/SDA 会默认使能 SMT 功能。

---

## 2. 驱动介绍

Rockchip pinctrl 驱动包括 Pinctrl 驱动（`drivers/pinctrl/pinctrl-rockchip.c`）和 GPIO 驱动（`drivers/gpio/gpio-rockchip.c`）。  
Pinctrl 驱动是主要驱动，提供 IO 的方法集，包括 PINMUX、PINCONF 和 GPIO。  
GPIO 驱动是完成 gpiochip 的功能，包括 GPIO 和 IRQ。

### 2.1 pinctrl-rockchip

//TO-DO

### 2.2 gpio-rockchip

//TO-DO

---

## 3. DTS介绍

Rockchip dts 一般把 pinctrl 节点放在 soc.dtsi，例如 rk3588s.dtsi，一般位于最后一个节点。  
pinctrl 节点没有 reg，它不是一个标准 platform device，寄存器基地值是通过 `rockchip,grf=<&grf>;` 传入；驱动内部根据这个基地值，加偏移地址，完成 IOMUX、PINCONF 的配置；GPIO 是使用 gpio 节点的 reg 地址。  
例如 `arch/arm64/boot/dts/rockchip/rk3588s.dtsi`：

```dts
{
    pinctrl: pinctrl {
        compatible = "rockchip,rk3588-pinctrl";
        rockchip,grf = <&ioc>;
        #address-cells = <2>;
        #size-cells = <2>;
        ranges;
        gpio0: gpio@fd8a0000 {
            compatible = "rockchip,gpio-bank";
            reg = <0x0 0xfd8a0000 0x0 0x100>;
            interrupts = <GIC_SPI 277 IRQ_TYPE_LEVEL_HIGH>;
            clocks = <&cru PCLK_GPIO0>, <&cru DBCLK_GPIO0>;
            gpio-controller;
            #gpio-cells = <2>;
            interrupt-controller;
            #interrupt-cells = <2>;
        };
        gpio1: gpio@fec20000 {
            compatible = "rockchip,gpio-bank";
            reg = <0x0 0xfec20000 0x0 0x100>;
            interrupts = <GIC_SPI 278 IRQ_TYPE_LEVEL_HIGH>;
            clocks = <&cru PCLK_GPIO1>, <&cru DBCLK_GPIO1>;
            gpio-controller;
            #gpio-cells = <2>;
            interrupt-controller;
            #interrupt-cells = <2>;
        };
        gpio2: gpio@fec30000 {
            compatible = "rockchip,gpio-bank";
            reg = <0x0 0xfec30000 0x0 0x100>;
            interrupts = <GIC_SPI 279 IRQ_TYPE_LEVEL_HIGH>;
            clocks = <&cru PCLK_GPIO2>, <&cru DBCLK_GPIO2>;
            gpio-controller;
            #gpio-cells = <2>;
            interrupt-controller;
            #interrupt-cells = <2>;
        };
        gpio3: gpio@fec40000 {
            compatible = "rockchip,gpio-bank";
            reg = <0x0 0xfec40000 0x0 0x100>;
            interrupts = <GIC_SPI 280 IRQ_TYPE_LEVEL_HIGH>;
            clocks = <&cru PCLK_GPIO3>, <&cru DBCLK_GPIO3>;
        };
        gpio4: gpio@fec50000 {
            compatible = "rockchip,gpio-bank";
            reg = <0x0 0xfec50000 0x0 0x100>;
            interrupts = <GIC_SPI 281 IRQ_TYPE_LEVEL_HIGH>;
            clocks = <&cru PCLK_GPIO4>, <&cru DBCLK_GPIO4>;
            gpio-controller;
            #gpio-cells = <2>;
            interrupt-controller;
            #interrupt-cells = <2>;
        };
    };
};
```

还有 `arch/arm64/boot/dts/rockchip/rk3588s-pinctrl.dtsi` 文件通过 include 形式加到 rk3588s.dtsi。

### 3.1 新建pinctrl

`rk3588s-pinctrl.dtsi` 文件已经枚举了 rk3588s 芯片所有 iomux 的实例，各模块一般不再需要创建 iomux 实例；创建 iomux 实例需要遵循如下规则：
1. 必须在 pinctrl 节点下
2. 必须以 function+group 的形式添加
3. function+group 的格式如下
4. 遵循其他 dts 的基本规则

### 3.2 引用pinctrl

模块引用 pinctrl 是通过 `pinctrl-names` 和 `pinctrl-0` 连接模块和 pinctrl 驱动。  
例如 rk3588 uart2：

```dts
{
    uart2: serial@feb50000 {
        compatible = "rockchip,rk3588-uart", "snps,dw-apb-uart";
        reg = <0x0 0xfeb50000 0x0 0x100>;
        interrupts = <GIC_SPI 333 IRQ_TYPE_LEVEL_HIGH>;
        clocks = <&cru SCLK_UART2>, <&cru PCLK_UART2>;
        clock-names = "baudclk", "apb_pclk";
        reg-shift = <2>;
        reg-io-width = <4>;
        dmas = <&dmac0 10>, <&dmac0 11>;
        pinctrl-names = "default";
        pinctrl-0 = <&uart2m1_xfer>;
        status = "disabled";
    };
};
```

`uart2m1_xfer` 是一个 pinctrl group；模块可以同时引用多组 group。  
例如 rk3588 pdm1：

```dts
{
    pdm1: pdm@fe4c0000 {
        compatible = "rockchip,rk3588-pdm";
        reg = <0x0 0xfe4c0000 0x0 0x1000>;
        clocks = <&cru MCLK_PDM1>, <&cru HCLK_PDM1>;
        clock-names = "pdm_clk", "pdm_hclk";
        assigned-clocks = <&cru MCLK_PDM1>;
        assigned-clock-parents = <&cru PLL_AUPLL>;
        dmas = <&dmac1 4>;
        dma-names = "rx";
        power-domains = <&power RK3588_PD_AUDIO>;
        pinctrl-names = "default";
        pinctrl-0 = <&pdm1m0_clk
            &pdm1m0_clk1
            &pdm1m0_sdi0
            &pdm1m0_sdi1
            &pdm1m0_sdi2
            &pdm1m0_sdi3>;
        /* 等同于如下写法 */
        /*
         * pinctrl-0 = <&pdm1m0_clk>,
         *     <&pdm1m0_clk1>,
         *     <&pdm1m0_sdi0>,
         *     <&pdm1m0_sdi1>,
         *     <&pdm1m0_sdi2>,
         *     <&pdm1m0_sdi3>;
         */
        #sound-dai-cells = <0>;
        status = "disabled";
    };
};
```

`pinctrl-names` 可以支持多个实例，pinctrl 默认的有 4 种实例（state）：
- `PINCTRL_STATE_DEFAULT`："default"
- `PINCTRL_STATE_INIT`："init"
- `PINCTRL_STATE_IDLE`："idle"
- `PINCTRL_STATE_SLEEP`："sleep"

`pinctrl-names` 是可以自定义的，有 driver 去匹配解析。  
例如 rk3588 pwm4：

```dts
{
    pwm4: pwm@febd0000 {
        compatible = "rockchip,rk3588-pwm", "rockchip,rk3328-pwm";
        reg = <0x0 0xfebd0000 0x0 0x10>;
        #pwm-cells = <3>;
        pinctrl-names = "active";
        pinctrl-0 = <&pwm4m0_pins>;
        clocks = <&cru CLK_PWM1>, <&cru PCLK_PWM1>;
        clock-names = "pwm", "pclk";
        status = "disabled";
    };
};
```

---

## 4. FAQ

### 4.1 用户层配置IOMUX

iomux 是 gcc 编译的二进制文件，通过 ioctl 调用 rockchip-pinctrl device，设置 iomux，也可以获取 iomux 当前值。  
编译方法：

```bash
gcc tools/testing/selftests/rkpinctrl/iomux.c -o iomux
```

使用方法：  
例如：设置 GPIO0_B7 为 func1

```bash
[root@RK3588:/]# iomux 0 15 1
```

例如：获取 GPIO0_B7 当前 iomux 值

```bash
[root@RK3588:/]# iomux 0 15
mux get (GPIO0-15) = 1
```

### 4.2 配置某个GPIO电平

有个别需求是某个 GPIO 不属于某个特定模块，更多是某个电源开关，希望在系统开机过程中尽快输出高或低电平，要怎么实现呢？  
使用 "regulator-fixed"。  
`regulator-fixed` 通常用于定义电压固定的 regulator，或由某个 GPIO 开关控制的 regulator。  
例如 GPIO2_A1 需要配置为高电平：

```dts
/ {
    foo_name: foo-name {
        compatible = "regulator-fixed";
        pinctrl-names = "default";
        pinctrl-0 = <&gpio_foo>;
        regulator-name = "vcc-foo";
        regulator-always-on;
    };
};
&pinctrl {
    gpio-foo {
        gpio_foo: gpio-foo {
            rockchip,pins = <2 RK_PA1 RK_FUNC_GPIO &pcfg_output_high>;
        };
    };
};
```

### 4.3 模块的pinctrl-0不生效

通常模块调用 `pinctrl-names` `pinctrl-0` 配置默认的 IOMUX 或在 IOCONFIG，但不是所有的节点都可以加这两个属性，如果模块被 `driver_probe_device` 调用，它就可以加这两个属性。  
调试方法：`drivers/base/dd.c` 的 `pinctrl_bind_pins`，在这里加打印看调用。

