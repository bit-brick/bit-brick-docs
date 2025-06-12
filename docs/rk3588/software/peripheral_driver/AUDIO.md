#  Audio 



## 1. Overview

### 1.1 Rockchip Audio Features

This section describes the audio features of the RK platform, as shown in Table 1-1:
![alt text](/pdf/rk/audio/image.png)

Table 1-1 Rockchip Audio Features

### 1.2 DAI

This chapter mainly describes the support of digital audio interfaces on the RK platform.

#### 1.2.1 I2S

The RK platform has two types of I2S controllers: I2S and I2S-TDM. The I2S controller supports I2S and PCM protocols; the I2S-TDM controller supports I2S, PCM, and TDM protocols.

##### 1.2.1.1 I2S Controller Features

- Supports 8-channel I2S protocol: standard, left justified, right justified  
- Supports stereo PCM protocol: early, late 1, late 2, late 3  
- Supports master/slave mode, mode applies to both TX/RX logic  
- Supports 8k ~ 192k sampling rate, 384k sampling rate  
- Supports 16 ~ 32 bits width  
- Supports MSB/LSB mode  
- Supports clock phase adjustment  
- Supports clock compensation  

**Note**:  
384k sampling rate requires a high-precision clk, which can be imported from the MCLK PIN or use slave mode.  
Mono PCM is not supported. If needed, stereo PCM can be used to transmit mono PCM, with valid data in slot 0.  
Clock compensation is used for clock compensation in heterogeneous systems, such as UAC, but has usage restrictions. Refer to the audio clock compensation section.

##### 1.2.1.2 I2S-TDM Controller Features

In addition to the functions supported by the I2S controller, the I2S-TDM controller adds the following features:

- Supports 8 slots TDM PCM protocol: normal, left shift mode[0~3]  
- Supports 8 slots TDM I2S protocol: normal, left justified, right justified  
- Supports configurable slot width: 16 ~ 32 bits  
- Supports full mapping of data lines, can remap the relationship between data lines and paths  
- Supports TX/RX asynchronous mode, independent clocks, can support independent sampling rates, bit widths, protocols  
- Supports TX/RX synchronous mode, shared clock  
- Supports configurable PCM FSYNC width: [1~7] sclk cycle or one channel block  
- Supports configurable I2S FSYNC width: half frame / whole frame  

**Note**:  
Only even slot configurations are supported.  
In TDM I2S long frame mode, up to 16 channels can be transmitted.
In TDM protocol, only path-0 is used, so when the physical PIN connected does not correspond to the channel, please remap the data line to path-0.


##### 1.2.1.3 RK Series Chips I2S Support List

Chip| I2S| I2S-TDM
---|---|---
PX30/RK3326| I2S1_2CH, I2S2_2CH| I2S0_8CH
RK1808| I2S1| I2S0
RK3036| I2S0| 
RK3066| I2S0, I2S1, I2S2| 
RK312X| I2S_8CH, I2S_2CH| 
RK3188| I2S0| 
RK3288| I2S0| 
RK322X| I2S0, I2S1, I2S2| 
RK3308| I2S_2CH_0, I2S_2CH_1 I2S_8CH_0, I2S_8CH_1, I2S_8CH_2, I2S_8CH_3| 
RK3328| I2S0, I2S1, I2S2| 
RK3368| I2S_8CH, I2S_2CH| 
RK3399| I2S0, I2S1, I2S2| 
RK3568/RK3566| I2S0_8CH, I2S1_8CH, I2S2_2CH, I2S3_2CH| 
RV1108| I2S0, I2S1, I2S2| 
RV1126/RV1109| I2S1_2CH, I2S2_2CH| I2S0_8CH


#### 1.2.2 PDM

##### 1.2.2.1 PDM Controller Features

The RK platform supports digital microphones or ADCs with PDM protocol. Specific features are as follows:

- Supports master mode only  
- Supports up to 8 MIC array  
- Supports 16 ~ 24 bits width  
- Supports 8 ~ 48k sampling rate  
- Supports channel swapping  
- Supports high-pass filtering: 3.79 Hz, 60 Hz, 243 Hz, 493 Hz
- Supports storage alignment: left alignment, right alignment
- Supports full mapping of data lines
- Supports clock phase adjustment
- Supports clock compensation

Note:
Storage alignment is only for formats with bit width greater than 16 bits. For formats greater than 16 bits, data is stored by word, with low bits padded with 0 by default.
Clock compensation is used for clock compensation in heterogeneous systems, such as UAC, but has usage restrictions. Refer to the audio clock compensation section.
Full mapping of data lines is only supported on RV1126 and later chips: RV1126/RV1109, RK3568/RK3566...

##### 1.2.2.2 RK Series Chips PDM Support List

Chip | Name| Max Channel| Version
---|---|---|---
PX30/RK3326| PDM | 8| V2
RK1808| PDM | 8| V2
RK2108| PDM | 4| V3
RK3308| PDM_8CH | 8| V2
RK3328| PDM | 8| V1
RK3568/RK3566| PDM | 8| V3
RV1126/RV1109| PDM | 8| V3

Version Description

Version| Description
---|---
V1| 1. Supports standard mode, corresponding clocks: 2.048/2.822/3.072 MHz.
V2| 1. Added fractional division.   <br/> 2. Added storage alignment mode.
V3| BUG FIX:  <br/> 1. Fixed sign bit overflow issue when HPF is enabled and input signal amplitude is close to 0 db.  <br/> 2. Fixed passband ripple consistency issue, new version passband ripple is less than 0.1 db.  <br/> 3. Fixed aliasing issue.  <br/> Features:  <br/> 1. Added low power mode, corresponding clocks 1.024/1.411/1.536 MHz.  <br/> 2. Added high performance mode, corresponding clocks 4.096/5.644/6.144 MHz.  



#### 1.2.3 DCODEC

The RK platform supports digital CODEC interface, which can be connected to analog CODECs supporting this protocol, such as RK812, to form a complete CODEC. In addition, when the controller works in DSM mode, it can drive an external PA to meet the needs of ordinary audio quality products and save costs.

- Supports 3-channel ADC  
- Supports stereo DAC  
- Supports asynchronous mode: playback and recording sampling rates can be different.  
- Supports synchronous mode: playback and recording sampling rates must be the same.  
- Supports PGA / ALC  
- Supports DSM output, direct drive PA  
- Supports high-pass filtering  

#### 1.2.4 VAD

Voice Activity Detection (VAD) receives data from DAI, processes and analyzes statistics, and triggers an interrupt to wake up the system when the preset threshold is reached. A brief data flow diagram is shown in Figure 1-1:

**Figure 1-1 RK VAD Data Flow**  

![RK VAD 数据流](/pdf/rk/audio/image-1.png)

1. When the system is in sleep, DAI -> VAD -> SRAM remain working, VAD continuously receives data, filters, performs noise self-learning, and stores audio data in the SRAM circular buffer.  
2. When VAD detects that the sound exceeds the preset threshold, it generates an interrupt to wake up the CPU. The CPU turns off VAD. When VAD is turned off, the data flow automatically switches to the DMAC channel, i.e.: DAI -> DMAC -> DDR -> CPU standard recording path.  
3. The CPU seamlessly fills the data in SRAM into the recording buffer, and the data processing is transparent to user space.  
4. After waking up, the ASR program analyzes the recorded data, such as keyword detection.

#### 1.2.5 SPDIF

The RK platform supports the SPDIF Transmitter interface protocol. In particular, the RK3308 also supports SPDIF Receiver.

- Supports 16 ~ 24 bits width  
- Supports 192k sampling rate  
- Supports stereo uncompressed audio, i.e. LPCM  
- Supports 5.1 / 7.1 compressed audio, such as: DD, DD+  
- Supports Optical, Coaxial  

**Note**:  
When outputting 192k sampling rate, an Optical device supporting 192k is required.

#### 1.3 Combo DAI

The RK platform supports arbitrary combinations of DAIs to form Combo DAIs, as shown in Figure 1-2:


![alt text](/pdf/rk/audio/image-2.png)

## 2. Audio Driver Development

This chapter describes the audio support, driver development, and debugging on the RK platform.

### 2.1 Basic Structure of Sound Card

This section introduces the basic structure of a sound card, as shown in Figure 2-1:

![alt text](/pdf/rk/audio/image-3.png)
**Figure 2-1 ALSA Sound Card Structure**  

DAI: Digital Audio Interface.  
MACHINE: Link dai and codec to be a new sound card.  
DMAENGINE: Transfer data between memory and dai's fifo.

In general, to add a sound card based on the released SDK, you only need to port or write a codec driver. In rare cases, you need to add a machine driver. See the Machine Driver Development section for details.

### 2.2 Code List

The code list and description are as follows:

```plaintext
kernel/sound/soc/rockchip$ tree -I "*.o|*.h"
.
├── rk3288_hdmi_analog.c
├── rk3399_gru_sound.c
├── rockchip_audio_pwm.c /* low quality audio out by driving pa */
├── rockchip_cdndp.c
├── rockchip_da7219.c
├── rockchip_hdmi_analog.c /* hdmi and codec share the same i2s */
├── rockchip_hdmi_dp.c /* hdmi and dp share the same i2s */
├── rockchip_i2s.c /* old i2s which support i2s/pcm */
├── rockchip_i2s_tdm.c /* new i2s-tdm which support i2s/pcm/tdm */
├── rockchip_max98090.c
├── rockchip_multicodecs.c /* support multi-streaming */
├── rockchip_multi_dais.c /* support combo-dais */
├── rockchip_multi_dais_pcm.c /* co-work with combo-dais */
├── rockchip_pcm.c /* audio data flow and control */
├── rockchip_pdm.c /* pdm dai driver */
├── rockchip_rt5645.c
├── rockchip_rt5651.c
├── rockchip_spdif.c /* spdif tx dai driver */
├── rockchip_spdifrx.c /* spdif rx dai driver */
├── rockchip_vad.c /* voice activity detection driver */
├── vad_preprocess_arm64.S /* vad preprocess algorithm for arm64 */
├── vad_preprocess_arm.S /* vad preprocess algorithm for arm32 */
└── vad_preprocess_thumb.S /* vad preprocess algorithm for thumb */
kernel/sound/soc/codecs$ tree -P "rk*.c|h*.c|d*.c"
.
├── dmic.c /* driver for dmic, e.g. i2s dmics, pdm dmics */
├── dummy-codec.c /* driver for dmic, direct, none-codec */
├── hdac_hdmi.c
├── hdmi-codec.c /* hdmi codec driver */
├── rk1000_codec.c
├── rk312x_codec.c /* internal codec */
├── rk3228_codec.c /* internal codec */
├── rk3308_codec.c /* internal codec 8ch adc */
├── rk3328_codec.c /* internal codec */
├── rk817_codec.c /* codec in rk817 pmic ic */
└── rk_codec_digital.c /* link with external analog part, e.g. rk812. */
```

