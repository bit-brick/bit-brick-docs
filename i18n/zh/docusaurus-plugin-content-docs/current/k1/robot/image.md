---
sidebar_position: 2
---

# 镜像

目前 Bianbu ROS 提供两种格式的镜像：

- sdcard raw 镜像

  以 `*.img.zip` 结尾，可以用 [balenaEtcher](https://etcher.balena.io/) 写入 sdcard，或者解压后用 `dd` 命令写入 sdcard。

- 自定义镜像

  以 `.zip` 结尾，可以用 Titan Flasher 刷机，或者解压后用 `fastboot` 刷机。

固件 root 用户的密码：`bianbu`
固件默认 bianbu 用户密码：`bianbu`

## 下载

地址：[Bianbu ROS Image](https://archive.spacemit.com/ros2/bianbu-ros-images/v1.0/bianbu-24.04-ROS-lite-k1-dailybuild-20250711150556.zip)

## 刷机

Titan Flasher 刷机参考 [刷机工具使用手册](https://developer.spacemit.com/documentation?token=O6wlwlXcoiBZUikVNh2cczhin5d)。
