# Quick Start
This chapter mainly introduces the usage process of the Jidie Shikong AI deployment tool to help you get started quickly.
## 1. Development Environment
Currently, Jidie Shikong provides you with two options for the PC (x86_64) side: Docker and local manual configuration (choose one of them).
Note: We strongly recommend that you choose the Docker method to avoid problems during the local manual installation process.
### 1.1 Using the Docker Environment
To simplify your deployment process, Jidie Shikong provides a Docker image with a complete development environment. You can perform model conversion, quantization, testing, and other tasks in the relevant Docker environment. Therefore, you only need to correctly install the Docker environment.
Docker Environment Installation Guide:
- Install Docker on Mac (Desktop Version)
- Install Docker on Windows (Desktop Version)
- Install Docker on Linux (Desktop Version)

Quick Check of the Docker Environment (Example):
~~~
$ sudo docker -v
Docker version 24.0.7, build afdd53b
~~~
Note: If you do not have root privileges, please contact the administrator of the PC device you are using to add your username to the docker user group. At that time, you will no longer need sudo to execute docker-related commands.
#### 1.1.1 Obtaining the Docker Image
You can choose to directly pull the spacemit-ai-sdk related image from the spacemit-ai project in harbor.spacemit.com (Note: x86_64 architecture); or you can choose to manually download and import the compressed image file from https://archive.spacemit.com/spacemit-ai/spacemit-ai-sdk/.
Note: For bandwidth and other factors, we recommend that you use the method of manually downloading the relevant image.
Direct Pulling (Example):
~~~
$ sudo docker pull harbor.spacemit.com/spacemit-ai/spacemit-ai-sdk:latest
latest: Pulling from spacemit-ai/spacemit-ai-sdk
...
~~~
Note: If you need a specific version of the deployment tool, you can replace latest with the specified version number or other tags (e.g. v1.0.0) during the operation.
Manual Downloading and Importing (Example):
~~~
$ wget https://archive.spacemit.com/spacemit-ai/spacemit-ai-sdk/spacemit-ai-sdk.v1.1.0.x86_64.img.tar.gz --no-check-certificate
$ sudo docker load -i spacemit-ai-sdk.v1.1.0.x86_64.img.tar.gz
~~~
#### 1.1.2 Viewing the Docker Image
Example:
~~~
$ sudo docker images | grep spacemit-ai-sdk
REPOSITORY                                       TAG       IMAGE ID        CREATED       SIZE
harbor.spacemit.com/spacemit-ai/spacemit-ai-sdk  latest    4d239b86f5ea    3 days ago    3.83GB
~~~
#### 1.1.3 Creating a Docker Container
Creating a Container (Example):
~~~
$ NAME = ai_test # Give a name to your docker container
$ sudo docker run -itd --name $NAME --net = host harbor.spacemit.com/spacemit-ai/spacemit-ai-sdk:latest /bin/bash
~~~
Note: If you plan to mount the host directory to the container `(e.g. parameter -v <host directory:container directory>)`, please avoid the /opt directory (the preset folder path of the current Jidie Shikong AI deployment tool).
Viewing the Container (Example):
~~~
$ sudo docker ps -a | grep $NAME
CONTAINER ID   IMAGE                                                   COMMAND        CREATED          STATUS           PORTS    NAMES
0a35d7feebd9   harbor.spacemit.com/spacemit-ai/spacemit-ai-sdk:latest  "/bin/bash"    2 minutes ago    Up 2 minutes              ai_test
~~~
#### 1.1.4 Entering the Docker Container
Entering the Container (Example):
~~~
$ sudo docker exec -it $NAME /bin/bash
~~~
Querying the Version (Example):
~~~
root@xxx:/home/workspace# spine
...
Spacemit AI Toolkit(Version: 2024/01/15)
...
~~~
As you can see, the relevant output is the version information of the Jidie Shikong AI deployment tool in the current docker development environment.
Note: When you call the spine related commands (and its subcommands) for the first time, spine will automatically install the necessary dependency packages for you, so network support is required (normally, this process will not take up too much of your time).
### 1.2 Setting up the Local Environment
#### 1.2.1 Environmental Requirements
Operating System: CentOS8 or Ubuntu18.04 (and above)
Note: If you do not need to simulate and test on the PC side, CentOS7 or Ubuntu16.04 can meet the environmental requirements.
#### 1.2.2 Obtaining the Deployment Tool
SDK Package Download Page: https://archive.spacemit.com/spacemit-ai/spacemit-ai-sdk/
Download Example (e.g. v1.1.0):
~~~
$ wget https://archive.spacemit.com/spacemit-ai/spacemit-ai-sdk/spacemit-ai-sdk.v1.1.0.x86_64.tar.gz --no-check-certificate
~~~
#### 1.2.3 Installing the Deployment Tool
Unzipping the Tool (Example):
~~~
$ tar xzf spacemit-ai-sdk.v1.1.0.x86_64.tar.gz
~~~
Directory Structure (Example):
~~~
$ tree -L 1 spacemit-ai-sdk.v1.1.0
spacemit-ai-sdk.v1.1.0
├──.spine.rc -> spine*       // Environment configuration script for the toolkit
├── bianbu-ai-support         // Upper-layer application development support library (and examples)
├── quick_start*              // Quick start example script
├── install.sh*               // Dependency environment installation script
├── spacemit-gcc              // x86_64-riscv64 compiler
├── spacemit-ort              // Inference engine (including operator library)
├── spacemit-qemu             // x86_64-riscv64 simulator
├── spacengine*               // Entrance to the toolkit
├── spacengine-toolkit        // Python environment for the toolkit (related to paddle/tf2/onnx models, etc.)
├── spacengine-toolkit-caffe  // Python environment for the toolkit (related to official caffe models)
├── spacengine-toolkit-tf1    // Python environment for the toolkit (related to tf1 models)
├── spacengine-wheel          // Python Wheel package for the toolkit
├── spacengine-xquant         // Python environment for the toolkit (quantizer)
└── spine -> spacengine*      // Entrance to the toolkit (shortcut)
~~~
Installing Dependencies (Example):
~~~
$ bash install.sh
~~~
Note: You may need root privileges to execute the installation of related dependent software. If you cannot obtain the relevant permissions, you can contact the administrator of the device you are currently using to assist in the installation, or use the AI deployment tool docker image provided by Jidie Shikong (see the content of Section 2.1 Using the Docker Environment).
Importing the Tool (Example):
~~~
# cd spacemit-ai-sdk.v1.1.0
$ source.spine.rc # Note: Only valid for the current terminal (you can also edit the ~/.bashrc file to make it valid for all terminals)
~~~
Querying the Version (Example):
~~~
root@xxx:/home/workspace# spine
...
Spacemit AI Toolkit(Version: 2024/01/15)
...
~~~
Note: When you call the spine related commands (and its subcommands) for the first time, spine will automatically install the necessary dependency packages for you, so network support is required (normally, this process will not take up too much of your time).
### 1.3 Quick Verification
To facilitate your quick start with the Jidie Shikong AI deployment tool, we have prepared the quick_start script tool (under the root directory of the SDK) for you. You can quickly verify and familiarize yourself with the entire process of AI model deployment by running this tool.
Usage Instructions (Example):
~~~
$ quick_start
Usage: /opt/spacemit-ai-sdk.v1.1.0/quick_start [paddle|demo|all]
~~~
Among them, the parameter paddle indicates a quick demonstration of the Paddle-related model deployment process (including: resource download, model conversion, model quantization, accuracy verification, simulation running, etc.); the parameter demo indicates a quick demonstration of the compilation and testing processes of the C/C++ application; the parameter all indicates a quick demonstration of all tasks (currently: paddle and demo).
Note: When you execute quick_start paddle or quick_start all for the first time, the script tool will automatically download and unzip the quick_start.tar.gz data package (Directory Structure Example):
~~~
dataset/
├── data
│   └── Imagenet
│       ├── Calib            // Calibration dataset
│       ├── Test             // Test dataset
│       ├── calib_list.txt   // Calibration data list
│       └── test_label.txt   // Test data label
└── paddle
    └── classification
        ├── infer.py         // Inference test script
        └── resnet50
            ├── inference.json  // Quantization configuration file
            ├── inference.pdiparams
            └── inference.pdmodel
