---
sidebar_position: 3
---

# Device Management

The following document introduces how to achieve adaptive devices (board types) via EEPROM, including how to add support for new board types and implement adaptive booting.

In subsequent documentation, the terms "device" and "board type" are used interchangeably.

## Adding a New Device

The following uses the addition of the k1-x_MUSE-Pi board type as an example.

### Kernel Device Tree

If you refer to the design of the deb1 hardware, copy `k1-x_deb1.dts` to the following file and modify the relevant content:

```sh
target/linux/spacemit/dts/k1-x_MUSE-Pi.dts

```

For the newly added board type, the .dts files are stored in the above directory. They are packed into the bootfs partition during compilation and loaded by U-Boot before the kernel boots.

### U-Boot Device Tree

To add a new board type, you need to modify the U-Boot source code repository as follows:

1.Add the U-Boot device tree `u-boot-2022.10/arch/riscv/dts/k1-x_MUSE-Pi.dts`.
2.Modify the Makefile to include k1-x_MUSE-Pi.dtb as follows: (Note that the suffix should be changed to .dtb).

```diff
 11 dtb-$(CONFIG_TARGET_SPACEMIT_K1X) += k1-x_evb.dtb k1-x_deb2.dtb k1-x_deb1.dtb k1-x_hs450.dtb \
 12                      k1-x_kx312.dtb k1-x_MINI-PC.dtb k1-x_mingo.dtb k1-x_MUSE-N1.dtb \
 13                      k1-x_MUSE-Pi.dtb k1-x_spl.dtb k1-x_milkv-jupiter.dtb \
 14                      k1-x_MUSE-Book.dtb
 15 
```

3.modify `uboot-2022.10/board/spacemit/k1-x/configs/uboot_fdt.its`, add new node:

```diff
@@ -46,15 +46,6 @@

            algo = "crc32";
         };
      };
+     fdt_4 {
+                        description = "k1-x_MUSE-Pi";
+                        type = "flat_dt";
+                        compression = "none";
+                        data = /incbin/("../dtb/1-x_MUSE-Pi.dtb");
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
+     conf_4 {
+                        description = "k1-x_MUSE-Pi";
+                        loadables = "uboot";
+                        fdt = "fdt_4";
+                };
   };
 };
```

4.Modify `uboot-2022.10/include/configs/k1-x.h` and update `DEFAULT_PRODUCT_NAME`. FSBL and U-Boot will, by default, load the dtb based on `DEFAULT_PRODUCT_NAME`. If the board has an EEPROM that records information such as product_name, then this takes precedence, and FSBL and U-Boot will use the information from the EEPROM to achieve adaptive booting.

```diff
@@ -25,7 +25,7 @@
 #define CONFIG_GATEWAYIP 10.0.92.1
 #define CONFIG_NETMASK   255.255.255.0

-#define DEFAULT_PRODUCT_NAME "k1_deb1"
+#define DEFAULT_PRODUCT_NAME "k1-x_MUSE-Pi"

 #define K1X_SPL_BOOT_LOAD_ADDR  (0x20200000)
 #define DDR_TRAINING_DATA_BASE  (0xc0829000)
```

### Add Support for New Board

If it is a development board form factor, modify `openwrt/target/linux/spacemit/image/k1-sbc.mk` to add support for the `k1-x_MUSE-Pi` board type.

```sh
DEVICE_DTS := k1-x_deb1 k1-x_MUSE-Pi

```

If you need to add a new configuration, please refer to[solution management](openwrt_solution_management.md)

## Support Single CS DDR

By default, FSBL supports dual CS DDR. To enable support for single CS DDR, modify uboot-2022.10/arch/riscv/dts/k1-x_spl.dts.

```diff
@@ -79,7 +79,7 @@
    ddr@c0000000 {
        /* dram data rate, should be 1200, 1600, or 2400 */
        datarate = <2400>;
-       cs-num = <2>;
+       cs-num = <1>;
        u-boot,dm-spl;
   };
```

If the device has an EEPROM, adaptive support can be achieved through the EEPROM. The corresponding key name is `ddr_cs_num`, which can be programmed using the titantools utility. For details on the flashing tool, please refer to the documentation at [flash tools](https://developer.spacemit.com/documentation?token=O6wlwlXcoiBZUikVNh2cczhin5d)

## Adaptive Booting via EEPROM

Use the Titanflasher tool to program the EEPROM of the board, enabling adaptive booting, i.e., one firmware supports multiple boards.

During system startup, the information in the EEPROM is read and matched with the information in uboot_fdt.its, thereby supporting multiple board types.

Relevant Files:

```shell
uboot-2022.10/arch/riscv/dts/k1-x_spl.dts
uboot-2022.10/arch/riscv/dts/k1-x_*.dts
```

### EEPROM Support List

- `atmel,24c02`

### Add New EEPROM

1.Modify `uboot-2022.10/arch/riscv/dts/k1-x_spl.dts`, Update the I2C address of the EEPROM, for example, the new address is `0xA0`.

```c
@@ -121,7 +121,7 @@
      eeprom@50{
         compatible = "atmel,24c02";
         u-boot,dm-spl;
         reg = <0x50>;
         reg = <0xA0>;
         bus = <6>;
         #address-cells = <1>;
         #size-cells = <1>;
```

2.Modify `uboot-2022.10/arch/riscv/dts/k1-x_*.dts`, add new eeprom config:

   ```c
   @@ -60,9 +60,9 @@
        pinctrl-0 = <&pinctrl_i2c2_0>;
        status = "okay";
    
   -    eeprom@50{
   -        compatible = "atmel,24c02";
   -        reg = <0x50>;
   +    eeprom@A0{
   +        compatible = "atmel,24c04";
   +        reg = <0xA0>;
            vin-supply-names = "eeprom_1v8";
            status = "okay";
        };
   ```

### Use tlv_eeprom command to write key

Writing to the EEPROM involves storing information such as `product_name`. Currently, the data in the EEPROM is encoded using TLV format, and you can use the `tlv_eeprom` command provided by u-boot to perform this operation.

1. Connect your PC to the device's debug serial port. During boot-up, press the `s` key on the PC terminal to enter the u-boot shell.

   ```shell
   Autoboot in 0 seconds
   => 
   ```

2. write `product_name`，such as `k1-x_MUSE-Pi`。

   ```shell
   => tlv_eeprom set 0x21 k1-x_MUSE-Pi
   => tlv_eeprom write
   Programming passed.
   ```

   `Programming passed.` meaning write key success.

   Use the name of the device’s DTS file (without the extension, e.g., k1-x_MUSE-Pi) to facilitate automatic loading of the DTB by u-boot.

3. reboot device and check  if the `k1-x_MUSE-Pi` DTB can be loaded. If everything is normal, u-boot should print the following:

   ```shell
   Boot from fit configuration: k1-x_MUSE-Pi
   ```

The SDK also supports reading the following information from the EEPROM:

- Serial Number：`0x23`
- Base MAC Address：`0x24`
- Manufacture Date：`0x25`
- Device Version：`0x26`
- MAC Addresses：`0x2A`
- Manufacturer：`0x2B`
- SDK Version：`0x40`

The MAC Address will be updated in the DTB and used as the network card’s physical address.
