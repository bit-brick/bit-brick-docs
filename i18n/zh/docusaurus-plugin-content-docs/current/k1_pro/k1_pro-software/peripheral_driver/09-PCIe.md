

# PCIe 


## 前言

本开发指南主要适用于以下工程师：
- 技术支持工程师
- 软件开发工程师

## 芯片资源介绍

### RK1808
- 内核版本：4.4，4.19

### RK3528
- 内核版本：4.19，5.10，6.1

### RK3562
- 内核版本：5.10，6.1

### RK3566/RK3568
- 内核版本：4.19，5.10，6.1

### RK3576
- 内核版本：6.1

### RK3588
- 内核版本：5.4，5.10，6.1

## DTS 配置

### 配置要点
- 控制器/PHY使能：根据原理图选择使能正确的控制器和PHY。
- 控制器：部分控制器有不止一个PHY可选，按方案设计正确配置“phys”。
- 控制器：作为RC通常需要配置"reset-gpios"。
- 控制器：作为RC可能需要配置"vpcie3v3-supply"。
- 控制器：作为EP使用时，需要修改"compatible"为EP模式对应字串。
- PHY：pcie30phy共4个lane，可拆分使用，需要根据方案正确配置"rockchip,pcie30-phymode"模式。

### RK1808 DTS配置
```dts
&pcie0 {
    status = "okay";
    num-lanes = <2>;
    max-link-speed = <2>;
    phy-names = "pcie-phy";
    phys = <&pciephy>;
    reset-gpios = <&gpio4 RK_PA7 GPIO_ACTIVE_HIGH>;
    vpcie3v3-supply = <&vpcie3v3>;
};
```

### RK3528 DTS配置
```dts
&pcie2x1 {
    status = "okay";
    num-lanes = <1>;
    max-link-speed = <2>;
    phy-names = "pcie-phy";
    phys = <&pciephy>;
    reset-gpios = <&gpio4 RK_PA7 GPIO_ACTIVE_HIGH>;
    vpcie3v3-supply = <&vpcie3v3>;
};
```

### RK356X DTS配置
```dts
&pcie2x1 {
    status = "okay";
    num-lanes = <1>;
    max-link-speed = <2>;
    phy-names = "pcie-phy";
    phys = <&pciephy>;
    reset-gpios = <&gpio4 RK_PA7 GPIO_ACTIVE_HIGH>;
    vpcie3v3-supply = <&vpcie3v3>;
};
```

## menuconfig 配置

确保以下配置打开：
```plaintext
CONFIG_PCI=y
CONFIG_PCI_DOMAINS=y
CONFIG_PCI_DOMAINS_GENERIC=y
CONFIG_PCI_SYSCALL=y
CONFIG_PCI_BUS_ADDR_T_64BIT=y
CONFIG_PCI_MSI=y
CONFIG_PCI_MSI_IRQ_DOMAIN=y
CONFIG_PHY_ROCKCHIP_SNPS_PCIE3=y
CONFIG_PHY_ROCKCHIP_NANENG_COMBO_PHY=y
CONFIG_PCIE_DW=y
CONFIG_PCIE_DW_HOST=y
CONFIG_PCIE_DW_ROCKCHIP=y
CONFIG_PCIEPORTBUS=y
CONFIG_PCIE_PME=y
CONFIG_GENERIC_MSI_IRQ=y
CONFIG_GENERIC_MSI_IRQ_DOMAIN=y
CONFIG_IRQ_DOMAIN=y
CONFIG_IRQ_DOMAIN_HIERARCHY=y
```

## 标准EP功能件开发

参考文档《Rockchip_Developer_Guide_PCIE_EP_Stardard_Card_CN》。

## RC mode PM L1 Substates 支持

如果确认所用RK主控及所接的外设都支持PCIe PM L1 Substates，可以通过开启PM L1 Substates功能支持对功耗进一步优化。

## 基于GPIO方式的拔插检测机制