~~~
## 2 Model Preparation
Taking the Paddle model in quick_start as an example (other framework models are similar, please refer to the content of Section 3. Model Conversion for details), you can also download and unzip the example model through the following command:
~~~
$ wget https://bj.bcebos.com/paddle2onnx/model_zoo/resnet50.tar.gz && tar xvf resnet50.tar.gz
$ tree resnet50
resnet50
├── inference.pdiparams
└── inference.pdmodel
0 directories, 2 files
~~~
## 3 Model Conversion (and Quantization)
spine convert is mainly responsible for the one-click conversion and quantization of the algorithm model. Taking the test_convert_paddle task in the quick_start script tool as an example, in the development environment, you can complete the one-click conversion of the model by executing the following spine convert paddle command:
~~~
$ spine convert paddle --model_dir resnet50 \
                        --model_filename inference.pdmodel \
                        --params_filename inference.pdiparams \
                        --save_file resnet50/inference.onnx
[Paddle2ONNX] Start to parse PaddlePaddle model...
[Paddle2ONNX] Model file path: resnet50/inference.pdmodel
[Paddle2ONNX] Paramters file path: resnet50/inference.pdiparams
[Paddle2ONNX] Start to parsing Paddle model...
[Paddle2ONNX] Use opset_version = 9 for ONNX export.
[Paddle2ONNX] PaddlePaddle model is exported as ONNX format now.
~~~
Note: --model_dir specifies the Paddle model directory, --model_filename specifies the Paddle model file, --params_filename specifies the Paddle model parameter file, and --save_file specifies the path of the output ONNX model file. You can refer to the content of Section 3. Model Conversion to learn more details about model conversion and parameter introduction.
Note: The --config, -c parameter can specify the quantization configuration file to further quantize the floating-point model into a fixed-point model:
~~~
$ spine convert paddle --model_dir resnet50 \
                        --model_filename inference.pdmodel \
                        --params_filename inference.pdiparams \
                        --save_file resnet50/inference.onnx \
                        --config resnet50/inference.json
