# 2. 快速上手
本章节主要介绍进迭时空 AI 部署工具的使用流程，以帮助您快速上手。
## 2.1 开发环境
当前，进迭时空为您提供 PC (x86_64) 端 Docker 和本地手动配置两种方式（二选一即可）。
提示：我们强烈建议您选择 Docker 方式，以避免本地手动安装过程中出现问题。
### 2.1.1 Docker 环境使用
为了简化您的部署流程，进迭时空提供了包含完整开发环境的 Docker 镜像。您可以在相关 Docker 环境中，进行模型转换、量化、测试等工作。因此，您仅需要正确安装 Docker 环境即可。
Docker 环境安装指南：
- Mac 安装 Docker（桌面版）
- Windows 安装 Docker（桌面版）
- Linux 安装 Docker（桌面版）
  
Docker 环境快速查看（示例）：
~~~
$ sudo docker -v
Docker version 24.0.7, build afdd53b
~~~
提示：如果您无 root 权限，请联系您所使用 PC 设备的管理员，将您的用户名添加到 docker 用户组中。届时，您将不再需要 sudo即可执行 docker 相关命令。
#### 2.1.1.1 获取 Docker 镜像

您可以选择直接从 harbor.spacemit.com的 spacemit-ai项目中，拉取 spacemit-ai-sdk相关镜像（注：x86_64 架构）；也可以选择从 https://archive.spacemit.com/spacemit-ai/spacemit-ai-sdk / 网站手动下载、导入压缩后的镜像文件。
提示：出于带宽等因素考虑，我们推荐您采用 手动下载相关镜像 的方式。
直接拉取（示例）：
~~~
$ sudo docker pull harbor.spacemit.com/spacemit-ai/spacemit-ai-sdk:latest
latest: Pulling from spacemit-ai/spacemit-ai-sdk
...
~~~
提示：如您需要特定版本的部署工具，操作时可将 latest替换为指定版本号或其他标签（e.g. v1.0.0）。
手动下载、导入（示例）：
~~~
$ wget https://archive.spacemit.com/spacemit-ai/spacemit-ai-sdk/spacemit-ai-sdk.v1.1.0.x86_64.img.tar.gz --no - check - certificate
$ sudo docker load -i spacemit-ai-sdk.v1.1.0.x86_64.img.tar.gz
~~~
#### 2.1.1.2 查看 Docker 镜像
示例：
~~~
$ sudo docker images | grep spacemit-ai-sdk
REPOSITORY                                       TAG       IMAGE ID        CREATED       SIZE
harbor.spacemit.com/spacemit-ai/spacemit-ai-sdk  latest    4d239b86f5ea    3 days ago    3.83GB
~~~
#### 2.1.1.3 创建 Docker 容器
创建容器（示例）：
~~~
$ NAME = ai_test # 给您的 docker 容器取个名称
$ sudo docker run -itd --name $NAME --net = host harbor.spacemit.com/spacemit-ai/spacemit-ai-sdk:latest /bin/bash
~~~
提示：如您打算挂载宿主机目录到容器中 `(e.g. 参数 -v <宿主机目录:容器目录>)`，请回避 /opt目录（当前进迭时空 AI 部署工具预置文件夹路径）。
查看容器（示例）：
~~~
$ sudo docker ps -a | grep $NAME
CONTAINER ID   IMAGE                                                   COMMAND        CREATED          STATUS           PORTS    NAMES
0a35d7feebd9   harbor.spacemit.com/spacemit-ai/spacemit-ai-sdk:latest  "/bin/bash"    2 minutes ago    Up 2 minutes              ai_test
~~~
#### 2.1.1.4 进入 Docker 容器
进入容器（示例）：
~~~
$ sudo docker exec -it $NAME /bin/bash
~~~
查询版本（示例）：
~~~
root@xxx:/home/workspace# spine
...
Spacemit AI Toolkit(Version: 2024/01/15)
...
~~~
如您所见，相关输出即为当前 docker 开发环境中，进迭时空 AI 部署工具的版本信息。
注意：当您第一次调用 spine相关命令（及其子命令）时， spine会自动为您安装必要的依赖包，故需要网络支持（正常情况下，该过程不会占用您太多时间）。
### 2.1.2 本地环境搭建
#### 2.1.2.1 环境要求
操作系统：CentOS8 或者 Ubuntu18.04（及以上）
提示：如果您不需要在 PC 端仿真测试，CentOS7 或者 Ubuntu16.04 即可满足环境要求。
#### 2.1.2.2 获取部署工具
SDK 包下载页面：https://archive.spacemit.com/spacemit-ai/spacemit-ai-sdk/
下载示例（e.g. v1.1.0）：
~~~
$ wget https://archive.spacemit.com/spacemit-ai/spacemit-ai-sdk/spacemit-ai-sdk.v1.1.0.x86_64.tar.gz --no - check - certificate
~~~
#### 2.1.2.3 安装部署工具
解压工具（示例）：
~~~
$ tar xzf spacemit-ai-sdk.v1.1.0.x86_64.tar.gz
~~~
目录结构（示例）：
~~~
$ tree -L 1 spacemit-ai-sdk.v1.1.0
spacemit-ai-sdk.v1.1.0
├──.spine.rc -> spine*       // 工具集 环境配置脚本
├── bianbu - ai - support         // 上层应用开发支持库（及示例）
├── quick_start*              // 快速上手示例脚本
├── install.sh*               // 依赖环境安装脚本
├── spacemit - gcc              // x86_64 - riscv64 编译器
├── spacemit - ort              // 推理引擎（含算子库）
├── spacemit - qemu             // x86_64 - riscv64 模拟器
├── spacengine*               // 工具集 入口
├── spacengine - toolkit        // 工具集 Python 环境（paddle/tf2/onnx 等模型相关）
├── spacengine - toolkit - caffe  // 工具集 Python 环境（caffe 官方模型相关）
├── spacengine - toolkit - tf1    // 工具集 Python 环境（tf1 模型相关）
├── spacengine - wheel          // 工具集 Python Wheel 包
├── spacengine - xquant         // 工具集 Python 环境（量化器）
└── spine -> spacengine*      // 工具集 入口（快捷）
~~~
安装依赖（示例）：
~~~
$ bash install.sh
~~~
提示：您可能需要 root 权限来执行相关依赖软件的安装。若您无法获取相关权限，您可以联系您当前使用设备的管理员协助安装，或使用进迭时空为您提供的 AI 部署工具 docker 镜像（参见 2.1 Docker 环境使用 章节内容）。
导入工具（示例）：
~~~
# cd spacemit-ai-sdk.v1.1.0
$ source.spine.rc # 注: 仅对当前终端有效（您也可以编辑 ~/.bashrc 文件，使其对所有终端生效）
~~~
查询版本（示例）：
~~~
root@xxx:/home/workspace# spine
...
Spacemit AI Toolkit(Version: 2024/01/15)
...
~~~
注意：当您第一次调用 spine相关命令（及其子命令）时， spine会自动为您安装必要的依赖包，故需要网络支持（正常情况下，该过程不会占用您太多时间）。
### 2.1.3 快速验证
为方便您快速上手进迭时空 AI 部署工具，我们为您准备了 quick_start脚本工具（SDK 根目录下）。您可以通过运行该工具，快速验证并熟悉 AI 模型部署的全流程。
使用说明（示例）：
~~~
$ quick_start
Usage: /opt/spacemit-ai-sdk.v1.1.0/quick_start [paddle|demo|all]
~~~
其中，参数 paddle指明快速演示 Paddle 相关模型部署流程（包括：资源下载、模型转换、模型量化、精度验证、仿真运行等）；参数 demo指明快速演示 C/C++ 应用程序编译、测试等流程；参数 all指明快速演示所有任务（当前： paddle和 demo ）。
说明：当您首次执行 quick_start paddle或 quick_start all时，脚本工具会自动下载并解压 quick_start.tar.gz 数据包（目录结构示例）：
~~~
dataset/
├── data
│   └── Imagenet
│       ├── Calib            // 校准数据集
│       ├── Test             // 测试数据集
│       ├── calib_list.txt   // 校准数据列表
│       └── test_label.txt   // 测试数据标签
└── paddle
    └── classification
        ├── infer.py         // 推理测试脚本
        └── resnet50
            ├── inference.json  // 量化配置文件
            ├── inference.pdiparams
            └── inference.pdmodel
