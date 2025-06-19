# Model Conversion
This chapter mainly introduces the usage details of the model conversion tool. During the conversion process, the tool will complete the processes of model format conversion, structure optimization, and calibration quantization (if you also specify the model quantization configuration file). After the conversion is completed, the tool will output a model that can run on the "chip end" of Spacemit.

[Note]
The suffix of the Spacemit model file (currently) is `.onnx`, which is compatible with the standard ONNX format model;

If you also specify the model quantization configuration file, you will also get a quantized model file.
## 1 Usage Instructions
```
$ spine convert -h
usage: spine convert [-h] {onnx,tf1,tf2,paddle,caffe}...
positional arguments:
  {onnx,tf1,tf2,paddle,caffe}
optional arguments:
  -h, --help            show this help message and exit
```
The conversion tool currently predefines support for model format conversion from four frameworks: ONNX, TensorFlow, Paddle, and Caffe. Since the Spacemit AI inference engine is compatible with the ONNX model format (opset >= 7), for models in other frameworks such as Pytorch and MXNet, you can first convert the model to the ONNX format and then call the conversion tool (for details, refer to the content in Section 3.1.5 Other Models).

### 1.1 ONNX Model

In addition to model quantization, the conversion tool also provides functions such as subgraph extraction, shape modification, and model file checking for ONNX models.

