# Change the Size of the rootfs Partition

## Install gparted

First, install the gparted software on your Ubuntu computer.

```
sudo apt update
sudo apt install -y gparted
```

Then open gparted.

```
sudo gparted
```

## Update e2fsprogs

The existing version of e2fsprogs may cause the partition size change to fail in subsequent operations, so we update to the latest e2fsprogs.

```
wget https://onboardcloud.dl.sourceforge.net/project/e2fsprogs/e2fsprogs/v1.47.1/e2fsprogs-1.47.1.tar.gz
tar -zxvf e2fsprogs-1.47.1.tar.gz

cd e2fsprogs-1.47.1

./configure

sudo make

sudo make install
```

After completion, enter `resize2fs` to verify.

```
resize2fs 1.47.1 (20-May-2024)
```

## Change the Partition Size

After opening gparted, you can select the TF card in the upper right corner to see the capacity usage of the TF card.

![gparted1](/img/imx8mp/software/resize/gparted1.png)

The picture above shows the situation of the TF card after burning the Linux desktop system. It can be seen that although the total capacity of the TF card is 32GB (displayed as 29.72GiB in GParted), the rootfs partition (`/dev/mmcblk1p2`) is actually only allocated 7.81GiB, with 21.82GiB remaining unallocated.

Select the partition, right-click and choose resize, adjust to the size you want, and execute.

![gparted1](/img/imx8mp/software/resize/gparted_resize.png)



## The Result After Execution

![gparted1](/img/imx8mp/software/resize/gpart2.png)

Enter `df -h` to verify whether the partition size has been successfully changed.

![gparted1](/img/imx8mp/software/resize/df-h.png)

