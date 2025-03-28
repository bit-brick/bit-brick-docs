# K1 Camera Interface Description
## Introduction to Processor MIPI CSI2
MIPI CSI - 2 was initially introduced in 2005 as a standardized camera interface specification for mobile devices, officially known as MIPI Camera Serial Interface 2. MIPI CSI - 2 provides high - bandwidth, low - power consumption, and low - electromagnetic interference features. Due to its ease of use and support for high - performance applications, including 1080p, 4K, 8K, or higher video and high - resolution imaging, it has now become the most widely used embedded camera and imaging interface.
For detailed information, refer to:
[MIPI CSI - 2 Specifications](https://www.mipi.org/specifications/csi-2)
## 1.1 MIPI CSI2 Controller
The RISC - V application processor of K1 integrates two MIPI - CSI2 v1.1 controllers, each supporting 4 lanes with a maximum transmission rate of 1.5Gbps per lane.
The supported data formats are as follows:
- Legacy YUV420 8 - bit
- YUV420 8 - bit
- RAW8
- RAW10
- RAW12
- RAW14
- Embed data type
And it supports the following two data interleaving formats:
1. Data type interleaving
2. Virtual channel interleaving
## 1.2 ISP Processor
The K1 processor integrates a high - performance image processor that can simultaneously support two channels of raw data video streams, with a maximum processing capability of 16M@30fps. The main features of the ISP processor are as follows:
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
- Multi - layer 2D YUV denoise
- Post Porcess of Lens Shading Correction
- Edge enhancement
For more detailed information, you can read the chip specification:
[ISP Processor Specifications](https://developer.spacemit.com/documentation?token=BWbGwbx7liGW21kq9lucSA6Vnpb)
## 2. BIT - BRICK K1 Camera
The BIT - BRICK K1 board reserves a 4 - lane MIPI CSI2S camera interface
![alt text](/img/k1/hardware/camera/k1_camera.png)
Its pin definition is as follows:
![Figure 1 K1 Camera Interface Definition](/img/k1/hardware/camera/camera_io.png)
BIT - BRICK provides several cameras of different specifications (for details, refer to the bit - brick hardware product details page):
![Figure 1 K1 Camera Interface Definition](/img/k1/hardware/camera/bit_brick_camera.png)
Users can also design the camera according to their actual needs. The supported camera sensors are as follows:
![Figure 1 K1 Camera Interface Definition](/img/k1/hardware/camera/support_camera.png)
It is recommended to choose the sensors in the above list to reduce the workload of software debugging.