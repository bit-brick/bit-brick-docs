# 更改rootfs分区大小

## 安装gparted
首先在Ubuntu电脑中安装下gparted这个软件
~~~
sudo apt update
sudo apt install -y gparted
~~~
然后打开gparted
~~~
sudo gparted
~~~

## 更新e2fsprogs
现有的e2fsprogs版本可能会在后续的操作中导致更改分区大小失败，所以我们更新到最新的e2fsprogs
~~~
wget https://onboardcloud.dl.sourceforge.net/project/e2fsprogs/e2fsprogs/v1.47.1/e2fsprogs-1.47.1.tar.gz

tar -zxvf e2fsprogs-1.47.1.tar.gz

cd e2fsprogs-1.47.1

./configure

sudo make

sudo make install
~~~
完成后输入``resize2fs``验证一下
~~~
$resize2fs
resize2fs 1.47.1 (20-May-2024)
~~~
## 更改分区大小
打开gparted后在右上角可以选择TF卡，然后就可以看到TF卡容量的使用情况

![gparted1](/img/imx8mp/software/resize/gparted1.png)

上图显示的是烧录完Linux桌面版系统后TF卡的情况，可以看到，虽然TF卡的总容量是32GB的（在GParted中显示为29.72GiB），但是rootfs分区（/dev/mmcblk1p2）实际只分配了7.81GiB，还剩下21.82GiB未分配。

选中分区，右击选择resize，调整至你想要的大小，并执行。

![gparted1](/img/imx8mp/software/resize/gparted_resize.png)


执行后的结果

![gparted1](/img/imx8mp/software/resize/gpart2.png)


输入``df -h``来验证一下分区大小是否已经更改成功
![gparted1](/img/imx8mp/software/resize/df-h.png)


