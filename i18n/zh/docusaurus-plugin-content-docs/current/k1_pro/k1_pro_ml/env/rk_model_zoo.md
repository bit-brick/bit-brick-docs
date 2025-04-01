

#  rknn_model_zoo 应用示例

[rknn_model_zoo](https://github.com/airockchip/rknn_model_zoo) 是瑞芯微官方提供的 RKNPU 支持的各种主流算法的部署示例，最新的示例支持 mobilenet 模型部署和 yolo 模型部署，本章以部署 yolov10 为例介绍 rknn_model_zoo 示例的使用。

## 1 导出 RKNN 模型

1. **下载 rknn_model_zoo**
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
    # 环境变量设置
    BUILD_DEMO_NAME=yolov10
    BUILD_DEMO_PATH=examples/yolov10/cpp
    TARGET_SOC=rk3576
    TARGET_ARCH=aarch64
    BUILD_TYPE=Release

    # 编译输出
    [100%] Built target rknn_yolov10_demo
    ```

3. **输出结果**
    ◦ 编译生成的可执行文件：`install/rk3576_linux_aarch64/rknn_yolov10_demo`
    ◦ 依赖文件：`模型文件`、`测试图片`、`动态链接库`等

> **说明：**
> - 编译时需要确保交叉编译工具链路径正确
> - 若遇到权限问题需执行 `chmod +x` 赋予脚本可执行权限
> - 最终部署包包含运行所需全部文件，可直接拷贝至开发板运行