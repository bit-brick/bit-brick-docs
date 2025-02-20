# K1 JOH5.0 方案添加移植说明



# SDK 目前支持方案

<table>
<tbody>
<tr>
<td><strong>生态产品</strong></td>
<td><strong>形态</strong></td>
<td><strong>启动方式</strong></td>
<td><strong>显示</strong></td>
<td><strong>触摸</strong></td>
<td><strong>wifi</strong></td>
<td><strong>BT</strong></td>
<td><strong>eth</strong></td>
<td><strong>usb</strong></td>
<td><strong>键鼠</strong></td>
<td><strong>camera</strong></td>
</tr>
<tr>
<td><strong>MUSEPaper2</strong><br/></td>
<td>平板<br/></td>
<td>Emmc<br/>tf卡</td>
<td>Mipi dsi</td>
<td>√</td>
<td>√</td>
<td>√</td>
<td>×</td>
<td>√</td>
<td>×</td>
<td>√</td>
</tr>
<tr>
<td><strong>MUSEPaper</strong><br/></td>
<td>平板</td>
<td>Emmc<br/>tf卡</td>
<td>Mipi dsi<br/></td>
<td>√</td>
<td>√</td>
<td>√</td>
<td>×</td>
<td>√</td>
<td>×</td>
<td>√</td>
</tr>
</tbody>
</table>

# 添加定制方案

和产品方案相关的几个关键仓库和如下：

- build：添加构建白名单，主要修改文件为：`compile_standard_whitelist.json` 和 `subsystem_compoents_whitelist.json`
- vendor/spacemit：进迭厂商定制适配目录
- device/board/spacemit：进迭厂商板级适配目录
- device/soc/spacemit：进迭厂商芯片适配目录
- kernel/linux/spacemit\_kernel-6.6：进迭厂商内核

添加定制方案有 2 种方式：

- 通过修改现有方案来适配新方案，例如需要重新适配一款开发板，源码中已经适配好的开发板有 deb1 和 MUSEPi，可以通过修改这 2 个方案中的配置来适配新的开发板
- 添加 1 个全新的方案

下面分别对两种定制方案的操作进行说明：

## 通过修改现有方案定制

### 定制 uboot

目前 uboot 未上传源码，可以提供原理图给进迭，进迭配置并编译好后，提供 uboot 相关的 bin 文件。下面说明对于进迭提供的 uboot 文件如何添加到系统中。

通用的 uboot 文件在 `device/soc/spacemit/k1/kernel/boot` 目录下，这些 uboot 文件适用于所有的方案，如下：

