# Linux Kernel

## Environment Preparation

Ensure your system has the following dependencies installed:

```bash
sudo apt update
sudo apt install -y build-essential libncurses-dev bison flex libssl-dev libelf-dev bc dwarves debhelper
```

## Source Code Download

First, clone the source code from your K1Pro kernel repository:

```bash
git clone --depth=1 https://github.com/bit-brick/k1pro-linux-kernel-6.1.git -b main k1pro-kernel
cd k1pro-kernel
```

## Kernel Configuration

Generate .config file with default configuration:

```bash
make ARCH=arm64 CROSS_COMPILE=aarch64-linux-gnu- rockchip_defconfig
```

For custom configuration:

```bash
make ARCH=arm64 menuconfig
```

## Kernel Compilation

Using external cross-compiler (if installed):

```bash
export CROSS_COMPILE=aarch64-linux-gnu-
export ARCH=arm64
make -j$(nproc) Image modules dtbs
```

## Package as DEB

Create necessary directory structure:

```bash
mkdir -p package/DEBIAN package/boot package/lib/modules
```

Create `package/DEBIAN/control` file with the following content:

```plaintext
Package: linux-image-k1pro
Version: 1.0
Section: kernel
Priority: optional
Architecture: arm64
Maintainer: Your Name <your@email.com>
Description: Linux kernel for K1Pro
```

Process compiled kernel files to corresponding folders:

```bash
cp arch/arm64/boot/Image package/boot/
mkdir -p package/boot/dtbs
cp arch/arm64/boot/dts/rockchip/*.dtb package/boot/dtbs/
make modules_install INSTALL_MOD_PATH=package
```

Generate Debian package:

```bash
dpkg-deb --build package linux-image-k1pro_1.0_arm64.deb
```

## Install Kernel Package

Install on K1Pro system:

```bash
sudo dpkg -i linux-image-k1pro_1.0_arm64.deb
```

## Reboot and Test

After installation, restart the device:

```bash
sudo reboot
```

And verify the new kernel is loaded using:

```bash
uname -a
```

