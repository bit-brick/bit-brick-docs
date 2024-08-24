# 下载和编译BitOS

## 开发环境

### 硬件配置

推荐配置：
- 操作系统：推荐 Ubuntu 20.04 或更新 LTS 版本，其他 Linux 发行版本没有测试。

### 安装依赖

Ubuntu 16.04 and 18.04:
```
sudo apt-get install git build-essential cpio unzip rsync file bc wget python3 libncurses5-dev libssl-dev dosfstools mtools u-boot-tools flex bison python3-pip
sudo pip3 install pyyaml
```
Ubuntu 20.04 or higher:
```
sudo apt-get install git build-essential cpio unzip rsync file bc wget python3 python-is-python3 libncurses5-dev libssl-dev dosfstools mtools u-boot-tools flex bison python3-pip
sudo pip3 install pyyaml
```

## 下载

使用 repo（版本 >= 2.41）下载完整 SDK。如果没有 repo，参考 Git Repo 镜像使用帮助安装。

Bianbu Linux 代码托管在 Gitee 上，下载前先参考这篇文档设置 SSH Keys。

下载代码，例如下载 `<代码开始>bl-v1.0.y<代码结束>`分支：
```
mkdir ~/bianbu-linux
cd ~/bianbu-linux
repo init -u git@gitee.com:bianbu-linux/manifests.git -b main -m bl-v1.0.y.xml
repo sync
repo start bl-v1.0.y --all
```
推荐提前下载 buildroot 依赖的第三方软件包，并在团队内部分发，避免主服务器网络拥塞。
```
wget -c -r -nv -np -nH -R "index.html*" http://archive.spacemit.com/buildroot/dl
```
目录结构：
```
├── bsp-src               # 存放 linux kernel、uboot、opensbi 源码
│   ├── linux-6.1
│   ├── opensbi
│   └── uboot-2022.10
├── buildroot             # buildroot 主目录
├── buildroot-ext         # 客制化扩展，包含 board、configs、package、patches 子目录
├── Makefile              # 顶层 Makefile
├── package-src           # 本地展开的应用或库源码目录
│   ├── ai-support
│   ├── drm-test
│   ├── img-gpu-powervr
│   ├── k1x-cam
│   ├── k1x-jpu
│   ├── k1x-vpu-firmware
│   ├── k1x-vpu-test
│   ├── mesa3d
│   ├── mpp
│   └── v2d-test
└── scripts               # 编译使用到的脚本
```

## 交叉编译

### 首次完整编译

首次编译，建议使用 `<代码开始>make envconfig<代码结束>`完整编译。

修改了 `<代码开始>buildroot-ext/configs/spacemit_<solution>_defconfig<代码结束>`，要使用 `<代码开始>make envconfig<代码结束>`编译。

其他情况，使用 `<代码开始>make<代码结束>`编译即可。
```
cd ~/bianbu-linux
make envconfig
Available configs in buildroot-ext/configs/:
  1. spacemit_k1_defconfig
  2. spacemit_k1_minimal_defconfig
  3. spacemit_k1_plt_defconfig
  4. spacemit_k1_v2_defconfig
your choice (1-4):
```
编译 Bianbu Linux 1.0 版本，输入 `<代码开始>1<代码结束>`，然后回车即开始编译。

编译 Bianbu Linux 2.0 版本，输入 `<代码开始>4<代码结束>`。

编译过程可能需要下载一些第三方软件包，具体耗时和网络环境相关。如果提前下载 buildroot 依赖的第三方软件包，推荐硬件配置编译耗时约为 1 小时。

编译完成，可以看到：
```
Images successfully packed into /home/username/bianbu-linux/output/k1/images/bianbu-linux-k1.zip
Generating sdcard.img...................................
INFO: cmd: "mkdir -p "/home/username/bianbu-linux/output/k1/build/genimage.tmp"" (stderr):
INFO: cmd: "rm -rf "/home/username/bianbu-linux/output/k1/build/genimage.tmp"/*" (stderr):
INFO: cmd: "mkdir -p "/home/username/bianbu-linux/output/k1/images"" (stderr):
INFO: hdimage(sdcard.img): adding partition 'bootinfo' from 'factory/bootinfo_sd.bin'...
INFO: hdimage(sdcard.img): adding partition 'fsbl' (in MBR) from 'factory/FSBL.bin'...
INFO: hdimage(sdcard.img): adding partition 'env' (in MBR) from 'env.bin'...
INFO: hdimage(sdcard.img): adding partition 'opensbi' (in MBR) from 'opensbi.itb'...
INFO: hdimage(sdcard.img): adding partition 'uboot' (in MBR) from 'u-boot.itb'...
INFO: hdimage(sdcard.img): adding partition 'bootfs' (in MBR) from 'bootfs.img'...
INFO: hdimage(sdcard.img): adding partition 'rootfs' (in MBR) from 'rootfs.ext4'...
INFO: hdimage(sdcard.img): adding partition '[MBR]'...
INFO: hdimage(sdcard.img): adding partition '[GPT header]'...
INFO: hdimage(sdcard.img): adding partition '[GPT array]'...
INFO: hdimage(sdcard.img): adding partition '[GPT backup]'...
INFO: hdimage(sdcard.img): writing GPT
INFO: hdimage(sdcard.img): writing protective MBR
INFO: hdimage(sdcard.img): writing MBR
Successfully generated at /home/username/work/bianbu-linux/output/k1/images/bianbu-linux-k1-sdcard.img
```
其中 `<代码开始>bianbu-linux-k1.zip<代码结束>`适用于 Titan Flasher，或者解压后用 fastboot 刷机；`<代码开始>bianbu-linux-k1-sdcard.img<代码结束>`为 sdcard 固件，解压后可以用 dd 命令或者 balenaEtcher 写入 sdcard。

