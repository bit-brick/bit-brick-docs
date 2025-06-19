---
sidebar_position: 4
---
# Solution Management
This document introduces how the SDK manages solutions (solution), including the configuration files of the solution, how to customize the solution, and how to add a new solution.
## Configuration Files of the Solution
Taking the default solution K1 as an example, it usually includes the following configuration files:
```shell
buildroot-ext/board/spacemit/k1/partition_*.json
buildroot-ext/board/spacemit/k1/env_k1-x.txt
buildroot-ext/board/spacemit/k1/k1-x.bmp
buildroot-ext/board/spacemit/k1/dracut.conf
buildroot-ext/board/spacemit/k1/target_overlay
buildroot-ext/configs/spacemit_k1_defconfig
bsp-src/opensbi/platform/generic/configs/k1_defconfig
bsp-src/uboot-2022.10/configs/k1_defconfig
bsp-src/linux-6.1/arch/riscv/configs/k1_defconfig
```
**buildroot-ext/board/spacemit/k1/partition_*.json**

Partition configuration files:
- `partition_2M.json`: for 2MB flash
- `partition_universal.json`: for high-capacity flash, such as eMMC, sdcard, SSD
  
**buildroot-ext/board/spacemit/k1/env_k1-x.txt**

u-boot environment variables, which can be customized to start parameters.

**buildroot-ext/board/spacemit/k1/bianbu.bmp**

u-boot startup logo:
- Format: BMP
- Resolution: less than or equal to the screen resolution
- Bit depth: 32
  
**buildroot-ext/board/spacemit/k1/dracut.conf**

The configuration file of Dracut, which is a tool for making the initramfs image.

**buildroot-ext/board/spacemit/k1/target_overlay**

As the name suggests, this directory is an overlay of the target directory.

**buildroot-ext/configs/spacemit_k1_defconfig**

The configuration file of Buildroot.

**bsp-src/opensbi/platform/generic/configs/k1_defconfig**

The configuration file of opensbi.

**bsp-src/uboot-2022.10/configs/k1_defconfig**

The configuration file of u-boot.

**bsp-src/linux-6.1/arch/riscv/configs/k1_defconfig**

The configuration file of the kernel.

## Default Partition Configuration

Try not to modify the partition configuration before `bootfs` to avoid hard code in the boot code, which may cause the system to fail to boot properly after modification.
### eMMC Partition Configuration

Configure according to the `partitions` array in the `partition_universal.json` file, where `bootinfo` and `fsbl` are located in the boot0 partition of the eMMC.
The configuration of the eMMC boot0 partition is as follows:
```
-----------------------------
|/bootinfo/        | fsbl   |
-----------------------------
^         ^        ^        ^
|         |        |        |
0K        80bytes  512bytes 198.5K
```
The configuration of the eMMC GPP partition is as follows:
```
--------------------------------------------------------------------------------------------
| gpt                            | env | opensbi | uboot   |    bootfs      |    rootfs    |
--------------------------------------------------------------------------------------------
^                                ^     ^         ^         ^                ^              ^
|                                |     |         |         |                |              |
0K                               384K  448K      832K      4M               260M           Capacity
```
**Note**
- If booting from eMMC, the Boot ROM loads `fsbl` from the boot0 partition of the eMMC, not the GPP partition. At this time, the `fsbl` in the GPP partition is invalid.
### sdcard Partition Configuration
Configure completely according to the `partitions` array in the `partition_universal.json` file.
The partition configuration is as follows:
```
--------------------------------------------------------------------------------------------
|/bootinfo/ gpt           | fsbl | env | opensbi | uboot   |    bootfs    |    rootfs    |
--------------------------------------------------------------------------------------------
^         ^               ^      ^     ^         ^         ^              ^              ^
|         |               |      |     |         |         |              |              |
0K        80bytes         128K   384K  448K      832K      4M             260M           Capacity
```
### SPINOR + SSD Partition Configuration
For the SSD solution, SPINOR is required for booting, and the partitions before `bootfs` are stored in SPINOR. Configure according to the `partitions` array in the `partition_<SPINOR size>.json` file.
The configuration of the SPINOR partition is as follows:
```
----------------------------------------------------
|/bootinfo/         | fsbl | env | opensbi | uboot |
----------------------------------------------------
^         ^         ^      ^     ^         ^       ^
|         |         |      |     |         |       |
0K        80bytes   128K   384K  448K      640K    Capacity
```
`bootfs` and `rootfs` are stored in the SSD and configured according to the `partitions` array in the `partition_universal.json` file.
```
------------------------------------------------------------------------------------------
| gpt                                                      |    bootfs    |    rootfs    |
------------------------------------------------------------------------------------------
^                                                          ^              ^              ^
|                                                          |              |              |
0K                                                         4M             260M           Capacity
```
## Customizing the Solution
## Adding a New Solution