~~~
## 2.2 模型准备
以 quick_start 中的 Paddle模型为例（其他框架模型类似，详情参阅 3. 模型转换章节内容），您也可以通过下述命令下载、解压示例模型：
~~~
$ wget https://bj.bcebos.com/paddle2onnx/model_zoo/resnet50.tar.gz && tar xvf resnet50.tar.gz
$ tree resnet50
resnet50
├── inference.pdiparams
└── inference.pdmodel

0 directories, 2 files
~~~
## 2.3 模型转换（和量化）
spine convert主要负责算法模型的一键转换和量化。以 quick_start脚本工具中的 test_convert_paddle任务为例，在开发环境中，通过执行下述 spine convert paddle命令即可完成模型的一键转换：
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
说明： --model_dir指定 Paddle 模型目录， --model_filename指定 Paddle 模型文件， --params_filename指定 Paddle 模型参数文件， --save_file指定输出 ONNX 模型文件路径。您可以参阅 3. 模型转换章节内容，了解更多模型转换及参数介绍细节。
提示： --config,-c参数可以指定量化配置文件，从而进一步将浮点模型量化为定点模型：
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
├── inference.q.onnx        // 量化后模型文件
└── inference.q_report.md   // 量化分析报告
~~~
配置文件 inference.json示例：
~~~
{
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
}
~~~
其中， dataset目录解压自 4. 模型量化章节内容。
## 2.4 精度验证
不同应用场景、领域下的精度评估指标各不相同。以 quick_start中的 Paddle 分类模型为例，在开发环境中执行下述命令，可以在指定测试数据集上，快速对比、验证量化后模型的精度：
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
## 2.5 仿真测试
### 2.5.1 测试数据
spine helper test提供创建标准 ONNX 测试数据集功能。以 quick_start中的 test_simulate_paddle_qemu函数及上述 Paddle 模型为例，在开发环境中运行下述命令：
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
说明： --model_path指定 ONNX 模型路径， --root_path指定测试数据集根目录， --test_name指定测试用例名称， -r指定测试用例数量， -f指定符号参数对应的 shape ， --save_output指定需要保存 x86 测试输出结果。更多参数细节，可以参阅 5.2.5 数据构建 章节内容。

