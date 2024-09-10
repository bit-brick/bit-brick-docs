# 设备管理

本文档介绍 SDK 如何管理设备，包括设备的配置文件、如何添加新设备和如何通过 EEPROM 实现自适应不同设备等。

## 设备的配置文件

设备（Device），或叫板子、板型。以 DEB1 为例，对应 BPI - F3，通常包含以下配置文件：
```
bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_deb1.dts
bsp-src/uboot-2022.10/arch/riscv/dts/Makefile
bsp-src/uboot-2022.10/board/spacemit/k1-x/configs/uboot_fdt.its
bsp-src/uboot-2022.10/include/configs/k1-x.h
bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/k1-x_deb1.dts
bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/Makefile
buildroot-ext/configs/spacemit_k1_defconfig
buildroot-ext/board/spacemit/k1/env_k1-x.txt
```
- `bsp-src/uboot-2022.10/arch/riscv/dts/<board>.dts`：u-boot 中设备的 dts。
- `bsp-src/uboot-2022.10/arch/riscv/dts/Makefile`：u-boot 中设备的 dts 的 Makefile。
- `bsp-src/uboot-2022.10/board/spacemit/k1-x/configs/uboot_fdt.its`：u-boot FIT Image 的配置文件。
- `bsp-src/uboot-2022.10/include/configs/k1-x.h`：u-boot 中 K1 芯片的配置。
- `bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/<board>.dts`：kernel 中设备的 dts。
- `bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/Makefile`：kernel 中设备的 dts 的 Makefile。
- `buildroot-ext/configs/spacemit_k1_defconfig`：buildroot 的配置。
- `buildroot-ext/board/spacemit/k1/env_k1-x.txt`：u-boot 的 env。

## 添加新设备

如果新设备是基于 DEB1 修改的，为了快速 bringup，验证功能，可以基于 DEB1 的配置修改，通常只需修改以下配置文件：
```
bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_deb1.dts
bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/k1-x_deb1.dts
```
bringup 后，功能验证完，推荐在 SDK 添加一个新设备。例如，添加 `hs450`：
1. 以 u-boot 的 `k1-x_deb1.dts` 为模版，添加 `bsp-src/uboot-2022.10/arch/riscv/dts/k1_hs450.dts`。
2. 修改 `bsp-src/uboot-2022.10/arch/riscv/dts/Makefile`，添加新 dtb。
```
@@ -8,7 +8,7 @@ dtb-$(CONFIG_TARGET_SIFIVE_UNLEASHED) += hifive-unleashed-a00.dtb
 dtb-$(CONFIG_TARGET_SIFIVE_UNMATCHED) += hifive-unmatched-a00.dtb
 dtb-$(CONFIG_TARGET_SIPEED_MAIX) += k210-maix-bit.dtb
 dtb-$(CONFIG_TARGET_SPACEMIT_K1PRO) += k1-pro_qemu.dtb k1-pro_sim.dtb k1-pro_fpga.dtb
- dtb-$(CONFIG_TARGET_SPACEMIT_K1X) += k1-x_evb.dtb k1-x_deb2.dtb k1-x_deb1.dtb k1-x_spl.dtb
+ dtb-$(CONFIG_TARGET_SPACEMIT_K1X) += k1-x_evb.dtb k1-x_deb2.dtb k1-x_deb1.dtb k1-x_hs450.dtb k1-x_spl.dtb

 include $(srctree)/scripts/Makefile.dts
```
3. 修改 `bsp-src/uboot-2022.10/board/spacemit/k1-x/configs/uboot_fdt.its`，添加新节点。
```
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
4. 修改 `bsp-src/uboot-2022.10/include/configs/k1-x.h`，更新 `product_name`，FSBL 和 u-boot 将根据 `product_name`加载 dtb。如果设备有 EEPROM 记录 `product_name`等信息，可以不修改，FSBL 和 u-boot 通过 EEPROM 的信息实现自适应。
```
@@ -25,7 +25,7 @@
 #define CONFIG_GATEWAYIP	10.0.92.1
 #define CONFIG_NETMASK		255.255.255.0
