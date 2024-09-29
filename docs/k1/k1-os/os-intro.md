# Bianbu Operating System
## 1.Introduction to Bainbu OS
Bainbu OS is an operating system deeply optimized by Jinder Time Space for RISC-V architecture processors. It is built based on the source code of the Ubuntu community. Currently, it is divided into the following two versions:
- Bainbu Desktop
- Bainbu NAS
The Desktop version is similar to common Linux distributions, such as Ubuntu or Debian.

![Bainbu Desktop System Interface](/img/k1/os/bianbuos-en.png)

<div style={{textAlign: 'center'}}>Bainbu Desktop System Interface</div>
Bainbu NAS is a firmware specially made for network storage.

![Bainbu NAS System Interface](/img/k1/os/bianbu-nas-en.png)

<div style={{textAlign: 'center'}}>Bainbu NAS System Interface</div>
Bianbu OS officially supports the BIT-BRICK K1 single-board computer and the SSOM-K1 core module. Users can directly download the official firmware for use.

## 2. System Architecture

![Figure 3 Bianbu System Architecture Diagram](/img/k1/os/os-arch.png)

<div style={{textAlign: 'center'}}>Bianbu System Architecture Diagram</div>
As can be seen from the above figure, the components included in Bianbu OS are:

- Application Layer
  - GNOME desktop and its commonly used applications
  - Remote Desktop
  - Chromium browser
  - LibreOffice office suite
  - Visual Studio Code
  - Docker
- Framework Layer
  - Application Framework
    - Electron
    - GTK
    - QT
  - Multimedia Framework
    - FFmpeg (with Hardware Accelerated)
    - GStreamer (with Hardware Accelerated)
    - PipeWire
  - Inference Framework
    - onnxruntime (with Hardware Accelerated)
- Runtime
  - Python
  - Java
  - Node.js
  - Rust
- Library
  - OpenCV (with RVV Accelerated)
  - OpenSSL (with Hardware Accelerated)
  - MPP, Jinder Time Space's multimedia processing platform, providing C API and samples
  - Mesa 3D
  - OpenGLES/Vulkan/OpenCL
- Kernel Layer
  - Linux kernel
  - Uboot
  - OpenSBI
  
### Among them
#### Linux kernel
The Linux kernel is responsible for managing the processor and other hardware resources, providing the interface between users and applications and the hardware. Its main functions include interrupt and clock management, process management, memory management, file system management, device driver management, and network protocol stack.
- Version: 6.1.
- Source Code: [Linux kernel 6.1](https://gitee.com/bianbu-linux/linux-6.1)
#### U - Boot
U - Boot is a bootloader that is responsible for initializing specific hardware, loading the Linux kernel image, device tree, and initial RAM file system from a medium (such as SD card, eMMC, SPI Flash, SSD, network).
- Version: u-boot-2022.10.
- Source Code: [u-boot-2022.10](https://gitee.com/bianbu-linux/uboot-2022.10)
#### OpenSBI
OpenSBI is the implementation of the supervisor program interface for RISC - V architecture processors, a firmware running in M mode, providing the interface for the bootloader, hypervisor, and operating system to access the hardware.
- Version: 1.3.
- Source Code: [OpenSBI 1.3](https://gitee.com/bianbu-linux/opensbi)
## 3. Firmware Version and Download
- Latest Version: v1.0.15.
- Download Path: [Bianbu OS Firmware](https://archive.spacemit.com/image/k1/version/bianbu/)
 
Among them:

- *.img.zip is the sdcard firmware, which can be written to the sdcard using the dd command or balenaEtcher after decompression.
- *.zip is suitable for Titan Flasher. For flashing, refer to the user manual of the flashing tool, or decompress it and use fastboot to flash.
  
The password for the firmware root user: bianbu.