### 2.3 DAI Driver Development

The DAI drivers in the released SDK are already complete. Developers only need to configure properties to enable the corresponding functions according to the application scenario.

#### 2.3.1 I2S

##### 2.3.1.1 Protocol Format Setting

The protocol format is set by the Machine Driver parsing the DTS, and then calling the set_fmt API to set the controller's protocol format. For Simple Card, refer to the Simple Card section.

##### 2.3.1.2 Master / Slave Setting

Master / slave setting is done by the Machine Driver parsing the DTS, and then calling the set_fmt API to set the controller's protocol format. For Simple Card, refer to the Simple Card section.

##### 2.3.1.3 Clock Phase Inversion Setting

Clock phase inversion is set by the Machine Driver parsing the DTS, and then calling the set_fmt API to set the controller's protocol format. For Simple Card, refer to the Simple Card section.

##### 2.3.1.4 bclk-fs Setting

Property | Value | Description
---|---|---
rockchip,bclk-fs |int|By default, bclk is 64 times the sampling rate

Example: bclk is 32 times the sampling rate

```plaintext
&i2s0 {
    rockchip,bclk-fs = <32>;
};
```

##### 2.3.1.5 High Precision Clock Setting

Property | Value | Description
---|---|---
rockchip,mclk-calibrate|boolean|Supports high-precision clock and clock compensation. For details, refer to Audio Clock Compensation

##### 2.3.1.6 Others

Property | Value | Description
---|---|---
rockchip,no-dmaengine|boolean|Do not bind dmaengine. For details, refer to Combo DAI Driver Development
rockchip,playback-only|boolean|Only supports playback function, only registers TX DMA
rockchip,capture-only|boolean|Only supports recording function, only registers RX DMA


For more features, see the kernel documentation: `kernel/Documentation/devicetree/bindings/sound/rockchip-i2s.txt`

#### 2.3.2 I2S-TDM

In addition to the functions supported by the I2S controller, the I2S-TDM controller adds the following features:

##### 2.3.2.1 TX/RX Clock Sharing Setting

Property | Value | Description
---|---|---
rockchip,clk-trcm|0|TX/RX logic is independent, each uses its own clock, there are two sets of clocks on the IO
rockchip,clk-trcm|1|TX/RX logic is synchronous, sharing TX's clock, only TX's clock on IO
rockchip,clk-trcm|2|TX/TX/RX logic is synchronous, sharing RX's clock, only RX's clock on IO

Example: Set to share TX clock mode

```plaintext
&i2s0 {
    rockchip,clk-trcm = <1>;
};
```
##### 2.3.2.2 Data Line Full Mapping Setting

Hardware can connect to any data line, configure the corresponding property to correct the channel order.

Property | Value | Description
---|---|---
rockchip,i2s-tx-route|`<int int int int>`| Default is in order: SDO0 SDO1 SDO2 SDO3
rockchip,i2s-rx-route|`<int int int int>`| Default is in order: SDI0 SDI1 SDI2 SDI3

Example: Playback channel order is arranged as “SDO3 | SDO2 | SDO1 | SDO0”

```plaintext
&i2s0 {
    rockchip,i2s-tx-route = <3 2 1 0>;
};
```

##### 2.3.2.3 TDM Half Frame Mode Setting

Property | Value | Description
---|---|---
rockchip,tdm-fsync-half-frame|boolean| In TDM I2S mode, frame clock supports half-frame and long-frame formats, default is long-frame

Example: Half-frame format

```plaintext
&i2s0 {
    rockchip,tdm-fsync-half-frame;
};
```

##### 2.3.2.4 TDM Slot Parameter Setting

The driver has implemented the set_tdm_slot interface. The Machine Driver parses the DTS property and then calls the set_tdm_slot API to set the corresponding parameters of the controller. For Simple Card, please refer to the Simple Card section.

For more features, see the kernel documentation: `kernel/Documentation/devicetree/bindings/sound/rockchip,i2s-tdm.txt`

#### 2.3.3 PDM

##### 2.3.3.1 Data Line Full Mapping Setting

Hardware can connect to any data line, configure the corresponding property to correct the channel order.

Property | Value | Description
---|---|---
rockchip,path-map|`<int int int int>`| Default is in order: SDI0 SDI1 SDI2 SDI3

Example: Recording channel order is arranged as “SDI3 | SDI2 | SDI1 | SDI0”

```plaintext
&i2s0 {
    rockchip,i2s-tx-route = <3 2 1 0>;
};
```

##### 2.3.3.2 High Precision Clock Setting

Property | Value | Description
---|---|---
rockchip,mclk-calibrat|boolean| Supports high precision clock and clock compensation. For specific usage, refer to Audio Clock Compensation.

##### 2.3.3.3 Others

Property | Value | Description
---|---|---
rockchip,no-dmaengine|boolean| Do not bind dmaengine. For specific usage, refer to Combo DAI driver development.

For more features, see the kernel documentation: `kernel/Documentation/devicetree/bindings/sound/rockchip,pdm.txt`

#### 2.3.4 DCODEC

##### 2.3.4.1 Clock Sync Mode Setting

Property | Value | Description
---|---|---
rockchip,clk-sync-mode|boolean| Default is clock asynchronous mode, i.e., ADC/DAC clocks are independent

Example: Set to clock sync mode, sharing ADC clock

```plaintext
&dig_acodec {
    rockchip,clk-sync-mode;
};
```

##### 2.3.4.2 DSM Output Mode Setting

Property | Value | Description
---|---|---
rockchip,pwm-output-mode|boolean| External RC, direct drive PA

Example: Set to DSM PWM output mode, IOMUX switches to PWM differential output

```plaintext
&dig_acodec {
    rockchip,pwm-output-mode;
    pinctrl-names = "default";
    pinctrl-0 = <&audiopwmoutdiff_pins>;
};
```

![alt text](/pdf/rk/audio/image-5.png)

For more features, see the kernel documentation: `kernel/Documentation/devicetree/bindings/sound/rockchip,codec-digital.txt`

#### 2.3.5 VAD

##### 2.3.5.1 Audio Source Setting

| Property            | Value   | Description                     |
|---------------------|---------|---------------------------------|
| rockchip,audio-src  | phandle | Set the audio source for voice detection |

The audio source for voice detection comes from DAI. Different chips support different audio sources, as shown in the table below:

Chip| Audio Source
---|---
RK1808| I2S0, I2S1, PDM
RK3308| I2S_8CH_0, I2S_8CH_1, I2S_8CH_2, I2S_8CH_3, PDM_8CH
RK3568/RK3566| I2S1_8CH, I2S2_2CH, I2S3_2CH

Example: On RK3308, VAD uses PDM_8CH array mic as the audio source

```plaintext
&vad {
    rockchip,audio-src = <&pdm_8ch>;
};
```

#### 2.3.5.1 VAD Configuration

| Property            | Value | Description |
|---------------------|-------|-------------|
| rockchip,det-channel | int   | Set the channel for detection, default is channel 0 |

#### 2.3.5.2 Detection Channel Setting
Example: On RK3308, VAD uses array mic 2 as the detection channel
```dts
&vad {
    rockchip,det-channel = <2>;
};
```

### 2.3.5.3 Data Storage Mode Setting

| Property            | Value | Description |
|---------------------|-------|-------------|
| rockchip,mode       | 0     | VAD starts buffering audio data only after detecting voice signal |
| rockchip,mode       | 1     | VAD starts buffering audio data immediately after being enabled |
| rockchip,mode       | 2     | VAD does not buffer audio data |

Example: On RK3308, VAD uses mode 1
```dts
&vad {
    rockchip,mode = <1>;
};
```
Note: To ensure that the subsequent ASR application can obtain complete audio data, it is recommended to use mode 1. The buffered data is stored in the circular buffer of sram. After VAD wakes up the system, the buffered audio in sram is merged into the audio stream. This part of data processing is transparent to the application.

### 2.3.5.4 Buffer Size Setting

| Property            | Value | Description |
|---------------------|-------|-------------|
| rockchip,buffer-time-ms | int | Set the VAD buffer size, size equals: sample rate * bit width * channel * time |

Example: Buffer set to 100 ms, under 16k 16bits 8ch condition is 204800 bytes
```dts
&vad {
    rockchip,buffer-time-ms = <100>;
};
```
Note: Increasing the buffer will equally increase the latency of the subsequent ASR application. Also, system sram is limited, so adjust carefully. The adjustment strategy is "ensure data integrity", i.e., the buffer size can cover the "wake up -> application takeover" time. If this part of the time is too long, please optimize this part of the time.

For more features, see the kernel documentation: kernel/Documentation/devicetree/bindings/sound/rockchip,vad.txt
### 2.4 Combo DAI Driver Development

#### 2.4.1 Sub DAI Setting

| Property            | Value | Description |
|---------------------|-------|-------------|
| dais | `<phandle>...` | sub dai, used to form combo dai. sub dai needs to use the property
“rockchip,no-dmaengine” to remove the associated dmaengine, and is uniformly registered and bound by the Combo DAI framework. |

Example: Combine i2s_8ch_2 and pdm_8ch into Combo DAI
```dts
&i2s_8ch_2 {
       status = "okay";
       rockchip,no-dmaengine;
};
&pdm_8ch {
       status = "okay";
       rockchip,no-dmaengine;
};
&multi-dais {
       dais = <&i2s_8ch_2>, <&pdm_8ch>;
};
```

### 2.4.2 Channel Mapping Setting

| Property            | Value | Description |
|---------------------|-------|-------------|
| capture,channel-mapping | `<int ...>` | Number of recording channels used for each sub dai in the combination |
| playback,channel-mapping  | `<int ...>` | Number of playback channels used for each sub dai in the combination |

Example: Stereo playback, 8-channel recording (6-channel mic + 2-channel loopback)
```dts
&multi-dais {
    dais = <&i2s_8ch_2>, <&pdm_8ch>;
    capture,channel-mapping = <2 0>;
    playback,channel-mapping = <2 6>;
};
```

### 2.4.3 Master / Slave Setting

| Property            | Value | Description |
|---------------------|-------|-------------|
| bitclock-master | `<int ...>` | Set the device providing the bit clock, 1 means providing the clock, i.e., master |
| frame-master   | `<int ...>` | Set the device providing the frame clock, 1 means providing the clock, i.e., master |

Example 1: i2s_8ch_2 and pdm_8ch are combined into 8-channel recording (loopback + mic array), i2s_8ch_2 can be configured as master/slave mode, in this case as master, pdm only supports master mode.

