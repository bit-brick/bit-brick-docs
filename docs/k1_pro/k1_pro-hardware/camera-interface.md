# K1 Pro Camera Interface Description

## Processor MIPI CSI2 Introduction

MIPI CSI-2, first introduced in 2005, is a standardized camera interface specification used in mobile devices. Its full name is MIPI Camera Serial Interface 2. MIPI CSI-2 provides high bandwidth, low power consumption, and low electromagnetic interference, making it easy to use and supporting high-performance applications, including 1080p, 4K, 8K, or higher video resolutions and high-resolution cameras. It has now become the most widely used interface for embedded cameras and imaging.

For detailed information, refer to:
[MIPI CSI-2 Specifications](https://www.mipi.org/specifications/csi-2)

## 1.1 MIPI CSI2 Controller

The RK3576 application processor in K1 Pro supports 5 CSI-2 interfaces:
- 4 ports support 2 D-PHY v1.2 data-lane with 2.5Gbps/lane
These 4 ports may be bound as 2 ports with 4 data-lane per port
- 1 port supports 4 D-PHY data-lane or 3 C-PHY trios
D-PHY is v2.0 which lane speed is 4.5Gbps
C-PHY is v1.1 which trio speed is 2.5Gsps
- Each port supports 4 virtual channels

## 1.2 ISP Processor

The K1 Pro processor introduces a new generation 16-megapixel ISP. It implements many algorithm accelerators such as HDR, 3A, CAC, 3DNR, 2DNR, Sharpening, Dehaze, Enhance, Debayer, Small Angle Lens-Distortion Correction, etc. Main features:
ISP V3.9
- Support video mode and picture mode
- One channel ISP, 16M pixels
- VICAP/DMA input: raw8/raw10/raw12/raw16
- RGB-IR sensor input
- 3A: include AE/Histogram, AF, AWB statistics output
- BLC: Black Level Correction
- PDAF: Phase Detection Auto Focus
- DPCC: Static/Dynamic defect pixel cluster correction
- LSC: Lens shading correction
- HDR: 2-Frame Merge into High-Dynamic Range
- DRC/TMO: Dynamic Range Compression, Tone mapping in RGB field
- Supports up to 120dB HDR with 20-bit data width
- EXPANDER: Sensor expander
- GIC: Green Imbalance Correction
- Debayer: Advanced Adaptive Demosaic with Chromatic Aberration Correction(CAC)
- CCM/CSM: Color correction matrix; RGB2YUV etc
- Gamma: Gamma out correction
- Dehaze/Enhance: Automatic Dehaze and edge enhancement
- Bay3DNR: Advanced Temporal Noise reduce in RAW
- YUVME: Noise Motion Estimate and Motion Compensation in YUV
- 2DNR: Advanced Spatial Noise reduce in YUV
- Sharp: Picture Sharpening & Edge Enhance in YUV
- CGC: Color Gamut Compression, YUV full range/limit range convert
- 3DLUT: 3D-Lut Color Palette for Customer
- LDCH: Lens-distortion in the horizontal direction
- LDCV: Lens-distortion in the vertical direction
- Gain: Image local gain
- Output Scale*2: support scale down level

## 2. K1 Pro Camera

The K1 Pro board reserves a 4-lane MIPI CSI2S camera interface.
![alt text](/img/k1pro/hardware/k1pro_camera.png)
Its pin definition is as follows:
![Figure 1 K1 Camera Interface Definition](/img/k1pro/hardware/camera_io.png)

BIT-BRICK provides several cameras with different specifications (for details, refer to the BIT-BRICK hardware product details page):
![Figure 1 K1 Camera Interface Definition](/img/k1/hardware/camera/bit_brick_camera.png)

Users can also design cameras according to their actual needs. The supported camera sensors are as follows:
![Figure 1 K1 Camera Interface Definition](/img/k1/hardware/camera/support_camera.png)

It is recommended to choose sensors from the above list to reduce software debugging workload.


