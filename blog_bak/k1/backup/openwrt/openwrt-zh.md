# 在K1上刷入Openwrt实现软路由
## Openwrt简介
![alt text](image.png)
OpenWrt/LEDE是一个为嵌入式设备（通常是无线路由器）开发的高扩展度的GNU/Linux发行版。 与许多其他路由器的发行版不同，OpenWrt是一个完全为嵌入式设备构建的功能全面、 易于修改的由现代Linux内核驱动的操作系统。 在实践中，这意味着您可以得到您需要的所有功能，却仍能避免臃肿。

OpenWrt不是一个单一且不可更改的固件，而是提供了具有软件包管理功能的完全可写的文件系统, 让您通过使用适配任何应用的软件包来定制设备。 对于开发人员来说，OpenWrt是一个无需围绕它构建完整固件就能开发应用程序的框架; 对于普通用户来说，这意味着拥有了完全定制的能力，能以意想不到的方式使用该设备。

OpenWrt官方网站：https://openwrt.org

OpenWrt官方Git仓库：https://github.com/openwrt/openwrt

## 安装OpenWrt
1、下载OpenWrt的镜像

[下载地址](https://archive.spacemit.com/openwrt/releases/bl-v2.0.y/targets/spacemit/DEVICE_debX/openwrt-spacemit-k1-sbc-debX-ext4-pack-sdcard.img)

2、烧录镜像

用dd命令或者balenaEtcher刷入到SD卡中。

3、使用OpenWrt
系统开机后默认开启WiFi AP模式，其中:

有线网卡eth1为lan口，eth2为wan

- 热点名称：openWRT-AP
- 热点密码：12345678
- WiFi网关：192.168.1.1
  
至此我们可以用Luci和SSH登录设置我们的OpenWrt了
默认用户名密码为root：bianbu

更多使用技巧请访问OpenWrt官网查看：https://openwrt.org

