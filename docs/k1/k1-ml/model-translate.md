# 3. 模型转换

本章节主要介绍模型转换工具的使用细节。转换期间，工具会完成模型的格式转换、结构优化以及校准量化（如果您还指定了模型量化配置文件）等流程。转换完成后，工具将输出一个可以在进迭时空`芯片端`运行的模型。

【说明】
（当前）进迭时空模型文件后缀名为`.onnx`，兼容标准 ONNX 格式模型；
如果您还指定了模型量化配置文件，那您还将得到一个量化后的模型文件。

## 3.1 使用说明
```
$ spine convert -h
usage: spine convert [-h] {onnx,tf1,tf2,paddle,caffe}...

positional arguments:
  {onnx,tf1,tf2,paddle,caffe}

optional arguments:
  -h, --help            show this help message and exit
```
转换工具目前预置了 ONNX、TensorFlow、Paddle、Caffe 四种框架的模型格式转换支持。由于进迭时空 AI 推理引擎兼容 ONNX 模型格式（opset >= 7），故对于 Pytorch、MXNet 等其他框架下的模型，您可以通过先将模型转换成 ONNX 格式，再调用转换工具（详情可以参阅 3.1.5 其他模型 章节内容）。

### 3.1.1 ONNX 模型
除模型量化外，转换工具针对 ONNX 模型还提供了子图提取、shape 修改、模型文件检查等功能。

#### 3.1.1.1 使用说明
```
$ spine convert onnx -h
usage: spine convert onnx [-h] --input INPUT --output OUTPUT [--checker] [--onnxsim] [--verbose] [--inputs INPUTS] [--outputs OUTPUTS]
                            [--free_dim_param FREE_DIM_PARAM [FREE_DIM_PARAM...]]
                            [--free_dim_denotation FREE_DIM_DENOTATION [FREE_DIM_DENOTATION...]] [--config CONFIG]

optional arguments:
  -h, --help            show this help message and exit
  --input INPUT         input onnx model path
  --output OUTPUT       output jdsk model path
  --checker             enable onnx.checker.check_model
  --onnxsim             enable onnxsim(https://github.com/daquexian/onnx-simplifier) to simplify the onnx model
  --verbose, -v         verbose message, option is additive
  --inputs INPUTS       expected input tensor names with shapes(option)
  --outputs OUTPUTS     expected output tensor names with shapes(option)
  --free_dim_param FREE_DIM_PARAM [FREE_DIM_PARAM...], -f FREE_DIM_PARAM [FREE_DIM_PARAM...]
                        [dimension_name:override_value] specify a value(must > 0) to override a free dimension by name(dim.dim_param).
  --free_dim_denotation FREE_DIM_DENOTATION [FREE_DIM_DENOTATION...], -F FREE_DIM_DENOTATION [FREE_DIM_DENOTATION...]
                        [dimension_denotation:override_value] specify a value(must > 0) to override a free dimension by
                        denotation(dim.denotation).
  --config CONFIG, -c CONFIG
                        config file path for calibration
```

#### 3.1.1.2 参数说明
|参数|必要/可选|默认值|说明|
|---|---|---|---|
|-h, --help|可选|无|打印使用说明|
|--input|必要|无|输入模型路径|
|--output|必要|无|输出模型路径|
|--checker|可选|False|使能模型检查|
|--onnxsim|可选|False|使能 onnxsim（https://github.com/daquexian/onnx-simplifier）优化模型|
|--verbose, -v|可选|0|使能调试信息|
|--inputs|可选|None|重新指定模型输入节点及 shape（可选），格式示例：input_1[n1,n2],input2[n3,n4],...|
|--outputs|可选|None|重新指定模型输出节点及 shape（可选），格式示例：input_1[n1,n2],input2[n3,n4],...|
|-f, --free_dim_param|可选|None|重新指定某些输入数据 shape，格式示例：dimension_name:override_value [...]|
|-F, --free_dim_denotation|可选|None|重新指定某些输入数据 shape，格式示例：dimension_den0tation:override_value [...]|
|--config, -c|可选|None|模型校准配置文件路径（详情参阅 4. 模型量化 章节）|

#### 3.1.1.3 使用示例
- 3.1.1.3.1 提取模型 backbone
示例模型：https://github.com/onnx/models/blob/main/validated/vision/object_detection_segmentation/yolov3/model/yolov3-12.onnx
```
$ spine convert onnx --input yolov3-12.onnx \
                      --output yolov3-12-backbone.onnx \
                      --inputs input_1 \
                      --outputs Transpose__467:0,Transpose__469:0,Transpose__472:0
```
【提示】您可以通过 Netron 可视化工具，查看需要提取的网络的输入输出名称（及 shape）。

