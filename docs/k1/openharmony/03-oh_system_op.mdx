# K1 JOH5.0 系统定制说明



# UI 定制

## 更换 boot logo

Boot logo 可放置在 2 个位置：

所有方案共用的 boot logo 放置在：

```bash
device/soc/spacemit/k1/kernel/boot/bootfs
```

如下：

```bash
|-- boot_logo_spacemit_0.bmp
|-- boot_logo_spacemit_180.bmp
|-- boot_logo_spacemit_270.bmp
`-- boot_logo_spacemit_90.bmp
```

同一个图案的 boot logo 有 4 张图，分 4 个方向，每个方案根据需要选择不同方向的 logo，一般情况下，都是选用 0° 的 logo 图片。

特定方案定制的 boot logo 放置在：

```bash
device/board/spacemit/xxx/kernel/boot/bootfs
```

如下：

```bash
|-- boot_logo_ry_270.bmp
```

bootlogo 对于图像的要求为 32bit 的 bmp 图像，放置新的 boot logo 在上述目录，再修改 `device/board/spacemit/musepaper/kernel` 的 `build_kernel.sh` 文件，拷贝 boot logo 到打包路径即可。

```bash
cp ${OHOS_SOURCE_ROOT}/device/soc/${DEVICE_BOARD}/k1/kernel/boot/bootfs/boot_logo_spacemit_0.bmp ${OHOS_IMAGES_DIR}/bootfs/bianbu.bmp
```

## 更换 kernel logo

Kernel logo 是在 boot logo 之后和开机动画之间展示的 logo，目的是避免 boot logo 和开机动画之间黑屏太久，一般 kernel logo 的图案和 boot logo 保持一致。

kernel\_logo 放置在

```bash
device/board/spacemit/common/kernel_logo
```

如下：

```bash
|-- kernel_logo_ry_270.ppm
|-- kernel_logo_spacemit_0.ppm
|-- kernel_logo_spacemit_180.ppm
|-- kernel_logo_spacemit_270.ppm
`-- kernel_logo_spacemit_90.ppm
```

添加新的 kernel logo 后，再修改 `device/board/spacemit/musepaper/kernel` 的 `build_kernel.sh` 文件，拷贝 kernel logo 到内核的编译路径即可。

```bash
cp -rf ${OHOS_SOURCE_ROOT}/device/board/${DEVICE_BOARD}/common/kernel_logo/kernel_logo_spacemit_0.ppm ${KERNEL_BUILD_ROOT}/drivers/video/logo/logo_linux_clut224.ppm
```

### bmp 转 ppm

- 安装转换工具

```sql
sudo apt-get install netpbm
```

- 执行脚本，会在当前目录生成 xxx.ppm

```sql
./bmp2ppm.sh xxx.bmp
```

脚本内容如下：

```bash
 #!/bin/bash
 if [ " $1" == " " ];
 then
     echo "usage:$0 bmp_file"
     exit 0
 fi

 if [ -f "$1" ]
 then
     echo $1
 else
     echo "no find file [$1]"
     exit 0
 fi

 name=${1%%.*}
 bmptopnm $1 > $name.pnm
 pnmquant 224 $name.pnm > $name.clut224.pnm
 pnmtoplainpnm $name.clut224.pnm > $name.ppm
 rm $name.pnm $name.clut224.pnm
```

## 更换开机动画

更换开机动画有 2 种方式，一个是更换原生开机动画，另一个是添加定制动画，下面分别说明：

### 更换原生动画

原生开机动画是 `foundation/graphic/graphic_2d/frameworks/bootanimation/data` 的 `bootpic.zip`，可以替换这个 zip 包。

开机动画 zip 包内容包括：

```bash
|-- config.json
`-- OH_bootAni compressed
    |-- OH_bootAni_00000.jpg
    |-- OH_bootAni_00001.jpg
    |-- OH_bootAni_00002.jpg
    |-- OH_bootAni_00003.jpg
    |-- ...
    |-- OH_bootAni_00146.jpg
    |-- OH_bootAni_00147.jpg
    |-- OH_bootAni_00148.jpg
    `-- OH_bootAni_00149.jpg
```

