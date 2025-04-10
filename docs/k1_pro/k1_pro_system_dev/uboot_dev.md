# Uboot

This document details how to compile U-Boot on the Rockchip platform, including obtaining source code, configuration, toolchain setup, and using `make.sh` for compilation and packaging.

## Preparation

### Source Code Preparation

- Get from official repository:

  ```bash
  git clone https://github.com/bit-brick/k1pro-u-boot.git
  ```

### `rkbin` Preparation (U-Boot dependency)

- Get from official repository:

  ```bash
  git clone https://github.com/rockchip-linux/rkbin.git
  ```

### Toolchain Preparation (Using GCC 10.3 64-bit as example)

- Download from ARM official website:

  ```bash
  wget https://developer.arm.com/-/media/Files/downloads/gnu/10.3-2021.07/binrel/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu.tar.xz
  ```

- GCC versions below 10.3 can be obtained from Linaro.

- Copy from the SDK provided by the board manufacturer:

  ```bash
  cp -rfp prebuilts/gcc/linux-x86/aarch64/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/ .
  ```

### Directory Preparation

```bash
mv rkbin u-boot/
mkdir -p u-boot/toolchain
mv gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/ u-boot/toolchain/
```

## `make.sh` Script

`make.sh` is both a compilation script and a packaging/debugging tool. It can be used for disassembly and firmware packaging.

- Help command:

  ```bash
  ./make.sh help
  ```

- Compilation:

  ```bash
  ./make.sh board  # Build firmware based on board_defconfig
  ./make.sh env    # Generate fw_printenv tool
  ```

- Output:

  Build artifacts are output in the current directory, including U-Boot/Trust/Loader images.

- Package firmware:

  ```bash
  ./make.sh uboot  # Package U-Boot
  ./make.sh trust  # Package Trust
  ./make.sh loader # Package Loader
  ```

- Disassembly:

  ```bash
  ./make.sh elf  # Disassemble ELF file, using -D parameter by default
  ./make.sh map  # Open u-boot.map
  ./make.sh sym  # Open u-boot.sym
  ```

## Modifying `make.sh`

- Modify `RKBIN_TOOLS` to:

  ```bash
  RKBIN_TOOLS=rkbin/tools
  ```

- If `TOOLCHAIN_ARM64` exists, modify to:

  ```bash
  TOOLCHAIN_ARM64=toolchain/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/bin
  ```

- If `CROSS_COMPILE_ARM64` exists, modify to:

  ```bash
  CROSS_COMPILE_ARM64=toolchain/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/bin
  ```

## Relationship between `make.sh` and `rkbin`

- `rkbin`: Used to store RK's non-open-source bins, scripts, and packaging tools. U-Boot will index related files from this repository during compilation to generate Loader, Trust, and U-Boot firmware.

- `rkbin/RKBOOT/xxx.ini` files and `rkbin/RKTRUST/xxx.ini` files specify the firmware to be packaged.

- In `make.sh`, the statement `${RKBIN}/RKBOOT/${RKCHIP_LOADER}MINIALL.ini` specifies which ini file to use, where `RKCHIP_LOADER` is generally the platform name. For example, with RK3576, the ini file used would be `rkbin/RKBOOT/RK3576MINIALL.ini`.

## Firmware Compilation

- Taking RK3576 as an example, execute:

  ```bash
  ./make.sh rk3576
  ```

  The actual configuration file used is `./configs/rv3575_defconfig`.

