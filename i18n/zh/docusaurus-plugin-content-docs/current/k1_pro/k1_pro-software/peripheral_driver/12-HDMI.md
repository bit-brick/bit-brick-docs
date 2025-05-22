
#  HDMI

## 芯片名称与内核版本
- **芯片名称**：RK322X/RK3328/RK3368/RK3399/RK3288/RK3528/RK356X/RK3588
- **内核版本**：LINUX kernel 6.1/5.10/4.19/4.4


## 前言
本文主要介绍 Rockchip 平台基于 DRM 显示框架的 HDMI 的使用与调试方法。

## 概述
### 产品版本
- RK3288
- RK3368
- RK322X
- RK3328
- RK3399
- RK3528
- RK356X
- RK3588
- RK3576

### 读者对象
- 技术支持工程师
- 软件开发工程师

---

## 1. Rockchip 平台 HDMI 简介
Rockchip 各平台的 HDMI 功能如下：

| 功能                     | RK3288 | RK3368 | RK322X | RK3328 | RK3399 | RK3528 | RK356X | RK3588 | RK3576 |
|--------------------------|--------|--------|--------|--------|--------|--------|--------|--------|--------|
| 最大输出分辨率           | 3840x2160p60 | 4096x2160p60 | 4096x2160p60 | 4096x2160p60 | 4096x2160p60 | 4096x2160p60 | 4096x2160p60 | 7680x4320p60 | 4096x2160p120 |
| 隔行模式                 | N      | N      | Y      | Y      | Y      | Y      | Y      | Y      | Y      |
| 支持的颜色格式           | RGB, YCbCr444, YCbCr422, YCbCr420 (仅 RK3288W 支持 YCbCr420) | RGB, YCbCr444, YCbCr422, YCbCr420 | RGB, YCbCr444, YCbCr422, YCbCr420 | RGB, YCbCr444, YCbCr422, YCbCr420 | RGB, YCbCr444, YCbCr420 | RGB, YCbCr444, YCbCr422, YCbCr420 | RGB, YCbCr444, YCbCr422, YCbCr420 | RGB, YCbCr444, YCbCr422, YCbCr420 | RGB, YCbCr444, YCbCr422, YCbCr420 |
| 是否支持 10bit 色深       | Y      | N      | Y      | Y      | Y      | Y      | Y      | Y      | Y      |
| 支持 HDMI 协议版本        | HDMI 2.0 | HDMI 2.0 | HDMI 2.0 | HDMI 2.0 | HDMI 2.0 | HDMI 2.0 | HDMI 2.0 | HDMI 2.1 | HDMI 2.1 |

DRM：
DRM 全称是 Direct Rendering Manager 是 DRI ( Direct Rendering Infrastructure ) 框架的一个
组件。LINUX 4.4 及其以后的内核采用 DRM 框架， HDMI 驱动的路径为：

```
kernel/drivers/gpu/drm/rockchip/dw_hdmi-Rockchip.c
kernel/drivers/gpu/drm/rockchip/inno_hdmi.c
kernel/drivers/gpu/drm/bridge/synopsys/
```
---

## 2. DRM 框架 HDMI 介绍
### 2.1 HDMI 软件功能配置
#### 2.1.1 使能 HDMI
打开 HDMI 需要添加：
```dts
&hdmi {
    status = "okay";
};
```

#### 2.1.2 绑定 VOP
在 Rockchip 的各个平台中，各种显示接口（HDMI、DP、CVBS 等）输出的图像数据来自 VOP：

![alt text](/pdf/rk/hdmi/image.png)

如果平台存在两个 VOP（RK3288、RK3399）：VOPB（支持 4K）、VOPL（只支持 2K），两个 VOP 可以分别与两个显示接口绑定（一个显示接口只能和一个 VOP 绑定），且可以相互交换：

![alt text](/pdf/rk/hdmi/image-1.png)
- 当 DTS 中显示设备节点打开时，显示接口对应 VOPB 和 VOPL 的 ports 都会打开，所以需要关闭用不到的那个 VOP 对应的 port。

例如，HDMI 绑定到 VOPB 需要添加：
```dts
&hdmi_in_vopl {
    status = "disabled";
};

```

反之，若绑定到 VOPL 则添加：
```dts
&hdmi_in_vopb {
 status = "disabled";
};
```

如果平台只有一个 VOP，则不需要该步骤。

**VOP2 及其后版本**，一个平台不再有多个 VOP。取而代之的是只有一个 VOP，而 VOP 中有多个 VP（Video Port）输出。

- **RK356X VOP 与 HDMI 的通路**：
  
  ![alt text](/pdf/rk/hdmi/image-2.png)
  - HDMI 可以绑定在 VP0 或 VP1 上，建议绑定 VP0 可以支持 4K 输出：
    ```dts
    &hdmi_in_vp0 {
        status = "okay";
    };
    &hdmi_in_vp1 {
        status = "disabled";
    };
    ```

- **RK3588 VOP 与 HDMI 的通路**：
  
  ![alt text](/pdf/rk/hdmi/image-3.png)
  - RK3588 有两个 HDMITX，两者在性能上完全相同，分别可以绑定在 VP0/1/2。
  - 如果最高只需要输出 4K 分辨率，建议 HDMI0/1 分别绑定在 VP0/1：
    ```dts
            &hdmi0_in_vp0 {
        status = "okay";
        };
        &hdmi0_in_vp1 {
        status = "disabled";
        };
        &hdmi0_in_vp2 {
        status = "disabled";
        };
        &hdmi1_in_vp1 {
        status = "okay";
        };
        &hdmi1_in_vp0 {
        status = "disabled";
        };
        &hdmi1_in_vp2 {
        status = "disabled";
        };
    ```

- **RK3588 平台如果需要输出 8K 分辨率**，必须占用 VP0 和 VP1 两个 port 进行拼接。在 DTS 中，必须将输出 8K 的 HDMI 绑定在 VP0 上，以 HDMI0 为例：
  ```dts
    &hdmi0_in_vp0 {
    status = "okay";
    };
    &hdmi0_in_vp1 {
    status = "disabled";
    };
    &hdmi0_in_vp2 {
    status = "disabled";
    };
  ```
  同时，还需要将 VOP ACLK 设置为 800M，详见 3.1.4。

- **RK3588 HDMI 与 eDP 共用 COMBPHY**，以 HDMI0 和 eDP0 为例，DTS 中 `hdptxphy_hdmi0` 为 HDMI PHY 节点，`hdptxphy0` 为 eDP PHY 节点：
  ```dts
    hdptxphy0: phy@fed60000 {
    compatible = "rockchip,rk3588-hdptx-phy";
    reg = <0x0 0xfed60000 0x0 0x2000>;
    clocks = <&cru CLK_USB2PHY_HDPTXRXPHY_REF>, <&cru PCLK_HDPTX0>;
    clock-names = "ref", "apb";
    resets = <&cru SRST_P_HDPTX0>, <&cru SRST_HDPTX0_INIT>,
    <&cru SRST_HDPTX0_CMN>, <&cru SRST_HDPTX0_LANE>;
    reset-names = "apb", "init", "cmn", "lane";
    rockchip,grf = <&hdptxphy0_grf>;
    #phy-cells = <0>;
    status = "disabled";
    };
    hdptxphy_hdmi0: hdmiphy@fed60000 {
    compatible = "rockchip,rk3588-hdptx-phy-hdmi";
    reg = <0x0 0xfed60000 0x0 0x2000>;
    clocks = <&cru CLK_USB2PHY_HDPTXRXPHY_REF>, <&cru PCLK_HDPTX0>;
    clock-names = "ref", "apb";
    clock-output-names = "clk_hdmiphy_pixel0";
    #clock-cells = <0>;
    resets = <&cru SRST_HDPTX0>, <&cru SRST_P_HDPTX0>,
    <&cru SRST_HDPTX0_INIT>, <&cru SRST_HDPTX0_CMN>,
    <&cru SRST_HDPTX0_LANE>, <&cru SRST_HDPTX0_ROPLL>,
    <&cru SRST_HDPTX0_LCPLL>;
    reset-names = "phy", "apb", "init", "cmn", "lane", "ropll",
        "lcpll";
    rockchip,grf = <&hdptxphy0_grf>;
    #phy-cells = <0>;
    status = "disabled";
    };
  ```

所以当使用 HDMI 的时候必须关闭对应的 eDP 和 eDP PHY。以 HDMI0 为例：
```dts
&hdmi0 {
 status = "okay";
};
&hdptxphy_hdmi0 {
 status = "okay";
};
&edp0 {
 status = "disabled";
};
&hdptxphy0 {
 status = "disabled";
};
```

#### 2.1.3 打开开机 logo
如果 U-Boot logo 未开启，那么 kernel 阶段也无法显示开机 logo，只能等到系统启动后才能看到应用显示的图像。在 DTS 中将 `route_hdmi` 使能即可打开 U-Boot logo 支持：
```dts
&route_hdmi {
    status = "okay";
};

```

在双 VOP 的平台，需要注意代码中的 `connect` 指定的 VOP 必须与 HDMI 绑定的 VOP 一致（详见 3.1.2），否则可能出现花屏等问题。
```
route_hdmi: route-hdmi {
    status = "disabled";
    logo,uboot = "logo.bmp";
    logo,kernel = "logo_kernel.bmp";
    logo,mode = "center";
    charge_logo,mode = "center";
    connect = <&vopb_out_hdmi>;
};
```

#### 2.1.4 VOP dclk 绑定 PLL
HDMI 绑定的 VOP/VP dclk，需要指定对应的 PLL 作为时钟源。在 RK 的平台中，RK322X/RK3328/RK3528 HDMI 都与固定的 VOP/VP 绑定，且固定使用 HDMI PHY PLL 作为 dclk 时钟源，无需配置。

##### 2.1.4.1 RK3288 绑定 PLL
RK3288 VOPB/VOPL dclk 可以挂载到 GPLL/CPLL。由于这两个 PLL 都不能小数分频，所以 RK3288 的 HDMI 只能输出 594M 整数分频的标准分辨率（如 4K60/1080P60/720P60）。举例 VOPB dclk 挂载到 GPLL，VOPL dclk 挂载到 CPLL 如下：
```dts
&vopb {
    assigned-clocks = <&cru DCLK_VOP0>;
    assigned-clock-parents = <&cru PLL_GPLL>;
};
&vopl {
    assigned-clocks = <&cru DCLK_VOP1>;
    assigned-clock-parents = <&cru PLL_CPLL>;
};
```

##### 2.1.4.2 RK3399 绑定 PLL
RK3399 的 HDMI 所绑定的 VOP dclk 需要挂载到 VPLL 上，若是双显则需要将另一个 VOP dclk 挂到 CPLL，这样可以分出任意频率的 dclk，实现双显任意分辨率的支持。如当 HDMI 绑定到 VOPB 时配置：
```dts
&vopb {
    assigned-clocks = <&cru DCLK_VOP0_DIV>;
    assigned-clock-parents = <&cru PLL_VPLL>;
};
&vopl {
    assigned-clocks = <&cru DCLK_VOP1_DIV>;
    assigned-clock-parents = <&cru PLL_CPLL>;
};
```