Titan Flasher 使用指南：刷机工具使用指南

固件默认用户名：`<代码开始>root<代码结束>`，密码：`<代码开始>bianbu<代码结束>`。

## 配置

### buildroot

配置：
```
make menuconfig
```
保存配置，默认保存到 `<代码开始>buildroot-ext/configs/spacemit_k1_defconfig<代码结束>`：
```
make savedefconfig
```

### linux

配置：
```
make linux-menuconfig
```
保存配置，默认保存到 `<代码开始>bsp-src/linux-6.1/arch/riscv/configs/k1_defconfig<代码结束>`：
```
make linux-update-defconfig
```

### u-boot

配置：
```
make uboot-menuconfig
```
保存配置，默认保存到 `<代码开始>bsp-src/uboot-2022.10/configs/k1_defconfig<代码结束>`：
```
make uboot-update-defconfig
```

## 编译指定包

buildroot 支持编译指定 package，可以 `<代码开始>make help<代码结束>`查看指南。

常用命令：
- 删除 `<代码开始><pkg><代码结束>`的编译目录：`<代码开始>make <pkg>-dirclean<代码结束>`
- 编译 `<代码开始><pkg><代码结束>`：`<代码开始>make <pkg><代码结束>`
- 编译内核：
```
make linux-rebuild
```
- 编译 u-boot：
```
make uboot-rebuild
```
编译指定包之后，可以单独下载到设备验证，或者编进固件：
```
make
```

## 单独编译

### 交叉编译器下载地址：`<代码开始>http://archive.spacemit.com/toolchain/<代码结束>`，解压即可使用。

设置环境变量：
```
export PATH=/path/to/spacemit-toolchain-linux-glibc-x86_64-v0.3.3/bin:$PATH
export CROSS_COMPILE=riscv64-unknown-linux-gnu-
export ARCH=riscv
```

### 编译 opensbi

```
cd /path/to/opensbi
make -j$(nproc) PLATFORM_DEFCONFIG=k1_defconfig PLATFORM=generic
```

### 编译 u-boot

```
cd /path/to/uboot-2022.10
make k1_defconfig
make -j$(nproc)
```
编译会根据 `<代码开始>board/spacemit/k1-x/k1-x.env<代码结束>`生成 `<代码开始>u-boot-env-default.bin<代码结束>`，对应分区表 `<代码开始>env<代码结束>`分区的镜像。

### 编译 linux

```
cd /path/to/linux-6.1
make k1_defconfig
LOCALVERSION="" make -j$(nproc)
```

## 本地编译

将 opensbi、u-boot 或 linux 代码下载到 Bianbu Desktop，即可本地编译。

### 编译 opensbi

```
cd /path/to/opensbi
make -j$(nproc) PLATFORM_DEFCONFIG=k1_defconfig PLATFORM=generic
```
将 `<代码开始>platform/generic/firmware/fw_dynamic.itb<代码结束>`用 fastboot 写入 opensbi 分区即可。

### 编译 u-boot

```
cd /path/to/uboot-2022.10
make k1_defconfig
make -j$(nproc)
```
将 `<代码开始>FSBL.bin<代码结束>`、`<代码开始>u-boot-env-default.bin<代码结束>`和 `<代码开始>u-boot.itb<代码结束>`用 fastboot 写入对应分区即可。

### 编译 linux

```
cd /path/to/linux-6.1
make k1_defconfig
LOCALVERSION="" make -j$(nproc)
```
将 `<代码开始>arch/riscv/boot/Image.gz.itb<代码结束>`和 `<代码开始>arch/riscv/boot/dts/spacemit/*.dtb<代码结束>`替换 `<代码开始>bootfs<代码结束>`分区对应文件即可。 