```cpp
|-- bootfs
|   |-- boot_logo_spacemit_0.bmp
|   |-- boot_logo_spacemit_180.bmp
|   |-- boot_logo_spacemit_270.bmp
|   `-- boot_logo_spacemit_90.bmp
|-- env.bin
|-- factory
|   |-- bootinfo_emmc.bin
|   |-- bootinfo_sd.bin
|   |-- bootinfo_spinand.bin
|   |-- bootinfo_spinor.bin
|   `-- FSBL.bin
|-- fastboot.yaml
|-- fw_dynamic.itb
|-- genimage.cfg
|-- partition_2M.json
|-- partition_flash.json
`-- u-boot.itb
```

经常更新的文件包括 `env.bin`，`FSBL.bin`，`u-boot.bin`，这些文件在 `device/board/spacemit/xxx/kernel/build_kernel.sh` 中拷贝到打包目录，如下：

```cpp
cp ${OHOS_SOURCE_ROOT}/device/soc/${DEVICE_BOARD}/k1/kernel/boot/bootfs/boot_logo_spacemit_0.bmp ${OHOS_IMAGES_DIR}/bootfs/bianbu.bmp
cp ${OHOS_SOURCE_ROOT}/device/board/${DEVICE_BOARD}/${DEVICE_NAME}/kernel/boot/bootfs/env_k1-x.txt ${OHOS_IMAGES_DIR}/bootfs/env_k1-x.txt
cp ${OHOS_SOURCE_ROOT}/device/soc/${DEVICE_BOARD}/k1/kernel/boot/env.bin ${OHOS_IMAGES_DIR}/env.bin
cp ${OHOS_SOURCE_ROOT}/device/soc/${DEVICE_BOARD}/k1/kernel/boot/u-boot.itb ${OHOS_IMAGES_DIR}/u-boot.itb
cp ${OHOS_SOURCE_ROOT}/device/soc/${DEVICE_BOARD}/k1/kernel/boot/fw_dynamic.itb ${OHOS_IMAGES_DIR}/fw_dynamic.itb
cp ${OHOS_SOURCE_ROOT}/device/board/${DEVICE_BOARD}/${DEVICE_NAME}/kernel/boot/partition_universal.json ${OHOS_IMAGES_DIR}/partition_universal.json
cp ${OHOS_SOURCE_ROOT}/device/soc/${DEVICE_BOARD}/k1/kernel/boot/fastboot.yaml ${OHOS_IMAGES_DIR}/fastboot.yaml
cp ${OHOS_SOURCE_ROOT}/device/soc/${DEVICE_BOARD}/k1/kernel/boot/genimage.cfg ${OHOS_IMAGES_DIR}/genimage.cfg
cp -r ${OHOS_SOURCE_ROOT}/device/soc/${DEVICE_BOARD}/k1/kernel/boot/factory ${OHOS_IMAGES_DIR}/
```

某些方案的 uboot 有特殊定制的情况下，需要将 uboot 的 bin 单独放置在该方案的目录 `device/board/spacemit/xxx/kernel/boot` 下，同时也需要修改 `build_kernel.sh` 文件，拷贝方案目录下的 uboot 文件到打包目录。

### 定制 kernel

#### 修改 dts

内核的 dts 文件统一放置在：`kernel/linux/spacemit_kernel-6.6/arch/riscv/boot/dts/spacemit`，如下所示：

```cpp
|-- k1-x-camera-reserved-mm.dtsi
|-- k1-x-camera-sdk.dtsi
|-- k1-x-camera-sensor.dtsi
|-- k1-x_deb1.dts
|-- k1-x_deb2.dts
|-- k1-x.dtsi
|-- k1-x-efuse.dtsi
|-- k1-x_evb.dts
|-- k1-x-hdmi.dtsi
|-- k1-x_hs450.dts
|-- k1-x_kx312.dts
|-- k1-x-lcd.dtsi
|-- k1-x_lpi3a.dts
|-- k1-x_milkv-jupiter.dts
|-- k1-x_mingo.dts
|-- k1-x_MINI-PC.dts
|-- k1-x_MUSE-Book.dts
|-- k1-x_MUSE-Card.dts
|-- k1-x_MUSE-N1.dts
|-- k1-x_MUSE-Paper2.dts
|-- k1-x_MUSE-Paper.dts
|-- k1-x_MUSE-Paper-mini-4g.dts
|-- k1-x_MUSE-Pi.dts
|-- k1-x_opp_table.dtsi
|-- k1-x_pinctrl.dtsi
|-- k1-x_SMT001.dts
|-- k1-x_thermal_cooling.dtsi
|-- k1-x_ZT001H.dts
|-- lcd
|   |-- lcd_ft8201sinx101_mipi.dtsi
|   |-- lcd_gc9503v_mipi.dtsi
|   |-- lcd_gx09inx101_mipi.dtsi
|   |-- lcd_icnl9911c_mipi.dtsi
|   |-- lcd_icnl9951r_mipi.dtsi
|   |-- lcd_jd9365dah3_mipi.dtsi
|   |-- lcd_jd9365da_mipi_1280x800.dtsi
|   |-- lcd_lt8911_edp_1920x1080.dtsi
|   |-- lcd_lt8911_edp_1920x1200.dtsi
|   |-- lcd_lt9711_dp_1920x1080.dtsi
|   `-- lcd_orisetech_ota7290b_mipi.dtsi
|-- m1-x_milkv-jupiter.dts
`-- Makefile
```

可以根据方案名称修改对应的 dts 文件即可，修改完成后，重新编译内核，如下：

```cpp
./build.sh --product-name xxx --ccache -T build_kernel
```

#### 修改 defconfig

内核的 defconfig 文件放在：`kernel/linux/spacemit_kernel-6.6/arch/riscv/configs/k1_defconfig`，该 defconfig 是所有方案共用的，修改后，对所有的方案生效，如果只是针对某个特定方案的修改，需要以打 patch 的形式来修改，过程如下：

- 生成 patch：fix.patch
- 将 fix.patch 放置于 device/board/spacemit/xxx/kernel/kernel\_patch 中
- device/board/spacemit/musebook/kernel/build\_kernel.sh 中打 patch，如下：

```cpp
patch -p1 <${OHOS_SOURCE_ROOT}/device/board/${DEVICE_BOARD}/${DEVICE_NAME}/kernel/kernel_patch/fix.patch
```

### 定制 vendor 目录

这里简要说明 `vendor/spacemit/xxx` 下面的目录和文件的用途：

- bluetooth：蓝牙厂商适配层，适配蓝牙模组主要修改该文件夹
- config.json：该方案包含的组件，可以对组件进行增删和组件属性添加
- default\_app\_config：暂无修改
- etc：添加一些系统属性，如 const.product.name="XXX"
- hals：内部 audio 目录主要适配音频通路等
- hdf\_config：方案的 hdf 配置文件
- image\_conf：暂无修改
- ohos.build：添加构建模块
- power\_config：配置电源管理模式，分为 `NORMAL`，`POWER_SAVE`，`PERFORMANCE`，`EXTREME_POWER_SAVE` 几种，可以配置每种模式的行为，包括关屏时间，待机时间等
- preinstall-config：安装的应用 hap 包管理和权限管理
- product.gni：一些属性配置
- resourceschedule：暂无修改
- security\_config：暂无修改
- updater\_config：暂无修改
- window\_config：窗口相关配置，比如屏幕旋转方向，过场动画时间配置等

### 定制 device 目录

device 下面分为 board 和 soc 这 2 个目录，soc 中的内容是针对 K1 芯片的适配，board 中的内容是针对个产品方案的适配，device 下面的目录结构如下所示：

```cpp
|-- board
|   `-- spacemit
|       |-- common
|       |-- deb1
|       |-- kernel_patches
|       |-- musebook
|       |-- musecard
|       |-- musepaper
|       |-- musepaper2
|       |-- musepapermini4g
|       |-- musepi
|       |-- smt001
|       `-- zt001h
`-- soc
    `-- spacemit
        |-- common
        `-- k1
```