当 HDMI 绑定到 VOPL 时配置：
```dts
&vopb {
    assigned-clocks = <&cru DCLK_VOP0_DIV>;
    assigned-clock-parents = <&cru PLL_CPLL>;
};
&vopl {
    assigned-clocks = <&cru DCLK_VOP1_DIV>;
    assigned-clock-parents = <&cru PLL_VPLL>;
};
```

##### 2.1.4.3 RK356X 绑定 PLL
RK356X HDMI 所绑定的 VP dclk 必须需要挂载到 HPLL 上，举例 VP0 dclk：
```dts
&vop {
    assigned-clocks = <&cru DCLK_VOP0>;
    assigned-clock-parents = <&pmucru PLL_HPLL>;
};
```

##### 2.1.4.4 RK3588/RK3576 绑定 PLL
RK3588 如果需要输出 4K60 以上的分辨率，需要将 VOP ACLK 设置为 800MHz：
```dts
&vop {
    assigned-clocks = <&cru ACLK_VOP>;
    assigned-clock-rates = <800000000>;
    status = "okay";
};

```

RK3588 HDMI 0/1 可以绑定 VP 0/1/2，详见 2.1.2。这三个 VP dclk 都可以挂载到 GPLL/HDMI0 PHY PLL/HDMI 1 PHY PLL/V0PLL。

具体的分配策略和相关限制可以参考《Rockchip_Developer_Guide_DRM_Display_Driver_CN.pdf》中的 10.11 章节。

RK3588/RK3576 如果要支持非标准分辨率，需要指定 PHY PLL 作为 VOP dclk 时钟源。

RK3588 DTS 配置如下：
```
&display_subsystem {
 clocks = <&hdptxphy_hdmi_clk0>, <&hdptxphy_hdmi_clk1>;
 clock-names = "hdmi0_phy_pll", "hdmi1_phy_pll";
};
&hdptxphy_hdmi_clk0 {
 status = "okay";
};
&hdptxphy_hdmi_clk1 {
 status = "okay";
};
```

RK3576 DTS 配置如下：

```
&display_subsystem {
 clocks = <&hdptxphy_hdmi>;
 clock-names = "hdmi0_phy_pll";
};
```
DTS 时钟分配是否生效，可以使用命令 `cat /sys/kernel/debug/clk/clk_summary` 进行确认。

以 VP0 的 dclk 绑定 HDMI0 PHY PLL 为例，dclk_vop0 在时钟树中挂在 `clk_hdmiphy_pixel0` 下：
```dts
 xin24m                             26       28       0   24000000         0 
    0 50000
   clk_usbdpphy_mipidcpphy_ref       2       2       0   24000000         0 
    0 50000
   clk_usb2phy_hdptxrxphy_ref       11       11       0   24000000         0 
    0 50000
       clk_hdmiphy_pixel0             2       3       0   594000000         0 
    0 50000
         dclk_vop0                   2       4       0   594000000         0 
    0 50000
```

#### 2.1.5 RK3288/RK3399/RK3528/RK356X HDCP 使能
##### 2.1.5.1 HDCP 1.4 使能
```
&hdmi {
 hdcp1x-enable = <1>;
}
```

使能 HDCP 1.4 后还需要通过工具烧录对应 key，工具可以在 SDK 的 RKTools 目录下获取。不同 Android 工具可能不同，可向 FAE 咨询，使用说明见工具的 readme。对应的 Key 需要客户自行向 Digital Content Protection LLC 申请。

通过以下节点可以开启或关闭 HDCP 功能：
```dts
echo 1 > /sys/class/misc/hdmi_hdcp1x/enable
```

1 表示开启 HDCP 功能，0 表示关闭 HDCP 功能。

开启 HDCP 功能后，可以通过以下方法确认 HDCP 是否生效：
```bash
cat /sys/class/misc/hdmi_hdcp1x/status
```

不同值对应的 HDCP 状态如下：
- `hdcp disable`：HDCP 功能关闭。
- `hdcp_auth_start`：HDCP 开始认证。
- `hdcp_auth_success`：HDCP 认证成功，开始传输加密的视频数据。
- `hdcp_auth_fail`：HDCP 认证失败。

分别找一台不支持 HDCP 1.4 的电视和支持 HDCP 1.4 的电视。若开启 HDCP 功能后，不支持 HDCP 1.4 的电视显示粉屏而支持 HDCP 1.4 的电视可以正常显示，则说明 HDCP 工作正常。

##### 2.1.5.2 HDCP 2.2 使能
RK3288/RK3399/RK3528/RK356X 支持 DRM 框架下的 HDCP 2.2 功能，需要注意的是，想使用 HDCP 2.2 功能必须确保 HDCP 1.4 工作正常。想要开启该功能需要以下步骤：
1. 向 FAE 申请 HDCP 2.2 Key 打包工具以及补丁包，按照 readme 将 Key 打包并打上补丁。
2. 重新编译并烧写后，使用以下节点开启/关闭 HDCP 2.2 功能：
   ```bash
   echo 1 > /sys/class/misc/hdcp2_node/enable
   
   ```

使能后可以通过以下方法判断 HDCP 2.2 是否正常工作：
- 分别找一台不支持 HDCP 2.2 的电视和支持 HDCP 2.2 的电视。若开启 HDCP 功能后，不支持 HDCP 2.2 的电视显示白屏而支持 HDCP 2.2 的电视可以正常显示，则说明 HDCP 工作正常。

通过以下节点获取 HDCP 2.2 工作状态：
```bash
cat /sys/class/misc/hdcp2_node/status
```

 - hdcp2 auth sucess: 认证成功。
 - no enable hdcp2: HDCP 2.2 已关闭。
 - hdcp2 no auth: HDMI 未连接或是设备不支持 HDCP 2.2。
 - no already auth sucess: 认证失败。

如果出现了认证失败的情况，请在 redmine 上传以下 Log 文件：
- `/cache/hdcp_tx0.log`
- 或是执行以下命令抓取 Log：
  ```bash
  logcat -s HDMI_HDCP2
  dmesg | grep hdcp
  ```

#### 2.1.6 RK3588/RK3576 HDCP 使能
RK3588/RK3576 支持 HDCP 1.4/2.3，两者的使能需要调用 DRM 框架的 HDCP 接口。通过配置 DRM PROPERTY 进行 HDCP 开关以及 HDCP 状态查询。相关 DEMO 代码 `hdcptest.c` 请向业务申请。调试时，可以使用 `modetest` 进行测试。

Android 系统 `modetest` 代码路径为：
```
external/libdrm/tests/modetest/
```

Linux 系统可以使用 buildroot 编译的 `modetest`，编译 rootfs 之后，代码路径为：
```
buildroot/output/rockchip_rk3588/build/libdrm-2.4.115/testst/modetest/
```

使用 `modetest` 测试 HDCP，需要使用以下属性：

```
Content Protection:
               flags: enum
               enums: Undesired=0 Desired=1 Enabled=2
               value: 2
Undesired：关闭hdcp
Desired：开启hdcp
Enabled：hdcp已经开启并认证成功
hdcp_encrypted:
               flags: range
               values: 0 2
               value: 2
hdcp认证等级：
   0：hdcp未认证。
   1：hdcp1.4。
   2：hdcp2.3。
```

HDCP 的开关可以使用命令 modetest -w 进行，使用方式举例：

  ```bash
  modetest -w 423:"Content Protection":1
    ------->开启hdcp，优先2.3，若电视不支持2.3或2.3认证失败，自动切换到1.4。
    modetest -w 423:"Content Protection":0
    ------->关闭hdcp。
  ```
  其中 423 为 HDMI 的 connector id ,可以使用命令 modetest -c 进行查询：
   ```
        rk3588_s:/ # modetest -c
trying to open device 'i915'...failed
trying to open device 'amdgpu'...failed
trying to open device 'radeon'...failed
trying to open device 'nouveau'...failed
trying to open device 'vmwgfx'...failed
trying to open device 'omapdrm'...failed
trying to open device 'exynos'...failed
trying to open device 'tilcdc'...failed
trying to open device 'msm'...failed
trying to open device 'sti'...failed
trying to open device 'tegra'...failed
trying to open device 'imx-drm'...failed
trying to open device 'rockchip'...done
Connectors:
id     encoder status         name           size (mm)       modes   encoders
423     422     connected       HDMI-A-1       0x0             6       422
 modes:
       name refresh (Hz) hdisp hss hse htot vdisp vss vse vtot)
 1920x1080 60 1920 2008 2052 2200 1080 1084 1089 1125 148500 flags: phsync, 
pvsync; type: preferred
 1920x1080 50 1920 2448 2492 2640 1080 1084 1089 1125 148500 flags: phsync, 
pvsync; type: driver
 1280x720 60 1280 1390 1430 1650 720 725 730 750 74250 flags: phsync, pvsync; 
type: driver
 1280x720 50 1280 1720 1760 1980 720 725 730 750 74250 flags: phsync, pvsync; 
type: driver
 720x576 50 720 732 796 864 576 581 586 625 27000 flags: nhsync, nvsync; type: 
driver
 720x480 60 720 736 798 858 480 489 495 525 27000 flags: nhsync, nvsync; type: 
driver
   ```


详细 HDCP 的使用说明见《Rockchip_RK3588_Developer_Guide_HDCP_CN.pdf》。

#### 2.1.7 DDC 的 I2C 速率配置
当插拔 HDMI 读取 EDID 失败时，可以尝试降低 DDC I2C 的速率。

```
[ 163.026743] dwhdmi-rockchip fdea0000.hdmi: i2c read time out!
[ 163.130075] dwhdmi-rockchip fdea0000.hdmi: i2c read time out!
[ 163.233407] dwhdmi-rockchip fdea0000.hdmi: i2c read time out!
[ 163.336741] dwhdmi-rockchip fdea0000.hdmi: i2c read time out!
[ 163.440074] dwhdmi-rockchip fdea0000.hdmi: i2c read time out!
[ 163.440110] dwhdmi-rockchip fdea0000.hdmi: failed to get edid
```

目前 I2C 速率通过 clk 高电平和低电平的时间来调整，如下为实测 I2C 速率为 50 kHz 时的配置。

```dts
&hdmi {
    ddc-i2c-scl-high-time-ns = <9625>;
    ddc-i2c-scl-low-time-ns = <10000>;
}
```
调整 I2C 速率只需将这两个值按对应的比例修改即可，例如调整速率为 100 kHz：


```dts
&hdmi {
    ddc-i2c-scl-high-time-ns = <4812>;
    ddc-i2c-scl-low-time-ns = <5000>;
}
```