config.json 的内容为：

```bash
{
        "Remark": "FrameRate Support 30, 60 frame rate configuration",
        "FrameRate": 30
}

```

自己定制开机动画需要按照上面的格式和内容来定制。

### 添加定制动画

`vendor/spacemit/xxx` 目录下，加入 `bootanimation_custom_config.json` 配置文件，里面配置定制动画的路径，如下：

```bash
{
        "cust.bootanimation.pics": "/sys_prod/etc/bootanimation/cust_bootpic.zip",
        "cust.bootanimation.sounds": "/sys_prod/etc/bootanimation/cust_bootsound.wav",
        "cust.bootanimation.video": "/sys_prod/etc/bootanimation/cust_bootvideo.mp4"
}
```

并在上述文件对应的路径放入定制开机动画。

## 更换开机音乐

更换开机音乐有 2 种方式，一个是更换原生开机音乐，另一个是添加定制音乐，下面分别说明：

### 更换原生音乐

原生开机音乐是 `foundation/graphic/graphic_2d/frameworks/bootanimation/data` 的 `bootsound.wav`，可以替换这个 wav 文件，音乐的时长不用太长。

### 添加定制音乐

`vendor/spacemit` 目录下，加入 `bootanimation_custom_config.json` 配置文件，里面配置定制音乐的路径，如下：

```bash
{
        "cust.bootanimation.pics": "/sys_prod/etc/bootanimation/cust_bootpic.zip",
        "cust.bootanimation.sounds": "/sys_prod/etc/bootanimation/cust_bootsound.wav",
        "cust.bootanimation.video": "/sys_prod/etc/bootanimation/cust_bootvideo.mp4"
}
```

并在上述文件对应的路径放入定制开机音乐。

## 更换开机视频

更换开机视频有 2 种方式，一个是更换原生开机视频，另一个是添加定制视频，下面分别说明：

### 更换原生视频

原生开机视频是 `foundation/graphic/graphic_2d/frameworks/bootanimation/data` 的 `bootvideo.mp4`，可以替换这个 mp4 文件，确保开机视频的视频编码格式为 H.264，视频长宽比例与屏幕长宽比例一致。

### 添加定制视频

`vendor/spacemit` 目录下，加入 `bootanimation_custom_config.json` 配置文件，里面配置定制视频的路径，如下：

```bash
{
        "cust.bootanimation.pics": "/sys_prod/etc/bootanimation/cust_bootpic.zip",
        "cust.bootanimation.sounds": "/sys_prod/etc/bootanimation/cust_bootsound.wav",
        "cust.bootanimation.video": "/sys_prod/etc/bootanimation/cust_bootvideo.mp4"
}
```

并在上述文件对应的路径放入定制开机视频。

## 开机动画切换为开机视频

待添加

# 应用定制

## 预置应用

### 预置应用

- 将 hap 放置于 `applications/standard/hap`
- 修改 `applications/standard/hap/BUILD.gn` 配置，如下例（以浏览器 hap 为例）：

```
diff --git a/BUILD.gn b/BUILD.gn
index c9ea451..87ed7aa 100755
--- a/BUILD.gn
+++ b/BUILD.gn
@@ -407,6 +407,13 @@ ohos_prebuilt_etc("tetris_hap") {
   subsystem_name = "applications"
 }

+ohos_prebuilt_etc("broswer_hap") {
+  source = "Broswer.hap"
+  module_install_dir = "app/ohos.samples.browser"
+  part_name = "prebuilt_hap"
+  subsystem_name = "applications"
+}
+
 group("hap") {
   deps = [
     ":calendarData_hap",
@@ -464,6 +471,7 @@ group("hap") {
     "//applications/standard/hap:wuziqi_hap",
     "//applications/standard/hap:deviceinfo_hap",
     "//applications/standard/hap:tetris_hap",
+    "//applications/standard/hap:broswer_hap",
   ]
   if (defined(product_name) && product_name == "watchos") {
     deps -= [

```

- 修改 `vendor/spacemit/xxx/preinstall-config/install_list.json` 配置进行安装，如下例：

