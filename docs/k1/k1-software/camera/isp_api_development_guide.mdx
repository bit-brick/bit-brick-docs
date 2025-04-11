---
sidebar_position: 2
---

# ISP API Development Guide



## SDK API Interface Description

### ISP API

This section introduces the usage of ISP module APIs. The described APIs are ISP SDK APIs for applications, divided into system control APIs, image effect setting APIs, and tuning-related APIs. It explains the relevant parameter data structures, error codes, and return values in detail. It is mainly aimed at tuning and algorithm engineers related to ISP effects, as well as application engineers developing image-related setting functions.

#### System Control API

The system control APIs are as follows:

- ASR_ISP_Construct: Construct the ISP pipeline context environment interface.
- ASR_ISP_Destruct: Destruct the ISP pipeline context environment interface.
- ASR_ISP_GetFwFrameInfoSize(): Get the size of the ISP firmware frameinfo structure interface.
- ASR_ISP_RegSensorCallBack: Register the sensor callback function to the ISP pipeline interface.
- ASR_ISP_UnRegSensorCallBack: Unregister the sensor callback function from the ISP pipeline interface.
- ASR_ISP_RegAfMotorCallBack: Register the sensor motor callback function to the ISP pipeline interface.
- ASR_ISP_EnableOfflineMode: Enable the offline mode of the ISP pipeline interface.
- ASR_ISP_SetPubAttr: Set the public attributes of the ISP pipeline interface.
- ASR_ISP_SetTuningParams: Set the tuning-related parameters of the ISP pipeline interface.
- ASR_ISP_SetChHwPipeID: Set the real hardware pipe ID of the ISP pipeline channel interface.
- ASR_ISP_Init: Initialize the ISP pipeline.
- ASR_ISP_DeInit: Deinitialize the ISP pipeline.
- ASR_ISP_EnablePDAF: Enable the PDAF of the ISP pipeline.
- ASR_ISP_SetFps: Set the frame rate of the sensor/ISP working on the pipeline.
- ASR_ISP_SetFrameinfoCallback: Set the frameinfo callback of the ISP pipeline.
- ASR_ISP_QueueFrameinfoBuffer: Queue the frameinfo buffer of the ISP pipeline.
- ASR_ISP_FlushFrameinfoBuffer: Clear the frameinfo buffer on the ISP pipeline.
- ASR_ISP_Streamon: Streamon the ISP pipeline.
- ASR_ISP_Streamoff: Streamoff the ISP pipeline.
- ASR_ISP_TriggerRawCapture: Trigger the ISP pipeline to perform the Raw capture process.
- ASR_ISP_ReInitPreviewChannel: Reinitialize the preview channel.
- ASR_ISP_NotifyOnceHDRRawCapture: Notify the ISP pipeline to enter a single HDR Raw capture process.
- ASR_ISP_UpdateNoneZslStreamAeParams: Update the AE parameters related to the sensor.

##### ASR_ISP_Construct

[Description]

Construct the ISP pipeline context environment.

[Syntax]

int ASR_ISP_Construct(uint32_t pipelineID);

[Parameters]

| Parameter Name | Description               | Input/Output |
| --------------- | ------------------------- | ------------ |
| pipelineID      | ISP pipeline ID           | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h
- Library file: libisp.so

[Note]

- As described in 2.2.1, the input parameter pipelineID describes a virtual pipeline corresponding to the ISP firmware. One pipelineID corresponds to one firmware.

##### ASR_ISP_Destruct

[Description]

Destruct the ISP pipeline context environment.

[Syntax]

int ASR_ISP_Destruct(uint32_t pipelineID);

[Parameters]

| Parameter Name | Description               | Input/Output |
| --------------- | ------------------------- | ------------ |
| pipelineID      | ISP pipeline ID           | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h
- Library file: libisp.so

##### ASR_ISP_GetFwFrameInfoSize

[Description]

Get the size of the ISP Firmware frameinfo structure.

[Syntax]

int ASR_ISP_GetFwFrameInfoSize();

[Parameters]

None.

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| &gt;0              | Structure size          |
| &lt;0              | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h
- Library file: libisp.so

##### ASR_ISP_RegSensorCallBack

[Description]

Register the sensor callback function to the ISP pipeline.

[Syntax]

Int ASR_ISP_RegSensorCallBack(uint32_t pipelineID, ISP_SENSOR_ATTR_S *pstSensorInfo, ISP_SENSOR_REGISTER_S *pstRegister);

[Parameters]

| Parameter Name  | Description                             | Input/Output |
| ---------------- | --------------------------------------- | ------------ |
| pipelineID       | ISP pipeline ID                         | Input        |
| pstSensorInfo    | Attributes of the registered sensor     | Input        |
| pstRegister      | Pointer to the structure of the registered sensor callback function | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, spm_isp_sensor_comm.h
- Library file: libisp.so, libcam_sensors.so

##### ASR_ISP_UnRegSensorCallBack

[Description]

Unregister the sensor callback function from the ISP pipeline.

[Syntax]

Int ASR_ISP_UnRegSensorCallBack(uint32_t pipelineID, ISP_SENSOR_ATTR_S *pstSensorInfo);

[Parameters]

| Parameter Name  | Description               | Input/Output |
| ---------------- | ------------------------- | ------------ |
| pipelineID       | ISP pipeline ID           | Input        |
| pstSensorInfo    | Attributes of the registered sensor | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, spm_isp_sensor_comm.h
- Library file: libisp.so

##### ASR_ISP_RegAfMotorCallBack

[Description]

Register the sensor motor callback function to the ISP pipeline.

[Syntax]

Int ASR_ISP_RegAfMotorCallBack(uint32_t pipelineID, ISP_AF_MOTOR_REGISTER_S *pstAfRegister);

[Parameters]

| Parameter Name  | Description                                 | Input/Output |
| ---------------- | ------------------------------------------- | ------------ |
| pipelineID       | ISP pipeline ID                             | Input        |
| pstAfRegister    | Pointer to the structure of the registered sensor motor callback function | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, spm_isp_sensor_comm.h
- Library file: libisp.so

##### ASR_ISP_EnableOfflineMode

[Description]

Enable the offline mode of the ISP pipeline interface. Enabling offline mode means that the input stream of the ISP comes from DDR instead of the sensor, and the VI module reads data from DDR.

[Syntax]

Int ASR_ISP_EnableOfflineMode(uint32_t pipelineID, uint32_t enable, const ISP_OFFLINE_ATTR_S *pstOfflineAttr);

[Parameters]

| Parameter Name   | Description                              | Input/Output |
| ----------------- | ---------------------------------------- | ------------ |
| pipelineID        | ISP pipeline ID                          | Input        |
| enable            | Enable/disable offline mode              | Input        |
| pstOfflineAttr    | Pointer to the structure of offline mode attributes | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, spm_isp_comm.h
- Library file: libisp.so

[Note]

- When enabling offline mode, the callbacks of the sensor and motor do not need to be registered. Even if registered, the ISP will not use them.
- The processing of the offline pipeline in special capture scenarios does not need to use this function.

##### ASR_ISP_SetPubAttr

[Description]

Set the public attributes of the ISP pipeline channel.

[Syntax]

int ASR_ISP_SetPubAttr(uint32_t pipelineID, uint32_t channelID, const ISP_PUB_ATTR_S *pstPubAttr);

[Parameters]

| Parameter Name | Description                              | Input/Output |
| --------------- | ---------------------------------------- | ------------ |
| pipelineID      | ISP pipeline ID                          | Input        |
| channelID       | ISP pipeline channel ID                  | Input        |
| pstPubAttr      | Pointer to the structure of ISP pipeline public attributes | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, spm_isp_comm.h
- Library file: libisp.so

##### ASR_ISP_SetTuningParams

[Description]

Set the tuning-related attributes of the ISP pipeline. To support algorithm development and debugging, the tuning parameters initialized by the ISP are determined by two parts:

1. First, get the settings from the sensor (convert the pre-tuned file into code);
2. If this interface tells the ISP that there is a tuning file, the ISP will prioritize this file and override the previously set parameters; otherwise, it will not perform any operations.

[Syntax]

int ASR_ISP_SetTuningParams(uint32_t pipelineID, ISP_TUNING_ATTRS_S *pstTuningAttr);

[Parameters]

| Parameter Name  | Description                                  | Input/Output |
| ---------------- | -------------------------------------------- | ------------ |
| pipelineID       | ISP pipeline ID                              | Input        |
| pstTuningAttr    | Pointer to the structure of ISP pipeline tuning attributes | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, spm_isp_comm.h
- Library file: libisp.so

[Note]

- Before calling this interface, ASR_ISP_RegSensorCallBack or ASR_ISP_EnableOfflineMode needs to be called first.

##### ASR_ISP_SetChHwPipeID

[Description]

Set the actual working hardware pipe ID of the ISP pipeline channel.

[Syntax]

int ASR_ISP_SetChHwPipeID(uint32_t pipelineID, uint32_t channelID, uint32_t hwPipeID);

[Parameters]

| Parameter Name | Description                       | Input/Output |
| --------------- | --------------------------------- | ------------ |
| pipelineID      | ISP pipeline ID                   | Input        |
| channelID       | ISP pipeline channel ID           | Input        |
| hwPipeID        | Actual hardware pipe ID           | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, spm_isp_comm.h
- Library file: libisp.so

[Note]

- This interface should be called before ASR_ISP_Init; otherwise, the ISP channel will start running with the default channel ID (hardware pipe0).
- Refer to the description in section 2.2.1, the input parameter pipelineID corresponds to the ISP firmware, channelID corresponds to the working mode preview or capture, and hwPipeID corresponds to the ISP hardware pipelineID. For special capture scenarios, a set of firmware can manage two hardware pipelines working in different modes, ensuring that the image effects of the two hardware pipelines are consistent.

##### ASR_ISP_Init

[Description]

