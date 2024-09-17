# 启动和配置K1
## 1.启动系统

烧录完固件到Micro SD 卡后，我们将卡插入到K1主板上的卡槽，并连接好显示器和鼠标键盘：
![usb](/img/k1/getting-started/peripherals/usb_connect.png)


然后插上电源，等待一分钟后，显示器出现Bianbu的启动界面，输入你设置的用户名和密码，就看到了常见的桌面系统。


![main](/img/k1/os/bianbuos.png)

到此系统已经正常运行了

## 2.配置Bianbu
第一次进入到bianbu 操作系统后，我们要先修改一下设备的分区大小，因为这个时候，root分区是比较小的，Micro SD卡的很多空间并没有有效利用，所以接下来的步骤将展示如何修改root分区大小。

### 1）打开磁盘工具

![gparted1](/img/k1/getting-started/resize/tools.png)

打开后界面如下：

![gparted1](/img/k1/software/resize/gpart.png)

### 2）更改分区大小
打开磁盘工具后可以选择TF卡，然后就可以看到TF卡容量的使用情况



上图显示的是烧录完Linux桌面版系统后TF卡的情况，可以看到，虽然TF卡的总容量是64GB的（在GParted中显示为29.72GiB），但是rootfs分区实际只分配了8.81GiB,我们把剩余的都分配给rootfs分区。

选中分区，右击选择resize，调整至你想要的大小，并执行。
![gparted1](/img/k1/software/resize/gpart1.png)

![gparted1](/img/k1/software/resize/gpart2.png)


接下来就可以好好体验bianbu os！！