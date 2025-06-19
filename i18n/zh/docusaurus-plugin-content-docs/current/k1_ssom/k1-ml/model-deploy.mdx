# 模型部署

  ## 1 性能测试
  **【提示】**在正式部署 AI 模型前，我们强烈建议您先在 `芯片端`进行相关模型的性能测试，以确保当前模型的推理性能符合预期。
  SDK 目录下的 `spacemit-ort/bin/ onnxruntime_perf_test`工具支持在 `芯片端`快速测试 AI 算法模型的纯推理性能。该工具兼容 ONNX 模型，故您可以很方便的使用它来评测原始 ONNX 浮点模型，以及转换（和/或量化）后的 ONNX 定点模型性能。

  ### 1.2 使用说明
  ```
  $ onnxruntime_perf_test - h
  perf_test [options...] model_path [result_file]
  Options:
          - m [test_mode]: Specifies the test mode. Value could be 'duration' or 'times'.
                  Provide 'duration' to run the test for a fix duration, and 'times' to repeated for a certain times. 
          - M: Disable memory pattern.
          - A: Disable memory arena
          - c [parallel runs]: Specifies the (max) number of runs to invoke simultaneously. Default:1.
          - e [cpu|spacemit]: Specifies the provider 'cpu', 'pacemit'. Default:'cpu'.
          - r [repeated_times]: Specifies the repeated times if running in 'times' test mode.Default:1000.
          - t [seconds_to_run]: Specifies the seconds to run for 'duration' mode. Default:600.
          - p [profile_file]: Specifies the profile name to enable profiling and dump the profile data to the file.
          - s: Show statistics result, like P75, P90. If no result_file provided this defaults to on.
          - S: Given random seed, to produce the same input data. This defaults to - 1(no initialize).
          - v: Show verbose information.
          - x [intra_op_num_threads]: Sets the number of threads used to parallelize the execution within nodes, A value of 0 means ORT will pick a default. Must >= 0.
          - y [inter_op_num_threads]: Sets the number of threads used to parallelize the execution of the graph (across nodes), A value of 0 means ORT will pick a default. Must >= 0.
          - f [free_dimension_override]: Specifies a free dimension by name to override to a specific value for performance optimization. Syntax is [dimension_name:override_value]. override_value must > 0
          - F [free_dimension_override]: Specifies a free dimension by denotation to override to a specific value for performance optimization. Syntax is [dimension_denotation:override_value]. override_value must > 0
          - P: Use parallel executor instead of sequential executor.
          - o [optimization level]: Default is 99 (all). Valid values are 0 (disable), 1 (basic), 2 (extended), 99 (all).
                  Please see onnxruntime_c_api.h (enum GraphOptimizationLevel) for the full list of all optimization levels.
          - u [optimized_model_path]: Specify the optimized model path for saving.
          - z: Set denormal as zero. When turning on this option reduces latency dramatically, a model may have denormals.
          - T [Set intra op thread affinities]: Specify intra op thread affinity string
          [Example]: - T 1, 2; 3, 4; 5, 6 or - T 1 - 2; 3 - 4; 5 - 6 
                  Use semicolon to separate configuration between threads.
                  E.g. 1, 2; 3, 4; 5, 6 specifies affinities for three threads, the first thread will be attached to the first and second logical processor.
                  The number of affinities must be equal to intra_op_num_threads - 1

          - D [Disable thread spinning]: disable spinning entirely for thread owned by onnxruntime intra - op thread pool.
          - H: Maximum value to produce the random input data. This defaults to - 1(as std::numeric_limits<T>::max() whenever the value given by this option less than value of '- L').
          - L: Minimum value to produce the random input data. This defaults to 0.
          - R: Count of random generated input test data. This defaults to 1 and must > 0.
          - U: Maximum value to produce the random value of free dimensions which are not overriden. This defaults to 1. Specified value must > 0.
          - V: Minimum value to produce the random value of free dimensions which are not overriden. This defaults to 1. Specified value must > 0.
          - Z [Force thread to stop spinning between runs]: disallow thread from spinning during runs to reduce cpu usage.
          - h: help
  ```

  ### 1.2 参数说明

  |参数|必要/可选|默认值|说明|
  |----|----|----|----|
  |- m|可选|times|测试模式：固定测试时长(s)或测试次数（注：原 onnxruntime_perf_test 工具默认 'duration' 模式）|
  |- M|可选|无|禁用内存 pattern|
  |- A|可选|无|禁用内存 arena|
  |- c|可选|1|压测并行推理数量（同一时刻，触发 session.run() 的个数）|
  |- e|可选|cpu|推理运行的 Provider(s)，使用时用 " " 隔开，当前可选 EP(s) 包括：\{cpu|spacemit\}|
  |- r|可选|1000|固定测试次数模式下的模型推理测试次数（每个 session）|
  |- t|可选|600|固定测试时间模式下的模型推理测试时间（每个 session），单位：秒|
  |- p|可选|无|Profiling 文件路径（默认：禁用，非空：使能）|
  |- s|可选|ON|打印推理耗时统计信息（如果未指定结果文件，则默认开启）|
  |- S|可选|- 1|随机种子（默认 - 1 即不随机初始化测试数据，0 随机随机种子， > 0 用户指定的随机种子）|
  |- v|可选|无|使能调试信息|
  |- x|可选|0|单个算子内部并行线程数（默认 0 即 onnxruntime 内部机制）|
  |- y|可选|0|多个算子并发执行线程数（默认 0 即 onnxruntime 内部机制）|
  |- f|可选|无|按 参数名称(字符串：参见 abs_free_dimensions.onnx) 指定模型输入中自由维度的数值，格式 key:value|
  |- F|可选|无|按 标记名称(字符串：参见 abs_free_dimensions.onnx) 指定模型输入中自由维度的数值，格式 key:value|
  |- P|可选|无|使能并行执行模式|
  |- o|可选|99|模型优化等级|
  |- u|可选|无|优化后模型的保存路径|
  |- z|可选|无|同 session_options.AddConfigEntry(kOrtSessionOptionsConfigSetDenormalAsZero, "1")|
  |- T|可选|None|指定 onnxruntime 内部线程池中线程的亲和性|
  |- D|可选|无|完全禁用 onnxruntime 算子内并发计算相关线程池中线程的空转|
  |- H|可选|- 1|随机生成测试数据最大值（如果小于最小值，则默认使用相应数据类型的最大值）|
  |- L|可选|0|随机生成测试数据最小值|
  |- R|可选|1|随机生成测试数据（组）数|
  |- U|可选|1|自由维度（一般是 batch size）随机数据最大值|
  |- V|可选|1|自由维度（一般是 batch size）随机数据最小值|
  |- Z|可选|无|禁止线程在运行期间空转，以减少 CPU 利用率|
  |- h, -- help|可选|无|打印使用说明|

  ### 1.3 使用示例
  以 onnxruntime / test / testdata / abs_free_dimensions.onnx模型为例：
  #### 1.3.1. **随机测试数据**
  固定测试次数 100，随机生成 10 组测试数据，并且固定随机种子为 1、随机测试数据最大 6、随机测试数据最小 2
  ```
  $ MODEL = abs_free_dimensions.onnx
  $ ARGS = "${MODEL} ${MODEL%.onnx}.txt - m times - r 100 - R 10 - S 1 - H 6 - L 2"
  $ onnxruntime_perf_test ${ARGS}
 ...
  Session creation time cost: 0.0455992 s
  First inference time cost: 0 ms
  Total inference time cost: 0.00371454 s
  Total inference requests: 100
  Average inference time cost: 0.0371454 ms
  Total inference run time: 0.00417042 s
  Number of inferences per second: 23978.4 
 ...
  ```

  ## 2 应用开发
  ### 2.1 AI Support Library
  #### 2.1.1 **Demo 简介**
  当前 Support Library Demo 位于部署工具包中 bianbu-ai-support 目录下，相关说明及示例如下：
  ```
  $ tree - L 3 /opt/spacemit-ai-sdk.v1.1.0/bianbu-ai-support/
  /opt/spacemit-ai-sdk.v1.1.0/bianbu-ai- support/
  ├── bin                 // 预编译好的可执行程序
  │   ├── classification_demo
  │   ├── detection_demo
  │   ├── detection_stream_demo
  │   ├── detection_video_demo
  │   ├── estimation_demo
  │   └── tracker_stream_demo
  ├── demo                // demo cmake 工程
  │   ├── CMakeLists.txt
  │   ├── README.md
  │   ├── build.sh        // 快速编译（及测试）脚本
  │   ├── dataloader.hpp
  │   ├── image_classification_demo.cc
  │   ├── object_detection.hpp
  │   ├── object_detection_demo.cc
  │   ├── object_detection_stream_demo.cc
  │   ├── object_detection_video_demo.cc
  │   ├── pose_estimation.hpp
  │   ├── pose_estimation_demo.cc
  │   ├── pose_tracker_stream_demo.cc
  │   └── utils
  │       ├── cv_helper.hpp
  │       ├── json.hpp
  │       ├── json_helper.hpp
  │       └── win_getopt
  ├── include             // 预处理、后处理、辅助函数等模块
  │   └── bianbuai
  │       ├── task
  │       └── utils
  ├── lib
  │   ├── 3rdparty        // 第三方依赖库
  │   │   └── opencv4
  │   ├── libbianbuai.so -> libbianbuai.so.1
  │   ├── libbianbuai.so.1 -> libbianbuai.so.1.0.15
  │   └── libbianbuai.so.1.0.15
  └── share
      └── ai - support      // 预置资源数据
          ├── imgs
          ├── models
          └── videos

  16 directories, 24 files
  ```
  #### 2.1.2 **Demo 编译**
  ##### **交叉编译**
  交叉编译主要适用于 PC 端（e.g. x86_64 开发环境），流程（示例）如下：
  ```
  # 指定 spacemit-ai-sdk 路径
  $ SDK = ${PATH_TO_SPACEMIT_AI_SDK} # e.g. / opt / spacemit-ai-sdk.v1.1.0

  # 指定交叉编译相关环境变量
  $ CROSS_TOOL = $SDK / spacemit - gcc / bin / riscv64 - unknown - linux - gnu -
  $ SYSROOT = $SDK / spacemit - gcc / sysroot
  $ BIANBUAI_HOME = $SDK / bianbu - ai - support
  $ ORT_HOME = $SDK / spacemit - ort
  $ OPENCV_DIR = $SDK / bianbu - ai - support / lib / 3rdparty / opencv4 / lib / cmake / opencv4

  # 创建 cmake 工作目录并编译 demo
  $ cd ${BIANBUAI_HOME} / demo
  $ mkdir build && pushd build
  $ cmake.. - DBIANBUAI_HOME = ${BIANBUAI_HOME} - DORT_HOME = ${ORT_HOME} - DOpenCV_DIR = ${OPENCV_DIR} - DCMAKE_C_COMPILER = ${CROSS_TOOL}gcc - DCMAKE_CXX_COMPILER = ${CROSS_TOOL}g++ - DCMAKE_SYSROOT = ${SYSROOT}
  $ make - j4
  $ popd
  ```
  ##### **本地编译**
  本地编译适用于 `芯片端`，流程（示例）如下：
  ```
  # 指定本地编译相关环境变量
  $ CROSS_TOOL =
  $ SYSROOT =
  $ BIANBUAI_HOME = $SDK / bianbu - ai - support  # 指定最新 sdk 中的版本或 / usr 目录
  $ ORT_HOME = $SDK / spacemit - ort            # 指定最新 sdk 中的版本或 / usr 目录
  $ OPENCV_DIR =                           # 指定最新 sdk 中的版本或通过 find_package 自动查找

  # 创建 cmake 工作目录并编译 demo
  $ cd ${BIANBUAI_HOME} / demo
  $ mkdir build && pushd build
  $ cmake.. - DBIANBUAI_HOME = ${BIANBUAI_HOME} - DORT_HOME = ${ORT_HOME} - DOpenCV_DIR = ${OPENCV_DIR} - DCMAKE_C_COMPILER = ${CROSS_TOOL}gcc - DCMAKE_CXX_COMPILER = ${CROSS_TOOL}g++ - DCMAKE_SYSROOT = ${SYSROOT}
  $ make - j4
  $ popd
  ```
  【提示】上述相关内容已提前预置在 `demo / build.sh`快速编译脚本中。您可以通过编辑 `demo / build.sh`脚本，快速修改相关配置（如：ORT_HOME 等变量）。届时，您可以通过 `bash build.sh`（交叉编译）和 `bash build.sh -- native`（本地编译）命令快速验证 demo 编译。
  ##### **快速编译**
  ```
  # 一键交叉编译(e.g. spacemit-ai-sdk.v1.1.0 docker 环境)
  $ cd / opt / spacemit-ai-sdk.v1.1.0 / bianbu - ai - support / demo
  $ bash build.sh
  ```
  #### 2.1.3 **Demo 运行**
  - **仿真配置**
  对于交叉编译后的 demo 程序，您可以使用部署工具中预置的 `qemu - riscv64`工具，实现 PC 端的仿真运行。相关配置如下：
  ```
  $ QEMU_CMD = "$SDK / spacemit - qemu / bin / qemu - riscv64 - L $SYSROOT"
  ```
  - **运行示例**
  【提示】对于本地编译后的 demo 程序，您无需配置任何环境变量。
  ```
  # Create softlink to test resource if necessary
  $ ln - sf ${BIANBUAI_HOME} / rootfs / usr / share / ai - support data

  # Smoke test with image classification
  $ env LD_LIBRARY_PATH = ${ORT_HOME} / lib:$LD_LIBRARY_PATH ${QEMU_CMD} \
    build / classification_demo data / models / squeezenet1.1 - 7.onnx data / labels / synset.txt data / imgs / dog.jpg

  # Smoke test with object detection
  $ env LD_LIBRARY_PATH = ${ORT_HOME} / lib:$LD_LIBRARY_PATH ${QEMU_CMD} \
    build / detection_demo data / models / nanodet - plus - m_320.onnx data / models / coco.txt data / imgs / person.jpg result0.jpg
  ```
  【提示】上述相关内容已同样提前预置在 `demo / build.sh`快速编译脚本中。您可以通过 `bash build.sh -- test`命令快速运行上述示例（x86_64 docker 环境仿真测试）:

  ~~~
  [INF0] Building demos done. [INFO]Prepare... [INFO] Smoke test with image classification task
  [INF0] Run:bld / classificat ion_demo data / mode ls / squeezenet1.1 - 7.onnx data / mode ls / synset.txt data / imgs / dog.jpg open tcm device failed(- 1) Enable spacemit ep now tcm heck param err--->fun:tcmmalloc_sync + line:164Classfy result:n02113023 Pembroke, Pembroke Welsh corgi [INFO] Smoke test with object detection task... [INF0] Run: bld / detection_demo data / mode s / nanodet - plus - m_320.onnx data / models / coco.txt data / imgs / person.jpg resulto.jpg open t
  ~~~

  #### 2.1.4 Demo 说明