```
&multi-dais {
       dais = <&i2s_8ch_2>, <&pdm_8ch>;
       capture,channel-mapping = <2 6>;
       playback,channel-mapping = <2 0>;
       bitclock-master = <1 1>;
       frame-master = <1 1>;
};
```
Example 2: Two i2s are combined into 16 ch, one as master, one as slave. The external hardware wiring needs to connect the dai providing the clock to each slave dai.

```
&multi-dais {
       dais = <&i2s_8ch_0>, <&i2s_8ch_1>;
       capture,channel-mapping = <8 8>;
       playback,channel-mapping = <8 8>;
       bitclock-master = <1 0>;
       frame-master = <1 0>;
};
```
Example 3: Two i2s are combined into 16 ch, both in slave mode, and the clock is provided by the codec end.

```
&multi-dais {
       dais = <&i2s_8ch_0>, <&i2s_8ch_1>;
       capture,channel-mapping = <8 8>;
       playback,channel-mapping = <8 8>;
       bitclock-master = <0 0>;
       frame-master = <0 0>;
};
```
### 2.4.4 Clock Phase Inversion Setting

| Property            | Value | Description |
|---------------------|-------|-------------|
| bitclock-inversion | `<int ...>` | 1 means inverted bit clock, i.e., BCLK |
| frame-inversion   | `<int ...>` | 1 means inverted frame clock, i.e., LRCK |


Example: Invert the clocks of all sub DAIs
```dts
&multi-dais {
       dais = <&i2s_8ch_0>, <&i2s_8ch_1>;
       bitclock-inversion = <1 1>;
       frame-inversion = <1 1>;
};
```

| Property            | Value | Description |
|---------------------|-------|-------------|
| bitclock-inversion  | int   | 1 means inverted bit clock, i.e., BCLK |
| frame-inversion     | int   | 1 means inverted frame clock, i.e., LRCK |

### 2.4.5 Examples
Example 1: RK3308 PDM array mic + stereo loopback + stereo playback + VAD voice detection
```
multi_dais: multi-dais {
       status = "okay";
       compatible = "rockchip,multi-dais";
       dais = <&i2s_8ch_2>, <&pdm_8ch>;
       capture,channel-mapping = <2 6>;
       playback,channel-mapping = <2 0>;
       bitclock-master = <1 1>;
       frame-master = <1 1>;
       bitclock-inversion = <0 0>;
       frame-inversion = <0 0>;
       rockchip,grf = <&grf>;
};
&i2s_8ch_2 {
       status = "okay";
       rockchip,no-dmaengine;
};
&pdm_8ch {
       status = "okay";
       rockchip,no-dmaengine;
};
vad-sound {
       status = "okay";
       compatible = "rockchip,multicodecs-card";
       rockchip,card-name = "rockchip,rk3308-vad";
       rockchip,cpu = <&multi_dais>;
       rockchip,codec = <&acodec>, <&vad>;
};
```
Example 2: RK3308 SoundBar I2S_8CH_0 + I2S_8CH_1 combined for 16-channel output
```dts
&i2s_8ch_0 {
       #sound-dai-cells = <0>;
       rockchip,no-dmaengine;
};
&i2s_8ch_1 {
       #sound-dai-cells = <0>;
       rockchip,no-dmaengine;
       pinctrl-names = "default";
       pinctrl-0 = <&i2s_8ch_1_m0_sdo0
                     &i2s_8ch_1_m0_sdo1_sdi3
                     &i2s_8ch_1_m0_sdo2_sdi2
                     &i2s_8ch_1_m0_sdo3_sdi1
                     &i2s_8ch_1_m0_sdi0>;
};
i2s_16ch_dais: i2s-16ch-dais {
       compatible = "rockchip,rk3308-multi-dais", "rockchip,multi-dais";
       dais = <&i2s_8ch_0>, <&i2s_8ch_1>;
       capture,channel-mapping = <8 8>;
       playback,channel-mapping = <8 8>;
       bitclock-master = <1 0>;
       frame-master = <1 0>;
       rockchip,grf = <&grf>;
};
```
For more features, see the kernel documentation: kernel/Documentation/devicetree/bindings/sound/rockchip,multidais.txt
## 2.5 CODEC Driver Development
Please refer to the official Linux Sound Subsystem Documentation.

## 2.6 Machine Driver Development
This section briefly describes the steps to add a sound card with examples.

### 2.6.1 Simple Card
Simple Card is a generic ASoC machine driver that supports the addition of most standard sound cards.

#### 2.6.1.1 Protocol Format Setting

| Property            | Value | Description |
|---------------------|-------|-------------|
| simple-audio-card,format | string | Set protocol format |

Format | Description
---------------------|-------
i2s | i2s standard format
right_j| i2s right-justified format
left_j |i2s left-justified format
dsp_a | pcm delay 1 bit format
dsp_b  | pcm no delay format
pdm | pdm format

Example: Set to i2s left-justified format
```dts
audiopwmout_diff: audiopwmout-diff {
    compatible = "simple-audio-card";
    simple-audio-card,format = "left_j";
    simple-audio-card,cpu {
        sound-dai = <&i2s3_2ch>;
    };
    master: simple-audio-card,codec {
        sound-dai = <&dig_acodec>;
    };
};
```

#### 2.6.1.2 mclk-fs Setting

| Property            | Value | Description |
|---------------------|-------|-------------|
| simple-audio-card,mclk-fs | int   | By default, mclk is 256 times the sampling rate |

Example: mclk is 512 times the sampling rate
```dts
audiopwmout_diff: audiopwmout-diff {
    compatible = "simple-audio-card";
    simple-audio-card,mclk-fs = <512>;
    simple-audio-card,cpu {
        sound-dai = <&i2s3_2ch>;
    };
    master: simple-audio-card,codec {
        sound-dai = <&dig_acodec>;
    };
};
```

#### 2.6.1.3 master / slave Setting

Property |Value| Description
---|---|---
simple-audio-card,bitclock-master
|phandle|Set the device providing the bit clock, by default DAI provides the clock
simple-audio-card,frame-master|phandle|Set the device providing the frame clock, by default DAI provides the clock

Example: DAI works in slave mode, CODEC works in master mode
```dts
audiopwmout_diff: audiopwmout-diff {
    compatible = "simple-audio-card";
    simple-audio-card,bitclock-master = <&master>;
    simple-audio-card,frame-master = <&master>;
    simple-audio-card,cpu {
        sound-dai = <&i2s3_2ch>;
    };
    master: simple-audio-card,codec {
        sound-dai = <&dig_acodec>;
    };
};
```

#### 2.6.1.4 Clock Phase Inversion Setting

Property | Value  | Description
---|---|---
simple-audio-card,bitclock-inversion | boolean | Invert bit clock, i.e., BCLK
simple-audio-card,frame-inversion | boolean | Invert frame clock, i.e., LRCK

Example: Invert both bclk and lrck
```dts
audiopwmout_diff: audiopwmout-diff {
    compatible = "simple-audio-card";
    simple-audio-card,bitclock-inversion;
    simple-audio-card,frame-inversion;
    simple-audio-card,cpu {
        sound-dai = <&i2s3_2ch>;
    };
    simple-audio-card,codec {
        sound-dai = <&dig_acodec>;
    };
};
```
#### 2.6.1.5 TDM Slot Parameter Settings

| Property            | Value | Description |
|---------------------|-------|-------------|
| dai-tdm-slot-num    | int   | Set the number of slots |
| dai-tdm-slot-width  | int   | Set the slot bit width |

Example: slot bit width is 32 bits, 8 slots
```dts
i2s-dmic-array {
    compatible = "simple-audio-card";
    simple-audio-card,mclk-fs = <256>;
    simple-audio-card,cpu {
        sound-dai = <&i2s_8ch_0>;
        dai-tdm-slot-num = <8>;
        dai-tdm-slot-width = <32>;
    };
    simple-audio-card,codec {
        sound-dai = <&dummy_codec>;
    };
};
```

Note: mclk-fs equals [slot num] * [slot-width], or an even multiple thereof.
For more features, see the kernel documentation: kernel/Documentation/devicetree/bindings/sound/simple-card.txt

#### 2.6.1.6 Sound Card Addition Example
1. Port or write the codec driver
```
sound/soc/codecs/Kconfig
sound/soc/codecs/Makefile
sound/soc/codecs/tas571x.c
sound/soc/codecs/tas571x.h
```
2. Enable CONFIG
```
CONFIG_SND_SIMPLE_CARD
CONFIG_SND_SOC_ROCKCHIP_I2S
CONFIG_SND_SOC_ROCKCHIP_I2S_TDM
CONFIG_SND_SOC_TAS571X
```
3. Add DTS sound card node
Enable the corresponding i2s node according to the hardware connection
```dts
&i2s_8ch_1 {
    status = "okay";
    #sound-dai-cells = <0>;
    pinctrl-names = "default";
    pinctrl-0 = <&i2s_8ch_1_m0_sclktx
                 &i2s_8ch_1_m0_lrcktx
                 &i2s_8ch_1_m0_sdo0
                 &i2s_8ch_1_m0_mclk>;
};

```

According to the hardware connection, add the codec node under the corresponding i2c or spi
```
&i2c1 {
       clock-frequency = <400000>;
       status = "okay";
       tas5731: tas5731@1a {
               #sound-dai-cells = <0>;
               compatible = "ti,tas5731";
               reg = <0x1a>;
               clocks = <&cru SCLK_I2S1_8CH_TX_OUT>;
               clock-names = "mclk";
               pinctrl-names = "default";
               pinctrl-0 = <&i2s_8ch_1_m0_mclk>;
               pdn-gpios = <&gpio0 RK_PA5 GPIO_ACTIVE_LOW>;
               reset-gpios = <&gpio1 RK_PA1 GPIO_ACTIVE_LOW>;
       };
};
```

Add and enable the sound card node

```
tas5731_sound: tas5731-sound {
       status = "okay";
       compatible = "simple-audio-card";
       simple-audio-card,format = "i2s";
       simple-audio-card,name = "rockchip,tas5731";
       simple-audio-card,mclk-fs = <256>;
       simple-audio-card,cpu {
               sound-dai = <&i2s_8ch_1>;
       };
       simple-audio-card,codec {
               sound-dai = <&tas5731>;
       };
};
```

Confirm the sound card is created successfully

```
cat /proc/asound/cards
 0 [rockchiptas5731]: rockchip_tas5731 - rockchip,tas5731
```
Note:
mclk follows the principle of "whoever uses it applies for it". When the codec needs to use an external mclk, the driver needs to apply for and manage the mclk. In this example, the codec mclk comes from RK3308's SCLK_I2S1_8CH_TX_OUT.

