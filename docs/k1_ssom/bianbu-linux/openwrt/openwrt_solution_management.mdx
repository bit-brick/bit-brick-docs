---
sidebar_position: 4
---



# Solution Management

This document introduces the management of solutions for the OpenWrt SDK. Currently, the released SDK defaults to supporting the k1-sbc and k1-nas solutions. Each solution supports multiple board types; for example, the k1-sbc solution supports the k1-x_MUSE-Pi and k1-x_deb1 board types. Future updates will continue to be released.

## Solution Overview

Using the development board solution k1-sbc as an example, it typically involves the following configuration files, which will be introduced in subsequent chapters.

```sh
#Solution Configuration
feeds/spacemit_openwrt_feeds/spacemit_k1_defconfig

#olution Compilation Entry Point
openwrt/target/linux/spacemit/Makefile

#Solution Definition
openwrt/target/linux/spacemit/k1-sbc/config-6.1
openwrt/target/linux/spacemit/k1-sbc/target.mk
openwrt/target/linux/spacemit/k1-sbc/base-files/

#Solution Device Tree Management
openwrt/target/linux/spacemit/dts/

#Solution Boot Parameters
openwrt/target/linux/spacemit/image/env_k1-x.txt

#Firmware Definition
openwrt/target/linux/spacemit/image/k1-sbc.mk
#Firmware Partitions for the Solution
openwrt/target/linux/spacemit/image/partition_tables/partition_2M.json
openwrt/target/linux/spacemit/image/partition_tables/partition_flash.json
openwrt/target/linux/spacemit/image/partition_tables/partition_universal.json

#Initial Setup Configuration for the Solution
openwrt/target/linux/spacemit/base-files/etc/uci-defaults/
```

### Configuration for the Solution

`feeds/spacemit_openwrt_feeds/spacemit_k1_defconfig`

This is the build configuration for the k1-sbc solution, used to guide the compilation behavior of OpenWrt.

### Makefile for the Solution

`openwrt/target/linux/spacemit/Makefile`

Add the name of the solution to SUBTARGETS:

```c
    ...
 12 SUBTARGETS:=k1-nas k1-sbc
    ...
```

### Directory for the Solution

`openwrt/target/linux/spacemit/k1-sbc`

Create a directory with the same name as the solution: k1-sbc, containing the following:

* openwrt/target/linux/spacemit/k1-sbc/config-6.1

  `config-6.1` is the kernel configuration for this solution. When compiling the kernel, merge `openwrt/target/linux/generic/config-6.1` with this solution's `config-6.1`, giving priority to the options in this solution.

* openwrt/target/linux/spacemit/k1-sbc/target.mk

  Defines general information for the solution, such as `DEVICE_TYPE:=router` (optional values include router, nas). This is defined by OpenWrt, where different device types include different default packages.

* openwrt/target/linux/spacemit/k1-sbc/base-files/

  Contains configuration files to be packaged into the root file system, such as:

```sh
openwrt/target/linux/spacemit/k1-sbc/base-files$ tree
.
├── etc
│   ├── board.d
│   │   ├── 01_leds
│   │   └── 02_network
│   ├── hostapd.conf
│   ├── hosts
│   ├── init.d
│   │   └── custom_wifi_ap
│   └── inittab
├── lib
│   ├── preinit
│   │   └── 79_move_config
│   └── upgrade
│       └── platform.sh
└── usr
    └── bin
        ├── uas-gadget2-bot.sh
        ├── uas-gadget2.sh
        └── uas-gadget3.sh

8 directories, 11 files
```

### Device Tree for the Solution

`openwrt/target/linux/spacemit/dts/`

Kernel device trees for different board types. You can refer to[device management](openwrt_device_management.md)to add support for a new board type.

### Partition Table for the Solution

`openwrt/target/linux/spacemit/image/partition_tables/`

The partition tables here are shared among multiple solutions. They contain configurations for different storage media.

You can also add a partition table that matches the capacity of the onboard storage medium, which will be automatically matched when using the TitanFlasher tool to flash the firmware.

* partition_2M.json，Used for NOR flash booting, typically paired with eMMC/SSD block devices.
* partition_universal.json，Used for booting from block devices.
* partition_flash.json，Used for mass production with the spacemit Titanflasher tool.

