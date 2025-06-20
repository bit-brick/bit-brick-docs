
#  DSMC 

**芯片名称**：RK3576  
**内核版本**：kernel 6.10  


**前言**  
本文档为 ROCKHIP DSMC 模块的 kernel 开发提供说明和使用方法。  

**读者对象**  
本文档（本指南）主要适用于以下工程师：  
- 技术支持工程师  
- 软件开发工程师  


## 1. 名称解释

- DSMC：Double Data Rate Serial Memory Controller，双倍速率串行存储器控制器  
- PSRAM：Pseudo static random access memory，伪静态随机存储器  
- DPRAM：Dual Port Random Access Memory，双向随机存取存储器  

---

## 2. 概述

Double Data Rate Serial Memory Controller（DSMC），双倍速率串行存储器控制器，通过命令、地址、数据线分时复用，数据上下沿传输，具有少引脚数、高带宽的特点。数据线位宽支持 x8、x16，最多支持 4 个 chip select。传输协议支持 Hyperbus PSRAM、Xccela PSRAM 和 Local bus。若使用 Local bus 协议，从设备需使用 RK 开发的 slave 模型，或者传输协议相同。若使用 HYPERBUS PSRAM、XCCELA PSRAM 协议，从设备支持 winbond、AP memory、Cypress、ISSI 等厂家生产的 PSRAM 颗粒。

---

## 3. DSMC驱动

### 3.1 驱动文件

DSMC 驱动文件位置：
- `drivers/memory/rockchip/dsmc-host.c` /* 主要驱动程序 */
- `drivers/memory/rockchip/dsmc-controller.c` /* DSMC 控制器行为配置 */
- `drivers/memory/rockchip/dsmc-lb-device.c` /* DSMC Local bus 设备 */

### 3.2 DTS节点配置

