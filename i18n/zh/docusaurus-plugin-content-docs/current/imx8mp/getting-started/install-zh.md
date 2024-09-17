# Install an operating system
Pi one linux 镜像下载地址:  
[yocto bsp](https://drive.google.com/drive/folders/1DeiQxV0aQYxEGHuIq0V043Mfd73IX5uA?usp=drive_link)

[ubuntu](https://drive.google.com/drive/folders/1DeiQxV0aQYxEGHuIq0V043Mfd73IX5uA?usp=drive_link)
## 基于Windows PC将Linux镜像烧写到TF卡的方法
### 使用balenaEtcher烧录Linux镜像的方法
1. 首先准备一张16GB或更大容量的TF卡，TF卡的传输速度必须为class10级或class10级以上，建议使用闪迪等品牌的TF卡

2. 然后使用读卡器把TF卡插入电脑

3. 找到下载下来的Linux操作系统镜像文件压缩包，然后使用解压软件解压，解压后的文件中，以”.wic”结尾的文件就是操作系统的镜像文件，大小一般都在1GB以上

4. 然后下载Linux镜像的烧录软件——balenaEtcher，下载地址为
https://www.balena.io/etcher/

5. 进入balenaEtcher下载页面后，点击绿色的下载按钮会跳到软件下载的地方
![balena_download](/img/imx8mp/getting-started/install/balena_download.png)

6. 然后可以选择下载balenaEtcher的Portable版本的软件，Portable版本无需安装，双击打开就可以使用
![balena_download](/img/imx8mp/getting-started/install/balena_download1.png)

7. 如果下载的是需要安装版本的balenaEtcher，请先安装再使用。如果下载的Portable版本balenaEtcher，直接双击打开即可，打开后的balenaEtcher界面如下图所示
![balena1](/img/imx8mp/getting-started/install/balenaEtcher_001.png)

8. 使用balenaEtcher烧录Linux镜像的具体步骤如下所示

    - 首先选择要烧录的Linux镜像文件的路径

    - 然后选择TF卡的盘符

    - 最后点击Flash就会开始烧录Linux镜像到TF卡中

    ![balena1](/img/imx8mp/getting-started/install/balenaEtcher_002.png)

9. balenaEtcher烧录Linux镜像的过程显示的界面如下图所示，另外进度条显示紫色表示正在烧录Linux镜像到TF卡中
 ![balena1_flashing](/img/imx8mp/getting-started/install/balenaEtcher_Flashing.png)

10. Linux镜像烧录完后，balenaEtcher默认还会对烧录到TF卡中的镜像进行校验，确保烧录过程没有出问题。如下图所示，显示绿色的进度条就表示镜像已经烧录完成，balenaEtcher正在对烧录完成的镜像进行校验
![balena1_flashing](/img/imx8mp/getting-started/install/balenaEtcher_Validating.png)

11. 成功烧录完成后balenaEtcher的显示界面如下图所示，如果显示绿色的指示图标说明镜像烧录成功，此时就可以退出balenaEtcher，然后拔出TF卡插入到开发板的TF卡槽中使用了
![balena1_flashing](/img/imx8mp/getting-started/install/balenaEtcher_003.png)

## 基于Ubuntu将Linux镜像烧写到TF卡的方法
### 使用balenaEtcher烧录Linux镜像的方法
1. 首先准备一张16GB或更大容量的TF卡，TF卡的传输速度必须为class10级或class10级以上，建议使用闪迪等品牌的TF卡

2. 然后使用读卡器把TF卡插入电脑

3. 找到下载下来的Linux操作系统镜像文件压缩包，然后使用如下命令，解压后的文件中，以”.wic”结尾的文件就是操作系统的镜像文件，大小一般都在1GB以上
    ~~~bash
    $ zstd -d imx-image-desktop.rootfs.wic.zst 
    ~~~
4. 然后下载Linux镜像的烧录软件——balenaEtcher，下载地址为
https://www.balena.io/etcher/

5. 进入balenaEtcher下载页面后，点击绿色的下载按钮会跳到软件下载的地方
![balena_download](/img/imx8mp/getting-started/install/balena_download.png)

6. 然后可以选择下载balenaEtcher的Portable版本的软件，Portable版本无需安装，双击打开就可以使用
![balena_download](/img/imx8mp/getting-started/install/balena_download_ubuntu.png)

7. 然后在Ubuntu PC的图形界面双击balenaEtcher-1.14.3-x64.AppImage即可打开balenaEtcher（无需安装），balenaEtcher打开后的界面显示如下图所示
![balena1](/img/imx8mp/getting-started/install/balenaEtcher_001.png)

8. 使用balenaEtcher烧录Linux镜像的具体步骤如下所示

    - 首先选择要烧录的Linux镜像文件的路径

    - 然后选择TF卡的盘符

    - 最后点击Flash就会开始烧录Linux镜像到TF卡中

    ![balena1](/img/imx8mp/getting-started/install/balenaEtcher_002.png)

9. balenaEtcher烧录Linux镜像的过程显示的界面如下图所示，另外进度条显示紫色表示正在烧录Linux镜像到TF卡中
 ![balena1_flashing](/img/imx8mp/getting-started/install/balenaEtcher_Flashing.png)

10. Linux镜像烧录完后，balenaEtcher默认还会对烧录到TF卡中的镜像进行校验，确保烧录过程没有出问题。如下图所示，显示绿色的进度条就表示镜像已经烧录完成，balenaEtcher正在对烧录完成的镜像进行校验
![balena1_flashing](/img/imx8mp/getting-started/install/balenaEtcher_Validating.png)

11. 成功烧录完成后balenaEtcher的显示界面如下图所示，如果显示绿色的指示图标说明镜像烧录成功，此时就可以退出balenaEtcher，然后拔出TF卡插入到开发板的TF卡槽中使用了
![balena1_flashing](/img/imx8mp/getting-started/install/balenaEtcher_003.png)