#### 2.1.8 HDMI 信号强度配置
由于硬件走线差异，不同板子可能需要不同的驱动强度配置。当遇到电视兼容性问题时可以尝试进行修改。



##### 2.1.8.1 RK322X/RK3328/RK3528/RK356X 信号强度配置

###### 2.1.8.1.1 RK322X 信号配置

RK322X HDMI 信号强度可通过 dts 的 `rockchip,phy-table` 属性配置，格式定义如下：

```
rockchip,phy-table =
               <165000000 0xaa 0x00 0x44 0x44 0x00 0x00 0x00
                           0x00 0x00 0x00 0x00 0x00 0x00 0x00>,
               <340000000 0xaa 0x15 0x6a 0xaa 0x00 0x00 0x00
                           0x00 0x00 0x00 0x00 0x00 0x00 0x00>,
               <594000000 0xaa 0x15 0x7a 0xaa 0x00 0x00 0x00
                           0x00 0x00 0x00 0x00 0x00 0x00 0x00>;
```
以上表 340000000 这一栏为例：

| 参数 | 说明 |
| --- | --- |
| 340000000 | 表示该栏参数所对应的最大 tmds clock 频率，适用于 tmds clock 低于 165Mhz 的分辨率 |
| 0xaa | data lane0 slew rate: `bit[1:0]` <br/> data lane1 slew rate: `bit[3:2]` <br/> data lane2 slew rate: `bit[5:4]` <br/> clock lane slew rate: `bit[7:6]` <br/> slew rate: 调整上升沿和下降沿时间，值越大，时间越短 |
| 0x15 | data lane0 pre-emphasis: bit[1:0] <br/> data lane1 pre-emphasis: bit[3:2] <br/> data lane2 pre-emphasis: bit[5:4] <br/> pre-emphasis: 预加重，值越大预加重越大 |
| 0x6a | data lane2 swing: bit[3:0] <br/> clock lane swing: bit[7:4] <br/> swing: 幅值，值越大幅值越大 |
| 0xaa | data lane0 swing: bit[3:0] <br/> data lane1 swing: bit[7:4] <br/> swing: 幅值，值越大幅值越大 |
| 后续所有0 | 无效 |

#### 2.1.8.1.2 RK3328 信号配置

RK3328 HDMI 信号强度可通过 dts 的 `rockchip,phy-table` 属性配置，格式定义如下：

```markdown
rockchip,phy-table =
               <165000000 0x07 0x0a 0x0a 0x0a 0x00 0x00 0x08
                           0x08 0x08 0x00 0xac 0xcc 0xcc 0xcc>,
               <340000000 0x0b 0x0d 0x0d 0x0d 0x07 0x15 0x08
                           0x08 0x08 0x3f 0xac 0xcc 0xcd 0xdd>,
               <594000000 0x10 0x1a 0x1a 0x1a 0x07 0x15 0x08
                           0x08 0x08 0x00 0xac 0xcc 0xcc 0xcc>;
```
以上表 340000000 这一栏为例：

| 参数 | 说明 |
| --- | --- |
| 340000000 | 表示该栏参数所对应的最大 tmds clock 频率，适用于 tmds clock 低于 165Mhz 的分辨率 |
| 0x0b | clock lane swing <br/> swing: 幅值，值越大幅值越大 |
| 0x0d | data lane2 swing <br/> swing: 幅值，值越大幅值越大 |
| 0x0d | data lane1 swing <br/> swing: 幅值，值越大幅值越大 |
| 0x0d | data lane0 swing <br/> swing: 幅值，值越大幅值越大 |
| 0x07 | data lane0 pre-emphasis mode: bit[0] <br/> data lane1 pre-emphasis mode: bit[1] <br/> data lane2 pre-emphasis mode: bit[2] <br/> pre-emphasis mode: 0--full mode 1--half mode |
| 0x15 | data lane0 pre-emphasis level: bit[1:0] <br/> data lane1 pre-emphasis level: bit[3:2] <br/> data lane2 pre-emphasis level: bit[5:4] <br/> pre-emphasis level: 预加重强度，值越大加重强度越大，为0时关闭预加重 |
| 0x08 | data lane2 pre-emphasis swing: bit[4:0] <br/> pre-emphasis swing: 预加重幅值，值越大幅值越大 |
| 0x08 | data lane1 pre-emphasis swing: bit[4:0] <br/> pre-emphasis swing: 预加重幅值，值越大幅值越大 |
| 0x08 | data lane0 pre-emphasis swing: bit[4:0] <br/> pre-emphasis swing: 预加重幅值，值越大幅值越大 |
| 0x3f | data lane0 pre-emphasis driver path gate: bit[0], main driver path gate: bit[1] <br/> data lane1 pre-emphasis driver path gate: bit[2], main driver path gate: bit[3] <br/> data lane2 pre-emphasis driver path gate: bit[4], main driver path gate: bit[5] <br/> clock lane pre-emphasis driver path gate: bit[6], main driver path gate: bit[7] <br/> 写1 enable path |
| 0xac | data lane2 pre-emphasis second delay gate: bit[0], pre-emphasis first delay gate: bit[1] <br/> data lane2 main driver second delay gate: bit[2], main driver first delay gate: bit[3] <br/> clock lane pre-emphasis second delay gate: bit[4], pre-emphasis first delay gate: bit[5] <br/> clock lane main driver second delay gate: bit[6], main driver first delay gate: bit[7] <br/> 写1 enable delay |
| 0xcc | data lane0 pre-emphasis second delay gate: bit[0], pre-emphasis first delay gate: bit[1] <br/> data lane0 main driver second delay gate: bit[2], main driver first delay gate: bit[3] <br/> data lane1 pre-emphasis second delay gate: bit[4], pre-emphasis first delay gate: bit[5] <br/> data lane1 main driver second delay gate: bit[6], main driver first delay gate: bit[7] <br/> 写1 enable delay |
| 0xcd | data lane2 delay time: bit[3:0] <br/> clock lane delay time: bit[7:4] <br/> delay time：延迟时间，值越大延迟越大 |
| 0xdd | data lane0 delay time: bit[3:0] <br/> data lane1 delay time: bit[7:4] <br/> delay time：延迟时间，值越大延迟越大 |

#### 2.1.8.1.3 RK3528 信号配置

RK3528 HDMI 信号强度可通过 dts 的 `rockchip,phy-table` 属性配置，格式定义如下：

```markdown
rockchip,phy-table =
               <165000000 0x03 0x04 0x0c 0x12 0x00 0x00 0x00
                           0x00 0x00 0x00 0x00 0x00 0x00 0x00>,
               <340000000 0x03 0x04 0x0c 0x12 0x00 0x00 0x00
                           0x00 0x00 0x00 0x00 0x00 0x00 0x00>,
               <594000000 0x02 0x08 0x0d 0x18 0x00 0x00 0x00
                           0x00 0x00 0x00 0x00 0x00 0x00 0x00>;
```
以上表 340000000 这一栏为例：

| 参数 | 说明 |
| --- | --- |
| 340000000 | 表示该栏参数所对应的最大 tmds clock 频率，适用于 tmds clock 低于 165Mhz 的分辨率 |
| 0x03 | clock lane current bias control: <br/> 0x00:320uA 0x0f:920uA <br/> 步进40uA |
| 0x04 | data lane current bias control: <br/> 0x00:320uA 0x0f:920uA <br/> 步进40uA |
| 0x0c | clock lane swing: bit[4:0] <br/> swing: 幅值，值越大幅值越大 |
| 0x12 | data lane swing: bit[4:0] <br/> ESD event detection threshold: bit[7:5] <br/> swing: 幅值，值越大幅值越大 <br/> ESD event detection threshold: 触发ESD事件阈值，值越大阈值越大 |
| 0x00 | Pre-cursor pre-emphasis: bit[2:0] <br/> Post-cursor pre-emphasis: bit[7:4] <br/> pre-emphasis: 预加重，值越大预加重越强，0值关闭预加重 |

### 2.1.8.2 RK3288/RK3368/RK3399/RK356X 信号配置

RK3288/RK3368/RK3399/RK356X HDMI 信号强度可通过 dts 的 `rockchip,phy-table` 属性配置，格式定义如下：

```markdown
<PIXELCLOCK PHY_CKSYMTXCTRL PHY_TXTERM PHY_VLEVCTRL>
```

- **PIXELCLOCK**：表示该行参数所对应的像素时钟频率。
- **PHY_CKSYMTXCTRL**：寄存器 (0x09) 值用于调整 HDMI 信号的预加重和上升斜率。
  - Bit[0]：CLOCK 信号使能。
  - Bit[3:1]：DATA 信号预加重。
  - Bit[4:5]：DATA 信号sloop boost。
- **PHY_TXTERM**：寄存器 (0x19) 值用于调整端接电阻值。
  - Bit[0:2]：值越大，端接电阻值越大。
- **PHY_VLEVCTRL**：寄存器 (0x0e) 值用于调整 HDMI 的信号幅度。
  - Bit[0:4]：tmds_clk +/- 信号幅度，值越低，信号幅度越大。
  - Bit[5:9]：tmds_data +/- 信号幅度，值越低，信号幅度越大。

例如：

```dts
&hdmi {
rockchip,phy-table =
 <74250000 0x8009 0x0004 0x0272>,
 <165000000 0x802b 0x0004 0x0209>,
 <297000000 0x8039 0x0005 0x028d>,
 <594000000 0x8039 0x0000 0x019d>,
 <000000000 0x0000 0x0000 0x0000>;
};
```

其中 `<74250000 0x8009 0x0004 0x0272>`,表示 pixelclock 为 74.25MHz (720p 分辨率)，以下是 PHY_CKSYMTXCTRL 寄存器值为 0x8009，PHY_TXTERM 值为 0x0004，PHY_VLEVCTRL 值为 0x0272。

修改后也可用 `cat /sys/kernel/debug/dw-hdmi/phy` 命令查看对应的寄存器值确认是否有修改成功。

### 2.1.9 新增特殊分辨率

#### 2.1.9.1 新增特殊分辨率时序

DRM 框架目前代码已经支持了绝大部分分辨率时序，但部分 HDMI 屏幕旋转的场景下，可能还有一些特殊分辨率不支持。需要在 `kernel/drivers/gpu/drm/drm_edid.c` 中的 `drm_dmt_modes` 的末尾新增项目：

```markdown
/* 0x58 - 4096x2160@59.94Hz RB */
 { DRM_MODE("4096x2160", DRM_MODE_TYPE_DRIVER, 556188, 4096, 4104,
   4136, 4176, 0, 2160, 2208, 2216, 2222, 0,
   DRM_MODE_FLAG_PHSYNC | DRM_MODE_FLAG_NVSYNC) },
```

