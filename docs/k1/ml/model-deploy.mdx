# Model Deployment
  ## 1 Performance Testing
  
  **[Note]** Before formally deploying the AI model, we strongly recommend that you conduct performance testing of the relevant model on the `chip side` to ensure that the inference performance of the current model meets expectations.
  
  The `spacemit-ort/bin/onnxruntime_perf_test` tool in the SDK directory supports quickly testing the pure inference performance of the AI algorithm model on the `chip side`. This tool is compatible with ONNX models, so you can easily use it to evaluate the performance of the original ONNX floating-point model, as well as the converted (and/or quantized) ONNX fixed-point model.
  
  ### 1.2 Usage Instructions
  ```
  $ onnxruntime_perf_test -h
  perf_test [options...] model_path [result_file]
  Options:
          -m [test_mode]: Specifies the test mode. Value could be 'duration' or 'times'.
                  Provide 'duration' to run the test for a fix duration, and 'times' to repeated for a certain times. 
          -M: Disable memory pattern.
          -A: Disable memory arena
          -c [parallel runs]: Specifies the (max) number of runs to invoke simultaneously. Default:1.
          -e [cpu|spacemit]: Specifies the provider 'cpu', 'pacemit'. Default:'cpu'.
          -r [repeated_times]: Specifies the repeated times if running in 'times' test mode.Default:1000.
          -t [seconds_to_run]: Specifies the seconds to run for 'duration' mode. Default:600.
          -p [profile_file]: Specifies the profile name to enable profiling and dump the profile data to the file.
          -s: Show statistics result, like P75, P90. If no result_file provided this defaults to on.
          -S: Given random seed, to produce the same input data. This defaults to -1(no initialize).
          -v: Show verbose information.
          -x [intra_op_num_threads]: Sets the number of threads used to parallelize the execution within nodes, A value of 0 means ORT will pick a default. Must >= 0.
          -y [inter_op_num_threads]: Sets the number of threads used to parallelize the execution of the graph (across nodes), A value of 0 means ORT will pick a default. Must >= 0.
          -f [free_dimension_override]: Specifies a free dimension by name to override to a specific value for performance optimization. Syntax is [dimension_name:override_value]. override_value must > 0
          -F [free_dimension_override]: Specifies a free dimension by denotation to override to a specific value for performance optimization. Syntax is [dimension_denotation:override_value]. override_value must > 0
          -P: Use parallel executor instead of sequential executor.
          -o [optimization level]: Default is 99 (all). Valid values are 0 (disable), 1 (basic), 2 (extended), 99 (all).
                  Please see onnxruntime_c_api.h (enum GraphOptimizationLevel) for the full list of all optimization levels.
          -u [optimized_model_path]: Specify the optimized model path for saving.
          -z: Set denormal as zero. When turning on this option reduces latency dramatically, a model may have denormals.
          -T [Set intra op thread affinities]: Specify intra op thread affinity string
          [Example]: -T 1, 2; 3, 4; 5, 6 or -T 1 - 2; 3 - 4; 5 - 6 
                  Use semicolon to separate configuration between threads.
                  E.g. 1, 2; 3, 4; 5, 6 specifies affinities for three threads, the first thread will be attached to the first and second logical processor.
                  The number of affinities must be equal to intra_op_num_threads - 1
          -D [Disable thread spinning]: disable spinning entirely for thread owned by onnxruntime intra - op thread pool.
          -H: Maximum value to produce the random input data. This defaults to -1(as std::numeric_limits<T>::max() whenever the value given by this option less than value of '-L').
          -L: Minimum value to produce the random input data. This defaults to 0.
          -R: Count of random generated input test data. This defaults to 1 and must > 0.
          -U: Maximum value to produce the random value of free dimensions which are not overriden. This defaults to 1. Specified value must > 0.
          -V: Minimum value to produce the random value of free dimensions which are not overriden. This defaults to 1. Specified value must > 0.
          -Z [Force thread to stop spinning between runs]: disallow thread from spinning during runs to reduce cpu usage.
          -h: help
  ```
  ### 1.2 Parameter Description
  |Parameter|Necessary/Optional|Default Value|Description|
  |----|----|----|----|
  |-m|Optional|times|Test mode: fixed test duration (s) or test times (Note: The original onnxruntime_perf_test tool defaults to the 'duration' mode)|
  |-M|Optional|None|Disable memory pattern|
  |-A|Optional|None|Disable memory arena|
  |-c|Optional|1|Number of parallel inferences (the number of session.run() triggers at the same time)|
  |-e|Optional|cpu|Provider(s) for inference, separated by " " when used. The currently available EPs include: \{cpu|spacemit\}|
  |-r|Optional|1000|Number of model inference tests in the fixed test times mode (for each session)|
  |-t|Optional|600|Model inference test time in the fixed test duration mode (for each session), unit: seconds|
  |-p|Optional|None|Profiling file path (default: disabled, non-empty: enabled)|
  |-s|Optional|ON|Print inference time statistics information (if the result file is not specified, it is enabled by default)|
  |-S|Optional|-1|Random seed (default -1 means no random initialization of test data, 0 random seed, > 0 user-specified random seed)|
  |-v|Optional|None|Enable debugging information|
  |-x|Optional|0|Number of parallel threads within a single operator (default 0, i.e., the internal mechanism of onnxruntime)|
  |-y|Optional|0|Number of concurrent execution threads for multiple operators (default 0, i.e., the internal mechanism of onnxruntime)|
  |-f|Optional|None|Specify the value of the free dimension in the model input by the parameter name (string: see abs_free_dimensions.onnx), format key:value|
  |-F|Optional|None|Specify the value of the free dimension in the model input by the notation name (string: see abs_free_dimensions.onnx), format key:value|
  |-P|Optional|None|Enable parallel execution mode|
  |-o|Optional|99|Model optimization level|
  |-u|Optional|None|Save path of the optimized model|
  |-z|Optional|None|Same as session_options.AddConfigEntry(kOrtSessionOptionsConfigSetDenormalAsZero, "1")|
  |-T|Optional|None|Specify the affinity of the threads in the internal thread pool of onnxruntime|
  |-D|Optional|None|Completely disable the idling of the threads in the thread pool related to the concurrent computing within the onnxruntime operator|
  |-H|Optional|-1|Maximum value for randomly generated test data (if less than the minimum value, the maximum value of the corresponding data type is used by default)|
  |-L|Optional|0|Minimum value for randomly generated test data|
  |-R|Optional|1|Number of groups of randomly generated test data|
  |-U|Optional|1|Maximum random data value for free dimensions (usually batch size)|
  |-V|Optional|1|Minimum random data value for free dimensions (usually batch size)|
  |-Z|Optional|None|Forbid the thread from idling during runs to reduce CPU utilization|
  |-h, --help|Optional|None|Print the usage instructions|
  
  ### 1.3 Usage Example
  Taking the onnxruntime/test/testdata/abs_free_dimensions.onnx model as an example:
  #### 1.3.1. **Random Test Data**

  Fix the test times to 100, randomly generate 10 groups of test data, and fix the random seed to 1, the maximum random test data to 6, and the minimum random test data to 2
  
  ```
  $ MODEL = abs_free_dimensions.onnx
  $ ARGS = "${MODEL} ${MODEL%.onnx}.txt -m times -r 100 -R 10 -S 1 -H 6 -L 2"
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
  ## 2 Application Development
  ### 2.1 AI Support Library
  #### 2.1.1 **Demo Introduction**
  
  The current Support Library Demo is located in the bianbu-ai-support directory in the deployment toolkit, and the relevant instructions and examples are as follows:

  ```
  $ tree -L 3 /opt/spacemit-ai-sdk.v1.1.0/bianbu-ai-support/
  /opt/spacemit-ai-sdk.v1.1.0/bianbu-ai-support/
  ├── bin                 // Precompiled executable programs
  │   ├── classification_demo
  │   ├── detection_demo
  │   ├── detection_stream_demo
  │   ├── detection_video_demo
  │   ├── estimation_demo
  │   └── tracker_stream_demo
  ├── demo                // Demo cmake project
  │   ├── CMakeLists.txt
  │   ├── README.md
  │   ├── build.sh        // Quick compilation (and testing) script
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
  ├── include             // Preprocessing, postprocessing, auxiliary function and other modules
  │   └── bianbuai
  │       ├── task
  │       └── utils
  ├── lib
  │   ├── 3rdparty        // Third-party dependency libraries
  │   │   └── opencv4
  │   ├── libbianbuai.so -> libbianbuai.so.1
  │   ├── libbianbuai.so.1 -> libbianbuai.so.1.0.15
  │   └── libbianbuai.so.1.0.15
  └── share
      └── ai-support      // Pre-set resource data
          ├── imgs
          ├── models
          └── videos
  16 directories, 24 files
  ```
  #### 2.1.2 **Demo Compilation**
  ##### **Cross-compilation**
  Cross-compilation is mainly applicable to the PC side (e.g. x86_64 development environment), and the process (example) is as follows:
  
  ```
  # Specify the path of the spacemit-ai-sdk
  $ SDK = ${PATH_TO_SPACEMIT_AI_SDK} # e.g. /opt/spacemit-ai-sdk.v1.1.0
  # Specify the environment variables related to cross-compilation
  $ CROSS_TOOL = $SDK/spacemit-gcc/bin/riscv64-unknown-linux-gnu-
  $ SYSROOT = $SDK/spacemit-gcc/sysroot
  $ BIANBUAI_HOME = $SDK/bianbu-ai-support
  $ ORT_HOME = $SDK/spacemit-ort
  $ OPENCV_DIR = $SDK/bianbu-ai-support/lib/3rdparty/opencv4/lib/cmake/opencv4
  # Create the cmake working directory and compile the demo
  $ cd ${BIANBUAI_HOME}/demo
  $ mkdir build && pushd build
  $ cmake.. -DBIANBUAI_HOME=${BIANBUAI_HOME} -DORT_HOME=${ORT_HOME} -DOpenCV_DIR=${OPENCV_DIR} -DCMAKE_C_COMPILER=${CROSS_TOOL}gcc -DCMAKE_CXX_COMPILER=${CROSS_TOOL}g++ -DCMAKE_SYSROOT=${SYSROOT}
  $ make -j4
  $ popd
  ```
  ##### **Local Compilation**
  Local compilation is applicable to the `chip side`, and the process (example) is as follows:
  ```
  # Specify the environment variables related to local compilation
  $ CROSS_TOOL =
  $ SYSROOT =
  $ BIANBUAI_HOME = $SDK/bianbu-ai-support  # Specify the version in the latest sdk or the /usr directory
  $ ORT_HOME = $SDK/spacemit-ort            # Specify the version in the latest sdk or the /usr directory
  $ OPENCV_DIR =                           # Specify the version in the latest sdk or automatically find it through find_package
  # Create the cmake working directory and compile the demo
  $ cd ${BIANBUAI_HOME}/demo
  $ mkdir build && pushd build
  $ cmake.. -DBIANBUAI_HOME=${BIANBUAI_HOME} -DORT_HOME=${ORT_HOME} -DOpenCV_DIR=${OPENCV_DIR} -DCMAKE_C_COMPILER=${CROSS_TOOL}gcc -DCMAKE_CXX_COMPILER=${CROSS_TOOL}g++ -DCMAKE_SYSROOT=${SYSROOT}
  $ make -j4
  $ popd
  ```
  [Note] The above-related content has been pre-set in the `demo/build.sh` quick compilation script. You can quickly modify the relevant configuration (such as: ORT_HOME and other variables) by editing the `demo/build.sh` script. At that time, you can quickly verify the demo compilation by the `bash build.sh` (cross-compilation) and `bash build.sh --native` (local compilation) commands.
  ##### **Quick Compilation**
  ```
  # One-click cross-compilation (e.g. spacemit-ai-sdk.v1.1.0 docker environment)
  $ cd /opt/spacemit-ai-sdk.v1.1.0/bianbu-ai-support/demo
  $ bash build.sh
  ```

  #### 2.1.3 **Demo Running**
  - **Simulation Configuration**
  For the cross-compiled demo program, you can use the pre-installed `qemu - riscv64` tool in the deployment tool to achieve simulation running on the PC side. The relevant configuration is as follows:
  ```
  $ QEMU_CMD = "$SDK / spacemit - qemu / bin / qemu - riscv64 - L $SYSROOT"
  ```
  - **Running Example**
  
  [Note] For the locally compiled demo program, you do not need to configure any environment variables.
  
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
  [Note] The above-related content has also been pre-installed in the `demo / build.sh` quick compilation script. You can quickly run the above example (simulation test in the x86_64 docker environment) by the `bash build.sh -- test` command:
  ~~~
  [INF0] Building demos done. [INFO]Prepare... [INFO] Smoke test with image classification task
  [INF0] Run:bld / classificat ion_demo data / mode ls / squeezenet1.1 - 7.onnx data / mode ls / synset.txt data / imgs / dog.jpg open tcm device failed(- 1) Enable spacemit ep now tcm heck param err--->fun:tcmmalloc_sync + line:164Classfy result:n02113023 Pembroke, Pembroke Welsh corgi [INFO] Smoke test with object detection task... [INF0] Run: bld / detection_demo data / mode s / nanodet - plus - m_320.onnx data / models / coco.txt data / imgs / person.jpg resulto.jpg open t
  ~~~
  
#### 2.1.4 Demo Instructions
- classification_demo

Single-image image classification demo, input the path of a single image, and output the category of the image.
- Running Method
```
$ classification_demo 
Usage: 
classification_demo <model_path> <label_path> <image_path>
classification_demo <config_path> <image_path>
```
- Parameter Description

|Parameter|Required/Optional|Default Value|Remarks|
|---|---|---|---|
|model_path|Required|None|Model file path|
|label_path|Required|None|Label file path|
|config_path|Required|None|Configuration file path|
|image_path|Required|None|Image file path|
- detection_demo

Single-image object detection demo, input the address of a single image and the address to save the image, output the box information and save the framed image to the target image location.
- Running Method
```
$ detection_demo 
Usage: 
detection_demo <model_path> <label_path> <image_path> <save_path>
detection_demo <config_path> <image_path> <save_path>
```
- Parameter Description

|Parameter|Required/Optional|Default Value|Remarks|
|---|---|---|---|
|model_path|Required|None|Model file path|
|label_path|Required|None|Label file path|
|config_path|Required|None|Configuration file path|
|image_path|Required|None|Image file path|
|save_path|Required|None|Saved image file path|
- detection_stream_demo

Video stream object detection demo, you can input a video file or access the camera and display the framed picture in real time.

- Running Method
  
```
$ detection_stream_demo 
Usage: 
detection_stream_demo [-h <resize_height>] [-w <resize_width>] [-f] <model_path> <label_path> <input>
detection_stream_demo [-h <resize_height>] [-w <resize_width>] [-f] <config_path> <input>
```
- Parameter Description

|Parameter|Required/Optional|Default Value|Remarks|
|---|---|---|---|
|model_path|Required|None|Model file path|
|label_path|Required|None|Label file path|
|config_path|Required|None|Configuration file path|
|input|Required|None|Input content|
|-w|Optional|320|Resized width|
|-h|Optional|320|Resized height|
|-f|Optional|None|Horizontal flip|

- detection_video_demo

Video object detection demo, input the address of the video file, will output real-time box information and save the framed video (avi format) to the target address.

- Running Method
```
$ detection_video_demo 
Usage: 
detection_video_demo <model_path> <label_path> <video_path> <save_path>(*.avi)
detection_video_demo <config_path> <video_path> <save_path>(*.avi)
```
- Parameter Description

|Parameter|Required/Optional|Default Value|Remarks|
|---|---|---|---|
|model_path|Required|None|Model file path|
|label_path|Required|None|Label file path|
|config_path|Required|None|Configuration file path|
|video_path|Required|None|Video file path (mp4, avi)|
|save_path|Required|None|Saved video file path|

- estimation_demo

Single-image pose estimation demo, input the address of a single image and the address to save the image, and save the image with points drawn to the target image location.

- Running Method
```
$ estimation_demo 
Usage: 
estimation_demo <detection_model_path> <detection_label_path> <pose_point_model_path> <image_path> <save_path>
estimation_demo <detection_config_path> <pose_point_config_path> <image_path> <save_path>
```
- Parameter Description

|Parameter|Required/Optional|Default Value|Remarks|
|---|---|---|---|
|detection_model_path|Required|None|Object detection model file path|
|detection_label_path|Required|None|Object detection label file path|
|pose_point_model_path|Required|None|Pose model file path|
|detection_config_path|Required|None|Object detection model configuration file path|
|pose_point_config_path|Required|None|Pose model configuration file path|
|image_path|Required|None|Image file path|
|save_path|Required|None|Saved image file path|

- tracker_stream_demo

Video stream pose tracking demo, you can input a video file or access the camera and display the framed picture in real time.

- Running Method
```
$ tracker_stream_demo 
Usage: 
tracker_stream_demo [-h <resize_height>] [-w <resize_width>] [-f] <detection_model_path> <detection_label_path> <pose_point_model_path> <input>
tracker_stream_demo [-h <resize_height>] [-w <resize_width>] [-f] <detection_config_path> <pose_point_config_path> <input>
```
- Parameter Description

|Parameter|Required/Optional|Default Value|Remarks|
|---|---|---|---|
|detection_model_path|Required|None|Object detection model file path|
|detection_label_path|Required|None|Object detection label file path|
|pose_point_model_path|Required|None|Pose model file path|
|detection_config_path|Required|None|Object detection model configuration file path|
|pose_point_config_path|Required|None|Pose model configuration file path|
|input|Required|None|Input content|
|-w|Optional|320|Resized width|
|-h|Optional|320|Resized height|
|-f|Optional|None|Horizontal flip|

#### 2.1.5 Description of Environment Variables

|Environment Variable Name|Remarks|
|---|---|
|SUPPORT_SHOW|(stream demo) -1 indicates not to display|
|SUPPORT_SHOWFPS|(stream demo) If there is content, the fps will be displayed|
|SUPPORT_PROFILING_PROJECTS|The address of the generated profile file|
|SUPPORT_LOG_LEVEL|The range is 0 - 4|
|SUPPORT_GRAPH_OPTIMIZATION_LEVEL|Graph optimization level (ort_disable_all, ort_enable_basic, ort_enable_extended, ort_enable_all)|
|SUPPORT_OPT_MODEL_PATH|The path of the optimized model|
|SUPPORT_DISABLE_SPACEMIT_EP|1 indicates to disable spacemit - ep|
|SUPPORT_OPENCV_THREAD_NUM|The number of threads used by opencv (>= 4.x)|

### 2.2 AI Engine
#### 2.2.1 Introduction

SpacemiT - ORT includes the basic inference framework of ONNXRuntime (v1.15.1) and the SpaceMITExecutionProvider acceleration backend (hereinafter referred to as EP), and its usage is almost the same as the public version of ONNXRuntime.

#### 2.2.2 QuickStart

- C & C++
```
#include <onnxruntime_cxx_api.h> 
#include "spacemit_ort_env.h"
Ort::Env env(ORT_LOGGING_LEVEL_WARNING, "ort - demo") ;
Ort::SessionOptions session_options;
// Set the number of inference threads
//int64_t num_threads = 2;
//session_options.SetIntraOpNumThreads(num_threads);
std::unordered_map<std::string, std::string> provider_options;
// provider_options["SPACEMIT_EP_DISABLE_OP_TYPE_FILTER"] = "OPA;OPB;OPC"; Disable EP from inferring certain OP types, node.op
// provider_options["SPACEMIT_EP_DISABLE_OP_NAME_FILTER"] = "OPA;OPB;OPC"; Disable EP from inferring certain named OPs, node.name
SessionOptionsSpaceMITEnvInit(session_options, provider_options); // Optional loading of SpaceMIT environment initialization
Ort::Session session(env, net_param_path, session_options);
//...Subsequent steps are consistent with the public version of ORT
```
- Python
```
# Install using the whl package
# pip install spacemit_ort - *.whl
# On the riscv64 platform, if a warning is encountered, add -- break - system - packages
# The whl package strips the automatic installation of dependent libraries, and numpy needs to be installed separately
# For the riscv64 platform, use the command apt install python3 - numpy to install
import onnxruntime as ort
import numpy as np
import spacemit_ort
eps = ort.get_available_providers() #
net_param_path = "resnet18.q.onnx"
sess_options = ort.SessionOptions()
# Set the number of threads
# sess_options.intra_op_num_threads = 2
# Set the log level
# sess_options.log_severity_level = 1
# Session with ep
session = ort.InferenceSession(net_param_path, sess_options, providers = ["SpaceMITExecutionProvider"])
# Session without ep
# Because there are 2 EPs, it needs to be specifically specified
ref_session = ort.InferenceSession(net_param_path, sess_options, providers = ["CPUExecutionProvider"])
input_tensor = np.ones((1, 3, 224, 224), dtype = np.float32)
input_name = session.get_inputs()[0].name  
output_names = [output.name for output in session.get_outputs()]  
outputs = session.run(output_names, {input_name: input_tensor})
ref_outputs = ref_session.run(output_names, {input_name: input_tensor})
# The error between outputs and ref_outputs is generally within 1e - 5
```
#### 2.2.3 Custom Operators plugins

Use the method of extending custom operators in the native onnxruntime. For the original text, please refer to
https://onnxruntime.ai/docs/reference/operators/add-custom-op.html
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
// Declare the custom operator domain and add the custom operator to the session_options
static const char* c_OpDomain = "user.custom_domain";
Ort::CustomOpDomain domain{c_OpDomain};
static TestCustomOp CustomOp;
domain.Add(&TestCustomOp());
session_options.Add(domain);
```
#### 2.2.4 Operator Accelerate List