### 硬件要求
- PCIe slot的PRSNT#_1需要与主控的任意GPIO相连，作为检测脚。
- PCIe设备的电源需要软件可控制上下电。

### 软件要求
- 内核需确认打开如下配置：
  ```plaintext
  CONFIG_HOTPLUG_PCI=y
  CONFIG_HOTPLUG_PCI_GPIO=y
  ```

### 使用限制
- PCIe设备带电拔插极易损坏设备和主控，在设备拔出后的卸载流程和断电流程需要一点时间，所以禁止快速热拔插。
- 为保证数据的完整性和系统的稳定性，需要确保系统停止访问待拔出设备。
- 无法支持switch下游设备的单独拔插。如有此需求，首先需要确认switch支持下游设备单独热拔插，然后参考常见应用问题中"如何对下游单个设备进行重扫描或者在线更换设备？"部分进行rescan处理，亦可达到同等效果。
- 不支持在休眠待机状态下，检测插入或者移除设备。

## 内核 DMATEST

RK PCIe DMA提供基于内核module_para机制的测试机制，框架类似Linux dmatest，可以基于该框架进一步完成内核下的PCIe DMA应用。

### 测试宏配置
```plaintext
CONFIG_PCIE_DW_DMATEST=y
CONFIG_ROCKCHIP_PCIE_DMA_OBJ=n
```

### 实例参考1：RC设备
```plaintext
echo 1 > ./sys/module/pcie_dw_dmatest/parameters/is_rc
echo 1 > ./sys/module/pcie_dw_dmatest/parameters/chn_en
echo 1 > ./sys/module/pcie_dw_dmatest/parameters/rw_test
echo 0x100000 > ./sys/module/pcie_dw_dmatest/parameters/size
echo 1000 > ./sys/module/pcie_dw_dmatest/parameters/cycles_count
echo 0x3c000000 > ./sys/module/pcie_dw_dmatest/parameters/local_addr
echo 0x3c000000 > ./sys/module/pcie_dw_dmatest/parameters/bus_addr
echo run > ./sys/module/pcie_dw_dmatest/parameters/dmatest
```

### 实例参考2：EP设备
```plaintext
echo 0 > ./sys/module/pcie_dw_dmatest/parameters/is_rc
echo 3 > ./sys/module/pcie_dw_dmatest/parameters/chn_en
echo 3 > ./sys/module/pcie_dw_dmatest/parameters/rw_test
echo 0x2000 > ./sys/module/pcie_dw_dmatest/parameters/size
echo 10000 > ./sys/module/pcie_dw_dmatest/parameters/cycles_count
echo 0x3c000000 > ./sys/module/pcie_dw_dmatest/parameters/local_addr
echo 0x3c000000 > ./sys/module/pcie_dw_dmatest/parameters/bus_addr
echo run > ./sys/module/pcie_dw_dmatest/parameters/dmatest
```

## 内核 稳定性统计信息

如果需要启用此功能，先确保包含此提交（pcie: rockchip: dw: Add debugfs support），否则可以在附录章节所示redmine系统中获取0001-pcie-rockchip-dw-Add-debugfs-support.patch。

### 使用方法
1. 明确出问题的设备所处的控制器地址节点，可从开机枚举log中查阅或者直接从dtsi中查看。
2. 以fe16000.pcie为例，进入/sys/kernel/debug/fe160000.pcie目录。
3. 执行以下命令：
   ```plaintext
   echo disable > err_event
   echo clear > err_event
   echo enable > err_event
   ```
4. 开始设备老化，复现异常case后，请执行以下命令：
   ```plaintext
   cat dumpfifo
   cat err_event
   ```

## 内核 错误注入测试支持

如果需要开启错误注入测试，模拟双方交互过程中可能出现的错误类型，评估双方软件、IP的稳定性。