```dts
dsmc: dsmc@2a280000 {
    ...
    clock-frequency = <100000000>; /* DSMC 接口频率设置 */
    ...
    /* 从设备属性 */
    slave {
        rockchip,dqs-dll = <0x20 0x20 /* 从设备 cs0 的 DQS0、DQS1 DLL 延迟参数 */
                           0x20 0x20 /* 从设备 cs1 的 DQS0、DQS1 DLL 延迟参数 */
                           0x20 0x20 /* 从设备 cs2 的 DQS0、DQS1 DLL 延迟参数 */
                           0x20 0x20>; /* 从设备 cs3 的 DQS0、DQS1 DLL 延迟参数 */
        /*
         * rockchip,ranges：DSMC 访问从设备内存的基地址，大小；
         * 若不同 CS 的内存空间大小不同，那么需要配置最大的。
         * rockchip,ranges = <0x0 0x10000000 0x0 0x2000000> 含义：若外设是 PSRAM，
         * 那么每个 CS 都分配 0x2000000 大小的内存空间；
         * 若外设是 Local Bus，那么每个 region 都分配 0x2000000 大小的内存空间。
         */
        rockchip,ranges = <0x0 0x10000000 0x0 0x2000000>;
        rockchip,slave-dev = <&dsmc_slave>;
    };
};

dsmc_slave: dsmc_slave {
    compatible = "rockchip,dsmc-slave";
    rockchip,clk-mode = <0>; /* clk 模式，仅限 Local bus */
    status = "disabled";
    /* 从设备是 PSRAM（Hyperbus Psram 或 Xccela Psram）时，开启对应从设备 cs 的节点 */
    psram {
        psram0 {
            status = "disabled"; /* 若从设备 cs0 为 PSRAM，则改为“okay” */
        };
        psram1 {
            status = "disabled"; /* 若从设备 cs1 为 PSRAM，则改为“okay” */
        };
        psram2 {
            status = "disabled"; /* 若从设备 cs2 为 PSRAM，则改为“okay” */
        };
        psram3 {
            status = "disabled"; /* 若从设备 cs3 为 PSRAM，则改为“okay” */
        };
    };
    /* 从设备是 Local bus 设备时，开启、配置对应节点 */
    lb-slave {
        dsmc_lb_slave0: lb-slave0 {
            status = "disabled"; /* 若从设备 cs0 为 Local bus 设备，则改为“okay” */
            dsmc_p0_region: region {
                dsmc_p0_region0: region0 { /* 此从设备 region0 的属性 */
                    rockchip,attribute = "Merged FIFO";/* region0 为从设备可 merge FIFO */
                    rockchip,ca-addr-width = <0>; /* CA 传输格式，0：为 32bit，1：为 16bit */
                    rockchip,dummy-clk-num = <1>;
                    rockchip,cs0-be-ctrled = <0>; /* 从设备 cs0 被从设备 cs1、2、3 控制 */
                    rockchip,cs0-ctrl = <0>; /* 从设备 cs0 控制从设备 cs1、2、3 */
                    status = "disabled";
                };
                dsmc_p0_region1: region1 { /* 此从设备 region1 的属性 */
                    rockchip,attribute = "No-Merge FIFO";/* region1 为从设备不可 merge FIFO */
                    rockchip,ca-addr-width = <0>;
                    rockchip,dummy-clk-num = <1>;
                    rockchip,cs0-be-ctrled = <0>;
                    rockchip,cs0-ctrl = <0>;
                    status = "disabled";
                };
                dsmc_p0_region2: region2 { /* 此从设备 region2 的属性 */
                    rockchip,attribute = "DPRA"; /* region2 为从设备 DPRAM */
                    rockchip,ca-addr-width = <0>;
                    rockchip,dummy-clk-num = <1>;
                    rockchip,cs0-be-ctrled = <0>;
                    rockchip,cs0-ctrl = <0>;
                    status = "disabled";
                };
                dsmc_p0_region3: region3 { /* 此从设备 region3 的属性 */
                    rockchip,attribute = "Register"; /* region3 为从设备寄存器 */
                    rockchip,ca-addr-width = <0>;
                    rockchip,dummy-clk-num = <1>;
                    rockchip,cs0-be-ctrled = <0>;
                    rockchip,cs0-ctrl = <0>;
                    status = "disabled";
                };
            };
        };
        dsmc_lb_slave1: lb-slave1 {
            status = "disabled"; /* 若从设备 cs1 为 Local bus 设备，则改为“okay” */
            dsmc_p1_region: region {
                dsmc_p1_region0: region0 {
                    rockchip,attribute = "Merged FIFO";
                    rockchip,ca-addr-width = <0>;
                    rockchip,dummy-clk-num = <1>;
                    rockchip,cs0-be-ctrled = <0>;
                    rockchip,cs0-ctrl = <0>;
                    status = "disabled";
                };
                dsmc_p1_region1: region1 {
                    rockchip,attribute = "No-Merge FIFO";
                    rockchip,ca-addr-width = <0>;
                    rockchip,dummy-clk-num = <1>;
                    rockchip,cs0-be-ctrled = <0>;
                    rockchip,cs0-ctrl = <0>;
                    status = "disabled";
                };
                dsmc_p1_region2: region2 {
                    rockchip,attribute = "DPRA";
                    rockchip,ca-addr-width = <0>;
                    rockchip,dummy-clk-num = <1>;
                    rockchip,cs0-be-ctrled = <0>;
                    rockchip,cs0-ctrl = <0>;
                    status = "disabled";
                };
                dsmc_p1_region3: region3 {
                    rockchip,attribute = "Register";
                    rockchip,ca-addr-width = <0>;
                    rockchip,dummy-clk-num = <1>;
                    rockchip,cs0-be-ctrled = <0>;
                    rockchip,cs0-ctrl = <0>;
                    status = "disabled";
                };
            };
        };
        dsmc_lb_slave2: lb-slave2 {
            status = "disabled"; /* 若从设备 cs2 为 Local bus 设备，则改为“okay” */
            dsmc_p2_region: region {
                dsmc_p2_region0: region0 {
                    rockchip,attribute = "Merged FIFO";
                    rockchip,ca-addr-width = <0>;
                    rockchip,dummy-clk-num = <1>;
                    rockchip,cs0-be-ctrled = <0>;
                    rockchip,cs0-ctrl = <0>;
                    status = "disabled";
                };
                dsmc_p2_region1: region1 {
                    rockchip,attribute = "No-Merge FIFO";
                    rockchip,ca-addr-width = <0>;
                    rockchip,dummy-clk-num = <1>;
                    rockchip,cs0-be-ctrled = <0>;
                    rockchip,cs0-ctrl = <0>;
                    status = "disabled";
                };
                dsmc_p2_region2: region2 {
                    rockchip,attribute = "DPRA";
                    rockchip,ca-addr-width = <0>;
                    rockchip,dummy-clk-num = <1>;
                    rockchip,cs0-be-ctrled = <0>;
                    rockchip,cs0-ctrl = <0>;
                    status = "disabled";
                };
                dsmc_p2_region3: region3 {
                    rockchip,attribute = "Register";
                    rockchip,ca-addr-width = <0>;
                    rockchip,dummy-clk-num = <1>;
                    rockchip,cs0-be-ctrled = <0>;
                    rockchip,cs0-ctrl = <0>;
                    status = "disabled";
                };
            };
        };
        dsmc_lb_slave3: lb-slave3 {
            status = "disabled"; /* 若从设备 cs3 为 Local bus 设备，则改为“okay” */
            dsmc_p3_region: region {
                dsmc_p3_region0: region0 {
                    rockchip,attribute = "Merged FIFO";
                    rockchip,ca-addr-width = <0>;
                    rockchip,dummy-clk-num = <1>;
                    rockchip,cs0-be-ctrled = <0>;
                    rockchip,cs0-ctrl = <0>;
                    status = "disabled";
                };
                dsmc_p3_region1: region1 {
                    rockchip,attribute = "No-Merge FIFO";
                    rockchip,ca-addr-width = <0>;
                    rockchip,dummy-clk-num = <1>;
                    rockchip,cs0-be-ctrled = <0>;
                    rockchip,cs0-ctrl = <0>;
                    status = "disabled";
                };
                dsmc_p3_region2: region2 {
                    rockchip,attribute = "DPRA";
                    rockchip,ca-addr-width = <0>;
                    rockchip,dummy-clk-num = <1>;
                    rockchip,cs0-be-ctrled = <0>;
                    rockchip,cs0-ctrl = <0>;
                    status = "disabled";
                };
                dsmc_p3_region3: region3 {
                    rockchip,attribute = "Register";
                    rockchip,ca-addr-width = <0>;
                    rockchip,dummy-clk-num = <1>;
                    rockchip,cs0-be-ctrled = <0>;
                    rockchip,cs0-ctrl = <0>;
                    status = "disabled";
                };
            };
        };
    };
};
```