-#define DEFAULT_PRODUCT_NAME	"k1_deb1"
+#define DEFAULT_PRODUCT_NAME	"k1_hs450"
 #define K1X_SPL_BOOT_LOAD_ADDR	(0x20200000)
 #define DDR_TRAINING_DATA_BASE	(0xc0829000)
```
5. 以 kernel 的 `k1-x_deb1.dts` 为模版，添加 `bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/k1-x_hs450.dts`。
6. 修改 `bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/Makefile`，添加新 dtb。
```
@@ -1,4 +1,4 @@
 # SPDX-License-Identifier: GPL-2.0
 dtb-$(CONFIG_SOC_SPACEMIT_K1PRO) += k1-pro_sim.dtb k1-pro_fpga.dtb k1-pro_fpga_1x4.dtb k1-pro_fpga_
2x2.dtb k1-pro_qemu.dtb k1-pro_verify.dtb
-dtb-$(CONFIG_SOC_SPACEMIT_K1X) += k1-x_fpga.dtb k1-x_fpga_1x4.dtb k1-x_fpga_2x2.dtb k1-x_evb.dtb k1-x_deb2.dtb k1-x_deb1.dtb
+dtb-$(CONFIG_SOC_SPACEMIT_K1X) += k1-x_fpga.dtb k1-x_fpga_1x4.dtb k1-x_fpga_2x2.dtb k1-x_evb.dtb k1-x_deb2.dtb k1-x_deb1.dtb k1-x_hs450.dtb
 obj-$(CONFIG_BUILTIN_DTB) += $(addsuffix.o, $(dtb-y))
```
7. 修改 `buildroot-ext/configs/spacemit_k1_defconfig》，添加新 dtb。
```
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
修改完，重新编译 u-boot、内核和 SDK 即可。
```
make uboot-rebuild
make linux-rebuild
make
```

## 支持单 CS DDR

FSBL 默认支持双 CS DDR，修改 `bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_spl.dts`可以支持单 CS DDR。
```
@@ -79,7 +79,7 @@
 	ddr@c0000000 {
 		/* dram data rate, should be 1200, 1600, or 2400 */
 		datarate = <2400>;
-		cs-num = <2>;
+		cs-num = <1>;
 		u-boot,dm-spl;
 	};
```

## 如何设备有 EEPROM，支持通过 EEPROM 实现自适应，待更新。

## 通过 EEPROM 实现自适应

SDK 构建的固件支持通过 EEPROM 实现自适应多设备。

相关文件：
```
bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_spl.dts
bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_deb1.dts
```

### EEPROM 支持列表

`atmel,24c02`

### 添加新 EEPROM

修改 `bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_spl.dts`，更新 EEPROM 的 I2C 地址，例如新地址为 `0xA0`。
```
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
修改 `bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_deb1.dts`，添加新 EEPROM 的配置。
```
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
重新编译 u-boot 和 SDK 即可。
```
make uboot-rebuild
make
```

### 使用 tlv_eeprom 写号

写号是指将 `product_name`等信息写入 EEPROM。目前，在 EEPROM 中的信息是按照 TLV 编码的，可以使用 u-boot 的 `tlv_eeprom`命令写号。

PC 接上设备的调试串口，设备启动时，在 PC 串口终端按下键盘的 `s`键，直到进入 u-boot shell。
```
Autoboot in 0 seconds
=>
```
烧写 `product_name`，例如 `k1_hs450`。
```
=> tlv_eeprom set 0x21 k1_hs450
=> tlv_eeprom write
Programming passed.
```
`Programming passed.`表示写入成功。

v1.0beta3.1 和之后的版本，请以设备 dts 的文件名（不带后缀）命名，方便 u-boot 自动加载 dtb。

`reset`检查是否可以加载 `hs450`的 dtb，正常的话 u-boot 有如下打印。
```
product_name: k1_deb1
detect dtb_name: k1-x_deb1.dtb
```
SDK 还支持从 EEPROM 读取以下信息：
- Serial Number：`0x23`
- Base MAC Address：`0x24`
- Manufacture Date：`0x25`
- Device Version：`0x26`
- MAC Addresses：`0x2A`
- Manufacturer：`0x2B`
- SDK Version：`0x40`

其中 MAC Address 会更新到 dtb，作为网卡物理地址。

## 写号工具

开发中。