Initialize the ISP pipeline with the previously set parameters. After initialization, all parameters of the first frame are ready. In principle, it is not recommended to set initialization parameters after this interface, as they will not take effect in the first frame but will take effect in the second frame.

[Syntax]

int ASR_ISP_Init(uint32_t pipelineID);

[Parameters]

| Parameter Name | Description               | Input/Output |
| --------------- | ------------------------- | ------------ |
| pipelineID      | ISP pipeline ID           | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, spm_isp_comm.h
- Library file: libisp.so

##### ASR_ISP_DeInit

[Description]

Deinitialize the ISP pipeline, clearing all effect parameters set on the pipeline. Registered callbacks will not be cleared.

[Syntax]

int ASR_ISP_DeInit(uint32_t pipelineID);

[Parameters]

| Parameter Name | Description               | Input/Output |
| --------------- | ------------------------- | ------------ |
| pipelineID      | ISP pipeline ID           | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, spm_isp_comm.h
- Library file: libisp.so

##### ASR_ISP_EnablePDAF

[Description]

Enable/disable the PDAF function of the ISP pipeline.

[Syntax]

int ASR_ISP_EnablePDAF(uint32_t pipelineID, uint32_t enable);

[Parameters]

| Parameter Name | Description                       | Input/Output |
| --------------- | --------------------------------- | ------------ |
| pipelineID      | ISP pipeline ID                   | Input        |
| enable          | Flag to enable or disable PDAF    | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, spm_isp_comm.h
- Library file: libisp.so

[Note]

- Must be called after ASR_ISP_Init.

##### ASR_ISP_SetFps

[Description]

Set the frame rate of the ISP pipeline. The ISP supports dynamic frame rates. If you need to run at a specific frame rate, set fminFps and fmaxFps to the same value. This interface can be set before ASR_ISP_Init or during ISP operation. If set before, the first frame will run at the set frame rate.

[Syntax]

int ASR_ISP_SetFps(uint32_t pipelineID, float fminFps, float fmaxFps);

[Parameters]

| Parameter Name | Description               | Input/Output |
| --------------- | ------------------------- | ------------ |
| pipelineID      | ISP pipeline ID           | Input        |
| fminFps         | Minimum frame rate        | Input        |
| fmaxFps         | Maximum frame rate        | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, spm_isp_comm.h
- Library file: libisp.so

##### ASR_ISP_SetFrameinfoCallback

[Description]

Set the callback function to get frameinfo notifications from the ISP pipeline. The ISP sends the frameinfo to the user through this callback when updating each frame's frameinfo.

[Syntax]

int ASR_ISP_SetFrameinfoCallback(uint32_t pipelineID, GetFrameInfoCallBack callback);

[Parameters]

| Parameter Name | Description                           | Input/Output |
| --------------- | ------------------------------------- | ------------ |
| pipelineID      | ISP pipeline ID                       | Input        |
| callback        | Callback function for user to get frameinfo | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, spm_isp_comm.h
- Library file: libisp.so

##### ASR_ISP_QueueFrameinfoBuffer

[Description]

Queue the frameinfo buffer of the ISP pipeline. The ISP internally uses the frameinfo buffer in a queue, first in, first out.

[Syntax]

int ASR_ISP_QueueFrameinfoBuffer(uint32_t pipelineID, IMAGE_BUFFER_S *pFrameInfoBuf);

[Parameters]

| Parameter Name  | Description                | Input/Output |
| ---------------- | -------------------------- | ------------ |
| pipelineID       | ISP pipeline ID            | Input        |
| pFrameInfoBuf    | FrameInfo buffer           | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, cam_module_interface.h
- Library file: libisp.so

[Note]

- The input parameter pFrameInfoBuf pointer will be directly used by the SDK. Therefore, the application layer should ensure that the memory space pointed to by this pointer cannot be released until the registered callback function is called.

##### ASR_ISP_FlushFrameinfoBuffer

[Description]

Clear the frameinfo buffer queue on the ISP pipeline. The cleared buffer is returned through the set callback.

[Syntax]

int ASR_ISP_FlushFrameinfoBuffer(uint32_t pipelineID);

[Parameters]

| Parameter Name | Description                  | Input/Output |
| --------------- | ---------------------------- | ------------ |
| pipelineID      | ISP pipeline ID              | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, spm_isp_comm.h
- Library file: libisp.so

[Note]

- Do not queue the flushed buffer again, as it may cause deadlock issues.

##### ASR_ISP_Streamon

[Description]

Run the ISP pipeline. The sensor's streamon should be after this interface.

[Syntax]

int ASR_ISP_Streamon(uint32_t pipelineID);

[Parameters]

| Parameter Name | Description               | Input/Output |
| --------------- | ------------------------- | ------------ |
| pipelineID      | ISP pipeline ID           | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, spm_isp_comm.h
- Library file: libisp.so

[Note]

- Must be called after ASR_ISP_Init.
- Do not turn on the sensor before this.

##### ASR_ISP_Streamoff

[Description]

Stop the ISP pipeline.

[Syntax]

int ASR_ISP_Streamoff(uint32_t pipelineID);

[Parameters]

| Parameter Name | Description               | Input/Output |
| --------------- | ------------------------- | ------------ |
| pipelineID      | ISP pipeline ID           | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, spm_isp_comm.h
- Library file: libisp.so

[Note]

- Must be called after ASR_ISP_Streamon.

##### ASR_ISP_TriggerRawCapture

[Description]

Trigger the ISP pipeline to perform a special capture process. If a capture is currently in progress, the trigger will fail.

[Syntax]

int ASR_ISP_TriggerRawCapture(uint32_t pipelineID, IMAGE_BUFFER_S *pFrameInfoBuf, uint32_t hdrCapture);

[Parameters]

| Parameter Name  | Description                                                                                                                            | Input/Output |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| pipelineID       | ISP pipeline ID                                                                                                                        | Input        |
| pFrameInfoBuf    | Frameinfo buffer corresponding to the current RAW image. This frameinfo should be the same as the frameinfo of the preview frame during capture; otherwise, the image quality of the capture may differ from the preview. | Input        |
| hdrCapture       | Flag indicating whether it is an HDR capture. The system currently only supports HDR capture in the RAW domain.                        | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, cam_module_interface.h
- Library file: libisp.so

[Note]

- This interface can only be called during ISP operation.

##### ASR_ISP_ReInitPreviewChannel

[Description]

Reinitialize the preview channel of the ISP pipeline. In some scenarios, the preview of a pipeline will be stopped to reuse the hardware pipe. When restoring the preview, this interface needs to be called to ensure consistent image effects before and after the stream interruption.

[Syntax]

int ASR_ISP_ReInitPreviewChannel(uint32_t pipelineID, IMAGE_BUFFER_S *pFrameInfoBuf);

[Parameters]

| Parameter Name  | Description                              | Input/Output |
| ---------------- | ---------------------------------------- | ------------ |
| pipelineID       | ISP pipeline ID                          | Input        |
| pFrameInfoBuf    | Frameinfo buffer for restoring the scene | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, cam_module_interface.h
- Library file: libisp.so

##### ASR_ISP_NotifyOnceHDRRawCapture

[Description]

Notify the ISP pipeline to perform a single HDR Raw capture process. The ISP returns the first valid Raw frame ID of the HDR. Currently, the order of HDR Raw images is normal exposure, long exposure, and short exposure.

[Syntax]

int ASR_ISP_NotifyOnceHDRRawCapture(uint32_t pipelineID, uint32_t ZSLCapture, int32_t *startFrameID);

[Parameters]

| Parameter Name  | Description                               | Input/Output |
| ---------------- | ----------------------------------------- | ------------ |
| pipelineID       | ISP pipeline ID                           | Input        |
| ZSLCapture       | Flag indicating whether it is a ZSL HDR capture | Input        |
| startFrameID     | Pointer to store the first valid HDR Raw frame ID | Output       |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h
- Library file: libisp.so

[Note]

- This interface can only be called during ISP operation.

##### ASR_ISP_UpdateNoneZslStreamAeParams

[Description]

Update the AE parameters related to the sensor on the ISP pipeline. This interface is only useful when the pipeline is re-streamed after being stopped, to maintain the sensor's state consistency before and after the stream interruption.

[Syntax]

int ASR_ISP_UpdateNoneZslStreamAeParams(uint32_t pipelineID, IMAGE_BUFFER_S *pFrameInfoBuf, int backPreview, int updateSnsReg);

[Parameters]

| Parameter Name  | Description                                                                                          | Input/Output |
| ---------------- | ---------------------------------------------------------------------------------------------------- | ------------ |
| pipelineID       | ISP pipeline ID                                                                                      | Input        |
| pFrameInfoBuf    | Frameinfo corresponding to the state to be updated                                                   | Input        |
| backPreview      | Flag indicating whether to switch to preview                                                         | Input        |
| updateSnsReg     | Flag indicating whether to update the sensor's AE register. If the sensor is reconfigured, this flag needs to be enabled; otherwise, it may not be needed. | Input        |

[Return Value]

| Return Value | Description                 |
| ------------- | --------------------------- |
| 0             | Success                     |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h, cam_module_interface.h
- Library file: libisp.so

#### Image Effect Setting API

This section describes the APIs used to help users set some image effect-related settings. In this software, image effect settings are used in the form of commands, and these commands are provided to the outside through a unified interface API:

- ASR_ISP_SetEffectParams: Set the effect parameters of the ISP pipeline interface.

The effect commands supported by the ISP are as follows:

