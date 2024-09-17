# U-Boot 开发

U-Boot 和 OpenSBI 开发调试指南。

## uboot 功能与配置

### 功能介绍
uboot 的主要功能有以下几点：
1. **加载启动内核**：uboot 从存储介质（emmc/sd/nand/nor/ssd 等），加载内核镜像到内存指定位置，并启动内核。
2. **fastboot 刷机功能**：通过 fastboot 工具，烧写镜像到指定的分区位置。
3. **开机 logo**：uboot 启动阶段显示启动 logo 以及 boot menu。
4. **驱动调试**：基于 uboot 调试设备驱动，如 mmc/spi/nand/nor/nvme 等驱动。uboot 提供 shell 命令行对各个驱动进行功能调试。uboot 驱动在 `drivers/`目录下。

### 编译
本章节介绍基于 uboot 代码环境，编译生成 uboot 的镜像文件。

#### 编译配置
首次编译，或者需要重新选择其他方案，则需要先选择编译配置，这里以 k1 为例：
```
cd ~/uboot-2022.10
make ARCH=riscv k1_defconfig -C ~/uboot-2022.10/
```
可视化更改编译配置：
```
make ARCH=riscv menuconfig
```
```
.config
U-Boot 2022.10Configuration
U-Boot 2022.10 Configuration
Arrow keys navigate the menu.<Enter> selects submenus--->(or empty submenus includes,<N>excludes,<M> moduLarizes features.Press<Esc<Esc> to exit,<?>for Help,</>for Search.Legend:[*]built-in[] excluded <M>module<>module capable
Press ing <Y>
[]Skip the calls to certain Low level initialization functions [] Skip the calls to certain Low level initial ization functions ***Compiler:gcc(Ubuntu 9.4.0-1ubuntu1~20.04.2)9.4.0*** Arch itecture select(RISC-V architecture)
RISC-V arch itecture ---> General setup--->
Boot options--- Init options ---> Security support --> Console---> Logging---> API ---> Update support ---> Lob List--->
[*] []Enable VPL 汇 Enable SPL FDT tools for simplefb support SPL conf igurat ion options---
Command Line interface--->
Partition Types--->
Device Tree Control-->
Env ironment--->
[*]Networking support --->
(4) Number of receive packet buffers
Device Drivers --->
File systems …->
[]Unit tests---- ibrary routines--->
[]Unit tests in SPL Tools options--->
<Select>
<Exit>
<Help>
<Save>
<Load>
```
通过键盘"Y"/"N"以开启/关闭相关的功能配置。保存后会更新到 uboot 根目录的`.config`文件。

#### 编译 uboot
```
cd ~/uboot-2022.10
GCC_PREFIX=riscv64-unknown-linux-gnu-
make ARCH=riscv CROSS_COMPILE=${GCC_PREFIX} -C ~/uboot-2022.10 -j4
```

#### 编译产物
```
~/uboot-2022.10$ ls u-boot* -l
u-boot
u-boot.bin           # uboot镜像
u-boot.dtb           # dtb文件
u-boot-dtb.bin       # 带dtb的uboot镜像
u-boot.itb           # 将u-boot-nodtb.bin和dtb打包成fit格式
u-boot-nodtb.bin
bootinfo_emmc.bin    # 用于emmc启动时记录spl位置的信息
bootinfo_sd.bin
bootinfo_spinand.bin
bootinfo_spinor.bin
FSBL.bin             # u-boot-spl.bin加上头信息。由brom加载启动
k1-x_deb1.dtb        # 方案deb1的dtb文件
k1-x_spl.dtb         # spl的dtb文件
```

### dts 配置
uboot dts 配置在目录 `uboot-2022.10/arch/riscv/dts/`，根据不同的方案修改该方案的 dts，如 deb1 方案。
```
~/uboot-2022.10$ ls arch/riscv/dts/k1*.dts -l
arch/riscv/dts/k1-x_deb1.dts
arch/riscv/dts/k1-x_deb2.dts
arch/riscv/dts/k1-x_evb.dts
arch/riscv/dts/k1-x_fpga_1x4.dts
arch/riscv/dts/k1-x_fpga_2x2.dts
arch/riscv/dts/k1-x_fpga.dts
arch/riscv/dts/k1-x_spl.dts
```

### uboot 驱动开发调试
本章节主要介绍 uboot 的驱动使用和调试方法，默认情况下所有的驱动都已经做好配置。

#### boot kernel
本小节介绍 uboot 启动 kernel，以及分区的自定义配置和启动。

开发板上电启动后，立即按下键盘上的"s"键，进入 uboot shell

可通过执行 `fastboot 0` 进入 fastboot mode，通过电脑端的 `fastboot stage Image` 发送镜像到开发板。(或者其他下载镜像的方式，如 `fatload` 等命令)