### 2.6.2 Multi Codecs Machine Driver
When the Simple Card does not meet the requirements, you need to write the corresponding Machine Driver. This section introduces RK's Multi Codecs Machine Driver. It is used in scenarios where one DAI corresponds to multiple CODECs, or Combo DAI corresponds to multiple CODECs.
![alt text](/pdf/rk/audio/image-6.png)

#### 2.6.2.1 dai / codec Settings

Property | Value | Description
---|---|---
rockchip,cpu | phandle | Set DAI device
rockchip,codec |phandle...| Set associated codecs
Example: i2s0_8ch is used for both codec and vad
```dts
&sound {
    compatible = "rockchip,multicodecs-card";
    rockchip,cpu = <&i2s0_8ch>;
    rockchip,codec = <&codec>, <&vad>;
};
```

#### 2.6.2.2 Protocol Format Settings

| Property            | Value | Description |
|---------------------|-------|-------------|
| rockchip,format     | string | Set protocol format |

Format | Description
---------------------|-------
i2s i2s |  Standard format
right_j |i2s right-justified format
left_j |i2s left-justified format
dsp_a |pcm delay 1 bit format
dsp_b | pcm no delay format
pdm | pdm format

Example: set to i2s left-justified format
```dts
&sound {
       rockchip,format = "left_j";
};
```

#### 2.6.2.3 mclk-fs Setting

| Property            | Value | Description |
|---------------------|-------|-------------|
| rockchip,mclk-fs    | int   | By default, mclk is 256 times the sampling rate |

Example: mclk is 512 times the sampling rate
```
&sound {
       rockchip,mclk-fs = <512>;
};
```

#### 2.6.2.4 master / slave Setting

Property | Value | Description
---|---|---
rockchip,frame-master |phandle |Set the device providing the bit clock, by default DAI provides the clock
rockchip,bitclock-master| phandle | Set the device providing the frame clock, by default DAI provides the clock

Example: DAI works in slave mode, CODEC works in master mode
```dts
&sound {
    compatible = "rockchip,multicodecs-card";
    rockchip,frame-master = <&codec>;
    rockchip,bitclock-master = <&codec>;
    rockchip,cpu = <&i2s0_8ch>;
    rockchip,codec = <&codec>, <&vad>;
};
```

#### 2.6.2.5 Clock Phase Inversion Setting

| Property            | Value | Description |
|---------------------|-------|-------------|
| rockchip,bitclock-inversion | boolean | Invert bit clock, i.e. BCLK |
| rockchip,frame-inversion    | boolean | Invert frame clock, i.e. LRCK |

Example: bclk and lrck are both inverted
```dts
&sound {
    compatible = "rockchip,multicodecs-card";
    rockchip,bitclock-inversion;
    rockchip,frame-inversion;
    rockchip,cpu = <&i2s0_8ch>;
    rockchip,codec = <&codec>, <&vad>;
};
```

#### 2.6.2.6 Set wait-card-locked

Property | Value | Description
---|---|---
rockchip,wait-card-locked|int|Wait for the registration of a specific soundcard ID before registering, to ensure that the current soundcard ID is after the specified ID

Example: If you want the current bluetooth-sound to register as card1, you need card0 to be registered before the current card is registered.
```dts
bluetooth_sound: bluetooth-sound {
    status = "disabled";
    compatible = "rockchip,multicodecs-card";
    rockchip,card-name = "rockchip,rk3308-pcm";
    rockchip,mclk-fs = <128>;
    rockchip,cpu = <&i2s_2ch_0>;
    rockchip,codec = <&dummy_codec>;
    rockchip,format = "dsp_b";
    rockchip,bitclock-inversion = <0>;
    rockchip,wait-card-locked = <0>;
};
```



#### 2.6.2.7 Headphone Button Detection / Headphone Speaker Enable Related Configuration

| Property | Value | Description |
|-----------|-----|-------------|
| hp-det-gpio    | phandle     | Headphone detection pin, detects headphone plug/unplug status via interrupt |
| spk-con-gpio   | phandle     | Amplifier speaker control pin |
| hp-con-gpio    | phandle     | Headphone control pin |
| io-channels    | phandle     | ADC detection channel, used to distinguish between 3/4-segment headphones and headphone buttons |
| poll-interval  | int         | ADC polling interval. Default is 100, unit is ms |
| keyup-threshold-microvolt | int | ADC button voltage |
| play-pause-key | phandle     | Defines the play/pause button here, other buttons can be defined as needed |
| rockchip,audio-routing | string | Sound card routing |

Example:

gpio1_d5 low level for headphone detection, gpio1_d2 enables headphone, gpio1_d3 high level enables speaker.
adc3 is used to distinguish between 3/4-segment headphones, and supports play/pause button on the headphone cable.
Headphone corresponds to es8388's LROUT1, controlled by Headphone Power via gpio1_d2.
Speaker corresponds to es8388's LROUT2, controlled by Speaker Power via gpio1_d3.
LINPUT corresponds to es8388's Main Mic, RINPUT corresponds to Headset Mic
```dts
es8388_sound: es8388-sound {
    status = "okay";
    compatible = "rockchip,multicodecs-card";
    rockchip,card-name = "rockchip-es8388";
    hp-det-gpio = <&gpio1 RK_PD5 GPIO_ACTIVE_LOW>;
    io-channels = <&saradc 3>;
    io-channel-names = "adc-detect";
    keyup-threshold-microvolt = <1800000>;
    poll-interval = <100>;
    spk-con-gpio = <&gpio1 RK_PD3 GPIO_ACTIVE_HIGH>;
    hp-con-gpio = <&gpio1 RK_PD2 GPIO_ACTIVE_HIGH>;
    rockchip,format = "i2s";
    rockchip,mclk-fs = <256>;
    rockchip,cpu = <&i2s0_8ch>;
    rockchip,codec = <&es8388>;
    rockchip,audio-routing =
        "Headphone", "LOUT1",
        "Headphone", "ROUT1",
        "Speaker", "LOUT2",
        "Speaker", "ROUT2",
        "Headphone", "Headphone Power",
        "Headphone", "Headphone Power",
        "Speaker", "Speaker Power",
        "LINPUT1", "Main Mic",
        "LINPUT2", "Main Mic",
        "RINPUT1", "Headset Mic",
        "RINPUT2", "Headset Mic";
    pinctrl-names = "default";
    pinctrl-0 = <&hp_det>;
    play-pause-key {
        label = "playpause";
        linux,code = <KEY_PLAYPAUSE>;
        press-threshold-microvolt = <2000>;
    };
};
```
For more features, see the kernel documentation: `kernel/Documentation/devicetree/bindings/sound/rockchip,multicodecs.txt`

#### 2.6.3 HDMI Audio

RK 4.4 kernel HDMI includes two frameworks: RK HDMI framework and DRM framework, so audio also has two implementations. Starting from RK 4.19 kernel version, only the standard DRM framework is used.

### Example 1: RK3399 RK HDMI Framework Audio Configuration
```dts
dw_hdmi_audio: dw-hdmi-audio {
    compatible = "rockchip,dw-hdmi-audio";
    #sound-dai-cells = <0>;
};
hdmi_sound: hdmi-sound {
    compatible = "simple-audio-card";
    simple-audio-card,format = "i2s";
    simple-audio-card,mclk-fs = <128>;
    simple-audio-card,name = "rockchip,hdmi";
    simple-audio-card,cpu {
        sound-dai = <&i2s2>;
    };
    simple-audio-card,codec {
        sound-dai = <&dw_hdmi_audio>;
    };
};

```

### Example 2: DRM Framework Audio Configuration
```dts
hdmi: hdmi@ff940000 {
    compatible = "rockchip,rk3399-dw-hdmi";
    ……
    #address-cells = <1>;
    #size-cells = <0>;
    #sound-dai-cells = <0>;
};
hdmi_sound: hdmi-sound {
    compatible = "simple-audio-card";
    simple-audio-card,format = "i2s";
    simple-audio-card,mclk-fs = <128>;
    simple-audio-card,name = "rockchip,hdmi";
    simple-audio-card,cpu {
        sound-dai = <&i2s2>;
    };
    simple-audio-card,codec {
        sound-dai = <&hdmi>;
    };
};
```
### 2.7 Audio Clock Compensation

The RK platform provides audio clock fine-tuning to solve audio synchronization problems in heterogeneous systems, such as UAC, HDMI IN, BT voice, etc. The adjustment range is ± 1000 ppm (parts per million).

1. Enable CONFIG
   ```
   CONFIG_ROCKCHIP_CLK_COMPENSATION
   ```
2. Add PLL fractional mode frequency (clock fine-tuning compensation function is only effective in PLL fractional mode), following the principle of "PLL is an even multiple of mclk". Described in two types of chip solutions:
   - For chips with independent audio PLL, just follow the even multiple principle. For example, set RK3308 VPLL0 to 1179648000 Hz, VPLL1 to 903168000 Hz.
   - When audio and other modules share the PLL, the product needs to evaluate the impact of clock fine-tuning on the shared modules, described as follows:
     a. Whether the ± 1000 ppm adjustment affects the module function, for example: Ethernet requires precise clocks, while video encoding controllers do not.
     b. If condition a is met, adjust the PLL frequency to a suitable fractional frequency. For example, on RV1126, both the video encoding controller working around 500 MHz and audio playback supporting 48k sampling rate need to be supported, so choose a fractional PLL frequency close to 500 MHz, such as: 491520000 MHz.

     Example: RV1126 CPLL frequency modified to fractional frequency
    ```
            diff --git a/drivers/clk/rockchip/clk-rv1126.c b/drivers/clk/rockchip/clk￾rv1126.c
        index 9ba0bff..1b95aed 100644
        --- a/drivers/clk/rockchip/clk-rv1126.c
        +++ b/drivers/clk/rockchip/clk-rv1126.c
        @@ -74,6 +74,8 @@ static struct rockchip_pll_rate_table rv1126_pll_rates[] = {
              RK3036_PLL_RATE(594000000, 1, 99, 4, 1, 1, 0),
              RK3036_PLL_RATE(504000000, 1, 84, 4, 1, 1, 0),
              RK3036_PLL_RATE(500000000, 1, 125, 6, 1, 1, 0),
        +       RK3036_PLL_RATE(496742400, 1, 124, 6, 1, 0, 3113851),
        +       RK3036_PLL_RATE(491520000, 1, 40, 2, 1, 0, 16106127),
    ```
    DTS configuration: only configure 491520000 Hz, supporting 8k, 16k, 24k, 48k, 96k, 192k sampling rates

    ```
                &cru {
              assigned-clocks =
                      <&pmucru CLK_RTC32K>, <&pmucru PLL_GPLL>,
                      <&pmucru PCLK_PDPMU>, <&cru PLL_CPLL>,
                      <&cru PLL_HPLL>, <&cru ARMCLK>,
                      <&cru ACLK_PDBUS>, <&cru HCLK_PDBUS>,
                      <&cru PCLK_PDBUS>, <&cru ACLK_PDPHP>,
                      <&cru HCLK_PDPHP>, <&cru HCLK_PDAUDIO>,
                      <&cru HCLK_PDCORE_NIU>;
              assigned-clock-rates =
                      <32768>, <1188000000>,
                      <100000000>, <491520000>,
                      <1400000000>, <600000000>,
                      <500000000>, <200000000>,
                      <100000000>, <300000000>,
                      <200000000>, <150000000>,
                      <200000000>;
        };
    ```
