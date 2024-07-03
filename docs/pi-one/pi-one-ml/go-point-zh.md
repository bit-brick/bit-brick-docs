 # GoPoint DEMO
## Introduction
GoPoint for i.MX Applications Processors is a user-friendly application that allows the user to launch
preselected demonstrations included in the NXP provided Linux Board Support Package (BSP).

The GoPoint for i.MX Applications Processors is for the users who are interested in showcasing the various
features and capabilities of the NXP provided SoCs. The demos included in this application are meant to be
easy to run for users of all skill levels, making complex use cases accessible to anyone. Users need some
knowledge when setting up equipment on Evaluation Kits (EVKs), such as changing Device Tree Blob (DTB)
files.

This user guide is intended for end users of the GoPoint for i.MX Applications Processors. This document
explains how to run the GoPoint for i.MX Applications Processors while also covering the included demos and
how to operate them.

To use this software, users need at a minimum:
- A supported NXP Evaluation Kit (EVK)
- A display output (MIPI DSI or HDMI)
- A connected mouse

Note: Some demos require more than the minimum required equipment. To find the required materials for each
demo, refer to Included demos.



## Demo launcher
On boards where the GoPoint for i.MX Applications Processors is available, an NXP logo is displayed on the top
left-hand corner of the screen. Users can start the demo launcher by clicking this logo.

![ml_support.png](/img/pi-one/ml/go_point_icon.png)

After opening the program, users can launch demos using the following options shown in Figure 2:
1. To filter the list, select the icon on the left to expand the filter menu. From this menu, users can select a
category or subcategory that filters the demos displayed in the launcher.
1. A scrollable list of all the demos supported on that EVK appears in this area with any filters applied. Clicking
a demo in the launcher brings up information about the demo.
1. This area displays the names, categories, and description of the demos.
2. Clicking Launch Demo launches the currently selected demo. A demo can then be force-quit by clicking the
Stop current demo button in the launcher (appears once a demo is started).
Note: Only one demo can be launched at a time.

推荐摄像头： HIKVISION DS-E24S



# 机器学习演示

  文档中关于机器学习演示的部分，主要展示了使用片上神经处理单元（NPU）实现的机器学习用例，包括以下几个方面的演示：

## 1. NNStreamer 演示
  - **功能介绍**：NNStreamer 是一组 GStreamer 组件，可在视频管道中实现机器学习。包含的演示使用 NNStreamer 创建视频输出，将推理信息覆盖在视频上。
  - **用户界面**：所有 NNStreamer 演示都有相似的用户界面。启动演示时，会出现一个控制面板，如图 4 所示。
    - **停止按钮**：可用于退出演示并停止视频播放。
    - **设置选项**：可在演示运行前设置各种选项，包括源（选择相机或使用示例视频，仅在“Pose Estimation”演示中需要互联网连接以获取示例视频）、后端（选择使用 NPU 或 CPU 进行推理）、高度（使用相机时选择输入视频的高度）、宽度（使用相机时选择输入视频的宽度）、FPS（使用相机时选择输入视频的 FPS）。
    - **运行按钮**：点击该按钮锁定当前设置并开始相机馈送和推理。
  - **注意事项**：如果选择 NPU，用户第一次运行演示时，NPU 会执行一个称为“warming up”的过程，将模型文件转换为其可读取的格式。虽然此结果会被缓存以加快未来的运行速度，但此过程可能会花费一些时间。

### 1.1 Object classification（对象分类）
  - **所需材料**：鼠标、显示器、相机（如果使用相机进行测试）和互联网连接。
  - **功能描述**：该演示启动一个 GStreamer 管道，从相机或视频文件获取视频馈送，并对视频帧进行分类推理。它使用预训练的量化 MobileNet V1 TFLite 模型，该模型在 ImageNet Large - Scale Visual Recognition Challenge 2012（ILSVRC2012）对象集中的对象上进行训练。推理结果将显示在视频帧内。
  - **演示效果**：当演示开始时，视频覆盖层会显示图像中概率最高的标签。

### 1.2 Object detection（对象检测）
  - **所需材料**：鼠标、显示器、相机（如果使用相机进行测试）和互联网连接。
  - **功能描述**：该演示启动一个 GStreamer 管道，从相机或视频文件获取视频馈送，并对视频帧进行检测推理。它使用预训练的量化 MobileNet Single Shot Detection（SSD）V2 TFLite 模型，该模型在 Common Objects in Context（COCO）对象数据集中的对象上进行训练。推理结果将显示在视频帧内。
  - **演示效果**：当演示开始时，检测到的对象会有框绘制在周围，并且其标签会显示在左上角附近。

### 1.3 Pose detection（姿态检测）
  - **所需材料**：鼠标、显示器、相机（如果使用相机进行测试）和互联网连接。
  - **功能描述**：该演示启动一个 GStreamer 管道，从相机或视频文件获取视频馈送，并对视频帧进行姿态检测推理。它使用预训练的量化 PoseNet ResNet - 50 TFLite 模型，该模型在 17 个身体点上进行训练。当视频开始时，检测到的姿态会覆盖在传入的视频馈送上。
  - **演示效果**：如图 7 所示，检测到的姿态会覆盖在视频上。