### 2.5.2 仿真运行
spine simulate 提供 PC 端（当前仅限 x86 架构）的模型仿真测试功能。该功能基于 SDK 中预置的 qemu-riscv64 以及 x86_64-riscv64 交叉编译工具，支持标准 ONNX 模型及进迭时空 AI 部署工具量化后的模型，并保证推理结果与
与 `芯片端`运行结果完全一致。以上述生成的测试数据集为例：
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
【说明】 `spine simulate`封装了 SDK 目录下的 `spacemit - ort/bin/onnx_test_runner`测试工具。如果测试用例目录下存在 `标准`输出结果（e.g. `spine helper test`构造测试数据时，通过 `--save_output`指定保存 x86 输出结果），则 `spine simulate test_data`命令还会对 `芯片端`仿真测试输出结果进行精度比对（默认：相对误差 `1e - 5`，绝对误差 `1e - 5`）。更多参数细节，可以参阅 5.1.2 `spine simulate`章节内容。

## 2.6 性能测试

SDK 目录下的 `spacemit - ort/bin/onnxruntime_perf_test`工具支持在 `芯片端`快速测试 AI 算法模型的纯推理性能。该工具兼容 ONNX 模型，故您可以很方便的使用它来评测原始 ONNX 浮点模型，以及转换（和/或量化）后的进迭时空定点模型性能。以上述量化后的 Paddle 模型为例，在 `芯片端`执行下述命令：
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
【说明】 `-m times`指定测试模式为固定测试次数， `-r 100`指定测试推理 100 次， `-e spacemit`使能进迭时空后端加速。更多参数细节，可以参阅 6.1 性能测试 章节内容。

## 2.7 应用开发

Bianbu AI Support Library 是进迭时空自研的上层应用开发支持库，开箱即用，仅需一两行代码就可以轻松集成图像分类、目标检测等 AI 任务。

### Demo 编译、运行示例
```
# 一键交叉编译
$ cd spacemit-ai-sdk.v1.1.0/bianbu - ai - support/demo
$ bash build.sh
...
[INFO] Building demos done.

# 一键运行测试
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
【提示】您可以参阅 6.2.1.4 Demo 说明 章节内容，以了解更多现成 Demo 信息。您也可以参阅 6.2.2 AI Engine 章节相关介绍，了解进迭时空 AI 推理引擎的具体使用方式。

## 2.8 常见问题（FAQ）

### 2.8.1 部署工具有 windows 或 mac 版本吗？
答：暂时没有，未来可能会提供。