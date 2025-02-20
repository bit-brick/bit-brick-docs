# K1 JOH5.0 系统调试说明

# 调试工具和方法

## 串口调试

可用，波特率 **115200**，直接使用即可，可以查看 uboot，kernel，OpenHarmony init 进程相关打印。

## hdc

hdc 类似 android 的 adb，支持 usb 和 tcp 这 2 种连接模式，使用 tcp 模式，端口默认设置为 55555。配置文件为 device/board/spacemit/xxx/cfg 的 default.para，如下所示：

```bash
persist.hdc.mode=usb,tcp
persist.hdc.port=55555
```

### 主机支持 hdc

#### windows 系统

windows 系统将 hdc.exe（[点我下载](https://archive.spacemit.com/tools/openharmony/hdc.zip)）放在特定目录，并设置环境变量路径。

#### ubuntu 系统

- 安装依赖项‌：打开终端，输入以下命令来更新软件包列表并安装必要的开发工具和库

  ```bash
  sudo apt-get update
  sudo apt-get install build-essential libstdc++6 libc++1·
  ```
- 下载 HDC 工具包‌：前往 OpenHarmony 官网下载适用于 Linux 平台的最新版 HDC 工具压缩包。将其放置于合适位置后进行解压操作，请根据实际情况调整解压路径

  ```bash
  tar -zxvf hdc_std_<version>_linux.tar.gz -C /opt/hdc/
  ```
- 设置环境变量‌：编辑用户的 shell 初始化脚本（如 `.bashrc`），添加以下行至文件末尾：

  ```bash
  export PATH=$PATH:/opt/hdc/bin
  source ~/.bashrc
  ```
- 验证安装成功与否‌：在新的终端窗口里尝试运行简单的帮助指令以确认一切就绪，如果能够看到详细的帮助文档，则表明整个过程顺利完成

  ```bash
  hdc help
  ```

### hdc 连接

#### 网络连接

需确保 hdc 的服务端和客户端在同一个局域网内，连接方式如下：

```bash
D:\>hdc tconn 10.0.90.142:55555
Connect OK

D:\>hdc shell
#
```

#### usb 连接

```bash
D:\>hdc list targets
0123456789ABCDEF

D:\>hdc shell
#
```

#### 多设备连接

通过 `-t` 参数指定设备即可，如下：

```bash
D:\>hdc list targets
0123456789ABCDEF
ABCDEF

D:\>hdc -t 0123456789ABCDEF shell
#
```

### hdc 常用命令

<table>
<tbody>
<tr>
<td>命令</td>
<td>用途</td>
</tr>
<tr>
<td>hdc list targets</td>
<td>查看当前所有设备</td>
</tr>
<tr>
<td>hdc shell reboot</td>
<td>重启</td>
</tr>
<tr>
<td>hdc uninstall com.example.myapp</td>
<td>卸载hap包</td>
</tr>
<tr>
<td>hdc install -r xxx.hap</td>
<td>重新安装hap包</td>
</tr>
<tr>
<td>hdc shell aa start -a EntryAbility -b com.example.myapp</td>
<td>启动hap</td>
</tr>
<tr>
<td>hdc file recv  /xxx  D:/</td>
<td>从小机copy文件到本地</td>
</tr>
<tr>
<td>hdc file send  D:/xxx  /data/</td>
<td>发送本地文件到小机</td>
</tr>
<tr>
<td>hdc start -r</td>
<td>重启服务端</td>
</tr>
</tbody>
</table>

### 各设备的 hdc 连接口

#### MUSEPaper&MUSEPaper2
![](https://developer.spacemit.com/resource/file/images?fileName=OiJhbcUsNo8MXpxnOJdcItoXnqg.png)

#### MUSEPi

![](https://developer.spacemit.com/resource/file/images?fileName=HYcSbQSkFoPKNRx6S1LcglSqnif.png)

#### MUSECard

![](https://developer.spacemit.com/resource/file/images?fileName=IHl0bCtrRo0APYxkWZMcnPEBnEh.png)

#### MUSEBook

![](https://developer.spacemit.com/resource/file/images?fileName=Kunebc9liojSTaxGyxrcntGfn6f.png)

## hilog

### 基本使用方法

hilog 类似于 android 的 logcat，基本使用方法如下：

```bash
hilog
hilog -r
```

### 常用命令

<table>
<tbody>
<tr>
<td>命令</td>
<td>用途</td>
<td>示例</td>
</tr>
<tr>
<td>hilog -h</td>
<td>获取帮助</td>
<td></td>
</tr>
<tr>
<td>hilog -t app|core|kmsg|init</td>
<td>- 阻塞式实时查询模块日志<br/>- 可以与其他参数同时使用</td>
<td>hilog -t core</td>
</tr>
<tr>
<td>hilog -t app|core|kmsg|init -x</td>
<td>- 非阻塞式实时查询模块日志<br/>- 可以与其他参数同时使用</td>
<td>hilog -t core -x</td>
</tr>
<tr>
<td>hilog -T &lt;tag&gt;</td>
<td>- 模块内指定tag<br/>- 可以与其他参数一起使用</td>
<td>hilog -T Launcher_Default</td>
</tr>
<tr>
<td>hilog -L D|I|W|E|F</td>
<td>- 指定level查询<br/>- D:debug, I:info, W:warning, E:error, F:fatal</td>
<td>hilog -L I</td>
</tr>
<tr>
<td>hilog -D &lt;domain&gt;<br/></td>
<td>- 日志的服务域，用于指定输出日志所对应的业务领域<br/>- 这是一个十六进制整数，范围从 0x0 到 0xFFFFF。<br/>- 建议使用0xAAABB格式，AAA表示子系统，BB表示模块<br/>- 指定domian查询<br/>- 可以与其他参数一起使用</td>
<td>hilog -D 0x0<br/></td>
</tr>
<tr>
<td>^</td>
<td>- 排除</td>
<td>hilog -t ^app -T ^BatteryThread</td>
</tr>
</tbody>
</table>

### 日志落盘

日志落盘意思就是将日志保存到文件中，导出来进行查看。

<table>
<tbody>
<tr>
<td>命令</td>
<td>用途</td>
</tr>
<tr>
<td>hilog -w start [-f "xxx"] [-l &lt;length&gt;] [-j &lt;jobid&gt;] [-m &lt;algorithm&gt;] [-n &lt;number&gt;]</td>
<td>启动落盘任务</td>
</tr>
<tr>
<td>hilog -w query [-j &lt;jobid&gt;]</td>
<td>查询落盘任务</td>
</tr>
<tr>
<td>hilog -w stop [-j &lt;jobid&gt;]</td>
<td>停止落盘任务</td>
</tr>
</tbody>
</table>

示例如下：

```
# hilog -w query
#
#hilog -w start -f "hilog" -l 66k -j 222 -m zlib -n 2                          
Persist task [jobid:222] started successfully
#cd /data/log/hilog
# ls -al
total 100
drwxr-x--- 2 logd   log     4096 1970-01-02 03:34 .
drwxrwx--- 6 system log     4096 1970-01-01 00:38 ..
-rw-r----- 1 logd   system 65540 1970-01-02 03:34 .persisterInfo_222
-rw-r----- 1 logd   system   132 1970-01-02 03:34 .persisterInfo_222.info
-rw-r----- 1 logd   system 12239 1970-01-02 03:34 hilog.002.19700102-033431.gz
-rw-r----- 1 logd   system  6883 1970-01-02 03:34 hilog.003.19700102-033431.gz
#
# hilog -w query -j 222 #指定jobid查询
222 core,app zlib /data/log/hilog/hilog 67584 2
#
# hilog -w query    #查询全部落盘任务
222 core,app zlib /data/log/hilog/hilog 67584 2
#
# hilog -w stop -j 222
Persist task [jobid:222] stopped successfully
#
# ls -al
total 36
drwxr-x--- 2 logd   log     4096 1970-01-02 03:35 .
drwxrwx--- 6 system log     4096 1970-01-01 00:38 ..
-rw-r----- 1 logd   system 12239 1970-01-02 03:34 hilog.002.19700102-033431.gz
-rw-r----- 1 logd   system 13000 1970-01-02 03:35 hilog.003.19700102-033431.gz
```

## hidumper

hidumper 是 OpenHarmony 中为开发、测试人员，IDE 工具提供统一的系统信息获取工具，帮助使用者分析，定位问题。

<table>
<tbody>
<tr>
<td>命令</td>
<td>用途</td>
</tr>
<tr>
<td>hidumper -h</td>
<td>获取帮助</td>
</tr>
<tr>
<td>hidumper --cpuusage [pid]</td>
<td>查看某个进程的cpu占用信息</td>
</tr>
<tr>
<td>hidumper --mem [pid]</td>
<td>查看某个进程的内存占用情况</td>
</tr>
<tr>
<td>hidumper  --cpufreq</td>
<td>查看cpu的频率</td>
</tr>
<tr>
<td>hidumper --storage</td>
<td>查看存储情况</td>
</tr>
<tr>
<td>hidumper --net</td>
<td>查看网络情况</td>
</tr>
</tbody>
</table>

## 参数管理

<table>
<tbody>
<tr>
<td>命令</td>
<td>用途</td>
</tr>
<tr>
<td>param -h</td>
<td>获取帮助</td>
</tr>
<tr>
<td>param ls -r</td>
<td>查看所用系统参数</td>
</tr>
<tr>
<td>param ls -r persist.sys.hilog.debug.on</td>
<td>查看系统参数</td>
</tr>
<tr>
<td>param get persist.sys.hilog.debug.on</td>
<td>获取系统参数</td>
</tr>
<tr>
<td>param set persist.sys.hilog.debug.on true</td>
<td>设置系统参数</td>
</tr>
</tbody>
</table>

## 模拟按键

### 鼠标操作

```c
# uinput -?
Usage: uinput <option> <command> <arg>...
The option are:
-M  --mouse
commands for mouse:
-m <dx> <dy>              --move   <dx> <dy>  -move to relative position (dx,dy),
   <dx1> <dy1> <dx2> <dy2> [smooth time] --trace -dx1 dy1 to dx2 dy2 smooth movement
-d <key>                  --down   key        -press down a button,
                                               0 is the left button, 1 is the right,
                                               2 is the middle
-u <key>                  --up     <key>      -release a button
-c <key>                  --click  <key>      -press the left button down,then raise
-b <dx1> <dy1> <id> [press time] [click interval time]                --double click
  [press time] the time range is more than 1ms but less than 300ms,
  [click interval time] the time range is more than 1ms but less than 450ms,
  Otherwise the operation result may produce error or invalid operation
 -press the left button down,then raise
   key value:0 - button left
   key value:1 - button right
   key value:2 - button middle
   key value:3 - button side
   key value:4 - button extra
   key value:5 - button forward
   key value:6 - button back
   key value:7 - button task
-s <key>                  --scroll <key>      -positive values are sliding backwards
-g <dx1> <dy1> <dx2> <dy2> [total time]       --drag <dx1> <dy1> <dx2> <dy2> [total time],
                                              dx1 dy1 to dx2 dy2 smooth drag
-i <time>                 --interval <time>   -the program interval for the (time) milliseconds
                                               negative values are sliding forwards
```

#### 命令示例

<table>
<tbody>
<tr>
<td>命令</td>
<td>用途</td>
</tr>
<tr>
<td>uinput -M -m 50 50</td>
<td>鼠标光标移动到（50,50）位置</td>
</tr>
<tr>
<td>Uinput -M -b 50 200 0 100 300</td>
<td>鼠标在（50,200）左键双击，点击事件100ms，双击的间隔时间300ms</td>
</tr>
</tbody>
</table>

### 键盘操作

```c
# uinput -?
Usage: uinput <option> <command> <arg>...
The option are:
-K  --keyboard
commands for keyboard:
-d <key>                   --down   <key>     -press down a key
-u <key>                   --up     <key>     -release a key
-l <key> [long press time] --long_press <key> [long press time] -press and hold the key
-i <time>                  --interval <time>  -the program interval for the (time) milliseconds
```

#### 按键值

<table>
<tbody>
<tr>
<td>key</td>
<td>keycode</td>
</tr>
<tr>
<td>KEYCODE_HOME</td>
<td>1</td>
</tr>
<tr>
<td>KEYCODE_BACK</td>
<td>2</td>
</tr>
<tr>
<td>KEYCODE_VOLUME_UP</td>
<td>16</td>
</tr>
<tr>
<td>KEYCODE_VOLUME_DOWN</td>
<td>17</td>
</tr>
<tr>
<td>KEYCODE_POWER</td>
<td>18</td>
</tr>
<tr>
<td>KEYCODE_VOLUME_MUTE</td>
<td>22</td>
</tr>
<tr>
<td>KEYCODE_DPAD_UP</td>
<td>2012</td>
</tr>
<tr>
<td>KEYCODE_DPAD_DOWN</td>
<td>2013</td>
</tr>
<tr>
<td>KEYCODE_DPAD_LEFT</td>
<td>2014</td>
</tr>
<tr>
<td>KEYCODE_DPAD_RIGHT</td>
<td>2015</td>
</tr>
<tr>
<td>KEYCODE_DPAD_CENTER</td>
<td>2016</td>
</tr>
<tr>
<td>KEYCODE_TAB</td>
<td>2049</td>
</tr>
</tbody>
</table>

#### 命令示例

<table>
<tbody>
<tr>
<td>命令</td>
<td>用途</td>
</tr>
<tr>
<td>uinput -K -d 1 -u 1</td>
<td>按HOME键返回主界面</td>
</tr>
<tr>
<td>uinput -K -d 1 -u 1</td>
<td>声音调大</td>
</tr>
</tbody>
</table>

### 触屏操作

```c
# uinput -?
Usage: uinput <option> <command> <arg>...
The option are:
-T  --touch
commands for touch:
-d <dx1> <dy1>             --down   <dx1> <dy1> -press down a position  dx1 dy1,
-u <dx1> <dy1>             --up     <dx1> <dy1> -release a position dx1 dy1,
-m <dx1> <dy1> <dx2> <dy2> [smooth time]      --smooth movement
   <dx1> <dy1> <dx2> <dy2> [smooth time]      -smooth movement,
                                              dx1 dy1 to dx2 dy2 smooth movement
-c <dx1> <dy1> [click interval]               -touch screen click dx1 dy1
```

#### 命令提示

待完善

## 服务管理

<table>
<tbody>
<tr>
<td>命令</td>
<td>用途</td>
</tr>
<tr>
<td>service_control start pulseaudio</td>
<td>启动pulseaudio服务</td>
</tr>
<tr>
<td>service_control stop pulseaudio</td>
<td>停止pulseaudio服务</td>
</tr>
</tbody>
</table>

## hiperf

[https://device.harmonyos.com/cn/docs/documentation/guide/subsys-toolchain-hiperf-0000001186316470](https://device.harmonyos.com/cn/docs/documentation/guide/subsys-toolchain-hiperf-0000001186316470)

## bytrace

通过 hdc 来获取 trace 的方法如下：

- 抓取 trace：

```
D:\>hdc shell
# param set const.security.developermode.state true
# param set persist.hdc.root 1
# echo > /sys/kernel/debug/tracing/trace
# echo 4096 > /sys/kernel/debug/tracing/saved_cmdlines_size
# bytrace -t 10 -b 4096 --overwrite ohos zimage zmedia zcamera zaudio ability distributeddatamgr graphic freq irq mdfs workq  mmc idle notification sync pagecache ace app > /mnt/mynewtrace.ftrace
# echo > /sys/kernel/debug/tracing/trace
# exit
D:\>hdc file recv /mnt/mynewtrace.ftrace
查看trace：
https://ui.perfetto.dev（科学上网）
```

查看 trace：

## bootchart

使用方法：

```bash
1. hdc shell
2. begetctl bootchart enable
3. reboot 或者断电重启
4. begetctl bootchart stop
5. begetctl bootchart disable
6. 进入到/data/service/el0/startup/init/文件夹下查看是否有如下文件：
header、proc_diskstats.log、proc_ps.log、proc_stat.log
7. 在/data/service/el0/startup/init/目录下执行命令：tar -czf bootchart.tgz *  # 打包
8. hdc_std file recv /data/service/el0/startup/init/bootchart.tgz ./        #导出
9. 生成开机性能图片 java -jar bootchart.jar bootchart.tgz
```

## glmark

使用方法：

```bash
执行下面3条命令可运行glmark老化：
power-shell setmode 602
cd /system/bin
./glmark2-es2 --run-forever --size 720x720
```

## wpa\_supplicant&wpa\_cli

```bash
使用方法：
1. 开启再关闭wifi
2. cd /vendor/bin/
3. ./wpa_supplicant -B -i wlan0 -c /data/service/el1/public/wifi/wpa_supplicant/wpa_supplicant.conf
4. ps -ef | grep wpa查看wpa_supplicant是否起来
5. /wpa_cli -p /data/service/el1/public/wifi/sockets/wpa
6. > scan
7. > scan_results
8. > add_network，返回一个ID
9. > set_network ID ssid "WIFI名称"
10. > set_network ID psk "WIFI密码"
11. > enable_network ID
```

## snapshot\_display

```bash
param set const.security.developermode.state true
param set persist.hdc.root 1
snapshot_display -f /data/local/tmp/test1.jpeg
```

## wukong

待完善

## power-shell

```
power-shell setmode 602      #性能模式，关闭休眠
power-shell suspend          #休眠
power-shell display -s xxx   #设置亮度
```

## 重新挂载 system/vendor 分区为可读写

system/vendor 分区默认挂载为只读（ro），当调试的时候需要使用 `hdc file send` 推文件的时候，需要将其重新挂载为可读写，如下：

```shell
mount -o remount,rw /vendor
mount -o remount,rw /
```

系统重启后失效，需要重新挂载

## gdb 调试

待添加

# 常用测试方法

## monkey 测试

待添加

## 循环 reboot

待添加

## 循环音乐播放

待添加

## 循环视频播放

待添加

# 常见问题调试手段

## 外设

### 屏幕背光无法调节

- 通过查看和设置节点 `sys/class/backlight/backlight/brightness` 来确认驱动是否正常
- 如果设置上述节点亮度无变化，说明驱动存在问题，需要查驱动，重点查看背光对应的 PWM 是否正常工作
- 如果设置上述节点亮度有变化，说明是 OH 上层的问题，可以通过命令 power-shell display -s xxx(100\>xxx\>0)来查看亮度是否有变化

## 系统

### cppcrash

待添加

引用自 [进迭时空开发者文档](https://developer.spacemit.com/documentation?token=Mqo9wGcBOiUbKUk22cAcYAlOnce)