用户需根据实际从设备的类型，开启对应的节点。如 PSRAM 设备，需根据 PCB 外接 CS 的序号，开启对应的 psramx 节点。具体是 Hyperbus 还是 Xccela Psram，由驱动自动识别。当从设备是 RK 设计 DSMC slave 时，根据 PCB 外接 CS 的序号，开启对应的 lb_slavex 节点。另外还需根据从设备的属性修改对应 region 的配置。其中 clk-mode 控制支持的三种 clk 行为：clk-mode = 0 即 CS 拉高期间无时钟，拉低期间有时钟；clk-mode = 1 即无论 CS 怎么变化，时钟一直有，slave 可将其作为参考时钟，但是此模式下无法跑高频且各类 AC timing 可调参数不可用；clk-mode = 2 即 CS 拉高和拉低期间都有时钟，但是 CS 跳变沿前后会关闭几个时钟。  
作为 Local bus 设备时，设备空间示意图如下： 

![Local bus 设备空间示意图](/pdf/rk/dsmc/image.png)

每个从设备片选CS的访问空间都可以分成1、2、4个region（均分），只需要在DTS开启对应属性region
的status。
对于 `rockchip,ranges = <0x0 0x10000000 0x0 0x2000000>`; 属性，配置的是从设备内存空间的起
始地址和大小，不同外设类型有不同含义。
若外设是PSRAM， rockchip,ranges 配置的是最大CS空间的大小。每个CS的内存空间划分如下：

![alt text](/pdf/rk/dsmc/image-1.png)

若外设是 Local Bus， rockchip,ranges 配置的是最大region空间的大小。在只开启Register和
merged-FIFO 2个region的情况下，每个CS的region空间划分如下：

![alt text](/pdf/rk/dsmc/image-2.png)

### 3.3 内核配置

```
Symbol: ROCKCHIP_DSMC [=y]                                                      
│
│ Type : bool                                                                
│
│ Prompt: Rockchip DSMC(Double Data Rate Serial Memory Controller) driver    
│
│ Depends on: MEMORY [=y]                                                    
│
│ Location:                                                                  
│
│ -> Device Drivers                                                          
│ -> Memory Controller drivers (MEMORY [=y])                                
│ -> Rockchip DSMC(Double Data Rate Serial Memory Controller) driver
(ROCKCHIP_DSMC [=y])
```

---

## 4. 内核态对DSMC从设备内存的访问

### 4.1 调用驱动接口