3. Enable the DAI clock compensation function and configure the root pll
   - I2S controller
    ```
        &i2s1_2ch {
          clocks = <&cru MCLK_I2S1>, <&cru HCLK_I2S1>, <&cru PLL_CPLL>;
          clock-names = "i2s_clk", "i2s_hclk", "i2s_clk_root";
          rockchip,mclk-calibrate;
    };
    ```
   - I2S-TDM controller
    ```
            &i2s0_8ch {
          clocks = <&cru MCLK_I2S0_TX>, <&cru MCLK_I2S0_RX>, <&cru HCLK_I2S0>,
                    <&cru MCLK_I2S0_TX_DIV>, <&cru MCLK_I2S0_RX_DIV>,
                    <&cru PLL_CPLL>, <&cru PLL_CPLL>;
          clock-names = "mclk_tx", "mclk_rx", "hclk",
                        "mclk_tx_src", "mclk_rx_src",
                        "mclk_root0", "mclk_root1";
          rockchip,mclk-calibrate;
    };
    ```
   - PDM controller
    ```bash
                &pdm {
              status = "okay";
              clocks = <&cru MCLK_PDM>, <&cru HCLK_PDM>, <&cru PLL_CPLL>;
              clock-names = "pdm_clk", "pdm_hclk", "pdm_clk_root";
              rockchip,mclk-calibrate;
        };
    ```
4. Function verification
   After enabling the function, you can fine-tune the clock through amixer.

 Example: RV1126 CPLL frequency modified to fractional frequency
```dts
# cat /proc/asound/cards
 0 [rockchiprk809co]: rockchip_rk809- - rockchip,rk809-codec
                     rockchip,rk809-codec
# aplay -D hw:0,0 --period-size=1024 --buffer-size=4096 -f dat /dev/zero &
Playing raw data '/dev/zero' : Signed 16 bit Little Endian, Rate 48000 Hz, Stereo
# cat /sys/kernel/debug/clk/clk_summary | egrep "i2s0|cpll"
pll_cpll                         1       1       0   491519999
 cpll                           6       11       0   491519999
   mclk_i2s0_rx_div             1       1       0   12288000
     mclk_i2s0_rx_mux           1       1       0   12288000
       mclk_i2s0_rx             1       1       0   12288000
     mclk_i2s0_rx_fracdiv       0       0       0   12288000
   mclk_i2s0_tx_div             1       1       0   12288000
     mclk_i2s0_tx_mux           1       1       0   12288000
       mclk_i2s0_tx             2       2       0   12288000
         mclk_i2s0_tx_out2io     2       2       0   12288000
     mclk_i2s0_tx_fracdiv       0       0       0   12288000
# amixer contents
...
numid=3,iface=PCM,name='PCM Clk Compensation In PPM'
 ; type=INTEGER,access=rw------,values=1,min=-1000,max=1000,step=1
 : values=0
# amixer -- cset numid=3 10
numid=3,iface=PCM,name='PCM Clk Compensation In PPM'
 ; type=INTEGER,access=rw------,values=1,min=-1000,max=1000,step=1
 : values=10
# cat /sys/kernel/debug/clk/clk_summary | egrep "i2s0|cpll"
pll_cpll                         1       1       0   491524892
 cpll                           6       11       0   491524892
   mclk_i2s0_rx_div             1       1       0   12288123
     mclk_i2s0_rx_mux           1       1       0   12288123
       mclk_i2s0_rx             1       1       0   12288123
     mclk_i2s0_rx_fracdiv       0       0       0   12288123
   mclk_i2s0_tx_div             1       1       0   12288123
     mclk_i2s0_tx_mux           1       1       0   12288123
       mclk_i2s0_tx             2       2       0   12288123
         mclk_i2s0_tx_out2io     2       2       0   12288123
     mclk_i2s0_tx_fracdiv       0       0       0   12288123
# amixer -- cset numid=3 -10
numid=3,iface=PCM,name='PCM Clk Compensation In PPM'
 ; type=INTEGER,access=rw------,values=1,min=-1000,max=1000,step=1
 : values=-10
pll_cpll                         1       1       0   491515106
 cpll                           6       11       0   491515106
   mclk_i2s0_rx_div             1       1       0   12287878
     mclk_i2s0_rx_mux           1       1       0   12287878
       mclk_i2s0_rx             1       1       0   12287878
     mclk_i2s0_rx_fracdiv       0       0       0   12287878
   mclk_i2s0_tx_div             1       1       0   12287878
     mclk_i2s0_tx_mux           1       1       0   12287878
       mclk_i2s0_tx             2       2       0   12287878
         mclk_i2s0_tx_out2io     2       2       0   12287878
     mclk_i2s0_tx_fracdiv       0       0       0   12287878
```



## 3. Debugging Methods
Common debugging tools are shown in Figure 3-1:

![alt text](/pdf/rk/audio/image-7.png)

### 3.1 Hardware Instruments

#### 3.1.1 Multimeter
Measure hardware power supply, and confirm with the chip manual that the working voltage is normal. On the RK side, confirm whether the IO domain voltage is consistent with the software configuration, and on the CODEC side, confirm whether each power supply meets the manual requirements.

Example: RV1126 EVB, RK817 is connected to I2S0, CODEC works at 1.8v; the multimeter measures the hardware voltage as 1.8v, as shown below:

![alt text](/pdf/rk/audio/image-8.png)

The corresponding domain configuration in the software board-level DTS is 1.8v, as shown below:
```dts
&pmu_io_domains {
    status = "okay";
    ...
    vccio7-supply = <&vcc_1v8>;
};
```
**Note**: If the hardware power supply and software configuration are inconsistent, it may cause functional abnormalities and even risk of chip damage.

#### 3.1.2 Oscilloscope
Use an oscilloscope to measure hardware signals: clock and data. Measure whether the clock frequency, amplitude, duty cycle, jitter, etc. meet the protocol specifications (for example: when the working voltage is 3.3v, but the actual clock signal is only 2v, resulting in no data being collected, the reason may be that it is pulled down by a peripheral, shorted to ground, or the software voltage configuration is incorrect, etc.); capture clock and data signals, analyze data from the waveform combined with specific data patterns (can be replaced by a logic analyzer) to see if it is correct; use trigger mode to capture the problem scene (for example: whether there is a glitch or jitter on the CLK at the moment of sound interruption).

#### 3.1.3 Signal Generator
Can generate specific waveforms, such as square, triangle, sine waves. When debugging ADC, a signal generator can be used to generate a sine wave to debug the undistorted level of the ADC.

#### 3.1.4 AP Analyzer
CODEC index test analyzer, tests digital interface signals, measures analog signal indicators, signal-to-noise ratio, total harmonic distortion, dynamic range, etc.

### 3.2 Debugging Commands

#### 3.2.1 procfs
Confirm that the sound card is registered successfully through proc fs
```bash
# cat /proc/asound/cards
0 [rockchiprk809co]: rockchip_rk809- - rockchip,rk809-codec
                    rockchip,rk809-codec
7 [Loopback       ]: Loopback - Loopback
                    Loopback 1
# ls /dev/snd/
by-path   controlC7 pcmC0D0p pcmC7D0p pcmC7D1p
controlC0 pcmC0D0c   pcmC7D0c pcmC7D1c timer
```

#### 3.2.2 clk summary
Query the audio clock to confirm that the clock is set correctly
Example: Query the i2s0 mclk frequency and its PLL source, result: mclk is 12288000 Hz, PLL source is cpll
```bash
# cat /sys/kernel/debug/clk/clk_summary | egrep "i2s0|pll"
pll_cpll                     1       1       0   500000000
cpll                         5       10      0   500000000
  mclk_i2s0_rx_div           0       0       0   500000000
    mclk_i2s0_rx_fracdiv     0       0       0   12288000
      mclk_i2s0_rx_mux       0       0       0   12288000
        mclk_i2s0_rx         0       0       0   12288000
  mclk_i2s0_tx_div           1       1       0   500000000
    mclk_i2s0_tx_fracdiv     1       1       0   12288000
      mclk_i2s0_tx_mux       1       1       0   12288000
        mclk_i2s0_tx         1       1       0   12288000
          mclk_i2s0_tx_out2io 2       2       0   12288000
```

#### 3.2.3 Registers

##### 3.2.3.1 io command
View and modify registers through the io command (suitable for SOC register queries), and confirm configuration and working status with the chip manual.
```bash
# cat /proc/iomem | grep i2s
ff800000-ff800fff : i2s@ff800000
# io -4 -l 0x40 0xff800000
ff800000: 7200000f 004e000f 10003f3f 00000010
ff800010: 000f0110 01f00000 00000000 00000003
ff800020: 00000000 00000000 00000000 0000001f
ff800030: 00003eff 00003eff 00000303 20150001
```

##### 3.2.3.2 regmap
View registers through the regmap node (read-only).
```bash
# ls /sys/kernel/debug/regmap/
0-0020-rk817-codec
ff800000.i2s
...
# cat /sys/kernel/debug/regmap/0-0020-rk817-codec/registers
12: 03
13: f4
14: 00
15: ff
16: 00
17: 40
18: 48
19: 00
1a: 00
1b: ff
1c: 00
1d: 00
1e: 02
1f: 00
...

```

**Note**: `regmap` is based on a cache mechanism. If you modify the register directly through the `io` command, the `regmap` node will not reflect the updated register unless the driver sets the register type to `volatile` or disables the `regmap` cache.