- classification_demo
  
单张图片图像分类 demo，输入单张图片路径，输出图像的类别。
- 运行方法
```
$ classification_demo 
Usage: 
classification_demo <model_path> <label_path> <image_path>
classification_demo <config_path> <image_path>
```
- 参数说明

|参数|必选/可选|默认值|备注|
|---|---|---|---|
|model_path|必选|无|模型文件路径|
|label_path|必选|无|标签文件路径|
|config_path|必选|无|配置文件路径|
|image_path|必选|无|图像文件路径|

- detection_demo

单张图片目标检测 demo，输入单张图片地址与保存图片地址，输出框信息并将画框后图片保存到目标图片位置。
- 运行方法
```
$ detection_demo 
Usage: 
detection_demo <model_path> <label_path> <image_path> <save_path>
detection_demo <config_path> <image_path> <save_path>
```
- 参数说明
  
|参数|必选/可选|默认值|备注|
|---|---|---|---|
|model_path|必选|无|模型文件路径|
|label_path|必选|无|标签文件路径|
|config_path|必选|无|配置文件路径|
|image_path|必选|无|图像文件路径|
|save_path|必选|无|保存图像文件路径|

- detection_stream_demo
  
视频流目标检测 demo，可以输入视频文件或者接入摄像头并实时显示画框后的画面。
- 运行方法
```
$ detection_stream_demo 
Usage: 
detection_stream_demo [-h <resize_height>] [-w <resize_width>] [-f] <model_path> <label_path> <input>
detection_stream_demo [-h <resize_height>] [-w <resize_width>] [-f] <config_path> <input>
```
- 参数说明
  
