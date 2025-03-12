# Cross-Compilation Toolchain


# 1. Overview

## 1.1 Purpose of Writing

The main purpose of this document is to introduce the methods for using the SpacemiT toolchain, making it easier for developers to utilize.

## 1.2 Scope of Application

Suitable for SpacemiT's K1 Series SoC.

## 1.3 Relevant Personnel

- Systems Engineer
- Application Engineer

## 1.4 Document Structure

The document introduces the installation and usage of the toolchain.

# 2. Download and Install

## 2.1 Download

Visit [https://archive.spacemit.com/toolchain/](https://archive.spacemit.com/toolchain/), choose the corresponding version to download.

`spacemit-toolchain-linux-glibc-x86_64-xxx`：Toolchain for Linux environment, includes the glibc C library.

`spacemit-toolchain-elf-newlib-x86_64-xxx`：Toolchain for bare-metal environment, includes the newlib C library.

The version with a large file size (the compressed package is over 400M) contains the llvm and gcc compilers, which is suitable for scenarios where the llvm compiler is needed.

The version with a smaller file size (the compressed package is over 100M) only contains the gcc compiler, and is suitable for scenarios where only the gcc compiler is needed.

## 2.2 Install

After extracting the toolchain, simply add the bin directory to the PATH.

```c
export PATH=<Toolchain Extraction Path>/bin:$PATH 
```

# 3. Usage

## 3.1 gcc Toolchain

### 3.1.1 Compilation Command Reference

For the GCC toolchain, taking the Linux environment toolchain as an example, the compilation command using the `riscv64-unknown-linux-gnu-gcc` command is as follows:

```c
$ riscv64-unknown-linux-gnu-gcc -O2 -mcpu=spacemit-x60 -march=rv64gc_zba_zbb_zbc_zbs spacemit.c -o spacemit.out
```

For a bare-metal toolchain, use the `riscv64-unknown-elf-gcc` command.

### 3.1.2 Compilation Parameter Explanation

`-mcpu=spacemit-x60`, use x60 scheduling and Fusion information.

`-march=rv64gc_zba_zbb_zbc_zbs`, enable bitmanip extension instructions. Note that the march parameter can be combined based on the actual extensions that need to be enabled.

For more information, please refer to the official GCC documentation.

## 3.2 llvm Toolchain

### 3.2.1 Compilation command reference

For the LLVM toolchain, taking the Linux environment toolchain as an example, use the `clang` command. If there is a conflict with the native x86 clang, you can also use `riscv64-unknown-linux-gnu-clang`. The compilation command is as follows:

```c
$ clang -O2 -mcpu=spacemit-x60 -march=rv64gc_zba_zbb_zbc_zbs_zicbop -mllvm -cache-line-size=64 -mllvm -prefetch-distance=128 -fuse-ld=lld spacemit.c -o spacemit.out
```

For bare-metal toolchains, use the `clang` or `riscv64-unknown-elf-clang` command.

### 3.2.2 Compilation Parameters Description

`-mcpu=spacemit-x60` , use x60 scheduling and Fusion information.

`-fuse-ld=lld`，use the `lld` linker.

`-march=rv64gc_zba_zbb_zbc_zbs_zicbop -mllvm -cache-line-size=64 -mllvm -prefetch-distance=128`，enable bitmanip extension instructions and prefetch extension instructions. Note that the march parameter can be combined based on the actual extensions that need to be enabled.

For more information, please refer to the official LLVM documentation.
