# 仿真测试

本章节主要介绍模型仿真测试工具的使用细节。通过仿真测试，您可以在 PC 端（当前仅限 x86 架构）模拟模型在进迭时空芯片上的运行情况，从而快速验证模型的功能和性能。

## 1 工具介绍
`spine simulate`提供 PC 端（当前仅限 x86 架构）的模型仿真测试功能。该功能基于 SDK 中预置的`qemu - riscv64`以及`x86_64 - riscv64`交叉编译工具，支持标准 ONNX 模型及进迭时空 AI 部署工具量化后的模型，并保证推理结果与`芯片端`运行结果完全一致。

### 1.1 使用说明
```
$ spine simulate -h
usage: spine simulate [-h] [--model_path MODEL_PATH] [--root_path ROOT_PATH] [--test_name TEST_NAME] [--output_dir OUTPUT_DIR] [--save_output]
                       [--inputs INPUTS] [--outputs OUTPUTS] [--verbose]

optional arguments:
  -h, --help            show this help message and exit
  --model_path MODEL_PATH, -m MODEL_PATH
                        model path
  --root_path ROOT_PATH, -r ROOT_PATH
                        root path for test data
  --test_name TEST_NAME, -t TEST_NAME
                        test name
  --output_dir OUTPUT_DIR, -o OUTPUT_DIR
                        output dir for test data
  --save_output, -s      save output
  --inputs INPUTS, -i INPUTS
                        input tensor names with shapes(option)
  --outputs OUTPUTS, -e OUTPUTS
                        output tensor names with shapes(option)
  --verbose, -v         verbose message, option is additive
```

### 1.2 参数说明
|参数|必要/可选|默认值|说明|
|---|---|---|---|
|-h, --help|可选|无|打印使用说明|
|--model_path, -m|必要|无|模型路径|
|--root_path, -r|必要|无|测试数据集根目录|
|--test_name, -t|必要|无|测试用例名称|
|--output_dir, -o|可选|无|测试数据输出目录（若未指定，则默认在`--root_path`下创建以`--test_name`命名的子目录）|
|--save_output, -s|可选|False|是否保存 x86 测试输出结果|
|--inputs, -i|可选|None|重新指定模型输入节点及 shape（可选），格式示例：input_1[n1,n2],input2[n3,n4],...|
|--outputs, -e|可选|None|重新指定模型输出节点及 shape（可选），格式示例：input_1[n1,n2],input2[n3,n4],...|
|--verbose, -v|可选|0|使能调试信息|

## 2 测试数据
`spine helper test`提供创建标准 ONNX 测试数据集功能。

### 2.1 使用说明
```
$ spine helper test -h
usage: spine helper test [-h] [--model_path MODEL_PATH] [--root_path ROOT_PATH] [--test_name TEST_NAME] [--output_dir OUTPUT_DIR] [--save_output]
                         [--inputs INPUTS] [--outputs OUTPUTS] [--verbose] [--count COUNT] [--shape SHAPE]
                         [--input_names INPUT_NAMES [INPUT_NAMES...]] [--output_names OUTPUT_NAMES [OUTPUT_NAMES...]]

optional arguments:
  -h, --help            show this help message and exit
  --model_path MODEL_PATH, -m MODEL_PATH
                        model path
  --root_path ROOT_PATH, -r ROOT_PATH
                        root path for test data
  --test_name TEST_NAME, -t TEST_NAME
                        test name
  --output_dir OUTPUT_DIR, -o OUTPUT_DIR
                        output dir for test data
  --save_output, -s      save output
  --inputs INPUTS, -i INPUTS
                        input tensor names with shapes(option)
  --outputs OUTPUTS, -e OUTPUTS
                        output tensor names with shapes(option)
  --verbose, -v         verbose message, option is additive
  --count COUNT, -c COUNT
                        test case count
  --shape SHAPE, -f SHAPE
                        shape for dynamic dimension
  --input_names INPUT_NAMES [INPUT_NAMES...], -in INPUT_NAMES [INPUT_NAMES...]
                        input names
  --output_names OUTPUT_NAMES [OUTPUT_NAMES...], -on OUTPUT_NAMES [OUTPUT_NAMES...]
                        output names
```

### 2.2 参数说明
|参数|必要/可选|默认值|说明|
|---|---|---|---|
|-h, --help|可选|无|打印使用说明|
|--model_path, -m|必要|无|模型路径|
|--root_path, -r|必要|无|测试数据集根目录|
|--test_name, -t|必要|无|测试用例名称|
|--output_dir, -o|可选|无|测试数据输出目录（若未指定，则默认在`--root_path`下创建以`--test_name`命名的子目录）|
|--save_output, -s|可选|False|是否保存 x86 测试输出结果|
|--inputs, -i|可选|None|重新指定模型输入节点及 shape（可选），格式示例：input_1[n1,n2],input2[n3,n4],...|
|--outputs, -e|可选|None|重新指定模型输出节点及 shape（可选），格式示例：input_1[n1,n2],input2[n3,n4],...|
|--verbose, -v|可选|0|使能调试信息|
|--count, -c|可选|1|测试用例数量|
|--shape, -f|可选|无|符号参数对应的`shape`，格式示例：p2o.DynamicDimension.0:1|
|--input_names, -in|可选|无|输入节点名称列表|
|--output_names, -on|可选|无|输出节点名称列表|

### 2.3 数据构建
以`quick_start`中的`test_simulate_paddle_qemu`函数及上述 Paddle 模型为例，在开发环境中运行下述命令：
```
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
```

**说明**：`--model_path`指定 ONNX 模型路径，`--root_path`指定测试数据集根目录，`--test_name`指定测试用例名称，`-r`指定测试用例数量，`-f`指定符号参数对应的`shape`，`--save_output`指定需要保存 x86 测试输出结果。

## 3 仿真运行
以上述生成的测试数据集为例：
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

**说明**：`spine simulate`封装了 SDK 目录下的`spacemit - ort/bin/onnx_test_runner`测试工具。如果测试用例目录下存在`标准`输出结果（e.g. `spine helper test`构造测试数据时，通过`--save_output`指定保存 x86 输出结果），则`spine simulate test_data`命令还会对`芯片端`仿真测试输出结果进行精度比对（默认：相对误差`1e - 5`，绝对误差`1e - 5`）。更多参数细节，可以参阅 5.1.2 `spine simulate`章节内容。

## 4 常见问题（FAQ）
1. 示例：仿真测试时出现错误或异常
答：请检查模型路径、测试数据集根目录、测试用例名称等参数是否正确设置，以及测试数据集是否完整。如果问题仍然存在，请提供详细的错误信息，以便我们更好地帮助您解决问题。