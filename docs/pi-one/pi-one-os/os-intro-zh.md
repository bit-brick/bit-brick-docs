# 简介

Bianbu 是一个针对 RISC - V 架构的处理器做了深度优化的操作系统，基于 Ubuntu 社区源码构建，有 Bianbu Desktop 和 Bianbu NAS 等版本，适用于不同的产品领域。

## 为什么做 Bianbu

- 为开发者提供一个针对 RISC - V 架构的处理器做了深度优化的操作系统
- 为客户提供系统解决方案，加速产品量产落地
- 驱动 RISC - V 硬件和软件生态系统发展

## 愿景

让我们的技术和服务遍布各行各业，遍布世界，服务每一个有需要的人。

## Bianbu Desktop

Bianbu Desktop 是一个桌面操作系统，简洁、快速、安全，支持 RISC - V 单板电脑、笔记本和台式机等。

![os](/img/pi-one/os/bianbuos.png)

### 系统架构

![arch](/img/pi-one/os/os-arch.png)

#### 软件组件

以下是 Bianbu Desktop 的组件：

- **应用**
    - GNOME 桌面及其常用应用
    - 远程桌面
    - Chromium 浏览器
    - LibreOffice 办公套件
    - Visual Studio Code
    - Docker
- **框架**
    - 应用框架
        - Electron
        - GTK
        - QT
    - 多媒体框架
        - FFmpeg (with Hardware Accelerated)
        - GStreamer (with Hardware Accelerated)
        - PipeWire
    - 推理框架
        - onnxruntime (with Hardware Accelerated)
- **运行时**
    - Python
    - Java
    - Node.js
    - Rust
- **库**
    - OpenCV (with RVV Accelerated)
    - OpenSSL (with Hardware Accelerated)
    - MPP，进迭时空多媒体处理平台，提供 C API 和 sample
    - Mesa 3D
    - OpenGLES/Vulkan/OpenCL
- **Linux 内核**
    - Linux 内核负责管理处理器和其他硬件资源，提供用户和应用程序与硬件之间的接口。主要功能包括中断和时钟管理、进程管理、内存管理、文件系统管理、设备驱动管理和网络协议栈等。
    - 版本：6.1。
    - 源码：https://gitee.com/bianbu-linux/linux-6.1
- **U - Boot**
    - U - Boot 是一个引导加载程序，负责初始化特定硬件，从介质（如 SD 卡、eMMC、SPI Flash、SSD、网络）加载 Linux 内核镜像、设备树和初始 RAM 文件系统。
    - 版本：u - boot - 2022.10。
    - 源码：https://gitee.com/bianbu-linux/uboot-2022.10
- **OpenSBI**
    - OpenSBI 是 RISC - V 架构处理器的监管程序接口的实现，运行在 M 模式下的固件，提供引导加载程序、hypervisor、操作系统访问硬件的接口。
    - 版本：1.3。
    - 源码：https://gitee.com/bianbu-linux/opensbi

### 支持的设备

- BPI - F3
- MUSE Pi
- MUSE Box
- MUSE Book

### 固件

- 最新版本：v1.0.9。
- Bianbu Desktop 固件：https://archive.spacemit.com/image/k1/version/bianbu/
    - *.img.zip 是 sdcard 固件，解压后可以用 dd 命令或者 balenaEtcher 写入 sdcard。
    - *.zip 适用于 Titan Flasher，刷机参考刷机工具使用手册，或者解压后用 fastboot 刷机。
- 固件 root 用户的密码：bianbu 。