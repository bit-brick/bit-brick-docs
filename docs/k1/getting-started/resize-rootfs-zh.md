# 更改rootfs分区大小

## 打开磁盘工具
![gparted1](/img/k1/getting-started/resize/tools.png)

打开后界面如下：

![gparted1](/img/k1/software/resize/gpart.png)

## 更改分区大小
打开磁盘工具后可以选择TF卡，然后就可以看到TF卡容量的使用情况



上图显示的是烧录完Linux桌面版系统后TF卡的情况，可以看到，虽然TF卡的总容量是64GB的（在GParted中显示为29.72GiB），但是rootfs分区实际只分配了8.81GiB,我们把剩余的都分配给rootfs分区。

选中分区，右击选择resize，调整至你想要的大小，并执行。
![gparted1](/img/k1/software/resize/gpart1.png)

![gparted1](/img/k1/software/resize/gpart2.png)



输入``df -h``来验证一下分区大小是否已经更改成功
![gparted1](/img/k1/software/resize/df-h.png)


