# ubuntu

The ``kind`` parameter should be either ``"meat"``, ``"fish"``,
or ``"veggies"``. Otherwise, :py:func:`lumache.get_random_ingredients`
will raise an exception
~~~
sudo apt-get install gawk wget git-core diffstat unzip texinfo gcc-multilib \
build-essential chrpath socat cpio python python3 python3-pip python3-pexpect \
xz-utils debianutils iputils-ping python3-git python3-jinja2 libegl1-mesa libsdl1.2-dev \
pylint3 xterm rsync curl zstd pzstd lz4c lz
~~~

~~~
$ mkdir desktop
$ cd desktop
$ repo init -u https://github.com/nxp-imx/imx-manifest -b imx-linux-mickledore -m imx-6.1.22-2.0.0_desktop.xml
$ repo sync
~~~

~~~
ENV_HOST_PROXIES = "http_proxy=http://127.0.0.1:7890"

# Set user account and password
#APTGET_ADD_USERS = "user:password:shell"
#  format 'name:password:shell'.
#    'name' is the user name.
#    'password' is an encrypted password (e.g. generated with
#    `echo "P4sSw0rD" \| openssl passwd -stdin`).
#    If empty or missing, they'll get an empty password.
#    'shell' is the default shell (if empty, default is /bin/sh).
BB_NUMBER_THREADS ?= "6"

# 设置make命令的并发线程数量
PARALLEL_MAKE ?= "-j 6"
~~~


~~~
tensorflow-lite  bb file remove

SRC_URI += "https://storage.googleapis.com/download.tensorflow.org/models/mobilenet_v1_2018_08_02/mobilenet_v1_1.0_224_quant.tgz;name=model-mobv1"
SRC_URI[model-mobv1.md5sum] = "36af340c00e60291931cb30ce32d4e86"
SRC_URI[model-mobv1.sha256sum] = "d32432d28673a936b2d6281ab0600c71cf7226dfe4cdcef3012555f691744166"


SRC_URI += "https://storage.googleapis.com/download.tensorflow.org/models/mobilenet_v1_2018_08_02/mobilenet_v1_1.0_224_quant.tgz"
SRC_URI[sha256sum] = "d32432d28673a936b2d6281ab0600c71cf7226dfe4cdcef3012555f691744166"
SRC_URI[model-mobv1.md5sum] = "36af340c00e60291931cb30ce32d4e86"
SRC_URI[model-mobv1.sha256sum] = "d32432d28673a936b2d6281ab0600c71cf7226dfe4cdcef3012555f691744166"
~~~


~~~
bitbake kernel-module-isp-vvcam -c cleansstate
bitbake nxp-wlan-sdk -c cleansstate
bitbake kernel-module-nxp-wlan -c cleansstate
~~~



~~~
要使用 Yocto Devtool 修改 Linux 内核设备树（DTS）并重新构建内核，你可以按照以下步骤操作：

进入 Linux 内核源代码目录：
首先，使用 Devtool 进入 Linux 内核源代码目录。假设你已经通过 Devtool 添加了 Linux 内核，并使用 devtool modify 命令进入了内核源代码目录。如果尚未进入，可以执行以下命令：

ruby
Copy code
$ devtool modify linux-imx
编辑设备树文件（DTS）：
在 Linux 内核源代码目录中，找到并编辑与你要修改的设备树相关的 DTS 文件。你可以使用任何文本编辑器进行修改，例如 vim 或 nano：

shell
Copy code
$ vim arch/arm/boot/dts/imx-your-device.dts
保存修改：
在编辑完成后，保存你对设备树文件的修改。

重新构建 Linux 内核：
一旦修改了设备树文件，你需要重新构建 Linux 内核。在 Linux 内核源代码目录中执行以下命令：

python
Copy code
$ bitbake linux-imx -c compile -f
这将重新编译 Linux 内核并应用你对设备树文件的修改。

重新构建 Yocto 镜像：
如果你修改了设备树文件，可能需要重新构建 Yocto 镜像以包含这些修改。可以使用 bitbake 命令重新构建 Yocto 镜像：

arduino
Copy code
$ bitbake your-image-name
其中 your-image-name 是你要重新构建的 Yocto 镜像的名称。

部署更新后的 Yocto 镜像：
构建完成后，部署更新后的 Yocto 镜像到你的目标设备上进行测试。
~~~


~~~

bitbake -c noexec do_rootfs
使用缓存
~~~



~~~~
内存修改
kernel   /mnt/nvssd/ubuntu/build-desktop/workspace/sources/linux-imx/arch/arm64/boot/dts/freescale/imx8mp-evk.dts
	memory@40000000 {
		device_type = "memory";
		reg = <0x0 0x40000000 0 0x80000000>,
		      <0x1 0x00000000 0 0x80000000>;
	};


uboot imx8mp-evk.dts 修改
/mnt/nvssd/ubuntu/build-desktop/workspace/sources/u-boot-imx/include/configs/imx8mp_evk.h
/* Totally 6GB DDR */
#define CFG_SYS_SDRAM_BASE		0x40000000
#define PHYS_SDRAM			0x40000000
#define PHYS_SDRAM_SIZE			0x80000000	/* 3 GB */
#define PHYS_SDRAM_2			0x100000000
#ifdef CONFIG_TARGET_IMX8MP_DDR4_EVK
#define PHYS_SDRAM_2_SIZE		0x80000000	/* 1 GB */
#else
#define PHYS_SDRAM_2_SIZE		0x80000000	/* 3 GB */
#endif

~~~


1854377201382720512_5Z8P84ItFgOR5rjPtdxx5rYVCIMz37J1X8QRaPb45q165Rm6tRurS611Iok6ou78G87xQqeHSBrpa7NbDPjVnj7iJ3lCLRqlLEXa