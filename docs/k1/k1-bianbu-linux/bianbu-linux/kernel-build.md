---
sidebar_position: 1
---
# Kernel Compilation
Taking `linux-6.6` as an example, this document introduces how to compile your own kernel for Bianbu, supporting cross-compilation (fast) and local compilation (convenient).
## Downloading the Source Code
```shell
git clone https://gitee.com/bianbu-linux/linux-6.6 ~/linux-6.6
```
## Cross-compilation
### Development Environment
Prepare the cross-compilation environment by referring to the [Development Environment](https://bianbu-linux.spacemit.com/download_and_build#%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83) of Bianbu Linux.
### Compiler
Address: [http://archive.spacemit.com/toolchain/] (http://archive.spacemit.com/toolchain/)
1. Download the cross-compiler, such as `spacemit-toolchain-linux-glibc-x86_64-v1.0.0.tar.xz`:
2. Extract:
   ```shell
   sudo tar -Jxf /path/to/spacemit-toolchain-linux-glibc-x86_64-v1.0.0.tar.xz -C /opt
   ```
3. Set the environment variables of the cross-compiler:
   ```shell
   export PATH=/opt/spacemit-toolchain-linux-glibc-x86_64-v1.0.0/bin:$PATH
   ```
### Compiling the Software Package
Enter the kernel source code directory:
```shell
cd ~/linux-6.6
```
Set the kernel compilation parameters:
```shell
export CROSS_COMPILE=riscv64-unknown-linux-gnu-
export ARCH=riscv
export LOCALVERSION=""
```
Generate the default configuration:
```shell
make k1_defconfig
```
Modify the configuration, you can skip this step if you don't need to change:
```shell
make menuconfig
```
If you need to save the modified configuration:
```shell
make savedefconfig
mv defconfig arch/riscv/configs/k1_defconfig
```
Compile the debian software package:
```shell
make -j$(nproc) bindeb-pkg
```
When you see the following information, it means the compilation is successful.
```
dpkg-genchanges: info: binary-only upload (no source code included)
 dpkg-source --after-build.
dpkg-buildpackage: info: binary-only upload (no source included)
```
The software package is located in the upper layer directory, and the commonly used packages are:
- linux-image-6.6.36_6.6.36-*.deb
  The kernel Image software package.
- linux-tools-6.6.36_6.6.36-*.deb
  The `perf` and other tool software packages.
Copy it to the device, install it, and then restart:
```shell
sudo dpkg -i linux-image-6.6.36_6.6.36-*.deb
sudo reboot
```
### Compiling Modules
To compile modules outside the kernel source tree, taking rtl8852bs as an example, the general command is as follows:
```shell
cd /path/to/rtl8852bs
make -j$(nproc) -C ~/linux-6.6 M=/path/to/rtl8852bs modules
```
- `/path/to/rtl8852bs`You need to replace it with your own path.

Cleaning command:
```shell
make -j$(nproc) -C ~/linux-6.6 M=/path/to/rtl8852bs clean
```
### Compiling the Device Tree
To compile the device tree separately:
```shell
make -j$(nproc) dtbs
```
## Local Compilation
You can directly compile the kernel on Bianbu. Here is the guide.
### Development Environment
Install the dependencies:
```shell
sudo apt-get install flex bison libncurses-dev debhelper libssl-dev u-boot-tools libpfm4-dev libtraceevent-dev asciidoc bc rsync libelf-dev
```
### Compiling the Software Package
Enter the kernel source code directory:
```shell
cd ~/linux-6.6
```
Set the kernel compilation parameters:
```shell
export ARCH=riscv
export LOCALVERSION=""
```
Generate the default configuration:
```shell
make k1_defconfig
```
Modify the configuration, you can skip this step if you don't need to change:
```shell
make menuconfig
```
If you need to save the modified configuration:
```shell
make savedefconfig
mv defconfig arch/riscv/configs/k1_defconfig
```
Compile the debian software package:
```shell
make -j$(nproc) bindeb-pkg
```
When you see the following information, it means the compilation is successful.
```
dpkg-genchanges: info: binary-only upload (no source code included)
 dpkg-source --after-build.
dpkg-buildpackage: info: binary-only upload (no source included)
```
The software package is located in the upper layer directory, and the commonly used packages are:
- linux-image-6.6.36_6.6.36-*.deb
  The kernel Image software package.
- linux-tools-6.6.36_6.6.36-*.deb
  The `perf` and other tool software packages.
Install and then restart:
```shell
sudo dpkg -i linux-image-6.6.36_6.6.36-*.deb
sudo reboot
```
### Compiling Modules
To compile modules outside the kernel source tree locally, you can do it without relying on the kernel source code.
First, install `linux-headers`:
```shell
sudo apt-get install linux-headers-`uname -r`
```
Then compile the module, such as rtl8852bs:
```shell
cd /path/to/rtl8852bs
make -j$(nproc) -C /lib/modules/`uname -r`/build M=/path/to/rtl8852bs modules
```
- `/path/to/rtl8852bs`You need to replace it with your own path.

Cleaning command:
```shell
make -j$(nproc) -C /lib/modules/`uname -r`/build M=/path/to/rtl8852bs clean
```