# JTAG 调试工具使用手册


# 1. 概述

## 1.1 编写目的

主要介绍 SpacemiT 的调试工具使用方法，方便开发人员使用。

## 1.2 适用范围

适用于 SpacemiT 的 K1 系列 SoC。

## 1.3 相关人员

- 系统工程师
- 应用工程师

## 1.4 文档结构

该文档介绍如何下载 OpenOCD，配置 J-Link，运行 OpenOCD 并使用 GDB 进行软件调试。

# 2. 下载

OpenOCD 下载路径：[https://archive.spacemit.com/tools/openocd](https://archive.spacemit.com/tools/openocd)

GDB 包含在交叉编译工具链中，请参考《交叉编译工具链使用手册》。

# 3. 配置 JTAG 接口

K1 系列板子都内置了 JTAG 调试功能，要使其正常工作，需要设置硬件和配置 USB 驱动。以 J-Link 为例，具体步骤请参考以下说明。

## 3.1 配置硬件

- 打开 J-Llink 的外壳，将其中的跳线帽拔下，使得 J-Llink 不对外供电。
- 连接 JTAG 检查 JTAG 信号对应的引脚是否被使用，参考 [MUSE Pi 用户使用指南](https://developer.spacemit.com/documentation?token=ZugWwIVmkiGNAik55hzc4C3Ln6d)文档中 [JTAG 调试接口](https://developer.spacemit.com/documentation?token=ZugWwIVmkiGNAik55hzc4C3Ln6d#part407)信息。

## 3.2 配置 USB 驱动

### 3.2.1 Windows

1. 从 [Zadig 官网](http://zadig.akeo.ie/) 下载 Zadig 工具并运行。
2. 在 Zadig 工具中，进入 “Options” 菜单中选中 “List All Devices”。
3. 检查设备列表，选择 J-Link 设备，更新成 WinUSB 驱动。

![](https://developer.spacemit.com/resource/file/images?fileName=XZedbxwk4o687Rx0MbAcYyDEnac.png)

安装成功后，在设备管理器的通用串行总线设备中能看到 J-Llink 设备。

如果存在多个驱动(例如 segger 原生驱动)，再次插入 J-Llink 后可能会自动选择了别的驱动，则需要从计算机的可用驱动程序列表中选择回 WinUSB 驱动以更新驱动程序。

### 3.2.2 Linux

1. 设置 OpenOCD 所支持 USB 设备的访问权限，将 [udev 规则文件](https://github.com/riscv-collab/riscv-openocd/blob/riscv/contrib/60-openocd.rules) 复制到 `/etc/udev/rules.d` 目录中。执行 `udevadm control --reload` 刷新 udev 规则
2. 重新插拔 J-Link 使之前的改动生效

# 4. **运行 OpenOCD**

解压缩后，双击运行 bin 目录下的 `spacemit_k1_2x4` 脚本即可启动 OpenOCD

如需修改运行参数，可编辑对应的脚本，以 linux 版本为例：

```shell
#!/bin/bash

SCRIPT_DIR="../share/openocd/scripts"

./openocd -c "set CORES 8" -f $SCRIPT_DIR/interface/jlink.cfg -f $SCRIPT_DIR/target/spacemit-k1.cfg -c "gdb_port 1024"
```

上述命令中 `-f` 选项后跟的是 jlink 适配器和 k1 的配置文件，`-c` 选项是 openocd 的配置项目，如配置了 gdb 的调试端口号为 1024，以及通过修改 `CORES` 变量设置调试核心数。

# ** 5. 使用 GDB 调试**

使用 `riscv64-unknown-linux-gnu-gdb`，输入 `target remote <ip>:<port>` 建立 GDB 与 OpenOCD 的连接。

## 5.1 使用 GDB 命令调试

输入 `info threads` 可看到 8 个线程已进入调试模式，此处每个线程代表一个 CPU 核。随后正常使用标准 GDB 命令调试即可。

![](https://developer.spacemit.com/resource/file/images?fileName=IjesbEJfto7aSwxmsIfcaZ33nsb.png)

例如，查看 CPU 核 `k1.cpu.3` 的 RISC-V 寄存器信息，可输入 `thread 4` 切换到 CPU 核 `k1.cpu.3`，然后输入 `info all-registers`。

![](https://developer.spacemit.com/resource/file/images?fileName=WcNSbQCL8okNbKx0yVYcllmmn9w.png)

## 5.2 使用 OpenOCD 命令调试

GDB 中可以通过 monitor 命令调用 OpenOCD 命令，输入 `monitor targets` 可看到 8 个 CPU 核已进入 halted 状态。随后正常使用 OpenOCD 命令调试即可。

![](https://developer.spacemit.com/resource/file/images?fileName=E9hPbaCNcoJvDBx7PBDcNzwanhc.png)

例如，查看 CPU 核 `k1.cpu.3` 的 RISC-V 寄存器信息，可输入 `monitor targets 3` 切换到 CPU 核 `k1.cpu.3`，然后输入 `monitor reg` 。

![](https://developer.spacemit.com/resource/file/images?fileName=NQAJbkzePoL1Gix1fkWcXO0Enaf.png)
