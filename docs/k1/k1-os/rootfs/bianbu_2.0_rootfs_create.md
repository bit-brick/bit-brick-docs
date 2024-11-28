---
sidebar_position: 2
---

# Bianbu 2.0 ROOTFS Creation

## Prerequisites

The host machine is recommended to be Ubuntu 20.04/22.04, with docker CE and customized qemu-user-static (version 8.0.4, with Vector 1.0 support enabled by default) installed.

### Docker

For Docker CE installation, refer to [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/).

### QEMU

1. Uninstall binfmt-support

   The customized qemu-user-static conflicts with binfmt-support since binfmt-support provides the `/etc/init.d/binfmt-support` SysVinit script, while the customized qemu-user-static provides a systemd service unit file `/lib/systemd/system/systemd-binfmt.service`. The `/etc/init.d/binfmt-support` script executes later than `/lib/systemd/system/systemd-binfmt.service`, causing it to overwrite the systemd settings.

   ```shell
   sudo apt-get purge binfmt-support
   ```

2. Download the customized qemu

   ```shell
   wget https://archive.spacemit.com/qemu/qemu-user-static_8.0.4%2Bdfsg-1ubuntu3.23.10.1_amd64.deb
   ```

3. Install the customized qemu

   ```shell
   sudo dpkg -i qemu-user-static_8.0.4+dfsg-1ubuntu3.23.10.1_amd64.deb
   ```

4. Register qemu-user-static with the kernel to allow system-wide execution of riscv binaries (including within containers)

   ```shell
   sudo systemctl restart systemd-binfmt.service
   ```

5. Verify the successful registration of qemu-user-static

   ```shell
   wget https://archive.spacemit.com/qemu/rvv
   chmod a+x rvv
   ./rvv
   ```

   Seeing the following output indicates successful registration.

   ```
   helloworld
   spacemit
   ```

## Prepare the Base ROOTFS

1. Create a working directory

   ```shell
   mkdir ~/bianbu-workspace
   ```

2. Create and start the container

   ```shell
   docker run --privileged -itd -v ~/bianbu-workspace:/mnt --name build-bianbu-rootfs harbor.spacemit.com/bianbu/bianbu:latest
   ```

3. Enter the container

   ```shell
   docker exec -it -w /mnt build-bianbu-rootfs bash
   ```

4. Install basic tools

   ```shell
   apt-get update
   apt-get -y install wget uuid-runtime
   ```

5. Configure environment variables for later commands

   ```shell
   export BASE_ROOTFS_URL=https://archive.spacemit.com/bianbu-base/bianbu-base-24.04-base-riscv64.tar.gz
   export BASE_ROOTFS=$(basename "$BASE_ROOTFS_URL")
   export TARGET_ROOTFS=rootfs
   ```

6. Download

   ```shell
   wget $BASE_ROOTFS_URL
   ```

7. Extract to the specified directory

   ```shell
   mkdir -p $TARGET_ROOTFS && tar -zxpf $BASE_ROOTFS -C $TARGET_ROOTFS
   ```

8. Mount some system resources into the rootfs

   ```shell
   mount -t proc /proc $TARGET_ROOTFS/proc
   mount -t sysfs /sys $TARGET_ROOTFS/sys
   mount -o bind /dev $TARGET_ROOTFS/dev
   mount -o bind /dev/pts $TARGET_ROOTFS/dev/pts
   ```

## Necessary Configuration

### Configure Repository

1. First, set environment variables for subsequent commands

   ```shell
   export REPO="archive.spacemit.com/bianbu"
   export VERSION="v2.0"
   ```

2. Configure bianbu.sources

   ```shell
   cat <<EOF | tee $TARGET_ROOTFS/etc/apt/sources.list.d/bianbu.sources
   Types: deb
   URIs: https://$REPO/
   Suites: noble/snapshots/$VERSION noble-security/snapshots/$VERSION noble-porting/snapshots/$VERSION noble-customization/snapshots/$VERSION
   Components: main universe restricted multiverse
   Signed-By: /usr/share/keyrings/bianbu-archive-keyring.gpg
   EOF
   ```