|参数|必选/可选|默认值|备注|
|---|---|---|---|
|model_path|必选|无|模型文件路径|
|label_path|必选|无|标签文件路径|
|config_path|必选|无|配置文件路径|
|input|必选|无|输入内容|
|-w|可选|320|缩放后宽度大小|
|-h|可选|320|缩放后高度大小|
|-f|可选|无|水平翻转|

- detection_video_demo
  
视频目标检测 demo，输入视频文件地址，会输出实时框信息并保存画框后的视频（avi 格式）到目标地址。
- 运行方法
```
$ detection_video_demo 
Usage: 
detection_video_demo <model_path> <label_path> <video_path> <save_path>(*.avi)
detection_video_demo <config_path> <video_path> <save_path>(*.avi)
```
- 参数说明
  
|参数|必选/可选|默认值|备注|
|---|---|---|---|
|model_path|必选|无|模型文件路径|
|label_path|必选|无|标签文件路径|
|config_path|必选|无|配置文件路径|
|video_path|必选|无|视频文件路径（mp4，avi）|
|save_path|必选|无|保存视频文件路径|

- estimation_demo
  
单张图片姿态估计 demo，输入单张图片地址与保存图片地址，将画点后图片保存到目标图片位置。
- 运行方法
```
$ estimation_demo 
Usage: 
estimation_demo <detection_model_path> <detection_label_path> <pose_point_model_path> <image_path> <save_path>
estimation_demo <detection_config_path> <pose_point_config_path> <image_path> <save_path>
```
- 参数说明
  
