# Linux Kernel

## 环境准备

确保您的系统已经安装下列依赖包：

```bash
sudo apt update
sudo apt install -y build-essential libncurses-dev bison flex libssl-dev libelf-dev bc dwarves debhelper
```

## 源码下载

先从您的 K1Pro 内核仓库克隆源码：

```bash
git clone --depth=1 https://github.com/bit-brick/k1pro-linux-kernel-6.1.git -b main k1pro-kernel
cd k1pro-kernel
```

## 配置内核

按照默认配置生成 .config 文件：

```bash
make ARCH=arm64 CROSS_COMPILE=aarch64-linux-gnu- rockchip_defconfig
```

如果需要自定义配置：

```bash
make ARCH=arm64 menuconfig
```

## 编译内核

使用外部交叉编译器（如果您已经安装）：

```bash
export CROSS_COMPILE=aarch64-linux-gnu-
export ARCH=arm64
make -j$(nproc) Image modules dtbs
```

## 打包成 DEB

创建必要的目录结构：

```bash
mkdir -p package/DEBIAN package/boot package/lib/modules
```

创建 `package/DEBIAN/control` 文件，其内容如下：

```plaintext
Package: linux-image-k1pro
Version: 1.0
Section: kernel
Priority: optional
Architecture: arm64
Maintainer: Your Name <your@email.com>
Description: Linux kernel for K1Pro
```

将编译好的内核文件处理到对应的文件夹：

```bash
cp arch/arm64/boot/Image package/boot/
mkdir -p package/boot/dtbs
cp arch/arm64/boot/dts/rockchip/*.dtb package/boot/dtbs/
make modules_install INSTALL_MOD_PATH=package
```

生成 Debian 包：

```bash
dpkg-deb --build package linux-image-k1pro_1.0_arm64.deb
```

## 安装内核包

在 K1Pro 装置系统上安装：

```bash
sudo dpkg -i linux-image-k1pro_1.0_arm64.deb
```

## 重启测试

安装完成后，重启设备：

```bash
sudo reboot
```

并使用下面命令确认新内核是否被加载：

```bash
uname -a
```

