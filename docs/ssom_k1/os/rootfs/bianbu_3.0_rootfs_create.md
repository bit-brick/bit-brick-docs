---
sidebar_position: 4
---

# Bianbu 3.0 ROOTFS Creation

## Environment Requirements

The host machine is recommended to be Ubuntu 20.04/22.04, with docker ce and qemu-user-static (8.0.4, customized version with Vector 1.0 support enabled by default) installed.

### docker

Docker ce installation can refer to [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/).

### qemu

1. Uninstall binfmt-support

   The customized qemu-user-static conflicts with binfmt-support because binfmt-support provides `/etc/init.d/binfmt-support` which is a traditional SysVinit startup script, while the customized qemu-user-static provides `/lib/systemd/system/systemd-binfmt.service` which is a systemd service unit file. `/etc/init.d/binfmt-support` executes later than `/lib/systemd/system/systemd-binfmt.service`, causing it to override systemd settings.

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

4. Register qemu-user-static to the kernel so that the entire system (including containers) can directly execute riscv binary files

   ```shell
   sudo systemctl restart systemd-binfmt.service
   ```

5. Verify if qemu-user-static registration is successful

   ```shell
   wget https://archive.spacemit.com/qemu/rvv
   chmod a+x rvv
   ./rvv
   ```

   The following information indicates successful registration:

   ```
   helloworld
   spacemit
   ```

## Prepare Base rootfs

1. Create working directory

   ```shell
   mkdir ~/bianbu-workspace
   ```

2. Create and start container

   ```shell
   docker run --privileged -itd -v ~/bianbu-workspace:/mnt --name build-bianbu-rootfs harbor.spacemit.com/bianbu/bianbu:latest
   ```

3. Enter container

   ```shell
   docker exec -it -w /mnt build-bianbu-rootfs bash
   ```

4. Install basic tools

   ```shell
   apt-get update
   apt-get -y install wget uuid-runtime
   ```

5. Configure environment variables for convenience in subsequent commands

   - Version 3.0

      ```shell
      export BASE_ROOTFS_URL=https://archive.spacemit.com/bianbu-base/bianbu-base-25.04.2-base-riscv64.tar.gz
      export BASE_ROOTFS=$(basename "$BASE_ROOTFS_URL")
      export TARGET_ROOTFS=rootfs
      ```

6. Download

   ```shell
   wget $BASE_ROOTFS_URL
   ```

7. Extract to specified directory

   ```shell
   mkdir -p $TARGET_ROOTFS && tar -zxpf $BASE_ROOTFS -C $TARGET_ROOTFS
   ```

8. Mount some system resources to rootfs

   ```shell
   mount -t proc /proc $TARGET_ROOTFS/proc
   mount -t sysfs /sys $TARGET_ROOTFS/sys
   mount -o bind /dev $TARGET_ROOTFS/dev
   mount -o bind /dev/pts $TARGET_ROOTFS/dev/pts
   ```

## Essential Configuration

### Configure Repository

1. First configure environment variables for convenience in subsequent commands

   ```shell
   export REPO="archive.spacemit.com/bianbu"
   ```

   [Click to view 3.0 version release notes](../release_notes/bianbu_3.0.md)

2. Configure bianbu.sources

   - Version 3.0

      ```shell
      cat <<EOF | tee $TARGET_ROOTFS/etc/apt/sources.list.d/bianbu.sources
      Types: deb
      URIs: https://$REPO/
      Suites: plucky/snapshots/v3.0 plucky-security/snapshots/v3.0 plucky-updates/snapshots/v3.0 plucky-porting/snapshots/v3.0 plucky-customization/snapshots/v3.0 bianbu-v3.0-updates
      Components: main universe restricted multiverse
      Signed-By: /usr/share/keyrings/bianbu-archive-keyring.gpg
      EOF
      ```

### Configure DNS

```shell
echo "nameserver 8.8.8.8" >$TARGET_ROOTFS/etc/resolv.conf
```

### Install Hardware-Related Packages

```shell
chroot $TARGET_ROOTFS /bin/bash -c "apt-get update"
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades upgrade"
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install initramfs-tools"
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-esos img-gpu-powervr k1x-vpu-firmware k1x-cam spacemit-uart-bt spacemit-modules-usrload opensbi-spacemit u-boot-spacemit linux-generic"
```

### Install Meta Packages

Different variants have different meta packages:

- Minimal: bianbu-minimal
- Desktop: bianbu-desktop bianbu-desktop-zh bianbu-desktop-en bianbu-desktop-minimal-en bianbu-standard bianbu-development
- Desktop Lite: bianbu-desktop-lite

Desktop, Desktop Lite and NAS are all based on Minimal. It is recommended to install the Minimal meta package first, then install the corresponding meta package.

- minimal variant:

```shell
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-minimal"
```

- Desktop variant:

```shell
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-minimal"
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-desktop bianbu-desktop-zh bianbu-desktop-en bianbu-desktop-minimal-en bianbu-standard bianbu-development"
```

- Desktop Lite variant:

```shell
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-minimal"
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get -y --allow-downgrades install bianbu-desktop-lite"
```

Tip: After completing the installation of all packages, you can execute the following command to clean up the cache to reduce the final firmware size

```shell
chroot $TARGET_ROOTFS /bin/bash -c "DEBIAN_FRONTEND=noninteractive apt-get clean"
```

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

#### Configure Password

```shell
chroot $TARGET_ROOTFS /bin/bash -c "echo root:bianbu | chpasswd"
```

#### Configure Network

- minimal

```shell
cat <<EOF | tee $TARGET_ROOTFS/etc/netplan/01-netcfg.yaml
network:
    version: 2
    renderer: networkd
    ethernets:
        end0:
            dhcp4: true
            dhcp-identifier: mac
        end1:
            dhcp4: true
            dhcp-identifier: mac
EOF
chroot $TARGET_ROOTFS /bin/bash -c "chmod 600 /etc/netplan/01-netcfg.yaml"
```

- desktop/desktop-lite

```shell
cat <<EOF | tee $TARGET_ROOTFS/etc/netplan/01-network-manager-all.yaml
# Let NetworkManager manage all devices on this system
network:
   version: 2
   renderer: NetworkManager
EOF
chroot $TARGET_ROOTFS /bin/bash -c "chmod 600 /etc/netplan/01-network-manager-all.yaml"
```

Note: Different variants only need to configure their respective files.

## Generate Partition Images

Note: After installation and configuration are complete, unmount first!

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

Move boot to another directory to create bootfs and rootfs partitions separately

```shell
mkdir -p bootfs
mv $TARGET_ROOTFS/boot/* bootfs
```

Generate bootfs.ext4 and rootfs.ext4

```shell
mke2fs -d bootfs -L bootfs -t ext4 -U $UUID_BOOTFS bootfs.ext4 "256M"
mke2fs -d $TARGET_ROOTFS -L rootfs -t ext4 -N 524288 -U $UUID_ROOTFS rootfs.ext4 "2048M"
```

Note: Regarding rootfs.ext4 size. bianbu-minimal recommends 2048M, bianbu-desktop recommends 8192M, bianbu-desktop-lite recommends 6144M

At this point, you can see two partition images in the current directory, bootfs.ext4 and rootfs.ext4, which can be flashed to the board using fastboot.

## Create Firmware

See [Firmware Creation Guide](./image.md).