| 参数 | 说明 |
| --- | --- |
| "4096x2160" | mode name，为分辨率的 hdisplay x vdisplay |
| DRM_MODE_TYPE_DRIVER | mode type，配置为 DRM_MODE_TYPE_DRIVER |
| 556188 | 像素时钟 |
| 4096 | 行有效像素 |
| 4104 | 行同步起始像素 |
| 4136 | 行同步结束像素 |
| 4176 | 一行总像素 |
| 0 | hskew，通常为 0 |
| 2160 | 帧有效行 |
| 2208 | 帧同步开始行 |
| 2216 | 帧同步结束行 |
| 2222 | 一帧总行数 |
| 0 | vscan，通常为 0 |
| vrefresh | 显示设备帧率 |
| DRM_MODE_FLAG_PHSYNC | hsync 极性 |
| DRM_MODE_FLAG_NVSYNC | vsync 极性 |

各项参数描述如上表，具体时序的含义可以参考 3.2.4 节。
#### 2.1.9.2 RK322X/RK3328/RK3528 新增 PLL 配置

RK322X/RK3328/RK3528 芯片新增特殊分辨率还需要新增 HDMI-PHY-PLL 的配置。具体配置的计算过程请参考 2.1.5.2 节。

DRM 框架需要新增 PHY 配置时，需在 PRE-PLL 的配置 TABLE：`pre_pll_cfg_table` 中新增对应的配置，而 POST-PLL 的配置 TABLE：`post_pll_cfg_table` 目前配置已经涵盖了 PHY 所支持的所有分辨率，无需再新增配置。

路径为：


```markdown
kernel/drivers/phy/rockchip/phy-Rockchip-inno-hdmi-phy.c
```

```markdown
static const struct pre_pll_config pre_pll_cfg_table[] = {
 { 27000000,  27000000, 1,  90, 3, 2, 2, 10, 3, 3,  4, 0, 0},
 { 27000000,  33750000, 1,  90, 1, 3, 3, 10, 3, 3,  4, 0, 0},
 { 40000000,  40000000, 1,  80, 2, 2, 2, 12, 2, 2,  2, 0, 0},
 { 40000000,  50000000, 1, 100, 2, 2, 2,  1, 0, 0, 15, 0, 0},
 { 59341000,  59341000, 1,  98, 3, 1, 2,  1, 3, 3,  4, 0, 0xE6AE6B},
 { 59400000,  59400000, 1,  99, 3, 1, 1,  1, 3, 3,  4, 0, 0},
 { 59341000,  74176250, 1,  98, 0, 3, 3,  1, 3, 3,  4, 0, 0xE6AE6B},
 { 59400000,  74250000, 1,  99, 1, 2, 2,  1, 3, 3,  4, 0, 0},
 { 65000000,  65000000, 1, 130, 2, 2, 2,  1, 0, 0, 12, 0, 0},
 { 65000000,  81250000, 3, 325, 0, 3, 3,  1, 0, 0, 10, 0, 0},
 { 71000000,  71000000, 3, 284, 0, 3, 3,  1, 0, 0,  8, 0, 0},
 { 71000000,  88750000, 3, 355, 0, 3, 3,  1, 0, 0, 10, 0, 0},
 { 74176000,  74176000, 1,  98, 1, 2, 2,  1, 2, 3,  4, 0, 0xE6AE6B},
 { 74250000,  74250000, 1,  99, 1, 2, 2,  1, 2, 3,  4, 0, 0},
 { 74176000,  92720000, 4, 494, 1, 2, 2,  1, 3, 3,  4, 0, 0x816817},
 { 74250000,  92812500, 4, 495, 1, 2, 2,  1, 3, 3,  4, 0, 0},
 { 83500000,  83500000, 2, 167, 2, 1, 1,  1, 0, 0,  6, 0, 0},
 { 83500000, 104375000, 1, 104, 2, 1, 1,  1, 1, 0,  5, 0, 0x600000},
 { 85750000,  85750000, 3, 343, 0, 3, 3,  1, 0, 0,  8, 0, 0},
 { 88750000,  88750000, 3, 355, 0, 3, 3,  1, 0, 0,  8, 0, 0},
 { 88750000, 110937500, 1, 110, 2, 1, 1,  1, 1, 0,  5, 0, 0xF00000},
 {108000000, 108000000, 1,  90, 3, 0, 0,  1, 0, 0,  5, 0, 0},
 {108000000, 135000000, 1,  90, 0, 2, 2,  1, 0, 0,  5, 0, 0},
 {119000000, 119000000, 1, 119, 2, 1, 1,  1, 0, 0,  6, 0, 0},
 {119000000, 148750000, 1,  99, 0, 2, 2,  1, 0, 0,  5, 0, 0x2AAAAA},
 {148352000, 148352000, 1,  98, 1, 1, 1,  1, 2, 2,  2, 0, 0xE6AE6B},
 {148500000, 148500000, 1,  99, 1, 1, 1,  1, 2, 2,  2, 0, 0},
 {148352000, 185440000, 4, 494, 0, 2, 2,  1, 3, 2,  2, 0, 0x816817},
 {148500000, 185625000, 4, 495, 0, 2, 2,  1, 3, 2,  2, 0, 0},
 {162000000, 162000000, 1, 108, 0, 2, 2,  1, 0, 0,  4, 0, 0},
 {162000000, 202500000, 1, 135, 0, 2, 2,  1, 0, 0,  5, 0, 0},
 {296703000, 296703000, 1,  98, 0, 1, 1,  1, 0, 2,  2, 0, 0xE6AE6B},
 {297000000, 297000000, 1,  99, 0, 1, 1,  1, 0, 2,  2, 0, 0},
 {296703000, 370878750, 4, 494, 1, 2, 0,  1, 3, 1,  1, 0, 0x816817},
 {297000000, 371250000, 4, 495, 1, 2, 0,  1, 3, 1,  1, 0, 0},
 {593407000, 296703500, 1,  98, 0, 1, 1,  1, 0, 2,  1, 0, 0xE6AE6B},
 {594000000, 297000000, 1,  99, 0, 1, 1,  1, 0, 2,  1, 0, 0},
 {593407000, 370879375, 4, 494, 1, 2, 0,  1, 3, 1,  1, 1, 0x816817},
 {594000000, 371250000, 4, 495, 1, 2, 0,  1, 3, 1,  1, 1, 0},
 {593407000, 593407000, 1,  98, 0, 2, 0,  1, 0, 1,  1, 0, 0xE6AE6B},
 {594000000, 594000000, 1,  99, 0, 2, 0,  1, 0, 1,  1, 0, 0},
 {     ~0UL,    0, 0,   0, 0, 0, 0,  0, 0, 0,  0, 0, 0}
};
static const struct post_pll_config post_pll_cfg_table[] = {
 {33750000,  1, 40, 8, 1},
 {33750000,  1, 80, 8, 2},
 {33750000,  1, 10, 2, 4},
 {74250000,  1, 40, 8, 1},
 {74250000, 18, 80, 8, 2},
 {74250000,  1, 20, 4, 8},
 {148500000, 2, 40, 4, 3},
 {148500000, 1, 10, 2, 8},
 {297000000, 4, 40, 2, 3},
 {297000000, 2, 20, 2, 8},
 {594000000, 8, 40, 1, 3},
 {594000000, 4, 20, 1, 8},
 {     ~0UL, 0,  0, 0, 0}
};
```
struct pre_pll_config 和 struct post_pll_config 定义如下，LINUX 4.4/4.19 内核相当于拆分
了 3.10 内核中的 struct ext_pll_config_tab 。

```markdown
struct pre_pll_config {
 unsigned long pixclock;
 unsigned long tmdsclock;
 u8 prediv;
 u16 fbdiv;
 u8 tmds_div_a;
 u8 tmds_div_b;
 u8 tmds_div_c;
 u8 pclk_div_a;
 u8 pclk_div_b;
 u8 pclk_div_c;
 u8 pclk_div_d;
 u8 vco_div_5_en;
 u32 fracdiv;
};
struct post_pll_config {
 unsigned long tmdsclock;
 u8 prediv;
 u16 fbdiv;
 u8 postdiv;
 u8 version;
};
```

pre_pll_config 各项参数说明见下表：


| 参数 | 说明 |
| --- | --- |
| pixclock | HDMI输出分辨率的pixel clock |
| tmdsclock | HDMI输出分辨率的tmds clock |
| prediv | pre-pll-pre-divider |
| fbdiv | pre-pll-feedback-divider |
| tmds_div_a | tmds-dividera |
| tmds_div_b | tmds-dividerb |
| tmds_div_c | tmds-dividerc |
| pclk_div_a | pclk-dividera |
| pclk_div_b | pclk-dividerb |
| pclk_div_c | pclk-dividerc |
| pclk_div_d | pclk-dividerd |
| vco_div_5_en | pin_hd20_pclk是否直接由VCO / 5所得，特定clock情况下使用 |
| fracdiv | pre-pll-fractional-feedback-divider |

`post_pll_config` 各项参数说明见下表：

| 参数 | 说明 |
| --- | --- |
| tmdsclock | HDMI输出分辨率的tmds clock |
| prediv | post-pll-pre-divider |
| fbdiv | post-pll-feedback-divider |
| postdiv | post-pll-post-divider |
| version | 芯片版本，POST-PLL配置需根据时钟和芯片版本确定，其值含义： <br/> 1--RK322X与RK322XH早期样品，tmds clock为74.25Mhz及以下的配置 <br/> 2--RK322XH量产芯片，tmds clock为74.25Mhz及以下的配置 <br/> 3--RK322X与RK322XH芯片，tmds clock为74.25Mhz以上的配置，两者配置相同 <br/> 4--RK322X部分芯片POST VCO为1080Mhz时不稳定，为270Mhz时工作稳定，需要特别区分出来 <br/> 8--RK3528专有配置 |

以 TMDS CLOCK 为 74.25Mhz，RK3328 量产芯片为例，POST-PLL 配置选择方法如下：
  1. 首先在 post_pll_cfg_table 中根据 TMDS CLOCK 找到对应的区间。如 TMDS CLOCK 为 
    74.25Mhz 时，`33.75Mhz < TMDS CLOCK <= 74.25Mhz`,找到对应的二项：
    ```
    {74250000,  1, 40, 8, 1},
    {74250000, 18, 80, 8, 2},
    ```
    2. 根据芯片版本进一步选择，此时是 RK3328 量产芯片，`TMDS CLOCK <= 74.25Mhz`，所以 version 
的值应选择 2，所以最终选择：
    ```
    {74250000, 18, 80, 8, 2},
    ```
    3. 最终配置值为：`prediv = 18，fbdiv = 80， postdiv = 8`。在 LINUX 3.10 内核的驱动中对应 
struct ext_pll_config_tab 中的 ppll_nd, ppll_nf, ppll_no 三项。由于是 RK3328 量产芯片切 
`TMDS CLOCK <= 74.25Mhz`，所以需要添加在 RK322XH_V1_PLL_TABLE 当中。