```
diff --git a/musepaper/preinstall-config/install_list.json b/musepaper/preinstall-config/install_list.json
index dd859c2..0107e85 100755
--- a/musepaper/preinstall-config/install_list.json
+++ b/musepaper/preinstall-config/install_list.json
@@ -220,6 +220,10 @@
             "app_dir": "/system/app/ohos.samples.game2048",
             "removable": false
         },
+        {
+            "app_dir": "/system/app/ohos.samples.label",
+            "removable": false
+        },
         {
             "app_dir": "/system/app/com.example.Digital_Huarong_Road",
             "removable": false

```

### 删除预置应用

删除应用是添加应用的逆操作，可以参考上面章节，将 `vendor/spacemit/xxx/preinstall-config/install_list.json` 中的对应 hap 的配置删除即可。

## 替换系统应用

通过 Ability 来区分的话，系统应用又会分为如下两类：

- UIAbility，如：Settings、Photos、Camera 等，这类系统应用能够展示在桌面。
- ExtensionAbility，如：Launcher、SystemUI、Settingsdata 等，这类系统应用有的创建了窗口从而能显示界面，而有的则属于无页面的常驻服务去提供对应的能力。

因此传统的 `hdc install` 命令以及 IDE 的自动安装都无法正常安装，这个时候，就需要用到系统应用的替换。

以 Launcher 为例，系统应用的替换步骤如下:

- 找到 Launcher 预置 hap 路径 `/system/app/com.ohos.launcher`，可以看到该路径下有 2 个 hap：`Launcher.hap` 和 `Launcher_Settings.hap`
- 执行以下指令

```sql
hdc shell "mount -o remount,rw /"
hdc shell "rm -rf /data/*"
hdc file send Launcher.hap /system/app/com.ohos.launcher/Launcher.hap
hdc file send Launcher_Settings.hap /system/app/com.ohos.launcher/Launcher_Settings.hap
hdc shell "reboot"
```

- 即可正常替换安装自己构建的 Launcher

## 相册

### 推送视频

- 准备 xxx.mp4 视频
- 通过 hdc 将视频推入机器

```
D:\>hdc file send D:\xxx.mp4 /storage/media/100/local/files/Videos/
```

- 触发媒体扫描

```
D:\>hdc shell
# scanner
#
```

- 打开 `相册` 应用，播放视频，如果没有视频，将 `相册` 应用后台删除，重新进入

### 推送图片

- 准备 xxx.jpg 或者 xxx.png 图片
- 通过 hdc 将图片推入机器

```bash
D:\>hdc file send D:\xxx.jpg /storage/media/100/local/files/Pictures/
```

- 触发媒体扫描

```
D:\>hdc shell
# scanner
#
```

- 打开 `相册` 应用，显示图片，如果没有图片，将 `相册` 应用后台删除，重新进入

## Launcher

### 替换背景图片

背景图片的位置在：`applications/standard/launcher/product/phone/src/main/ets/common/pics/img_wallpaper_default.jpg`

替换该图片后，重新编译 Launcher，将新生成的 Launcher.hap 放入 `applications/standard/hap` 文件夹，生成新 img。

## 锁屏

### 去掉锁屏

- 在 `applications/standard/hap/BUILD.gn` 文件中去除锁屏应用相关的代码，如下：

```
diff --git a/BUILD.gn b/BUILD.gn
index e213683..7382b97 100755
--- a/BUILD.gn
+++ b/BUILD.gn
@@ -463,7 +463,6 @@ group("hap") {
     "//applications/standard/hap:note_hap",
     "//applications/standard/hap:notificationManagement_hap",
     "//applications/standard/hap:photos_hap",
-    "//applications/standard/hap:screenLock_hap",
     "//applications/standard/hap:screen_shot_hap",
     "//applications/standard/hap:settingsData_hap",
     "//applications/standard/hap:settings_faceauth_hap",
@@ -518,7 +517,6 @@ group("hap") {
       "//applications/standard/hap:navigationBar_hap",
       "//applications/standard/hap:notificationManagement_hap",
       "//applications/standard/hap:photos_hap",
-      "//applications/standard/hap:screenLock_hap",
       "//applications/standard/hap:screen_shot_hap",
       "//applications/standard/hap:settingsData_hap",
       "//applications/standard/hap:settings_faceauth_hap",

```

