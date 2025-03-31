# K1 Pro M.2 Interface Description

## 1. M.2 Interface

M.2 is a specification for internally mounted computer expansion cards and associated connectors. It adopts a new physical layout and connector to replace the PCI Express (PCIE) and mSATA interface standards. M.2 has flexible physical specifications, allowing for a wider variety of module widths and lengths, and supports more advanced interfaces, making it more suitable than mSATA for everyday applications, especially for solid-state drives in ultrabooks or tablets.

M.2 was developed by the PCI-SIG and SATA-IO standards organizations and is defined in the PCI-SIG M.2 and SATA Rev. 3.2 specifications. Originally called NGFF (Next Generation Form Factor), it was officially renamed M.2 in 2013.

For detailed information, refer to [Wikipedia](https://en.wikipedia.org/wiki/M.2).

The common M.2 interfaces are as follows:
![front](/img/k1/hardware/m2/m2_type.png)

Different types of interfaces correspond to different pin shapes and pin definitions.
![front](/img/k1/hardware/m2/m2_type_define.png)
The pin definitions are as follows:

- KEY-A pin definition
- KEY-B pin definition
- KEY-E pin definition
- KEY-M pin definition

## K1 Pro Onboard M.2 Interface

The K1 Pro integrates three M.2 interfaces onboard, as shown below:

![M.2 Interface Diagram](/img/k1pro/hardware/k1pro_m2.png)
![M.2 Interface Diagram](/img/k1pro/hardware/k1pro_m2_1.png)

Among them, M.2 SLOT 1 and SLOT 2 are standard M.2 KEY-M interface definitions, which can directly support NVME interface solid-state drives. The solid-state drive length can be 2280.

Users can choose mainstream NVME interface SSDs. The installation method is shown below:

![SSD Installation Diagram](/img/k1/hardware/m2/kingston_ssd.png)

Another M.2 SLOT 0 is defined as a KEY-E interface with a length of 2230, mainly used to support various wireless modules. Since the processor has only three USB interfaces, SLOT 0 does not reserve a USB interface and also removes compatibility with NGFF's PCIE interface, so it cannot support modules defined by USB and PCIE interfaces. The detailed pin definition of the SLOT 0 interface is as follows:
![frame](/img/k1pro/hardware/m2_frame.png)

## K1 Pro Default Supported BIT-BRICK Hardware Modules

The supported categories and models are as follows:

| Model         | Category      | Specification Description |
| ------------- | ------------- | ------------------------- |
| WIFI+Bluetooth | Wireless Module |                         |
| LORA          | Wireless Module |                         |
| ZIGBEE        | Wireless Module |                         |
| Bluetooth+StarFlash | Wireless Module |                 |
| GPS           | Positioning Module |                     |


