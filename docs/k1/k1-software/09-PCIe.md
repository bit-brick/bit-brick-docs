Introduction to the function and usage method of PCIe.
K1 has a total of 3 PCIe controllers, which support the connection of various PCIe interface devices, including nvme ssd, sata, and wifi, etc.
PCIe0 and the USB3 controller share the same phy hardware and cannot be used simultaneously. In application schemes, USB3 is generally used, so PCIe0 is less used.
The configuration space allocation for each controller is as follows.
## Configuration Space Allocation
1. PCIe0
mem space size: 240MB
io space size: 1MB
2. PCIe1
mem space size: 240MB
io space size: 1MB
3. PCIe2
mem space size: 368MB
io space size: 1MB
## Detailed Description of the Configuration Space
Taking the PCIe2 controller as an example, the address space allocation of the PCIe controller is explained.
The allocated address space for PCIe2 is 0xa00000000 ~ 0xb80000000, with a size of 0x18000000 (384MB).
According to the needs, the mem, IO, and config spaces can be modified, as long as they are within the range of 0xa00000000 ~ 0xb80000000 and the three parts of the space do not overlap.
The current configuration in k1 - x.dts is as follows:
```c
pcie2_rc: pcie@ca800000 {
       ...
        reg = <0x0 0xca800000 0x0 0x00001000>, /* dbi */
             ...
              <0x0 0xb7000000 0x0 0x00002000>, /* config space */
             ...
        #address - cells = <3>;
	#size - cells = <2>;
	ranges = <0x01000000 0x0 0xb7002000 0 0xb7002000 0x0 0x100000>,
                 <0x02000000 0x0 0xa0000000 0 0xa0000000 0x0 0x17000000>;
       ...
The meaning is as follows:
mem space
  <0x02000000 0x0 0xa0000000 0 0xa0000000 0x0 0x17000000>
  with a size of 368MB
IO space
  <0x01000000 0x0 0xb7002000 0 0xb7002000 0x0 0x100000>
  with a size of 1MB
config space
  <0x0 0xb7000000 0x0 0x00002000>
  with a size of 8kB
## pinctrl
Check the schematic diagram of the scheme to find the pin group used by pcie. Refer to Section 1.2.2 to determine the pin group used by pcie.
Assume that pcie1 can directly use the pinctrl_pcie1_3 defined in k1 - x_pinctrl.dtsi.
## dts Configuration
The description of pcie_rc in the scheme dts is as follows.
```c
&pcie1_rc {
        pinctrl - names = "default";
        pinctrl - 0 = <&pinctrl_pcie1_3>;
        status = "okay";
};
```