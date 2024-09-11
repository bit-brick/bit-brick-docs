#  Product Overview


## 1. Product Introduction
SpacemiT® Key Stone™ K1 is a high-performance and ultra low-power SOC that integrates Octa RISC-V CPU cores with SpacemiT® Daoyi™ AI computing power deployment. K1 has the following features:
- Integrates SpacemiT® self-innovate X60™ RISC-V processor core which adheres to the RISC-V 64GCVB architecture and RVA22 standard.
- Extends 2.0TOPS AI computing power by exploring RISC-V customized instructions to realize CPU AI fusion computing power, and mainstream AI inference frameworks such as TensorFlow Lite, TensorFlow, and ONNX RunTime are supported.
- Achieves ultra low power consumption by implementing different granularities of power islands and various levels of power states to make K1 more competitive and the leading edge.
- Supports full-feature interfaces to enrich more innovatative applications and products.
- Compatible with mainstream OS to meet the needs of various application scenarios.
- Meets Industrial grade reliability standards
   ![front](/img/k1/hardware/processor-brief/k1_cpu.png)
## 2. Feature Overview
Application Processor
- RISC-V SpacemiT® X60™ Dual-Cluster Octa-core processors
- Adhere to the RISC-V 64GCVB architecture and RVA22 standard
- Cluster0
    - Quad-Core with 2.0TOPS AI-Power
    - 32K L1-Cache per core
    - 512K L2-Cache
    - 512KB TCM
    - Vector-256bit
- Cluster1
    - Quad-Core
    - 32K L1-Cache per core
    - 512K L2-Cache
    - Vector-256bit
- DVFS with adaptive operating voltage from 0.6V to 1.05V
DDR Memory
- Dual chip select 32-bit LPDDR4/LPDDR4x SDRAM with 2666Mbps operation and a total of up to 16GB of RAM
- Dual chip select 32-bit LPDDR3 SDRAM with 1866Mbps operation and a total of up to 4GB of RAM
RCPU(Real-Time CPU)
- R-I2C (×1)
- R-I2S (×2)
- R-UART (×2)
- R-CAN_FD (×1)
- R-IR_RX (×1)
- R-PWM (×10)
- R-SPI (×1)
Peripheral Controller
- GPIO (×128)
    - 128 pins
    - Pull-up/pull-down programmable
    - 104x 1.8V IO8
    - 24x 1.8V/3.3V IO
- UART (×10)
    - AP/BT/print
- I2C (×10)
    - for camera, G-Sensor/ E-COMPASS/ Proximit-Sensor/ Light-Sensor/Gyro and Fingerprint/NFC, PMIC, touch etc.
    - 8x AP_I2C(AP I2C0/1/7 only for camera)+1x HDMI I2C+1x PWR I2C
- SPI (×4)
    - To support both master and slave mode
    - For IMU, codec etc.
    - Platform has 4 SPI (1x QSPI, 1x SPI LCD, 2x SPI)
- USB (×3)
    - USB 2.0 OTG
    - USB 2.0 Host
    - USB 3.0 (combo PCIE PortA)
- PCIE (×3)
    - PCIE PortA Gen2x1
    - PCIE PortB Gen2x2
    - PCIE PortC Gen2x2
- GMAC (×2)
    - 10/100/1000 Mbps
    - RGMII
- SDIO (×1 for WIFI)
    - compatible for 4-bit SDIO 3.0 UHS-I protocol, up to SDR104 (208MHz)
- SD (×1 for TF card)
    - compatible for 4-bit SD 3.0 UHS-I protocol, up to SDR104 (208MHz)
- eMMC (×1)
    - compatible for 8bit eMMC5.1, up to HS400 (200MHz)
- MIPI CSI (CSI-2 v1.1) 4 lane(×2)
    - 4 Lane + 4 Lane mode
    - 4 Lane + 2 Lane mode
    - 4 Lane + 2 Lane + 2 Lane mode (triple sensor)
- MIPI DSI (DSI v1.1) (×1)
    - 4 Lane DSI
- PWM (×20)
- CAN-FD (×1)
- IR-RX (×1)
Security System
- RISC-V PMP Security
- Secure Boot
- Secure eFuse 4K bits
- Cryptographic engine (TRNG/AES/SM2/SM3/SM4/RSA/ECC/SHA2/HMAC)
Debug System
- Two JTAGs for both CPU and MCU subsystem
- UARTs
- CPU/IO register snapshot after watchdog reboot
Boot System
- Initial AP boot from SPI-Nand/SPI-NorFlash/eMMC/SD
- 128KB boot-ROM size
Aided System
- Watchdog design for each CPU/MCU subsystem
Multimedia Features
GPU
- IMG BXE-2-32@819MHz, 32KB SLC
- Support OpenCL3.0/OpenGL ES 3.2/Vulkan1.3
VPU (video processing unit)
- H.265/H.264/VP8/VP9/MPEG4/MPEG2 decoder 4K@60fps
- H.265/H.264/VP8/VP9 encoder 4K@30fps
- Support simultaneously processing encoding 1080P@60fps and decoding 1080P@60fps
- Support simultaneously processing H264/H265 encoding 1080P@30fps and H264/H265 decoding 4K@30fps
Display
- 1 MIPI DSI-4lane or SPI interface
- Support up to HD + (1920x1080@60fps)
- Support up to 4-full-size-layer composer and maximum 8 layer composer by up-down layer reuse in rdma channel
- Support cmdlist mechanism, which can configure register parameters by HW
- Support concurrent write back, with both raw and afbc format, also support dither/crop/rotation in write back path
- Support advanced mmu (virtual address) mechanism, with nearly no page missing in 90/270 degree rotation
- Support color key and solid color
- Support both advanced error diffusion and pattern based dither for panel
- Support both afbc/raw format image source
- Color saturation/contrast enhancement
- Support both video mode and cmd mode for panel
- Support ddr frequency dynamic changing with embedded dfc buffer
HDMI 1.4
Camera
- Dual-ISP
    - 16M (max.) 30fps Dual ISP
    - One 4 Lane CSI + one 4 Lane CSI or 4 Lane + 2 lane + 2 lane
    - RAW sensor, output YUV data to DRAM
    - Hardware JPEG encoder(hardware, up to 23M is supported)
    - Support YUV/EXIF/JFIF format
    - AF/AE/AWB
    - Face detection
    - Digital zoom, panorama view
    - PDAF
    - PIP (picture in picture)
    - Continuous video AF
    - HW 3D denoise
Audio
- Integrated high quality audio codec and audio front-end
- ADC: 90dB SNR@20~20kHz
- DAC: 95dB SNR@20~20kHz
- Class-G: 95dB SNR@20~20kHz, 31mW@32-ohm, THD -90dB
- ClassAB: 95dB SNR@20~20kHz, 75mW@32-ohm, THD-90dB
- Line-out to support external Class-D audio amplifier (Class-D in PMIC: 95dB SNR@20 ~ 20kHz, 1W@4.2Vbat 10%THD + N, 8-ohm speaker)
- Three MICs input
- Stereo inputs path for noise cancellation
- Stereo headphone output
- Audio content sampling rates: 8kHz to 48kHz
- Microphone bias for headphone plug-in and hook-key detection
- Quad vocoders for adaptive multi-rate (AMR)
- Noise suppression and echo cancellation
General
- Operation temperature: -40 ~ 85°C
## 3. Block Diagram

       ![front](/img/k1/hardware/processor-brief/architecture.png)