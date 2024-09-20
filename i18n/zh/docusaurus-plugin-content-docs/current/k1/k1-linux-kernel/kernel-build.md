---
sidebar_position: 1
---

# 内核编译

下面以`linux-6.6`为例，介绍如何为Bianbu编译自己的内核，支持交叉编译（快）和本地编译（方便）。

## 下载源码

```shell
git clone https://gitee.com/bianbu-linux/linux-6.6 ~/linux-6.6
```

## 交叉编译

### 开发环境

参考Bianbu Linux的[开发环境](https://bianbu-linux.spacemit.com/download_and_build#%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)准备好交叉编译环境。

### 编译器

地址：[http://archive.spacemit.com/toolchain/](http://archive.spacemit.com/toolchain/)

1. 下载交叉编译器，例如`spacemit-toolchain-linux-glibc-x86_64-v1.0.0.tar.xz`：

2. 解压：

   ```shell
   sudo tar -Jxf /path/to/spacemit-toolchain-linux-glibc-x86_64-v1.0.0.tar.xz -C /opt
   ```

3. 设置交叉编译器环境变量：

   ```shell
   export PATH=/opt/spacemit-toolchain-linux-glibc-x86_64-v1.0.0/bin:$PATH
   ```

### 编译软件包

进入内核源码目录：

```shell
cd ~/linux-6.6
```

设置内核编译参数：

```shell
export CROSS_COMPILE=riscv64-unknown-linux-gnu-
export ARCH=riscv
export LOCALVERSION=""
```

生成默认配置：

```shell
make k1_defconfig
```

修改配置，不改可跳过：

```shell
make menuconfig
```

如需保存修改后的配置：

```shell
make savedefconfig
mv defconfig arch/riscv/configs/k1_defconfig
```

编译debian软件包：

```shell
make -j$(nproc) bindeb-pkg
```

当看到以下信息，说明编译成功。

```
dpkg-genchanges: info: binary-only upload (no source code included)
 dpkg-source --after-build .
dpkg-buildpackage: info: binary-only upload (no source included)
```

软件包位于上一层目录，常用包：

- linux-image-6.6.36_6.6.36-*.deb

  内核Image软件包。

- linux-tools-6.6.36_6.6.36-*.deb

  `perf`等工具软件包。

拷贝到设备，安装然后重启即可：

```shell
sudo dpkg -i linux-image-6.6.36_6.6.36-*.deb
sudo reboot
```

### 编译模块

编译内核源码树外的模块，以rtl8852bs为例，一般命令如下：

```shell
cd /path/to/rtl8852bs
make -j$(nproc) -C ~/linux-6.6 M=/path/to/rtl8852bs modules
```

- `/path/to/rtl8852bs`要替换成您的路径

清理命令：

```shell
make -j$(nproc) -C ~/linux-6.6 M=/path/to/rtl8852bs clean
```

### 编译设备树

单独编译设备树：

```shell
make -j$(nproc) dtbs
```

## 本地编译

在Bianbu上可直接编译内核，以下是指南。

### 开发环境

安装依赖：

```shell
sudo apt-get install flex bison libncurses-dev debhelper libssl-dev u-boot-tools libpfm4-dev libtraceevent-dev asciidoc bc rsync libelf-dev
```

### 编译软件包

进入内核源码目录：

```shell
cd ~/linux-6.6
```

设置内核编译参数：

```shell
export ARCH=riscv
export LOCALVERSION=""
```

生成默认配置：

```shell
make k1_defconfig
```

修改配置，不改可跳过：

```shell
make menuconfig
```

如需保存修改后的配置：

```shell
make savedefconfig
mv defconfig arch/riscv/configs/k1_defconfig
```

编译debian软件包：

```shell
make -j$(nproc) bindeb-pkg
```

当看到以下信息，说明编译成功。

```
dpkg-genchanges: info: binary-only upload (no source code included)
 dpkg-source --after-build .
dpkg-buildpackage: info: binary-only upload (no source included)
```

软件包位于上一层目录，常用包：

- linux-image-6.6.36_6.6.36-*.deb

  内核Image软件包。

- linux-tools-6.6.36_6.6.36-*.deb

  `perf`等工具软件包。

安装然后重启即可：

```shell
sudo dpkg -i linux-image-6.6.36_6.6.36-*.deb
sudo reboot
```

### 编译模块

本地编译内核源码树外的模块，可以不依赖内核源码。

首先安装`linux-headers`：

```shell
sudo apt-get install linux-headers-`uname -r`
```

然后编译模块，例如rtl8852bs：

```shell
cd /path/to/rtl8852bs
make -j$(nproc) -C /lib/modules/`uname -r`/build M=/path/to/rtl8852bs modules
```

- `/path/to/rtl8852bs`要替换成您的路径

清理命令：

```shell
make -j$(nproc) -C /lib/modules/`uname -r`/build M=/path/to/rtl8852bs clean
```