|参数|必选/可选|默认值|备注|
|---|---|---|---|
|detection_model_path|必选|无|目标检测模型文件路径|
|detection_label_path|必选|无|目标检测标签文件路径|
|pose_point_model_path|必选|无|姿态模型文件路径|
|detection_config_path|必选|无|目标检测模型配置文件路径|
|pose_point_config_path|必选|无|姿态模型配置文件路径|
|image_path|必选|无|图像文件路径|
|save_path|必选|无|保存图像文件路径|

- tracker_stream_demo
视频流姿态追踪 demo，可以输入视频文件或者接入摄像头并实时显示画框后的画面。
- 运行方法
```
$ tracker_stream_demo 
Usage: 
tracker_stream_demo [-h <resize_height>] [-w <resize_width>] [-f] <detection_model_path> <detection_label_path> <pose_point_model_path> <input>
tracker_stream_demo [-h <resize_height>] [-w <resize_width>] [-f] <detection_config_path> <pose_point_config_path> <input>
```
- 参数说明
  
|参数|必选/可选|默认值|备注|
|---|---|---|---|
|detection_model_path|必选|无|目标检测模型文件路径|
|detection_label_path|必选|无|目标检测标签文件路径|
|pose_point_model_path|必选|无|姿态模型文件路径|
|detection_config_path|必选|无|目标检测模型配置文件路径|
|pose_point_config_path|必选|无|姿态模型配置文件路径|
|input|必选|无|输入内容|
|-w|可选|320|缩放后宽度大小|
|-h|可选|320|缩放后高度大小|
|-f|可选|无|水平翻转|