### 使用方法
1. 需要包含以下提交：
   ```plaintext
   commit fe835d5fd3329ba629f8c4290c818ef4b8f9895d
   Author: Shawn Lin <shawn.lin@rock-chips.com>
   Date:   Wed Sep 4 17:04:37 2024 +0800
       PCI: rockchip: dw: Add fault injection support
   ```
2. 需要开启本文档中“内核 稳定性统计信息”章节所述功能，并进入对应控制器的目录。
3. 执行以下命令：
   ```plaintext
   echo "einj_number enable_or_disable error_type error_number" > fault_injection
   ```
   示例：
   ```plaintext
   echo "2 1 2 128" > fault_injection
   ```
   代表开启einj2，注入128个NAK DLLP包。
4. 启动PCIe链路传输，例如NVMe:
   ```plaintext
   dd if=/dev/nvme0n1 of=/dev/null bs=1M count=5000
   ```
5. 查看错误是否发生：
   ```plaintext
   cat err_event
   ```

## 内核 PMU perf支持

### 软件与配置
1. 需包含以下五个提交：
   ```plaintext
   commit 0270f32f207f5682a729c17e977eb87bba83823e
   Author: Shuai Xue <xueshuai@linux.alibaba.com>
   Date:   Fri Dec 8 10:56:50 2023 +0800
       UPSTREAM: PCI: Move pci_clear_and_set_dword() helper to PCI header

   commit 1b627c690ade9a72e3cd488e2e11edffb5d0e879
   Author: Shuai Xue <xueshuai@linux.alibaba.com>
   Date:   Fri Dec 8 10:56:49 2023 +0800
       UPSTREAM: PCI: Add Alibaba Vendor ID to linux/pci_ids.h

   commit dcfa6c8947baeac74ab44ea8f03d3831062c14b1
   Author: Shuai Xue <xueshuai@linux.alibaba.com>
   Date:   Fri Dec 8 10:56:51 2023 +0800
       BACKPORT: drivers/perf: add DesignWare PCIe PMU driver

   commit 6cb6a00862fa9e8154432634569e2015f6a396a9
   Author: Shawn Lin <shawn.lin@rock-chips.com>
   Date:   Tue Sep 3 16:24:36 2024 +0800
       perf/dwc_pcie: Add support for Rockchip vendor devices

   commit 50cb3fcd18fb9defe23ba95eb3962a287e957166
   Author: Shawn Lin <shawn.lin@rock-chips.com>
   Date:   Tue Sep 3 16:24:36 2024 +0800
       PCI: rockchip: dw: Add dwc pmu support for rockchip
   ```
2. 内核需要开启`CONFIG_PERF_EVENTS`配置。
3. 系统需要集成`perf`工具；若无，可以去本文档附录所述开发资源获取地址内下载。