- 在 `foundation/systemabilitymgr/safwk/etc/profile/foundation.cfg` 文件中去除开机时对锁屏应用状态的检测，如下：

```
diff --git a/etc/profile/foundation.cfg b/etc/profile/foundation.cfg
index f2573fa..1a21510 100644
--- a/etc/profile/foundation.cfg
+++ b/etc/profile/foundation.cfg
@@ -25,7 +25,6 @@
             "name" : "services:restartfoundation",
             "cmds" : [
                 "unset_bootevent bootevent.appfwk.ready",
-                "unset_bootevent bootevent.lockscreen.ready",
                 "unset_bootevent bootevent.launcher.ready",
                 "reset appspawn",
                 "reset accountmgr",
@@ -141,7 +140,6 @@
             "bootevents": [
                 "bootevent.wms.fullscreen.ready",
                 "bootevent.appfwk.ready",
-                "bootevent.lockscreen.ready",
                 "bootevent.launcher.ready",
                 "bootevent.wms.ready"
             ],

```

- 去除窗口控制器对锁屏信号的响应；因为这里我们只是去掉了锁屏应用，但触发锁屏的机制还在，比如说按键触发和遥控器触发，只是没有实际的响应，如果不去掉，当再触发进入锁屏的机制，可能会出现应用界面冻结，修改在 `foundation/window/window_manager/wmserver/src/window_controller.cpp` 文件，如下：

```
diff --git a/wmserver/src/window_controller.cpp b/wmserver/src/window_controller.cpp
index 32c6a60ec..98df12ffc 100644
--- a/wmserver/src/window_controller.cpp
+++ b/wmserver/src/window_controller.cpp
@@ -783,8 +783,8 @@ void WindowController::NotifyDisplayStateChange(DisplayId defaultDisplayId, sptr
     WLOGFD("NotifyDisplayStateChange start: %{public}u", type);
     switch (type) {
         case DisplayStateChangeType::BEFORE_SUSPEND: {
-            isScreenLocked_ = true;
-            windowRoot_->ProcessWindowStateChange(WindowState::STATE_FROZEN, WindowStateChangeReason::KEYGUARD);
+            //isScreenLocked_ = true;
+            //windowRoot_->ProcessWindowStateChange(WindowState::STATE_FROZEN, WindowStateChangeReason::KEYGUARD);
             break;
         }
         case DisplayStateChangeType::BEFORE_UNLOCK: {

```

- 副作用：无下拉菜单

# 系统定制

## 电源管理定制

主要修改 `vendor/spacemit/xxx/power_config/power_mode_config.xml`，如下：

```bash
<!--
    Power Mode Definitions:
    MODE_NORMAL = 600,
    MODE_POWER_SAVE = 601,
    MODE_PERFORMANCE = 602,
    MODE_EXTREME_POWER_SAVE = 603,
-->
<!--
    Action Definitions:
    DisplayOffTime = 101,
    SystemAutoSleepTime = 102,
    AutoAdjustBrightness = 103,
    AutoWindowRotation = 107,
    SystemBrightness = 115,
    VibratorsState = 120,
-->
<switch_proxy version="1">
    <proxy id="600">
        <switch id="101" value="300000" recover_flag="0"/>
        <switch id="102" value="0" recover_flag="0"/>
        <switch id="103" value="-1" recover_flag="0"/>
        <switch id="107" value="1" recover_flag="0"/>
        <switch id="115" value="76" recover_flag="0"/>
        <switch id="120" value="1" recover_flag="0"/>
    </proxy>
    <proxy id="601">
        <switch id="101" value="10000" recover_flag="0"/>
        <switch id="102" value="5000" recover_flag="0"/>
        <switch id="103" value="-1" recover_flag="0"/>
        <switch id="107" value="-1" recover_flag="0"/>
        <switch id="115" value="50" recover_flag="0"/>
        <switch id="120" value="-1" recover_flag="0"/>
    </proxy>
    <proxy id="602">
        <switch id="101" value="-1" recover_flag="0"/>
        <switch id="102" value="-1" recover_flag="0"/>
        <switch id="103" value="-1" recover_flag="0"/>
        <switch id="107" value="1" recover_flag="0"/>
        <switch id="115" value="255" recover_flag="0"/>
        <switch id="120" value="1" recover_flag="0"/>
    </proxy>
    <proxy id="603">
        <switch id="101" value="5000" recover_flag="0"/>
        <switch id="102" value="1000" recover_flag="0"/>
        <switch id="103" value="-1" recover_flag="0"/>
        <switch id="107" value="-1" recover_flag="0"/>
        <switch id="115" value="25" recover_flag="0"/>
        <switch id="120" value="-1" recover_flag="0"/>
    </proxy>
</switch_proxy>
```

