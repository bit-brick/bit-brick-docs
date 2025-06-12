# Uboot 

本文详细介绍了如何在 Rockchip 平台上编译 U-Boot，包括获取源码、配置、工具链设置，以及使用 `make.sh` 进行编译、打包

## 准备工作

### 源码准备

- 从官方获取：

  ```bash
  git clone https://github.com/bit-brick/k1pro-u-boot.git
  ```



### `rkbin` 准备（U-Boot 依赖）

- 从官方获取：

  ```bash
  git clone https://github.com/rockchip-linux/rkbin.git
  ```



### 工具链准备（以 GCC 10.3 64 位为例）

- 从 ARM 官网获取：

  ```bash
  wget https://developer.arm.com/-/media/Files/downloads/gnu/10.3-2021.07/binrel/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu.tar.xz
  ```

- GCC 10.3 以下的版本可从 Linaro 获取。

- 从开发板厂商提供的 SDK 中拷贝：

  ```bash
  cp -rfp prebuilts/gcc/linux-x86/aarch64/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/ .
  ```

### 目录准备

```bash
mv rkbin u-boot/
mkdir -p u-boot/toolchain
mv gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/ u-boot/toolchain/
```

## `make.sh` 脚本

`make.sh` 既是一个编译脚本，也是一个打包、调试工具。可用于反汇编、打包固件。

- 帮助命令：

  ```bash
  ./make.sh help
  ```

- 编译：

  ```bash
  ./make.sh board  # 根据 board_defconfig 配置构建固件
  ./make.sh env    # 生成 fw_printenv 工具
  ```

- 输出：

  在当前目录输出构建产物，包括 U-Boot/Trust/Loader 镜像。

- 打包固件：

  ```bash
  ./make.sh uboot  # 打包 U-Boot
  ./make.sh trust  # 打包 Trust
  ./make.sh loader # 打包 Loader
  ```

- 反汇编：

  ```bash
  ./make.sh elf  # 反汇编 ELF 文件，默认使用 -D 参数
  ./make.sh map  # 打开 u-boot.map
  ./make.sh sym  # 打开 u-boot.sym
  ```

## 修改 `make.sh`

- 修改 `RKBIN_TOOLS` 为：

  ```bash
  RKBIN_TOOLS=rkbin/tools
  ```

- 如果存在 `TOOLCHAIN_ARM64`，则修改为：

  ```bash
  TOOLCHAIN_ARM64=toolchain/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/bin
  ```

- 如果存在 `CROSS_COMPILE_ARM64`，则修改为：

  ```bash
  CROSS_COMPILE_ARM64=toolchain/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/bin
  ```

## `make.sh` 与 `rkbin` 的联系

- `rkbin`：用于存放 RK 不开源的 bin、脚本、打包工具。U-Boot 编译时会从该仓库索引相关文件，打包生成 Loader、Trust、U-Boot 固件。

- `rkbin/RKBOOT/xxx.ini` 文件以及 `rkbin/RKTRUST/xxx.ini` 文件指定了需要打包的固件。

- `make.sh` 中通过语句 `${RKBIN}/RKBOOT/${RKCHIP_LOADER}MINIALL.ini` 指定要使用的 ini 文件，`RKCHIP_LOADER` 一般为平台名。以 RK3576 为例，使用的 ini 文件即为 `rkbin/RKBOOT/RK3576MINIALL.ini`。

## 固件编译

- 以 RK3576 为例，执行命令：

  ```bash
  ./make.sh rk3576
  ```

  实际使用的配置文件为 `./configs/rv3575_defconfig`。

