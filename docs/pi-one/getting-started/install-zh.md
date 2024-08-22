# Install an operating system
系统镜像下载地址:  

[Bianbu desktop for SDcard](https://archive.spacemit.com/image/k1/version/bianbu/v1.0.13/bianbu-23.10-desktop-k1-v1.0.13-release-20240816183401.img.zip)


以 img.zip 结尾的固件为 sdcard 固件，解压后可以用 dd 命令或者 balenaEtcher 写入 sdcard。注意此固件不适用于 eMMC。

## PC 配置要求
操作系统：Windows 或 Linux 或 MacOS
C 盘空间（或 Linux/MacOS 系统 Home 空间）：> 5GB

## 烧录到SD卡

## 基于Windows PC将Linux镜像烧写到TF卡的方法
### 使用balenaEtcher烧录镜像的方法
1. 首先准备一张16GB或更大容量的TF卡，TF卡的传输速度必须为class10级或class10级以上，建议使用闪迪等品牌的TF卡

2. 然后使用读卡器把TF卡插入电脑

3. 找到下载下来的Linux操作系统镜像文件压缩包，以img.zip结尾。

4. 然后下载Linux镜像的烧录软件——balenaEtcher，下载地址为
https://www.balena.io/etcher/

5. 进入balenaEtcher下载页面后，点击绿色的下载按钮会跳到软件下载的地方

![balena_download](/img/pi-one/getting-started/install/balena_download.png)

6. 然后可以选择下载balenaEtcher的Portable版本的软件，Portable版本无需安装，双击打开就可以使用

![balena_download](/img/pi-one/getting-started/install/balena_download1.png)

7. 如果下载的是需要安装版本的balenaEtcher，请先安装再使用。如果下载的Portable版本balenaEtcher，直接双击打开即可，打开后的balenaEtcher界面如下图所示

![balena1](/img/pi-one/getting-started/install/balenaEtcher_001.png)

8. 使用balenaEtcher烧录Linux镜像的具体步骤如下所示

    - 首先选择要烧录的Linux镜像文件的路径

    - 然后选择TF卡的盘符

    - 最后点击Flash就会开始烧录Linux镜像到TF卡中

    ![balena1](/img/pi-one/getting-started/install/balenaEtcher_002.png)

9. balenaEtcher烧录Linux镜像的过程显示的界面如下图所示，另外进度条显示紫色表示正在烧录Linux镜像到TF卡中

 ![balena1_flashing](/img/pi-one/getting-started/install/balenaEtcher_Flashing.png)

10. Linux镜像烧录完后，balenaEtcher默认还会对烧录到TF卡中的镜像进行校验，确保烧录过程没有出问题。如下图所示，显示绿色的进度条就表示镜像已经烧录完成，balenaEtcher正在对烧录完成的镜像进行校验

![balena1_flashing](/img/pi-one/getting-started/install/balenaEtcher_Validating.png)

11. 成功烧录完成后balenaEtcher的显示界面如下图所示，如果显示绿色的指示图标说明镜像烧录成功，此时就可以退出balenaEtcher，然后拔出TF卡插入到开发板的TF卡槽中使用了

![balena1_flashing](/img/pi-one/getting-started/install/balenaEtcher_003.png)


## 基于Ubuntu将Linux镜像烧写到TF卡的方法
### 使用balenaEtcher烧录Linux镜像的方法
1. 首先准备一张16GB或更大容量的TF卡，TF卡的传输速度必须为class10级或class10级以上，建议使用闪迪等品牌的TF卡

2. 然后使用读卡器把TF卡插入电脑

3. 找到下载下来的Linux操作系统镜像文件压缩包，以img.zip结尾。
    
4. 然后下载Linux镜像的烧录软件——balenaEtcher，下载地址为
https://www.balena.io/etcher/

5. 进入balenaEtcher下载页面后，点击绿色的下载按钮会跳到软件下载的地方
![balena_download](/img/pi-one/getting-started/install/balena_download.png)

6. 然后可以选择下载balenaEtcher的Portable版本的软件，Portable版本无需安装，双击打开就可以使用
![balena_download](/img/pi-one/getting-started/install/balena_download_ubuntu.png)

7. 然后在Ubuntu PC的图形界面双击balenaEtcher-1.14.3-x64.AppImage即可打开balenaEtcher（无需安装），balenaEtcher打开后的界面显示如下图所示
![balena1](/img/pi-one/getting-started/install/balenaEtcher_001.png)

8. 使用balenaEtcher烧录Linux镜像的具体步骤如下所示

    - 首先选择要烧录的Linux镜像文件的路径

    - 然后选择TF卡的盘符

    - 最后点击Flash就会开始烧录Linux镜像到TF卡中

    ![balena1](/img/pi-one/getting-started/install/balenaEtcher_002.png)

9. balenaEtcher烧录Linux镜像的过程显示的界面如下图所示，另外进度条显示紫色表示正在烧录Linux镜像到TF卡中
 ![balena1_flashing](/img/pi-one/getting-started/install/balenaEtcher_Flashing.png)

10. Linux镜像烧录完后，balenaEtcher默认还会对烧录到TF卡中的镜像进行校验，确保烧录过程没有出问题。如下图所示，显示绿色的进度条就表示镜像已经烧录完成，balenaEtcher正在对烧录完成的镜像进行校验
![balena1_flashing](/img/pi-one/getting-started/install/balenaEtcher_Validating.png)

11. 成功烧录完成后balenaEtcher的显示界面如下图所示，如果显示绿色的指示图标说明镜像烧录成功，此时就可以退出balenaEtcher，然后拔出TF卡插入到开发板的TF卡槽中使用了
![balena1_flashing](/img/pi-one/getting-started/install/balenaEtcher_003.png)



