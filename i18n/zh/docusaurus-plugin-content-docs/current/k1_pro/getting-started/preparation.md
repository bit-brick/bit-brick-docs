# K1 Pro入门指南

如果你是第一次拿到K1 Pro，我们建议你先阅读我们的入门指南，这样可以让你快速的了解K1单板电脑的基本特性，并进行初步的体验。

## 准备工作

在准备开始使用K1 Pro之前，你需要先准备下面的一些东西：

- 电源适配器
- Micro SD卡（卡启动）
- Type-C线
- 支持HDMI的显示器
- HDMI线
- 键盘和鼠标
- USB转TTL串口调试线

**注意**：如果不需要界面显示，那你可能只需要电源适配器和Type-C线就可以，你可以通过网线或者USB串口调试线将K1 Pro连接到你的电脑，并通过终端工具对设备进行操作。

## 1.2 Micro SD卡

K1 Pro支持SD卡启动，如果你想使用卡启动，按照下面的烧录系统镜像步骤后，你就可以将卡直接插入到K1 Pro的Micro SD卡插槽即可。

## 1.3 LCD显示屏

最高支持4K分辨率，通过HDMI接口连接。
![hdmi](/img/k1pro/getting-started/hmdi_link.png)

## 1.5 调试

波特率为：1500000
![usb2ttl](/img/k1pro/getting-started/port_debug.png)

## 1 用户名及密码

| 用户名 | 密码  |
| ------ | ----- |
| linaro | linaro |

## 2 系统镜像烧录

K1 Pro出厂默认烧录了系统镜像， 如果不需要烧录新镜像的话可以跳过本章内容。

### 烧录镜像到eMMC

#### 工具获取和安装

烧录镜像到eMMC需要使用到烧录工具RKDevTool和驱动程序DriverAssitant

[百度云盘](https://pan.baidu.com/s/1xwmlsizqtWEtv2eT6JLYfA?pwd=h9yx)

**注**：RK3576系列必须使用v3.30及以上版本的RKDevTool工具。

#### 安装DriverAssitant

1. 解压DriverAssitant软件压缩包，双击 DriverInstall.exe 进入驱动安装界面。
2. 点击驱动安装即可开始安装驱动。如果不确定以前是否安装过旧版驱动，先点击驱动卸载移除旧版本驱动程序，再点击驱动安装。
![driver_install](/img/k1pro/getting-started/driver_install.png)
#### 安装RKDevTool

瑞芯微专用USB烧录工具，Windows平台，使用USB接口将系统镜像下载到板卡中。

1. 解压压缩包后无需安装即可使用，双击 RKDevTool.exe进入软件界面。
2. 软件主要有三大部分，分别是下载镜像、升级固件和高级功能
 ![rk_devtools](/img/k1pro/getting-started/rk_devtools.png)  

#### Loader模式烧录镜像

打开 RKDevTool 烧录工具，并设置板卡进入烧录模式

1. 准备一根Type-c线和一根供电线，Type-c线用于镜像烧录
2. 使用一根Type-C线一端连接到板卡的OTG接口，另一端连接电脑的usb接口，给板卡接上电源
3. 然后打开软件RKDevTool，将ADB设备切换到Rockusb
4. 如果不成功，重复2-3步骤。
![rk_devtools](/img/k1pro/getting-started/rk_devtools_1.png) 
然后就可以点击固件选择要烧录的镜像，然后点击打开
![rk_devtools](/img/k1pro/getting-started/rk_devtools_2.png) 
等待固件加载完成，然后点击升级，开始烧录固件
![rk_devtools](/img/k1pro/getting-started/rk_devtools_3.png) 

镜像烧录成功，如下图

![rk_devtools](/img/k1pro/getting-started/rk_devtools_4.png) 

#### MASKROM模式烧录镜像

```
[烧录过程说明]
```

### 烧录镜像到SD卡

镜像烧录到SD卡需要专用烧录软件和读卡器

#### 安装SDDiskTool

烧录镜像到SD卡需要使用到烧录工具 SD_Firmware_Tool.exe和SD卡格式化工具SDCardFormatter

[百度云盘](https://pan.baidu.com/s/1xwmlsizqtWEtv2eT6JLYfA?pwd=h9yx)

![sd_formatter](/img/k1pro/getting-started/sd_formatter.png) 

**注**：RK3576必须使用v1.78及以上的SDDiskTool。

1. 安装 SDCardFormatter 后打开软件，识别到SD卡后点击Format即可。若识别不到可先用Windows自带的格式化工具格式化，再使用此工具
2. SD_Firmware_Tool解压压缩包后无需安装即可使用，双击进入软件界面。
   ![sd_formatter](/img/k1pro/getting-started/sd_tools_1.png)

#### 烧录镜像

打开烧录SDDiskTool的可执行文件SD_Firmware_Tool.exe并插入SD卡。

1. 首先选择正确的要烧录的SD卡，然后将功能模式选择位SD启动 ，再选择要烧录的镜像，最后点击开始创建烧录镜像到SD卡。
2. 耐心等待SD卡烧录完整，当镜像较大时，烧录的时间会相应变长。
   ![sd_formatter](/img/k1pro/getting-started/sd_tools_2.png)

**注**：点击开始创建会有一定概率报错说无法烧录，可以关闭错误窗口再进行开始创建

烧录成功，如下图
![sd_formatter](/img/k1pro/getting-started/sd_tools_3.png)



## FAQs

**Q1**：MASKROM模式烧录和Loader模式烧录有什么区别？

**A1**：Loader模式烧录的原理是板卡在uboot启动期间检测到引脚被按下，然后进入烧录模式，Loader模式烧录的前提是镜像完整（多用于安卓模式）。 MASKROM模式烧录是芯片在启动时检测到该引脚被按下，然后进入烧录模式，MASKROM模式烧录适合绝大部分的场景

## 3 启动系统

### 启动方式

K1 Pro主要使用SD卡和eMMC启动

- 当SD卡有镜像时，则优先使用sd卡进行启动
- 当SD卡没有镜像，eMMC有镜像则使用eMMC的镜像进行启动
- SD卡和eMMC都没有镜像，则不会启动

### 启动注意

SD卡和eMMC烧录了Linux系统的镜像，板子在上电的时候就会自动运行。

#### 启动注意事项：

1. 正确连接好板上外设，使用配套螺丝固定稳固，尤其是不支持热插拔的设备（MIPI显示屏、MIPI摄像头、无线模块、硬盘等），如果在上电的情况下拔插可能会损坏设备，导致设备无法正常工作。
   ![sd_formatter](/img/k1pro/getting-started/all_device.png)
2. 使用显示屏需注意，MIPI屏接口不支持热插拔，HDMI接口有两种形态，一种是标准HDMI接口，另一种是Micro-HDMI， 两种接口是无法直接相连的，需要使用转接口来进行转换连接。如果是VGA/DP接口的显示器，也可以通过使用转接口来显示。
3. 使用电源给板卡供电。注意：标注的电源规格为最低规格，如果接入的外设较多，请使用同等电压更大功率的电源。

**注意**：镜像在烧录完后的第一次启动会对机器进行配置，上电一两分钟后就自动重启，届时系统将会正常运行。