- ISP_EFFECT_CMD_S_AE_MODE
- ISP_EFFECT_CMD_S_AWB_MODE
- ISP_EFFECT_CMD_S_AF_MODE
- ISP_EFFECT_CMD_S_TRIGGER_AF
- ISP_EFFECT_CMD_S_ANTIFLICKER_MODE
- ISP_EFFECT_CMD_S_LSC_MODE
- ISP_EFFECT_CMD_S_CCM_MODE
- ISP_EFFECT_CMD_S_AECOMPENSATION
- ISP_EFFECT_CMD_S_METERING_MODE
- ISP_EFFECT_CMD_S_ZOOM_RATIO_IN_Q8
- ISP_EFFECT_CMD_S_SENSITIVITY_MODE
- ISP_EFFECT_CMD_S_SENSOR_EXPOSURE_MODE
- ISP_EFFECT_CMD_S_TRIGGER_AE_QUICK_RESPONSE
- ISP_EFFECT_CMD_S_AECOMPENSATION_STEP
- ISP_EFFECT_CMD_S_AE_SCENE_MODE
- ISP_EFFECT_CMD_S_FILTER_MODE
- ISP_EFFECT_CMD_S_YUV_RANGE
- ISP_EFFECT_CMD_S_SOLID_COLOR_MODE
- ISP_EFFECT_CMD_G_AF_MODE
- ISP_EFFECT_CMD_G_ANTIFLICKER_MODE
- ISP_EFFECT_CMD_G_METERING_MODE
- ISP_EFFECT_CMD_G_AF_MOTOR_RANGE
- ISP_EFFECT_CMD_G_AE_MODE
- ISP_EFFECT_CMD_G_AWB_MODE

##### ASR_ISP_SetEffectParams

[Description]

Set the image effect parameters of the ISP.

[Syntax]

int ASR_ISP_SetEffectParams(uint32_t pipelineID, uint32_t effectCmd, void *pData, int dataSize);

[Parameters]

| Parameter Name | Description                       | Input/Output |
| --------------- | --------------------------------- | ------------ |
| pipelineID      | ISP pipeline ID                   | Input        |
| effectCmd       | Effect parameter command          | Input        |
| pData           | Pointer to the structure of this effect parameter | Input        |
| dataSize        | Size of this effect parameter structure | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h
- Library file: libisp.so

##### Effect Command Introduction

1. **ISP_EFFECT_CMD_S_AE_MODE**

Set the image exposure mode command. The corresponding parameter type is the structure asrISP_AE_INFO_S.

1. **ISP_EFFECT_CMD_S_AWB_MODE**

Set the image white balance mode command. The corresponding parameter type is the structure asrISP_AWB_INFO_S.

1. **ISP_EFFECT_CMD_S_AF_MODE**

Set the image focus mode command. The corresponding parameter type is the structure asrISP_AF_INFO_S.

1. **ISP_EFFECT_CMD_S_TRIGGER_AF**

Trigger the image focus command. The corresponding parameter type is int32_t, where 1 means trigger and 0 means cancel.

1. **ISP_EFFECT_CMD_S_ANTIFLICKER_MODE**

Set the image flicker mode command. The corresponding parameter type is int32_t, and the value is defined by the enumeration asrISP_ANTIFLICKER_MODE_E.

1. **ISP_EFFECT_CMD_S_LSC_MODE**

Set the image lens shading mode command. The corresponding parameter type is the structure asrISP_LSC_INFO_S.

1. **ISP_EFFECT_CMD_S_CCM_MODE**

Set the image CCM mode command. The corresponding parameter type is the structure asrISP_CCM_INFO_S.

1. **ISP_EFFECT_CMD_S_AECOMPENSATION**

Set the image exposure compensation mode command. The corresponding parameter type is int32_t, and the value currently supports [-6, 6].

1. **ISP_EFFECT_CMD_S_METERING_MODE**

Set the image metering mode command. The corresponding parameter type is the structure asrISP_METERING_INFO_S.

1. **ISP_EFFECT_CMD_S_ZOOM_RATIO_IN_Q8**

Set the image zoom ratio command. The corresponding parameter type is int32_t, and the unit is Q8.

1. **ISP_EFFECT_CMD_S_SENSITIVITY_MODE**

Set the image ISO mode command. The corresponding parameter type is the structure asrISP_SENSITIVITY_INFO_S, supporting auto and manual modes.

1. **ISP_EFFECT_CMD_S_SENSOR_EXPOSURE_MODE**

Set the image sensor exposure mode command. The difference between this command and ISP_EFFECT_CMD_S_AE_MODE is that this command can only set exposure information, while the latter can set both exposure and gain information. The corresponding parameter type is the structure asrISP_SENSOR_EXPOSURE_INFO_S, supporting auto and manual modes.

The relationship between these two commands and ISP_EFFECT_CMD_S_SENSITIVITY_MODE is shown in the table below.

| AE MODE                | SENSITIVITY AUTO | SENSITIVITY MANUAL |
| ------------------------------- | ------------------------- | --------------------------- |
| SENSOR EXPOSURE AUTO   | Auto             | Auto               |
| SENSOR EXPOSURE MANUAL | Auto             | Manual             |

As shown in the table, SENSITIVITY_MODE_MANUAL is to fix the gain in Auto Exposure mode, and the exposure is automatically calculated by the algorithm according to the scene; while SENSOR_EXPOSURE_MODE_MANUAL is to fix the exposure time in Auto Exposure mode, and the gain is automatically calculated by the algorithm according to the scene.

1. **ISP_EFFECT_CMD_S_TRIGGER_AE_QUICK_RESPONSE**

Trigger the algorithm AE quick convergence command. The corresponding parameter type is int32_t, where 1 means trigger and 0 means cancel. This command will only trigger once, and the algorithm will clear this state after AE quick convergence, generally used in touch scenarios.

1. **ISP_EFFECT_CMD_S_AECOMPENSATION_STEP**

Set the value of the ISP exposure compensation step. The corresponding parameter type is float. After setting, the exposure compensation is adjusted according to this step each time, and the default value is 1/3.

1. **ISP_EFFECT_CMD_S_AE_SCENE_MODE**

Set the ISP AE scene mode. The corresponding parameter type is int32_t, and the value is defined by the enumeration asrISP_AE_SCENE_MODE_E. The ISP supports normal and face modes. In face mode, the AE convergence speed is faster than in normal mode.

1. **ISP_EFFECT_CMD_S_FILTER_MODE**

Set the ISP color filter mode. The corresponding parameter type is int32_t, and the value is defined by the enumeration asrISP_COLOR_FILTER_MODE_E. Currently, it supports normal and black and white modes, and the default is normal mode.

1. **ISP_EFFECT_CMD_S_YUV_RANGE**

Set the YUV range of the ISP. The corresponding parameter type is int32_t, and the value is defined by the enumeration asrISP_YUV_RANGE_E. Currently, it supports full (y:0~255, uv:0~255) and compress (y:16~235, uv:16~240) modes.

1. **ISP_EFFECT_CMD_S_SOLID_COLOR_MODE**

Set the ISP solid color mode. The corresponding parameter type is int32_t, and the value is defined by the enumeration asrISP_SOLID_COLOR_MODE_E. Currently, only the pure black mode is supported, and this mode is turned off by default.

1. **ISP_EFFECT_CMD_G_AF_MODE**

Get the current AF mode command of the ISP. The corresponding parameter type is the structure asrISP_AF_INFO_S.

1. **ISP_EFFECT_CMD_G_ANTIFLICKER_MODE**

Get the current antiflicker mode command of the ISP. The corresponding parameter type is int32_t, and the value is defined by the enumeration asrISP_ANTIFLICKER_MODE_E.

1. **ISP_EFFECT_CMD_G_METERING_MODE**

Get the current metering mode command of the ISP. The corresponding parameter type is the structure asrISP_METERING_INFO_S.

1. **ISP_EFFECT_CMD_G_AF_MOTOR_RANGE**

Get the range of the focus motor movement (minimum and maximum values). The corresponding parameter type is the structure asrISP_RANGE_S.

1. **ISP_EFFECT_CMD_G_AE_MODE**

Get the current AE mode of the ISP. The corresponding parameter type is the structure ISP_AE_INFO_S.

1. **ISP_EFFECT_CMD_G_AWB_MODE**

Get the current AWB mode of the ISP. The corresponding parameter type is the structure ISP_AWB_INFO_S.

#### Tuning-related API

This section describes the APIs used to help tuning engineers adjust more specific and detailed parameters. The tuning tools released by ASR also use the APIs related to this section.

The tuning-related APIs are as follows:

- ASR_ISP_SetFwPara: Set the parameters of the ISP pipeline firmware.
- ASR_ISP_GetFWPara: Get the parameters of the ISP pipeline firmware.
- ASR_ISP_SetRegister: Set the value of the specified register.
- ASR_ISP_GetRegister: Get the value of the specified register.
- ASR_ISP_LoadSettingFile: Load the setting file of the ISP pipeline firmware.
- ASR_ISP_SaveSettingFile: Save the setting file of the ISP pipeline firmware.

##### ASR_ISP_SetFwPara

[Description]

Set the ISP firmware parameters.

[Syntax]

int ASR_ISP_SetFwPara(uint32_t pipelineID, const char *parameter, const char *name, uint32_t row, uint32_t column, int value);

[Parameters]

| Parameter Name | Description               | Input/Output |
| --------------- | ------------------------- | ------------ |
| pipelineID      | ISP pipeline ID           | Input        |
| parameter       | ISP submodule name        | Input        |
| name            | Parameter name            | Input        |
| row             | Row number                | Input        |
| column          | Column number             | Input        |
| value           | Value                     | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h
- Library file: libisp.so

[Note] None

##### ASR_ISP_GetFWPara

[Description]

Get the ISP firmware parameters.

[Syntax]

int ASR_ISP_GetFWPara(uint32_t pipelineID, const char *parameter, const char *name, uint32_t row, uint32_t column, int *pValue);

[Parameters]

| Parameter Name | Description               | Input/Output |
| --------------- | ------------------------- | ------------ |
| pipelineID      | ISP pipeline ID           | Input        |
| parameter       | ISP submodule name        | Input        |
| name            | Parameter name            | Input        |
| row             | Row number                | Input        |
| column          | Column number             | Input        |
| value           | Value                     | Output       |

[Return Value]