在 DSMC 驱动里 `drivers/memory/rockchip/dsmc-host.c` 实现了如下几种访问接口：
通过调用函数 `rockchip_dsmc_find_device_by_compat()` 查找 dsmc 设备，并获取这个设备的私有参数。并通过 `dsmc_dev.ops` 实现 CPU，DMA 对 DSMC 从设备的访问。其中 `ops->read`、`ops->write` 为 CPU 读写 DSMC 从设备的内存空间。`ops->copy_from` 用于 DMA 读取从设备内存，并写入 host 端内存。`ops->copy_to` 用于 DMA 从 host 端内存写入从设备内存。

```c
struct rockchip_dsmc_device *rockchip_dsmc_find_dev(void);
static struct dsmc_ops rockchip_dsmc_ops = {
    .read = dsmc_read,
    .write = dsmc_write,
    .copy_from = dsmc_copy_from,
    .copy_from_state = dsmc_copy_from_state,
    .copy_to = dsmc_copy_to,
    .copy_to_state = dsmc_copy_to_state,
};

static void test(void)
{
    u32 cs;
    struct rockchip_dsmc_device *dsmc_dev;
    dsmc_dev = rockchip_dsmc_find_device_by_compat(rockchip_dsmc_get_compat(0));
    if (dsmc_dev == NULL) {
        printk("error: can not find dsmc device\n");
        return 0;
    }
    for (cs = 0; cs < DSMC_MAX_SLAVE_NUM; cs++) {
        if (dsmc_dev->dsmc.cfg.cs_cfg[i].device_type == DSMC_UNKNOWN_DEVICE)
            continue;
        dsmc_dev->ops->write(dsmc_dev, cs, 0, test_addr, test_data);
        /* TODO */
    }
}
```

### 4.2 直接访问

CPU 或 master 可直接访问 DSMC slave memory 空间（支持 Byte，half-word，word 的随机地址访问；支持 cacheable、uncacheable、write combine 映射方式）。

---

## 5. 用户态对DSMC的访问

### 5.1 通过特定节点访问

在 Local bus 使能的情况下，DSMC 驱动会在 `/dev/dsmc/` 创建 4 个从设备片选 CS，每个 CS 下会创建 4 个 memory region，各属性分别对应 DTS 的描述。若需要访问 merged-FIFO，对应为 region0，需操作对应的片选 CS 下的对应 region 节点。具体如下：

1. 使用 `open()` 接口打开对应 region 设备节点，获取文件描述符；  
2. 使用 `mmap()` 系统调用将上述 region 设备内存映射到进程地址空间，获取映射地址；  
3. 读写设备内存；  
4. 使用 `munmap()` 解除内存映射；  
5. 使用 `close()` 关闭文件描述符。

代码示例如下：

```c
device_name = "/dev/dsmc/cs0/region0"
wantbytes = 0x200000;
memfd = open(device_name, O_RDWR | O_SYNC);
if (memfd == -1) {
    fprintf(stderr, "failed to open %s for physical memory: %s\n",
            device_name, strerror(errno));
    exit(EXIT_FAILURE);
}
/* 使用 O_SYNC 标志打开文件和 MAP_LOCKED 标志进行 mmap 操作的 memory 空间是 uncached 的 */
buf = (void volatile *) mmap(0, wantbytes, PROT_READ | PROT_WRITE,
                             MAP_SHARED | MAP_LOCKED, memfd,
                             0x0);
if (buf == MAP_FAILED) {
    fprintf(stderr, "failed to mmap %s for physical memory: %s\n",
            device_name, strerror(errno));
    exit(EXIT_FAILURE);
}
bufsize = wantbytes;
halflen = bufsize / 2;
count = halflen / sizeof(u32);
bufa = (u32v *) buf;
bufb = (u32v *) ((size_t) buf + halflen);
test_dsmc(bufa, bufb, count); /* 读写 DSMC slave 内存 */
if (munmap((void*)buf, wantbytes) == -1) {
    perror("munmap");
    close(memfd);
    exit(EXIT_FAILURE);
}
close(memfd);
```

### 5.2 直接访问

CPU 可以通过 `/dev/mem` 映射的 DSMC slave memory 空间直接进行访问，如 RK3576 上使用 `io` 命令进行 DSMC slave memory 的 region0 访问：`io -4 0x10000000`。

---

## 6. DSMC slave内存空间分配

DSMC slave 的空间分配由 `rockchip,ranges` 属性控制，配置的是从设备内存空间的起始地址和大小。