`device/board/spacemit/xxx` 下面的主要修改点包括：

- cfg/default.para：一些系统配置参数
- cfg/fstab.xxx：文件系统挂载配置
- cfg/init.xxx.cfg：启动配置
- cfg/init.xxx.usb.cfg：usb 启动配置
- kernel：内核相关的配置和文件
- kernel/boot：uboot 相关文件
- kernel/build\_kernel.sh：内核构建脚本
- kernel/kernel\_patch：内核补丁
- kernel/ko：需要加载的 ko

`device/soc/spacemit/k1` 下面的主要修改点包括：

- hardware：K1 适配硬件的适配层，包括硬件编解码，GPU 等
- kernel/boot：uboot 相关文件
- tools：一些命令行工具

## 通过添加全新方案定制

### 定制 uboot

目前 uboot 未上传源码，可以提供原理图，并提供一个方案的代号，比如 ABC，进迭配置并编译好后，提供 uboot 相关的 bin 文件。下面说明对于进迭提供的 uboot 文件如何添加到系统中。

通用的 uboot 文件在 `device/soc/spacemit/k1/kernel/boot` 目录下，如下：

```cpp
|-- bootfs
|   |-- boot_logo_spacemit_0.bmp
|   |-- boot_logo_spacemit_180.bmp
|   |-- boot_logo_spacemit_270.bmp
|   `-- boot_logo_spacemit_90.bmp
|-- env.bin
|-- factory
|   |-- bootinfo_emmc.bin
|   |-- bootinfo_sd.bin
|   |-- bootinfo_spinand.bin
|   |-- bootinfo_spinor.bin
|   `-- FSBL.bin
|-- fastboot.yaml
|-- fw_dynamic.itb
|-- genimage.cfg
|-- partition_2M.json
|-- partition_flash.json
`-- u-boot.itb
```

经常更新的文件包括 `env.bin`，`FSBL.bin`，`u-boot.bin`，这些文件在 `device/board/spacemit/xxx/kernel/build_kernel.sh` 中拷贝到打包目录，如下：

```cpp
cp ${OHOS_SOURCE_ROOT}/device/soc/${DEVICE_BOARD}/k1/kernel/boot/bootfs/boot_logo_spacemit_0.bmp ${OHOS_IMAGES_DIR}/bootfs/bianbu.bmp
cp ${OHOS_SOURCE_ROOT}/device/board/${DEVICE_BOARD}/${DEVICE_NAME}/kernel/boot/bootfs/env_k1-x.txt ${OHOS_IMAGES_DIR}/bootfs/env_k1-x.txt
cp ${OHOS_SOURCE_ROOT}/device/soc/${DEVICE_BOARD}/k1/kernel/boot/env.bin ${OHOS_IMAGES_DIR}/env.bin
cp ${OHOS_SOURCE_ROOT}/device/soc/${DEVICE_BOARD}/k1/kernel/boot/u-boot.itb ${OHOS_IMAGES_DIR}/u-boot.itb
cp ${OHOS_SOURCE_ROOT}/device/soc/${DEVICE_BOARD}/k1/kernel/boot/fw_dynamic.itb ${OHOS_IMAGES_DIR}/fw_dynamic.itb
cp ${OHOS_SOURCE_ROOT}/device/board/${DEVICE_BOARD}/${DEVICE_NAME}/kernel/boot/partition_universal.json ${OHOS_IMAGES_DIR}/partition_universal.json
cp ${OHOS_SOURCE_ROOT}/device/soc/${DEVICE_BOARD}/k1/kernel/boot/fastboot.yaml ${OHOS_IMAGES_DIR}/fastboot.yaml
cp ${OHOS_SOURCE_ROOT}/device/soc/${DEVICE_BOARD}/k1/kernel/boot/genimage.cfg ${OHOS_IMAGES_DIR}/genimage.cfg
cp -r ${OHOS_SOURCE_ROOT}/device/soc/${DEVICE_BOARD}/k1/kernel/boot/factory ${OHOS_IMAGES_DIR}/
```

某些方案的 uboot 有特殊定制的情况下，需要将 uboot 的 bin 单独放置在该方案的目录 `device/board/spacemit/xxx/kernel/boot` 下，同时也需要修改 build\_kernel.sh 文件，拷贝方案目录下的 uboot 文件到打包目录。

### 定制 kernel

#### 修改 dts

内核的 dts 文件统一放置在：`kernel/linux/spacemit_kernel-6.6/arch/riscv/boot/dts/spacemit`，如下所示：

```cpp
|-- k1-x-camera-reserved-mm.dtsi
|-- k1-x-camera-sdk.dtsi
|-- k1-x-camera-sensor.dtsi
|-- k1-x_deb1.dts
|-- k1-x_deb2.dts
|-- k1-x.dtsi
|-- k1-x-efuse.dtsi
|-- k1-x_evb.dts
|-- k1-x-hdmi.dtsi
|-- k1-x_hs450.dts
|-- k1-x_kx312.dts
|-- k1-x-lcd.dtsi
|-- k1-x_lpi3a.dts
|-- k1-x_milkv-jupiter.dts
|-- k1-x_mingo.dts
|-- k1-x_MINI-PC.dts
|-- k1-x_MUSE-Book.dts
|-- k1-x_MUSE-Card.dts
|-- k1-x_MUSE-N1.dts
|-- k1-x_MUSE-Paper2.dts
|-- k1-x_MUSE-Paper.dts
|-- k1-x_MUSE-Paper-mini-4g.dts
|-- k1-x_MUSE-Pi.dts
|-- k1-x_opp_table.dtsi
|-- k1-x_pinctrl.dtsi
|-- k1-x_SMT001.dts
|-- k1-x_thermal_cooling.dtsi
|-- k1-x_ZT001H.dts
|-- lcd
|   |-- lcd_ft8201sinx101_mipi.dtsi
|   |-- lcd_gc9503v_mipi.dtsi
|   |-- lcd_gx09inx101_mipi.dtsi
|   |-- lcd_icnl9911c_mipi.dtsi
|   |-- lcd_icnl9951r_mipi.dtsi
|   |-- lcd_jd9365dah3_mipi.dtsi
|   |-- lcd_jd9365da_mipi_1280x800.dtsi
|   |-- lcd_lt8911_edp_1920x1080.dtsi
|   |-- lcd_lt8911_edp_1920x1200.dtsi
|   |-- lcd_lt9711_dp_1920x1080.dtsi
|   `-- lcd_orisetech_ota7290b_mipi.dtsi
|-- m1-x_milkv-jupiter.dts
`-- Makefile
```

可以根据方案名称添加对应的 dts 文件，比如 k1-x\_ABC.dts，修改完成后，添加到上述目录中，并修改 Makefile 文件，如下：

```cpp
diff --git a/arch/riscv/boot/dts/spacemit/Makefile b/arch/riscv/boot/dts/spacemit/Makefile
index ea48d28cedda..36beb0761dd7 100644
--- a/arch/riscv/boot/dts/spacemit/Makefile
+++ b/arch/riscv/boot/dts/spacemit/Makefile
@@ -3,5 +3,5 @@ dtb-$(CONFIG_SOC_SPACEMIT_K1X) += k1-x_evb.dtb k1-x_deb2.dtb k1-x_deb1.dtb k1-x_
                                  k1-x_MUSE-Pi.dtb k1-x_milkv-jupiter.dtb m1-x_milkv-jupiter.dtb \
                                  k1-x_MUSE-Book.dtb k1-x_lpi3a.dtb k1-x_MUSE-Card.dtb \
                                  k1-x_MUSE-Paper.dtb k1-x_MUSE-Paper-mini-4g.dtb \