| Parameter Name | Description                      |
| --------------- | -------------------------------- |
| -1              | Input check error                |
| 0               | Cannot find the specified parameter |
| >0              | Success, returns the number of obtained values |

[Requirements]

- Header file: spm_cam_isp.h
- Library file: libisp.so

[Note] None

##### ASR_ISP_SetRegister

[Description]

Set the value of the specified register.

[Syntax]

int ASR_ISP_SetRegister(uint32_t addr, uint32_t value, uint32_t mask);

[Parameters]

| Parameter Name | Description        | Input/Output |
| --------------- | ------------------ | ------------ |
| addr            | Register address   | Input        |
| value           | Register value     | Input        |
| mask            | Register mask      | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h
- Library file: libisp.so

[Note] None

##### ASR_ISP_GetRegister

[Description]

Get the value of the specified register.

[Syntax]

int ASR_ISP_GetRegister(uint32_t addr, int *pValue);

[Parameters]

| Parameter Name | Description       | Input/Output |
| --------------- | ----------------- | ------------ |
| addr            | Register address  | Input        |
| pValue          | Register value    | Output       |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h
- Library file: libisp.so

[Note] None

##### ASR_ISP_LoadSettingFile

[Description]

Load the ISP firmware setting file.

[Syntax]

int ASR_ISP_LoadSettingFile(uint32_t pipelineID, const char *pFileName);

[Parameters]

| Parameter Name | Description                     | Input/Output |
| --------------- | ------------------------------- | ------------ |
| pipelineID      | ISP pipeline ID                 | Input        |
| pFileName       | Parameter file name, including the absolute path | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h
- Library file: libisp.so

[Note] None

##### ASR_ISP_SaveSettingFile

[Description]

Save the ISP firmware setting file.

[Syntax]

int ASR_ISP_SaveSettingFile(uint32_t pipelineID, const char *pFileName);

[Parameters]

| Parameter Name | Description                     | Input/Output |
| --------------- | ------------------------------- | ------------ |
| pipelineID      | ISP pipeline ID                 | Input        |
| pFileName       | Parameter file name, including the absolute path | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: spm_cam_isp.h
- Library file: libisp.so

[Note] None

#### Main API Usage Process

This section mainly describes the usage process of the system control API, which is divided into the following stages: construction, registration, setting, initialization, streamon, streamoff, deinitialization, and destruction.

The first step is to construct the context environment of the ISP pipeline;

The second step is registration, registering the sensor callback function, focus motor callback function, and frameinfo callback function to the ISP pipeline;

The third step is setting, setting the public attributes of the ISP pipeline, tuning-related attributes, the actual working hardware pipe ID of the channel, frame rate, whether to enable offline mode, and frameinfo buffer queue;

The fourth step is initialization, initializing the ISP pipeline based on the information set in the previous steps;

The fifth step is to streamon the ISP pipeline and enter the working state.

If you want to stop and exit the ISP, proceed to the sixth step, streamoff the ISP pipeline, and exit the working state;

The seventh step is deinitialization, clearing the set parameters and other information except for the previously registered callbacks;

The eighth step is to destruct the context environment of the ISP pipeline.

The specific process is shown in Figure 3-1. The above process is for the pipeline. The ISP software can support two pipelines working together at the same time. If you need to start another pipeline, the process is similar, but you need to pay attention to the actual working hardware pipe ID, as it may be reused.

#### Data Types

#### Error Codes

| Error Code | Macro Definition            | Description       |
| ---------- | --------------------------- | ----------------- |
| -22        | ASR_ERR_ISP_ILLEGAL_PARAM   | Illegal parameter |
| -17        | ASR_ERR_ISP_EXIST           | Resource already exists |
| -19        | ASR_ERR_ISP_NOTEXIST        | Resource does not exist |
| -22        | ASR_ERR_ISP_NULL_PTR        | Null pointer      |
| -1         | ASR_ERR_ISP_NOT_SUPPORT     | Operation not supported |
| -1         | ASR_ERR_ISP_NOT_PERM        | Operation not allowed |
| -12        | ASR_ERR_ISP_NOMEM           | Insufficient memory |
| -14        | ASR_ERR_ISP_BADADDR         | Invalid address   |
| -16        | ASR_ERR_ISP_BUSY            | System is busy    |

### VI API

This section introduces the usage of ASR MARS11-ISP VI module APIs. The described APIs are VI SDK APIs for applications and explain the relevant parameter data structures and return values in detail.

#### API

The VI module provides the following APIs:

- ASR_VI_SetDevAttr: Set the attributes of the VI device.
- ASR_VI_GetDevAttr: Get the attributes of the VI device.
- ASR_VI_EnableDev: Enable the VI device.
- ASR_VI_DisableDev: Disable the VI device.
- ASR_VI_SetChnAttr: Set the attributes of the VI channel.
- ASR_VI_GetChnAttr: Get the attributes of the VI channel.
- ASR_VI_SetCallback: Set the upper layer's callback function to the VI device.
- ASR_VI_EnableChn: Enable the VI channel.
- ASR_VI_DisableChn: Disable the VI channel.
- ASR_VI_Init: Initialize the VI module resources.
- ASR_VI_Deinit: Release the VI module resources.
- ASR_VI_SetBayerReadAttr: Set the attributes for offline reading of Bayer raw.
- ASR_VI_GetBayerReadAttr: Get the attributes for offline reading of Bayer raw.
- ASR_VI_EnableBayerRead: Enable offline Bayer raw reading.
- ASR_VI_DisableBayerRead: Disable offline Bayer raw reading.
- ASR_VI_EnableBayerDump: Enable Bayer Dump.
- ASR_VI_DisableBayerDump: Disable Bayer Dump.
- ASR_VI_ChnQueueBuffer: Queue the buffer to the channel.

##### ASR_VI_SetDevAttr

[Description]

Set the attributes of the VI device. The basic device attributes default to some chip configurations, meeting the requirements of most sensor connections.

[Syntax]

int32_t ASR_VI_SetDevAttr(uint32_t nDev, VI_DEV_ATTR_S *pstDevAttr);

[Parameters]

| Parameter Name | Description                                           | Input/Output |
| --------------- | ----------------------------------------------------- | ------------ |
| nDev            | VI device number. Range: [0, VIU_MAX_DEV_NUM).        | Input        |
| pstDevAttr      | Pointer to the VI device attributes. Static attributes. | Input        |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

[Note]

- Changing the binding relationship between the device and the channel is not supported.
- Before calling, ensure that the VI device is in a disabled state. If the VI device is already enabled, you can use ASR_CAM_VI_DisableDev to disable the device.

##### ASR_VI_GetDevAttr

[Description]

Get the attributes of the VI device.

[Syntax]

int32_t ASR_VI_GetDevAttr(uint32_t nDev, VI_DEV_ATTR_S *pstDevAttr);

[Parameters]

| Parameter Name | Description                                          | Input/Output |
| --------------- | ---------------------------------------------------- | ------------ |
| nDev            | VI device number. Range: [0, VIU_MAX_DEV_NUM).       | Input        |
| pstDevAttr      | Pointer to the VI device attributes.                 | Output       |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

##### ASR_VI_EnableDev

[Description]

Enable the VI device.

[Syntax]

int32_t ASR_VI_EnableDev(uint32_t nDev);

[Parameters]

| Parameter Name | Description                                          | Input/Output |
| --------------- | ---------------------------------------------------- | ------------ |
| nDev            | VI device number. Range: [0, VIU_MAX_DEV_NUM).       | Input        |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

[Note]

- The device attributes must be set before enabling; otherwise, it will return failure.
- Repeated enabling is supported and will not return failure.

##### ASR_VI_DisableDev

[Description]

Disable the VI device.

[Syntax]

int32_t ASR_VI_DisableDev(uint32_t nDev);

[Parameters]

| Parameter Name | Description                                          | Input/Output |
| --------------- | ---------------------------------------------------- | ------------ |
| nDev            | VI device number. Range: [0, VIU_MAX_DEV_NUM).       | Input        |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

[Note]

- All VI channels bound to the VI device must be disabled before disabling the VI device.
- Repeated disabling is supported and will not return failure.

##### ASR_VI_FlushDev

[Description]

Flush the buffers queued in the VI device.

[Syntax]

int32_t ASR_VI_FlushDev(uint32_t nDev);

[Parameters]

| Parameter Name | Description                                          | Input/Output |
| --------------- | ---------------------------------------------------- | ------------ |
| nDev            | VI device number. Range: [0, VIU_MAX_DEV_NUM).       | Input        |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

##### ASR_VI_SetChnAttr

[Description]

Set the attributes of the VI channel.

[Syntax]

int32_t ASR_VI_SetChnAttr(uint32_t nChn, VI_CHN_ATTR_S *pstAttr);

[Parameters]

| Parameter Name | Description                                          | Input/Output |
| --------------- | ---------------------------------------------------- | ------------ |
| nChn            | VI channel number. Range: [0, VIU_MAX_CHN_NUM).      | Input        |
| pstAttr         | Pointer to the VI channel attributes. Static attributes. | Input        |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

[Note]

- The device attributes must be set before setting the channel attributes; otherwise, it will return failure.
- The channel must be in a disabled state to set the channel attributes.

##### ASR_VI_GetChnAttr

[Description]

Get the attributes of the VI channel.

[Syntax]

int32_t ASR_VI_GetChnAttr(uint32_t nChn, VI_CHN_ATTR_S *pstAttr);

[Parameters]

| Parameter Name | Description                                          | Input/Output |
| --------------- | ---------------------------------------------------- | ------------ |
| nChn            | VI channel number. Range: [0, VIU_MAX_CHN_NUM).      | Input        |
| pstAttr         | Pointer to the VI channel attributes. Static attributes. | Output       |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

[Note]

- The channel attributes must be set before getting the attributes; otherwise, it will return failure.

##### ASR_VI_EnableChn

[Description]

