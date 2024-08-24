# 方案管理

本文档介绍 SDK 如何管理方案（solution），包括方案的配置文件，如何定制方案和如何添加新方案等。

## 方案的配置文件

以默认方案 K1 为例，通常包含以下配置文件：
```
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
- `buildroot-ext/board/spacemit/k1/partition_*.json`：分区配置文件：
    - `partition_2M.json`：for 2MB flash
    - `partition_universal.json`：for high capacity flash，例如 eMMC、sdcard、SSD
- `buildroot-ext/board/spacemit/k1/env_k1-x.txt`：u-boot 环境变量，可定制启动参数。
- `buildroot-ext/board/spacemit/k1/bianbu.bmp`：u-boot 启动 logo：
    - 格式：BMP
    - 分辨率：小于或等于屏幕分辨率
    - 位深度：32
- `buildroot-ext/board/spacemit/k1/dracut.conf`：Dracut 的配置文件，Dracut 是一个制作 initramfs 镜像的工具。
- `buildroot-ext/board/spacemit/k1/target_overlay`：故名思意，改目录是对 target 目录的 overlay。
- `buildroot-ext/configs/spacemit_k1_defconfig`：Buildroot 的配置文件。
- `bsp-src/opensbi/platform/generic/configs/k1_defconfig`：opensbi 的配置文件。
- `bsp-src/uboot-2022.10/configs/k1_defconfig`：u-boot 的配置文件。
- `bsp-src/linux-6.1/arch/riscv/configs/k1_defconfig`：kernel 的配置文件。

## 默认分区配置

尽量不要修改 `bootfs`前面的分区配置，避免引导代码中有 hard code，修改之后无法正常引导。

## eMMC 分区配置

按 partition_universal.json 文件 `partitions`数组配置，其中 bootinfo 和 fsbl 位于 eMMC 的 boot0 分区。

eMMC boot0 分区配置如下：
```
-----------------------------
|/bootinfo/        | fsbl   |
-----------------------------
^         ^        ^        ^
|         |        |        |
0K        80bytes  512bytes 198.5K
```
eMMC GPP 分区配置如下：
```
--------------------------------------------------------------------------------------------
| gpt                            | env | opensbi | uboot   |    bootfs      |    rootfs    |
--------------------------------------------------------------------------------------------
^                                ^     ^         ^         ^                ^              ^
|                                |     |         |         |                |              |
0K                               384K  448K      832K      4M               260M           Capacity
```
注意：如果从 eMMC 启动，Boot ROM 从 eMMC 的 boot0 分区加载 fsbl，而非 GPP 分区，此时 GPP 分区是 fsbl 无效的。

## sdcard 分区配置

完全按 partition_universal.json 文件 `partitions`数组配置。

分区配置如下：
```
--------------------------------------------------------------------------------------------
|/bootinfo/ gpt           | fsbl | env | opensbi | uboot   |    bootfs    |    rootfs    |
--------------------------------------------------------------------------------------------
^         ^               ^      ^     ^         ^         ^              ^              ^
|         |               |      |     |         |         |              |              |
0K        80bytes         128K   384K  448K      832K      4M             260M           Capacity
```
## SPINOR + SSD 分区配置

SSD 方案，需要用 SPINOR 引导，bootfs 之前的分区都存储在 SPINOR，按 `partition_<SPINOR size>.json`文件 `partitions`数组配置。

SPINOR 分区配置如下：
```
----------------------------------------------------
|/bootinfo/         | fsbl | env | opensbi | uboot |
----------------------------------------------------
^         ^         ^      ^     ^         ^       ^
|         |         |      |     |         |       |
0K        80bytes   128K   384K  448K      640K    Capacity
```
bootfs 和 rootfs 存储在 SSD，按 partition_universal.json 文件 `partitions`数组配置。
```
------------------------------------------------------------------------------------------
| gpt                                                      |    bootfs    |    rootfs    |
------------------------------------------------------------------------------------------
^                                                          ^              ^              ^
|                                                          |              |              |
0K                                                         4M             260M           Capacity
```

## 定制方案

## 添加新方案