执行 `booti` 启动 kernel(或者 `bootm` 启动 fit 格式镜像)

#下载kernel镜像
```
=> fastboot -l 0x40000000 0
Starting download of 50687488 bytes
...
downloading/uploading of 50687488 bytes finished
```
#电脑端执行命令
```
C:\Users>fastboot stage Z:\k1\output\Image
Sending 'Z:\k1\output\Image' (49499 KB)           OKAY [  1.934s]
Finished. Total time: 3.358s
```
#下载完成后，在uboot shell中，通过键盘输入CTRL+C退出fastboot mode。

#下载dtb
```
=> fastboot -l 0x50000000 0
Starting download of 33261 bytes
downloading/uploading of 33261 bytes finished
```
#电脑端执行命令
```
C:\Users>fastboot stage Z:\k1\output\k1-x_deb1.dtb
Sending 'Z:\k1\output\k1-x_deb1.dtb' (32 KB)      OKAY [  0.004s]
Finished. Total time: 0.054s
```
执行启动命令
```
=> booti 0x40000000 - 0x50000000
Moving Image from 0x40000000 to 0x200000, end=3d4f000
## Flattened Device Tree blob at 50000000
   Booting using the fdt blob at 0x50000000
   Using Device Tree in place at 0000000050000000, end 0000000050014896
Starting kernel...
[    0.000000] Linux version 6.1.15+......
[    0.000000] OF: fdt: Ignoring memory range 0x0 - 0x200000
[    0.000000] Machine model: spacemit k1-x deb1 board
[    0.000000] earlycon: sbi0 at I/O port 0x0 (options '')
[    0.000000] printk: bootconsole [sbi0] enabled
```
通过 `bootm` 命令启动 fit 格式镜像

假设 emmc 中分区 5 为 fat32 文件系统。且里面保存 `uImage.itb` 文件，通过以下命令加载启动 kernel。
```
=> fatls mmc 2:5
sdh@d4281000: 74 clk wait timeout(100)
 50896911   uImage.itb
     4671   env_k1-x.txt
2 file(s), 0 dir(s)
=> fatload mmc 2:5 0x40000000 uImage.itb
50896911 bytes read in 339 ms (143.2 MiB/s)
=> bootm 0x40000000
## Loading kernel from FIT Image at 40000000...
Boot from fit configuration k1_deb1
   Using 'conf_2' configuration
   Trying 'kernel' kernel subimage
     Description:  Vanilla Linux kernel
     Type:         Kernel Image
     Compression:  uncompressed
     Data Start:   0x400000e8
     Data Size:    50687488 Bytes = 48.3 MiB
     Architecture: RISC-V
     OS:           Linux
     Load Address: 0x01400000
     Entry Point:  0x01400000
   Verifying Hash Integrity... OK
## Loading fdt from FIT Image at 40000000...
   Using 'conf_2' configuration
   Trying 'fdt_2' fdt subimage
     Description:  Flattened Device Tree blob for k1_deb1
     Type:         Flat Device Tree
     Compression:  uncompressed
     Data Start:   0x43067c90
     Data Size:    68940 Bytes = 67.3 KiB
     Architecture: RISC-V
     Load Address: 0x28000000
   Verifying Hash Integrity... OK
   Loading fdt from 0x43067c90 to 0x28000000
   Booting using the fdt blob at 0x28000000
   Loading Kernel Image
   Using Device Tree in place at 0000000028000000, end 0000000028013d4b
Starting kernel...
[    0.000000] Linux version 6.1.15+......
[    0.000000] OF: fdt: Ignoring memory range 0x0 - 0x1400000
[    0.000000] Machine model: spacemit k1-x deb1 board
[    0.000000] earlycon: sbi0 at I/O port 0x0 (options '')
[    0.000000] printk: bootconsole [sbi0] enabled
```

#### env
本章节介绍如何配置在 uboot 启动阶段，从指定存储介质加载 env。