|Op Type|Domain|Version|Attributes|Type|Notes|schema|
|---|---|---|---|---|---|---|
|Conv|ai.onnx|1, 11|kernel_shape: limited to two dimensions|T: tensor(float) | tensor(float16)|QLinearConv|com.microsoft|1|kernel_shape: limited to two dimensions|T1: tensor(int8) | tensor(int16)\nT2: tensor(int8)\nT3: tensor(int8) | tensor(int16)\nT4: tensor(int32) | tensor(float)|tensor(int16) is an internally extended operator, parsed from the QDQ format; weight quantization only supports symmetric quantization|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QLinearConv|
|ConvTranspose|ai.onnx|1, 11|kernel_shape: limited to two dimensions|T: tensor(float) | tensor(float16)|QLinearConvTranspose|com.microsoft|1|kernel_shape: limited to two dimensions|T1: tensor(int8) | tensor(int16)\nT2: tensor(int8)\nT3: tensor(int8) | tensor(int16)\nT4: tensor(int32)|Only supports PerTensor quantization; weight quantization only supports symmetric quantization|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QLinearConv|
|QlinearMatMul|ai.onnx|10|T1: tensor(int8)\nT2: tensor(int8)\nT3: tensor(int8)|Only supports PerTensor quantization, only supports MatMul where B is a constant; weight quantization only supports symmetric quantization|https://onnx.ai/onnx/operators/onnx__QLinearMatMul.html|
|Gemm|ai.onnx|1, 6, 7, 9, 11, 13|alpha: limited to 1.0\nbeta: limited to 1.0|T: tensor(float)|https://onnx.ai/onnx/operators/onnx__Gemm.html|
|QGemm|com.microsoft|1|alpha: limited to 1.0\nbeta: limited to 1.0|T: tensor(float)\nTA: tensor(int8)\nTB: tensor(int8)\nTC: tensor(int8)\nTYZ: tensor(int8)\nTY: tensor(int8)|Only supports PerTensor quantization, only supports constant Gemm; weight quantization only supports symmetric quantization|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QGemm|
|AveragePool|ai.onnx|1, 7, 10, 11, 19|kernel_shape: limited to two dimensions\ncount_include_pad: limited to 1|T: tensor(float)|QLinearAveragePool|com.microsoft|1|kernel_shape: limited to two dimensions\ncount_include_pad: limited to 1|T: tensor(int8)|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QLinearAveragePool|
|GlobalAveragePool|ai.onnx|1|T: tensor(float)|QLinearGlobalAveragePool|com.microsoft|1|T: tensor(int8)|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QLinearGlobalAveragePool|
|MaxPool|ai.onnx|11, 12|kernel_shape: limited to two dimensions|T: tensor(float) | tensor(int8)|
|QuantizeLinear|ai.onnx|10, 13, 19|T1: tensor(float)\nT2: tensor(int8) | tensor(int16)|
|DequantizeLinear|ai.onnx|10, 13, 19|T1: tensor(int8) | tensor(int16) | tensor(int32)\nT2: tensor(float)|
|Add|ai.onnx|1, 6, 7, 13, 14|T: tensor(float)|QLinearAdd|com.microsoft|1|T: tensor(int8)|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QLinearAdd|
|Sub|ai.onnx|1, 6, 7, 13, 14|T: tensor(float)|
|Mul|ai.onnx|1, 6, 7, 13, 14|T: tensor(float)|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QLinearMul|
|QLinearMul|com.microsoft|1|T: tensor(int8)|
|Div|ai.onnx|1, 6, 7, 13, 14|T: tensor(float)|
|Sigmoid|ai.onnx|1, 6, 13|T: tensor(float)|QLinearSigmoid|com.microsoft|1|T: tensor(int8)|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QLinearSigmoid|
|HardSigmoid|ai.onnx|1, 6|T: tensor(float)|QLinearHardSigmoid|spacemit_ops|1|T: tensor(int8)|Same as QLinearSigmoid|
|HardSwish|ai.onnx|14|T: tensor(float)|QLinearHardSwish|spacemit_ops|1|T: tensor(int8)|Same as QLinearSigmoid|
|LeakyRelu|ai.onnx|1, 6, 16|T: tensor(float)|QLinearLeakyRelu|com.microsoft|1|T: tensor(int8)|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QLinearLeakyRelu|
|Transpose|ai.onnx|1, 13|T: tensor(int8) | tensor(uint8)|
|Cast|ai.onnx|1, 6, 9, 13, 19|T1: tensor(float) | tensor(float16)\nT2: tensor(float) | tensor(float16)|https://onnx.ai/onnx/operators/onnx__Cast.html|
|ReduceMean|ai.onnx|11, 13|axes: limited to [2, 3]|T: tensor(float)|QLinearReduceMean|com.microsoft|1|axes: limited to [2, 3]|T: tensor(int8)|https://github.com/microsoft/onnxruntime/blob/main/docs/ContribOperators.md#com.microsoft.QLinearReduceMean|
|QLinearGelu|spacemit_ops|1|T: tensor(int8)|
|QLinearLayerNormalization|spacemit_ops|1|T: tensor(int8)|
|LayerNormalization|ai.onnx\ncom.microsoft|17\n1|T: tensor(float)|
|Gelu|com.microsoft|1|T: tensor(float)|