### 使用说明
1. 列出所有DWC PCIe PMU支持的配置：
   ```plaintext
   /userdata/perf list | grep dwc_rootport
   ```
   示例输出：
   ```plaintext
   dwc_rootport_0/CFG_RCVRY/          [Kernel PMU event] #链路rcvry时间占比
   dwc_rootport_0/L0/                 [Kernel PMU event] #链路处于L0占比
   dwc_rootport_0/L1/                 [Kernel PMU event] #链路处于L1占比
   dwc_rootport_0/L1_1/               [Kernel PMU event] #链路处于L1.1占比
   dwc_rootport_0/L1_2/               [Kernel PMU event] #链路处于L1.2占比
   dwc_rootport_0/L1_AUX/             [Kernel PMU event] #RK不支持状态
   dwc_rootport_0/RX_L0S/             [Kernel PMU event] #RX处于L0s占比
   dwc_rootport_0/Rx_CCIX_TLP_Data_Payload/ [Kernel PMU event] #RK不支持CCI数据统计
   dwc_rootport_0/Rx_PCIe_TLP_Data_Payload/ [Kernel PMU event] #RX TLP数据量
   dwc_rootport_0/TX_L0S/             [Kernel PMU event] #TX处于L0s占比
   dwc_rootport_0/TX_RX_L0S/          [Kernel PMU event] #TX/RX都处于L0s占比
   dwc_rootport_0/Tx_CCIX_TLP_Data_Payload/ [Kernel PMU event] #RK不支持CCI数据统计
   dwc_rootport_0/Tx_PCIe_TLP_Data_Payload/ [Kernel PMU event] #TX TLP数据量
   dwc_rootport_0/one_cycle/          [Kernel PMU event] #RK不支持
   dwc_rootport_0/rx_ack_dllp,lane=?/ [Kernel PMU event] #RX回复的DLLP数
   dwc_rootport_0/rx_atomic,lane=?/   [Kernel PMU event] #RK不支持
   dwc_rootport_0/rx_ccix_tlp,lane=?/ [Kernel PMU event] #RK不支持
   dwc_rootport_0/rx_completion_with_data,lane=?/ [Kernel PMU event] #RX cplt包带数据
   dwc_rootport_0/rx_completion_without_data,lane=?/ [Kernel PMU event] #RX cplt包不带数据
   dwc_rootport_0/rx_duplicate_tl,lane=?/ [Kernel PMU event] #RX/TL dup错误数
   dwc_rootport_0/rx_io_read,lane=?/ [Kernel PMU event] #RX上ior包数
   dwc_rootport_0/rx_io_write,lane=?/ [Kernel PMU event] #RX上iow包数
   dwc_rootport_0/rx_memory_read,lane=?/ [Kernel PMU event] #RX上memr包数
   dwc_rootport_0/rx_memory_write,lane=?/ [Kernel PMU event] #RX上memw包数
   dwc_rootport_0/rx_message_tlp,lane=?/ [Kernel PMU event] #RX上收到的msg数
   dwc_rootport_0/rx_nulified_tlp,lane=?/ [Kernel PMU event] #RX上因错丢弃的TLP数
   dwc_rootport_0/rx_tlp_with_prefix,lane=?/ [Kernel PMU event] #RX上带前缀的TLP数
   dwc_rootport_0/rx_update_fc_dllp,lane=?/ [Kernel PMU event] #RX上收到的流控包数
   dwc_rootport_0/tx_ack_dllp,lane=?/ [Kernel PMU event] #TX回复的DLLP数
   dwc_rootport_0/tx_atomic,lane=?/ [Kernel PMU event] #RK不支持
   dwc_rootport_0/tx_ccix_tlp,lane=?/ [Kernel PMU event] #RK不支持
   dwc_rootport_0/tx_completion_with_data,lane=?/ [Kernel PMU event] #TX cplt包带数据
   dwc_rootport_0/tx_completion_without_data,lane=?/ [Kernel PMU event] #TX cplt包不带数据
   dwc_rootport_0/tx_configuration_read,lane=?/ [Kernel PMU event] #TX cfg-r包数
   dwc_rootport_0/tx_configuration_write,lane=?/ [Kernel PMU event] #TX cfg-w包数
   dwc_rootport_0/tx_io_read,lane=?/ [Kernel PMU event] #TX上ior包数
   dwc_rootport_0/tx_io_write,lane=?/ [Kernel PMU event] #TX上iow包数
   dwc_rootport_0/tx_memory_read,lane=?/ [Kernel PMU event] #TX上memr包数
   dwc_rootport_0/tx_memory_write,lane=?/ [Kernel PMU event] #TX上memw包数
   dwc_rootport_0/tx_message_tlp,lane=?/ [Kernel PMU event] #TX上收到的msg数
   dwc_rootport_0/tx_nulified_tlp,lane=?/ [Kernel PMU event] #TX上因错丢弃的TLP数
   dwc_rootport_0/tx_tlp_with_prefix,lane=?/ [Kernel PMU event] #TX发出的带前缀TLP数
   dwc_rootport_0/tx_update_fc_dllp,lane=?/ [Kernel PMU event] #TX三发出的流控包数
   ```