Enable the VI channel.

[Syntax]

int32_t ASR_VI_EnableChn(uint32_t nChn);

[Parameters]

| Parameter Name | Description                                          | Input/Output |
| --------------- | ---------------------------------------------------- | ------------ |
| nChn            | VI channel number. Range: [0, VIU_MAX_CHN_NUM).      | Input        |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

[Note]

- The channel attributes must be set, and the VI device bound to the channel must be enabled.
- Repeated enabling of the VI channel is supported and will not return failure.

##### ASR_VI_DisableChn

[Description]

Disable the VI channel.

[Syntax]

int32_t ASR_VI_DisableChn(uint32_t nChn);

[Parameters]

| Parameter Name | Description                                          | Input/Output |
| --------------- | ---------------------------------------------------- | ------------ |
| nChn            | VI channel number. Range: [0, VIU_MAX_CHN_NUM).      | Input        |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

[Note]

- Repeated disabling of the VI channel is supported and will not return failure.

##### ASR_VI_SetCallback

[Description]

Set the frame buffer rotation callback.

[Syntax]

int32_t ASR_VI_SetCallback(uint32_t nChn, int32_t (*callback)(uint32_t nChn, VI_IMAGE_BUFFER_S *vi_buffer));

[Parameters]

| Parameter Name | Description                                          | Input/Output |
| --------------- | ---------------------------------------------------- | ------------ |
| nChn            | VI channel number. Range: [0, VIU_MAX_CHN_NUM).      | Input        |
| callback        | Pointer to the callback function                     | Input        |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

[Note]

- Call before ASR_VI_EnableChn.

##### ASR_VI_SetBayerReadAttr

[Description]

Set the attributes for offline processing of raw reading.

[Syntax]

int32_t ASR_VI_SetBayerReadAttr(uint32_t nDev, const VI_BAYER_READ_ATTR_S *pstBayerReadAttr);

[Parameters]

| Parameter Name         | Description                                          | Input/Output |
| ----------------------- | ---------------------------------------------------- | ------------ |
| nDev                    | VI device number. Range: [0, VIU_MAX_DEV_NUM).       | Input        |
| pstBayerReadAttr        | Pointer to the Bayer read attributes structure.      | Input        |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

##### ASR_VI_GetBayerReadAttr

[Description]

Get the attributes for offline processing of raw reading.

[Syntax]

int32_t ASR_VI_GetBayerReadAttr(uint32_t nDev, const VI_BAYER_READ_ATTR_S *pstBayerReadAttr);

[Parameters]

| Parameter Name         | Description                                          | Input/Output |
| ----------------------- | ---------------------------------------------------- | ------------ |
| nDev                    | VI device number. Range: [0, VIU_MAX_DEV_NUM).       | Input        |
| pstBayerReadAttr        | Pointer to the Bayer read attributes structure.      | Output       |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

##### ASR_VI_EnableBayerRead

[Description]

Enable offline processing.

[Syntax]

int32_t ASR_VI_EnableBayerRead(uint32_t nDev);

[Parameters]

| Parameter Name | Description                                          | Input/Output |
| --------------- | ---------------------------------------------------- | ------------ |
| nDev            | VI device number. Range: [0, VIU_MAX_DEV_NUM).       | Input        |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

##### ASR_VI_DisableBayerRead

[Description]

Disable offline processing.

[Syntax]

int32_t ASR_VI_DisableBayerRead(uint32_t nDev);

[Parameters]

| Parameter Name | Description                                          | Input/Output |
| --------------- | ---------------------------------------------------- | ------------ |
| nDev            | VI device number. Range: [0, VIU_MAX_DEV_NUM).       | Input        |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

##### ASR_VI_EnableBayerDump

[Description]

Enable RAW DATA acquisition.

[Syntax]

int32_t ASR_VI_EnableBayerDump(uint32_t nDev);

[Parameters]

| Parameter Name | Description                                          | Input/Output |
| --------------- | ---------------------------------------------------- | ------------ |
| nDev            | VI device number. Range: [0, VIU_MAX_DEV_NUM).       | Input        |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

[Note]

- The width and height of the saved RAW data are consistent with the settings of the DEV.
- The starting channel number of the RAW Dump channel can be obtained through VIU_GET_RAW_CHN.

##### ASR_VI_DisableBayerDump

[Description]

Disable RAW DATA acquisition.

[Syntax]

int32_t ASR_VI_DisableBayerDump(uint32_t nDev);

[Parameters]

| Parameter Name | Description                                          | Input/Output |
| --------------- | ---------------------------------------------------- | ------------ |
| nDev            | VI device number. Range: [0, VIU_MAX_DEV_NUM).       | Input        |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

##### ASR_VI_ChnQueueBuffer

[Description]

Queue the buffer to the channel.

[Syntax]

int32_t ASR_VI_ChnQueueBuffer(uint32_t nChn, IMAGE_BUFFER_S *camBuf);

[Parameters]

| Parameter Name | Description                                     | Input/Output |
| --------------- | ----------------------------------------------- | ------------ |
| nChn            | VI channel number. Range: [0, VI_CHN_CNT).      | Input        |
| camBuf          | Pointer to the buffer                          | Input        |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

[Note]

- The input parameter camBuf pointer will be directly used by the SDK. Therefore, the application layer should ensure that the memory space pointed to by this pointer cannot be released until the registered callback function is called.

##### ASR_VI_Init

[Description]

Initialize the VI module.

[Syntax]

int32_t ASR_VI_Init(void);

[Parameters]

| Parameter Name | Description | Input/Output |
| --------------- | ----------- | ------------ |
| None            |             |              |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

##### ASR_VI_Deinit

[Description]

Deinitialize the VI module.

[Syntax]

int32_t ASR_VI_Deinit(void);

[Parameters]

| Parameter Name | Description | Input/Output |
| --------------- | ----------- | ------------ |
| None            |             |              |

[Return Value]

| Return Value | Description                |
| ------------- | -------------------------- |
| 0             | Success                    |
| Non-zero      | Failure, value is error code |

[Requirements]

- Header file: spm_comm_vi.h, spm_cam_vi.h
- Library file: libvi.so

#### Data Types

##### VI_DEV_ATTR_S

[Description]

Define the attributes of the video input device.

[Definition]

```java
typedef struct asrVI_DEV_ATTR_S { 
    CAM_VI_WORK_MODE_E enWorkMode; 
    CAM_SENSOR_RAWTYPE_E enRawType; 
    uint32_t width;
    uint32_t height; 
    uint32_t bindSensorIdx;
    uint32_t mipi_lane_num; 
    bool bCapture2Preview;
} VI_DEV_ATTR_S;
```

[Members]

| Member Name         | Description                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| enWorkMode          | CAM_VI_WORK_MODE_ONLINE, CAM_VI_WORK_MODE_RAWDUMP, CAM_VI_WORK_MODE_OFFLINE,                                                              |
| enRawType           | CAM_SENSOR_RAWTYPE_RAW8, CAM_SENSOR_RAWTYPE_RAW10, CAM_SENSOR_RAWTYPE_RAW12, CAM_SENSOR_RAWTYPE_RAW14, CAM_SENSOR_RAWTYPE_INVALID,         |
| width               | The width of the image to be captured by the VI device. The minimum and maximum width of the captured image: [VIU_DEV_MIN_WIDTH, VIU_DEV_MAX_WIDTH] |
| height              | The height of the image to be captured by the VI device. The minimum and maximum height of the captured image: [VIU_DEV_MIN_HEIGHT, VIU_DEV_MAX_HEIGHT] |
| bindSensorIdx       | The sensor ID bound to the VI device. [0, 2]                                                                                              |
| bOfflineSlice       | Whether offline is in capture mode                                                                                                        |
| mipi_lane_num       | The number of lanes of the sensor mipi interface                                                                                          |
| bCapture2Preview    | Whether it is capture to preview                                                                                                          |

##### VI_CHN_ATTR_S

[Description]

Define the attributes of the VI channel.

[Definition]

```java
typedef struct asrVI_CHN_ATTR_S { 
    CAM_VI_PIXEL_FORMAT_E enPixFormat; 
    uint32_t width;
    uint32_t height;
} VI_CHN_ATTR_S;
```

[Members]

| Member Name    | Description             |
| --------------- | ----------------------- |
| enPixFormat     | Channel output format   |
| width           | Output image width      |
| height          | Output image height     |

##### VI_BAYER_READ_ATTR_S

[Description]

Define the attributes for offline raw reading.

[Definition]

```java
typedef struct asrVI_BAYER_READ_ATTR_S {
    bool bGenTiming;
    int32_t s32FrmRate;
} VI_BAYER_READ_ATTR_S;
```

[Members]

| Member Name   | Description                                  |
| --------------- | -------------------------------------------- |
| bGenTiming      | Whether the VI automatically generates a fixed frame rate read timing |
| s32FrmRate      | If bGenTiming is true, it indicates the frame rate size |

##### VI_IMAGE_BUFFER_S

[Description]

Define the buffer structure in the callback function of the VI channel buffer.

[Definition]

```java
typedef struct asrVI_IMAGE_BUFFER_S { 
    IMAGE_BUFFER_S *buffer;
    bool bValid;
    bool bCloseDown;
    uint64_t timestamp; 
    uint32_t frameId;
} VI_IMAGE_BUFFER_S;
```

[Members]

| Member Name    | Description                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| buffer          | Pointer to the buffer memory structure                                                                     |
| bValid          | Indicates whether the current frame content is valid. If invalid, the upper application should discard the current frame |
| bCloseDown      | RAW DATA channel specific. Before performing the disable operation on the RAW DATA channel, the bCloseDown signal in the buffer callback needs to be received |
| timestamp       | Indicates the timestamp of the current frame                                                               |
| frameId         | Indicates the frame number of the current frame, starting from 0                                           |

##### VIU_GET_RAW_CHN

[Description]

Define the channel number for obtaining RAW DATA.