- 3.1.1.3.2 修改模型输入 shape
`spine convert onnx`当前提供了两种方式来修改模型的输入和/或输出 shape 信息：
    - 通过`--inputs`和/或`--outputs`（适用于模型输入或输出个数较少场景）
```
$ spine convert onnx --input yolov3-12.onnx \
                      --output yolov3-12-1x3x416x416.onnx \
                      --inputs input_1[1,3,416,416],image_shape[1,2]
```
【注意】通过`--inputs`和/或`--outputs`修改 shape 信息时，如果模型有多个输入（或输出），则您需要显示指定全部输入（或输出）的 shape 信息（即使其中某些输入或输出的 shape 信息您并没有修改）。否则，`spine convert onnx`会理解为您想要提取模型中指定的网络结构。
    - 通过`-f, --free_dim_param`和/或`-F, --free_dim_denotation`（适用于模型输入或输出存在符号参数场景）
示例模型 abs_free_dimensions.onnx 链接：https://github.com/microsoft/onnxruntime/blob/v1.15.1/onnxruntime/test/testdata/abs_free_dimensions.onnx
```
$ spine convert onnx --input yolov3-12.onnx --output yolov3-12-1x3x416x416.onnx -f unk__577:416 unk__578:416
$ spine convert onnx --input abs_free_dimensions.onnx -f Dim1:2 -F DATA_CHANNEL:3
```
【注意】通过`-f, --free_dim_param`和/或`-F, --free_dim_denotation`修改 shape 信息时，您需要先通过 Netron 可视化工具或辅助功能指令`spine helper info`确定需要修改的目标`符号参数`（e.g. 👆 “unk__577” 和 “unk__578”）。如果 shape 信息中不存在`符号参数`，您可以选择通过`--inputs`和/或`--outputs`方式修改 shape 信息。

附：`符号参数`说明
- 模型输入或输出 shape 信息存在`符号参数`：
```
ion_segmentation>yolov3>model >yolov3-12.onnx 口 X MODEL PROPERTIES X
format ONNXv5
producer keras2onnx 1.5.1
domain onnx
imports ai.onnx v12
graph model_1
INPUTS
$bianbu helper info --onnx datasets/abs_free_dimensions.onnx -si [name:"x
type{ tensor_type {
elem_type:1
shape{
dim {
dim param: "Dim1"
denotation:"DATA BATCH"
-f,-fredim_ param
dimi
dim_param:"Dim2" denotation:"DATA CHANNEL" -F,-free_dim_denotation
dim 
dim value:5
1
Total number of input;1
input_1 name: input_1
tensor: float32[unk576,3,unk577,unk578]
image_shape name: image_shape
tensor.float32[unk_579,2]
```
- 模型输入或输出 shape 信息不存在`符号参数`：
```
_segmentation>tiny-yolov3>model>tiny-yolov3-.. 口 X X
MODEL PROPERTIES
format ONNX v6
producer keras2onnx 1.6.0
domain onnx
imports. ai.onnx v11
graph model 1
INPUTS
$ bianbu helper info --onnx tiny-yolov3-11.onnx -si [name:"input1"
type { tensor_type { elem_type:1
shape
dim
dim param:"N"
}
dim { dim value:3
dim
3 dim 0
P
name:"image shape"
type
input_1 name: input_1
tensor: float32[N,3,?,?]
image_shape name: image_shape
tensor: float32[N,2]
```

### 3.1.2 Tensorflow 模型