#### 2.1.5 环境变量说明
|环境变量名称|备注|
|---|---|
|SUPPORT_SHOW|(stream demo) -1 表示不显示|
|SUPPORT_SHOWFPS|(stream demo) 如果有内容，将显示 fps|
|SUPPORT_PROFILING_PROJECTS|生成的 profile 文件地址|
|SUPPORT_LOG_LEVEL|范围是 0 - 4|
|SUPPORT_GRAPH_OPTIMIZATION_LEVEL|图优化级别 (ort_disable_all, ort_enable_basic, ort_enable_extended, ort_enable_all)|
|SUPPORT_OPT_MODEL_PATH|优化后的模型路径|
|SUPPORT_DISABLE_SPACEMIT_EP|1 表示禁用 spacemit - ep|
|SUPPORT_OPENCV_THREAD_NUM|opencv（>= 4.x）使用的线程数|

### 2.2 AI Engine
#### 2.2.1 简介
SpacemiT - ORT 包含 ONNXRuntime 基础推理框架（v1.15.1）与 SpaceMITExecutionProvider 加速后端（后简称 EP），其使用方法与公版 ONNXRuntime 几乎一致。

#### 2.2.2 QuickStart
- C & C++
```
#include <onnxruntime_cxx_api.h> 
#include "spacemit_ort_env.h"

Ort::Env env(ORT_LOGGING_LEVEL_WARNING, "ort - demo") ;
Ort::SessionOptions session_options;
// 设置推理线程数
//int64_t num_threads = 2;
//session_options.SetIntraOpNumThreads(num_threads);
std::unordered_map<std::string, std::string> provider_options;
// provider_options["SPACEMIT_EP_DISABLE_OP_TYPE_FILTER"] = "OPA;OPB;OPC"; 禁止 EP 推理某些 OP 类型, node.op
// provider_options["SPACEMIT_EP_DISABLE_OP_NAME_FILTER"] = "OPA;OPB;OPC"; 禁止 EP 推理某些命名的 OP, node.name
SessionOptionsSpaceMITEnvInit(session_options, provider_options); // 可选加载 SpaceMIT 环境初始化
Ort::Session session(env, net_param_path, session_options);

//...后续与公版 ORT 一致
```
- Python
```
# 使用 whl 包安装
# pip install spacemit_ort - *.whl
# 在 riscv64 平台上如果遇到警告则加上 -- break - system - packages
# whl 包剥离了依赖库的自动安装, 需要自行安装 numpy
# 对于 riscv64 平台，使用命令 apt install python3 - numpy 安装

import onnxruntime as ort
import numpy as np
import spacemit_ort

eps = ort.get_available_providers() #
net_param_path = "resnet18.q.onnx"

sess_options = ort.SessionOptions()
# 设置线程数
# sess_options.intra_op_num_threads = 2
# 设置 log 等级
# sess_options.log_severity_level = 1
# 带 ep 的 session
session = ort.InferenceSession(net_param_path, sess_options, providers = ["SpaceMITExecutionProvider"])
# 不带 ep 的 session
# 因为存在 2 个 EP，因此需要特别指定
ref_session = ort.InferenceSession(net_param_path, sess_options, providers = ["CPUExecutionProvider"])

input_tensor = np.ones((1, 3, 224, 224), dtype = np.float32)
input_name = session.get_inputs()[0].name  
output_names = [output.name for output in session.get_outputs()]  
outputs = session.run(output_names, {input_name: input_tensor})
ref_outputs = ref_session.run(output_names, {input_name: input_tensor})

# outputs 与 ref_outputs 的误差一般在 1e - 5 以内
```

