



#  开发环境

## 1. RKNN开发环境

![图片](./static/47827620-16A4-4EE1-BABF-0F90EBDF4E75.png)

在PC端主要是进行模型训练和模型转换等，可以选择：
- Windows系统
- Windows上的虚拟机ubuntu
- Docker的linux系统
- 云服务器等

PC端需要安装：
- 常用软件和库（如PyCharm、Python、交叉编译器）
- 深度学习框架（PyTorch、TensorFlow、PaddlePaddle）
- 建议使用虚拟环境（Python虚拟环境/Anaconda/Miniconda）

板卡环境：
- 系统：Debian
- 预装组件：rknn驱动及其他相关组件
- 常用软件：Python、CMake、Make、GCC、OpenCV等

测试环境：
- PC端：WSL2（配合PyCharm使用）
- 板卡系统：Debian12

---

## 2. RKNN开发流程

![流程](./static/5B65A818-D593-43B9-9632-66B97B4F3CB6.png)

主要步骤：
1. **模型训练**
   - 选择模型和数据集
   - 使用深度学习框架训练
   - 参考[RKNN算子支持列表](https://github.com/airockchip/rknn-toolkit2/tree/master/doc)

2. **模型转换**
   - 将模型转换为RKNN格式

3. **模型评估**
   - 使用RKNN-Toolkit2进行量化和性能分析
   - 参考[RKNPU用户指南](https://github.com/airockchip/rknn-toolkit2/tree/master/doc)

4. **板端推理**
   - 部署RKNN模型到板卡
   - 使用[rknn-toolkit-lite2](https://github.com/airockchip/rknn-toolkit2/tree/master/rknn-toolkit-lite2)

---

## 3. 相关软件安装

### 3.1. Anaconda安装
**安装步骤**：
```bash
wget https://repo.anaconda.com/archive/Anaconda3-2023.07-2-Linux-x86_64.sh
bash Anaconda3-2023.07-2-Linux-x86_64.sh
source ~/.bashrc
```

**常用命令**：
```bash
conda create -n env_name python=3.8   # 创建环境
conda activate env_name               # 激活环境
conda deactivate                      # 退出环境
conda config --set auto_activate_base false  # 禁用自动激活
```

**镜像配置**：
```bash
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
conda config --set show_channel_urls yes
```

---

### 3.2. RKNN-Toolkit2安装
**安装步骤**：
```bash
conda create -n toolkit2_1.6 python=3.8
conda activate toolkit2_1.6
git clone https://github.com/airockchip/rknn-toolkit2
pip3 install -r packages/requirements_cp38-1.6.0.txt
pip3 install packages/rknn_toolkit2-1.6.0+81f21f4d-cp38-cp38-linux_x86_64.whl
```

**验证安装**：
```python
from rknn.api import RKNN
rknn = RKNN()  # 若无报错则成功
```

---

### 3.3. Jupyter Notebook安装
**安装方法**：
```bash
conda install jupyter notebook   # 使用conda
# 或
pip3 install jupyter -i https://pypi.tuna.tsinghua.edu.cn/simple
```

---

### 3.4. 深度学习框架安装

**PaddlePaddle安装**：
```bash
# CPU版本
conda install paddlepaddle==2.5.1 --channel https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/Paddle/

# GPU版本（需CUDA）
conda install paddlepaddle-gpu==2.5.1 cudatoolkit=11.2 -c https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/Paddle/
```

**TensorFlow安装**：
```bash
# 创建虚拟环境
python3 -m venv .tensorflow_venv
source .tensorflow_venv/bin/activate
pip3 install tensorflow
```

**PyTorch安装**：
```bash
conda create -n pytorch python=3.8
conda activate pytorch
pip3 install torch torchvision torchaudio
```

---

## 4. 参考链接
1. [CUDA Toolkit Archive](https://developer.nvidia.com/cuda-toolkit-archive)
2. [cuDNN Archive](https://developer.nvidia.com/rdp/cudnn-archive)
3. [Anaconda镜像配置](https://mirrors.tuna.tsinghua.edu.cn/help/anaconda)
4. [PaddlePaddle Conda安装指南](https://www.paddlepaddle.org.cn/documentation/docs/zh/install/conda/linux-conda.html)
5. [TensorFlow安装指南](https://tensorflow.google.cn/install/pip?hl=zh-cn#conda)