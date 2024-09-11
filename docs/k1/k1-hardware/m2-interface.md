# K1 M.2接口说明

## 一、M.2接口

M.2是计算机内部扩展卡及相关连接器的外观尺寸与针脚的电气接口规范。采用了全新的物理布局和连接器，以取代PCI Express(PCIE)及mSATA接口标准。M.2具有灵活的物理规范，允许更多种类的模块宽度与长度，并与更高级的接口相配，使M.2比mSATA更适合日常应用，尤其是用于超级本或平板电脑等设备的固态硬盘。

M.2是由 PCI-SIG 和 SATA-IO 标准组织所开发，PCI-SIG M.2 和 SATA Rev. 3.2 规格中皆有其定义。原本称为 NGFF (Next Generation Form Factor)，随后于 2013 年正式重命名为 M.2。

详细介绍请参考[Wikipedia](https://zh.wikipedia.org/wiki/M.2)。

常见的M.2接口有以下四种
![front](/img/k1/hardware/m2/m2_type.png)

不同类型的接口对应的插针形态以及引脚定义也是不一样的。
![front](/img/k1/hardware/m2/m2_type_define.png)
引脚定义如下：

- KEY-A引脚定义
- KEY-B引脚定义
- KEY-E引脚定义
- KEY-M引脚定义

## K1板载M.2接口

K1板载集成三个M.2的接口,如下图所示

![M.2接口示意图](/img/k1/hardware/m2/k1_m2.png)

其中M.2 SLOT 1和2是标准的M.2 KEY-M接口定义，可以直接支持NVME接口的固态硬盘.固态硬盘长度可以选择2280的固态硬盘。

用户可以选择主流品牌的NVME接口的SSD即可。安装方式如下图所示：

![SSD安装示意图](/img/k1/hardware/m2/kingston_ssd.png)

另外一个M.2 SLOT 0 则是KEY-E的接口定义，长度为2230，主要用来支持各种无线模块，由于处理器只有三个USB接口，所以SLOT 0并没有将USB接口预留，同时也去掉了兼容NGFF的PCIE接口，所以不能支持USB和PCIE接口定义的模块。SLOT 0接口引脚定义详细说明如下：
![SSD安装示意图](/img/k1/hardware/m2/m2_frame.png)

## K1默认支持BIT-BRICK自己研发的硬件模块，支持的类别和型号如下：

| 型号   | 类别  | 规格介绍       |
| ------ | ----- | -------------- |
| WIFI+蓝牙 | 无线模块 |               |
| LORA   | 无线模块 |               |
| ZIGBEE | 无线模块 |               |
| 蓝牙+星闪 | 无线模块 |               |
| GPS    | 定位模块 |               |