该文件主要定义了几种电源管理模式，包括正常/省电/性能/超级省电等，以及对应管理模式的参数，包括关屏时间，待机时间等。

默认系统是在 MODE\_NORMAL 模式，可以通过命令切换到其他模式，比如不想让系统进入休眠，可以切换到性能模式，如下：

```bash
power-shell setmode 602
```

## 窗口管理定制

主要修改 `vendor/spacemit/musepaper2/window_config` 路径下的 `display_manager_config.xml` 和 `window_manager_config.xml`

### display\_manager\_config.xml

```xml
 <Configs>
    <!--Window display dpi, valid range is 80~640, use 0 if no configuration is requeired-->
    <dpi>240</dpi>
    <!-- Indicate the deviation between the default device display direction and the direction -->
    <!-- of the sensor. Use 0 in default, available values are {0, 90, 180, 270} -->
    <defaultDeviceRotationOffset>0</defaultDeviceRotationOffset>
    <!-- Svg path for cutout, use empty string if there is not cutout on the screen -->
    <!-- format: string -->
    <!-- default value: empty string -->
    <!-- sample: M 100,100 m -75,0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0 z -->
    <defaultDisplayCutoutPath></defaultDisplayCutoutPath>
    <!-- Indicates the boundary of the curved screen, each value corresponds to the px from each edge -->
    <!-- format: number(left) number(top) number(right) number(bottom) -->
    <!-- default value: 0 0 0 0 -->
    <!-- sample: 150 150 0 0 -->
    <curvedScreenBoundary>0 0 0 0</curvedScreenBoundary>
    <!-- Indicates whether the built-in display is a waterfall display -->
    <!-- format: boolean -->
    <!-- default value: false -->
    <!-- sample: false -->
    <isWaterfallDisplay enable="false"></isWaterfallDisplay>

    <!-- Indicate whether to enable display area compression for waterfall display when displayed in landscape -->
    <!-- or landscape_inverted mode. -->
    <!-- This configuration item takes effect only when isWaterfallDisplay above is true -->
    <!-- format: boolean -->
    <!-- default value: false -->
    <isWaterfallAreaCompressionEnableWhenHorizontal enable="false"></isWaterfallAreaCompressionEnableWhenHorizontal>

    <!-- Indicate the size of both sides of the waterfall display which to be compressed when displayed in landscape -->
    <!-- or landscape_inverted mode. -->
    <!-- This configuration item takes effect only when isWaterfallDisplay above is true -->
    <!-- format: uint32_t, the unit is vp. -->
    <!-- default value: 0 -->
    <waterfallAreaCompressionSizeWhenHorzontal>0</waterfallAreaCompressionSizeWhenHorzontal>

    <!-- Indicates orientation of the built-in screen -->
    <!-- 0: Orientation::UNSPECIFIED -->
    <!-- 1: Orientation::VERTICAL         2: Orientation::HORIZONTAL-->
    <!-- 3: Orientation::REVERSE_VERTICAL 4: Orientation::REVERSE_HORIZONTAL -->
    <buildInDefaultOrientation>0</buildInDefaultOrientation>
 </Configs>

```

主要修改的配置为：

- dpi：像素密度，dpi 越大图标越小
- buildInDefaultOrientation：桌面旋转角度配置

### window\_manager\_config.xml

主要用于配置窗口动画，效果等，修改不多

## 网络管理定制

### wifi 定制

#### 驱动调试

