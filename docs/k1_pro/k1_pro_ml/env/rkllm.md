# RKLLM

The RKLLM software stack helps users quickly deploy large language models to Rockchip chips.

![img](https://doc.embedfire.com/linux/rk356x/Ai/zh/latest/_images/framework.jpg)

To use RKNPU, users first need to install the RKLLM-Toolkit tool on their computer, convert trained models to RKLLM format, and then use RKLLM C API for inference on the development board.

RKLLM Toolkit is a software development kit for users to perform model conversion and quantization on PC.  
RKLLM Runtime provides C/C++ programming interfaces for the Rockchip NPU platform, helping users deploy RKLLM models and accelerate LLM application implementation.

The overall development steps of RKLLM are mainly divided into: model conversion and board-side deployment operation.

- Model conversion uses RKLLM-Toolkit to convert pre-trained large language models into RKLLM format.
- Board-side deployment operation calls RKLLM Runtime library to load RKLLM models to Rockchip NPU platform, then performs inference and other operations.

## 1. RKLLM-Toolkit
RKLLM-Toolkit is a development kit that provides users with quantization and conversion of large language models on their computer. Through the interfaces provided by this tool, model conversion and quantization can be conveniently completed.

### 1.1. RKLLM-Toolkit Installation
Pull RKLLM source code and directory file description:

```
# Pull source code
git clone https://github.com/airockchip/rknn-llm.git

# Simple directory structure description
.
├── CHANGELOG.md
├── LICENSE
├── README.md
├── doc             # RKLLM user manual
├── res
├── rkllm-runtime   # Libraries and examples for board-side deployment
├── rkllm-toolkit   # RKLLM-Toolkit installation package and model conversion examples
└── rknpu-driver    # RKNPU driver

5 directories, 3 files
```
Use conda to create an RKLLM1.0.1 environment (refer to the previous section for conda installation):

```
# Create RKLLM_Toolkit environment
conda create -n RKLLM1.0.1 python=3.8
# Activate environment
conda activate RKLLM1.0.1

# Switch to rkllm-toolkit directory
cd rknn-llm/rknn-toolkit/

# Install rkllm_toolkit (modify the file according to the specific version), it will automatically download the dependencies required by RKLLM-Toolkit.
pip3 install packages/rkllm_toolkit-1.0.1-cp38-cp38-linux_x86_64.whl
```
### 1.2. RKLLM-Toolkit Testing
RKLLM-Toolkit provides model conversion and quantization functions, converting large language models in Hugging Face format or GGUF format into RKLLM models, and then using RKLLM Runtime interfaces for board-side inference.

Currently supported models include TinyLLAMA 1.1B, Qwen 1.8B, Qwen2 0.5B, Phi-2 2.7B, Phi-3 3.8B, ChatGLM3 6B, Gemma 2B, InternLM2 1.8B, MiniCPM 2B. For the latest support, please check [rknn-llm](https://github.com/airockchip/rknn-llm?tab=readme-ov-file#support-models).

```
# Switch to the rknn-llm/rknn-toolkit/example directory of the previously pulled repository
cd rknn-llm/rknn-toolkit/examples/huggingface

# The example uses the Qwen-1_8B model, first download the model (or obtain it from a network disk)
git lfs install
git clone https://huggingface.co/Qwen/Qwen-1_8B-Chat
```
Modify the model path in the example program test.py:

test.py
``` python
from rkllm.api import RKLLM

'''
https://huggingface.co/Qwen/Qwen-1_8B-Chat
Download the Qwen model from the above website.
'''

modelpath = './Qwen-1_8B-Chat'
# Initialize RKLLM object
llm = RKLLM()

# Model loading
ret = llm.load_huggingface(model = modelpath)
if ret != 0:
    print('Load model failed!')
    exit(ret)

# Model quantization and building
ret = llm.build(do_quantization=True, optimization_level=1, quantized_dtype='w8a8', target_platform='rk3588')
if ret != 0:
    print('Build model failed!')
    exit(ret)

# Export RKLLM model
ret = llm.export_rkllm("./qwen.rkllm")
if ret != 0:
    print('Export model failed!')
    exit(ret)
```
Call the interfaces provided by RKLLM-Toolkit, initialize the RKLLM object, then call rkllm.load_huggingface() function to load the model. After loading the model, use rkllm.build() function to build the RKLLM model, configure quantization, etc., and finally use rkllm.export_rkllm() function to export the model as an RKLLM model file.

For detailed interface descriptions, please refer to [RKLLM User Manual](https://github.com/airockchip/rknn-llm/tree/main/doc).

Run `test.py` to convert the model into RKLLM model:
```
(RKLLM1.0.1) llh@anhao:/xxx/rkllm-toolkit/examples/huggingface$ python3 test.py

rkllm-toolkit version: 1.0.1
# Omitted..................
Loading checkpoint shards: 100%|███████████████████████████████████████████████████████████████████████████████████████| 2/2 [01:04<00:00, 32.40s/it]
Optimizing model: 100%|███████████████████████████████████████████████████████████████████████████████████████████████| 24/24 [03:25<00:00,  8.56s/it]
Converting model: 100%|█████████████████████████████████████████████████████████████████████████████████████████| 195/195 [00:00<00:00, 2278243.12it/s]
Model has been saved to ./qwen.rkllm!
```
After successfully converting the RKLLM model, a qwen.rkllm file will be generated in the current directory. Copy the qwen.rkllm file to the board system.

## 2. RKLLM Runtime

RKLLM Runtime loads RKLLM models and deploys RKLLM models on RK3576/RK3588 boards.

### 2.1. Kernel Driver Update

RKLLM deployment requires a higher NPU kernel version, as specified in the user manual, version v0.9.6 or above.

```bash
# Execute the following command on the board to query the NPU kernel version
cat /sys/kernel/debug/rknpu/version
```

### 2.2. RKLLM Model Inference Example

Obtain the RKLLM file on the board or copy the file obtained earlier to the board. This tutorial tests directly on the board. If cross-compiling, obtain the [cross-compiler](https://developer.arm.com/downloads/-/gnu-a/10-2-2020-11), then set the cross-compiler path. Other steps are similar.

```bash
# Pull source code
git clone https://github.com/airockchip/rknn-llm.git

# Switch to rkllm-runtime/examples/rkllm_api_demo directory
cd rknn-llm/rkllm-runtime/examples/rkllm_api_demo/
```

Modify the compiler path in the `build-linux.sh` file of the `rkllm_api_demo` example, change it to `GCC_COMPILER_PATH=aarch64-linux-gnu`, then execute `build-linux.sh` to compile the example:

```bash
# Compile
cat@lubancat:~/rknn-llm/rkllm-runtime/examples/rkllm_api_demo$ chmod +x build-linux.sh
cat@lubancat:~/rknn-llm/rkllm-runtime/examples/rkllm_api_demo$ ./build-linux.sh
-- The C compiler identification is GNU 10.2.1
-- The CXX compiler identification is GNU 10.2.1
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /usr/bin/aarch64-linux-gnu-gcc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /usr/bin/aarch64-linux-gnu-g++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Configuring done
-- Generating done
-- Build files have been written to: /xxx/build/build_linux_aarch64_Release
Scanning dependencies of target llm_demo
[ 50%] Building CXX object CMakeFiles/llm_demo.dir/src/main.cpp.o
[100%] Linking CXX executable llm_demo
[100%] Built target llm_demo
```

After compilation, the executable file `llm_demo` will be output in the `build/build_linux_aarch64_Release` directory.  
Execute RKLLM model inference:

```bash
# Switch to build/build_linux_aarch64_Release directory
cd build/build_linux_aarch64_Release/

# Temporarily set rkllm runtime library path, or copy librkllmrt.so file to system library /usr/lib
export LD_LIBRARY_PATH=../../../../runtime/Linux/librkllm_api/aarch64/

# Modify the maximum number of open files
ulimit -HSn 10240

# Copy the RKLLM model converted in the RKLLM-Toolkit testing section to the board, set the model path, and execute rkllm inference:
./llm_demo /path/qwen.rkllm

# Or run binding CPU for testing
# taskset f0 ./llm_demo /path/qwen.rkllm
```

**Test Output:**

```bash
cat@lubancat:/xxxxx/rkllm-runtime/examples/rkllm_api_demo/build/build_linux_aarch64_Release$ ./llm_demo /xxxx/qwen.rkllm
rkllm init start
rkllm-runtime version: 1.0.1, rknpu driver version: 0.9.6, platform: RK3588
rkllm init success

**********************You can input the following question numbers to get answers/or customize input********************

[0] Translate the following modern text into classical Chinese: When the spring breeze is gentle and the sun is bright, the lake surface is calm, without stormy waves, the sky and lake light are connected, a piece of green, vast and boundless; the gulls on the sandbar sometimes fly, sometimes rest, beautiful fish swim around, the flowers and grass on the shore and small sandbar are lush and green.
[1] Write an ancient poem with the theme of "Ode to Plum Blossom", requiring elements such as plum blossoms and white snow.
[2] Upper line: Watching thousands of sails pass by the river
[3] Translate this sentence into Chinese: Knowledge can be acquired from many sources. These include books, teachers and practical experience, and each has its own advantages. The knowledge we gain from books and formal education enables us to learn about things that we have no opportunity to experience in daily life. We can also develop our analytical skills and learn how to view and interpret the world around us in different ways. Furthermore, we can learn from the past by reading books. In this way, we won't repeat the mistakes of others and can build on their achievements.
[4] Translate this sentence into English: RK3588 is a new generation high-end processor with high computing power, low power consumption, strong multimedia capabilities, and rich data interfaces.

*************************************************************************

user: 0
Translate the following modern text into classical Chinese: When the spring breeze is gentle and the sun is bright, the lake surface is calm, without stormy waves, the sky and lake light are connected, a piece of green, vast and boundless; the gulls on the sandbar sometimes fly, sometimes rest, beautiful fish swim around, the flowers and grass on the shore and small sandbar are lush and green.
robot: Translated into classical Chinese

至春风和煦，阳光明媚之时，湖面平静，无惊涛骇浪，天色湖光相连，一片碧绿，广阔无际；沙洲之鸥鸟，时而飞翔，时而停歇，美丽之鱼游来游去，岸上与小洲之花草，青翠欲滴。

user: 3
Translate this sentence into Chinese: Knowledge can be acquired from many sources. These include books, teachers and practical experience, and each has its own advantages. The knowledge we gain from books and formal education enables us to learn about things that we have no opportunity to experience in daily life. We can also develop our analytical skills and learn how to view and interpret the world around us in different ways. Furthermore, we can learn from the past by reading books. In this way, we won't repeat the mistakes of others and can build on their achievements.
robot:

知识可以从许多来源获取。这些包括书籍、教师和实践经验，每种都有其自身的优点。从书籍和正规教育中获得的知识使我们能够在日常生活中无法体验的事情上学习。我们还可以发展我们的分析技能，并学会以不同的方式看待和解释我们周围的世界。此外，我们可以通过阅读书籍来了解过去。通过这种方式，我们将不会重复他人的错误，并可以建立在他们的成就之上。

user:
```

## 3. Reference Links
https://github.com/airockchip/rknn-llm