### 1.4 Machine learning gateway（机器学习网关）
  - **所需材料**：鼠标、显示器和每个设备的相机。需要两个连接到同一网络的设备。
  - **功能描述**：机器学习（ML）网关允许 ML 处理能力有限的设备使用另一台更强大设备的资源来加速 ML 推理。该应用程序将 i.MX 8M Plus 或 i.MX 93 EVKs 配置为服务器，允许其他设备（如 i.MX 8M Mini EVK）连接并使用其 NPU 进行 ML 加速。服务器还会广播其 IP 地址，以便客户端轻松连接到 ML 网关。该应用程序基于 i.MX 8M Plus Gateway for Machine Learning Inference Acceleration（文档 AN13650）开发。
  - **设置步骤**：
    - 启动将用作服务器的板上的 GoPoint（即 i.MX 8M Plus 或 i.MX 93 EVK，两者都有 NPU）。
    - 点击启动器菜单中显示的 ML 网关应用程序。
    - 要启动 ML 网关，选择“Launch Demo”按钮，它会自动检测要配置为服务器的板，并开始下载用于对象检测任务的模型。
    - 等待直到显示“Model is ready for inference!”。如果模型下载失败，请检查互联网连接。
  - **启动服务器**：
    - 服务器板在 GUI 中显示其当前 IP 地址。通过从下拉菜单中选择适当的选项，服务器允许用户选择在 NPU 或 CPU 上进行推理。预期使用 NPU，但用户也可以在 CPU 上进行测试以比较 NPU 不加速 ML 模型时的推理性能。准备好后，点击“Start Server!”按钮。如果服务器设置成功，将显示“Server is running”。
  - **连接客户端并开始推理**：
    - 设置客户端时，设备会搜索服务器 IP，如果找到，会将其作为选项显示在窗口中。如果客户端无法检测到 IP 地址，用户也可以输入自定义 IP 地址。确保为正确的设备选择相机源。准备好后，点击“Connect to Server!”按钮。设备连接到服务器并显示带有检测到的对象标记的视频输出。
  - **注意事项**：有时在客户端第一次运行应用程序时会导致检测框出现一些延迟，这种情况只会在服务器配置在 i.MX 8M Plus EVK 上时发生，因为它需要热身时间来加载 ML 模型。如果发生这种延迟，请停止客户端进程并再次连接到服务器，这很可能会解决延迟问题，并且在第二次运行时检测框必须实时显示。
  - **运行应用程序**：
    - 当 ML 网关在客户端开始运行时，视频覆盖层会显示以下信息：
      - 检测到的对象的类名和相应的边界框。
      - 总渲染帧数、丢弃帧数、当前每秒帧数（FPS）和平均 FPS。

## 2. OpenCV 演示
  - **功能介绍**：以下演示使用 OpenCV 库在显示视频帧时显示推理数据。
  - **所需材料**：鼠标、显示输出、相机和互联网连接。
  - **功能描述**：在这个演示中，用户可以在视频馈送中注册和识别面部。演示首先使用量化的 TFLite SSD MobileNet V2 模型检测视频帧中的面部，然后裁剪面部并使用量化的 TFLite FaceNet 模型创建面部嵌入。这些面部嵌入可用于与先前保存的面部进行比较。
  - **用户界面**：当演示启动时，会显示一个新窗口，允许用户设置面部识别选项：
    - **退出按钮**：可用于退出演示。
    - **设置选项**：可更改某些演示方面的选项，包括源（选择使用的相机）、后端（选择使用 NPU（如果可用）或 CPU 进行推理）。
    - **运行按钮**：确认设置并启动演示。
    - **状态更新区域**：演示启动时显示状态更新。
  - **运行过程**：当点击“Run”按钮时，演示首先从互联网下载所需模型，然后预热 NPU。第一次运行演示时，此预热时间可能需要几分钟。在未来的运行中，预热时间会减少。

## 3. TensorFlow Lite 演示
  - **功能介绍**：TensorFlow Lite（TFLite）演示是基本演示，展示了 TensorFlow 库的基本功能。

### 3.1 ML benchmark（ML 基准测试）
  - **所需材料**：鼠标、显示器和互联网连接。
  - **功能描述**：运行 ML 基准测试演示时，两个代表相同模型的机器学习模型文件在 CPU 和 NPU 上运行。在运行之前，演示尝试从互联网下载这些模型。成功下载后，模型运行并在屏幕上比较时间。目前，唯一可以运行的模型是预训练的量化 MobileNet V1 TFLite 模型。

### 3.2 Driver monitoring system demo（驾驶员监控系统演示）
  - **所需材料**：鼠标、显示器、相机和互联网连接。
  - **功能描述**：随着汽车行业的快速发展，驾驶员监控系统（DMS）已成为现代车辆的常见要求。DMS 本质上是一种车辆安全系统，用于评估驾驶员的警觉性并在必要时警告驾驶员。该系统在预防道路事故和保障驾驶员安全方面发挥着至关重要的作用。借助 ML 和神经网络（NN），DMS 现在可以实现高精度和低延迟。GoPoint 应用程序展示了 i.MX 8M Plus 和 i.MX 93 