-                                 k1-x_ZT001H.dtb k1-x_MUSE-Paper2.dtb
+                                 k1-x_ZT001H.dtb k1-x_MUSE-Paper2.dtb k1-x_ABC.dtb
 obj-$(CONFIG_BUILTIN_DTB) += $(addsuffix .o, $(dtb-y))

```

重新编译内核，如下：

```cpp
./build.sh --product-name xxx --ccache -T build_kernel
```

#### 修改 defconfig

内核的 defconfig 文件放在：`kernel/linux/spacemit_kernel-6.6/arch/riscv/configs/k1_defconfig`，该 defconfig 是所有方案共用的，修改后，对所有的方案生效，如果只是针对某个特定方案的修改，需要以打 patch 的形式来修改，过程如下：

- 生成 patch：fix.patch
- 将 fix.patch 放置于 device/board/xxx/musebook/kernel/kernel\_patch 中
- device/board/spacemit/xxx/kernel/build\_kernel.sh 中打 patch，如下：

```cpp
patch -p1 <${OHOS_SOURCE_ROOT}/device/board/${DEVICE_BOARD}/${DEVICE_NAME}/kernel/kernel_patch/fix.patch
```

### 定制 vendor 目录

vendor 目录的定制和 2.1.3 章节有差别，因为添加全新方案，vendor/spacemit 下面还没有这个目录，定制方法为拷贝一个现有方案目录，然后统一修改其中的关于方案的字样，然后在进行具体内容的修改。

- 拷贝现有方案：选择一个相似的方案进行拷贝，比如要做开发板，就选择 deb1，要做平板，就选择 musepaper，新建方案以开发板 abc 为例，如下：

```cpp
cd vendor/spacemit
cp -r deb1 abc
```

- 统一修改方案名，将所有 deb1 字样修改为 abc，将所有带有 deb1 字样的文件名修改为带有 abc 的文件名

```cpp
# sed -i "s/deb1/abc/g" `grep -rl deb1 ./`
# find . -name *deb1*
./etc/param/product_deb1.para
./etc/param/hardware_deb1.para
# mv ./etc/param/product_deb1.para ./etc/param/product_abc.para
# mv ./etc/param/hardware_deb1.para ./etc/param/hardware_abc.para
```

- 进行修改定制

### 定制 device 目录

device 目录的定制和 2.1.4 章节有差别，因为添加全新方案，device/board/spacemit 下面还没有这个目录，定制方法为拷贝一个现有方案目录，然后统一修改其中的关于方案的字样，然后在进行具体内容的修改。

- 拷贝现有方案：选择一个相似的方案进行拷贝，比如要做开发板，就选择 deb1，要做平板，就选择 musepaper，新建方案以开发板 abc 为例，如下：

```cpp
cd device/board/spacemit
cp -r deb1 abc
```

- 统一修改方案名，将所有 deb1 字样修改为 abc，将所有带有 deb1 字样的文件名修改为带有 abc 的文件名

```cpp
# sed -i "s/deb1/abc/g" `grep -rl deb1 ./`
# find . -name *deb1*
./etc/param/product_deb1.para
./etc/param/hardware_deb1.para
# mv ./etc/param/product_deb1.para ./etc/param/product_abc.para
# mv ./etc/param/hardware_deb1.para ./etc/param/hardware_abc.para
```

- 进行修改定制

### build 目录添加权限

- `subsystem_compoents_whitelist.json` 中添加方案配置

```
diff --git a/subsystem_compoents_whitelist.json b/subsystem_compoents_whitelist.json
index ee125742..a01e2e1c 100644
--- a/subsystem_compoents_whitelist.json
+++ b/subsystem_compoents_whitelist.json
@@ -15,6 +15,7 @@
   "device_smt001" :"device_smt001",
   "device_musepaper" :"device_musepaper",
   "device_musepi" :"device_musepi",
   "device_musecard" :"device_musecard",
+  "device_abc" :"device_abc",
   "device_musepaper2" :"device_musepaper2",
   "device_musepapermini4g" :"device_musepapermini4g",
   "device_zt001h" :"device_zt001h",

```

- `compile_standard_whitelist.json` 中添加模块的白名单，改动相对较对，方法是搜索该方案拷贝的原方案的名字，比如 deb1，包含 deb1 的模块都拷贝一份，并将方案名称修改为 abc


引用自 [进迭时空开发者文档](https://developer.spacemit.com/documentation?token=RY47wkcNoi99UNkdueEcpQStn8f)