该调试功能主要由进迭进行，确保驱动层功能正常，并能够编译出 ko。

#### 拷贝 ko（以 rtl8852bs 为例）

在 `device/board/spacemit/xxx/kernel` 的 `build_kernel.sh` 中进行拷贝，如下：

```bash
function cp_ko(){
  # cp ko to userspace
  cp ${KERNEL_BUILD_ROOT}/drivers/usb/typec/typec.ko ${OHOS_SOURCE_ROOT}/device/board/${DEVICE_BOARD}/${DEVICE_NAME}/kernel/ko
  cp ${KERNEL_BUILD_ROOT}/drivers/usb/typec/husb239.ko ${OHOS_SOURCE_ROOT}/device/board/${DEVICE_BOARD}/${DEVICE_NAME}/kernel/ko
  cp ${KERNEL_BUILD_ROOT}/drivers/net/wireless/realtek/rtl8852be/8852be.ko ${OHOS_SOURCE_ROOT}/device/board/${DEVICE_BOARD}/${DEVICE_NAME}/kernel/ko
  cp ${KERNEL_BUILD_ROOT}/drivers/net/wireless/realtek/rtl8852bs/8852bs.ko ${OHOS_SOURCE_ROOT}/device/board/${DEVICE_BOARD}/${DEVICE_NAME}/kernel/ko
}
```

在编译完内核后，将内核编译目录下的 ko 拷贝到 OpenHarmony 系统的目录下，在编译 OpenHarmony 的时候，会将这些 ko 拷贝到 vendor 分区并进行打包。

#### 加载 ko（以 8852bs 为例）

在 `device/board/spacemit/xxx/cfg` 的 `init.xxx.cfg` 中进行 ko 的加载，如下：

```bash
{
  "name" : "fs",
    "cmds" : [
      "insmod /vendor/modules/8852bs.ko ifname=wlan0 if2name=p2p0",
      "insmod /vendor/modules/typec.ko",
      "insmod /vendor/modules/husb239.ko"
    ]
},
```

开机后，会在 init 进程中，加载这些 ko，通过 lsmod 命令查看是否加载成功，如下：

```xml
# lsmod
Module                  Size  Used by
husb239               110592  0
typec                 323584  1 husb239
8852bs              10031104  0

```

### BT 定制

待添加

### 4G 定制

待添加

## 多媒体系统定制

### 音频通路定制

在 `vendor\spacemit\xxx\hals\audio\alsa_adapter.json` 添加声卡信息。

```cpp
{
    "adapters": [
        {
            "name": "primary",
            "cardId": 0,
            "cardName": "sndes8326"
        },
        {
            "name": "usb",
            "cardId": 1,
            "cardName": "C"
        }
    ]
}
```

在 `vendor\spacemit\xxx\hals\audio\config\riscv64\audio_policy_config.xml` 配置不同声卡的音频属性，包括播放、录制下的采样率、通道数、buffer 大小等。

