# Flashing Openwrt on K1 to Implement a Soft Router

## Introduction to Openwrt
![alt text](image.png)
OpenWrt/LEDE is a highly extensible GNU/Linux distribution developed for embedded devices (usually wireless routers). 
Unlike many other router distributions, OpenWrt is a fully functional, easy-to-modify operating system driven by a modern Linux kernel and built entirely for embedded devices. In practice, this means you can have all the features you need while still avoiding bloat.

OpenWrt is not a single, unchangeable firmware but provides a fully writable file system with package management capabilities, allowing you to customize the device by using packages suitable for any application. For developers, OpenWrt is a framework for developing applications without having to build a complete firmware around it; for ordinary users, this means having the ability to be fully customized and use the device in unexpected ways.

OpenWrt official website: https://openwrt.org

OpenWrt official Git repository: https://github.com/openwrt/openwrt
## Installing Openwrt
1. Download the OpenWrt image
[Download link](https://archive.spacemit.com/openwrt/releases/bl-v2.0.y/targets/spacemit/DEVICE_debX/openwrt-spacemit-k1-sbc-debX-ext4-pack-sdcard.img)
2. Burn the image
Use the dd command or balenaEtcher to flash it onto an SD card.
3. Use OpenWrt
After the system boots up, the WiFi AP mode is enabled by default, where:
The wired network card eth1 is the lan port, and eth2 is the wan port.
- Hotspot name: openWRT-AP
- Hotspot password: 12345678
- WiFi gateway: 192.168.1.1

At this point, we can use Luci and SSH to log in and set up our OpenWrt.

The default username and password are root: bianbu.

For more usage tips, please visit the OpenWrt official website: https://openwrt.org