### Configure DNS

```shell
echo "nameserver 8.8.8.8" >$TARGET_ROOTFS/etc/resolv.conf
```

### Install Hardware-related Packages

```shell
chroot $TARGET_ROOTFS /bin/bash -c "apt-get update"
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades upgrade"
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install initramfs-tools"
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-esos img-gpu-powervr k1x-vpu-firmware k1x-cam spacemit-uart-bt spacemit-modules-usrload opensbi-spacemit u-boot-spacemit linux-image-6.6.36"
```

### Install Metapackages

Different variants come with different metapackages:

- Minimal: bianbu-minimal
- Desktop: bianbu-desktop bianbu-desktop-zh bianbu-desktop-en bianbu-desktop-minimal-en bianbu-standard bianbu-development
- NAS: bianbu-nas

minimal:

```shell
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-minimal"
```

Desktop: The minimal meta package needs to be installed first.
```shell
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-minimal"

chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-desktop bianbu-desktop-zh bianbu-desktop-en bianbu-desktop-minimal-en bianbu-standard bianbu-development"
```

NAS:
```shell
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-nas"
```

Tip: After installing all packages, you can run the following command to clean up the cache and reduce the final firmware size.

~~~shell
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get clean"
~~~

## General Configuration

#### Configure Locale

```shell
chroot $TARGET_ROOTFS /bin/bash -c "apt-get -y install locales"
chroot $TARGET_ROOTFS /bin/bash -c "echo \"locales locales/locales_to_be_generated multiselect en_US.UTF-8 UTF-8, zh_CN.UTF-8 UTF-8\" | debconf-set-selections"
chroot $TARGET_ROOTFS /bin/bash -c "echo \"locales locales/default_environment_locale select zh_CN.UTF-8\" | debconf-set-selections"
chroot $TARGET_ROOTFS /bin/bash -c "sed -i 's/^# zh_CN.UTF-8 UTF-8/zh_CN.UTF-8 UTF-8/' /etc/locale.gen"
chroot $TARGET_ROOTFS /bin/bash -c "dpkg-reconfigure --frontend=noninteractive locales"
```

#### Configure Timezone

```shell
chroot $TARGET_ROOTFS /bin/bash -c "echo 'tzdata tzdata/Areas select Asia' | debconf-set-selections"
chroot $TARGET_ROOTFS /bin/bash -c "echo 'tzdata tzdata/Zones/Asia select Shanghai' | debconf-set-selections"
chroot $TARGET_ROOTFS /bin/bash -c "rm /etc/timezone"
chroot $TARGET_ROOTFS /bin/bash -c "rm /etc/localtime"
chroot $TARGET_ROOTFS /bin/bash -c "dpkg-reconfigure --frontend=noninteractive tzdata"
```

#### Configure Time Server

```shell
sed -i 's/^#NTP=.*/NTP=ntp.aliyun.com/' $TARGET_ROOTFS/etc/systemd/timesyncd.conf
```

#### Set Password

```shell
chroot $TARGET_ROOTFS /bin/bash -c "echo root:bianbu | chpasswd"
```

#### Configure Network (Optional)

If you only installed the minimal (bianbu-minimal) metapackage, use netplan to configure the network:

```shell
cat <<EOF | tee $TARGET_ROOTFS/etc/netplan/01-netcfg.yaml
network:
    version: 2
    renderer: networkd
    ethernets:
        end0:
            dhcp4: true
        end1:
            dhcp4: true
EOF
chroot $TARGET_ROOTFS /bin/bash -c "chmod 600 /etc/netplan/01-netcfg.yaml"
```


If the Desktop (bianbu-desktop) meta package is installed, the configuration is as follows.

~~~shell
cat >$TARGET_ROOTFS/etc/netplan/01-network-manager-all.yaml <<EOF
# Let NetworkManager manage all devices on this system
network:
  version: 2
  renderer: NetworkManager