#### 2.1.9.3 RK3288/RK3368/RK3399/RK356X 新增 PLL 配置

RK3288/RK3368/RK3399/RK356X 的 HDMI-PHY-PLL 配置保存在 `rockchip_mpll_cfg` 和 `rockchip_mpll_cfg_420` 中：
```dts
static const struct dw_hdmi_mpll_config rockchip_mpll_cfg[] = {
 {
 30666000, {
 { 0x00b3, 0x0000 },
 { 0x2153, 0x0000 },
 { 0x40f3, 0x0000 },
 },
 }, {
 36800000, {
 { 0x00b3, 0x0000 },
 { 0x2153, 0x0000 },
 { 0x40a2, 0x0001 },
 },
 }, {
 46000000, {
 { 0x00b3, 0x0000 },
 { 0x2142, 0x0001 },
 { 0x40a2, 0x0001 },
 },
 }, {
```

路径为：

```markdown
kernel/drivers/gpu/drm/rockchip/dw_hdmi-rockchip.c
```
其中 rockchip_mpll_cfg 为 RGB/YUV444/YUV422 的配置， rockchip_mpll_cfg_420 为 YUV420 的
配置。
结构体 dw_hdmi_mpll_config 定义如下：

```markdown
struct dw_hdmi_mpll_config {
        unsigned long mpixelclock;
        struct {
                u16 cpce;
                u16 gmp;
       } res[DW_HDMI_RES_MAX];
};
```
各项参数说明如下：
| 参数 | 说明 |
| --- | --- |
| mpixelclock | 像素时钟 |
| cpce | OPMODE_PLLCFG 寄存器值 |
| gmp | PLLGMPCTRL 寄存器值 |

以 rockchip_mpll_cfg 中的第一项配置为例：

```markdown
static const struct dw_hdmi_mpll_config rockchip_mpll_cfg[] = {
 {
 30666000, {
 { 0x00b3, 0x0000 },
 { 0x2153, 0x0000 },
 { 0x40f3, 0x0000 },
 },
 }, {
```

- **HDMI 驱动会判断是否颜色格式为 YUV420**，若是，则选择 `rockchip_mpll_cfg_420`，否则选择 `rockchip_mpll_cfg`。
- **30666000** 表示像素时钟为 30666000 及以下的分辨率适用该项配置。
- `{0x00b3, 0x0000}`、`{0x2153, 0x0000}`、`{0x40f3, 0x0000}` 三项依次对应色深为 8 BIT、10 BIT、12 BIT（目前 Rockchip 方案实际只支持 8/10 bit 两种模式）情况下使用的配置。

由于参数的取值需要查阅 PHY 的 DATASHEET 获取，若需要新增 HDMI-PHY-PLL 配置，可以向 FAE 提
出所需的像素时钟。然后根据上述的规则，将新增的配置添加到 rockchip_mpll_cfg 或 
rockchip_mpll_cfg_420 中。

#### 2.1.9.4 RK3588/RK3576 新增 PLL 配置

RK3588/RK3576 驱动支持自动计算 PLL 频率，当新增分辨率时不需要特意配置。PLL 分配策略详见 2.1.4。

### 2.1.10 打开音频

3368 和 3288 默认 HDMI 声卡和 Codec 公用，需确认配置如下：

```markdown
&hdmi_analog_sound {
   status = "okay";
}
```

3399 目前 HDMI 声卡和 DP 公用：
```
&hdmi_dp_sound {
       status = "okay";
};
```


## 2.2 Android 显示框架配置

### 2.2.1 主副显示接口配置

| 属性 | 功能说明 |
| --- | --- |
| `sys.hwc.device.primary`<br/>`vendor.hwc.device.primary` (Android 9.0 后使用) | 设置显示接口做为主显 |
| `sys.hwc.device.extend`<br/>`vendor.hwc.device.extend` (Android 9.0 后使用) | 设置显示接口做为副显 |

Rockchip在Android显示框架中增加了一些系统属性，用于帮助客户根据需求配置显示。以上两个属性的配置可以加在产品配置目录下的`system.prop`里。

```
device/rockchip/rk3368/rk3368_box/system.prop
```
默认情况下（即以上属性未配置时），不支持热插拔设备（如CVBS/MIPI/LVDS等）会作为主显，支持热插拔设备（如HDMI/DP等）会作为副显。通常主、副显只配置一个显示接口，例如RK3399 BOX SDK默认采用的配置，HDMI作为主显，DP作为副显。

```
sys.hwc.device.primary=HDMI-A
sys.hwc.device.extend=DP
```

9.0之后属性改成：
```
vendor.hwc.device.primary=HDMI-A
vendor.hwc.device.extend=DP
```
当主/副显配置多个显示接口时，优先使用支持热插拔的设备。例如RK3368 BOX SDK默认采用的配置：
```
sys.hwc.device.primary=HDMI-A,TV
```
9.0之后属性改成：
```
vendor.hwc.device.primary=HDMI-A,TV
```
当HDMI插入时，主显使用HDMI作为显示，HDMI拔出时，主显使用CVBS作为显示。

**注意**：由于主显的framebuffer分辨率无法动态更改，所以有两个或以上设备作为主显时，最好设定一个主显的framebuffer分辨率。

关于接口名称可以参考`hardware/rockchip/hwcomposer/drmresources.cpp`里的定义：


```cpp
struct type_name connector_type_names[] = {
    { DRM_MODE_CONNECTOR_Unknown, "unknown" }, //未知接口
    { DRM_MODE_CONNECTOR_VGA, "VGA" }, //VGA
    { DRM_MODE_CONNECTOR_DVII, "DVI-I" }, //DVI，暂不支持
    { DRM_MODE_CONNECTOR_DVID, "DVI-D" }, //DVI，暂不支持
    { DRM_MODE_CONNECTOR_DVIA, "DVI-A" }, //DVI，暂不支持
    { DRM_MODE_CONNECTOR_Composite, "composite" }, //不支持
    { DRM_MODE_CONNECTOR_SVIDEO, "s-video" }, //S端子
    { DRM_MODE_CONNECTOR_LVDS, "LVDS" }, //LVDS
    { DRM_MODE_CONNECTOR_Component, "component" }, //分量信号YPbPr
    { DRM_MODE_CONNECTOR_9PinDIN, "9-pin DIN" }, //不支持
    { DRM_MODE_CONNECTOR_DisplayPort, "DP" }, //DP
    { DRM_MODE_CONNECTOR_HDMIA, "HDMI-A" }, //HDMI A型口
    { DRM_MODE_CONNECTOR_HDMIB, "HDMI-B" }, //HDMI B型口，不支持
    { DRM_MODE_CONNECTOR_TV, "TV" }, //CVBS
    { DRM_MODE_CONNECTOR_eDP, "eDP" }, //EDP
    { DRM_MODE_CONNECTOR_VIRTUAL, "Virtual" }, //不支持
    { DRM_MODE_CONNECTOR_DSI, "DSI" }, //MIPI
};
```

### 2.2.2 主副显示接口查询

可以通过以下两个只读属性来分别查询主副显示输出接口的名称：

| 属性 | 功能说明 |
| --- | --- |
| `sys.hwc.device.main`<br/>`vendor.hwc.device.main` (Android 9.0 后使用) | 查询当前主显的输出接口 |
| `sys.hwc.device.aux`<br/>`vendor.hwc.device.aux` (Android 9.0 后使用) | 查询当前副显的输出接口 |

### 2.2.3 Framebuffer 分辨率配置

Framebuffer分辨率是UI绘制时采用的分辨率，与HDMI输出分辨率不同。Framebuffer分辨率与HDMI输出分辨率不同时，会进行相应的缩放。可以通过配置以下属性来设置Framebuffer的分辨率：
```
persist.sys.framebuffer.main=1920x1080
```
9.0之后属性改为：

```markdown
persist.vendor.framebuffer.main=1920x1080
```

### 2.2.4 分辨率过滤配置

因为初始获取到的全部分辨率过多，有些分辨率对用户来说并不需要，因此在SDK的HWC模块中对分辨率进行了过滤。采用了白名单的方式对分辨率进行过滤：

```
device/rockchip/common/resolution_white.xml
```

HWC中会根据该配置文件对初始的分辨率进行过滤筛选后再传递给上层，该XML文件的每一个`resolution`块定义了一个能够通过过滤的分辨率，其中详细项的定义如下：


| 项定义 | 说明 |
| --- | --- |
| `clock` | 像素时钟 |
| `hdisplay` | 行有效像素 |
| `hsync_start` | 行同步起始像素 |
| `hsync_end` | 行同步结束像素 |
| `htotal` | 一行总像素 |
| `hskew` | 行偏差，通常为0 |
| `vdisplay` | 帧有效行 |
| `vsync_start` | 帧同步开始行 |
| `vsync_end` | 帧同步结束行 |
| `vtotal` | 一帧总行数 |
| `vscan` | 帧扫描信号，通常为0 |
| `vrefresh` | 显示设备帧率 |
| `flags` | flags的定义如下： |
| `DRM_MODE_FLAG_PHSYNC` | `(1<<0)` |
| `DRM_MODE_FLAG_NHSYNC` | `(1<<1)` |
| `DRM_MODE_FLAG_PVSYNC` | `(1<<2)` |
| `DRM_MODE_FLAG_NVSYNC` | `(1<<3)` |
| `DRM_MODE_FLAG_INTERLACE` | `(1<<4)` |
| `vic` | HDMI标准对应定义的VIC值，如HDMI标准中未定义置0 |

具体时序说明见下图：

![alt text](/pdf/rk/hdmi/image-4.png)
### 2.2.5 HDMI 设置选项

系统的设置app可以从UI上对当前的HDMI分辨率等属性进行修改。
要在设置中显示HDMI选项，Android 7.X是默认显示的；Android 8.X及以上需对device下的产品目录，添加配置属性如下：

```markdown
BOARD_SHOW_HDMI_SETTING := true
```

UI界面默认只显示副屏的配置，如要修改，请在`package/apps/Settings`的代码中，对`HdmiSettings.java`，修改如下内容：

```java
int value = SystemProperties.getInt("persist.hdmi.ui.state", ???);
```

代码中`???`的取值为0：显示副屏配置UI；1：显示主屏配置UI；2：显示主副屏2个UI配置。



## 2.3 常用调试方法

### 2.3.1 查看 VOP 状态

执行以下命令可查看 VOP 状态：

```bash
cat /sys/kenrel/debug/dri/0/summary
```

![alt text](/pdf/rk/hdmi/image-5.png)

上是RK3399连接HDMI时上述命令输出的LOG，可以提供三种信息：

