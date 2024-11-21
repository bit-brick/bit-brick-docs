---
sidebar_position: 2
---

# Bianbu Desktop 2.0 ROOTFS制作

## 环境要求

宿主机推荐 Ubuntu 20.04/22.04，且安装了 docker ce 和 qemu-user-static（8.0.4，定制版，默认开启了 Vector 1.0 支持）。

### docker

docker ce 安装可参考 [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/) 。

### qemu

1. 卸载 binfmt-support

   定制版的 qemu-user-static 与 binfmt-support 有冲突，因为 binfmt-support 提供的 `/etc/init.d/binfmt-support` 属于传统的 SysVinit 启动脚本，而定制版的 qemu-user-static 提供的 `/lib/systemd/system/systemd-binfmt.service` 是 systemd 服务单元文件。`/etc/init.d/binfmt-support` 会晚于 `/lib/systemd/system/systemd-binfmt.service` 执行，导致覆盖 systemd 的设置。

   ```shell
   sudo apt-get purge binfmt-support
   ```

2. 下载定制版的 qemu

   ```shell
   wget https://archive.spacemit.com/qemu/qemu-user-static_8.0.4%2Bdfsg-1ubuntu3.23.10.1_amd64.deb
   ```

3. 安装定制版的 qemu

   ```shell
   sudo dpkg -i qemu-user-static_8.0.4+dfsg-1ubuntu3.23.10.1_amd64.deb
   ```

4. 注册 qemu-user-static 到内核，这样整个系统范围（含容器）均可以直接执行 riscv 的二进制文件

   ```shell
   sudo systemctl restart systemd-binfmt.service
   ```

5. 验证 qemu-user-static 是否注册成功

   ```shell
   wget https://archive.spacemit.com/qemu/rvv
   chmod a+x rvv
   ./rvv
   ```

   出现以下信息表示注册成功。

   ```
   helloworld
   spacemit
   ```

## 准备基础 rootfs

1. 创建工作目录

   ```shell
   mkdir ~/bianbu-workspace
   ```

2. 创建并启动容器

   ```shell
   docker run --privileged -itd -v ~/bianbu-workspace:/mnt --name build-bianbu-rootfs harbor.spacemit.com/bianbu/bianbu:latest
   ```

3. 进入容器

   ```shell
   docker exec -it -w /mnt build-bianbu-rootfs bash
   ```

4. 安装基本工具

   ```shell
   apt-get update
   apt-get -y install wget uuid-runtime
   ```

5. 配置环境变量，方便后续命令使用

   ```shell
   export BASE_ROOTFS_URL=https://archive.spacemit.com/bianbu-base/bianbu-base-24.04-base-riscv64.tar.gz
   export BASE_ROOTFS=$(basename "$BASE_ROOTFS_URL")
   export TARGET_ROOTFS=rootfs
   ```

6. 下载

   ```shell
   wget $BASE_ROOTFS_URL
   ```

7. 解压到指定目录

   ```shell
   mkdir -p $TARGET_ROOTFS && tar -zxpf $BASE_ROOTFS -C $TARGET_ROOTFS
   ```

8. 挂载一些系统资源到 rootfs 中

   ```shell
   mount -t proc /proc $TARGET_ROOTFS/proc
   mount -t sysfs /sys $TARGET_ROOTFS/sys
   mount -o bind /dev $TARGET_ROOTFS/dev
   mount -o bind /dev/pts $TARGET_ROOTFS/dev/pts
   ```

## 必要配置

### 配置源

1. 首先配置环境变量，方便后续命令使用

   ```shell
   export REPO="archive.spacemit.com/bianbu"
   export VERSION="v2.0.2"
   ```

2. 配置 bianbu.sources

   ```shell
   cat <<EOF | tee $TARGET_ROOTFS/etc/apt/sources.list.d/bianbu.sources
   Types: deb
   URIs: https://$REPO/
   Suites: noble/snapshots/$VERSION noble-security/snapshots/$VERSION noble-porting/snapshots/$VERSION noble-customization/snapshots/$VERSION
   Components: main universe restricted multiverse
   Signed-By: /usr/share/keyrings/bianbu-archive-keyring.gpg
   EOF
   ```