#### 2.2.5 Inference Sample

To make it easier for users to get started, we provide corresponding inference samples.
You can see it in the SDK package, in the path spacemit-ort/samples.

## 3 Frequently Asked Questions (FAQ)
Everyone is welcome to ask questions
### 3.1 How to view the profiling information of the model inference?
You can refer to the original instructions.
https://onnxruntime.ai/docs/performance/tune-performance/profiling-tools.html
```
#include <onnxruntime_cxx_api.h> 
#include "spacemit_ort_env.h"
Ort::Env env(ORT_LOGGING_LEVEL_WARNING, "ort-demo");
Ort::SessionOptions session_options;
std::unordered_map<std::string, std::string> provider_options;
std::string profile_path = "ort-demo-profile";
// Enable profiling
session_options.EnableProfiling(profile_path.c_str());
std::string opt_net_path = "ort-demo-opt.onnx";
// Enable saving the optimized ONNX model, which can only be used on the current specific platform
session_options.SetOptimizedModelFilePath(opt_net_path.c_str());
SessionOptionsSpaceMITEnvInit(session_options, provider_options);
Ort::Session session(env, net_param_path, session_options);
```
### 3.2 How to save the layer-by-layer results during model running?
The dump function of the ONNX model node output Tensor is controlled by a series of environment variables. Here are the explanations of the commonly used environment variables that may be used.
| Environment Variable Name | Meaning | Value |
|-----------------------------|--------------------------------------|------------------------------|
| ORT_DEBUG_NODE_IO_DUMP_SHAPE_DATA | Print the Shape information of the Tensor at the input and output of the node | 0, 1, default is 0 |
| ORT_DEBUG_NODE_IO_DUMP_NODE_PLACEMENT | Print the EP information of the node | 0, 1, default is 0 |
| ORT_DEBUG_NODE_IO_DUMP_INPUT_DATA | Dump the data of the input Tensor of the node | 0, 1, default is 0 |
| ORT_DEBUG_NODE_IO_DUMP_OUTPUT_DATA | Dump the data of the output Tensor of the node | 0, 1, default is 0 |
| ORT_DEBUG_NODE_IO_NAME_FILTER | Filter the name of the dump node | A string separated by semicolons, default is empty |
| ORT_DEBUG_NODE_IO_OP_TYPE_FILTER | Filter the type of the dump node | A string separated by semicolons, default is empty |
| ORT_DEBUG_NODE_IO_DUMP_DATA_DESTINATION | Export type of the input and output Tensor of the dump node | The string "stdout" or "files" or "sqlite", generally choose files |
| ORT_DEBUG_NODE_IO_OUTPUT_DIR | File storage location of the input and output Tensor of the dump node | String |
| ORT_DEBUG_NODE_IO_DUMPING_DATA_TO_FILES_FOR_ALL_NODES_IS_OK | Confirm whether to export all Tensors | 0, 1, default is 0 |