EOF
chroot $TARGET_ROOTFS /bin/bash -c "chmod 600 /etc/netplan/01-network-manager-all.yaml"
~~~

## Generate Partition Images

Before finalizing, ensure to unmount!

```shell
mount | grep "$TARGET_ROOTFS/proc" > /dev/null && umount -l $TARGET_ROOTFS/proc
mount | grep "$TARGET_ROOTFS/sys" > /dev/null && umount -l $TARGET_ROOTFS/sys
mount | grep "$TARGET_ROOTFS/dev/pts" > /dev/null && umount -l $TARGET_ROOTFS/dev/pts
mount | grep "$TARGET_ROOTFS/dev" > /dev/null && umount -l $TARGET_ROOTFS/dev
```

Generate UUID and write to /etc/fstab

```shell
UUID_BOOTFS=$(uuidgen)
UUID_ROOTFS=$(uuidgen)
cat >$TARGET_ROOTFS/etc/fstab <<EOF
# <file system>     <dir>    <type>  <options>                          <dump> <pass>
UUID=$UUID_ROOTFS   /        ext4    defaults,noatime,errors=remount-ro 0      1
UUID=$UUID_BOOTFS   /boot    ext4    defaults                           0      2
EOF
```

Move boot to a different directory, to separately create bootfs and rootfs partitions,

```shell
mkdir -p bootfs
mv $TARGET_ROOTFS/boot/* bootfs
```

Create bootfs.ext4,

```shell
mke2fs -d bootfs -L bootfs -t ext4 -U $UUID_BOOTFS bootfs.ext4 "256M"
mke2fs -d $TARGET_ROOTFS -L rootfs -t ext4 -N 524288 -U $UUID_ROOTFS rootfs.ext4 "2048M"
```

Create rootfs.ext4

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

Now, you can see two partition images in the current directory, bootfs.ext4 and rootfs.ext4, which can be burned to the board using fastboot.

## Create Firmware

### Titan Image

1. Install dependencies

   ```shell
   apt-get -y install zip
   ```

2. Copy required files for the image

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

3. Download reference partition tables

   ```shell
   wget -P $TMP https://gitee.com/bianbu/firmware-config/raw/main/fastboot.yaml
   wget -P $TMP https://gitee.com/bianbu/firmware-config/raw/main/partition_2M.json
   wget -P $TMP https://gitee.com/bianbu/firmware-config/raw/main/partition_flash.json
   wget -P $TMP https://gitee.com/bianbu/firmware-config/raw/main/partition_universal.json
   ```

4. Package the image

   ```shell
   cd $TMP
   zip -r ../bianbu-custom.zip *
   ```

### SDCARD Image

Here’s how to create an SDCARD image using `genimage`.

1. Install dependencies

   ```shell
   echo 'tzdata tzdata/Areas select Asia' | debconf-set-selections
   echo 'tzdata tzdata/Zones/Asia select Shanghai' | debconf-set-selections
   DEBIAN_FRONTEND=noninteractive apt-get -y install wget python3 genimage
   ```

2. Copy required files for the image

   ```shell
   export TMP_SD=pack_dir
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

3. Download reference partition table

   ```shell
   wget -P $TMP_SD https://gitee.com/bianbu/firmware-config/raw/main/partition_universal.json
   ```



4. Download script to generate `genimage.cfg` and create `genimage.cfg`

   ```shell
   wget -P $TMP_SD https://gitee.com/bianbu-linux/scripts/raw/bl-v1.0.y/gen_imgcfg.py
   python3 $TMP_SD/gen_imgcfg.py -i $TMP_SD/partition_universal.json -n bianbu-custom.sdcard -o $TMP_SD/genimage.cfg
   ```

   If it is the desktop version, modify the genimage.cfg and change the rootfs partition size to 12G.

   ~~~
   partition rootfs {
            image = "rootfs.ext4"
            offset = "260M"
            size = "12G"
            holes = {}
            in-partition-table = "true"
    }
   ~~~

5. Generate SDCARD image

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

   If you see the following messages, the packaging was successful:

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