#### 3.1.2.1 使用说明
以 tf2 为例（tf1 类似）：
```
$ spine convert tf2 -h
usage: spine convert tf2 [-h] [--input INPUT] [--graphdef GRAPHDEF] [--saved-model SAVED_MODEL] [--tag TAG] [--signature_def SIGNATURE_DEF]
                           [--concrete_function CONCRETE_FUNCTION] [--checkpoint CHECKPOINT] [--keras KERAS] [--tflite TFLITE] [--tfjs TFJS]
                           [--large_model] --output OUTPUT [--inputs INPUTS] [--outputs OUTPUTS] [--ignore_default IGNORE_DEFAULT]
                           [--use_default USE_DEFAULT] [--rename-inputs RENAME_INPUTS] [--rename-outputs RENAME_OUTPUTS] [--use-graph-names]
                           [--opset OPSET] [--dequantize] [--custom-ops CUSTOM_OPS] [--extra_opset EXTRA_OPSET]
                           [--load_op_libraries LOAD_OP_LIBRARIES] [--continue_on_error] [--verbose] [--debug]
                           [--output_frozen_graph OUTPUT_FROZEN_GRAPH] [--inputs-as-nchw INPUTS_AS_NCHW] [--outputs-as-nchw OUTPUTS_AS_NCHW]
                           [--config CONFIG]

optional arguments:
  -h, --help            show this help message and exit
  --input INPUT         input from graphdef
  --graphdef GRAPHDEF   input from graphdef
  --saved-model SAVED_MODEL
                        input from saved model
  --tag TAG             tag to use for saved_model
  --signature_def SIGNATURE_DEF
                        signature_def from saved_model to use
  --concrete_function CONCRETE_FUNCTION
                        For TF2.x saved_model, index of func signature in __call__ (--signature_def is ignored)
  --checkpoint CHECKPOINT
                        input from checkpoint
  --keras KERAS         input from keras model
  --tflite TFLITE       input from tflite model
  --tfjs TFJS           input from tfjs model
  --large_model         use the large model format (for models > 2GB)
  --output OUTPUT       output model file
  --inputs INPUTS       model input_names (optional for saved_model, keras, and tflite)
  --outputs OUTPUTS     model output_names (optional for saved_model, keras, and tflite)
  --ignore_default IGNORE_DEFAULT
                        comma-separated list of names of PlaceholderWithDefault ops to change into Placeholder ops
  --use_default USE_DEFAULT
                        comma-separated list of names of PlaceholderWithDefault ops to change into Identity ops using their default value
  --rename-inputs RENAME_INPUTS
                        input names to use in final model (optional)
  --rename-outputs RENAME_OUTPUTS
                        output names to use in final model (optional)
  --use-graph-names     (saved model only) skip renaming io using signature names
  --opset OPSET         opset version to use for onnx domain
  --dequantize          remove quantization from model. Only supported for tflite currently.
  --custom-ops CUSTOM_OPS
                        comma-separated map of custom ops to domains in format OpName:domain. Domain 'ai.onnx.converters.tensorflow' is used by
                        default.
  --extra_opset EXTRA_OPSET
                        extra opset with format like domain:version, e.g. com.microsoft:1
  --load_op_libraries LOAD_OP_LIBRARIES
                        comma-separated list of tf op library paths to register before loading model
  --continue_on_error   continue_on_error
  --verbose, -v         verbose output, option is additive
  --debug               debug mode
  --output_frozen_graph OUTPUT_FROZEN_GRAPH
                        output frozen tf graph to file
  --inputs-as-nchw INPUTS_AS_NCHW
                        transpose inputs as from nhwc to nchw
  --outputs-as-nchw OUTPUTS_AS_NCHW
                        transpose outputs as from nhwc to nchw
  --config CONFIG, -c CONFIG
                        config file path for calibration
```

#### 3.1.2.2 参数说明
-c, --config : 模型校准配置文件路径（详情参阅 4. 模型量化 章节）
其余参数同 Tensorflow - ONNX(tf2onnx) Parameters

【注意事项】:
- `--input`参数同`--graphdef`，输入模型文件名后缀通常为`pb`
- `--saved - model`对应的输入为文件夹，参考示例：
```
classification/inception_v3_tf2/
├── saved_model.pb
└── variables
    ├── variables.data - 00000 - of - 00001
    └── variables.index
```

