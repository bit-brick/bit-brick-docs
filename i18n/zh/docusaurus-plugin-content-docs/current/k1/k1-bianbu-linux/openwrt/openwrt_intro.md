
# 简介

基于原生OpenWrt 23.05(*bl-v2.0.y分支基于master*)集成Spacemit Stone 系列芯片的 BSP，包含监管程序接口（OpenSBI）、引导加载程序（U-Boot/UEFI）、Linux 内核、根文件系统（包含各种中间件和库）以及示例等。其目标是为客户提供软路由和NAS方案支持，并且可以开发驱动或应用。

## 主要组件

以下是OpenWrt的组件：

- OpenSBI
- U-Boot
- Linux Kernel
- mpp: Media Process Platform
- FFmpeg (with Hardware Accelerated)

更多组件正在适配中

- onnxruntime (with Hardware Accelerated)
- ai-support: AI demo
- k1x-vpu-firmware: Video Process Unit firmware
- k1x-vpu-test: Video Process Unit test program
- k1x-jpu: JPEG Process Unit API
- GStreamer (with Hardware Accelerated)

## 快速指南

- [下载和编译](openwrt_quickstart.md)
- [设备管理](openwrt_device_management.md)
- [方案管理](openwrt_solution_management.md)

## 预编译

[进迭OpenWrt源站点](https://archive.spacemit.com/openwrt/releases/)