```
export ORT_DEBUG_NODE_IO_DUMP_SHAPE_DATA=1
export ORT_DEBUG_NODE_IO_DUMP_OUTPUT_DATA=1
export ORT_DEBUG_NODE_IO_DUMP_DATA_DESTINATION=files
# Specify the directory to export the Tensor file
export ORT_DEBUG_NODE_IO_OUTPUT_DIR=./dump_dir
export ORT_DEBUG_NODE_IO_DUMPING_DATA_TO_FILES_FOR_ALL_NODES_IS_OK=1
export ORT_DEBUG_NODE_IO_DUMP_NODE_PLACEMENT=1
export ORT_DEBUG_NODE_IO_APPEND_RANK_TO_FILE_NAME=1
# export ORT_DEBUG_NODE_IO_OP_TYPE_FILTER="QLinearConv;QLinearGlobalAveragePool"
rm -rf./dump_dir
mkdir -p./dump_dir
# Execute the demo or your program to obtain
./run_demo resnet18 resnet18.q.onnx
```
Console output
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
Obtain all the outputs of the specified node type in the `./dump_dir` directory, stored in the tensorproto format

### 3.3 How to set multi-threading and thread affinity?
You can refer to the original document to set the thread affinity. Due to the particularity of the architecture, threads 0 - 3 cannot be manually set for affinity and are managed by the ep itself.

https://onnxruntime.ai/docs/performance/tune-performance/threading.html#set-intra-op-thread-affinity
### 3.4 Do you need to pay attention to the Layout memory arrangement of the Tensor?
The inference library completely follows the definition of the Tensor by ONNXRuntime, that is, the memory layout of NCHW is consistent with the shape description.
### 3.5 Models inputting to the QLinear operator
There are some official QLinear operators in the ONNX operator set, which can be used directly in the case of static shape, and in other cases, try to use the quantized model in the QDQ format 