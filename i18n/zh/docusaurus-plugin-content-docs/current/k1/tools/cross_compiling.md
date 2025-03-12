# 交叉编译工具链使用手册

# 1. 概述

## 1.1 编写目的

主要介绍 SpacemiT 的工具链使用方法，方便开发人员使用。

## 1.2 适用范围

适用于 SpacemiT 的 K1 系列 SoC。

## 1.3 相关人员

- 系统工程师
- 应用工程师

## 1.4 文档结构

该文档介绍工具链下载安装及使用。

# 2. 下载安装

## 2.1 下载

访问 [https://archive.spacemit.com/toolchain/](https://archive.spacemit.com/toolchain/)，选择对应的版本下载。

`spacemit-toolchain-linux-glibc-x86_64-xxx`：linux 环境工具链，包含的 C 库是 glibc。

`spacemit-toolchain-elf-newlib-x86_64-xxx`：裸环境工具链，包含的 C 库是 newlibc。

文件体积较大的版本（压缩包 400M+）包含了 llvm 和 gcc 编译器，适用于需要使用 llvm 编译器的场景。

文件体积较小的版本（压缩包 100M+）只包含 gcc 编译器，适用于仅需使用 gcc 编译器的场景。

## 2.2 安装

将工具链解压后，bin 目录加入 PATH 即可。

```c
export PATH=<工具链解压路径>/bin:$PATH 
```

# 3. 使用

## 3.1 gcc 工具链

### 3.1.1 编译命令参考

对于 gcc 工具链，以 linux 环境工具链为例，使用 `riscv64-unknown-linux-gnu-gcc` 命令，编译命令如：

```c
$ riscv64-unknown-linux-gnu-gcc -O2 -mcpu=spacemit-x60 -march=rv64gc_zba_zbb_zbc_zbs spacemit.c -o spacemit.out
```

对于裸环境工具链，则使用 `riscv64-unknown-elf-gcc` 命令。

### 3.1.2 编译参数说明

`-mcpu=spacemit-x60` ，使用 x60 调度和 Fusion 信息。

`-march=rv64gc_zba_zbb_zbc_zbs `，启用 bitmanip 扩展指令。注意 march 参数可按实际需要启用的扩展进行组合。

更多信息可参考 GCC 官方文档。

## 3.2 llvm 工具链

### 3.2.1 编译命令参考

对于 llvm 工具链，以 linux 环境工具链为例，使用 `clang` 命令。如果与本机的 x86 clang 冲突，也可以使用 `riscv64-unknown-linux-gnu-clang`。编译命令如：

```c
$ clang -O2 -mcpu=spacemit-x60 -march=rv64gc_zba_zbb_zbc_zbs_zicbop -mllvm -cache-line-size=64 -mllvm -prefetch-distance=128 -fuse-ld=lld spacemit.c -o spacemit.out
```

对于裸环境工具链，则使用 `clang` 或 `riscv64-unknown-elf-clang` 命令。

### 3.2.2 编译参数说明

`-mcpu=spacemit-x60` ，使用 x60 调度和 Fusion 信息。

`-fuse-ld=lld`，使用 lld 链接器。

`-march=rv64gc_zba_zbb_zbc_zbs_zicbop -mllvm -cache-line-size=64 -mllvm -prefetch-distance=128`，启用 bitmanip 扩展指令和 prefetch 扩展指令。注意 march 参数可按实际需要启用的扩展进行组合。

更多信息可参考 LLVM 官方文档。