[Definition]

```java
#define VIU_GET_RAW_CHN(ViDev, RawChn) do{
        RawChn = VIU_MAX_CHN_NUM + ViDev;
    }while(0)
```

##### VIU_MAX_CHN_NUM

[Description]

Define the maximum number of VI channels.

[Definition]

```java
#define VIU_MAX_CHN_NUM (VIU_MAX_PHYCHN_NUM)
```

##### VIU_MAX_PHYCHN_NUM

[Description]

Define the maximum number of VI physical channels.

[Definition]

```java
#define VIU_MAX_PHYCHN_NUM 2
```

##### VIU_MAX_RAWCHN_NUM

[Description]

Define the maximum number of RAW DATA channels.

[Definition]

```java
#define VIU_MAX_RAWCHN_NUM 2
```

##### VIU_MAX_DEV_NUM

[Description]

Define the maximum number of video input devices.

[Definition]

```java
#define VIU_MAX_DEV_NUM 2
```

##### VIU_DEV_MIN_WIDTH

[Description]

The minimum width of the image captured by the VI device.

[Definition]

```java
#define VIU_DEV_MIN_WIDTH 256
```

##### VIU_DEV_MIN_HEIGHT

[Description]

The minimum height of the image captured by the VI device.

[Definition]

```java
#define VIU_DEV_MIN_HEIGHT 144
```

##### VIU_DEV_MAX_WIDTH

[Description]

The maximum width of the image captured by the VI device.

[Definition]

```java
#define VIU_DEV_MAX_WIDTH 2688
```

##### VIU_DEV_MAX_HEIGHT

[Description]

The maximum height of the image captured by the VI device.

[Definition]

```java
#define VIU_DEV_MAX_HEIGHT 1944
```

##### VIU_CHN_MIN_WIDTH

[Description]

The minimum width supported by the VI physical channel.

[Definition]

```java
#define VIU_CHN_MIN_WIDTH VIU_DEV_MIN_WIDTH
```

##### VIU_CHN_MIN_HEIGHT

[Description]

The minimum height supported by the VI physical channel.

[Definition]

```java
#define VIU_CHN_MIN_HEIGHT VIU_DEV_MIN_HEIGHT
```

##### VIU_CHN_MAX_WIDTH

[Description]

The maximum width supported by the VI physical channel.

[Definition]

```java
#define VIU_CHN_MAX_WIDTH VIU_DEV_MAX_WIDTH
```

##### VIU_CHN_MAX_HEIGHT

[Description]

The maximum height supported by the VI physical channel.

[Definition]

```java
#define VIU_CHN_MAX_HEIGHT VIU_DEV_MAX_HEIGHT
```

### CPP API

This section introduces the usage of ASR MARS11-ISP CPP module APIs. The described APIs are CPP SDK APIs for applications and explain the relevant parameter data structures, error codes, and return values in detail.

#### API

The CPP module provides the following APIs:

- cam_cpp_create_grp: Create a cam cpp module group.
- cam_cpp_destroy_grp: Destroy a cam cpp module group.
- cam_cpp_start_grp: Enable the cam cpp module.
- cam_cpp_stop_grp: Disable the cam cpp module.
- cam_cpp_post_buffer: Send data to the CPP.
- cam_cpp_set_callback: Set the callback function.
- cam_cpp_get_grp_attr: Get the CPP Group attributes.
- cam_cpp_set_grp_attr: Set the CPP Group attributes.
- cam_cpp_get_tuning_param: Get the tuning parameters of the CPP Group.
- cam_cpp_set_tuning_param: Set the tuning parameters of the CPP Group.
- cam_cpp_load_settingfile: Tuning debugging interface, load the firmware setting file.
- cam_cpp_save_settingfile: Tuning debugging interface, save the firmware setting file.
- cam_cpp_read_fw: Tuning debugging interface, get the parameters of the CPP Group Firmware module.
- cam_cpp_write_fw: Tuning debugging interface, set the parameters of the CPP Group Firmware module.
- cam_cpp_read_reg: Tuning debugging interface, get the register value of the CPP Hardware.
- cam_cpp_write_reg: Tuning debugging interface, set the register value of the CPP Hardware.
- cam_cpp_dump_frame: Save the output and corresponding input images of the group to the specified directory.

##### cam_cpp_create_grp

[Description]

Create a cam cpp module group.

[Syntax]

int32_t cam_cpp_create_grp(uint32_t grpId);

[Parameters]

| Parameter Name | Description                                            | Input/Output |
| --------------- | ------------------------------------------------------ | ------------ |
| grpId           | CPP group ID. Range: [0, CPP_GRP_MAX_NUM).             | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: cam_cpp.h
- Library file: libcpp.so

[Note]

- Repeated creation is not supported.

[Related Operations]

cam_cpp_destroy_grp

##### cam_cpp_destroy_grp

[Description]

Destroy a cam cpp module group.

[Syntax]

int32_t cam_cpp_destroy_grp(uint32_t grpId);

[Parameters]

| Parameter Name | Description                                            | Input/Output |
| --------------- | ------------------------------------------------------ | ------------ |
| grpId           | CPP group ID. Range: [0, CPP_GRP_MAX_NUM).             | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: cam_cpp.h
- Library file: libcpp.so

[Note]

- The CPP group must be created.
- Before calling this interface, cam_cpp_stop_grp must be called to disable the group.
- When calling this interface, it will wait until the current task of the group is completed before it is truly destroyed.

[Related Operations]

cam_cpp_create_grp

##### cam_cpp_start_grp

[Description]

Enable the cam cpp module.

[Syntax]

int32_t cam_cpp_start_grp(uint32_t grpId);

[Parameters]

| Parameter Name | Description                                            | Input/Output |
| --------------- | ------------------------------------------------------ | ------------ |
| grpId           | CPP group ID. Range: [0, CPP_GRP_MAX_NUM).             | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: cam_cpp.h
- Library file: libcpp.so

[Note]

- Repeated creation is not supported.
- Repeatedly calling this function to set the same group will return success.

[Related Operations]

cam_cpp_stop_grp

##### cam_cpp_stop_grp

[Description]

Disable the cam cpp module group.

[Syntax]

int32_t cam_cpp_stop_grp(uint32_t grpId);

[Parameters]

| Parameter Name | Description                                            | Input/Output |
| --------------- | ------------------------------------------------------ | ------------ |
| grpId           | CPP group ID. Range: [0, CPP_GRP_MAX_NUM).             | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: cam_cpp.h
- Library file: libcpp.so

[Note]

- Repeated creation is not supported.
- Repeatedly calling this function to set the same group will return success.
- The buffer sent to the cpp group through the cam_cpp_post_buffer interface will be returned during the stop process.

[Related Operations]

cam_cpp_start_grp

##### cam_cpp_post_buffer

[Description]

Send a frame of image data to the CPP module.

[Syntax]

int32_t cam_cpp_post_buffer(uint32_t grpId, const IMAGE_BUFFER_S *inputBuf, const IMAGE_BUFFER_S *outputBuf, int32_t frameId, FRAME_INFO_S *frameInfo);

[Parameters]

| Parameter Name  | Description                                             | Input/Output |
| ---------------- | ------------------------------------------------------- | ------------ |
| grpId            | CPP group ID. Range: [0, CPP_GRP_MAX_NUM).              | Input        |
| inputBuf         | Information of the input image. See IMAGE_BUFFER_S for details. | Input        |
| outputBuf        | Information of the output image. See IMAGE_BUFFER_S for details. | Output       |
| frameInfo        | See FRAME_INFO_S for details.                           | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: cam_cpp.h, cam_module_interface.h
- Library file: libcpp.so

[Note]

- The group must be created.

[Related Operations]

cam_cpp_ReturnBuffer

##### cam_cpp_set_callback

[Description]

Set the callback function.

[Syntax]

int32_t cam_cpp_set_callback(uint32_t grpId, CppCallback callback);

[Parameters]

| Parameter Name | Description                                            | Input/Output |
| --------------- | ------------------------------------------------------ | ------------ |
| grpId           | CPP group ID. Range: [0, CPP_GRP_MAX_NUM).             | Input        |
| callback        | When the module processing is completed and the output image is ready, this interface is called. | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: cam_cpp.h
- Library file: libcpp.so

[Note]

- The group must be created.

[Related Operations]

cam_cpp_ReturnBuffer

##### cam_cpp_get_grp_attr

[Description]

Get the CPP group attributes.

[Syntax]

int32_t cam_cpp_get_grp_attr(uint32_t grpId, CPP_GRP_ATTR_S *attr);

[Parameters]

| Parameter Name | Description                                            | Input/Output |
| --------------- | ------------------------------------------------------ | ------------ |
| grpId           | CPP group ID. Range: [0, CPP_GRP_MAX_NUM).             | Input        |
| attr            | Pointer to the CPP group attributes.                   | Output       |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: cam_cpp.h
- Library file: libcpp.so

[Note]

- The group must be created.
- The group attributes must be legal. Static attributes cannot be dynamically set. See CPP_GRP_ATTR_S for details.

[Related Operations]

cam_cpp_set_grp_attr

##### cam_cpp_set_grp_attr

[Description]

Set the CPP group attributes.

[Syntax]

int32_t cam_cpp_set_grp_attr(uint32_t grpId, const CPP_GRP_ATTR_S *attr);

[Parameters]

| Parameter Name | Description                                            | Input/Output |
| --------------- | ------------------------------------------------------ | ------------ |
| grpId           | CPP group ID. Range: [0, CPP_GRP_MAX_NUM).             | Input        |
| attr            | Pointer to the CPP group attributes.                   | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: cam_cpp.h
- Library file: libcpp.so

[Note]

- The group must be created.
- The group attributes must be legal. Static attributes cannot be dynamically set. See CPP_GRP_ATTR_S for details.

[Related Operations]

cam_cpp_get_grp_attr

##### cam_cpp_get_tuning_param