### 配置 DNS

```shell
echo "nameserver 8.8.8.8" >$TARGET_ROOTFS/etc/resolv.conf
```

### 安装硬件相关的包

```shell
chroot $TARGET_ROOTFS /bin/bash -c "apt-get update"
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades upgrade"
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install initramfs-tools"
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-esos img-gpu-powervr k1x-vpu-firmware k1x-cam spacemit-uart-bt spacemit-modules-usrload opensbi-spacemit u-boot-spacemit linux-image-6.6.36"
```

### 安装元包

不同变体有不同的元包，

- Minimal：bianbu-minimal
- Dekstop：bianbu-desktop bianbu-desktop-zh bianbu-desktop-en bianbu-desktop-minimal-en bianbu-standard bianbu-development
- NAS：bianbu-nas

minimal：

```shell
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-minimal"
```
Desktop:需要先安装 minimal 元包
```shell
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-minimal"

chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-desktop bianbu-desktop-zh bianbu-desktop-en bianbu-desktop-minimal-en bianbu-standard bianbu-development"
```

NAS:
```shell
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-nas"
```

## 通用配置

#### 配置地区

```shell
chroot $TARGET_ROOTFS /bin/bash -c "apt-get -y install locales"
chroot $TARGET_ROOTFS /bin/bash -c "echo \"locales locales/locales_to_be_generated multiselect en_US.UTF-8 UTF-8, zh_CN.UTF-8 UTF-8\" | debconf-set-selections"
chroot $TARGET_ROOTFS /bin/bash -c "echo \"locales locales/default_environment_locale select zh_CN.UTF-8\" | debconf-set-selections"
chroot $TARGET_ROOTFS /bin/bash -c "sed -i 's/^# zh_CN.UTF-8 UTF-8/zh_CN.UTF-8 UTF-8/' /etc/locale.gen"
chroot $TARGET_ROOTFS /bin/bash -c "dpkg-reconfigure --frontend=noninteractive locales"
```

#### 配置时区

```shell
chroot $TARGET_ROOTFS /bin/bash -c "echo 'tzdata tzdata/Areas select Asia' | debconf-set-selections"
chroot $TARGET_ROOTFS /bin/bash -c "echo 'tzdata tzdata/Zones/Asia select Shanghai' | debconf-set-selections"
chroot $TARGET_ROOTFS /bin/bash -c "rm /etc/timezone"
chroot $TARGET_ROOTFS /bin/bash -c "rm /etc/localtime"
chroot $TARGET_ROOTFS /bin/bash -c "dpkg-reconfigure --frontend=noninteractive tzdata"
```

#### 配置时间服务器

```shell
sed -i 's/^#NTP=.*/NTP=ntp.aliyun.com/' $TARGET_ROOTFS/etc/systemd/timesyncd.conf
```

#### 配置密码

```shell
chroot $TARGET_ROOTFS /bin/bash -c "echo root:bianbu | chpasswd"
```

#### 配置网络

如果仅安装了 minimal（bianbu-minimal）元包，则需要使用 netplan 配置网络，

```shell
cat <<EOF | tee $TARGET_ROOTFS/etc/netplan/01-netcfg.yaml
network:
    version: 2
    renderer: networkd
    ethernets:
        end0:
            dhcp4: true
EOF
chroot $TARGET_ROOTFS /bin/bash -c "chmod 600 /etc/netplan/01-netcfg.yaml"
```

如果安装了 Desktop（bianbu-desktop）元包,则如下配置

~~~shell
cat >$TARGET_ROOTFS/etc/netplan/01-network-manager-all.yaml <<EOF
# Let NetworkManager manage all devices on this system
network:
  version: 2
  renderer: NetworkManager
