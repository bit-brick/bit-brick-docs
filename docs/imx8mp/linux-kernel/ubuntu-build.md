# Build Ubuntu image

## 1.Installation required package
~~~
$ sudo apt-get install gawk wget git-core diffstat unzip texinfo gcc-multilib build-essential chrpath socat cpio python python3 python3-pip python3-pexpect 
xz-utils debianutils iputils-ping python3-git python3-jinja2 libegl1-mesa libsdl1.2-dev 
pylint3 xterm rsync curl zstd pzstd lz4c lz4 libssl-dev
$ sudo locale-gen en_US.UTF-8
~~~

## 2.Setting up the Repo utility
Repo is a tool built on top of Git that makes it easier to manage projects that contain
multiple repositories, which do not need to be on the same server. Repo complements
very well the layered nature of the Yocto Project, making it easier for users to add their
own layers to the BSP.
To install the “repo” utility, perform these steps:
- 2.1.  Create a bin folder in the home directory.
~~~
$ mkdir ~/bin (this step may not be needed if the bin folder
 already exists)
$ curl https://storage.googleapis.com/git-repo-downloads/repo
 > ~/bin/repo
$ chmod a+x ~/bin/repo
~~~
- 2.2 Add the following line to the .bashrc file to ensure that the ~/bin folder is in your
PATH variable.
~~~
export PATH=~/bin:$PATH
~~~


## 3.Yocto Project Setup
First, make sure that Git is set up properly with the commands below:
~~~
$ git config --global user.name "Your Name"
$ git config --global user.email "Your Email"
$ git config --list
~~~
The i.MX Yocto Project BSP Release directory contains a sources directory, which
contains the recipes used to build one or more build directories, and a set of scripts used
to set up the environment.
The recipes used to build the project come from both the community and i.MX. The Yocto
Project layers are downloaded to the sources directory. This sets up the recipes that are
used to build the project.
The following example shows how to download the i.MX Yocto Project Community BSP
recipe layers. For this example, a directory called imx-yocto-bsp is created for the
project. Any name can be used instead of this.
~~~
$ mkdir ubuntu
$ cd ubuntu
$ repo init -u https://github.com/nxp-imx/imx-manifest -b imx-linux-mickledore -m imx-6.1.22-2.0.0_desktop.xml
$ repo sync
~~~

## 4.Building the Project
### 4.1 change uboot
Replace the ``uboot`` bb file before starting the build.
``[your path]/ubuntu/sources/meta-imx/meta-bsp/recipes-bsp/u-boot/u-boot-imx_2023.04.bb``

before
~~~
UBOOT_SRC ?= "git://github.com/nxp-imx/uboot-imx.git;protocol=https"
SRC_URI = "${UBOOT_SRC};branch=${SRCBRANCH}"
SRCBRANCH = "lf_v2023.04"
LOCALVERSION ?= "-${SRCBRANCH}"
SRCREV = "af7d004eaf18437c7db76f7962652b924099405b"
~~~
after

~~~
UBOOT_SRC ?= "git://github.com/bit-brick/uboot-imx.git;protocol=https"
SRC_URI = "${UBOOT_SRC};branch=${SRCBRANCH}"
SRCBRANCH = "lf_v2023.04"
LOCALVERSION ?= "-${SRCBRANCH}"
SRCREV = "af7d004eaf18437c7db76f7962652b924099405b"
~~~

### 4.2 change kernel
Modify bb files:

``[your path]/ubuntu/sources/meta-imx/meta-bsp/recipes-kernel/linux/linux-imx_6.1.bb
``  
``[your path]/imx-yocto-bsp/sources/meta-imx/meta-bsp/recipes-kernel/linux/linux-imx-headers_6.1.bb``
~~~
SRC_URI = "${KERNEL_SRC}"
KERNEL_SRC ?= "git://github.com/bit-brick/linux-imx.git;protocol=https;branch=${SRCBRANCH}"
KBRANCH = "${SRCBRANCH}"
SRCBRANCH = "lf-6.1.y"
LOCALVERSION = "-lts-6.1.22"
SRCREV = "66e442bc7fdcc935e6faa94c743f653263d4ed67"
~~~

### 4.3 Build
then run code to build image

~~~
$ DISTRO=imx-desktop-xwayland MACHINE=imx8mpevk source imx-
setup-desktop.sh -b build-desktop
$ bitbake imx-image-desktop
~~~


when it success, you will see the files in the  
``build-desktop/tmp/deploy/images/imx8mpevk``  directory






###  5. Questions & Answers
#### 5.1 How to obtain the desktop build image?
NXP does not release desktop images due to the license. Users can build it with meta-nxp-desktop.
#### 5.2 How to solve the failure of fetching image or Git source?
Check if the host build machine can connect to the external website, or can export a proxy as follows:
~~~
$ export http_proxy=<your proxy address:port >
$ export https_proxy=<your proxy address:port >
~~~
#### 5.3 How to update the SD image size in Yocto configuration?
You can add the following setting in ``<build_dir>/conf/local``.conf to specify the image size:
~~~
IMAGE_ROOTFS_SIZE = "8388608"
~~~
#### 5.4 How to log in to the desktop system?
The default build creates the "user" account with the password "user". To change the account or password,
uncomment and update APTGET_ADD_USERS in ``<build_dir>/conf/local``.conf.
To add multiple user accounts, set in ``<build_dir>/conf/local``.conf as follows (Each user setting should
be split by a space):
~~~
APTGET_ADD_USERS = "alex:${USER_PASSWD_USER}:${USER_SHELL_BASH}
alex1:${USER_PASSWD_USER}:${USER_SHELL_BASH} user:${USER_PASSWD_USER}:
${USER_SHELL_BASH}"
~~~
Then log in with ``<account>:user``, such as ``alex:user``. The password for all accounts is "user". You can
change the password after login.
~~~
$ sudo passwd <account>
~~~