- VOP状态：VOPB处于使能状态，VOPL处于禁用状态。
- VOP对应的Connector状态：VOPB输出信号给HDMI，`bus_format = 0x2025`表示YUV444 8bit，`output_mode = 0x0f`表示VOP输出总线为`ROCKCHIP_OUT_MODE_AAAA`，输出1920x1080P60。
    常用的`bus_format`由内核`uapi/linux/media-bus-format.h`定义：

    ```c
    #define MEDIA_BUS_FMT_RGB888_1X24 0x100a //RGB888
    #define MEDIA_BUS_FMT_RGB101010_1X30 0x1018 //RGB101010
    #define MEDIA_BUS_FMT_YUV8_1X24 0x2025 //YUV444 8bit
    #define MEDIA_BUS_FMT_YUV10_1X30 0x2016 //YUV444 10bit
    #define MEDIA_BUS_FMT_UYYVYY8_0_5X24 0x2026 //YUV420 8bit
    #define MEDIA_BUS_FMT_UYYVYY10_0_5X30 0x2027 //YUV420 10bit
    ```

    常用的`output_mode`由内核`drivers/gpu/drm/rockchip/rockchip_drm_vop.h`定义：

    ```c
    #define ROCKCHIP_OUT_MODE_P888 0
    #define ROCKCHIP_OUT_MODE_P666 1
    #define ROCKCHIP_OUT_MODE_P565 2
    #define ROCKCHIP_OUT_MODE_S888 8
    #define ROCKCHIP_OUT_MODE_S888_DUMMY 12
    #define ROCKCHIP_OUT_MODE_YUV420 14
    /* for use special outface */
    #define ROCKCHIP_OUT_MODE_AAAA 15
    ```
- 图层配置信息：`win0`和`win2`使能，`win2` buffer格式为ARGB，buffer大小为29x37；目标窗口为29x37，窗口左上角坐标（385，543）。`Win0` buffer格式为NV12，大小为3840x2160；目标窗口大小为1920x1080，窗口左上角坐标（0，0）。




### 2.3.2 查看 Connector 状态

`/sys/class/drm`目录下可以看到驱动注册的各个显卡。下图是RK3399 BOX平台DRM目录结构，可以看到注册了`card0-HDMI-A-1`和`card0-DP-1`两种显示设备，分别表示HDMI和DP。

![alt text](/pdf/rk/hdmi/image-6.png)
以`card0-HDMI-A-1`为例，其目录下有以下文件：

- `Enabled`：使能状态
- `Status`：连接状态
- `Mode`：当前输出分辨率
- `Modes`：连接设备支持的分辨率列表
- `Audioformat`：连接设备支持的音频格式
- `Edid`：连接设备的EDID，可以通过命令`cat edid > /data/edid.bin`保存下来。

### 2.3.3 查看 HDMI 工作状态

如果包含以下提交，则可以查看HDMI工作状态：
```
commit eaca91814449199b1e6ad0b9fe0bba2215497c97
Author: Zheng Yang <zhengyang@rock-chips.com>
Date:   Mon Nov 27 16:56:21 2017 +0800
   drm: bridge: dw-hdmi: add hdmi status debugfs node
```

使用以下命令查看当前 HDMI 输出状态：
```bash
cat /sys/kernel/debug/dw-hdmi/status
```

![alt text](/pdf/rk/hdmi/image-7.png)
![alt text](/pdf/rk/hdmi/image-8.png)

- HDMI Output Status表示当前PHY状态，只有当PHY使能的时候才会有后续打印。
- Pixel Clk：表示当前输出的像素时钟。
- TMDS Clk：表示当前输出HDMI character rate。
- Color Format：表示输出的颜色格式，取值RGB、YUV444、YUV422、YUV420。
- Color Depth：表示输出的颜色深度，取值8bit、10bit、12bit、16bit。
- Colorimetry：表示输出的颜色标准，取值ITU.BT601、ITU.BIT709、ITU.BT2020。
- EOTF：表示输出的HDR电光转换曲线方式，有如下取值：
    EOTF含义：
    - Unsupported：HDMI不支持发送HDR信息
    - Not Defined：未定义
    - Off：不发送HDR信息
    - SDR：采用SDR曲线
    - ST2084：采用ST2084 EOTF曲线
    - HLG：采用HLG EOTF曲线

`(x0，y0)`、`(x1，y1)`、`(x2，y2)`、`(white x，white y)`、`max lum`、`min lum`、`max cll`、`maxfall`为静态HDR描述子信息，只有EOTF值为SDR、ST2084、HLG值时才会存在。

执行以下命令可以查看HDMI控制器寄存器：

```bash
cat /sys/kenrel/debug/dw-hdmi/ctrl
```

可以使用命令来修改寄存器，例如要修改`0x1000`寄存器为`0xF8`，输入命令：

```bash
echo 1000 f8 > /sys/kenrel/debug/dw-hdmi/ctrl
```

RK3288、RK3368、RK3399平台可以使用以下命令查看HDMI PHY寄存器：

```bash
cat /sys/kenrel/debug/dw-hdmi/phy
```

修改PHY寄存器与控制器类似，例如修改`0x06`寄存器为`0x8002`，输入命令：

```bash
echo 06 8002 > /sys/kenrel/debug/dw-hdmi/phy
```

### 2.3.4 查看 HDMI CEC 状态

执行以下命令查看HDMI CEC状态：

```bash
cat /sys/kernel/debug/cec/cec0/status
```

![alt text](/pdf/rk/hdmi/image-9.png)

打印结果如下：

- `configured`：表示cec adapter是否配置完毕，1为配置完毕，0为未完毕。
- `configuring`：表示cec adapter是否正在配置，1为正在，0为配置完毕或未开始配置。
- `phys_addr`：表示cec的物理地址，未获取物理地址时为`f.f.f.f`。
- `number of LAs`：表示该cec设备的逻辑地址数量，大部分设备为1，极少数为2。
- `LA mask`：表示当前绑定的逻辑地址，具体取值为`(1 << 绑定的逻辑地址)`。如：取值为`0x0010`时，右移4位后为1，则说明当前的逻辑地址为4，取值为`0x0800`时，右移11位后为1，则说明当前的逻辑地址为11。如未绑定任何逻辑地址时为`0x0000`。
- `has CEC follower`：表示当前收到的cec消息交由上层用户空间处理，`in passthrough mode`表示kernel不会处理cec core message，而是全部上报给上层用户空间处理。
- `pending transmits`：表示当前还有多少待发送的cec消息。

### 2.3.5 强制使能/禁用 HDMI

强制使能HDMI：

```bash
echo on > /sys/class/drm/card0-HDMI-A-1/status
```

强制禁用HDMI：

```bash
echo off > /sys/class/drm/card0-HDMI-A-1/status
```

恢复检测热插拔：

```bash
echo detect > /sys/class/drm/card0-HDMI-A-1/status
```

### 2.3.6 命令行设置分辨率

在Android系统中，可以使用命令行设置属性的方式来设置分辨率。此外，当用户在Android的setting中设置分辨率时，对应的属性值也会被设置。

#### 2.3.6.1 Android 7.x & Android 8.x 分辨率设置

|属性 |说明|
| --- | --- |
|persist.sys.resolution.main |设置主屏分辨率，参数为该分辨率的时序，详见 3.2.4节。|
|persist.sys.resolution.aux |设置副屏分辨率，参数为该分辨率的时序，详见 3.2.4节。
|sys.display.timeline | 刷新显示时间线，每次设置新的分辨率需要加一。|

通过`persist.sys.resolution.main`以及`persist.sys.resolution.aux`设置主副屏分辨率，每次设置完更新`sys.display.timeline`（每次加1）再进行移动鼠标等更新UI的操作使新分辨率生效，例子如下：

- 设置4k60：
  ```
     setprop persist.sys.resolution.main 3840x2160@60-3840-4016-4104-4400-2160-
    2168-2178-2250-5
    setprop sys.display.timeline 1
  ```
- 设置1080p60：
    ```
    setprop persist.sys.resolution.main 1920x1080@60-1920-2008-2052-2200-1080-
    1084-1089-1125-5
    setprop sys.display.timeline 2
    ```
- 设置720P60：
    ```
    setprop persist.sys.resolution.main 1280x720@60.00-1390-1430-1650-725-730-
    750-5
    setprop sys.display.timeline 3
    ```
- 设置480P60：
    ```
    setprop persist.sys.resolution.main 720x480@59.94-736-798-858-489-495-
    525-a
    setprop sys.display.timeline 4
    ```


#### 2.3.6.2 Android 9.0 及以上版本分辨率设置

Android 9.0新旧版本配置分辨率的属性有所区别，需要根据HWC版本进行区分。新版Android 9.0 SDK以及更高Android版本都使用新属性。


```markdown
commit 6f772a162893dd0242b6644fa32166e1ac15b2c0
Author: libin <bin.li@rock-chips.com>
Date:   Wed May 12 15:00:05 2021 +0800
   DrmConnector : Add UpdateDisplayMode function
   In order to adapt to the three-screen version.
   The hwc switching resolution will be in accordance with
   the following priority:
     1.persist.vendor.resolution.<Connector-type>-<Connector-ID>
     2.persist.vendor.resolution.main(aux)
     3.baseparameter(if exist)
     4.use "Auto"
   Version: 1.1.137
   Signed-off-by: libin <bin.li@rock-chips.com>
   Change-Id: I73e216047ed5423929d7a091572d717c4ffdf50c
```
当 HWC 代码包含以上提交时，使用的是新版属性：
| 属性 | 说明 |
| --- | --- |
| `persist.vendor.resolution.HDMI-A-0` | 设置HDMI0分辨率，若设置HDMI1则是`HDMI-A-1`，参数为该分辨率的时序，详见3.2.4节 |
| `vendor.display.timeline` | 刷新显示时间线，每次设置新的分辨率需要加1 |

如果 HWC 不含上述属性时，使用的是旧版属性
| 属性 | 说明 |
| --- | --- |
| `persist.vendor.resolution.main` | 设置主屏分辨率，参数为该分辨率的时序，详见3.2.4节 |
| `persist.vendor.resolution.aux` | 设置副屏分辨率，参数为该分辨率的时序，详见3.2.4节 |
| `vendor.display.timeline` | 刷新显示时间线，每次设置新的分辨率需要加1 |


通过`persist.vendor.resolution.main`以及`persist.vendor.resolution.aux`设置主副屏分辨率，每次设置完更新`vendor.display.timeline`（每次加1）再进行移动鼠标等更新UI的操作使新分辨率生效，例子如下：

- 设置4k60：
  ```
    setprop persist.vendor.resolution.main 3840x2160@60-3840-4016-4104-4400-2160-2168-2178-2250-5
    setprop vendor.display.timeline 1
  ```
- 设置1080p60：

    ```bash
    setprop persist.vendor.resolution.main 1920x1080@60-1920-2008-2052-2200-1080-1084-1089-1125-5
    setprop vendor.display.timeline 2
    ```
- 设置720P60：
    ```bash
    setprop persist.vendor.resolution.main 1280x720@60.00-1390-1430-1650-725-730-750-5
    setprop vendor.display.timeline 3
    ```