[Description]

Get the tuning parameters of the CPP Group.

[Syntax]

int32_t cam_cpp_get_tuning_param(uint32_t grpId, cpp_tuning_params_t *tuningParam);

[Parameters]

| Parameter Name    | Description                                            | Input/Output |
| ------------------ | ------------------------------------------------------ | ------------ |
| grpId              | CPP group ID. Range: [0, CPP_GRP_MAX_NUM).             | Input        |
| tuningParam        | Pointer to the module tuning parameters.               | Output       |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: cam_cpp.h, CPPGlobalDefine.h
- Library file: libcpp.so

[Note]

- The group must be created.

[Related Operations]

cam_cpp_set_tuning_param

##### cam_cpp_set_tuning_param

[Description]

Set the tuning parameters of the CPP Group.

[Syntax]

int32_t cam_cpp_set_tuning_param(uint32_t grpId, cpp_tuning_params_t *tuningParam);

[Parameters]

| Parameter Name    | Description                                            | Input/Output |
| ------------------ | ------------------------------------------------------ | ------------ |
| grpId              | CPP group ID. Range: [0, CPP_GRP_MAX_NUM).             | Input        |
| tuningParam        | Pointer to the module tuning parameters.               | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: cam_cpp.h, CPPGlobalDefine.h
- Library file: libcpp.so

[Note]

- The group must be created.

[Related Operations]

cam_cpp_get_tuning_param

##### cam_cpp_load_settingfile

[Description]

Tuning debugging interface, load the firmware setting file.

[Syntax]

int32_t cam_cpp_load_settingfile(uint32_t grpId, const char *fileName);

[Parameters]

| Parameter Name | Description                                            | Input/Output |
| --------------- | ------------------------------------------------------ | ------------ |
| grpId           | CPP group ID. Range: [0, CPP_GRP_MAX_NUM).             | Input        |
| fileName        | Pointer to the cpp firmware configuration file path.   | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: cam_cpp.h
- Library file: libcpp.so

[Note]

- The group must be created.

[Related Operations]

cam_cpp_save_settingfile

##### cam_cpp_save_settingfile

[Description]

Tuning debugging interface, save the firmware setting file.

[Syntax]

int32_t cam_cpp_save_settingfile(uint32_t grpId, const char *fileName);

[Parameters]

| Parameter Name | Description                                            | Input/Output |
| --------------- | ------------------------------------------------------ | ------------ |
| grpId           | CPP group ID. Range: [0, CPP_GRP_MAX_NUM).             | Input        |
| fileName        | Pointer to the cpp firmware configuration file path.   | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: cam_cpp.h
- Library file: libcpp.so

[Note]

- The group must be created.

[Related Operations]

cam_cpp_load_settingfile

##### cam_cpp_read_fw

[Description]

Tuning debugging interface, get the parameters of the CPP Group Firmware module.

[Syntax]

int32_t cam_cpp_read_fw(uint32_t grpId, const char *filter, const char *param, uint32_t row, uint32_t column, int32_t *pVal);

[Parameters]

| Parameter Name | Description                                            | Input/Output |
| --------------- | ------------------------------------------------------ | ------------ |
| grpId           | CPP group ID. Range: [0, CPP_GRP_MAX_NUM).             | Input        |
| filter          | Pointer to the Firmware Filter name.                   | Input        |
| param           | Pointer to the Firmware Parameter name.                | Input        |
| row             | Row offset of the Firmware Parameter element.          | Input        |
| column          | Column offset of the Firmware Parameter element.       | Input        |
| pVal            | Pointer to the list of Firmware Parameter elements.    | Output       |

[Return Value]

| Parameter Name        | Description                                                             |
| ---------------------- | ----------------------------------------------------------------------- |
| -1                     | Failure. Check the input parameter name.                                |
| 0                      | Failure. No parameter value obtained.                                   |
| Positive values        | Success. Indicates the number of parameter elements obtained. 1 means a single element, >1 means multiple elements |

[Requirements]

- Header file: cam_cpp.h
- Library file: libcpp.so

[Note]

- The group must be created.

[Related Operations]

cam_cpp_write_fw

##### cam_cpp_write_fw

[Description]

Tuning debugging interface, set the parameters of the CPP Group Firmware module.

[Syntax]

int32_t cam_cpp_write_fw(uint32_t grpId, const char *filterName, const char *paramName, uint32_t row, uint32_t column, int32_t val);

[Parameters]

| Parameter Name | Description                                            | Input/Output |
| --------------- | ------------------------------------------------------ | ------------ |
| grpId           | CPP group ID. Range: [0, CPP_GRP_MAX_NUM).             | Input        |
| filterName      | Pointer to the Firmware Filter name.                   | Input        |
| paramName       | Pointer to the Firmware Parameter name.                | Input        |
| row             | Row offset of the Firmware Parameter element.          | Input        |
| column          | Column offset of the Firmware Parameter element.       | Input        |
| val             | Value of the Firmware Parameter element.               | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: cam_cpp.h
- Library file: libcpp.so

[Note]

- The group must be created.

[Related Operations]

cam_cpp_read_fw

##### cam_cpp_read_reg

[Description]

Tuning debugging interface, get the register value of the CPP Hardware.

[Syntax]

int32_t cam_cpp_read_reg(uint32_t addr, uint32_t *val);

[Parameters]

| Parameter Name | Description           | Input/Output |
| --------------- | --------------------- | ------------ |
| addr            | Hardware register address | Input        |
| val             | Hardware register value   | Output       |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: cam_cpp.h
- Library file: libcpp.so

[Note]

- The group must be created.
- There is only one set of hardware register resources, and the lower 16-bit specifies the address offset.

[Related Operations]

cam_cpp_write_reg

##### cam_cpp_write_reg

[Description]

Tuning debugging interface, set the register value of the CPP Hardware.

[Syntax]

int32_t cam_cpp_write_reg(uint32_t addr, uint32_t val, uint32_t mask);

[Parameters]

| Parameter Name | Description            | Input/Output |
| --------------- | ---------------------- | ------------ |
| addr            | Hardware register address | Input        |
| val             | Hardware register value   | Input        |
| mask            | Hardware register mask    | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: cam_cpp.h
- Library file: libcpp.so

[Note]

- The group must be created.
- There is only one set of hardware register resources, and the lower 16-bit specifies the address offset.

[Related Operations]

cam_cpp_read_reg

##### cam_cpp_dump_frame

[Description]

Save the specified number of frames of input and output images of the group to the specified directory.

[Syntax]

int32_t cam_cpp_dump_frame(uint32_t grpId, const char *path, uint32_t count);

[Parameters]

| Parameter Name | Description                                            | Input/Output |
| --------------- | ------------------------------------------------------ | ------------ |
| grpId           | CPP group ID. Range: [0, CPP_GRP_MAX_NUM).             | Input        |
| path            | Specified dump directory, cannot be NULL               | Input        |
| count           | Specified number of consecutive frames to dump.        | Input        |

[Return Value]

| Parameter Name | Description             |
| --------------- | ----------------------- |
| 0               | Success                 |
| Non-zero        | Failure, value is error code |

[Requirements]

- Header file: cam_cpp.h
- Library file: libcpp.so

[Note]

- The group must be created.
- This API is an asynchronous operation. After returning success, it continuously dumps the specified number of frames from that moment. If the specified number of frames has not been dumped, calling this interface again will interrupt the previous operation and start the current operation.

[Related Operations] None

#### Data Types

The data types related to the CPP module are defined as follows:

- CPP_GRP_MAX_NUM: Define the maximum number of CPP GROUPs.
- CPP_MIN_IMAGE_WIDTH: Define the minimum width of CPP images.
- CPP_MIN_IMAGE_HEIGHT: Define the minimum height of CPP images.
- CPP_MAX_IMAGE_WIDTH: Define the maximum width of CPP images.
- CPP_MAX_IMAGE_HEIGHT: Define the maximum height of CPP images.
- CPP_GRP: Define the CPP group number.
- CPP_MOD_ID_E: Define the CPP submodule ID.
- CPP_GRP_ATTR_S: Define the attributes of the CPP GROUP.
- CPP_GRP_NR_ATTR_S: Define the NR attributes of the CPP GROUP.
- CPP_GRP_EE_ATTR_S: Define the EE attributes of the CPP GROUP.
- CPP_GRP_TNR_ATTR_S: Define the TNR attributes of the CPP GROUP.

##### CPP_GRP_MAX_NUM

[Description]

Define the maximum number of CPP GROUPs.

[Definition]

#define CPP_GRP_MAX_NUM (16)

[Members] None

[Note] None

[Related Types and Data Structures] None

##### CPP_MIN_IMAGE_WIDTH

[Description]

Define the minimum width of CPP images.

[Definition]

#define CPP_MIN_IMAGE_WIDTH (480)

[Members] None

[Note] None

[Related Types and Data Structures] None

##### CPP_MIN_IMAGE_HEIGHT

[Description]

Define the minimum height of CPP images.

[Definition]

#define CPP_MIN_IMAGE_HEIGHT (288)

[Members] None

[Note] None

[Related Types and Data Structures] None

##### CPP_MAX_IMAGE_WIDTH

[Description]

Define the maximum width of CPP images.

[Definition]

#define CPP_MAX_IMAGE_WIDTH (4224)

[Members] None

[Note] None

[Related Types and Data Structures] None

##### CPP_MAX_IMAGE_HEIGHT

[Description]

Define the maximum height of CPP images.

[Definition]

#define CPP_MAX_IMAGE_HEIGHT (3136)

[Members] None

[Note] None

[Related Types and Data Structures] None

##### CPP_MOD_ID_E

[Description]

Define the CPP submodule ID.

[Definition]

```java
typedef enum { 
    CPP_ID_3DNR, 
    CPP_ID_MAX,
} CPP_MOD_ID_E
```

[Members] None

[Note] None

[Related Types and Data Structures] None

