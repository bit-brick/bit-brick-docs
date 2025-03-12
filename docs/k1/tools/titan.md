# Firmware Update Tool


This article introduces the steps for downloading, installing, and using the firmware update tool Titan Flasher.

## 1 Download

<table>
<tbody>
<tr>
<td>Source</td>
<td>Device</td>
<td>ARCH</td>
<td>Download</td>
</tr>
<tr>
<td>TITANTOOLS FOR WINDOWS (X86|X64) (INSTALLER)</td>
<td>WINDOWS</td>
<td>X86|X64</td>
<td> <a href="https://cloud.spacemit.com/prod-api/release/download/tools?token=titantools_for_windows_X86_X64">Download</a></td>
</tr>
<tr>
<td>TITANTOOLS FOR  LINUX  X64 (64-BIT) (APPIMAGE)</td>
<td> LINUX </td>
<td>X64   </td>
<td> <a href="https://cloud.spacemit.com/prod-api/release/download/tools?token=titantools_for_linux_64BIT_APPIMAGE">Download</a></td>
</tr>
</tbody>
</table>

## 2 Install

### 2.1 PC System Requirements

- Operating System: Windows or Linux
- C Drive Space (or Home Space on Linux): \> 10GB

### 2.2 Windows Installation

Taking Windows 11 as an example.

1. Download the latest version of the flashing tool  [titantools\_for\_windows.exe ](https://cloud.spacemit.com/prod-api/release/download/tools?token=titantools_for_windows_X86_X64)
2. Double-click on the titantools\_for\_windows\_last installer.
3. If the system prompts you with "Do you want to allow this app from an unknown publisher to make changes to your device?", select "Yes".
4. If the system prompts you with "Windows can't verify the publisher of this driver software", select "Always install this driver software".

![](https://developer.spacemit.com/resource/file/images?fileName=HqGobV8ufoZa4fxKY4WcMSN8ngL.png)

5. If the system prompts you to allow this app from an unknown publisher to make changes to your device, select Yes. Continue until the installation is complete.

![](https://developer.spacemit.com/resource/file/images?fileName=USvybIyXqoAyJdxR6E3c9qg5nPg.png)

### 2.3 Installation on Linux

Taking Ubuntu as an example:

1. Download the latest version of the flashing tool [titantools\_for\_linux.AppImage](https://cloud.spacemit.com/prod-api/release/download/tools?token=titantools_for_linux_64BIT_APPIMAGE)
2. Grant executable permissions
3. Double-click to start using, no installation required

Note: If the startup fails with the error: "dlopen(): error loading libfuse.so.2", you can install the libfuse dependency:

```
sudo apt install libfuse2
```

## 3 Flashing Process

### 3.1 Enter Flashing Mode

- When the device is powered off and in a shutdown state:

  - 1. Press and hold the "Download (FDL)" button without releasing it
  - 2. Plug in the power cable
  - 3. Release the "Download (FDL)" button
  - 4. Connect the USB data cable to the firmware USB connector, and the device should be detected
- When the device is powered on and in an operating state：

  - 1. Press and hold the FDL button without releasing it
  - 2. Briefly press the Reset button
  - 3. Release the FDL button
  - 4. Connect the USB data cable to the firmware USB connector, and the device should be detected

### 3.2 Flashing Process

1. Open the flashing tool. If the system prompts you to allow this app from an unknown publisher to make changes to your device, select Yes.

![](https://developer.spacemit.com/resource/file/images?fileName=CZihbbiXfoipmvxQgdecaQAinob.png)

2. Select Development Tools \> Standalone Flashing.

![](https://developer.spacemit.com/resource/file/images?fileName=H0IEbjgdCoKrBRxL1EucAOhLnih.png)

3. Click "Scan Device" until "VID:PID" appears. If there are multiple devices, please select the device you want to flash. The device must enter download mode to be detected.

![](https://developer.spacemit.com/resource/file/images?fileName=AtTXbKyuhoTph2x9VUpcYHv5n5f.png)

4. Click to select the flashing file, choose the firmware, then the tool will prompt "Extracting files...". Please be patient and wait for the flashing process to complete.

![](https://developer.spacemit.com/resource/file/images?fileName=XN0Vboxr2oes1Axbs2hcsabXnTg.png)

Or select an extracted flashing directory.

![](https://developer.spacemit.com/resource/file/images?fileName=Eux0b57Xgo82gAxACRAcZYsgn0f.png)

5. Click to start flashing and initiate the flashing process.

![](https://developer.spacemit.com/resource/file/images?fileName=Ba2LbcoUDoNoXUxTIaBciCUwnPY.png)

6. Once the flashing process is complete, power the device on again to enter the system.