Modifying the partition table may affect the normal boot process of the system. For detailed modification procedures, please refer to the documentation on [boot develepment docs](https://bianbu-linux.spacemit.com/development_guide/boot).

### Boot Parameters for the Solution

`openwrt/target/linux/spacemit/image/env_k1-x.txt`

U-Boot environment variables with the highest priority. Here you can set boot arguments (bootargs), log level, etc.

The default bootargs are:

```sh
commonargs=setenv bootargs earlycon=${earlycon} earlyprintk console=tty1 console=${console} loglevel=${loglevel} clk_ignore_unused swiotlb=65536 rdinit=${init}
```

You can redefine environment variables such as `earlycon, console, loglevel, and init` in `env_k1-x.txt`.

```sh
# Common parameter
earlycon=sbi
console=ttyS0,115200
init=/init
bootdelay=0
loglevel=8

```

Alternatively, you can redefine the entire bootargs.

```sh
bootargs=earlycon=sbi console=ttyS0,115200 loglevel=4

```

### Firmware for the Solution

`openwrt/target/linux/spacemit/image/k1-sbc.mk`

This Makefile configures the firmware compilation for the solution, including supported board types, generating sdcard.img, and creating the spacemit.zip flashing package.

For example, if you do not want to generate sdcard.img, you can remove sdcard-img from `IMAGE/pack.zip`.

If you want to add support for the MUSE-Pi board type in this solution, then add the device tree name `k1-x_MUSE-Pi`to DEVICE_DTS.

Additionally, there should be a file named `k1-x_MUSE-Pi.dts` in `openwrt/target/linux/spacemit/dts/`.

```sh
# SPDX-License-Identifier: GPL-2.0-only
#
# Copyright (C) 2024 Spacemit Ltd.

define Device/debX
  DEVICE_VENDOR := Spacemit
  DEVICE_MODEL :=k1-x deb board
  DEVICE_DTS_DIR:= ../dts
  DEVICE_DTS := k1-x_deb1 k1-x_MUSE-Pi 
  SOC := KeyStone
  KERNEL_NAME := Image
  KERNEL_IMG := Image.itb
  KERNEL := kernel-bin | fit none
  IMAGES := pack.zip
  IMAGE/pack.zip := $(KERNEL_IMG) | boot-common | sdcard-img | archive-zip
endef
TARGET_DEVICES += debX

```

### Initial Setup for the Solution

`openwrt/target/linux/spacemit/base-files/etc/uci-defaults/`

UCI default settings provide a method to preconfigure your image using UCI. To set some system defaults during the first boot of the device, create a script in this directory.

## Adding a New Solution

Using the k1-sbc solution as an example, the following modifications need to be made:

1.Modify the SUBTARGETS in `openwrt/target/linux/spacemit/Makefile` to include the solution name, such as `k1-sbc`.
2.Add a new solution directory, such as `openwrt/target/linux/spacemit/k1-sbc/`, and include the following files:

```sh
openwrt/target/linux/spacemit/k1-sbc/config-6.1
openwrt/target/linux/spacemit/k1-sbc/target.mk
```

3.Add firmware compilation and compatible board configurations in `openwrt/target/linux/spacemit/image/k1-sbc.mk`.

4.In the `feeds/spacemit_openwrt_feeds/` directory, add new build configurations, such as `spacemit_k1_defconfig` for the `k1-sbc` solution.

### Adding Support for New Board Types

Each solution should have at least one or more board types. For adding support for new board types, refer to[device management](openwrt_device_management.md)

### U-Boot/OpenSBI Compilation Configurations

If it is necessary to add new compilation configurations for U-Boot/OpenSBI, refer to the following modifications:

#### uboot

1. Add new compilation configurations in the U-Boot source repository, such as `u-boot-2022.10/configs/k1_defconfig`.
2. Modify `openwrt/package/boot/uboot-spacemit/Makefile`:

```sh
 50 define Build/Configure
 51     $(MAKE) -C $(LOCAL_SOURCE_DIR) k1_defconfig
 52 endef
 53 
```

#### opensbi

1. Add new compilation configurations in the OpenSBI source repository, such as `opensbi-1.3/platform/generic/configs/k1_defconfig`.
2. Modify `openwrt/package/boot/opensbi-spacemit/Makefile`.

```sh
 59 define Build/Compile
 60     $(eval $(Package/opensbi_$(BUILD_VARIANT))) \
 61         +$(MAKE_VARS) $(MAKE) -C $(LOCAL_SOURCE_DIR) \
 62         PLATFORM=$(PLAT) PLATFORM_DEFCONFIG=k1_defconfig
 63 endef
 64 

```