EOF
chroot $TARGET_ROOTFS /bin/bash -c "chmod 600 /etc/netplan/01-network-manager-all.yaml"
~~~


## 生成分区镜像

注意安装配置完后，先取消挂载！

```shell
mount | grep "$TARGET_ROOTFS/proc" > /dev/null && umount -l $TARGET_ROOTFS/proc
mount | grep "$TARGET_ROOTFS/sys" > /dev/null && umount -l $TARGET_ROOTFS/sys
mount | grep "$TARGET_ROOTFS/dev/pts" > /dev/null && umount -l $TARGET_ROOTFS/dev/pts
mount | grep "$TARGET_ROOTFS/dev" > /dev/null && umount -l $TARGET_ROOTFS/dev
```

生成 UUID,并写入/etc/fstab

```shell
UUID_BOOTFS=$(uuidgen)
UUID_ROOTFS=$(uuidgen)
cat >$TARGET_ROOTFS/etc/fstab <<EOF
# <file system>     <dir>    <type>  <options>                          <dump> <pass>
UUID=$UUID_ROOTFS   /        ext4    defaults,noatime,errors=remount-ro 0      1
UUID=$UUID_BOOTFS   /boot    ext4    defaults                           0      2
EOF
```

移动 boot 到其他目录，以便分别制作 bootfs 和 rootfs 分区，

```shell
mkdir -p bootfs
mv $TARGET_ROOTFS/boot/* bootfs
```

生成 bootfs.ext4

```shell
mke2fs -d bootfs -L bootfs -t ext4 -U $UUID_BOOTFS bootfs.ext4 "256M"
```
生成rootfs.ext4

Minimal:
```shell
mke2fs -d $TARGET_ROOTFS -L rootfs -t ext4 -N 524288 -U $UUID_ROOTFS rootfs.ext4 "2048"
```
Desktop:
```shell
mke2fs -d $TARGET_ROOTFS -L rootfs -t ext4 -N 524288 -U $UUID_ROOTFS rootfs.ext4 "8848M"
```
NAS:
```shell
mke2fs -d $TARGET_ROOTFS -L rootfs -t ext4 -N 524288 -U $UUID_ROOTFS rootfs.ext4 "4048M"
```

此时，在当前目录可以看到两个分区镜像，bootfs.ext4 和 rootfs.ext4，可使用 fastboot 烧写到板子中。

## 制作固件

### Titan固件

1. 安装依赖

   ```shell
   apt-get -y install zip
   ```

2. 拷贝固件依赖的文件

   ```shell
   export TMP=pack_dir
   mkdir -p $TMP/factory/
   cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/bootinfo_emmc.bin $TMP/factory
   cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/bootinfo_sd.bin $TMP/factory
   cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/bootinfo_spinand.bin $TMP/factory
   cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/bootinfo_spinor.bin $TMP/factory
   cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/FSBL.bin $TMP/factory
   cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/u-boot.itb $TMP
   cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/env.bin $TMP
   cp $TARGET_ROOTFS/usr/lib/riscv64-linux-gnu/opensbi/generic/fw_dynamic.itb $TMP
   cp bootfs.ext4 $TMP
   cp rootfs.ext4 $TMP
   ```

3. 下载参考分区表

   ```shell
   wget -P $TMP https://gitee.com/bianbu/firmware-config/raw/main/fastboot.yaml
   wget -P $TMP https://gitee.com/bianbu/firmware-config/raw/main/partition_2M.json
   wget -P $TMP https://gitee.com/bianbu/firmware-config/raw/main/partition_flash.json
   wget -P $TMP https://gitee.com/bianbu/firmware-config/raw/main/partition_universal.json
   ```

4. 打包

   ```shell
   cd $TMP
   zip -r ../bianbu-custom.zip *
   ```

### SDCARD镜像

下面介绍如何使用genimage制作SDCARD镜像。