- 设置480P60：
    ```bash
    setprop persist.vendor.resolution.main 720x480@59.94-736-798-858-489-495-525-a
    setprop vendor.display.timeline 4
    ```

### 2.3.7 命令行设置颜色

在Android系统中，可以使用命令行设置属性的方式来设置颜色。此外，当用户在Android的setting中设置颜色时，对应的属性值也会被设置。

#### 2.3.7.1 Android 7.x & Android 8.x 颜色设置


| 属性                    | 说明                                                                 |
|-------------------------|----------------------------------------------------------------------|
| persist.sys.color.main  | 设置主屏颜色<br/>参数格式：`颜色格式-色深`<br/>示例：`RGB-8bit`<br/>支持颜色格式：<br/>- RGB<br/>- YCBCR444<br/>- YCBCR422<br/>- YCBCR420<br/>支持色深：<br/>- 8bit（24bit）<br/>- 10bit |
| persist.sys.color.aux   | 设置副屏颜色<br/>参数同主屏                                           |
| sys.display.timeline    | 刷新显示时间线<br/>每次设置新的分辨率需要加一                         |


通过`persist.sys.color.main`以及`persist.sys.color.aux`设置主副屏颜色，每次设置完更新`sys.display.timeline`（每次加1）再进行移动鼠标等更新UI的操作使新颜色生效，例子如下：
```
setprop persist.sys.color.main RGB-8bit
setprop sys.display.timeline 1
```
将输出颜色设置为RGB，色深8bit（RGB 24bit）。

#### 2.3.7.2 Android 9.0 及以上版本颜色设置

与3.3.6.2中描述的设置分辨率相同，新旧Android版本使用的颜色设置属性不同。



```markdown
commit 6f772a162893dd0242b6644fa32166e1ac15b2c0
Author: libin <bin.li@rock-chips.com>
Date:   Wed May 12 15:00:05 2021 +0800
   DrmConnector : Add UpdateDisplayMode function
   In order to adapt to the three-screen version.
   The hwc switching resolution will be in accordance with
   the following priority:
     1.persist.vendor.resolution.<Connector-type>-<Connector-ID>
     2.persist.vendor.resolution.main(aux)
     3.baseparameter(if exist)
     4.use "Auto"
   Version: 1.1.137
   Signed-off-by: libin <bin.li@rock-chips.com>
   Change-Id: I73e216047ed5423929d7a091572d717c4ffdf50c
```
当 HWC 代码包含以上提交时，使用的是新版属性：
| 属性 | 说明 |
| --- | --- |
| `persist.vendor.color.HDMI-A-0` | 设置HDMI0颜色，若设置HDMI1则是`HDMI-A-1`，参数为：颜色格式-色深。例如想要设置颜色为RGB，色深8bit（24bit），则参数为`RGB-8bit` |
| 支持颜色格式 | RGB、YCBCR444、YCBCR422、YCBCR420 |
| 支持色深 | 8bit、10bit |
| `vendor.display.timeline` | 刷新显示时间线，每次设置新的分辨率需要加1 |

如果 HWC 不含上述属性时，使用的是旧版属性：

| 属性 | 说明 |
| --- | --- |
| `persist.vendor.color.main` | 设置主屏颜色，参数为：颜色格式-色深。例如想要设置颜色为RGB，色深8bit（24bit），则参数为`RGB-8bit` |
| `persist.vendor.color.aux` | 设置副屏颜色，参数同主屏 |
| `vendor.display.timeline` | 刷新显示时间线，每次设置新的分辨率需要加1 |

通过 persist.vendor.color.main 以及 persist.vendor.color.aux 设置主副屏颜色，每次设置完
更新 vendor.display.timeline (每次加 1) 再进行移动鼠标等更新 UI 的操作使新颜色生效，例子如
下：
```
setprop persist.vendor.color.main RGB-8bit
setprop vendor.display.timeline 1
```
将输出颜色设置为 RGB，色深 8 bit（RGB 24 bit）


### 2.3.8 设置过扫描

由于不同电视之间存在差异，画面显示可能存在画面超出屏幕范围，或是画面有黑边等现象。此时可以设置过扫描来调整缩放大小，以修正这些问题。

在Android系统中，可以使用命令行设置属性的方式来设置过扫描。此外，当用户在Android的setting中也可以设置过扫描，设置完成后，对应的属性值也会被设置。

#### 2.3.8.1 Android 7.x & Android 8.x 过扫描设置

|属性 |说明|
| --- | --- |
|persist.sys.overscan.main|
设置主屏过扫描，属性格式：overscan left,top,right,bottom
left、top、right、bottom 分别为左、上、右、下四个方向的过扫
描值，最小值为 1，最大值由属性 persist.sys.overscan.max 定
义，如 persist.sys.overscan.max 不存在，默认取 100。|
|persist.sys.overscan.aux| 设置副屏过扫描，参数同主屏。|

例子如下：

```bash
setprop persist.sys.overscan.main "overscan 70,70,70,70"

```
将四个方向的过扫描设置为70。

#### 2.3.8.2 Android 9.0 及以上版本过扫描设置

参考3.3.6.2说明，根据Android版本选择属性进行设置。

新版属性：

| 属性 | 说明 |
| --- | --- |
|persist.vendor.overscan.HDMI-A-0| 设置HDMI0过扫描，若设置HDMI1则是`HDMI-A-1`，属性格式：`overscan left,top,right,bottom`。`left`、`top`、`right`、`bottom`分别为左、上、右、下四个方向的过扫描值，最小值为1，最大值由属性`persist.vendor.overscan.max`定义，如`persist.vendor.overscan.max`不存在，默认取100。|
| `persist.vendor.overscan.main` | 设置主屏过扫描，属性格式：`overscan left,top,right,bottom`。`left`、`top`、`right`、`bottom`分别为左、上、右、下四个方向的过扫描值，最小值为1，最大值由属性`persist.vendor.overscan.max`定义，如`persist.vendor.overscan.max`不存在，默认取100。 |
| `persist.vendor.overscan.aux` | 设置副屏过扫描，参数同主屏。 |

例子如下：
```
setprop persist.vendor.overscan.main "overscan 70,70,70,70"
```
将四个方向的过扫描设置为 70。


### 2.3.9 设置亮度、对比度、饱和度、色度

在Android系统中，可以使用命令行设置属性的方式来设置这些参数。此外，当用户在Android的setting中也可以设置这些参数。设置完成后，对应的属性值也会被设置。


#### 2.3.9.1 Android 7.x & Android 8.x 亮度、对比度、饱和度、色度设置

| BCSH    | 取值范围                     | 说明                                                                 |
|---------|------------------------------|----------------------------------------------------------------------|
| 亮度    | 整形数，0-100，默认值50      | `persist.sys.brightness.main`<br/>`persist.sys.brightness.aux`       |
| 对比度  | 整形数，0-100，默认值50      | `persist.sys.contrast.main`<br/>`persist.sys.contrast.aux`           |
| 饱和度  | 整形数，0-100，默认值50      | `persist.sys.saturation.main`<br/>`persist.sys.saturation.aux`       |
| 色度    | 整形数，0-100，默认值50      | `persist.sys.hue.main`<br/>`persist.sys.hue.aux`                     |
举例如下：
```bash
setprop persist.sys.brightness.main 70
setprop vendor.display.timeline 1
```

通过`persist.sys.brightness.main`设置主屏亮度，每次设置完更新`vendor.display.timeline`（每次加1）再进行移动鼠标等更新UI的操作使新亮度生效。



#### 2.3.9.2 Android 9.0 及以上版本亮度、对比度、饱和度、色度设置

参考 3.3.6.2 说明，根据 Android 版本选择属性进行设置。
新版属性：

| 参数   | 取值范围 | 默认值 | 属性名称                    |
|--------|----------|--------|-----------------------------|
| 亮度   | 0 - 100  | 50     | persist.vendor.brightness.HDMI-A-0 |
| 对比度 | 0 - 100  | 50     | persist.vendor.contrast.HDMI-A-0   |
| 饱和度 | 0 - 100  | 50     | persist.vendor.saturation.HDMI-A-0 |
| 色度   | 0 - 100  | 50     | persist.vendor.hue.HDMI-A-0        |

旧版属性：

| 参数   | 取值范围 | 默认值 | 主屏属性名称               | 辅屏属性名称               |
|--------|----------|--------|-----------------------------|-----------------------------|
| 亮度   | 0 - 100  | 50     | persist.vendor.brightness.main | persist.vendor.brightness.aux |
| 对比度 | 0 - 100  | 50     | persist.vendor.contrast.main   | persist.vendor.contrast.aux   |
| 饱和度 | 0 - 100  | 50     | persist.vendor.saturation.main | persist.vendor.saturation.aux |
| 色度   | 0 - 100  | 50     | persist.vendor.hue.main        | persist.vendor.hue.aux        |

举例如下：


```bash
setprop persist.vendor.brightness.main 70
setprop sys.display.timeline 1
```
通过 persist.vendor.brightness.main 设置主屏亮度，每次设置完更新 
vendor.display.timeline (每次加 1) 再进行移动鼠标等更新 UI 的操作使新亮度生效。

## 2.4 常见问题排查

### 2.4.1 插入或切换分辨率，电视提示无信号或格式不支持或画面不稳定

1. 确认HDMI当前的分辨率，命令见3.3.2。
2. 降低HDMI分辨率，看电视能否正常显示，命令见3.3.6。
3. 更换好的HDMI线，看电视能否正常显示。
4. 如果步骤2、3可以恢复画面，一般与HDMI物理信号的兼容性有关，需要检查硬件，测试HDMI信号进一步分析。
5. 如果HDMI信号不达标，可以通过调整HDMI PHY的配置进行信号的调整，参考3.1.7。

### 2.4.2 播放视频时电视提示无信号或格式不支持

检查内核代码dts中是否有针对视频的DDR变频功能，若有请设置`auto-freq-en = <0>;`关闭自动变频功能。
```
 dmc: dmc {
               compatible = "rockchip,rk3328-dmc";
               devfreq-events = <&dfi>;
               clocks = <&cru SCLK_DDRCLK>;
               clock-names = "dmc_clk";
               operating-points-v2 = <&dmc_opp_table>;
               ddr_timing = <&ddr_timing>;
               upthreshold = <40>;
               downdifferential = <20>;
               system-status-freq = <
                       /*system status         freq(KHz)*/
                       SYS_STATUS_NORMAL       786000
                       SYS_STATUS_REBOOT       786000
                       SYS_STATUS_SUSPEND     786000
                       SYS_STATUS_VIDEO_1080P 786000
                       SYS_STATUS_VIDEO_4K     786000
                       SYS_STATUS_VIDEO_4K_10B 933000
                       SYS_STATUS_PERFORMANCE 933000
                       SYS_STATUS_BOOST       933000
               >;
               auto-min-freq = <786000>;
               auto-freq-en = <0>;
               #cooling-cells = <2>;
               status = "disabled";
```