执行 `make menuconfig`，进入 `Environment`，
```
config-U-Boot 2022.10Configuration
U-Boot 2022.10 Configurat ion
Arrow keys nav igate the menu.<Enter>selects submenus-->(orempty submenus---).Highl ighted letters are hotkeys. <N>excludes,dularizes features.Press <EscEscto exit,<?>for Hep,</>for Serch.Legend:[*built-n[]excluded<Modu <>module capable
Press ing <Y> incLudes,
***Compiler:gcc(Ubuntu 9.4.0-1ubuntu1~20.04.2)9.4.*** Arch itecture select (RISC-V architecture) Skip the calls to certain Low level initialization functions Skip the calls to certain low level initialization functions
吕
RISC-V arch itecture--->
General setup---> API--->
Boot options--Console ---> ogging--->
Init options---> Security support ---> Update support--->
BLob List -->
[*] Enable SPL SPL configuration options--->
[] Enable VPL [ 1 FDT tools for s implefb support
Command line interface ---> Partit ion Types --->
Dev ice Tree Control--> Environment
[*] Networking support --->
(4) Number of receive packet buffers Device Drivers--->
File systems ----> Library routines --->
[1 Unit tests Unit tests in SPL Tools opt ions --->
[ 1
<Select> Exit > Help> Save> Load>
config -U-Boot 2022.10 Configuration
Enyironment
Env ironment
Arrow keys navigate the menu.
<Enter>selects submenus-->(orempty submenus---).Highl ighted letters are hotkeys.
Press ing <Y> incLudes,
<N>excludes,dularizes features.Press <EscEscto exit,<?>for Hep,</>for Serch.Legend:[*built-n[]excluded<Modu <>module capable
Environment file to use
Enable overwr it ing env ironment
[*] (64)Min imumnumber of entries in the environment hashtable (512)Maximumm number ofentries in the env ironment hashtable Env ironment is not stored
Env ironment in EEPROM
H1 Environment is in a EXT4 filesystem Environment is in a FAT filesystem
Env ironment in flash memory
闲GC
Environment in an MMC device
Environment in a NAND device
Environment in a non-volatile RAM Environment is in OneNAND Environment is in remote memory space
(0 *1 I Env ironment is in SPI flash se automatically detected sector s ize /alue of SPI flash bus for environment
(0) Value of SPI flash chip select for environment
(1000000) Value of SPI flash max frequency for environment
(0x0) Value of SPI flash work mode for env ironment ] AccessEnvironment in SPI flashes before relocation
7 Enable redundant env ironment support
( x80000)Environment address
(1)mmc device number (0x10000) Environment Sector-Size (0)mmc partit ion number (0x80000) Environment offset (0x4000) Environment Size ]Create default env ironment from file ] Relocate gd->env_addr
+
<Select> Exit > Help> Save> Load>
```
目前支持可选的介质为 mmc，mtd 设备(其中 mtd 设备包括 spinor，spinand)。

env 的偏移地址需要根据分区表的配置来确定，具体可以参考刷机启动设置章节的分区表配置，默认是 0x80000。
```
(0x80000) Environment address       #spinor的env偏移地址
(0x80000) Environment offset        #mmc设备的env偏移地址
```

#### mmc
emmc 和 sd 卡都是使用到 mmc 驱动，dev number 分别为 2、0。

##### config 配置
执行 `make menuconfig`，进入 `Device Drivers--->MMC Host controller Support`，开启以下配置
```
.config U-Boot 2022.10Configuration Device Drivers>MMC Host controller Support
MMC Host controller Support
Arrow keys navigate the menu.<Enter> selects submnus--->(or empty submenus----).Hight ighted etters are hotkeys Press ing<Y>incLudes,<N> excLudes,<M>modularizes features.Press<Esc><Esc>to exit,<?>for HeLp,</>for Search. Legend:[*]built-in[]excluded<M>module<>module capable
「*] *MMC/SD/SDIO card support support for MMC/SD write operat ions
]Pol for broken card detection case -*-Enable MMC controllers us ing Driver Model [*] [*] ] Support for SPI-based MMC controller ] ARM AMBA Multimedia Card Interface and compat ible support Enable quirks Enable MMC controllers us ing Driver Model in SPL
[*] Support for Hw partit ion ing command( eMMC)
「*] [] Support eMC replay protected memory block (RPMB) 市 Support IO voltage configuration Support I0 voltage configuration in SPL Support some additional features of the eMMC boot partitions
enable HS400 Enhanced Strobe support
[*] ]enable HS400 Enhanced Strobe support in SPL enable HS400 support
] enable HS400 support in SPL
enable HS200 support enable HS200 support in SPL
j ] Output more in format ion about the MMC MMC debugg ing Synopsys Des ignWare Memory Card Interface Freescale i.MX21/27/31or MPC512x Multimedia Card support
] Support for MMC controllers on PCI
TI OMAP High Speed Mult imedia Card Interface support Secure Digital Host Controller Interface support
Support SDHCI SDMA
Support SDHCI ADMA2
SDHI support on ST SPEAr platform SDHCI support for the iProc SD/MMC Controller SDHCI support for Fuj itsu Semiconductor F_SDH30 Qualcomm SDHCI controller SDHCI support for STMicroelectron ics SoC SDHCI support for the BCMSTB SD/MMC Controller DHI upport for the CadenceSD/SD0/eMMC ontroller SDHCI support on Nuvoton NPCM device SDHCI support on Samsung S5P SoC SDHCI support on Broadcom KONA