$ tree resnet50
resnet50
├── inference.json
├── inference.onnx
├── inference.pdiparams
├── inference.pdmodel
├── inference.q.onnx        // Quantized model file
└── inference.q_report.md   // Quantization analysis report
~~~
Example of the configuration file inference.json:
~~~
    "model_parameters": {
        "onnx_model": "resnet50/inference.onnx",
        "output_model_file_prefix": "inference.q",
        "working_dir": "resnet50"
    },
    "calibration_parameters": {
        "calibration_step": 500,
        "calibration_device": "cuda",
        "calibration_type": "default",
        "input_parametres": [
            {
                "input_name": "inputs",
                "input_shape": [
                    1,
                    3,
                    224,
                    224
                ],
                "file_type": "img",
                "mean_value": [
                    123.675,
                    116.28,
                    103.53
                ],
                "std_value": [
                    58.395,
                    57.12,
                    57.375
                ],
                "preprocess_file": "IMAGENET",
                "data_list_path": "dataset/data/Imagenet/calib_list.txt"
            }
        ]
    },
    "quantization_parameters": {
        "precision_level": 0
    }
~~~
Among them, the dataset directory is unzipped from the content of Section 5. Model Quantization.

## 4 Accuracy Verification
The accuracy evaluation metrics vary in different application scenarios and fields. Taking the Paddle classification model in quick_start as an example, by executing the following command in the development environment, you can quickly compare and verify the accuracy of the quantized model on the specified test dataset:
~~~
# eval converted onnx model(fp32)
$ /opt/spacemit-ai-sdk.v1.1.0/spacengine - toolkit/bin/python3 -m pip install opencv - python -i https://pypi.tuna.tsinghua.edu.cn/simple
$ /opt/spacemit-ai-sdk.v1.1.0/spacengine - toolkit/bin/python3 \
    dataset/paddle/classification/infer.py --model resnet50/inference.onnx \
    --image_dir dataset/data/Imagenet/Test --label_path dataset/data/Imagenet/test_label.txt