Example: Disable regmap cache to query the correct register value
```bash
# cd /sys/kernel/debug/regmap/ff800000.i2s/
# cat registers /* dump register by regmap */
00: 7200000f
04: 004e000f
08: 10003f3f
0c: XXXXXXXX
10: 000f0010
14: 01f00000
18: XXXXXXXX
1c: 00000000
20: XXXXXXXX
24: XXXXXXXX
2c: XXXXXXXX
30: 00003eff
34: 00003eff
38: 00000303
# io -4 0xff800000 0x0 /* set 0xff800000 to 0 */
# io -4 -l 0x40 0xff800000 /* dump to check value of 0xff800000, now it's 0 */
ff800000: 00000000 004e000f 10003f3f 00000000
ff800010: 000f0010 01f00000 00000000 00000000
ff800020: 00000000 00000000 00000000 00000000
ff800030: 00003eff 00003eff 00000303 20150001
# cat registers /* dump register by regmap */
00: 7200000f /* it's still old value */
04: 004e000f
08: 10003f3f
0c: XXXXXXXX
10: 000f0010
14: 01f00000
18: XXXXXXXX
1c: 00000000
20: XXXXXXXX
24: XXXXXXXX
2c: XXXXXXXX
30: 00003eff
34: 00003eff
38: 00000303
# echo N > cache_only
[148833.374641] rockchip-i2s-tdm ff800000.i2s: debugfs cache_only=N forced: 
syncing cache
# echo Y > cache_bypass
[148834.760274] rockchip-i2s-tdm ff800000.i2s: debugfs cache_bypass=Y forced
# cat registers /* dump again, now it's correct */
00: 00000000
04: 004e000f
08: 10003f3f
0c: 00000000
10: 000f0010
14: 01f00000
18: 00000000
1c: 00000000
20: 00000000
24: 00000000
2c: 00000000
30: 00003eff
34: 00003eff
38: 00000303
```

##### 3.2.3.3 i2c-tools
View and modify codec registers through i2c tool (suitable for i2c type codec devices), and confirm configuration and working status with the codec manual.

###### 3.2.3.3.1 i2cdetect
View devices on the i2c bus
Example: Query devices on the i2c0 bus
```bash
Usage: i2cdetect [-y] [-a] [-q|-r] I2CBUS [FIRST LAST]
       i2cdetect -F I2CBUS
       i2cdetect -l
 I2CBUS is an integer or an I2C bus name
 If provided, FIRST and LAST limit the probing range
```

Example: Query devices on the i2c0 bus
```bash
# i2cdetect -y 0
     0 1 2 3 4 5 6 7 8 9 a b c d e f
00:         -- -- -- -- -- -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: UU -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- --
```
###### 3.2.3.3.2 i2cdump
Dump all registers of the device

```
Usage: i2cdump [-f] [-y] [-r first-last] I2CBUS ADDRESS [MODE [BANK [BANKREG]]]
 I2CBUS is an integer or an I2C bus name
 ADDRESS is an integer (0x03 - 0x77)
 MODE is one of:
   b (byte, default)
   w (word)
   W (word on even register addresses)
   s (SMBus block)
   i (I2C block)
   c (consecutive byte)
   Append p for SMBus PEC
```
Example: Query the registers of rk817 (device address: 0x20) on i2c0 bus, where 0x12 ~ 0x4f are codec registers.
```bash
# i2cdump -f -y 0 0x20 b
     0 1 2 3 4 5 6 7 8 9 a b c d e f
00: 03 35 18 10 08 17 04 00 00 00 01 01 00 80 02 00
10: 00 00 03 f4 00 ff 00 40 48 00 00 ff 00 00 02 00
20: 00 00 00 00 ff 00 00 1f 00 99 00 00 00 00 00 03
30: 04 03 03 00 a5 02 00 00 11 03 03 00 00 e0 0f 09
40: a5 7f 04 58 2d 0c a5 00 00 00 00 0f 20 00 0f 88
50: 8c 00 01 00 01 b0 44 1e 00 60 16 6a 16 6a ff f8
60: ff f8 00 00 00 00 00 00 00 00 00 16 66 01 d7 00
70: 00 00 00 00 ff ed d6 58 16 6a ff f9 00 00 00 00
80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
90: 60 81 d5 7f fb df ca 81 d2 ff 00 00 00 00 00 00
a0: 00 00 00 00 b8 00 00 00 00 00 00 00 00 00 00 00
b0: 00 0f 0f 0f 0f ad 0e ff ff 00 64 18 18 64 12 18
c0: 64 00 00 64 62 62 64 ff ff ff ff ff 08 08 30 30
d0: 08 08 30 30 30 30 18 14 58 58 6c 6c 6c 6c 0b 33
e0: 00 00 00 55 a2 c8 c5 40 00 ff 22 03 0a 80 94 0b
f0: c0 8c a0 40 18 10 00 86 00 dc 00 ff 00 ff 60 00
```

###### 3.2.3.3.3 i2cset
Modify the value of a single register
```
Usage: i2cset [-f] [-y] [-m MASK] [-r] I2CBUS CHIP-ADDRESS DATA-ADDRESS [VALUE] 
... [MODE]
 I2CBUS is an integer or an I2C bus name
 ADDRESS is an integer (0x03 - 0x77)
 MODE is one of:
   c (byte, no value)
   b (byte data, default)
   w (word data)
   i (I2C block data)
   s (SMBus block data)
   Append p for SMBus PEC
```
Example: Modify register 0x12 of rk817, set the value to 0

```bash
# i2cset -f -y -r 0 0x20 0x12 0x0 b
Value 0x00 written, readback matched
```

###### 3.2.3.3.4 i2cget
Query the value of a single register

```bash
Usage: i2cget [-f] [-y] I2CBUS CHIP-ADDRESS [DATA-ADDRESS [MODE]]
 I2CBUS is an integer or an I2C bus name
 ADDRESS is an integer (0x03 - 0x77)
 MODE is one of:
    b (read byte data, default)
    w (read word data)
    c (write byte/read byte)
    Append p for SMBus PEC

```

