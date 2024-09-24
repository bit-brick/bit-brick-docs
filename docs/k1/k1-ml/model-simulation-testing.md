# Simulation Testing
This chapter mainly introduces the usage details of the model simulation testing tool. Through simulation testing, you can simulate the running situation of the model on the Jidie Shikong chip on the PC side (currently limited to the x86 architecture), so as to quickly verify the function and performance of the model.

## 1 Tool Introduction

`spine simulate` provides the model simulation testing function on the PC side (currently limited to the x86 architecture). This function is based on the `qemu - riscv64` and `x86_64 - riscv64` cross - compilation tools pre-installed in the SDK, supports standard ONNX models and the models quantified by the Jidie Shikong AI deployment tool, and ensures that the inference results are exactly the same as the running results on the `chip side`.
### 1.1 Usage Instructions

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
### 1.2 Parameter Description

|Parameter|Necessary/Optional|Default Value|Description|
|---|---|---|---|
|-h, --help|Optional|None|Print the usage instructions|
|--model_path, -m|Necessary|None|Model path|
|--root_path, -r|Necessary|None|Root directory of the test dataset|
|--test_name, -t|Necessary|None|Test case name|
|--output_dir, -o|Optional|None|Output directory of the test data (if not specified, a subdirectory named `--test_name` will be created under `--root_path` by default)|
|--save_output, -s|Optional|False|Whether to save the x86 test output results|
|--inputs, -i|Optional|None|Re-specify the model input nodes and shapes (optional), format example: input_1[n1,n2],input2[n3,n4],...|
|--outputs, -e|Optional|None|Re-specify the model output nodes and shapes (optional), format example: input_1[n1,n2],input2[n3,n4],...|
|--verbose, -v|Optional|0|Enable debugging information|

## 2 Test Data

`spine helper test` provides the function of creating a standard ONNX test dataset.

### 2.1 Usage Instructions

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
### 2.2 Parameter Description

|Parameter|Necessary/Optional|Default Value|Description|
|---|---|---|---|
|-h, --help|Optional|None|Print the usage instructions|
|--model_path, -m|Necessary|None|Model path|
|--root_path, -r|Necessary|None|Root directory of the test dataset|
|--test_name, -t|Necessary|None|Test case name|
|--output_dir, -o|Optional|None|Output directory of the test data (if not specified, a subdirectory named `--test_name` will be created under `--root_path` by default)|
|--save_output, -s|Optional|False|Whether to save the x86 test output results|
|--inputs, -i|Optional|None|Re-specify the model input nodes and shapes (optional), format example: input_1[n1,n2],input2[n3,n4],...|
|--outputs, -e|Optional|None|Re-specify the model output nodes and shapes (optional), format example: input_1[n1,n2],input2[n3,n4],...|
|--verbose, -v|Optional|0|Enable debugging information|
|--count, -c|Optional|1|Number of test cases|
|--shape, -f|Optional|None|The `shape` corresponding to the symbolic parameter, format example: p2o.DynamicDimension.0:1|
|--input_names, -in|Optional|None|List of input node names|
|--output_names, -on|Optional|None|List of output node names|

### 2.3 Data Construction

Taking the `test_simulate_paddle_qemu` function in `quick_start` and the above Paddle model as an example, run the following command in the development environment:

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
**Note**: `--model_path` specifies the ONNX model path, `--root_path` specifies the root directory of the test dataset, `--test_name` specifies the test case name, `-r` specifies the number of test cases, `-f` specifies the `shape` corresponding to the symbolic parameter, and `--save_output` specifies the need to save the x86 test output results.

## 3 Simulation Running

Taking the generated test dataset as an example:
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
**Note**: `spine simulate` encapsulates the `spacemit - ort/bin/onnx_test_runner` testing tool under the SDK directory. If there are `standard` output results in the test case directory (e.g., when constructing the test data with `spine helper test`, the x86 output results are saved by specifying `--save_output`), the `spine simulate test_data` command will also perform accuracy comparison on the simulation test output results of the `chip side` (default: relative error `1e - 5`, absolute error `1e - 5`). For more parameter details, please refer to the content of the 5.1.2 `spine simulate` section.

## 4 Frequently Asked Questions (FAQ)

1. Example: Errors or exceptions occur during simulation testing
Answer: Please check whether the parameters such as the model path, the root directory of the test dataset, and the test case name are set correctly, and whether the test dataset is complete. If the problem still exists, please provide detailed error information so that we can better help you solve the problem.