Prec@1 0.750 = 45 / 60
Prec@5 0.967 = 58 / 60
# eval quantized onnx model(int8)
$ /opt/spacemit-ai-sdk.v1.1.0/spacengine - toolkit/bin/python3 \
    dataset/paddle/classification/infer.py --model resnet50/inference.q.onnx \
    --image_dir dataset/data/Imagenet/Test --label_path dataset/data/Imagenet/test_label.txt
Prec@1 0.750 = 45 / 60
Prec@5 0.933 = 56 / 60
~~~
## 5 Simulation Testing
### 5.1 Test Data
spine helper test provides the function of creating a standard ONNX test dataset. Taking the test_simulate_paddle_qemu function in quick_start and the above Paddle model as examples, run the following command in the development environment:
~~~
$ spine helper test --model_path resnet50/inference.onnx --root_path test_data --test_name resnet50 -r 4 -f p2o.DynamicDimension.0:1 --save_output
[INFO] create random test data under /home/workspace/test_data/resnet50/test_data_set_0 done
[INFO] create random test data under /home/workspace/test_data/resnet50/test_data_set_1 done
[INFO] create random test data under /home/workspace/test_data/resnet50/test_data_set_2 done
[INFO] create random test data under /home/workspace/test_data/resnet50/test_data_set_3 done
$ tree test_data/resnet50/
test_data/resnet50/
├── inference.onnx
├── test_data_set_0
│   ├── input_0.pb
│   └── output_0.pb
├── test_data_set_1
│   ├── input_0.pb
│   └── output_0.pb
├── test_data_set_2
│   ├── input_0.pb
│   └── output_0.pb
└── test_data_set_3
    ├── input_0.pb
    └── output_0.pb