2. 启动某项perf功能，以基于时间的统计RX TLP为例：
   ```plaintext
   /userdata/perf stat -a -e dwc_rootport_0/Rx_PCIe_TLP_Data_Payload/
   ```

3. 启动传输：
   ```plaintext
   dd if=/dev/nvme0n1 of=/dev/null bs=1M count=5000
   ```

4. 查看统计：
   ```plaintext
   Performance counter stats for 'system wide':
   5221423060      dwc_rootport_0/Rx_PCIe_TLP_Data_Payload/     (50.01%)
   28.298528222 seconds time elapsed
   ```

5. 同理可以测试TX TLP的数据量，则平均的RX/TX带宽计算：
   ```plaintext
   PCIe RX Bandwidth = Rx_PCIe_TLP_Data_Payload / 统计时长
   PCIe TX Bandwidth = Tx_PCIe_TLP_Data_Payload / 统计时长
   ```

6. Lane事件的统计
   因为每个Lane都拥有相同的事件，为了避免产生大量冗余信息，建议指定Lane ID，例如：
   ```plaintext
   /userdata/perf stat -a -e dwc_rootport_0/rx_memory_read,lane=1/
   ```

## 常见应用问题

### 11.1 当走线位置不佳时，不同lane之间能否交织？
- 支持lane交织（Lane reversal），属于硬件协议行为，软件不需要改动。但是有如下限制：
  - 4 Lane的情况下，目前RK平台仅支持全倒序交织，即RC的Lane[0.1.2.3] 分别对应 EP的 Lane[3.2.1.0]，其余情况一概不支持。
  - 2 Lane的情况下，同理支持RC的Lane[0.1]分别对应EP的Lane[1.0]。
- 不支持同一侧不同组lane之间的信号的组合使用，如RC lane0 TX与lane1 RX无法组合为一组lane来外接设备。

### 11.2 同一个lane的差分信号能否交织？
- 支持PN翻转（Lane polarity），通常RC TX+接入EP RX+、RC TX-接入EP RX-，支持RC TX+接入EP RX-等PN翻转布线，且软件不需要额外处理，由PCIe控制器自动探测。
- 不支持TX/RX交织，例如RC的lane1 TX无法与EP的lane1TX对接。

### 11.3 同一个PCIe接口是否支持拆分或者合并？
- RK芯片的部分PCIe口可以支持拆分和合并功能，请参阅"芯片资源介绍"章节，具体方法参考示例和dts说明。

### 11.4 PCIe 3.0接口支持哪些时钟输入模式？
- PCIe 3.0 的PHY的输入时钟模式可以是HCSL、LPHCSL或者其他差分信号，例如支持LVDS外加电平转换等电路实现的输入时钟方案，以上所有以满足PHY指标为准。

### 11.5 是否支持PCIe switch？贵司有没有推荐？
- 理论上支持，不需要任何补丁，且没有推荐列表。为了把控风险，请联系供应商借评估板，插在我司EVB上验证后再采购。

