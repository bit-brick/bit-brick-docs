# Tensorflow Lite 
## Introduction
TensorFlow Lite is an open-source software library focused on running machine learning models on mobile and
embedded devices (available at http://www.tensorflow.org/lite). It enables on-device machine learning inference
with low latency and small binary size. TensorFlow Lite also supports hardware acceleration:
- Using the VX Delegate on i.MX 8 series.
- Using the Ethos-U Custom Operator (deprecated) and Ethos-U Delegate on i.MX 93.


The TensorFlow Lite source code for this Yocto Linux release is available at this repository, branch
lf-6.1.22_2.0.0. This repository is a fork of the mainline https://github.com/tensorflow/tensorflow, and it is
optimized for NXP i.MX 8 and i.MX 93 platforms.
Features:
- TensorFlow Lite v2.10.0
- Multithreaded computation with acceleration using Arm Neon SIMD instructions on Cortex-A cores
- Parallel computation using GPU/NPU hardware acceleration (on shader or convolution units)
- C++ and Python API (supported Python version 3)
- Per-tensor and Per-channel quantized models support

## Running image classification example
A Yocto Linux BSP image with machine learning layer included by default contains a simple pre-installed
example called ‘label_image’ usable with image classification models. The example binary file is located at:

`/usr/bin/tensorflow-lite-2.10.0/examples`

To run the example with mobilenet model on the CPU, use the following command:
~~~
$ ./label_image -m mobilenet_v1_1.0_224_quant.tflite -i grace_hopper.bmp -l
 labels.txt
 ~~~
The output of a successful classification on the i.MX 8MPlus SoC for the 'grace_hopper.bmp' input image is as
follows:
~~~
Loaded model mobilenet_v1_1.0_224_quant.tflite
resolved reporter
invoked
average time: 39.271 ms
0.780392: 653 military uniform
0.105882: 907 Windsor tie
0.0156863: 458 bow tie
0.0117647: 466 bulletproof vest
0.00784314: 835 suit
~~~
Note: For floating point layers, the TensorFlow Lite uses XNNPACK delegated by default.


### Running the example on the i.MX 8 platform hardware accelerator

To run the example application on the CPU without using the XNNPACK delegate, use the --use_xnnpack=false
switch.

To run the example with the same model on the GPU/NPU hardware accelerator, add --external_delegate_
path=/usr/lib/libvx_delegate.so (for VX Delegate) command line argument. To differentiate between the 3D
GPU and the NPU, use the USE_GPU_INFERENCE environmental variable. For example, to run the model
accelerated on the NPU hardware using VX Delegate, use this command:
~~~
$ USE_GPU_INFERENCE=0 ./label_image -m mobilenet_v1_1.0_224_quant.tflite
 -i grace_hopper.bmp -l labels.txt --external_delegate_path=/usr/lib/
libvx_delegate.so
~~~
The output of the NPU acceleration on the i.MX 8MPlus processor is as follows:
~~~
INFO: Loaded model mobilenet_v1_1.0_224_quant.tflite
INFO: resolved reporter
Vx delegate: allowed_cache_mode set to 0.
Vx delegate: device num set to 0.
Vx delegate: allowed_builtin_code set to 0.
Vx delegate: error_during_init set to 0.
Vx delegate: error_during_prepare set to 0.
Vx delegate: error_during_invoke set to 0.
EXTERNAL delegate created.
INFO: Applied EXTERNAL delegate.
W [HandleLayoutInfer:281]Op 162: default layout inference pass.
INFO: invoked
INFO: average time: 2.76 ms
INFO: 0.768627: 653 military uniform
INFO: 0.105882: 907 Windsor tie
INFO: 0.0196078: 458 bow tie
INFO: 0.0117647: 466 bulletproof vest
INFO: 0.00784314: 835 suit
~~~


### Running the Python example
Alternatively, the example using the TensorFlow Lite interpreter-only Python API can be run. The example file is
located at:
`/usr/bin/tensorflow-lite-2.10.0/examples`
To run the example using the predefined command line arguments, use the following command:
~~~
$ python3 label_image.py
The output should be as follows:
Warm-up time: 159.1 ms
Inference time: 156.5 ms
0.878431: military uniform
0.027451: Windsor tie
0.011765: mortarboard
0.011765: bulletproof vest
0.007843: sax
~~~
The Python example supports external delegates also. The switch `--ext_delegate <PATH> and --
ext_delegate_options <EXT_DELEGATE_OPTIONS>`, can be used to specify the external delegate library and
optionally its arguments

~~~
$ python3 label_image.py  -e=/usr/lib/libvx_delegate.so

Loading external delegate from /usr/lib/libvx_delegate.so with args: {}
Vx delegate: allowed_cache_mode set to 0.
Vx delegate: device num set to 0.
Vx delegate: allowed_builtin_code set to 0.
Vx delegate: error_during_init set to 0.
Vx delegate: error_during_prepare set to 0.
Vx delegate: error_during_invoke set to 0.
W [HandleLayoutInfer:281]Op 162: default layout inference pass.
Warm-up time: 2969.2 ms

Inference time: 3.1 ms

0.870588: military uniform
0.031373: Windsor tie
0.011765: mortarboard
0.007843: bow tie
0.007843: bulletproof vest

~~~

Here is `label_image.py`
~~~
#label_image.py
# Copyright 2018 The TensorFlow Authors. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ==============================================================================
"""label_image for tflite."""

import argparse
import time

import numpy as np
from PIL import Image
import tflite_runtime.interpreter as tflite


def load_labels(filename):
  with open(filename, 'r') as f:
    return [line.strip() for line in f.readlines()]


if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  parser.add_argument(
      '-i',
      '--image',
      default='grace_hopper.bmp',
      help='image to be classified')
  parser.add_argument(
      '-m',
      '--model_file',
      default='mobilenet_v1_1.0_224_quant.tflite',
      help='.tflite model to be executed')
  parser.add_argument(
      '-l',
      '--label_file',
      default='labels.txt',
      help='name of file containing labels')
  parser.add_argument(
      '--input_mean',
      default=127.5, type=float,
      help='input_mean')
  parser.add_argument(
      '--input_std',
      default=127.5, type=float,
      help='input standard deviation')
  parser.add_argument(
      '--num_threads', default=None, type=int, help='number of threads')
  parser.add_argument(
      '-e', '--ext_delegate', help='external_delegate_library path')
  parser.add_argument(
      '-o',
      '--ext_delegate_options',
      help='external delegate options, \
            format: "option1: value1; option2: value2"')

  args = parser.parse_args()

  ext_delegate = None
  ext_delegate_options = {}

  # parse extenal delegate options
  if args.ext_delegate_options is not None:
    options = args.ext_delegate_options.split(';')
    for o in options:
      kv = o.split(':')
      if (len(kv) == 2):
        ext_delegate_options[kv[0].strip()] = kv[1].strip()
      else:
        raise RuntimeError('Error parsing delegate option: ' + o)

  # load external delegate
  if args.ext_delegate is not None:
    print('Loading external delegate from {} with args: {}'.format(
        args.ext_delegate, ext_delegate_options))
    ext_delegate = [
        tflite.load_delegate(args.ext_delegate, ext_delegate_options)
    ]

  interpreter = tflite.Interpreter(
      model_path=args.model_file,
      experimental_delegates=ext_delegate,
      num_threads=args.num_threads)
  interpreter.allocate_tensors()

  input_details = interpreter.get_input_details()
  output_details = interpreter.get_output_details()

  # check the type of the input tensor
  floating_model = input_details[0]['dtype'] == np.float32

  # NxHxWxC, H:1, W:2
  height = input_details[0]['shape'][1]
  width = input_details[0]['shape'][2]
  img = Image.open(args.image).resize((width, height))

  # add N dim
  input_data = np.expand_dims(img, axis=0)

  if floating_model:
    input_data = (np.float32(input_data) - args.input_mean) / args.input_std

  interpreter.set_tensor(input_details[0]['index'], input_data)

  # ignore the 1st invoke
  startTime = time.time()
  interpreter.invoke()
  delta = time.time() - startTime
  print("Warm-up time:", '%.1f' % (delta * 1000), "ms\n")

  startTime = time.time()
  interpreter.invoke()
  delta = time.time() - startTime
  print("Inference time:", '%.1f' % (delta * 1000), "ms\n")

  output_data = interpreter.get_tensor(output_details[0]['index'])
  results = np.squeeze(output_data)

  top_k = results.argsort()[-5:][::-1]
  labels = load_labels(args.label_file)
  for i in top_k:
    if floating_model:
      print('{:08.6f}: {}'.format(float(results[i]), labels[i]))
    else:
      print('{:08.6f}: {}'.format(float(results[i] / 255.0), labels[i]))


~~~