```cpp
        <adapter name="primary" supportSelectScene="0">
            <pipes>
                <pipe name="primary_output" role="output">
                    <paProp lib="libmodule-hdi-sink.z.so" role="sink" fixed_latency="1" render_in_idle_state="1" moduleName="Speaker"/>
                    <streamProps>
                        <streamProp format="s16le" sampleRates="48000" channelLayout="CH_LAYOUT_STEREO" bufferSize="4096"/>
                    </streamProps>
                    <attributes>
                        <attribute name="preload" value="true"/>
                    </attributes>
                </pipe>
                <pipe name="primary_input" role="input">
                    <paProp lib="libmodule-hdi-source.z.so" role="source" moduleName="Built_in_mic"/>
                    <streamProps>
                        <streamProp format="s16le" sampleRates="48000" channelLayout="CH_LAYOUT_STEREO" bufferSize="4096"/>
                    </streamProps>
                </pipe>
            </pipes>
            <devices>
                <device name="Speaker_Out" type="DEVICE_TYPE_SPEAKER" pin="PIN_OUT_SPEAKER" role="output" supportPipes="primary_output"/>
                <device name="Wired_Headset_Out" type="DEVICE_TYPE_WIRED_HEADSET" pin="PIN_OUT_HEADSET" role="output" supportPipes="primary_output"/>
                <device name="Wired_Headphones_Out" type="DEVICE_TYPE_WIRED_HEADPHONES" pin="PIN_OUT_HEADPHONE" role="output" supportPipes="primary_output"/>
                <device name="Builtin_Mic_In" type="DEVICE_TYPE_MIC" pin="PIN_IN_MIC" role="input" supportPipes="primary_input"/>
                <device name="Wired_Headset_In" type="DEVICE_TYPE_WIRED_HEADSET" pin="PIN_IN_HS_MIC" role="input" supportPipes="primary_input"/>
            </devices>
        </adapter>
                <adapter name="usb">
            <pipes>
                <pipe name="usb_output" role="output">
                    <paProp lib="libmodule-hdi-sink.z.so" role="sink" fixed_latency="1" render_in_idle_state="1" moduleName="Usb_arm_speaker"/>
                    <streamProps>
                        <streamProp format="s16le" sampleRates="48000" channelLayout="CH_LAYOUT_STEREO" bufferSize="4096"/>
                    </streamProps>
                    <attributes>
                        <attribute name="preload" value="true"/>
                    </attributes>
                </pipe>
                <pipe name="usb_input" role="input">
                    <paProp lib="libmodule-hdi-source.z.so" role="source" moduleName="Usb_arm_mic"/>
                    <streamProps>
                        <streamProp format="s16le" sampleRates="48000" channelLayout="CH_LAYOUT_STEREO" bufferSize="19200"/>
                    </streamProps>
                </pipe>
            </pipes>
            <devices>
                <device name="Usb_Headset_Out" type="DEVICE_TYPE_USB_HEADSET" pin="PIN_OUT_USB_HEADSET" role="output" supportPipes="usb_output"/>
                <device name="Usb_Headset_In" type="DEVICE_TYPE_USB_HEADSET" pin="PIN_IN_USB_HEADSET" role="input" supportPipes="usb_input"/>
            </devices>
        </adapter>
```

### camera 通路定制

待添加

### 硬件编解码通路定制

待添加

## 恢复出厂模式定制

待添加

# 内核定制

## 修改内核 defconfig 配置

内核 defconfig 的位置在：

```bash
kernel/linux/spacemit_kernel-6.6/arch/riscv/configs/k1_defconfig
```

修改后，单独编译内核然后打包即可，如下：

```bash
./build.sh --product-name xxx --ccache --prebuilt-sdk -T build_kernel
./build/gen_zip.sh xxx
```

## 修改内核 dts 配置

内核的 dts 配置的位置在：

```bash
kernel/linux/spacemit_kernel-6.6/arch/riscv/boot/dts/spacemit
```

如下所示：

```bash
|-- k1-x-camera-reserved-mm.dtsi
|-- k1-x-camera-sdk.dtsi
|-- k1-x-camera-sensor.dtsi
|-- k1-x_deb1.dts
|-- k1-x_deb2.dts
|-- k1-x.dtsi
|-- k1-x-efuse.dtsi
|-- k1-x_evb.dts
|-- k1-x-hdmi.dtsi
|-- k1-x_hs450.dts
|-- k1-x_kx312.dts
|-- k1-x-lcd.dtsi
|-- k1-x_lpi3a.dts
|-- k1-x_milkv-jupiter.dts
|-- k1-x_mingo.dts
|-- k1-x_MINI-PC.dts
|-- k1-x_MUSE-Book.dts
|-- k1-x_MUSE-Card.dts
|-- k1-x_MUSE-N1.dts
|-- k1-x_MUSE-Paper2.dts
|-- k1-x_MUSE-Paper.dts
|-- k1-x_MUSE-Paper-mini-4g.dts
|-- k1-x_MUSE-Pi.dts
|-- k1-x_opp_table.dtsi
|-- k1-x_pinctrl.dtsi
|-- k1-x_SMT001.dts
|-- k1-x_thermal_cooling.dtsi
|-- k1-x_ZT001H.dts
|-- lcd
|   |-- lcd_ft8201sinx101_mipi.dtsi
|   |-- lcd_gc9503v_mipi.dtsi
|   |-- lcd_gx09inx101_mipi.dtsi
|   |-- lcd_icnl9911c_mipi.dtsi
|   |-- lcd_icnl9951r_mipi.dtsi
|   |-- lcd_jd9365dah3_mipi.dtsi
|   |-- lcd_jd9365da_mipi_1280x800.dtsi
|   |-- lcd_lt8911_edp_1920x1080.dtsi
|   |-- lcd_lt8911_edp_1920x1200.dtsi
|   |-- lcd_lt9711_dp_1920x1080.dtsi
|   `-- lcd_orisetech_ota7290b_mipi.dtsi
|-- m1-x_milkv-jupiter.dts
`-- Makefile
```

