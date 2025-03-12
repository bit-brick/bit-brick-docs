# 刷机工具使用手册


本文介绍刷机工具 TitanFlasher 下载、安装和使用步骤。

## 1 下载

<table>
<tbody>
<tr>
<td>资源</td>
<td>平台</td>
<td>ARCH</td>
<td>下载</td>
</tr>
<tr>
<td>TITANTOOLS FOR WINDOWS (X86|X64) (INSTALLER)</td>
<td>WINDOWS</td>
<td>X86|X64</td>
<td> <a href="https://cloud.spacemit.com/prod-api/release/download/tools?token=titantools_for_windows_X86_X64">Download</a></td>
</tr>
<tr>
<td>TITANTOOLS FOR  LINUX  X64 (64-BIT) (APPIMAGE)</td>
<td> LINUX </td>
<td>X64   </td>
<td> <a href="https://cloud.spacemit.com/prod-api/release/download/tools?token=titantools_for_linux_64BIT_APPIMAGE">Download</a></td>
</tr>
</tbody>
</table>

## 2 安装

### 2.1 PC 配置要求

- 操作系统：Windows 或 Linux
- C 盘空间（或 Linux 系统 Home 空间）：\> 10GB

### 2.2 windows 安装

以 Windows 11 为例。

1. 下载最新版本的刷机工具 [titantools\_for\_windows.exe ](https://cloud.spacemit.com/prod-api/release/download/tools?token=titantools_for_windows_X86_X64)
2. 双击 titantools\_for\_windows\_last 安装；
3. 如果系统提示你要允许来自未知发布者的此应用对你的设备进行更改吗？，选择是；
4. 如果系统提示 Windows 无法验证此驱动程序软件的发布者，选择始终安装此驱动软件；
![](https://developer.spacemit.com/resource/file/images?fileName=Yydbb4nKjobRtkx0i6pcEgE0ngd.png)

5. 如果系统提示你要允许来自未知发布者的此应用对你的设备进行更改吗？，选择是。直到安装完成。

![](https://developer.spacemit.com/resource/file/images?fileName=HCFXbmtKboRUDjxnqz5c005HnSc.png)

### 2.3 Linux 上安装

以 Ubuntu 为例。

1. 下载最新版本的刷机工具 [titantools\_for\_linux.AppImage](https://cloud.spacemit.com/prod-api/release/download/tools?token=titantools_for_linux_64BIT_APPIMAGE)
2. 赋予可执行权限
3. 双击即可开始使用，无需安装

注意：如果启动失败报错："dlopen(): error loading libfuse.so.2" 可安装 libfuse 依赖:

```
sudo apt install libfuse2
```

## 3. 功能介绍

### 3.1.1 工具首页

1. 打开刷机工具，如果系统提示你要允许来自未知发布者的此应用对你的设备进行更改吗？，选择是。    首页展示了四个主要功能模块：研发工具、量产工具、测试工具、在线云设备。点击不同的工具模块将跳转到对应的页面。

![](https://developer.spacemit.com/resource/file/images?fileName=CQZ4bmOgSojo0vxKWykcGReon7d.png)

### 3.1.2 研发工具模块

在首页点击研发工具，跳转到研发工具界面。

![](https://developer.spacemit.com/resource/file/images?fileName=JjEjbdWKuoT59hxuO9hc7YainTd.png)

#### 单机烧录

在研发工具页面有单机烧录选项和卡启动选项，这里选择单机烧录选项。

![](https://developer.spacemit.com/resource/file/images?fileName=QqkJbAl4CoqVTFxUcuecLdAMnXe.png)

1. 在研发工具界面点击扫描设备

注：扫描设备前确保设备进入刷机模式，否则无法扫描成功。

![](https://developer.spacemit.com/resource/file/images?fileName=RV1bbyJNDooAj6xgQ9gczBPEnlf.png)

成功扫描到设备时，会出现下图类似的刷机序列号。

![](https://developer.spacemit.com/resource/file/images?fileName=KxEwbRYIBoOtIhxADNZc2Ca3nGc.png)

1. 若存在多个设备，点击下拉按钮，即可进行设备选择。

![](https://developer.spacemit.com/resource/file/images?fileName=X7dgbTlEBoa4ECxWN50cJu75nqA.png)

![](https://developer.spacemit.com/resource/file/images?fileName=HIw0bvaqVoaOZPxksv7c3IFQnZc.png)

1. 在识别到设备之后，在图片选中位置可下拉选择文件路径来源。分别可以选择本地文件、本地目录以及网络文件。

![](https://developer.spacemit.com/resource/file/images?fileName=ESYhbZ43BomkCAx2qw7ceisbnDc.png)

1. 点击选择刷机文件，选择固件，然后工具提示 `正在解压文件...`，耐心等待完成。（若需要配置分区，请浏览 1.3.4 小节）

![](https://developer.spacemit.com/resource/file/images?fileName=JDbTbuJhEo0w6Xxw20OcL23WnJf.png)

1. 解压完成之后，下方显示刷机包名称

![](https://developer.spacemit.com/resource/file/images?fileName=QCG6bSIOQorq4Wx3H02c8gJunZG.png)

1. 点击开始刷机，启动刷机。

![](https://developer.spacemit.com/resource/file/images?fileName=Nw4abpY2boettsxkPhscsQdRnjf.png)

1. 刷机完成，重新上电即可进入系统。

#### 卡启动

1. 在研发工具界面点击卡启动选项，进入卡启动界面。

![](https://developer.spacemit.com/resource/file/images?fileName=SPUCbc3rMo8GhDx4KFWcqRWynde.png)

1. 在卡启动页面点击选择 SD 卡。注：在进行卡启动前，电脑需要插入 SD 卡。

![](https://developer.spacemit.com/resource/file/images?fileName=PcvrbOsjdoeCp8xfwOCcWMIonEd.png)

1. 点击选择 SD 卡之后，会弹出下图界面，选择 sd 卡。

![](https://developer.spacemit.com/resource/file/images?fileName=LbavbcTnZoEhr1x290Zc3JEZnYg.png)

1. 选择 SD 卡之后，下图位置会显示选择的 SD 卡名称。

![](https://developer.spacemit.com/resource/file/images?fileName=EhhSbNl0Ao1O33xQ7h0crlsTnbg.png)

1. 选择 SD 卡之后，点击选择刷机包弹出下图选项，选择刷机包路径。

![](https://developer.spacemit.com/resource/file/images?fileName=PtqsbzOi1o3H7NxOwsbc3ESfnDf.png)

1. 选择好刷机包之后，下图位置显示刷机包路径以及名称。

![](https://developer.spacemit.com/resource/file/images?fileName=V9CPbOBjfoXwhbxNv8qcj5H7nt0.png)

1. 选择刷机包之后，在下图位置选择需要进行的操作，默认选择烧录启动卡。

（注：烧录启动卡前需要格式化 sd 卡，请提前做好备份，以免数据丢失）

![](https://developer.spacemit.com/resource/file/images?fileName=YYFibjneBo7UG6x7YTScCfEUnIg.png)

1. 点击执行后，会弹出下图窗口，点击确定后，等待解压压缩包完成。

![](https://developer.spacemit.com/resource/file/images?fileName=RlrjbaX20o99cnxTO12cCuf3n2b.png)

1. 解压完成之后，开始烧写，等待烧写结束即可。

![](https://developer.spacemit.com/resource/file/images?fileName=Gf98b0GsCoIWG1xXnEZcTUtDnHf.png)

### 3.2 配置分区

1. 在选择好烧录设备以及烧录固件之后，可根据需要配置分区文件。

![](https://developer.spacemit.com/resource/file/images?fileName=NbdvbMECIo1hHBxlMXRcCGBFndc.png)

1. 开启配置分区文件后，会弹出以下窗口，可选择或替换对应的分区文件。

![](https://developer.spacemit.com/resource/file/images?fileName=L7AObaHEqonYcoxZplCc114AnJb.png)

1. 在选择好分区文件之后，会出现以下内容。

（注：选择不同的分区文件，所对应的分区名会有所不一样，请确保分区文件不会产生冲突。）

![](https://developer.spacemit.com/resource/file/images?fileName=IgakbjF7DoNasIxW9XAcjMb1ndH.png)

### 3.3 量产工具模块

#### 多机烧录

点击进入量产工具页面，选择多机烧录。注意：多机烧录模式只支持 zip 文件。

![](https://developer.spacemit.com/resource/file/images?fileName=RY97b2Dv7oftDIxoSkTcNdYJnOc.png)

1. 选择多机烧录，然后选择刷机固件。

![](https://developer.spacemit.com/resource/file/images?fileName=MxFmbEJqyoyOpOxMbTNcdn3PnQh.png)

当选择好刷机文件并且解压完成之后，在下图位置显示解压好之后的文件路径。

![](https://developer.spacemit.com/resource/file/images?fileName=C4zGbUTfYoJlCkxEnU2ciIGQn2c.png)

1. 点击开始多机烧录之后，会弹出多机烧录窗口，开启 USB 标定模式，绑定 USB 端口。

![](https://developer.spacemit.com/resource/file/images?fileName=TTmcbeYZFodrEtxj2l9cuFzenMd.png)

1. 绑定完成之后，下方显示对应的 USB 号。

![](https://developer.spacemit.com/resource/file/images?fileName=UjrEbZv8Oo9PfIxscyqcFoMXn1e.png)

1. USB 绑定之后，关闭 USB 标定模式，等待检查到设备。USB 标定模式可对设备标定 USB 号，用于检测对应 USB 的烧录情况。

![](https://developer.spacemit.com/resource/file/images?fileName=KPvDbIRVNoDtj2xwvAbcWQ0YnTb.png)

1. 若需要解除绑定，重新打开 USB 标定模式，点击下图按钮即可，解除之后可以重新进行标定。

![](https://developer.spacemit.com/resource/file/images?fileName=EsokbL99OobEidx88R5cdLnEnFh.png)

1. 关闭 USB 标定模式，选择自动烧录或手动烧录，等待设备烧录完成。

注：

自动烧录模式即：若当前设备烧录完成之后，在不变更 USB 的情况下，继续使用该 USB 号连接新的设备时，继续烧录固件。

手动烧录模式即：当前设备烧录完成后，手动控制是否继续烧录固件。

![](https://developer.spacemit.com/resource/file/images?fileName=UGHPbezwxoE5n4xuRgScak26nrf.png)

1. 烧录完成即可关闭窗口。

![](https://developer.spacemit.com/resource/file/images?fileName=NeU7bnaowoOdwAxCH06c1aoanCh.png)

1. 若打开调试信息选项，将出现如下窗口。

![](https://developer.spacemit.com/resource/file/images?fileName=VBBdbbUmXoefMRxYD3dceVsTnrg.png)

#### 制作量产卡

![](https://developer.spacemit.com/resource/file/images?fileName=Wdfgb7iS2oiUKexP6gOcMlybnF2.png)

### 3.4 写号工具

1. 点击量产工具选择“写号工具”

![](https://developer.spacemit.com/resource/file/images?fileName=XAyQbslFFoE2gqxqkfXcpvFInmd.png)

1. 点击扫描设备成功识别设备序列号

![](https://developer.spacemit.com/resource/file/images?fileName=G1lwbzTLIobH1Ax6yQZcwJG4nqb.png)

1. ，点击“配置自定义字段”进入设置

![](https://developer.spacemit.com/resource/file/images?fileName=VAjdbUhjtoHKtsxecunczvs3nXd.png)

1. 启用需要写入的字段，不需要写入的字段禁用

![](https://developer.spacemit.com/resource/file/images?fileName=ZZGIbBBupoLibIx3BshcbnVVnie.png)

1. 可以选择随机或者自定义

![](https://developer.spacemit.com/resource/file/images?fileName=KrgQbScoconme5xHZ1qcRI5unfd.png)

1. 设置完毕后点击“开始写号”等待写号成功即可

![](https://developer.spacemit.com/resource/file/images?fileName=QsCGbpltDoEIEzxRQ6Fc26Sxntf.png)

![](https://developer.spacemit.com/resource/file/images?fileName=LeUXbAlyVolA6hx8LRucbOGQnjh.png)

### 3.5 设置

1. 下图为设置界面。

![](https://developer.spacemit.com/resource/file/images?fileName=BK0ob5vHLow8O8xWAOZcTW37nKi.png)

1. 下图红圈位置显示当前的工作空间。

![](https://developer.spacemit.com/resource/file/images?fileName=UpxNb8YjZoPqaXxWhCVcEVMNnVg.png)

1. 若需要更换工作空间，可点击修改，重新选择工作空间。

![](https://developer.spacemit.com/resource/file/images?fileName=MwhTbDgv4oNXvix6Olccoo2Vnuf.png)

1. 下图红圈位置显示当前工作空间占用的大小。

![](https://developer.spacemit.com/resource/file/images?fileName=UBXhbkIXxoWmLvxfInocTCDonmc.png)

1. 若点击清理按键，将会弹出以下窗口，点击 Yes，将清空当前工作空间的所有文件。

![](https://developer.spacemit.com/resource/file/images?fileName=NhlObTtKlo8xJ8xP5QFczDkVnfd.png)

1. 清理完成，显示当前占用空间为 0GB。

![](https://developer.spacemit.com/resource/file/images?fileName=RKd7b8i8loxw2IxnbV0cZwKNndh.png)

1. 自动清理

![](https://developer.spacemit.com/resource/file/images?fileName=INfQbBeAuoZ12qxUOX7chikKnyg.png)

1. 快速烧卡模式

![](https://developer.spacemit.com/resource/file/images?fileName=N5vFbi1w9o4fAixoZLmcSeM4nwf.png)

1. 点击关于，显示当前刷机工具套件的版本信息。

![](https://developer.spacemit.com/resource/file/images?fileName=QQuPbhBE2o1vzOx83fFc1LOHnhb.png)

1. 点击检测更新，检验当前版本是否为最新版本，若不是最新版本，将会弹出提示：有新版本更新，请下载最新版本。

![](https://developer.spacemit.com/resource/file/images?fileName=F1sjbCHc8oUOg7xwaBFcWAa8nKe.png)

![](https://developer.spacemit.com/resource/file/images?fileName=Cz2bbElB9owumrx7sujcb9AJnmg.png)

## 4 刷机流程

### 4.1 进入刷机模式

- 设备未上电，处于关机状态时：

  - 1. 按住“下载（FDL）“按键不松开
  - 2. 插上电源线
  - 3. 松开“下载（FDL）“按键
  - 4. 插上 USB 数据线到刷机 USB 连接器，即可扫描到设备
- 设备已插上电源线上电，处于开机状态时：

  - 1. 按住 FDL 按键不松开；
  - 2. 短按 Reset 键；
  - 3. 松开 FDL 按键；
  - 4. 插上 USB 数据线到刷机 USB 连接器，即可扫描到设备

### 4.2 刷机过程

1. 打开刷机工具，如果系统提示你要允许来自未知发布者的此应用对你的设备进行更改吗？，选择是。

![](https://developer.spacemit.com/resource/file/images?fileName=Il7eblJ0AoP3uVxkb8pcUOPgnVc.png)

2. 选择研发工具\>单机烧录。

![](https://developer.spacemit.com/resource/file/images?fileName=G8phbcUowogT90xjRpDci9sInxh.png)

3. 点击扫描设备，直到出现 VID:PID 字样，如有多个设备，请选择你要刷机的设备。设备进入下载模式之后才能被扫描到。

![](https://developer.spacemit.com/resource/file/images?fileName=TGmsbeoCooapQExYrGlcB6HKnjd.png)

4. 点击选择刷机文件，选择固件，然后工具提示 `正在解压文件...`，耐心等待刷机完成。

![](https://developer.spacemit.com/resource/file/images?fileName=HT2gbxdGFojCE6xbiGmczXrJn4d.png)

或选择已经解压好的刷机目录

![](https://developer.spacemit.com/resource/file/images?fileName=WVefbltEsoRDS1x7wO2cfRdUnad.png)

5. 点击开始刷机，启动刷机。

![](https://developer.spacemit.com/resource/file/images?fileName=CQArbwKpgo5zHFxuhYicQt0Unze.png)

6. 刷机完成，重新上电即可进入系统。