#### 1.1.1 Usage Instructions
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
#### 1.1.2 Parameter Description
|Parameter|Necessary/Optional|Default Value|Description|
|---|---|---|---|
|-h, --help|Optional|None|Print the usage instructions|
|--input|Necessary|None|Input model path|
|--output|Necessary|None|Output model path|
|--checker|Optional|False|Enable model checking|
|--onnxsim|Optional|False|Enable onnxsim (https://github.com/daquexian/onnx-simplifier) to optimize the model|
|--verbose, -v|Optional|0|Enable debugging information|
|--inputs|Optional|None|Reassign the model input nodes and shapes (optional), format example: input_1[n1,n2],input2[n3,n4],...|
|--outputs|Optional|None|Reassign the model output nodes and shapes (optional), format example: input_1[n1,n2],input2[n3,n4],...|
|-f, --free_dim_param|Optional|None|Reassign the shape of certain input data, format example: dimension_name:override_value [...]|
|-F, --free_dim_denotation|Optional|None|Reassign the shape of certain input data, format example: dimension_den0tation:override_value [...]|
|--config, -c|Optional|None|Path of the model calibration configuration file (refer to Chapter  Model Quantization for details)|

#### 1.1.3 Usage Example

- 1.1.3.1 Extract the model backbone
Example model: https://github.com/onnx/models/blob/main/validated/vision/object_detection_segmentation/yolov3/model/yolov3-12.onnx
```
$ spine convert onnx --input yolov3-12.onnx \
                      --output yolov3-12-backbone.onnx \
                      --inputs input_1 \
                      --outputs Transpose__467:0,Transpose__469:0,Transpose__472:0
```

[Note] You can use the Netron visualization tool to view the input and output names (and shapes) of the network you need to extract.

- 1.1.3.2 Modify the model input shape
`spine convert onnx` currently provides two ways to modify the input and/or output shape information of the model:
    - Through `--inputs` and/or `--outputs` (suitable for scenarios where the model has fewer inputs or outputs)
```
$ spine convert onnx --input yolov3-12.onnx \
                      --output yolov3-12-1x3x416x416.onnx \
                      --inputs input_1[1,3,416,416],image_shape[1,2]
```

[Note] When modifying the shape information through `--inputs` and/or `--outputs`, if the model has multiple inputs (or outputs), you need to explicitly specify the shape information of all inputs (or outputs) (even if you do not modify the shape information of some inputs or outputs). Otherwise, `spine convert onnx` will understand that you want to extract the specified network structure in the model.
    - Through `-f, --free_dim_param` and/or `-F, --free_dim_denotation` (suitable for scenarios where the model input or output has symbolic parameters)
Example model abs_free_dimensions.onnx link: https://github.com/microsoft/onnxruntime/blob/v1.15.1/onnxruntime/test/testdata/abs_free_dimensions.onnx

```
$ spine convert onnx --input yolov3-12.onnx --output yolov3-12-1x3x416x416.onnx -f unk__577:416 unk__578:416
$ spine convert onnx --input abs_free_dimensions.onnx -f Dim1:2 -F DATA_CHANNEL:3
```

[Note] When modifying the shape information through `-f, --free_dim_param` and/or `-F, --free_dim_denotation`, you need to first determine the target `symbolic parameter` (e.g. 👆 "unk__577" and "unk__578") through the Netron visualization tool or the auxiliary function command `spine helper info`. If there is no `symbolic parameter` in the shape information, you can choose to modify the shape information through `--inputs` and/or `--outputs`.
Attached: Explanation of `symbolic parameter`

- The model input or output shape information has `symbolic parameter`:
  
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
Total number of input;1
input_1 name: input_1
tensor: float32[unk576,3,unk577,unk578]
image_shape name: image_shape
tensor.float32[unk_579,2]
```
- The model input or output shape information does not have `symbolic parameter`:
  
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
dim { dim value:3
dim
3 dim 0
name:"image shape"
type
input_1 name: input_1
tensor: float32[N,3,?,?]
image_shape name: image_shape
tensor: float32[N,2]
```
### 1.2 TensorFlow Model
#### 1.2.1 Usage Instructions

Take tf2 as an example (tf1 is similar):
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
#### 1.2.2 Parameter Description

-c, --config: Path of the model calibration configuration file (refer to Chapter  Model Quantization for details)

The remaining parameters are the same as Tensorflow - ONNX(tf2onnx) Parameters
[Precautions]:
- The `--input` parameter is the same as `--graphdef`, and the suffix of the input model file name is usually `pb`
- The input corresponding to `--saved - model` is a folder, refer to the example:
```
classification/inception_v3_tf2/
├── saved_model.pb
└── variables
    ├── variables.data - 00000 - of - 00001
    └── variables.index
```
#### 1.2.3 Usage Example

[Note] You can refer to [Tensorflow - ONNX(tf2onnx) Getting Started](https://github.com/onnx/tensorflow-onnx#getting-started])

### 1.3 Paddle model

#### 1.3.1 Usage instructions
```
$ spine convert paddle -h
usage: spine convert paddle [-h] --model_dir MODEL_DIR [--model_filename MODEL_FILENAME] [--params_filename PARAMS_FILENAME] --save_file SAVE_FILE
                            [--opset_version OPSET_VERSION] [--input_shape_dict INPUT_SHAPE_DICT] [--enable_dev_version ENABLE_DEV_VERSION]
                            [--enable_onnx_checker ENABLE_ONNX_CHECKER] [--enable_paddle_fallback ENABLE_PADDLE_FALLBACK] [--version] [--output_names OUTPUT_NAMES]
                            [--enable_auto_update_opset ENABLE_AUTO_UPDATE_OPSET] [--external_filename EXTERNAL_FILENAME] [--config CONFIG]

optional arguments:
  -h, --help            show this help message and exit
  --model_dir MODEL_DIR, -m MODEL_DIR
                        PaddlePaddle model directory. If params are stored in a single file, you need to define '--model_filename' and 'params_filename'.
  --model_filename MODEL_FILENAME, -mf MODEL_FILENAME
                        PaddlePaddle model's network file name, which is under the directory set by --model_dir.
  --params_filename PARAMS_FILENAME, -pf PARAMS_FILENAME
                        PaddlePaddle model's param file name (param files combined in a single file), which is under the directory set by --model_dir.
  --save_file SAVE_FILE, -s SAVE_FILE
                        file path to save the onnx model.
  --opset_version OPSET_VERSION, -ov OPSET_VERSION
                        set the onnx opset version for export.
  --input_shape_dict INPUT_SHAPE_DICT, -isd INPUT_SHAPE_DICT
                        define input shapes, e.g., --input_shape_dict="{'image':[1, 3, 608, 608]}" or --input_shape_dict="{'image':[1, 3, 608, 608], 'im_shape': [1, 2],
                        'scale_factor': [1, 2]}".
  --enable_dev_version ENABLE_DEV_VERSION
                        whether to use the new version of Paddle2ONNX which is under development. Default is True.
  --enable_onnx_checker ENABLE_ONNX_CHECKER
                        whether to check the onnx model validity. Default is True.
  --enable_paddle_fallback ENABLE_PADDLE_FALLBACK
                        whether to use PaddleFallback for custom ops. Default is False.
  --version, -v         get the version of paddle2onnx.
  --output_names OUTPUT_NAMES, -on OUTPUT_NAMES
                        define output names, e.g., --output_names="["output1"]" or --output_names="["output1", "output2", "output3"]" or
                        --output_names="{"Paddleoutput":"Onnxoutput"}".
  --enable_auto_update_opset ENABLE_AUTO_UPDATE_OPSET
                        whether to enable auto_update_opset. Default is True.
  --external_filename EXTERNAL_FILENAME
                        The filename of external_data when the model is bigger than 2G.
  --config CONFIG, -c CONFIG
                        config.

                        config file path for calibration.
```

#### 1.3.2 Parameter descriptions

-c, --config: The path of the model calibration configuration file (for details, refer to Chapter Model Quantization).
Other parameters are the same as Paddle2ONNX Parameters.

#### 1.3.3 Usage example
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

### 1.4 Caffe model

【Note】Currently, only the conversion support for standard Caffe (GitHub) models is guaranteed.

#### 1.4.1 Usage instructions
```
$ spine convert caffe -h
usage: spine convert caffe [-h] --input INPUT --output OUTPUT [--verbose]
                             [--config CONFIG]

optional arguments:
  -h, --help            show this help message and exit
  --input INPUT         input caffe model path (basename).
  --output OUTPUT       output jdsk model path.
  --verbose, -v         verbose message, option is additive.
  --config CONFIG, -c CONFIG
                        config file path for calibration.
```

#### 1.4.2 Parameter descriptions
|Parameter|Necessary/Optional|Default value|Description|
|---|---|---|---|
|-h, --help|Optional|None|Print usage instructions.|
|--input|Necessary|None|Input model path (without the suffix name. By default, the corresponding.caffemodel and.prototxt files will be loaded).|
|--output|Necessary|None|Output model path.|
|--verbose, -v|Optional|0|Enable debug information.|
|--config, -c|Optional|None|The path of the model calibration configuration file (for details, refer to Chapter  Model Quantization).|

#### 1.4.3 Usage example
```
# download caffe test model
$ wget http://dl.caffe.berkeleyvision.org/bvlc_alexnet.caffemodel
$ wget https://github.com/BVLC/caffe/blob/master/models/bvlc_alexnet/deploy.prototxt -O bvlc_alexnet.prototxt

# convert caffe model to onnx (without quantization)
$ spine convert caffe --input bvlc_alexnet --output bvlc_alexnet.onnx -v
```

### 1.5 Other models
Since the AI inference engine of Jidispace is compatible with the ONNX model format (opset >= 7), for models under other frameworks such as Pytorch and MXNet, you can first convert the model into the ONNX format and then call the conversion tool:

- Pytorch_to_Onnx tutorial example
- MXNet_to_Onnx tutorial example
- Cntk_to_Onnx tutorial example

## 2 Custom operators
### 2.1 ONNX model

Please refer to the relevant usage introduction of `AI inference engine` in Chapter 6. Model Deployment.

### 2.2 Other models

For models under other frameworks, we recommend that you first convert the model into the ONNX model format and then refer to Chapter 3.2.1 ONNX model for processing.

## 3 Frequently Asked Questions (FAQ)
