---
sidebar_position: 3
---

# 设备管理

本文档介绍SDK如何管理设备，包括设备的配置文件、如何添加新设备和如何通过EEPROM实现自适应不同设备等。

## 设备的配置文件

设备（Device），或叫板子、板型。以DEB1为例，对应[BPI-F3](https://docs.banana-pi.org/en/BPI-F3/BananaPi_BPI-F3)，通常包含以下配置文件：

```shell
bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_deb1.dts
bsp-src/uboot-2022.10/arch/riscv/dts/Makefile
bsp-src/uboot-2022.10/board/spacemit/k1-x/configs/uboot_fdt.its
bsp-src/uboot-2022.10/include/configs/k1-x.h
bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/k1-x_deb1.dts
bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/Makefile
buildroot-ext/configs/spacemit_k1_defconfig
buildroot-ext/board/spacemit/k1/env_k1-x.txt
```

**bsp-src/uboot-2022.10/arch/riscv/dts/`<board>`.dts**

u-boot中设备的dts。

**bsp-src/uboot-2022.10/arch/riscv/dts/Makefile**

u-boot中设备的dts的Makefile。

**bsp-src/uboot-2022.10/board/spacemit/k1-x/configs/uboot_fdt.its**

u-boot FIT Image的配置文件。

**bsp-src/uboot-2022.10/include/configs/k1-x.h**

u-boot中K1芯片的配置。

**bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/`<board>`.dts**

kernel中设备的dts。

**bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/Makefile**

kernel中设备的dts的Makefile。

**buildroot-ext/configs/spacemit_k1_defconfig**

buildroot的配置。

**buildroot-ext/board/spacemit/k1/env_k1-x.txt**

u-boot的env。

## 添加新设备

如果新设备是基于DEB1修改的，为了快速bringup，验证功能，可以基于DEB1的配置修改，通常只需修改以下配置文件：

```shell
bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_deb1.dts
bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/k1-x_deb1.dts
```

bringup后，功能验证完，推荐在SDK添加一个新设备。例如，添加`hs450`：

1. 以u-boot的`k1-x_deb1.dts`为模版，添加`bsp-src/uboot-2022.10/arch/riscv/dts/k1_hs450.dts`。

2. 修改`bsp-src/uboot-2022.10/arch/riscv/dts/Makefile`，添加新dtb。

   ```diff
   @@ -8,7 +8,7 @@ dtb-$(CONFIG_TARGET_SIFIVE_UNLEASHED) += hifive-unleashed-a00.dtb
    dtb-$(CONFIG_TARGET_SIFIVE_UNMATCHED) += hifive-unmatched-a00.dtb
    dtb-$(CONFIG_TARGET_SIPEED_MAIX) += k210-maix-bit.dtb
    dtb-$(CONFIG_TARGET_SPACEMIT_K1PRO) += k1-pro_qemu.dtb k1-pro_sim.dtb k1-pro_fpga.dtb
   - dtb-$(CONFIG_TARGET_SPACEMIT_K1X) += k1-x_evb.dtb k1-x_deb2.dtb k1-x_deb1.dtb k1-x_spl.dtb
   + dtb-$(CONFIG_TARGET_SPACEMIT_K1X) += k1-x_evb.dtb k1-x_deb2.dtb k1-x_deb1.dtb k1-x_hs450.dtb k1-x_spl.dtb
    
    include $(srctree)/scripts/Makefile.dts
   ```

3. 修改`bsp-src/uboot-2022.10/board/spacemit/k1-x/configs/uboot_fdt.its`，添加新节点。

   ```diff
   @@ -46,15 +46,6 @@
    				algo = "crc32";
    			};
    		};
   +		fdt_4 {
   +                        description = "k1_hs450";
   +                        type = "flat_dt";
   +                        compression = "none";
   +                        data = /incbin/("../dtb/k1-x_hs450.dtb");
   +                        hash-1 {
   +                                algo = "crc32";
   +                        };
   +                };
    	};
    
    	configurations {
   @@ -74,10 +65,5 @@
    			loadables = "uboot";
    			fdt = "fdt_3";
    		};
   +		conf_4 {
   +                        description = "k1_hs450";
   +                        loadables = "uboot";
   +                        fdt = "fdt_4";
   +                };
    	};
    };
   ```

4. 修改`bsp-src/uboot-2022.10/include/configs/k1-x.h`，更新`product_name`，FSBL和u-boot将根据`product_name`加载dtb。如果设备有EEPROM记录`product_name`等信息，可以不修改，FSBL和u-boot通过EEPROM的信息实现自适应。

   ```diff
   @@ -25,7 +25,7 @@
    #define CONFIG_GATEWAYIP	10.0.92.1
    #define CONFIG_NETMASK		255.255.255.0
   
   -#define DEFAULT_PRODUCT_NAME	"k1_deb1"
   +#define DEFAULT_PRODUCT_NAME	"k1_hs450"
   
    #define K1X_SPL_BOOT_LOAD_ADDR	(0x20200000)
    #define DDR_TRAINING_DATA_BASE	(0xc0829000)
   ```

5. 以kernel的`k1-x_deb1.dts`为模版，添加`bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/k1-x_hs450.dts`。

6. 修改`bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/Makefile`，添加新dtb。

   ```diff
   @@ -1,4 +1,4 @@
    # SPDX-License-Identifier: GPL-2.0
    dtb-$(CONFIG_SOC_SPACEMIT_K1PRO) += k1-pro_sim.dtb k1-pro_fpga.dtb k1-pro_fpga_1x4.dtb k1-pro_fpga_
   2x2.dtb k1-pro_qemu.dtb k1-pro_verify.dtb
   -dtb-$(CONFIG_SOC_SPACEMIT_K1X) += k1-x_fpga.dtb k1-x_fpga_1x4.dtb k1-x_fpga_2x2.dtb k1-x_evb.dtb k1-x_deb2.dtb k1-x_deb1.dtb
   +dtb-$(CONFIG_SOC_SPACEMIT_K1X) += k1-x_fpga.dtb k1-x_fpga_1x4.dtb k1-x_fpga_2x2.dtb k1-x_evb.dtb k1-x_deb2.dtb k1-x_deb1.dtb k1-x_hs450.dtb
    obj-$(CONFIG_BUILTIN_DTB) += $(addsuffix .o, $(dtb-y))
   ```

7. 修改`buildroot-ext/configs/spacemit_k1_defconfig`，添加新dtb。

   ```diff
   @@ -33,7 +33,7 @@ BR2_LINUX_KERNEL=y
    BR2_LINUX_KERNEL_USE_CUSTOM_CONFIG=y
    BR2_LINUX_KERNEL_CUSTOM_CONFIG_FILE="$(LINUX_OVERRIDE_SRCDIR)/arch/riscv/configs/k1_defconfig"
    BR2_LINUX_KERNEL_DTS_SUPPORT=y
   -BR2_LINUX_KERNEL_INTREE_DTS_NAME="spacemit/k1-x_deb1 spacemit/k1-x_deb2 spacemit/k1-x_evb"
   +BR2_LINUX_KERNEL_INTREE_DTS_NAME="spacemit/k1-x_deb1 spacemit/k1-x_deb2 spacemit/k1-x_evb spacemit/k1-x_hs450"
    BR2_PACKAGE_LINUX_TOOLS_GPIO=y
    BR2_PACKAGE_LINUX_TOOLS_PERF=y
    BR2_PACKAGE_LINUX_TOOLS_PERF_SCRIPTS=y
   ```

   修改完，重新编译u-boot、内核和SDK即可。

   ```shell
   make uboot-rebuild
   make linux-rebuild
   make
   ```

### 支持单CS DDR

FSBL默认支持双CS DDR，修改`bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_spl.dts`可以支持单CS DDR。

```diff
@@ -79,7 +79,7 @@
 	ddr@c0000000 {
 		/* dram data rate, should be 1200, 1600, or 2400 */
 		datarate = <2400>;
-		cs-num = <2>;
+		cs-num = <1>;
 		u-boot,dm-spl;
 	};
```

如何设备有EEPROM，支持通过EEPROM实现自适应，待更新。

## 通过EEPROM实现自适应

SDK构建的固件支持通过EEPROM实现自适应多设备。

相关文件：

```shell
bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_spl.dts
bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_deb1.dts
```

### EEPROM支持列表

- `atmel,24c02`

### 添加新EEPROM

1. 修改`bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_spl.dts`，更新EEPROM的I2C地址，例如新地址为`0xA0`。

   ```c
   @@ -121,7 +121,7 @@
    		eeprom@50{
    			compatible = "atmel,24c02";
    			u-boot,dm-spl;
   -			reg = <0x50>;
   +			reg = <0xA0>;
    			bus = <6>;
    			#address-cells = <1>;
    			#size-cells = <1>;
   ```

2. 修改`bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_deb1.dts`，添加新EEPROM的配置。

   ```c
   @@ -60,9 +60,9 @@
    	pinctrl-0 = <&pinctrl_i2c2_0>;
    	status = "okay";
    
   -	eeprom@50{
   -		compatible = "atmel,24c02";
   -		reg = <0x50>;
   +	eeprom@A0{
   +		compatible = "atmel,24c04";
   +		reg = <0xA0>;
    		vin-supply-names = "eeprom_1v8";
    		status = "okay";
    	};
   ```

3. 重新编译u-boot和SDK即可。

   ```shell
   make uboot-rebuild
   make
   ```

### 使用tlv_eeprom写号

写号是指将`product_name`等信息写入EEPROM。目前，在EEPROM中的信息是按照TLV编码的，可以使用u-boot的`tlv_eeprom`命令写号。

1. PC接上设备的调试串口，设备启动时，在PC串口终端按下键盘的`s`键，直到进入u-boot shell。

   ```shell
   Autoboot in 0 seconds
   => 
   ```

2. 烧写`product_name`，例如`k1_hs450`。

   ```shell
   => tlv_eeprom set 0x21 k1_hs450
   => tlv_eeprom write
   Programming passed.
   ```

   `Programming passed.`表示写入成功。

   v1.0beta3.1和之后的版本，请以设备dts的文件名（不带后缀）命名，方便u-boot自动加载dtb。

3. `reset`检查是否可以加载`hs450`的dtb，正常的话u-boot有如下打印。

   ```shell
   product_name: k1_deb1
   detect dtb_name: k1-x_deb1.dtb
   ```

SDK还支持从EEPROM读取以下信息：

- Serial Number：`0x23`
- Base MAC Address：`0x24`
- Manufacture Date：`0x25`
- Device Version：`0x26`
- MAC Addresses：`0x2A`
- Manufacturer：`0x2B`
- SDK Version：`0x40`

其中MAC Address会更新到dtb，作为网卡物理地址。

### 写号工具

开发中。




### k1-x_bit-brick.dtb的生成
因为官方的u-boot源码中没有添加我们的k1-x_bit-brick.dtb，所以我们需要自己按照上述步骤添加。
需要修改的文件有以下几个

```shell
bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_bit-brick.dts
bsp-src/uboot-2022.10/arch/riscv/dts/Makefile
bsp-src/uboot-2022.10/board/spacemit/k1-x/configs/uboot_fdt.its
buildroot-ext/configs/spacemit_k1_defconfig
```

1、添加`bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_bit-brick.dts`文件
```
// SPDX-License-Identifier: (GPL-2.0 OR MIT)
/* Copyright (c) 2023 Spacemit, Inc */

/dts-v1/;

#include "k1-x.dtsi"
#include "k1-x_pinctrl.dtsi"
#include "k1-x_spm8821.dtsi"

/ {
	model = "bit-brick K1 board";

	aliases {
		efuse_power = &ldo_31;
	};

	memory@0 {
		device_type = "memory";
		reg = <0x00000000 0x00000000 0x00000000 0x80000000>;
	};

	chosen {
		bootargs = "earlycon=sbi console=ttyS0,115200 debug loglevel=8,initcall_debug=1 rdinit=/init.tmp";
		stdout-path = "serial0:115200n8";
	};
	usb1hub: usb1hub {
		compatible = "spacemit,usb-hub";
		vbus-gpios = <&gpio 127 0>;	/* for usb2 hub output vbus */
		status = "okay";
	};
	usb2hub: usb2hub {
		compatible = "spacemit,usb-hub";
		vbus-gpios = <&gpio 123 0>;	/* for usb2 hub output vbus */
		status = "okay";
	};

	usb3hub: usb3hub {
		compatible = "spacemit,usb-hub";
		vbus-gpios = <&gpio 79 0>;	/* gpio_79 for usb3 pwren */
		status = "okay";
	};

};

&cpus {
	timebase-frequency = <24000000>;
};

&uart0 {
	status = "okay";
};

&i2c0 {
	status = "disabled";
};

&i2c1 {
	status = "disabled";
};

&i2c2 {
	#address-cells = <1>;
	#size-cells = <0>;
	pinctrl-names = "default";
	pinctrl-0 = <&pinctrl_i2c2_0>;
	status = "okay";

	eeprom@50{
		compatible = "atmel,24c02";
		reg = <0x50>;
		vin-supply-names = "eeprom_1v8";
		status = "okay";
	};
};

&i2c3 {
	status = "disabled";
};

&i2c4 {
	clock-frequency = <400000>;
	status = "okay";
};

&i2c5 {
	status = "disabled";
};

&i2c6 {
	status = "disabled";
};

&i2c7 {
	status = "disabled";
};

&pinctrl {
	pinctrl-single,gpio-range = <
		&range GPIO_49  2 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_3V_DS4)
		&range GPIO_58  1 (MUX_MODE0 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
		&range GPIO_63  1 (MUX_MODE0 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
		&range GPIO_64  1 (MUX_MODE1 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
		&range GPIO_65  1 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_1V8_DS2)
		&range GPIO_66  2 (MUX_MODE0 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
		&range PRI_TDI  2 (MUX_MODE1 | EDGE_NONE | PULL_UP   | PAD_1V8_DS2)
		&range PRI_TCK  1 (MUX_MODE1 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
		&range PRI_TDO  1 (MUX_MODE1 | EDGE_NONE | PULL_UP   | PAD_1V8_DS2)
		&range GPIO_74  1 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_1V8_DS2)
		&range GPIO_79  1 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_1V8_DS2)
		&range GPIO_80  1 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_3V_DS4)
		&range GPIO_81  3 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_1V8_DS2)
		&range GPIO_90  1 (MUX_MODE0 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
		&range GPIO_91  2 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_1V8_DS2)
		&range DVL0     2 (MUX_MODE1 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
		&range DVL1     1 (MUX_MODE1 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS0)
		&range GPIO_110 1 (MUX_MODE0 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
		&range GPIO_114 1 (MUX_MODE0 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
		&range GPIO_115 2 (MUX_MODE0 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
		&range GPIO_123 1 (MUX_MODE0 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS0)
		&range GPIO_124 1 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_1V8_DS2)
		&range GPIO_125 3 (MUX_MODE0 | EDGE_NONE | PULL_DOWN | PAD_1V8_DS2)
		&range GPIO_127 1 (MUX_MODE0 | EDGE_NONE | PULL_UP   | PAD_1V8_DS2)
	>;

	usbp1_vbus: usbp1_vbus {
		pinctrl-single,pins =<
			K1X_PADCONF(GPIO_66, MUX_MODE0, (EDGE_NONE | PULL_UP | PAD_1V8_DS2))    /* drive_vbus1_iso */
		>;
	};

	gpio80_pmx_func0: gpio80_pmx_func0 {
		pinctrl-single,pins = <
			K1X_PADCONF(GPIO_80, MUX_MODE0, (EDGE_BOTH | PULL_UP | PAD_3V_DS4))  /* mmc cd */
		>;
	};
};

&gpio{
	gpio-ranges = <
		&pinctrl 49 GPIO_49 2
		&pinctrl 58 GPIO_58 1
		&pinctrl 63 GPIO_63 1
		&pinctrl 65 GPIO_65 3
		&pinctrl 70 PRI_TDI 4
		&pinctrl 74 GPIO_74 1
		&pinctrl 79 GPIO_79 1
		&pinctrl 80 GPIO_80 4
		&pinctrl 90 GPIO_90 3
		&pinctrl 96 DVL0 2
		&pinctrl 110 GPIO_110 1
		&pinctrl 114 GPIO_114 3
		&pinctrl 123 GPIO_123 5
		&pinctrl 127 GPIO_127 1
	>;
};

&udc {
	status = "okay";
};

//&usbphy1 {
//	status = "okay";
//};

//&ehci1 {
//	vbus-supply = <&usb2hub>;
//	status = "okay";
//};

&usb2phy {
	status = "okay";
};

&combphy {
	status = "okay";
};

&usbdrd3 {
	status = "okay";
	vbus-supply = <&usb3hub>;
	dwc3@c0a00000 {
		dr_mode = "host";
		phy_type = "utmi";
		snps,dis_enblslpm_quirk;
		snps,dis_u2_susphy_quirk;
		snps,dis_u3_susphy_quirk;
		snps,dis-del-phy-power-chg-quirk;
		snps,dis-tx-ipgap-linecheck-quirk;
	};
};
&sdhci0 {
	pinctrl-names = "default";
	pinctrl-0 = <&pinctrl_mmc1 &gpio80_pmx_func0>;
	bus-width = <4>;
	cd-gpios = <&gpio 80 0>;
	cd-inverted;
	cap-sd-highspeed;
	sdh-phy-module = <0>;
	clk-src-freq = <204800000>;
	status = "okay";
};

/* eMMC */
&sdhci2 {
	bus-width = <8>;
	non-removable;
	mmc-hs400-1_8v;
	mmc-hs400-enhanced-strobe;
	sdh-phy-module = <1>;
	clk-src-freq = <375000000>;
	status = "okay";
};

&eth0 {
	status = "okay";
	pinctrl-names = "default";
	pinctrl-0 = <&pinctrl_gmac0>;

	phy-reset-pin = <110>;

	clk_tuning_enable;
	clk-tuning-by-delayline;
	tx-phase = <90>;
	rx-phase = <73>;

	phy-mode = "rgmii";
	phy-addr = <1>;
	phy-handle = <&rgmii>;

	ref-clock-from-phy;

	mdio {
		#address-cells = <0x1>;
		#size-cells = <0x0>;
		rgmii: phy@0 {
			compatible = "ethernet-phy-id001c.c916";
			device_type = "ethernet-phy";
			reg = <0x1>;
		};
	};
};

&pcie0_rc {
	status = "disabled";
};

&pcie1_rc {
	pinctrl-names = "default";
	pinctrl-0 = <&pinctrl_pcie1_3>;
	status = "okay";
};

&qspi {
	status = "okay";
	pinctrl-names = "default";
	pinctrl-0 = <&pinctrl_qspi>;

	flash@0 {
		compatible = "jedec,spi-nor";
		reg = <0>;
		spi-max-frequency = <26500000>;
		m25p,fast-read;
		broken-flash-reset;
		status = "okay";
	};
};

&efuse {
	status = "okay";
};

&dpu {
	status = "okay";
};

&hdmi {
	pinctrl-names = "default";
	pinctrl-0 = <&pinctrl_hdmi_0>;
	status = "okay";
};

&mipi_dsi {
	status = "disabled";
};

&panel {
	dcp-gpios = <&gpio 82 0>;
	dcn-gpios = <&gpio 83 0>;
	bl-gpios = <&gpio 44 0>;
	reset-gpios = <&gpio 81 0>;
	status = "disabled";
};
```

2、Makefile 和 uboot_fdt.its 的改动如下

```diff
diff --git a/arch/riscv/dts/Makefile b/arch/riscv/dts/Makefile
index 9edfa62c..03842f7c 100644
--- a/arch/riscv/dts/Makefile
+++ b/arch/riscv/dts/Makefile
@@ -15,7 +15,7 @@ dtb-$(CONFIG_TARGET_SPACEMIT_K1X) += k1-x_evb.dtb k1-x_deb2.dtb k1-x_deb1.dtb k1
                                     k1-x_lpi3a.dtb k1-x_MUSE-Card.dtb k1-x_MUSE-Paper.dtb \
                                     k1-x_MUSE-Paper-mini-4g.dtb k1-x_baton-camera.dtb \
                                     k1-x_FusionOne.dtb k1-x_orangepi-rv2.dtb k1-x_ZT001H.dtb \
-                                    k1-x_uav.dtb k1-x_MUSE-Paper2.dtb
+                                    k1-x_uav.dtb k1-x_MUSE-Paper2.dtb k1-x_bit-brick.dtb
 
 include $(srctree)/scripts/Makefile.dts
 
diff --git a/board/spacemit/k1-x/configs/uboot_fdt.its b/board/spacemit/k1-x/configs/uboot_fdt.its
index 3b90918b..1bb2691b 100644
--- a/board/spacemit/k1-x/configs/uboot_fdt.its
+++ b/board/spacemit/k1-x/configs/uboot_fdt.its
@@ -199,6 +199,15 @@
                                algo = "crc32";
                        };
                };
+               fdt_21 {
+                       description = "k1-x_bit-brick";
+                       type = "flat_dt";
+                       compression = "none";
+                       data = /incbin/("../dtb/k1-x_bit-brick.dtb");
+                       hash-1 {
+                               algo = "crc32";
+                       };
+               };
        };
 
        configurations {
@@ -303,5 +312,10 @@
                        loadables = "uboot";
                        fdt = "fdt_20";
                };
+               conf_21 {
+                       description = "k1-x_bit-brick";
+                       loadables = "uboot";
+                       fdt = "fdt_21";
+               };
        };
 };
```

3、buildroot-ext/configs/spacemit_k1_defconfig 的修改如下
```diff
diff --git a/configs/spacemit_k1_v2_defconfig b/configs/spacemit_k1_v2_defconfig
index ffbf9e9..565c6de 100644
--- a/configs/spacemit_k1_v2_defconfig
+++ b/configs/spacemit_k1_v2_defconfig
@@ -39,7 +39,7 @@ BR2_LINUX_KERNEL_IMAGE_TARGET_CUSTOM=y
 BR2_LINUX_KERNEL_IMAGE_TARGET_NAME="Image"
 BR2_LINUX_KERNEL_IMAGE_NAME="Image"
 BR2_LINUX_KERNEL_DTS_SUPPORT=y
-BR2_LINUX_KERNEL_INTREE_DTS_NAME="spacemit/k1-x_deb1 spacemit/k1-x_deb2 spacemit/k1-x_evb spacemit/k1-x_hs450 spacemit/k1-x_kx312 spacemit/k1-x_mingo spacemit/k1-x_MUSE-N1 spacemit/k1-x_MUSE-Pi spacemit/k1-x_MINI-PC spacemit/k1-x_MUSE-Book spacemit/k1-x_MUSE-Paper spacemit/k1-x_MUSE-Card spacemit/k1-x_milkv-jupiter spacemit/m1-x_milkv-jupiter spacemit/k1-x_lpi3a spacemit/k1-x_MUSE-Paper-mini-4g spacemit/k1-x_baton-camera spacemit/k1-x_FusionOne spacemit/k1-x_uav spacemit/k1-x_orangepi-rv2 spacemit/k1-x_ZT001H spacemit/k1-x_MUSE-Paper2"
+BR2_LINUX_KERNEL_INTREE_DTS_NAME="spacemit/k1-x_deb1 spacemit/k1-x_deb2 spacemit/k1-x_evb spacemit/k1-x_hs450 spacemit/k1-x_kx312 spacemit/k1-x_mingo spacemit/k1-x_MUSE-N1 spacemit/k1-x_MUSE-Pi spacemit/k1-x_MINI-PC spacemit/k1-x_MUSE-Book spacemit/k1-x_MUSE-Paper spacemit/k1-x_MUSE-Card spacemit/k1-x_milkv-jupiter spacemit/m1-x_milkv-jupiter spacemit/k1-x_lpi3a spacemit/k1-x_MUSE-Paper-mini-4g spacemit/k1-x_baton-camera spacemit/k1-x_FusionOne spacemit/k1-x_uav spacemit/k1-x_orangepi-rv2 spacemit/k1-x_ZT001H spacemit/k1-x_MUSE-Paper2 spacemit/k1-x_bit-brick"
 BR2_PACKAGE_LINUX_TOOLS_GPIO=y
 BR2_PACKAGE_LINUX_TOOLS_PERF=y
 BR2_PACKAGE_LINUX_TOOLS_PERF_SCRIPTS=y
```

修改之后删除已编译的uboot文件，路径在 ./output/k1_v2/build/uboot-custom 下；
再重新编译
```
make evnconfig
## 选择5
make
```
编译完成后即可得到一个带k1-x_bit-brick.dtb的固件。

可用如下命令查看是否生成了k1-x_bit-brick.dtb。
~~~
ls ./output/k1_v2/images/bootfs
bianbu.bmp             k1-x_FusionOne.dtb      k1-x_MUSE-N1.dtb
env_k1-x.txt           k1-x_hs450.dtb          k1-x_MUSE-Paper2.dtb
Image                  k1-x_kx312.dtb          k1-x_MUSE-Paper.dtb
initramfs-generic.img  k1-x_lpi3a.dtb          k1-x_MUSE-Paper-mini-4g.dtb
k1-x_baton-camera.dtb  k1-x_milkv-jupiter.dtb  k1-x_MUSE-Pi.dtb
k1-x_bit-brick.dtb     k1-x_mingo.dtb          k1-x_orangepi-rv2.dtb
k1-x_deb1.dtb          k1-x_MINI-PC.dtb        k1-x_uav.dtb
k1-x_deb2.dtb          k1-x_MUSE-Book.dtb      k1-x_ZT001H.dtb
k1-x_evb.dtb           k1-x_MUSE-Card.dtb      m1-x_milkv-jupiter.dtb

~~~