#### 2.2.3 Custom Operators plugins
使用原生 onnxruntime 的扩展自定义算子的方式，原文可参考
https://onnxruntime.ai/docs/reference/operators/add - custom - op.html
```
#include "onnxruntime_cxx_api.h" 

struct CustomKernel {
  CustomKernel (const OrtKernelInfo* info);
  void Compute(OrtKernelContext* context);
};

struct CustomOp : Ort::CustomOpBase<CustomOp, CustomKernel> {
  explicit CustomOp ();
  void* CreateKernel(const OrtApi&, const OrtKernelInfo*) const;
  const char* GetName() const { return "custom op"; };
  const char* GetExecutionProviderType() const { return "CPUExecutionProvider"; };
  size_t GetInputTypeCount() const { return 1; };
  ONNXTensorElementDataType GetInputType(size_t) const { return ONNX_TENSOR_ELEMENT_DATA_TYPE_UNDEFINED; };
  OrtCustomOpInputOutputCharacteristic GetInputCharacteristic(size_t) const { return OrtCustomOpInputOutputCharacteristic::INPUT_OUTPUT_OPTIONAL; };
  size_t GetOutputTypeCount() const { return 1; };
  ONNXTensorElementDataType GetOutputType(size_t) const { return ONNX_TENSOR_ELEMENT_DATA_TYPE_UNDEFINED; };
  OrtCustomOpInputOutputCharacteristic GetOutputCharacteristic(size_t) const { return OrtCustomOpInputOutputCharacteristic::INPUT_OUTPUT_OPTIONAL; };
};

// 声明自定义算子域并向 session_options 增加自定义算子
static const char* c_OpDomain = "user.custom_domain";
Ort::CustomOpDomain domain{c_OpDomain};
static TestCustomOp CustomOp;
domain.Add(&TestCustomOp());
session_options.Add(domain);
```

