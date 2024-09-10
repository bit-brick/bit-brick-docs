# Electron 使用指南

## 准备工作
在使用 Electron 前，需要为其安装 Node.js 和 NPM。
```
sudo apt-get update
sudo apt-get install npm
```
检查是否安装成功。
```
npm -v
```

## 快速开始
1. 下载 `electron-quick-start`，
```
git clone https://github.com/electron/electron-quick-start.git ~/electron-quick-start
```
2. 安装 SpacemiT 的 Electron 包，
```
cd ~/electron-quick-start
ELECTRON_MIRROR=http://archive.spacemit.com/electron/ electron_use_remote_checksums=1 npm install electron@29.3.1
```
3. 启动应用，
```
npm start
```
当看到下面界面，表示成功。
![alt text](/img/k1/software/electron.png)