### 11.6 在系统中如何确定控制器与设备的对应关系？
- 以RK3568芯片为例：
  - PCIe2x1控制器给外设分配的Bus地址介于0x00xf，PCIe3x1控制器给外设分配的bus地址介于0x100x1f，PCIe3x2控制器给外设分配的bus地址介于0x20~0x2f。
  - 从lspci输出的信息中可以看到各设备分配到的bus地址（高位），即可确定对应关系。第二列Class是设备类型，第三列VID:PID。
  - Class类型请参考[https://pci-ids.ucw.cz/read/PD/](https://pci-ids.ucw.cz/read/PD/)，厂商VID和产品PID请参考[http://pci-ids.ucw.cz/v2/pci.ids](http://pci-ids.ucw.cz/v2/pci.ids)。
- 我们可以看到每个控制器下游预留了16级bus来接设备，意味着每个控制器下游可以接16个设备(含switch), 一般可以满足需求，阅读者可以跳过下面的说明。如果确属需要调整，请调整rk3568.dtsi中三个控制器的bus-range分配，且务必确保不要重叠。另外，调整bus-range将导致设备的MSI(-X) RID区间变化，请同步调整msi-map。
  - 例如bus-range调整为0x30 ~ 0x60, 即该控制器下游设备分配的bus地址从0x30 到0x60, 总线总数 0x30个
  - 则可配置 `msi-map = <0x3000 &its 0x3000 0x3000>`
  - 依此类推，且一定要保证三个控制器的bus-range和msi-map互不重叠，且bus-range和msi-map相互适配。

### 11.7 如何确定PCIe设备的链路状态？
- 请使用服务器发布的lspci工具，执行`lspci -vvv`，找到对应设备的linkStat即可查看；其中Speed为速度，Width即为lane数。如需要解析其他信息，请查找搜索引擎，对照查看。

### 11.8 如何确定SoC针对PCIe设备可分配的MSI或者MSI-X数量？
- SoC针对每个PCIe设备可分配的数量由中断控制器的资源决定。每个控制器的下游设备，RK1808/RK3566/RK3568/RK3588可分配的MSI或者MSI-X总数均是65535个，RK3528/RK3562/RK3576可分配的MSI或者MSI-X总数是8个。

### 11.9 是否支持Legacy INT方式？如何强制使用Legacy INTA ~ INTD的中断？
- 支持legacy INT方式。但Linux PCIe协议栈默认的优先级是MSI-X, MSI, Legacy INT，因此常规市售设备不会去申请Legacy INT。若调试测试需要，请参考内核中Documentation/admin-guide/kernel-parameters.txt文档，其中"pci=option[,option...] [PCI] various PCI subsystem options."描述了可以在cmdline中关闭MSI，则系统默认会强制使用Legacy INT分配机制。以RK356X安卓平台为例，可在arch/arm64/boot/dts/rockchip/rk3568-android.dtsi的cmdline参数中额外添加一项`pci=nomsi`，注意前后项需空格隔开：
  ```plaintext
  bootargs = "...... pci=nomsi ......";
  ```
- 如果添加成功，则`lspci -vvv`可以看到此设备的MSI和MSI-X都是处于关闭状态(Enable-)，而分配了INT A中断，中断号是80。`cat /proc/interrupts`可查看到80中断的状态。

### 11.10 芯片支持分配的BAR空间地址域有多大？
- RK1808
- RK3528
- RK3562
- RK3566/RK3568
- RK3576
- RK3588(s)

| 控制器 | 高端BAR起始地址 | 长度 | 低端BAR起始地址 | 长度 |
| --- | --- | --- | --- | --- |
| PCIe2.0 | 0x300000000 | 1GB | 0xFC000000 | 32MB |
| PCIe2.0 | 0x300000000 | 1GB | 0xF4000000 | 32MB |
| PCIe3x1 | 0x340000000 | 1GB | 0xF2000000 | 32MB |
| PCIe3x2 | 0x380000000 | 1GB | 0xF0000000 | 32MB |
| PCIe0 | 0x900000000 | 2GB | 0x20000000 | 16MB |
| PCIe1 | 0x980000000 | 2GB | 0x21000000 | 16MB |
| pcie3x4 | 0x900000000 | 1GB | 0xf0000000 | 16MB |
| pcie3x2 | 0x940000000 | 1GB | 0xf1000000 | 16MB |
| pcie2x1l0 | 0x980000000 | 1GB | 0xf2000000 | 16MB |
| pcie2x1l1 | 0x9c0000000 | 1GB | 0xf3000000 | 16MB |
| pcie2x1l2 | 0xa00000000 | 1GB | 0xf4000000 | 16MB |

PCIe控制器支持最大的64-bit的BAR空间见上图，其中外设配置空间、IO空间和MEM空间共享这地址段，且MEM空间不支持预取功能。

### 11.11 如果CPU运行在32位地址模式下，如何实现BAR空间的访问？
- 默认状态下，芯片给PCIe控制器分配的BAR空间均位于超出32位寻址的地址段。但是我们芯片有预留32位以下的一个BAR地址，对每个控制器有不同的限制。例如，RK3568芯片每个控制器的低位BAR地址仅有32MB，当RK3568的CPU运行在32位地址模式下，此时我们应该启用低位地址空间对每个PCIe节点的ranges进行重新分配。以下例子已经修改为配置空间1MB，IO空间1MB和32-bit MEM空间30MB：
  ```dts
  &pcie2x1 {
      ranges = <0x00000800 0x0 0xF4000000 0x0 0xF4000000 0x0 0x100000
               0x81000000 0x0 0xF4100000 0x0 0xF4100000 0x0 0x100000
               0x82000000 0x0 0xF4200000 0x0 0xF4200000 0x0 0x1e00000>;
  }
  ```

如需调整各个空间的大小，可参考附录中“关于PCIe地址空间配置详述”的部分。

### 11.12 如何查看芯片分配给外设的CPU域地址以及PCIe bus域地址，两者如何对应？
- 使用lspci命令可以看到各设备CPU域地址以及PCIe bus域地址
- 我们可以看出到，芯片给外设分配的CPU域地址是0x380900000；CPU若需要访问外设，可以直接用IO命令或者devmem命令读取0x380900000。而0x380900000这个CPU域地址对应的PCIe bus域地址，可从PCIe外设的BAR0地址(偏移0x10开始到0x14为止)读出“04 00 90 80”， 即为0x80900000（最低位04是表明此BAR的类型为64bit MEM）。因此当CPU发出访问0x380900000这个CPU域地址时，PCIe的地址转换服务(ATU)，通过所配置的outbound关系，可以发出0x80900000这个PCIe bus域地址，从而实现CPU访问到PCIe外设的内部信息。
- 两者的对应关系在rk3568.dtsi中有定义，我们以pcie3x2为例：
  ```dts
  &pcie3x2 {
      ranges = <0x00000800 0x0 0xF0000000 0x0 0xF0000000 0x0 0x100000
               0x81000000 0x0 0xF0100000 0x0 0xF0100000 0x0 0x100000
               0x82000000 0x0 0xF0200000 0x0 0xF0200000 0x0 0x1e00000>;
  }
  ```
- 例如我们可以查看到Memory段的详细分配情况。 首段0x83000000表明此memory段为64-bit non prefetch空间。
  - 0x3 0x80900000为芯片分配的CPU域地址，即0x0000000380900000；0x0 0x80900000为分配的CPU域地址所对应的PCIe bus域地址，即0x0000000080900000；0x3f700000为此memory段的总大小。
- 使用lspci命令可以看到各设备CPU域地址以及PCIe bus域地址
- 我们可以看出到，芯片给外设分配的CPU域地址是0x380900000；CPU若需要访问外设，可以直接用IO命令或者devmem命令读取0x380900000。而0x380900000这个CPU域地址对应的PCIe bus域地址，可从PCIe外设的BAR0地址(偏移0x10开始到0x14为止)读出“04 00 90 80”， 即为0x80900000（最低位04是表明此BAR的类型为64bit MEM）。因此当CPU发出访问0x380900000这个CPU域地址时，PCIe的地址转换服务(ATU)，通过所配置的outbound关系，可以发出0x80900000这个PCIe bus域地址，从而实现CPU访问到PCIe外设的内部信息。
- 两者的对应关系在rk3568.dtsi中有定义，我们以pcie3x2为例：
  ```dts
  &pcie3x2 {
      ranges = <0x00000800 0x0 0xF0000000 0x0 0xF0000000 0x0 0x100000
               0x81000000 0x0 0xF0100000 0x0 0xF0100000 0x0 0x100000
               0x82000000 0x0 0xF0200000 0x0 0xF0200000 0x0 0x1e00000>;
  }
  ```
