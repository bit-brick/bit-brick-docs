

#  RKNN MODEL ZOO 应用示例

[RKNN MODEL ZOO](https://github.com/airockchip/rknn_model_zoo) 是瑞芯微官方提供的 RKNPU 支持的各种主流算法的部署示例，最新的示例支持 mobilenet 模型部署和 yolo 模型部署，本章以部署 yolov10 为例介绍 RKNN MODEL ZOO 示例的使用。

## 1 导出 RKNN 模型

1. **下载 RKNN MODEL ZOO**
    ```bash
    git clone https://github.com/airockchip/rknn_model_zoo.git
    ```

2. **获取 Yolov10 ONNX 模型文件**
    ```bash
    cd <rknn_model_zoo Path>/rknn_model_zoo/examples/yolov10/model
    chmod a+x download_model.sh
    ./download_model.sh
    ```

3. **执行模型转换程序**
    ```bash
    conda activate RKNN-Toolkit2
    cd <rknn_model_zoo Path>/rknn_model_zoo/examples/yolov10/python
    python3 convert.py ../model/yolov10n.onnx rk3576
    # output model will be saved as ../model/yolov10.rknn
    ```

    **参数说明：**
    ```bash
    python3 convert.py <onnx_model> <TARGET_PLATFORM> <dtype(optional)> <output_rknn_path(optional)>
    ```
    ◦ `<onnx_model>`：ONNX 模型路径
    ◦ `<TARGET_PLATFORM>`：指定 NPU 平台名（如 rk3576）
    ◦ `<quant_dtype>`：量化类型（i8/fp，默认i8）
    ◦ `<output_rknn_path>`：输出路径（默认保存为 yolov10n.rknn）

## 2 编译和构建

1. **设置交叉编译环境变量**
    ```bash
    export GCC_COMPILER=/home/xt/Luckfox/omni3576/sdk-1026/prebuilts/gcc/linux-x86/aarch64/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/bin/aarch64-none-linux-gnu
    ```

2. **执行编译脚本**
    ```bash
    chmod +x ./build-linux.sh
    ./build-linux.sh -t rk3576 -a aarch64 -d yolov10
    ```

    **编译过程示例：**
    ```bash
    (RKNN-Toolkit2) user@user:~/rknn_model_zoo$ ./build-linux.sh -t rk3576 -a aarch64 -d yolov10
    ./build-linux.sh -t rk3576 -a aarch64 -d yolov10
    /home/xt/Luckfox/omni3576/sdk-1026/prebuilts/gcc/linux-x86/aarch64/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/bin/aarch64-none-linux-gnu
    ===================================
    BUILD_DEMO_NAME=yolov10
    BUILD_DEMO_PATH=examples/yolov10/cpp
    TARGET_SOC=rk3576
    TARGET_ARCH=aarch64
    BUILD_TYPE=Release
    ENABLE_ASAN=OFF
    DISABLE_RGA=OFF
    INSTALL_DIR=/home/xt/conda/rknn_model_zoo/install/rk3576_linux_aarch64/rknn_yolov10_demo
    BUILD_DIR=/home/xt/conda/rknn_model_zoo/build/build_rknn_yolov10_demo_rk3576_linux_aarch64_Release
    CC=/home/xt/Luckfox/omni3576/sdk-1026/prebuilts/gcc/linux-x86/aarch64/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/bin/aarch64-none-linux-gnu-gcc
    CXX=/home/xt/Luckfox/omni3576/sdk-1026/prebuilts/gcc/linux-x86/aarch64/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/bin/aarch64-none-linux-gnu-g++
    ===================================
    -- The C compiler identification is GNU 10.3.1
    -- The CXX compiler identification is GNU 10.3.1
    -- Detecting C compiler ABI info
    -- Detecting C compiler ABI info - done
    -- Check for working C compiler: /home/xt/Luckfox/omni3576/sdk-1026/prebuilts/gcc/linux-x86/aarch64/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/bin/aarch64-none-linux-gnu-gcc - skipped
    -- Detecting C compile features
    -- Detecting C compile features - done
    -- Detecting CXX compiler ABI info
    -- Detecting CXX compiler ABI info - done
    -- Check for working CXX compiler: /home/xt/Luckfox/omni3576/sdk-1026/prebuilts/gcc/linux-x86/aarch64/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/bin/aarch64-none-linux-gnu-g++ - skipped
    -- Detecting CXX compile features
    -- Detecting CXX compile features - done
    -- !!!!!!!!!!!CMAKE_SYSTEM_NAME: Linux
    -- Performing Test CMAKE_HAVE_LIBC_PTHREAD
    -- Performing Test CMAKE_HAVE_LIBC_PTHREAD - Failed
    -- Check if compiler accepts -pthread
    -- Check if compiler accepts -pthread - yes
    -- Found Threads: TRUE  
    -- Configuring done (0.4s)
    -- Generating done (0.0s)
    -- Build files have been written to: /home/xt/conda/rknn_model_zoo/build/build_rknn_yolov10_demo_rk3576_linux_aarch64_Release
    [ 33%] Building C object utils.out/CMakeFiles/imageutils.dir/image_utils.c.o
    [ 33%] Building C object utils.out/CMakeFiles/fileutils.dir/file_utils.c.o
    [ 33%] Building C object utils.out/CMakeFiles/audioutils.dir/audio_utils.c.o
    [ 33%] Building C object utils.out/CMakeFiles/imagedrawing.dir/image_drawing.c.o
    [ 41%] Linking C static library libaudioutils.a
    ...
    ...
    ...
    [100%] Linking CXX executable rknn_yolov10_demo
    [100%] Built target rknn_yolov10_demo
    [ 16%] Built target imageutils
    [ 33%] Built target fileutils
    [ 50%] Built target imagedrawing
    [ 83%] Built target rknn_yolov10_demo
    [100%] Built target audioutils
    Install the project...
    -- Install configuration: "Release"
    -- Installing: /home/xt/conda/rknn_model_zoo/install/rk3576_linux_aarch64/rknn_yolov10_demo/./rknn_yolov10_demo
    -- Set non-toolchain portion of runtime path of "/home/xt/conda/rknn_model_zoo/install/rk3576_linux_aarch64/rknn_yolov10_demo/./rknn_yolov10_demo" to "$ORIGIN/../lib"
    -- Installing: /home/xt/conda/rknn_model_zoo/install/rk3576_linux_aarch64/rknn_yolov10_demo/model/bus.jpg
    -- Installing: /home/xt/conda/rknn_model_zoo/install/rk3576_linux_aarch64/rknn_yolov10_demo/model/coco_80_labels_list.txt
    -- Installing: /home/xt/conda/rknn_model_zoo/install/rk3576_linux_aarch64/rknn_yolov10_demo/model/yolov10.rknn
    -- Installing: /home/xt/conda/rknn_model_zoo/install/rk3576_linux_aarch64/rknn_yolov10_demo/lib/librknnrt.so
    -- Installing: /home/xt/conda/rknn_model_zoo/install/rk3576_linux_aarch64/rknn_yolov10_demo/lib/librga.so
    ```

3. **输出结果**
    ◦ 编译生成的可执行文件：`install/rk3576_linux_aarch64/rknn_yolov10_demo`
    ◦ 依赖文件：`模型文件`、`测试图片`、`动态链接库`等

> **说明：**
> - 编译时需要确保交叉编译工具链路径正确
> - 若遇到权限问题需执行 `chmod +x` 赋予脚本可执行权限
> - 最终部署包包含运行所需全部文件，可直接拷贝至开发板运行

## 3 运行程序
1、先将整个 rknn_yolov10_demo 目录传输至开发板，然后执行下面指令运行程序：
```bash
scp -r rknn_yolov10_demo/ user@192.168.253.105:/home/user

```
2、推理完成后生成图片 `out.png`
```bash
user@user:~/rknn_yolov10_demo$ ./rknn_yolov10_demo ./model/yolov10.rknn ./model/bus.jpg 
load lable ./model/coco_80_labels_list.txt
model input num: 1, output num: 6
input tensors:
  index=0, name=images, n_dims=4, dims=[1, 640, 640, 3], n_elems=1228800, size=1228800, fmt=NHWC, type=INT8, qnt_type=AFFINE, zp=-128, scale=0.003922
output tensors:
  index=0, name=487, n_dims=4, dims=[1, 64, 80, 80], n_elems=409600, size=409600, fmt=NCHW, type=INT8, qnt_type=AFFINE, zp=-38, scale=0.114574
  index=1, name=501, n_dims=4, dims=[1, 80, 80, 80], n_elems=512000, size=512000, fmt=NCHW, type=INT8, qnt_type=AFFINE, zp=-128, scale=0.002001
  index=2, name=508, n_dims=4, dims=[1, 64, 40, 40], n_elems=102400, size=102400, fmt=NCHW, type=INT8, qnt_type=AFFINE, zp=-57, scale=0.095044
  index=3, name=522, n_dims=4, dims=[1, 80, 40, 40], n_elems=128000, size=128000, fmt=NCHW, type=INT8, qnt_type=AFFINE, zp=-128, scale=0.003505
  index=4, name=529, n_dims=4, dims=[1, 64, 20, 20], n_elems=25600, size=25600, fmt=NCHW, type=INT8, qnt_type=AFFINE, zp=-58, scale=0.061253
  index=5, name=543, n_dims=4, dims=[1, 80, 20, 20], n_elems=32000, size=32000, fmt=NCHW, type=INT8, qnt_type=AFFINE, zp=-128, scale=0.003792
model is NHWC input fmt
model input height=640, width=640, channel=3
origin size=640x640 crop size=640x640
input image: 640 x 640, subsampling: 4:2:0, colorspace: YCbCr, orientation: 1
scale=1.000000 dst_box=(0 0 639 639) allow_slight_change=1 _left_offset=0 _top_offset=0 padding_w=0 padding_h=0
rga_api version 1.10.1_[0]
rknn_run
bus @ (88 137 556 438) 0.925
person @ (109 234 225 536) 0.910
person @ (210 240 284 511) 0.906
person @ (478 233 560 519) 0.796
person @ (80 330 114 518) 0.428
write_image path: out.png width=640 height=640 channel=3 data=0x7fbdd5c010


user@user:~/rknn_yolov10_demo$ ls
lib  model  out.png  rknn_yolov10_demo
```
3、您可以根据标签自行下载图片，相关标签文件位于 rknn_yolov10_demo/model/coco_80_labels_list.txt。例如，对象检测器能够定位图片中的办公用品。

```bash
./rknn_yolov10_demo ./model/yolov10.rknn ./model/laptop.jpg 
```
推理结果：
![alt text](./static/image.png)