Example: Query register 0x12 of rk817
```bash
# i2cget -f -y 0 0x20 0x12 b
0x00
```
For more features, see the official i2c-tools documentation: [i2c-tools](#)

### 3.2.4 alsa-utils
RK Linux SDK comes with alsa-utils tools by default

#### 3.2.4.1 aplay
```bash
Usage: aplay [OPTION]... [FILE]...
-h, --help              help
    --version           print current version
-l, --list-devices      list all soundcards and digital audio devices
-L, --list-pcms         list device names
-D, --device=NAME       select PCM by name
-q, --quiet             quiet mode
-t, --file-type TYPE    file type (voc, wav, raw or au)
-c, --channels=#        channels
-f, --format=FORMAT     sample format (case insensitive)
-r, --rate=#            sample rate
-d, --duration=#        interrupt after # seconds
-s, --samples=#         interrupt after # samples per channel
-M, --mmap              mmap stream
-N, --nonblock          nonblocking mode
-F, --period-time=#     distance between interrupts is # microseconds
-B, --buffer-time=#     buffer duration is # microseconds
    --period-size=#     distance between interrupts is # frames
    --buffer-size=#     buffer duration is # frames
-A, --avail-min=#       min available space for wakeup is # microseconds
-R, --start-delay=#     delay for automatic PCM start is # microseconds
    --stop-delay=#      delay for automatic PCM stop is # microseconds from xrun
-v, --verbose           show PCM structure and setup (accumulative)
-V, --vumeter=TYPE      enable VU meter (TYPE: mono or stereo)
-I, --separate-channels one file for each channel
-i, --interactive       allow interactive operation from stdin
-m, --chmap=ch1,ch2,..  Give the channel map to override or follow
    --disable-resample  disable automatic rate resample
    --disable-channels  disable automatic channel conversions
    --disable-format    disable automatic format conversions
    --disable-softvol   disable software volume control (softvol)
    --test-position     test ring buffer position
    --test-coef=#       test coefficient for ring buffer position (default 8)
                        expression for validation is: coef * (buffer_size / 2)
    --test-nowait       do not wait for ring buffer - eats whole CPU
    --max-file-time=#   start another output file when the old file has recorded
                        for this many seconds
    --process-id-file   write the process ID here
    --use-strftime      apply the strftime facility to the output file name
    --dump-hw-params    dump hw_params of the device
    --fatal-errors      treat all errors as fatal
```
Example: Use sound card 0 to play silent data with 48k sample rate, 2 channels, and 16 bits
```bash
aplay -D hw:0,0 --period-size=1024 --buffer-size=4096 -r 48000 -c 2 -f s16_le /dev/zero
```

#### 3.2.4.2 arecord
```bash
Usage: arecord [OPTION]... [FILE]...
-h, --help              help
    --version           print current version
-l, --list-devices      list all soundcards and digital audio devices
-L, --list-pcms         list device names
-D, --device=NAME       select PCM by name
-q, --quiet             quiet mode
-t, --file-type TYPE    file type (voc, wav, raw or au)
-c, --channels=#        channels
-f, --format=FORMAT     sample format (case insensitive)
-r, --rate=#            sample rate
-d, --duration=#        interrupt after # seconds
-s, --samples=#         interrupt after # samples per channel
-M, --mmap              mmap stream
-N, --nonblock          nonblocking mode
-F, --period-time=#     distance between interrupts is # microseconds
-B, --buffer-time=#     buffer duration is # microseconds
    --period-size=#     distance between interrupts is # frames
    --buffer-size=#     buffer duration is # frames
-A, --avail-min=#       min available space for wakeup is # microseconds
-R, --start-delay=#     delay for automatic PCM start is # microseconds
    --stop-delay=#      delay for automatic PCM stop is # microseconds from xrun
-v, --verbose           show PCM structure and setup (accumulative)
-V, --vumeter=TYPE      enable VU meter (TYPE: mono or stereo)
-I, --separate-channels one file for each channel
-i, --interactive       allow interactive operation from stdin
-m, --chmap=ch1,ch2,..  Give the channel map to override or follow
    --disable-resample  disable automatic rate resample
    --disable-channels  disable automatic channel conversions
    --disable-format    disable automatic format conversions
    --disable-softvol   disable software volume control (softvol)
    --test-position     test ring buffer position
    --test-coef=#       test coefficient for ring buffer position (default 8)
                        expression for validation is: coef * (buffer_size / 2)
    --test-nowait       do not wait for ring buffer - eats whole CPU
    --max-file-time=#   start another output file when the old file has recorded
                        for this many seconds
    --process-id-file   write the process ID here
    --use-strftime      apply the strftime facility to the output file name
    --dump-hw-params    dump hw_params of the device
    --fatal-errors      treat all errors as fatal
```
Example: Use sound card 0 to record audio data with 16k sample rate, 8 channels, and 32 bits
```bash
arecord -D hw:0,0 --period-size=1024 --buffer-size=4096 -r 16000 -c 8 -f s32_le r.wav
```

#### 3.2.4.3 aplay | arecord
The two can be conveniently used together via pipe to implement loopback functionality, which is convenient for driver debugging and performance testing.
Example: Sound card 0 records -> Sound card 1 plays
```bash
arecord -D hw:0,0 --period-size=1024 --buffer-size=4096 -r 48000 -c 2 -f s16_le -t raw | aplay -D hw:1,0 --period-size=1024 --buffer-size=4096 -r 48000 -c 2 -f s16_le -t raw
```

#### 3.2.4.4 amixer
Control the internal path switches of the codec. Combined with the audio topology diagram in the codec manual (such as Figure 3-2 RK3308 codec), it can realize audio stream routing, volume control, etc.

![alt text](/pdf/rk/audio/image-9.png)
Figure 3-2 RK3308 codec


```
Usage: `amixer <options> [command]`

Available options:
- `-h,--help` this help
- `-c,--card N` select the card
- `-D,--device N` select the device, default 'default'
- `-d,--debug` debug mode
- `-n,--nocheck` do not perform range checking
- `-v,--version` print version of this program
- `-q,--quiet` be quiet
- `-i,--inactive` show also inactive controls
- `-a,--abstract L` select abstraction level (none or basic)
- `-s,--stdin` Read and execute commands from stdin sequentially
- `-R,--raw-volume` Use the raw value (default)
- `-M,--mapped-volume` Use the mapped volume

Available commands:
- `scontrols` show all mixer simple controls
- `scontents` show contents of all mixer simple controls (default command)
- `sset sID P` set contents for one mixer simple control
- `sget sID` get contents for one mixer simple control
- `controls` show all controls for given card
- `contents` show contents of all controls for given card
- `cset cID P` set control contents for one control
- `cget cID` get control contents for one control
```
Example: Query sound card controls and switch the playback path to SPK

```bash
# amixer -c 0 contents
numid=1,iface=MIXER,name='Playback Path'
 ; type=ENUMERATED,access=rw------,values=1,items=11
 ; Item #0 'OFF'
 ; Item #1 'RCV'
 ; Item #2 'SPK'
 ; Item #3 'HP'
 ; Item #4 'HP_NO_MIC'
 ; Item #5 'BT'
 ; Item #6 'SPK_HP'
 ; Item #7 'RING_SPK'
 ; Item #8 'RING_HP'
 ; Item #9 'RING_HP_NO_MIC'
 ; Item #10 'RING_SPK_HP'
 : values=0
...
# amixer -c 0 cset numid=1 2
numid=1,iface=MIXER,name='Playback Path'
 ; type=ENUMERATED,access=rw------,values=1,items=11
 ; Item #0 'OFF'
 ; Item #1 'RCV'
 ; Item #2 'SPK'
 ; Item #3 'HP'
 ; Item #4 'HP_NO_MIC'
 ; Item #5 'BT'
 ; Item #6 'SPK_HP'
 ; Item #7 'RING_SPK'
 ; Item #8 'RING_HP'
 ; Item #9 'RING_HP_NO_MIC'
 ; Item #10 'RING_SPK_HP'
 : values=2
```
#### 3.2.4.5 alsaloop

Supports routing between any sound cards  
Supports adaptive clock synchronization  
Supports adaptive resampling  
Supports mixer controls redirection  

```
Usage: `alsaloop [OPTION]...`

- `-h,--help` help
- `-g,--config` configuration file (one line = one job specified)
- `-d,--daemonize` daemonize the main process and use syslog for errors
- `-P,--pdevice` playback device
- `-C,--cdevice` capture device
- `-X,--pctl` playback ctl device
- `-Y,--cctl` capture ctl device
- `-l,--latency` requested latency in frames
- `-t,--tlatency` requested latency in usec (1/1000000sec)
- `-f,--format` sample format
- `-c,--channels` channels
- `-r,--rate` rate
- `-n,--resample` resample in alsa-lib
- `-A,--samplerate` use converter (0=sincbest,1=sincmedium,2=sincfastest,3=zerohold,4=linear)
- `-B,--buffer` buffer size in frames
- `-E,--period` period size in frames
- `-s,--seconds` duration of loop in seconds
- `-b,--nblock` non-block mode (very early process wakeup)
- `-S,--sync` sync mode(0=none,1=simple,2=captshift,3=playshift,4=samplerate,5=auto)
- `-a,--slave` stream parameters slave mode (0=auto, 1=on, 2=off)
- `-T,--thread` thread number (-1 = create unique)
- `-m,--mixer` redirect mixer, argument is: `SRC_SLAVE_ID(PLAYBACK)[@DST_SLAVE_ID(CAPTURE)]`
- `-O,--ossmixer` rescan and redirect oss mixer, argument is: `ALSA_ID@OSS_ID` (for example: "Master@VOLUME")
- `-e,--effect` apply an effect (bandpass filter sweep)
- `-v,--verbose` verbose mode (more -v means more verbose)
- `-w,--workaround` use workaround (serialopen)
- `-U,--xrun` xrun profiling
- `-W,--wake` process wake timeout in ms
- `-z,--syslog` use syslog for errors

Recognized sample formats are: `S8 U8 S16_LE S16_BE U16_LE U16_BE S24_LE S24_BE U24_LE U24_BE S32_LE S32_BE U32_LE U32_BE FLOAT_LE FLOAT_BE FLOAT64_LE FLOAT64_BE IEC958_SUBFRAME_LE IEC958_SUBFRAME_BE MU_LAW A_LAW IMA_ADPCM MPEG GSM SPECIAL S24_3LE S24_3BE U24_3LE U24_3BE S20_3LE S20_3BE U20_3LE U20_3BE S18_3LE S18_3BE U18_3LE U18_3BE G723_24 G723_24_1B G723_40 G723_40_1B DSD_U8 DSD_U16_LE DSD_U32_LE DSD_U16_BE`

Tip #1 (usable 500ms latency, good CPU usage, superb xrun prevention):
alsaloop -t 500000

Tip #2 (superb 1ms latency, but heavy CPU usage):
alsaloop -t 1000

Sync mode specification for capture to playback stream:
- `0 or none` - do not touch the stream
- `1 or simple` - add or remove samples to keep both streams synchronized
- `2 or captshift` - use driver for the capture device (if supported) to compensate the rate shift
- `3 or playshift` - use driver for the playback device (if supported) to compensate the rate shift
- `4 or samplerate` - use samplerate library to do rate resampling
- `5 or auto` - automatically selects the best method in this order: captshift, playshift, samplerate, simple
```
Example: Audio recorded by sound card 0 is played through sound card 1, using sync mode strategy 1 (add or remove samples)
```
alsaloop -C hw:0,0 -P hw:1,0 -t 10000 -A 3 -S 1 -b -v
```
**Note**:
If sound card 0 and 1 share the same clock source (e.g., the same OSC), there is no asynchronous cumulative error issue. If sound card 0 is UAC (clock sourced from PC) and sound card 1 is the system sound card (clock sourced from the device), since the clock sources are different, cumulative errors will inevitably occur over time, leading to audio dropouts. In this case, software compensation (such as adding or removing samples) or hardware compensation (such as audio clock compensation) is required.

### 3.2.5 tiny-alsa

RK Android SDK comes with tiny-alsa tools by default

#### 3.2.5.1 tinypcminfo

Query the supported sample rates, formats, number of channels, etc. of the sound card.

```
Usage: tinypcminfo [-D card] [-d device]
```

Example:
```bash
# tinypcminfo -D 0
Info for card 0, device 0:
PCM out:
Access: 0x000009
Format0: 0x000044
Format1: 0x000010
Format Name: S16_LE, S24_LE, S32_LE
Subformat: 0x000001
Rate: min=16000Hz max=48000Hz
Channels: min=2 max=2
Sample bits: min=16 max=32
Period size: min=4 max=65536
Period count: min=2 max=4096
PCM in:
Access: 0x000009
Format0: 0x000044
Format1: 0x000010
Format Name: S16_LE, S24_LE, S32_LE
Subformat: 0x000001
Rate: min=16000Hz max=48000Hz
Channels: min=2 max=2
Sample bits: min=16 max=32
Period size: min=4 max=65536
Period count: min=2 max=4096
```


#### 3.2.5.2 tinyplay
```
Usage: `tinyplay file.wav [-D card] [-d device] [-p period_size] [-n n_periods]`
```

Example: Play a 1k0 audio file



```bash
# tinyplay /sdcard/1k0.wav -D 0 -d 0 -p 1024 -n 3
Playing sample: 2 ch, 44100 hz, 32 bit
```

#### 3.2.5.3 tinycap

```
Usage: `tinycap file.wav [-D card] [-d device] [-c channels] [-r rate] [-b bits] [-p period_size] [-n n_periods]`
```

Example: Record audio at 44.1k sample rate

```bash
# tinycap /sdcard/rec.wav -D 0 -d 0 -c 2 -r 44100 -b 16 -p 1024 -n 3
```

#### 3.2.5.4 tinymix

Control internal codec path switches, volume control, etc. Equivalent to amixer.
```
Usage: `tinymix [-D card]`
```
Example: Turn on the Mono path switch



```bash
# tinymix
Mixer name: 'rockchip,rt5640-codec'
Number of controls: 123
ctl type num name value
0 BOOL 1 Mono Playback Switch Off
1 INT 2 Mono DAC Playback Volume 175 175
2 BOOL 2 Speaker Channel Switch Off Off
3 INT 2 Speaker Playback Volume 31 31
4 BOOL 2 HP Channel Switch Off Off
...
# tinymix "Mono Playback Switch" 1
Mono Playback Switch: On
```

### 3.2.6 xrun profiling

When the audio playback buffer is empty, an underrun is triggered; when the audio recording buffer is full, an overrun is triggered; both are collectively referred to as xrun. Any buffer node in the audio stream path may trigger xrun. This section describes kernel xrun.

#### 3.2.6.1 xrun kmsg

1. Enable XRUN CONFIG
   ```
    CONFIG_SND_DEBUG
    CONFIG_SND_PCM_XRUN_DEBUG
    CONFIG_SND_VERBOSE_PROCFS
   ```
   The xrun debug switches are shown in Table 3-1 below. If you need to support all switches, use the sum.
    **Table 3-1 xrun debug switches**

| Bit | Value Description |
|-----|-------------------|
| 1   | Basic debugging - show xruns in ksyslog interface |
| 2   | Dump stack - dump stack for basic debugging |
| 4   | Jiffies check - compare the position with jiffies (a sort of in-kernel monotonic clock), show what's changed when basic debugging is enabled |
2. Enable all xrun debug switches for sound card 0 playback device
    ```
        # echo 7 > /proc/asound/card0/pcm0p/xrun_debug
    ```
3. When the playback dma ringbuffer is empty, the log is as follows：
    ```
        asoc-simple-card rk809-sound: XRUN: pcmC0D0p:0
        CPU: 3 PID: 657 Comm: sh Not tainted 4.19.161 #509
        Hardware name: Generic DT based system
        [<b010f47c>] (unwind_backtrace) from [<b010b9a8>] (show_stack+0x10/0x14)
        [<b010b9a8>] (show_stack) from [<b0850b58>] (dump_stack+0x90/0xa4)
        [<b0850b58>] (dump_stack) from [<b06a39c4>] (__snd_pcm_xrun+0xa0/0x114)
        [<b06a39c4>] (__snd_pcm_xrun) from [<b069dac4>] (snd_pcm_stop_xrun+0x64/0x68)
        [<b069dac4>] (snd_pcm_stop_xrun) from [<b0695c4c>]
        (snd_info_text_entry_release+0x34/0x7c)
        [<b0695c4c>] (snd_info_text_entry_release) from [<b02694a4>] 
        (close_pdeo+0x54/0x100)
        [<b02694a4>] (close_pdeo) from [<b02695c0>] (proc_reg_release+0x70/0x78)
        [<b02695c0>] (proc_reg_release) from [<b0210ac8>] (__fput+0x88/0x1c4)
        [<b0210ac8>] (__fput) from [<b01412d4>] (task_work_run+0x94/0xb4)
        [<b01412d4>] (task_work_run) from [<b010b48c>] (do_work_pending+0xc8/0xd0)
        [<b010b48c>] (do_work_pending) from [<b0101064>] (slow_work_pending+0xc/0x20)
    ```


#### 3.2.6.2 xrun ftrace

In addition to kernel log debug information, xrun trace events provide more detailed debug information, such as hwptr, applptr, etc. This part requires enabling kernel trace debug. The kernel trace events supported by alsa are shown in Table 3-2:

**Table 3-2 Trace Event Description**

| Event            | Description                     |
|------------------|---------------------------------|
| `snd_pcm:applptr`| Application pointer update      |
| `snd_pcm:hw_ptr_error`| DMA pointer error                |
| `snd_pcm:xrun`   | xrun                            |
| `snd_pcm:hwptr`  | DMA pointer update              |

1. Enable FTRACE CONFIG
    ```
    CONFIG_FUNCTION_TRACER
    CONFIG_FUNCTION_GRAPH_TRACER
    CONFIG_STACK_TRACER
    CONFIG_DYNAMIC_FTRACE
    ```
2. Play audio in the background
    ```
        # aplay -D hw:0,0 --period-size=128 --buffer-size=256 -r 48000 -f dat /dev/zero &
    ```
3. Enable audio trace events to analyze detailed read/write information of buffer producers and consumers, which helps locate problems.

```bash
# cd /sys/kernel/debug/tracing
# echo "snd_pcm:applptr" >> set_event
# echo "snd_pcm:hwptr" >> set_event
# echo "snd_pcm:xrun" >> set_event
# cat trace | head -20
...
178.109942: applptr: pcmC0D0p/sub0: prev=0, curr=128, avail=128, period=128, 
buf=256
178.109981: applptr: pcmC0D0p/sub0: prev=128, curr=256, avail=0, period=128, 
buf=256
178.110224: hwptr:   pcmC0D0p/sub0: POS: pos=24, old=0, base=0, period=128, 
buf=256
178.110234: applptr: pcmC0D0p/sub0: prev=256, curr=280, avail=0, period=128, 
buf=256
178.112441: hwptr:   pcmC0D0p/sub0: IRQ: pos=128, old=24, base=0, period=128, 
buf=256
178.112510: applptr: pcmC0D0p/sub0: prev=280, curr=384, avail=0, period=128, 
buf=256
178.112553: hwptr:   pcmC0D0p/sub0: POS: pos=136, old=128, base=0, period=128, 
buf=256
178.112556: applptr: pcmC0D0p/sub0: prev=384, curr=392, avail=0, period=128, 
buf=256
178.115176: hwptr:   pcmC0D0p/sub0: IRQ: pos=0, old=136, base=0, period=128, 
buf=256
178.115270: applptr: pcmC0D0p/sub0: prev=392, curr=512, avail=0, period=128, 
buf=256
178.115321: hwptr:   pcmC0D0p/sub0: POS: pos=8, old=256, base=256, period=128, 
buf=256
178.115327: applptr: pcmC0D0p/sub0: prev=512, curr=520, avail=0, period=128, 
buf=256
```

For more features, see the kernel documentation: `kernel/Documentation/trace/*`

#### 3.2.6.3 trace-cmd

`trace-cmd` is a front-end application for `ftrace`, simplifying the operation steps of `ftrace`, as shown below:
```
    # trace-cmd record -e snd_pcm:hwptr -e snd_pcm:applptr -e snd_pcm:xrun
    # trace-cmd report
```
For more features, see the official documentation: `trace-cmd`

#### 3.2.6.4 KernelShark

`KernelShark` is a front-end application for `trace-cmd`, graphically presenting the data from `trace-cmd`. Please refer to the official documentation: `KernelShark`

## 3.3 PC Tools

Audacity and Audition are both audio analysis and processing tools on the PC platform, which can be used to analyze audio issues such as dropouts, background noise, distortion, constant frequency interference, etc.

## 4. FAQ

### 4.1 Chip Interface Support

Please refer to Rockchip audio features and the chip manual.

### 4.2 Sound Card Registration Failure

1. Confirm that the sound card driver configuration is compiled into the system according to the sound card instance addition.
2. Locate the cause according to kmsg: DAI, CODEC or Machine. For example, the following log indicates that DAI is not registered:
   ```
   [ 0.584114] rk-multicodecs vad-sound: ASoC: CPU DAI (null) not registered
   ```
3. DAI fail: When DMA channel resources are insufficient, DAI registration fails. Close other modules using DMA and confirm again.
4. CODEC fail: Use a multimeter and oscilloscope to measure CODEC voltage and clock; use i2c-tools to confirm whether i2c device communication is normal.

### 4.3 No Sound During Playback

1. Confirm that the audio source is not a mute file.
2. Use `aplay` or `tinyplay` to play and locate whether the problem occurs in user space or kernel space.
3. Wait for more than 10 seconds during playback to confirm whether it is an I/O error issue.
4. Use `amixer` or `tinymix` to check whether the internal DAC path of the CODEC is open and whether the volume is muted.
5. Check the register configuration and confirm with the chip manual or CODEC manual whether the configuration is correct: IOMUX, DAI, CODEC.
6. Use a multimeter and oscilloscope to measure voltage, clock, and data. Confirm that voltage and clock are normal, and there is a waveform on the data line; measure whether the analog output signal near the CODEC is normal, measure the PA enable gpio level, and locate the problem step by step.

### 4.4 Playback Distortion

1. Use `aplay` or `tinyplay` to play a 1k0 audio file.
2. Use an oscilloscope to measure whether the analog output sine wave is normal and whether there is clipping distortion.
3. Adjust digital or analog gain, observe the waveform at the CODEC chip output, and compare with the indicator test data.
4. Check each node that introduces distortion step by step.

### 4.5 No Sound During Recording

1. Generate a 1k0 waveform input at the CODEC end using a signal generator.
2. Use `arecord` or `tinycap` to record and locate whether the problem occurs in user space or kernel space.
3. Wait for more than 10 seconds during recording to confirm whether it is an I/O error issue.
4. Use `amixer` or `tinymix` to check whether the internal ADC path of the CODEC is open and whether the volume is muted.
5. Check the register configuration and confirm with the chip manual or CODEC manual whether the configuration is correct: IOMUX, DAI, CODEC.
6. Use a multimeter and oscilloscope to measure voltage, clock, and data. Confirm that voltage and clock are normal, and there is a waveform on the data line; measure whether the analog input signal near the CODEC is normal, and locate the problem step by step.

### 4.6 Recording Distortion

1. Generate a 1k0 waveform input at the CODEC end using a signal generator.
2. Use `arecord` or `tinycap` to record, output through loopback, measure with an oscilloscope, or analyze with PC tools.
3. Adjust digital or analog gain, observe the loopback waveform, and compare with the indicator test data.
4. Check each node that introduces distortion step by step.

### 4.7 Too Fast or Too Slow Rate

1. Check `clk summary` to confirm whether the clocks (MCLK, BCLK, LRCK) are accurate.
2. Use an oscilloscope to confirm whether the clock signals are accurate.
3. Use PC tools to record the output signal, analyze the data through waveform or spectrum to confirm whether data is lost or added.
4. Use a logic analyzer to dump the data at the chip output to confirm whether data is lost or added.

### 4.8 Periodic Dropouts

Periodic dropout issues usually occur in asynchronous systems, such as UAC application scenarios, BT voice application scenarios, network audio streaming, etc. The root cause is asynchronous clocks, which accumulate errors over time. This type of problem can be solved by audio clock compensation. Abnormal handling of buffer boundaries can also cause periodic dropouts and noise. You can analyze the problem through xrun profiling.

### 4.9 Noise

There are many causes of noise. The following lists common troubleshooting methods:
1. Confirm whether the clock signal is accurate and check whether the jitter is too large. For example, for HDA audio, jitter should be less than 0.5 ns.
2. Confirm whether there are glitches on the clock, especially within the voltage range of the edge valid value. If there are glitches, the chip will recognize them as clocks, causing timing issues. The IO of the RK platform has a Smitter trigger function (please refer to the chip manual for support, such as on RV1126), which can effectively filter out glitches. This solves the noise problem caused by random hardware glitches.
3. Confirm the CODEC power supply and ground. CODEC is sensitive to power supply noise. Any noise coupled into the power supply or ground will degrade CODEC performance, increase background noise, and cause noise.
4. Use differential circuits in hardware to suppress common-mode noise.
5. Check the hardware PCB layout and troubleshoot noise sources.

### 4.10 XRUN

Refer to the xrun profiling section for kernel xrun. Other analysis points are listed below:
1. Use multithreaded programming on the application side, separate read/write threads from audio processing threads, and ensure that data interaction with the kernel is not interrupted.
2. System scheduling issues can be analyzed using systrace or ftrace.
3. Storage IO blocking causes data read blocking. Use ram device files (such as `/dev/zero`) for playback to see if the problem disappears.
4. If the clock is inaccurate, causing data to be consumed too quickly, refer to the issues of too fast or too slow rate and periodic dropouts.

### 4.11 I/O error

When playback or recording is unresponsive for more than 10 seconds, the kernel log prints: `playback/capture write error (DMA or IRQ trouble?`
1. Query the DAI controller FIFO COUNT register through the register to see if it has stopped counting.
2. Check whether the dma interrupt is updated through procfs: `cat /proc/interrupts | grep dma`
3. Query the DMA controller channel status register (offset address: 0x100) through the register to see if it has abnormally stopped.
4. When DAI works as a slave, please ensure that the peripheral clock is continuously provided during the entire lifecycle of DAI. If it cannot be guaranteed, please keep it always on.