4 directories, 9 files
~~~
Note: --model_path specifies the path of the ONNX model, --root_path specifies the root directory of the test dataset, --test_name specifies the name of the test case, -r specifies the number of test cases, -f specifies the shape corresponding to the symbolic parameter, and --save_output specifies the need to save the x86 test output results. For more details about the parameters, please refer to the content of the 5.2.5 Data Construction chapter.
### 5.2 Simulation Running
spine simulate provides the model simulation testing function on the PC side (currently only for the x86 architecture). This function is based on the qemu-riscv64 and x86_64-riscv64 cross-compilation tools pre-installed in the SDK, and supports the standard ONNX model and the model quantified by the Jintie Space-Time AI deployment tool, and ensures that the inference result is completely consistent with the running result on the `chip side`. Taking the generated test dataset as an example:
```
$ spine simulate test_data/resnet50/
result:
        Models: 1
        Total test cases: 4
                Succeeded: 4
                Not implemented: 0
                Failed: 0
        Stats by Operator type:
                Not implemented(0):
                Failed:
Failed Test Cases:
```
[Note] `spine simulate` encapsulates the `spacemit - ort/bin/onnx_test_runner` test tool under the SDK directory. If there are `standard` output results in the test case directory (e.g., when `spine helper test` constructs the test data, the x86 output results are saved by specifying `--save_output`), then the `spine simulate test_data` command will also perform accuracy comparison on the simulation test output results on the `chip side` (default: relative error `1e - 5`, absolute error `1e - 5`). For more details about the parameters, please refer to the content of the 5.1.2 `spine simulate` chapter.
## 6 Performance Testing
The `spacemit - ort/bin/onnxruntime_perf_test` tool under the SDK directory supports quickly testing the pure inference performance of the AI algorithm model on the `chip side`. This tool is compatible with ONNX models, so you can easily use it to evaluate the performance of the original ONNX floating-point model and the Jintie Space-Time fixed-point model after conversion (and/or quantization). Taking the above quantized Paddle model as an example, execute the following command on the `chip side`:
```
bianbu@k1:~/desktop$ onnxruntime_perf_test inference.q.onnx -m times -r 100 -e spacemit
using SpaceMITExecutionProvider 
Session creation time cost: 2.74716 s
First inference time cost: 85 ms
Total inference time cost: 6.22935 s
Total inference requests: 100
Average inference time cost: 62.2935 ms
Total inference run time: 6.23146 s
Number of inferences per second: 16.0476 
Total CPU usage: 382 %
Peak working set size: 114634752 bytes
Min Latency: 0.0529422 s
Max Latency: 0.0912857 s
P50 Latency: 0.0603562 s
P90 Latency: 0.0741593 s
P95 Latency: 0.0837052 s
P99 Latency: 0.0912857 s
P999 Latency: 0.0912857 s
```
[Note] `-m times` specifies the test mode as a fixed number of tests, `-r 100` specifies 100 inferences for the test, and `-e spacemit` enables the Jintie Space-Time backend acceleration. For more details about the parameters, please refer to the content of the 6.1 Performance Testing chapter.
## 7 Application Development
The Bianbu AI Support Library is an upper-layer application development support library independently developed by Jintie Space-Time, which is ready to use and only requires one or two lines of code to easily integrate AI tasks such as image classification and object detection.
### Demo Compilation and Running Example
```
# One-click cross-compilation
$ cd spacemit-ai-sdk.v1.1.0/bianbu - ai - support/demo
$ bash build.sh
...
[INFO] Building demos done.
# One-click running test
$ bash build.sh --test 
...
[INFO] Prepare...
[INFO] Smoke test with image classification task...
[INFO] Run: build/classification_demo data/models/squeezenet1.1 - 7.onnx data/labels/synset.txt data/imgs/dog.jpg
...
Classify result: n02113023 Pembroke, Pembroke Welsh corgi
...
[INFO] Smoke test with object detection task...
[INFO] Run: build/detection_demo data/models/nanodet - plus - m_320.onnx data/labels/coco.txt data/imgs/person0.jpg result0.jpg
...
bbox[ 0] x1y1x2y2: (1346, 404,1525, 777), score: 0.727, label_text: person
bbox[ 1] x1y1x2y2: (1476, 412,1598, 766), score: 0.605, label_text: person
bbox[ 2] x1y1x2y2: ( 581, 447, 666, 706), score: 0.602, label_text: person
bbox[ 3] x1y1x2y2: (1840, 430,1919, 654), score: 0.470, label_text: person
bbox[ 4] x1y1x2y2: ( 459, 447, 551, 707), score: 0.462, label_text: person
bbox[ 5] x1y1x2y2: ( 689, 468, 745, 601), score: 0.430, label_text: person
bbox[ 6] x1y1x2y2: ( 660, 460, 722, 641), score: 0.401, label_text: person
```
[Hint] You can refer to the content of the 6.2.1.4 Demo Description chapter to learn more about the existing Demo information. You can also refer to the relevant introduction in the 6.2.2 AI Engine chapter to learn about the specific usage of the Jintie Space-Time AI inference engine.
## 8 Frequently Asked Questions (FAQ)
### 8.1 Does the deployment tool have a Windows or Mac version?
Answer: Not for the moment, but it may be provided in the future.