#### 3.1.2.3 使用示例
【提示】您可以参考 [Tensorflow - ONNX(tf2onnx) Getting Started](https://github.com/onnx/tensorflow-onnx#getting-started])

### 3.1.3 Paddle 模型

#### 3.1.3.1 使用说明
```
$ spine convert paddle -h
usage: spine convert paddle [-h] --model_dir MODEL_DIR [--model_filename MODEL_FILENAME] [--params_filename PARAMS_FILENAME] --save_file SAVE_FILE
                            [--opset_version OPSET_VERSION] [--input_shape_dict INPUT_SHAPE_DICT] [--enable_dev_version ENABLE_DEV_VERSION]
                            [--enable_onnx_checker ENABLE_ONNX_CHECKER] [--enable_paddle_fallback ENABLE_PADDLE_FALLBACK] [--version] [--output_names OUTPUT_NAMES]
                            [--enable_auto_update_opset ENABLE_AUTO_UPDATE_OPSET] [--external_filename EXTERNAL_FILENAME] [--config CONFIG]

optional arguments:
  -h, --help            show this help message and exit
  --model_dir MODEL_DIR, -m MODEL_DIR
                        PaddlePaddle model directory, if params stored in single file, you need define '--model_filename' and 'params_filename'.
  --model_filename MODEL_FILENAME, -mf MODEL_FILENAME
                        PaddlePaddle model's network file name, which under directory seted by --model_dir
  --params_filename PARAMS_FILENAME, -pf PARAMS_FILENAME
                        PaddlePaddle model's param file name(param files combined in single file), which under directory seted by --model_dir.
  --save_file SAVE_FILE, -s SAVE_FILE
                        file path to save onnx model
  --opset_version OPSET_VERSION, -ov OPSET_VERSION
                        set onnx opset version to export
  --input_shape_dict INPUT_SHAPE_DICT, -isd INPUT_SHAPE_DICT
                        define input shapes, e.g --input_shape_dict="{'image':[1, 3, 608, 608]}" or--input_shape_dict="{'image':[1, 3, 608, 608], 'im_shape': [1, 2],
                       'scale_factor': [1, 2]}"
  --enable_dev_version ENABLE_DEV_VERSION
                        whether to use new version of Paddle2ONNX which is under developing, default True
  --enable_onnx_checker ENABLE_ONNX_CHECKER
                        whether check onnx model validity, default True
  --enable_paddle_fallback ENABLE_PADDLE_FALLBACK
                        whether use PaddleFallback for custom op, default is False
  --version, -v         get version of paddle2onnx
  --output_names OUTPUT_NAMES, -on OUTPUT_NAMES
                        define output names, e.g --output_names="["output1"]" or --output_names="["output1", "output2", "output3"]" or
                        --output_names="{"Paddleoutput":"Onnxoutput"}"
  --enable_auto_update_opset ENABLE_AUTO_UPDATE_OPSET
                        whether enable auto_update_opset, default is True
  --external_filename EXTERNAL_FILENAME
                        The filename of external_data when the model is bigger than 2G.
  --config CONFIG, -c CONFIG
                        config

                        config file path for calibration
```

#### 3.1.3.2 参数说明
-c, --config : 模型校准配置文件路径（详情参阅 4. 模型量化 章节）
其余参数同 Paddle2ONNX Parameters

#### 3.1.3.3 使用示例
```
# download and extract paddle test model
$ wget https://bj.bcebos.com/paddle2onnx/model_zoo/mobilenetv3.tar.gz && tar xvf mobilenetv3.tar.gz

# convert paddle model to onnx (without quantization)
$ spine convert paddle --model_dir mobilenetv3 \
                        --model_filename inference.pdmodel \
                        --params_filename inference.pdiparams \
                        --save_file inference.onnx \
                        --enable_dev_version True
```

### 3.1.4 Caffe 模型

【提示】当前仅保证对标准 Caffe ( GitHub ) 模型的转换支持。

#### 3.1.4.1 使用说明
```
$ spine convert caffe -h
usage: spine convert caffe [-h] --input INPUT --output OUTPUT [--verbose]
                             [--config CONFIG]

optional arguments:
  -h, --help            show this help message and exit
  --input INPUT         input caffe model path(basename)
  --output OUTPUT       output jdsk model path
  --verbose, -v         verbose message, option is additive
  --config CONFIG, -c CONFIG
                        config file path for calibration
```

#### 3.1.4.2 参数说明
|参数|必要/可选|默认值|说明|
|---|---|---|---|
|-h, --help|可选|无|打印使用说明|
|--input|必要|无|输入模型路径（不含后缀名，默认会加载相应的.caffemodel 和.prototxt 文件）|
|--output|必要|无|输出模型路径|
|--verbose, -v|可选|0|使能调试信息|
|--config, -c|可选|None|模型校准配置文件路径（详情参阅 4. 模型量化 章节）|

#### 3.1.4.3 使用示例
```
# download caffe test model
$ wget http://dl.caffe.berkeleyvision.org/bvlc_alexnet.caffemodel
$ wget https://github.com/BVLC/caffe/blob/master/models/bvlc_alexnet/deploy.prototxt -O bvlc_alexnet.prototxt

# convert caffe model to onnx (without quantization)
$ spine convert caffe --input bvlc_alexnet --output bvlc_alexnet.onnx -v
```

### 3.1.5 其他模型
由于进迭时空 AI 推理引擎兼容 ONNX 模型格式（opset >= 7），故对于 Pytorch、MXNet 等其他框架下的模型，您可以通过先将模型转换成 ONNX 格式，再调用转换工具：
- Pytorch_to_Onnx 教程示例
- MXNet_to_Onnx 教程示例
- Cntk_to_Onnx 教程示例

## 3.2 自定义算子
### 3.2.1 ONNX 模型
请参阅 6. 模型部署 中，`AI 推理引擎` 相关使用介绍。

### 3.2.2 其他模型
对于其他框架下的模型，我们建议您先将模型转换成 ONNX 模型格式，然后参照 3.2.1 ONNX 模型 章节处理。

## 3.3 常见问题（FAQ）