1. 安装依赖

   ```shell
   echo 'tzdata tzdata/Areas select Asia' | debconf-set-selections
   echo 'tzdata tzdata/Zones/Asia select Shanghai' | debconf-set-selections
   DEBIAN_FRONTEND=noninteractive apt-get -y install wget python3 genimage
   ```

2. 拷贝固件依赖的文件

   ```shell
   export TMP_SD=pack_sd_dir
   mkdir -p $TMP_SD/factory/
   cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/bootinfo_emmc.bin $TMP_SD/factory
   cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/bootinfo_sd.bin $TMP_SD/factory
   cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/bootinfo_spinand.bin $TMP_SD/factory
   cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/bootinfo_spinor.bin $TMP_SD/factory
   cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/FSBL.bin $TMP_SD/factory
   cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/u-boot.itb $TMP_SD
   cp $TARGET_ROOTFS/usr/lib/u-boot/spacemit/env.bin $TMP_SD
   cp $TARGET_ROOTFS/usr/lib/riscv64-linux-gnu/opensbi/generic/fw_dynamic.itb $TMP_SD
   cp bootfs.ext4 $TMP_SD
   cp rootfs.ext4 $TMP_SD
   ```

3. 下载参考分区表

   ```shell
   wget -P $TMP_SD https://gitee.com/bianbu/firmware-config/raw/main/partition_universal.json
   ```

4. 下载生成genimage.cfg的脚本，并生成genimage.cfg

   ```shell
   wget -P $TMP_SD https://gitee.com/bianbu-linux/scripts/raw/bl-v2.0.y/gen_imgcfg.py
   python3 $TMP_SD/gen_imgcfg.py -i $TMP_SD/partition_universal.json -n bianbu-custom.sdcard -o $TMP_SD/genimage.cfg
   ```
   
   如果是打的desktop版本，修改一下genimage.cfg，把rootfs分区大小改为12G。
   ~~~
   partition rootfs {
            image = "rootfs.ext4"
            offset = "260M"
            size = "12G"
            holes = {}
            in-partition-table = "true"
    }
   ~~~

5. 生成SDCARD镜像

   ```shell
   ROOTPATH_TMP="$(mktemp -d)"
   GENIMAGE_TMP="$(mktemp -d)"
   genimage \
       --config "$TMP_SD/genimage.cfg" \
       --rootpath "$ROOTPATH_TMP" \
       --tmppath "$GENIMAGE_TMP" \
       --inputpath "$TMP_SD" \
       --outputpath "."
   ```

   当看到以下信息时，说明打包成功。

   ```shell
   INFO: hdimage(bianbu-custom): adding partition 'bootinfo' from 'factory/bootinfo_sd.bin' ...
   INFO: hdimage(bianbu-custom): adding partition 'fsbl' (in MBR) from 'factory/FSBL.bin' ...
   INFO: hdimage(bianbu-custom): adding partition 'env' (in MBR) from 'env.bin' ...
   INFO: hdimage(bianbu-custom): adding partition 'opensbi' (in MBR) from 'fw_dynamic.itb' ...
   INFO: hdimage(bianbu-custom): adding partition 'uboot' (in MBR) from 'u-boot.itb' ...
   INFO: hdimage(bianbu-custom): adding partition 'bootfs' (in MBR) from 'bootfs.ext4' ...
   INFO: hdimage(bianbu-custom): adding partition 'rootfs' (in MBR) from 'rootfs.ext4' ...
   INFO: hdimage(bianbu-custom): adding partition '[MBR]' ...
   INFO: hdimage(bianbu-custom): adding partition '[GPT header]' ...
   INFO: hdimage(bianbu-custom): adding partition '[GPT array]' ...
   INFO: hdimage(bianbu-custom): adding partition '[GPT backup]' ...
   INFO: hdimage(bianbu-custom): writing GPT
   INFO: hdimage(bianbu-custom): writing protective MBR
   INFO: hdimage(bianbu-custom): writing MBR
   INFO: cmd: "rm -rf "/tmp/tmp.rX4fZ39DKG"/*" (stderr):
   ```