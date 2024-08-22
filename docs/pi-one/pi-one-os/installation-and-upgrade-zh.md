# 安装和升级

## 安装

Bianbu 固件可以通过 Titan Flasher 进行刷机，也可以直接通过 fastboot 命令进行刷机，或者写入 sdcard，系统从 sdcard 启动。

### 使用 Titan Flasher 刷机

以 `.zip`结尾的 zip 固件，适用于 Titan Flasher。
步骤参考[《刷机工具使用手册》](https://developer.spacemit.com/#/documentation?token=O6wlwlXcoiBZUikVNh2cczhin5d)。

### 使用 fastboot 刷机

以 `.zip`结尾的 zip 固件，解压后可以用 fastboot 刷机。

**前提**：
- 设备已插上 USB 数据线，连接到 PC；
- 电脑安装好 fastboot 命令。

**刷机步骤**：
1. 解压固件；
2. 下载刷机脚本 `flash-all.zip`，并解压到固件目录；
3. 进入 fastboot 模式
    - `reboot fastboot`
4. 等待设备重启并进入 fastboot 模式：
5. 运行 `flash-all` 脚本，等待刷机完成；
    - Linux PC 运行 `flash-all.sh`，注意先赋予可执行权限；
    - Windows PC 运行 `flash-all.bat`；
6. 刷机完成，重新上电即可进入系统。

### 写入 sdcard，sdcard 启动

以 `img.zip`结尾的固件为 sdcard 固件，解压后可以用 dd 命令或者 balenaEtcher 写入 sdcard。注意此固件不适用于 eMMC。

**步骤**：
1. 将固件写入 sdcard；
2. 将 sdcard 插入设备；
3. 设备上电开机即可启动。

## 升级

Bianbu Desktop/NAS 支持在线升级。

### 通过命令行

```
sudo do-release-upgrade
```
根据提示逐步完成，然后重启。

### 通过软件更新器

仅限 Bianbu Desktop。

1. 设备联网；
2. 打开“软件更新器”；
3. 等待检查更新完成；
4. 发现新版本，点击升级；
5. 根据提示逐步完成；
6. 重启。