#### 2.2.4 Operator Accelerate List
|Op Type|Domain|Version|Attributes|Type|Notes|schema|
|---|---|---|---|---|---|---|
|Conv|ai.onnx|1、11|kernel_shape：限制二维|T：tensor(float) | tensor(float16)|QLinearConv|com.microsoft|1|kernel_shape：限制二维|T1：tensor(int8) | tensor(int16)\nT2：tensor(int8)\nT3：tensor(int8) | tensor(int16)\nT4：tensor(int32) | tensor(float)|tensor(int16)是内部扩展的算子，由 QDQ 格式解析；权重量化仅支持对称量化|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QLinearConv|
|ConvTranspose|ai.onnx|1、11|kernel_shape：限制二维|T：tensor(float) | tensor(float16)|QLinearConvTranspose|com.microsoft|1|kernel_shape：限制二维|T1：tensor(int8) | tensor(int16)\nT2：tensor(int8)\nT3：tensor(int8) | tensor(int16)\nT4：tensor(int32)|仅支持 PerTensor 量化；权重量化仅支持对称量化|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QLinearConv|
|QlinearMatMul|ai.onnx|10|T1：tensor(int8)\nT2：tensor(int8)\nT3：tensor(int8)|仅支持 PerTensor 量化，仅支持 B 为常量的 MatMul；权重量化仅支持对称量化|https://onnx.ai/onnx/operators/onnx__QLinearMatMul.html|
|Gemm|ai.onnx|1、6、7、9、11、13|alpha: 限制为 1.0\nbeta: 限制为 1.0|T：tensor(float)|https://onnx.ai/onnx/operators/onnx__Gemm.html|
|QGemm|com.microsoft|1|alpha: 限制为 1.0\nbeta: 限制为 1.0|T：tensor(float)\nTA：tensor(int8)\nTB：tensor(int8)\nTC：tensor(int8)\nTYZ：tensor(int8)\nTY：tensor(int8)|仅支持 PerTensor 量化，仅支持常量 Gemm；权重量化仅支持对称量化|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QGemm|
|AveragePool|ai.onnx|1、7、10、11、19|kernel_shape：限制二维\ncount_include_pad: 限制 1|T：tensor(float)|QLinearAveragePool|com.microsoft|1|kernel_shape：限制二维\ncount_include_pad: 限制 1|T：tensor(int8)|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QLinearAveragePool|
|GlobalAveragePool|ai.onnx|1|T：tensor(float)|QLinearGlobalAveragePool|com.microsoft|1|T：tensor(int8)|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QLinearGlobalAveragePool|
|MaxPool|ai.onnx|11、12|kernel_shape：限制二维|T：tensor(float) | tensor(int8)|
|QuantizeLinear|ai.onnx|10、13、19|T1：tensor(float)\nT2：tensor(int8) | tensor(int16)|
|DequantizeLinear|ai.onnx|10、13、19|T1：tensor(int8) | tensor(int16) | tensor(int32)\nT2：tensor(float)|
|Add|ai.onnx|1、6、7、13、14|T：tensor(float)|QLinearAdd|com.microsoft|1|T：tensor(int8)|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QLinearAdd|
|Sub|ai.onnx|1、6、7、13、14|T：tensor(float)|
|Mul|ai.onnx|1、6、7、13、14|T：tensor(float)|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QLinearMul|
|QLinearMul|com.microsoft|1|T：tensor(int8)|
|Div|ai.onnx|1、6、7，13，14|T：tensor(float)|
|Sigmoid|ai.onnx|1、6、13|T：tensor(float)|QLinearSigmoid|com.microsoft|1|T：tensor(int8)|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QLinearSigmoid|
|HardSigmoid|ai.onnx|1、6|T：tensor(float)|QLinearHardSigmoid|spacemit_ops|1|T：tensor(int8)|同 QLinearSigmoid|
|HardSwish|ai.onnx|14|T：tensor(float)|QLinearHardSwish|spacemit_ops|1|T：tensor(int8)|同 QLinearSigmoid|
|LeakyRelu|ai.onnx|1、6、16|T：tensor（float）|QLinearLeakyRelu|com.microsoft|1|T：tensor(int8)|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QLinearLeakyRelu|
|Transpose|ai.onnx|1、13|T：tensor(int8) | tensor(uint8)|
|Cast|ai.onnx|1、6、9、13、19|T1：tensor(float) | tensor(float16)\nT2：tensor(float) | tensor(float16)|https://onnx.ai/onnx/operators/onnx__Cast.html|
|ReduceMean|ai.onnx|11、13|axes: 限制[2,3]|T：tensor(float)|QLinearReduceMean|com.microsoft|1|axes: 限制[2,3]|T：tensor(int8)|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QLinearReduceMean|
|QLinearGelu|spacemit_ops|1|T：tensor(int8)|
|QLinearLayerNormalization|spacemit_ops|1|T：tensor(int8)|
|LayerNormalization|ai.onnx\ncom.microsoft|17\n1|T：tensor(float)|
|Gelu|com.microsoft|1|T：tensor(float)|

#### 2.2.5 Inference Sample
为了使用户更加容易上手，我们提供了相应的推理 Sample。
可见 SDK 包中，spacemit - ort/samples 路径。

## 3 常见问题（FAQ）
欢迎大家踊跃提问

### 3.1 如何查看模型推理的 profiling 信息？
可以参考原版说明。
https://onnxruntime.ai/docs/performance/tune - performance/profiling - tools.html
```
#include <onnxruntime_cxx_api.h> 
#include "spacemit_ort_env.h"

Ort::Env env(ORT_LOGGING_LEVEL_WARNING, "ort - demo") ;
Ort::SessionOptions session_options;
std::unordered_map<std::string, std::string> provider_options;

std::string profile_path = "ort - demo - profile";
// 开启 profiling
session_options.EnableProfiling(profile_path.c_str());

std::string opt_net_path = "ort - demo - opt.onnx";
// 开启保存优化后 ONNX 模型，该模型只能在当前特定平台下使用
session_options.SetOptimizedModelFilePath(opt_net_path.c_str());

SessionOptionsSpaceMITEnvInit(session_options, provider_options);
Ort::Session session(env, net_param_path, session_options);
```