##### CPP_GRP_ATTR_S

[Description]

Define the attributes of the CPP GROUP.

[Definition]

```java
typedef struct asrCPP_GRP_ATTR_S { 
    uint32_t width;
    uint32_t height; 
    PIXEL_FORMAT_E format; 
    CPP_GRP_WORKMODE_E mode;
} CPP_GRP_ATTR_S;
```

[Members]

| Variable         | Description                                                                                                                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| width height     | The size of the input image. The valid range of width: [CPP_MIN_IMAGE_WIDTH, CPP_MAX_IMAGE_WIDTH]. The valid range of height: [CPP_MIN_IMAGE_HEIGHT, CPP_MAX_IMAGE_HEIGHT]. This is a static attribute. That is, it is set after the group is created and cannot be dynamically modified. |
| format           | The format of the output image. This is a static attribute. That is, it is set after the group is created and cannot be dynamically modified.                                                                                                                                 |
| mode             | Working mode                                                                                                                                                                                                      |

[Note]

- The input image size must be configured according to the actual width and height of the CPP work. Allocate TNR KGain buffer and output image buffer according to the input image size. The input image format only supports YUV data.

[Related Types and Data Structures]

PIXEL_FORMAT_E CPP_GRP_WORKMODE_E

##### CPP_GRP_WORKMODE_E

[Description]

Define the working mode of the CPP GROUP.

[Definition]

```java
typedef enum { 
    CPP_GRP_FRAME_MODE, 
    CPP_GRP_SLICE_MODE, 
    CPP_GRP_MODE_MAX,
} CPP_GRP_WORKMODE_E;
```

[Members]

| Member Name           | Description                                    |
| --------------------- | ---------------------------------------------- |
| CPP_GRP_FRAME_MODE    | Data is processed as a whole frame, with high hardware processing priority      |
| CPP_GRP_SLICE_MODE    | Data is divided into slices for processing, with low hardware processing priority |

[Note] None

[Related Types and Data Structures] None

#### Error Codes

Refer to the standard C library header file errno.h

### tuningtools API

This section introduces the usage of ASR MARS11-ISP tuningtools module APIs and explains the relevant parameter data structures and return values in detail.

#### API

tuningtools provides the following APIs:

- ASR_TuningAssistant_Create: Create a tuning Assistant.
- ASR_TuningAssistant_Destroy: Destroy a tuning Assistant.

##### ASR_TuningAssistant_Create

[Description]

Create a tuningtool Assistant.

[Syntax]

ASR_TUNING_ASSISTANT_HANDLE ASR_TuningAssistant_Create(const ASR_TUNING_ASSISTANT_TRIGGER_S *trigger);

[Parameters]

| Parameter Name | Description                      | Input/Output |
| --------------- | -------------------------------- | ------------ |
| trigger          | Tuning assistant configuration parameters | Input        |

[Return Value]

| Parameter Name | Description                             |
| --------------- | --------------------------------------- |
| Non-NULL        | Success, returns the assistant handle pointer |
| NULL            | Failure                                 |

[Requirements]

- Header file: asr_cam_tuning_assistant.h
- Library file: libtuningtools.so

[Note]

- Repeated creation is not supported.
- The structure ASR_TUNING_ASSISTANT_TRIGGER_S is described in the next section of data types.

[Related Operations]

ASR_TuningAssistant_Destroy

##### ASR_TuningAssistant_Destroy

[Description]

Destroy a tuningtool Assistant.

[Syntax]

bool ASR_TuningAssistant_Destroy(ASR_TUNING_ASSISTANT_HANDLE handle);

[Parameters]

| Parameter Name | Description                                                                            | Input/Output |
| --------------- | -------------------------------------------------------------------------------------- | ------------ |
| handle          | Pointer to the tuning assistant structure to be destroyed, must be the return value of ASR_TuningAssistant_Create | Input        |

[Return Value]

| Parameter Name | Description |
| --------------- | ----------- |
| true            | Success     |
| false           | Failure     |

[Requirements]

- Header file: asr_cam_tuning_assistant.h
- Library file: libtuningtools.so

[Note]

- Repeated destruction is not supported.

[Related Operations]

ASR_TuningAssistant_Create

#### Data Types

##### ASR_TUNING_ASSISTANT_HANDLE

[Description]

Define the tuning assistant handler pointer.

[Definition]

typedef void *ASR_TUNING_ASSISTANT_HANDLE;

[Members] None

[Note] None

[Related Types and Data Structures] None

##### TUNING_MODULE_TYPE_E

[Description]

Define the types of tuning modules that can be supported.

[Definition]

```java
typedef enum TUNING_MODULE_TYPE { 
    TUNING_MODULE_TYPE_ISP, 
    TUNING_MODULE_TYPE_CPP, 
    TUNING_MODULE_TYPE_ALGO, 
    TUNING_MODULE_TYPE_MAX
} TUNING_MODULE_TYPE_E;
```

[Members]

| Member Name                | Description                         |
| -------------------------- | ----------------------------------- |
| TUNING_MODULE_TYPE_ISP     | ISP module type                     |
| TUNING_MODULE_TYPE_CPP     | CPP module type                     |
| TUNING_MODULE_TYPE_ALGO    | Algorithm module type (users do not need to care) |
| TUNING_MODULE_TYPE_MAX     | The maximum number of module types that can be tuned |

[Note] None

[Related Types and Data Structures] None

##### TUNING_BUFFER_S

[Description]

Define the buffer structure used when the tuning module opens the dump raw image function.

[Definition]

```java
typedef struct TUNING_BUFFER { 
    uint32_t frameId;
    uint32_t length; 
    void *virAddr;
} TUNING_BUFFER_S, *TUNING_BUFFER_S_PTR;
```

[Members]

| Member Name | Description                 |
| --------------- | ------------------------- |
| frameId         | Image frame number        |
| length          | Image buffer length       |
| virAddr         | Starting address of the image buffer |

[Note]

Used with ASR_TUNING_ASSISTANT_TRIGGER_S for the StartDumpRaw input parameter.

[Related Types and Data Structures] None

##### TUNING_MODULE_OBJECT_S

[Description]

Define the basic information of a single module entity to be tuned.

[Definition]

```java
typedef struct TUNING_MODULE_OBJECT { 
    TUNING_MODULE_TYPE_E type;
    void *moduleHandle; 
    uint32_t groupId; 
    uint8_t dumpRaw; 
    char name[32];
    int (*loadSettingFile)(void *handle, const char *filename); 
    int (*saveSettingFile)(void *handle, const char *filename);
    int (*saveFilterSettingFile)(void *handle, const char *filtername, const char *filename);
    int (*readFirmware) (void *handle, const char *filter, const char *param, int32_t row, int32_t colum, int32_t *pVal);
    int (*writeFirmware) (void *handle, const char *filter, const char *param, int32_t row, int32_t colum, int32_t val);
} TUNING_MODULE_OBJECT_S, *TUNING_MODULE_OBJECT_S_PTR;
```

[Members]

| Member Name              | Description                                                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| type                     | Type of the module to be tuned                                                                                         |
| moduleHandle             | Handle pointer of the module to be tuned, used by the algorithm module. For ISP and CPP types, it is not necessary to care, as it is implemented internally by tuningtools. |
| groupId                  | Group number of the module to be tuned. For ISP type, the range is [0, 1]. For CPP type, the range is [0, 15].         |
| dumpRaw                  | Whether to support dumping RAW image data                                                                              |
| name                     | Name of the module to be tuned                                                                                         |
| loadSettingFile          | For the algorithm module, it is the callback for loading the setting file. For ISP and CPP, it is not necessary to care, as it is implemented internally by tuningtools. |
| saveSettingFile          | For the algorithm module, it is the callback for saving the setting file. For ISP and CPP, it is not necessary to care, as it is implemented internally by tuningtools. |
| saveFilterSettingFile    | For the algorithm module, it is the callback for saving a specific filter setting file. For ISP and CPP, it is not necessary to care, as it is implemented internally by tuningtools. |
| readFirmware             | For the algorithm module, it is the callback for reading a specific filter value. For ISP and CPP, it is not necessary to care, as it is implemented internally by tuningtools. |
| writeFirmware            | For the algorithm module, it is the callback for setting a specific filter value. For ISP and CPP, it is not necessary to care, as it is implemented internally by tuningtools. |

[Note]

When tuning ISP and CPP, focus on type, groupId, and name. dumpRaw is generally set to 0.

[Related Types and Data Structures] None

##### ASR_TUNING_ASSISTANT_TRIGGER

[Description]

Define the basic callback of all modules to be tuned.

[Definition]

```java
typedef struct ASR_TUNING_ASSISTANT_TRIGGER { 
    uint32_t (*GetModuleCount)();
    int32_t (*GetModules)(uint32_t moduleCount, TUNING_MODULE_OBJECT_S *modules); 
    int32_t(*StartDumpRaw)(TUNING_MODULE_TYPE_E type, uint32_t groupId, uint32_t frameCount, TUNING_BUFFER_S *frames);
    int32_t (*EndDumpRaw)(TUNING_MODULE_TYPE_E type, uint32_t groupId);
} ASR_TUNING_ASSISTANT_TRIGGER_S, *ASR_TUNING_ASSISTANT_TRIGGER_S_PTR;
```

[Members]

| Member Name       | Description                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| GetModuleCount    | Return the total number of modules to be tuned                                                           |
| GetModules        | Get the list of modules to be tuned with moduleCount (placed in the input parameter modules array) and return the actual number of modules obtained |
| StartDumpRaw      | Callback to start raw dump, not recommended for use                                                      |
| EndDumpRaw        | Callback to end raw dump, not recommended for use                                                        |

[Note]

When tuning ISP and CPP, the members of TUNING_MODULE_OBJECT_S should be based on the actual ISP and CPP groupId used. You can refer to the usage of tuning_server_init() in demo/online_pipeline_test.c.

[Related Types and Data Structures] None
