# K1摄像头接口说明

## Processor MIPI CSI2介绍

MIPI CSI-2 最初于2005年推出，为移动设备所使用的标准化相机接口规格，全名为MIPI Camera Serial Interface 2。MIPI CSI-2提供高带宽、低耗电与低电磁干扰的功能，因其易用性且支持高性能应用，包含 1080p、4K、8K 或更高的视频以及高解析度摄像，现在已经成为应用最为广泛的嵌入式摄像头和成像的接口。

详细介绍参考：
[MIPI CSI-2 Specifications](https://www.mipi.org/specifications/csi-2)

## 1.1 MIPI CSI2控制器

K1的RISC-V应用处理器集成了两个MIPI-CSI2 v1.1 控制器, 每一个都支持 4 lanes，最大传输速率可以达到1.5Gbps per lane.

支持的数据格式如下：
- Legacy YUV420 8-bit
- YUV420 8-bit
- RAW8
- RAW10
- RAW12
- RAW14
- Embed data type

并支持下面两种数据交织格式:
1. Data type interleaving
2. Virtual channel interleaving

## 1.2 ISP处理器

K1处理器集成了一个高性能的图像处理器，可以同时支持两路原始数据的视频流，最大的处理能力能够达到16M@30fps。ISP处理器的主要特性如下：

- Support video mode and picture mode
- RAW sensor, output YUV data to DRAM
- Hardware JPEG encoder/decoder (hardware, up to 23M is supported)
- Support YUV/EXIF/JFIF format
- AF/AE/AWB
- Face detection
- Digital zoom, panorama view
- PDAF
- PIP (picture in picture)
- Continuous video AF
- HW 3D denoise
- Multi-layer 2D YUV denoise
- Post Porcess of Lens Shading Correction
- Edge enhancement

更详细的内容可以阅读芯片规格书：
[ISP Processor Specifications](https://developer.spacemit.com/documentation?token=BWbGwbx7liGW21kq9lucSA6Vnpb)

## 2.BIT-BRICK K1摄像头

BIT-BRICK K1板上预留了一个4lane的MIPI CSI2S摄像头接口
![alt text](/img/k1/hardware/camera/k1_camera.png)
其引脚定义如下：
![图1 K1摄像头接口定义](/img/k1/hardware/camera/camera_io.png)

BIT-BRICK 提供了几款不同规格的摄像头(详情参考bit-brick硬件产品详情页)：
![图1 K1摄像头接口定义](/img/k1/hardware/camera/bit_brick_camera.png)

用户也可以根据实际的需要自行设计摄像头。已经支持的摄像头传感器如下：
![图1 K1摄像头接口定义](/img/k1/hardware/camera/support_camera.png)

建议选择上述列表中的传感器，可以减少软件调试的工作量。