### 3.2 如何保存模型运行时逐层结果？
ONNX 模型节点输出 Tensor 的 dump 功能，由一系列环境变量控制，此处给出可能使用到的常用环境变量解释。
| 环境变量名                                      | 含义                                  | 取值                              |
|------------------------------------------------|---------------------------------------|-----------------------------------|
| ORT_DEBUG_NODE_IO_DUMP_SHAPE_DATA               | 打印节点输入输出 Tensor 的 Shape 信息 | 0，1，默认为 0                   |
| ORT_DEBUG_NODE_IO_DUMP_NODE_PLACEMENT           | 打印节点的 EP 信息                    | 0，1，默认为 0                   |
| ORT_DEBUG_NODE_IO_DUMP_INPUT_DATA               | dump 节点输入 Tensor 的数据           | 0，1，默认为 0                   |
| ORT_DEBUG_NODE_IO_DUMP_OUTPUT_DATA              | dump 节点输出 Tensor 的数据           | 0，1，默认为 0                   |
| ORT_DEBUG_NODE_IO_NAME_FILTER                   | dump 节点的名字过滤                   | 以分号间隔的字符串，默认为空      |
| ORT_DEBUG_NODE_IO_OP_TYPE_FILTER                | dump 节点的类型过滤                   | 以分号间隔的字符串，默认为空      |
| ORT_DEBUG_NODE_IO_DUMP_DATA_DESTINATION         | dump 节点输入输出 Tensor 的导出类型   | 字符串 "stdout" or "files" or "sqlite"，一般选用 files |
| ORT_DEBUG_NODE_IO_OUTPUT_DIR                    | dump 节点输入输出 Tensor 的文件存放位置 | 字符串                            |
| ORT_DEBUG_NODE_IO_DUMPING_DATA_TO_FILES_FOR_ALL_NODES_IS_OK | 确认是否导出全部的 Tensor            | 0，1，默认为 0                   |


```
export ORT_DEBUG_NODE_IO_DUMP_SHAPE_DATA=1
export ORT_DEBUG_NODE_IO_DUMP_OUTPUT_DATA=1
export ORT_DEBUG_NODE_IO_DUMP_DATA_DESTINATION=files
# 指定导出 Tensor 文件的目录
export ORT_DEBUG_NODE_IO_OUTPUT_DIR=./dump_dir
export ORT_DEBUG_NODE_IO_DUMPING_DATA_TO_FILES_FOR_ALL_NODES_IS_OK=1
export ORT_DEBUG_NODE_IO_DUMP_NODE_PLACEMENT=1
export ORT_DEBUG_NODE_IO_APPEND_RANK_TO_FILE_NAME=1
# export ORT_DEBUG_NODE_IO_OP_TYPE_FILTER="QLinearConv;QLinearGlobalAveragePool"

rm -rf./dump_dir
mkdir -p./dump_dir
# 执行 demo 或者你的程序获得
./run_demo resnet18 resnet18.q.onnx
```
控制台输出
```
QLinearConv node: SpaceMITExecutionProvider_QLinearConv_20
Input 0 Name: PPQ_Operation_141
 Shape: {1,7,7,512}
Input 1 Name: ortshared_1_0_1_2_token_254
 Shape: {}
Input 2 Name: PPQ_Variable_373
 Shape: {}
Input 3 Name: onnx::Conv_250
 Shape: {512,512,3,3}
Input 4 Name: PPQ_Variable_375
 Shape: {512}
Input 5 Name: PPQ_Variable_376
 Shape: {512}
Input 6 Name: ortshared_1_0_1_3_token_255
 Shape: {}
Input 7 Name: PPQ_Variable_382
 Shape: {}
Input 8 Name: onnx::Conv_251
 was missing data type
 Placement: SpaceMITExecutionProvider
-----------
Output 0 Name: PPQ_Operation_145
 Shape: {1,7,7,512}

 Placement: SpaceMITExecutionProvider
-----------
QLinearGlobalAveragePool node: SpaceMITExecutionProvider_QLinearGlobalAveragePool_21
Input 0 Name: PPQ_Operation_147
 Shape: {1,7,7,512}
Input 1 Name: ortshared_1_0_1_0_token_252
 Shape: {}
Input 2 Name: PPQ_Variable_391
 Shape: {}
Input 3 Name: ortshared_1_0_1_1_token_253
 Shape: {}
Input 4 Name: PPQ_Variable_394
 Shape: {}
 Placement: SpaceMITExecutionProvider
-----------
Output 0 Name: PPQ_Operation_149
 Shape: {1,1,1,512}
```
在`./dump_dir`目录中获得指定节点类型的所有输出，以 tensorproto 格式存放

### 3.3 如何设置多线程以及多线程亲和性？
可参考原版文档设置线程亲和性，因为架构特殊性，0 - 3 号线程无法手动设置亲和性，由 ep 自行管理。
https://onnxruntime.ai/docs/performance/tune - performance/threading.html#set - intra - op - thread - affinity

### 3.4 是否需要关注 Tensor 的 Layout 内存排布？
推理库完全沿用 ONNXRuntime 对于 Tensor 的定义，即 NCHW 与 shape 描述一致的内存布局。

### 3.5 输入 QLinear 算子的模型
ONNX 算子集合内有一些公版的 QLinear 算子，在静态 shape 的情况下，可以直接使用，而在其他情况下，尽量使用 QDQ 格式的量化模型 