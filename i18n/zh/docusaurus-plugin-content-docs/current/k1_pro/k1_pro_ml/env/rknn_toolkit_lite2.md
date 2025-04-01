
# RKNN Toolkit Lite2介绍



## 1 Toolkit Lite2安装
RKNN Toolkit Lite2 是Rockchip NPU平台的编程接口（Python），用于在板端部署RKNN模型。

### 测试环境
• **系统版本**：Debian 12
• **工具版本**：RKNN-Toolkit2 2.3.0
• **驱动版本**：
  npu驱动0.8.8

### 安装步骤
Toolkit-lite2适用于板卡端部署模型，更多依赖和使用信息请查看下 [Rockchip_RKNPU_User_Guide_RKNN_SDK](https://github.com/rockchip-linux/rknn-toolkit2/tree/master/doc)

板卡上获取RKNN Toolkit Lite2，可以直接从 [官方github](https://github.com/airockchip/rknn-toolkit2/tree/master/rknn-toolkit-lite2) 下载
1. **获取安装文件**：
   ```bash
   git clone https://github.com/airockchip/rknn-toolkit2.git
   cd rknn_toolkit_lite2/
   ```

2. **安装依赖**：
   ```bash
   sudo apt update
   sudo apt-get install python3-dev python3-pip gcc
   sudo apt install -y python3-opencv python3-numpy python3-setuptools
   ```

3. **安装工具包**：
   ```bash
  

   # Debian 12 (Python 3.10)
   pip3 install packages/rknn_toolkit_lite2-2.3.0-cp310-cp310-manylinux_2_17_aarch64.manylinux2014_aarch64.whl
   ```

4. **验证安装**：
   ```python
   from rknnlite.api import RKNNLite  # 无报错表示安装成功
   ```

---

## 2 Toolkit Lite2接口使用
### 部署流程
1. 创建 `RKNNLite` 对象
2. 调用 `load_rknn` 导入模型（需匹配硬件平台）
3. 调用 `init_runtime` 初始化运行时环境
4. 调用 `inference` 进行推理
5. 处理推理结果
6. 调用 `release` 释放资源

### 接口文档
参考 `rknn_toolkit_lite2/docs` 目录下的用户手册。

---

## 3 板端推理测试
### 注意事项
• 确保板端已安装 `librknnrt.so` 运行时库（默认路径：`/usr/lib`）
• 版本需与RKNN-Toolkit2匹配，避免兼容性问题（如报错 `Invalid RKNN model version`）

### 3.1 resnet18推理测试
1. **运行示例**：
   ```bash
   cd examples/inference_with_lite
   python3 test.py
   ```
2. **输出示例**：
   ```
   --> Load RKNN model done
   --> Init runtime environment done
   --> Running model
   resnet18
   -----TOP 5-----
   [812]: 0.9996760487556458
   [404]: 0.00024927023332566023
   ...
   ```


## 4 参考

https://github.com/airockchip/rknn-toolkit2

https://github.com/rockchip-linux/rknn-toolkit2

https://github.com/rockchip-linux/rknpu2

---

> **注意**  
> 确保RKNN模型与运行时库版本一致，避免兼容性问题。