### 2.4.3 部分电视提示无信号、黑屏、花屏

1. 确认HDMI当前的分辨率，命令见3.3.2。
2. 降低HDMI分辨率，看电视能否正常显示，命令见3.3.6。
3. 更换好的HDMI线，看电视能否正常显示。
4. 如果步骤2、3可以恢复画面，一般与HDMI物理信号的兼容性有关，需要检查硬件，测试HDMI信号进一步分析。
5. 如果HDMI信号不达标，可以通过调整HDMI PHY的配置进行信号的调整，参考3.1.7。
6. 若测试HDMI信号达标，可尝试修改以下寄存器值：

```c
kernel\drivers\gpu\drm\bridge\synopsys\dw-hdmi.c
/* HDMI Initialization Step B.4 */
static void dw_hdmi_enable_video_path(struct dw_hdmi *hdmi)
{
 /* control period minimum duration */
 hdmi_writeb(hdmi, 12, HDMI_FC_CTRLDUR);
```

将`HDMI_FC_CTRLDUR`的值逐步增大（最大223）看显示是否能恢复正常。

### 2.4.4 读取EDID失败时，如何设置默认分辨率

```
Commit 727e0fe68d8f422698f4e257cb7c04f90b8692c0
Author: xuhuicong xhc@rock-chips.com
Date:   Tue Sep 26 17:32:56 2017 +0800
drm/edid: output common tv resolution and hdmi mode if no read the correct edid
Change-Id: Ib7379340e8c1d59382553d21b60165fe5fb371e8
Signed-off-by: xuhuicong xhc@rock-chips.com
```

在有上述提交基础上，修改`def_modes`的值，对应的是VIC值，如下代码中的4对应720P60的分辨率。

```
kernel\drivers\gpu\drm\bridge\synopsys\dw-hdmi.c
```

```
static int dw_hdmi_connector_get_modes(struct drm_connector *connector)
{
 struct dw_hdmi *hdmi = container_of(connector, struct dw_hdmi,
     connector);
 struct edid *edid;
 struct drm_display_mode *mode;
 const u8 def_modes[6] = {4, 16, 31, 19, 17, 2};
 struct drm_display_info *info = &connector->display_info;
```


### 2.4.5 强制输出指定分辨率

当需要无视EDID的限制，强制输出某个分辨率时，RK3288/RK3368/RK3399/RK356X确认当前代码是否包含以下提交：

```
commit b318f175080ca98173d75fcf436beeee64092303
Author: Algea Cao <algea.cao@rock-chips.com>
Date:   Fri Nov 17 09:55:52 2023 +0800
   drm/bridge: synopsys: Support hdmi force output
   Support hdmi output specific resolution and color format
   regardless of whether hdmi is connected.
   Signed-off-by: Algea Cao <algea.cao@rock-chips.com>
   Change-Id: I228a74d128aa818166f589798897729473d97610
```

RK3588/RK3576确认当前代码是否包含以下提交：

```c
commit ed5631fa515a297b45cef5a1330b516f56e113dc
Author: Algea Cao <algea.cao@rock-chips.com>
Date:   Thu Dec 28 10:16:17 2023 +0800
   drm/bridge: dw-hdmi-qp: Support hdmi force output
   Support hdmi output specific resolution and color format
   regardless of whether hdmi is connected.
   Signed-off-by: Algea Cao <algea.cao@rock-chips.com>
   Change-Id: I3f18aeb04427846e06b6a4397a4c6df77bbbcab2
```

若包含以上提交，则可以在DTS中直接配置所需的分辨率及颜色格式：
```
&hdmi {
       status = "okay";
       force-output;
       force-bus-format = <MEDIA_BUS_FMT_RGB888_1X24>;
       force_timing {
               clock-frequency = <594000000>;
               hactive = <3840>;
               vactive = <2160>;
               hback-porch = <296>;
               hfront-porch = <176>;
               vback-porch = <72>;
               vfront-porch = <8>;
               hsync-len = <88>;
               vsync-len = <10>;
               hsync-active = <1>;
               vsync-active = <1>;
               de-active = <0>;
               pixelclk-active = <0>;
       };
};
```
- `force-output`：表示强制输出HDMI分辨率的FLAG。
- `force-bus-format`：强制输出指定颜色格式。
- `force_timing`：强制输出指定的分辨率时序。

若当前代码不包含以上提交时，请做以下修改：

![alt text](/pdf/rk/hdmi/image-10.png)



1. 把`def_mode`数组的第一个值改成所需分辨率对应的VIC。
2. `edid = NULL;`强制进入EDID读取失败的流程，不管有没有读到EDID都强制按`def_modes`的分辨率来显示。
3. 如果需要强制显示4K的分辨率，还需要注释掉上图的这段代码，解除对4K分辨率的限制。

需要注意的是，强制输出HDMI 2.0（4K30以上）及以上的分辨率时，需要确认SINK端是否需要进行SCDC通信。如果需要SCDC通信，则必须保证HDMI DDC功能正常。且强制输出时，不支持HDMI热插拔。

### 2.4.6 Recovery HDMI无显示

Recovery下不支持双显，也不支持热插拔。若需要从HDMI显示，如果代码中没有如下修改，请添加如下修改，然后插着HDMI开机。

![alt text](/pdf/rk/hdmi/image-11.png)
### 2.4.7 settings无法设置HDMI分辨率

1. 请确认3.2.1中的主副屏配置是否正确，3.2.5中的设置是否正确。
2. 请确认3.3.6中的属性配置是否正确。
3. 如果是Android 9.X及以上系统，需要启用RkOutputManager服务。3399代码需更新到以下提交点。

    ![alt text](/pdf/rk/hdmi/image-12.png)
4. 9.0其他平台需打上相应的补丁，补丁为当前工程中执行完`source`和`lunch`相关的命令后，执行`get_build_var DEVICE_MANIFEST_FILE`，会打印当前所使用的manifest文件，例如输出为：

```xml
<hal format="hidl">
    <name>rockchip.hardware.outputmanager</name>
    <transport>hwbinder</transport>
    <version>1.0</version>
    <interface>
        <name>IRkOutputManager</name>
        <instance>default</instance>
    </interface>
</hal>
```

### 2.4.8 DDR带宽不足导致的问题

如果在4K的高分辨率下，出现闪屏或者闪绿线的问题，确认内核log是否有以下打印：

```
 [drm:vop_isr] ERROR POST_BUF_EMPTY irq err
```

若有以上打印则为DDR带宽不足导致的问题，请参考《Rockchip_RK3399_Developer_Guide_Android7.1_Software_CN&EN.pdf》的9.7节进行处理。

### 2.4.9 4K UI相关问题

1. 是否一定要4K UI？
   - 4K UI占用系统资源较多，最高只能支持到4K25Hz左右，不推荐使用4K UI。如果只是想要播放4K视频或是查看4K图片，那可以不需要配置4K UI，系统默认的视频播放器和图片浏览器可以支持。
2. 如何配置4K UI？
   - 请参考3.2.3节，将Framebuffer分辨率配置为4K。
3. 配置成4K UI之后出现闪屏DDR带宽问题，请参考3.4.10节进行处理。

### 2.4.10 setting中HDMI分辨率列表中没有4K分辨率

1. 确认电视是否支持4K分辨率。
2. 执行以下命令，确认内核的HDMI分辨率列表中是否包含4K分辨率。
    ```
    cat /sys/class/drm/card0-HDMI-A-1/modes
    ```
3. 如果上述列表中不包含4K分辨率，双VOP平台（RK3288、RK3399）请确认HDMI是否绑定的是VOPB。或是该电视的4K-50/60Hz不支持YUV420，当前平台不支持这么高的分辨率（平台支持HDMI最高分辨率请参考第1章表格）。
4. 若内核的HDMI分辨率列表中包含4K分辨率，而setting中的分辨率列表不包含该分辨率，请确认白名单中是否包含了该分辨率（参考3.2.4节）。

### 2.4.11 RK3588 setting中HDMI分辨率列表中没有8K分辨率

1. 确认电视设置是否选择了HDMI 2.1模式或者游戏模式，大多数8K电视需要手动配置，否则不会有8K分辨率。
2. 确认VOP ACLK是否设置为800 Mhz，详见3.1.5。

### 2.4.12 RK3588/RK3576 HDMI 8K/4K120等分辨率闪屏、显示异常

1. 确认使用的HDMI线缆是否为HDMI 2.1线缆。HDMI 2.1分辨率必须使用HDMI 2.1线缆。
2. 提供HDMI原理图/PCB图供RK硬件审核。
3. 联系外部实验室进行SI测试或者向业务申请由RK硬件实验室进行SI测试。

### 2.4.13 HDMI认证申请表的填写

如果要对设备进行HDMI认证，通常都会从认证机构获取到一份认证申请表，该表格一般是excel形式。

首先关注表格下方的分页标签，如下方的例子：

![alt text](/pdf/rk/hdmi/image-13.png)

HDMI各项功能的认证需要填写各个分页中的内容，如果设备不支持某些功能，则对应分页不必填写。

常见分页说明如下：

- **General**：一般申请表都有类似的页面，且必须填写。通常都是关于设备HDMI的一些基本信息。如设备有几个HDMI IN口、有几个HDMI OUT口、设备HDMI是否支持HDCP, CEC等功能。该分页选项往往也决定了后续分页是否需要填写。如HDMI_input_count填0的话，则说明设备不支持HDMI IN，Sink CDF分页就不必填写。

![alt text](/pdf/rk/hdmi/image-14.png)

- **Source CDF**：设备如果包含HDMI OUT口（General分页中需要填写支持几个HDMI OUT口），需要填写这个分页，其中一般需要填写HDMI OUT支持输出哪些分辨率，支持哪些颜色格式等。

![alt text](/pdf/rk/hdmi/image-15.png)

- **Sink CDF**：设备如果包含HDMI IN口，需要填写这个分页，其中一般需要填写HDMI IN支持输入哪些分辨率，支持哪些颜色格式以及EDID相关信息等。
- **Repeater CDF**：设备如果作为HDMI Repeater需要填写这个分页。Rockchip方案一般不包含这种产品形态。

每个分页一般包含若干个表格需要填写，填写方法与普通excel表格一致，以Source CDF分页下的Video表格为例：

![alt text](/pdf/rk/hdmi/image-16.png)

针对表格中的选项，根据设备的实际情况逐条填写。如上图中的Source_HDMI_YCbCr项目，表格第一列为项目名称，第二列为项目说明，第三列为可选值，第四列为申请人需要填写的值。根据描述，该项表明HDMI是否支持输出YCbCr颜色格式。如果支持该功能，则在右侧下拉列表中选择Y，反之则选择N。

由于申请表格通常项目较多，在此就不一一说明，如果对任何项目的填写有疑问，请在redmine上提出。
