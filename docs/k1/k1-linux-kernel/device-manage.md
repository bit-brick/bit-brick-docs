---
sidebar_position: 3
---
# Device Management
This document introduces how the SDK manages devices, including the configuration files of devices, how to add new devices, and how to achieve adaptive support for different devices through EEPROM.
## Configuration Files of Devices
A device (Device), also called a board or board type. Taking DEB1 as an example, it corresponds to [BPI-F3](https://docs.banana-pi.org/en/BPI-F3/BananaPi_BPI-F3), and usually includes the following configuration files:
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
The dts of the device in u-boot.
**bsp-src/uboot-2022.10/arch/riscv/dts/Makefile**
The Makefile of the dts of the device in u-boot.
**bsp-src/uboot-2022.10/board/spacemit/k1-x/configs/uboot_fdt.its**
The configuration file of the u-boot FIT Image.
**bsp-src/uboot-2022.10/include/configs/k1-x.h**
The configuration of the K1 chip in u-boot.
**bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/`<board>`.dts**
The dts of the device in the kernel.
**bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/Makefile**
The Makefile of the dts of the device in the kernel.
**buildroot-ext/configs/spacemit_k1_defconfig**
The configuration of buildroot.
**buildroot-ext/board/spacemit/k1/env_k1-x.txt**
The env of u-boot.
## Adding a New Device
If the new device is modified based on DEB1, in order to quickly bring up and verify the functions, it can be modified based on the configuration of DEB1. Usually, only the following configuration files need to be modified:
```shell
bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_deb1.dts
bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/k1-x_deb1.dts
```
After the bringup and function verification are completed, it is recommended to add a new device to the SDK. For example, to add `hs450`:
1. Using `k1-x_deb1.dts` of u-boot as a template, add `bsp-src/uboot-2022.10/arch/riscv/dts/k1_hs450.dts`.
2. Modify `bsp-src/uboot-2022.10/arch/riscv/dts/Makefile` to add the new dtb.
   ```diff
   @@ -8,7 +8,7 @@ dtb-$(CONFIG_TARGET_SIFIVE_UNLEASHED) += hifive-unleashed-a00.dtb
    dtb-$(CONFIG_TARGET_SIFIVE_UNMATCHED) += hifive-unmatched-a00.dtb
    dtb-$(CONFIG_TARGET_SIPEED_MAIX) += k210-maix-bit.dtb
    dtb-$(CONFIG_TARGET_SPACEMIT_K1PRO) += k1-pro_qemu.dtb k1-pro_sim.dtb k1-pro_fpga.dtb
   - dtb-$(CONFIG_TARGET_SPACEMIT_K1X) += k1-x_evb.dtb k1-x_deb2.dtb k1-x_deb1.dtb k1-x_spl.dtb
   + dtb-$(CONFIG_TARGET_SPACEMIT_K1X) += k1-x_evb.dtb k1-x_deb2.dtb k1-x_deb1.dtb k1-x_hs450.dtb k1-x_spl.dtb
    
    include $(srctree)/scripts/Makefile.dts
   ```
3. Modify `bsp-src/uboot-2022.10/board/spacemit/k1-x/configs/uboot_fdt.its` to add a new node.
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
4. Modify `bsp-src/uboot-2022.10/include/configs/k1-x.h` to update the `product_name`. FSBL and u-boot will load the dtb based on the `product_name`. If the device has an EEPROM to record the `product_name` and other information, you can skip this step, and FSBL and u-boot will achieve adaptive support through the information in the EEPROM.
   ```diff
   @@ -25,7 +25,7 @@
    #define CONFIG_GATEWAYIP	10.0.92.1
    #define CONFIG_NETMASK		255.255.255.0
   
   -#define DEFAULT_PRODUCT_NAME	"k1_deb1"
   +#define DEFAULT_PRODUCT_NAME	"k1_hs450"
   
    #define K1X_SPL_BOOT_LOAD_ADDR	(0x20200000)
    #define DDR_TRAINING_DATA_BASE	(0xc0829000)
   ```
5. Using `k1-x_deb1.dts` of the kernel as a template, add `bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/k1-x_hs450.dts`.
6. Modify `bsp-src/linux-6.1/arch/riscv/boot/dts/spacemit/Makefile` to add the new dtb.
   ```diff
   @@ -1,4 +1,4 @@
    # SPDX-License-Identifier: GPL-2.0
    dtb-$(CONFIG_SOC_SPACEMIT_K1PRO) += k1-pro_sim.dtb k1-pro_fpga.dtb k1-pro_fpga_1x4.dtb k1-pro_fpga_
   2x2.dtb k1-pro_qemu.dtb k1-pro_verify.dtb
   -dtb-$(CONFIG_SOC_SPACEMIT_K1X) += k1-x_fpga.dtb k1-x_fpga_1x4.dtb k1-x_fpga_2x2.dtb k1-x_evb.dtb k1-x_deb2.dtb k1-x_deb1.dtb
   +dtb-$(CONFIG_SOC_SPACEMIT_K1X) += k1-x_fpga.dtb k1-x_fpga_1x4.dtb k1-x_fpga_2x2.dtb k1-x_evb.dtb k1-x_deb2.dtb k1-x_deb1.dtb k1-x_hs450.dtb
    obj-$(CONFIG_BUILTIN_DTB) += $(addsuffix.o, $(dtb-y))
   ```
7. Modify `buildroot-ext/configs/spacemit_k1_defconfig` to add the new dtb.
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
After the modifications are completed, recompile u-boot, the kernel, and the SDK.
```shell
make uboot-rebuild
make linux-rebuild
make
```
### Supporting Single CS DDR
FSBL supports dual CS DDR by default, and modifying `bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_spl.dts` can support single CS DDR.
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
If the device has an EEPROM and supports adaptive support through the EEPROM, it will be updated later.
## Achieving Adaptive Support through EEPROM
The firmware built by the SDK supports adaptive support for multiple devices through EEPROM.
Related files:
```shell
bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_spl.dts
bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_deb1.dts
```
### List of Supported EEPROMs
- `atmel,24c02`
### Adding a New EEPROM
1. Modify `bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_spl.dts` to update the I2C address of the EEPROM, for example, the new address is `0xA0`.
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
2. Modify `bsp-src/uboot-2022.10/arch/riscv/dts/k1-x_deb1.dts` to add the configuration of the new EEPROM.
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
3. Recompile u-boot and the SDK.
   ```shell
   make uboot-rebuild
   make
   ```
### Writing Numbers Using tlv_eeprom
Writing numbers refers to writing information such as `product_name` into the EEPROM. Currently, the information in the EEPROM is encoded in TLV, and the `tlv_eeprom` command of u-boot can be used to write numbers.
1. Connect the debugging serial port of the device to the PC. When the device starts, press the `s` key on the keyboard in the PC serial terminal until entering the u-boot shell.
   ```shell
   Autoboot in 0 seconds
   => 
   ```
2. Burn the `product_name`, for example, `k1_hs450`.
   ```shell
   => tlv_eeprom set 0x21 k1_hs450
   => tlv_eeprom write
   Programming passed.
   ```
   `Programming passed.` indicates that the writing is successful.
   For versions v1.0beta3.1 and later, please name it after the file name of the device dts (without the suffix) to facilitate the automatic loading of the dtb by u-boot.
3. Use `reset` to check if the dtb of `hs450` can be loaded. If it is normal, u-boot will have the following print.
   ```shell
   product_name: k1_deb1
   detect dtb_name: k1-x_deb1.dtb
   ```
The SDK also supports reading the following information from the EEPROM:
- Serial Number: `0x23`
- Base MAC Address: `0x24`
- Manufacture Date: `0x25`
- Device Version: `0x26`
- MAC Addresses: `0x2A`
- Manufacturer: `0x2B`
- SDK Version: `0x40`
Among them, the MAC Address will be updated to the dtb as the physical address of the network card.
### Number Writing Tool
Under development.