### 6.1 PSRAM

例如配置 `rockchip,ranges = <0x0 0x10000000 0x0 0x2000000>;`，若外设是 PSRAM，`rockchip,ranges` 配置的是最大 CS 空间的大小。对 DSMC 控制器来说，每个片选 CS 的容量是相同的。若实际不同片选 CS 贴不同容量 PSRAM，用户访问时应当注意边界。每个 CS 的内存空间划分如下：

![alt text](/pdf/rk/dsmc/image-3.png)

**Note**：DSMC 理论上支持不同片选 CS 是不同厂家 PSRAM，支持容量不同，但不同片选 CS 的位宽（x8 or x16）必须相同。

### 6.2 Local bus

若外设是 Local Bus，对于 DSMC 控制器来说，每个片选 CS 的容量也是相同的。每个片选 CS 都可以均分成 1、2、4 个 region，每个 region 的属性可以是 DPRAM、Register、merged FIFO 和 un-merged FIFO。若实际每个 CS 的 region 容量不同，用户访问时应当注意边界。

![alt text](/pdf/rk/dsmc/image-4.png)

对于 Local Bus，`rockchip,ranges` 配置的是最大 region 空间的大小。  
若一个片选 CS 开启 2 个 region，每个 region 大小由 DTS（DSMC 节点 slave 设备的 `rockchip,ranges = 0x0 0x10000000 0x0 0x2000000`）决定。各个 CS 的各 region 的内存空间分配如下： 

![alt text](/pdf/rk/dsmc/image-5.png)



---

## 7. DSMC Local bus host与slave的数据交互

### 7.1 FIFO

当 DSMC 使用 Local bus 协议，且外接 RK slave 时，slave 端有一段 FIFO，当访问的 region 属性是 merged-FIFO 或者 un-merged-FIFO 时，host 端传输的数据经过 FIFO 后，slave 端会再次写入 slave 端的内存，如 DDR，SRAM 等。这段 FIFO 不可见，对于 DSMC host 端来说，slave 端的 DDR，SRAM 内存空间即是 slave 端的内存空间。通过 DSMC 写入的数据，最终都将被写入 slave 端的内存，在使用时应注意 slave 端内存空间的管理和数据一致性。

### 7.2 Register

当 DSMC 使用 Local bus 协议，且外接 RK slave 时，有一段 SLAVE_CSR Register，当访问的 region 属性是 Register 时，即是访问这段 SLAVE_CSR Register。这段是可以用于 host 与 slave 的信息快速传递。  
可用于信息交互的寄存器： 

![alt text](/pdf/rk/dsmc/image-6.png)

- 其中 APP_CONx 寄存器，slave 有读写权限，host 端只有读权限；  
- LBC_CONx 寄存器 slave 只有读权限，host 端有读写权限。  

当 host 写入 LBC_CONx 寄存器，会触发 host2slave 中断给 slave 端 CPU，用于处理 host 端传入的数据。  
当 slave 写入 APP_CONx 寄存器后，通过 IO 引脚 INT 触发 slave2host 中断，传入 host 端，host 端 CPU 也可以响应中断，获取 slave 传递过来的数据。DSMC 接收 INT 信号后，也可以发起 DMA 硬件请求，DMA 开始搬移数据（DMA 需提前配置好）。  

**典型场景 1**  
host 端将信息写入 LBC_CONx 寄存器，将触发 host2slave 中断，slave 端从 LBC_CONx 寄存器读取信息；slave 端将信息写入 APP_CONx 寄存器，将触发 slave2host 中断，host 端从 APP_CONx 寄存器读取信息。  

**典型场景 2**：  
host 端 DSMC、DMA 配置好后，host 端通过写 LBC_CONx 寄存器通知 slave 端，然后 slave 端通过写 APP_CONx，从 INT 引脚返回 host 一个有效信号，DSMC host 接收后，发起 DMA 硬件请求，开启 DMA 搬移。  

**Note**：  
- APP_CON15、LBC_CON15 已被使用。  
- DSMC 使用 DMA 硬件请求的驱动已实现，当 host 端 DMA 配置完成，host 端将 LBC_CON15 原值 +1 写入 LBC_CON15 寄存器，slave 接收到数据后，将 APP_CON15 写 1 触发 slave2host 中断，DSMC host 接收后自动发起一定数量的 DMA 硬件请求，触发 DMA 搬移。