修改对应方案的 dts 配置后，单独编译内核然后打包即可，如下：

```bash
./build.sh --product-name xxx --ccache --prebuilt-sdk -T build_kernel
./build/gen_zip.sh xxx
```

## 添加需要加载的 ko

如果需要将内核编译出来的 ko 文件在系统开机的时候加载，需要修改 OpenHarmony 上层的配置，主要分为 2 步：

### 拷贝 ko

在 `device/board/spacemit/xxx/kernel` 的 `build_kernel.sh` 中进行拷贝，如下：

```bash
function cp_ko(){
  # cp ko to userspace
  cp ${KERNEL_BUILD_ROOT}/drivers/usb/typec/typec.ko ${OHOS_SOURCE_ROOT}/device/board/${DEVICE_BOARD}/${DEVICE_NAME}/kernel/ko
  cp ${KERNEL_BUILD_ROOT}/drivers/usb/typec/husb239.ko ${OHOS_SOURCE_ROOT}/device/board/${DEVICE_BOARD}/${DEVICE_NAME}/kernel/ko
  cp ${KERNEL_BUILD_ROOT}/drivers/net/wireless/realtek/rtl8852be/8852be.ko ${OHOS_SOURCE_ROOT}/device/board/${DEVICE_BOARD}/${DEVICE_NAME}/kernel/ko
  cp ${KERNEL_BUILD_ROOT}/drivers/net/wireless/realtek/rtl8852bs/8852bs.ko ${OHOS_SOURCE_ROOT}/device/board/${DEVICE_BOARD}/${DEVICE_NAME}/kernel/ko
}
```

在编译完内核后，将内核编译目录下的 ko 拷贝到 OpenHarmony 系统的目录下。

### 加载 ko

在 `device/board/spacemit/xxx/cfg` 的 `init.xxx.cfg` 中进行 ko 的加载，如下：

```bash
{
  "name" : "fs",
    "cmds" : [
      "insmod /vendor/modules/8852bs.ko ifname=wlan0 if2name=p2p0",
      "insmod /vendor/modules/typec.ko",
      "insmod /vendor/modules/husb239.ko"
    ]
},
```

开机后，会在 init 进程中，加载这些 ko。

## 给内核打补丁

先将对内核的修改生成补丁，然后将生成的补丁放置于 OpenHarmony 的配置目录下。

对于所有平台通用的补丁，放置在：

```bash
device/board/spacemit/kernel_patches/linux-6.6
```

对于特定平台使用的补丁，放置在：

```bash
device/board/spacemit/xxx/kernel/kernel_patch
```

在 `device/board/spacemit/xxx/kernel` 目录中的 `build_kernel.sh` 里面，打上相关 patch，如下：

```bash
patch -p1 <${OHOS_SOURCE_ROOT}/device/board/spacemit/kernel_patches/linux-6.6/0001-bounds_checking_function-include.patch
patch -p1 <${OHOS_SOURCE_ROOT}/device/board/spacemit/kernel_patches/linux-6.6/0002-fix-hmdfs-permission.patch
patch -p1 <${OHOS_SOURCE_ROOT}/device/board/${DEVICE_BOARD}/${DEVICE_NAME}/kernel/kernel_patch/0001-kernel-audio.patch
```

# FAQ

引用自 [进迭时空开发者文档](https://developer.spacemit.com/documentation?token=Z1vowF27PiUCHrkAtVicCGBjnJd)