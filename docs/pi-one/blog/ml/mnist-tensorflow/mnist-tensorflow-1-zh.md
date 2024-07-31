
# 在PI One上运行手写数字识别【1】
这篇文章是 PI One TensorFlow-Lite入门教程的第一篇文章。主要介绍了如何从0开始用tensorflow搭建最简单的网络进行训练。

## mnist数据集

### 简介
MNIST是一个入门级的计算机视觉数据集，它包含各种手写数字图片。在机器学习中的地位相当于Python入门的打印 `Hello World`。官网是[THE MNIST DATABASE of handwritten digits](http://yann.lecun.com/exdb/mnist/)

该数据集包含以下四个部分：
- train-images-idx3-ubyte.gz: 训练集 - 图片，6w
- train-labels-idx1-ubyte.gz: 训练集 - 标签，6w
- t10k-images-idx3-ubyte.gz: 测试集 - 图片，1w
- t10k-labels-idx1-ubyte.gz: 测试集 - 标签，1w

### 图片和标签
mnist数据集里的每张图片大小为28 * 28像素，可以用28 * 28的大小的数组来表示一张图片。

标签用大小为10的数组来表示，这种编码我们称之为One hot（独热编码）。

### One - hot编码（独热编码）
独热编码使用N位代表N种状态，任意时候只有其中一位有效。

采用独热编码的例子：
```
性别:  
[0, 1]代表女，[1, 0]代表男
数字0 - 9: 
[0,0,0,0,0,0,0,0,0,1]代表9，[0,1,0,0,0,0,0,0,0,0]代表1
```

独热编码的优点在于：
- 能够处理非连续型数值特征
- 在一定程度上也扩充了特征。比如性别本身是一个特征，经过编码以后，就变成了男或女两个特征。

在神经网络中，独热编码其实具有很强的容错性，比如神经网络的输出结果是 `[0,0.1,0.2,0.7,0,0,0,0,0, 0]`转成独热编码后，表示数字3。即值最大的地方变为1，其余均为0。`[0,0.1,0.4,0.5,0,0,0,0,0, 0]`也能表示数字3。

numpy中有一个函数，numpy.argmax()可以取得最大值的下标。

## 训练模型

### 环境安装
安装TensorFlow 2.* 最新版本为2.17.0
~~~
pip install tensorflow
~~~

注：源码可在 [bit-brick'github](https://github.com/bit-brick/ML_DEMO) 中下载。
### 模型定义 （train.py）

模型定义的前半部分主要使用Keras.layers提供的Conv2D（卷积）与MaxPooling2D（池化）函数。

CNN的输入是维度为 (image_height, image_width, color_channels)的张量，mnist数据集是黑白的，因此只有一个color_channel（颜色通道），一般的彩色图片有3个（R,G,B）,熟悉Web前端的同学可能知道，有些图片有4个通道(R,G,B,A)，A代表透明度。对于mnist数据集，输入的张量维度就是(28,28,1)，通过参数input_shape传给网络的第一层。
~~~
import os
import tensorflow as tf
from tensorflow.keras import datasets, layers, models

class CNN:
    def __init__(self):
        self.model = models.Sequential([
             # 第1层卷积，卷积核大小为3*3，32个，28*28为待训练图片的大小
            layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
            # 第二层是最大池化层，使用2x2的池化窗口
            layers.MaxPooling2D((2, 2)),
            # 第三层是另一个卷积层，使用64个3x3的卷积核
            layers.Conv2D(64, (3, 3), activation='relu'),
            # 第四层是另一个最大池化层
            layers.MaxPooling2D((2, 2)),
            # 第五层是另一个卷积层，使用64个3x3的卷积核
            layers.Conv2D(64, (3, 3), activation='relu'),
            # 第六层是展平层，将特征图展开为一维向量
            layers.Flatten(),
            layers.Dense(64, activation='relu'),
            layers.Dense(10, activation='softmax')
        ])
        self.model.summary()
~~~

model.summary()用来打印我们定义的模型的结构。

~~~
Model: "sequential"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
conv2d (Conv2D)              (None, 26, 26, 32)        320       
_________________________________________________________________
max_pooling2d (MaxPooling2D) (None, 13, 13, 32)        0         
_________________________________________________________________
conv2d_1 (Conv2D)            (None, 11, 11, 64)        18496     
_________________________________________________________________
max_pooling2d_1 (MaxPooling2 (None, 5, 5, 64)          0         
_________________________________________________________________
conv2d_2 (Conv2D)            (None, 3, 3, 64)          36928     
_________________________________________________________________
flatten (Flatten)            (None, 576)               0         
_________________________________________________________________
dense (Dense)                (None, 64)                36928     
_________________________________________________________________
dense_1 (Dense)              (None, 10)                650       
=================================================================
Total params: 93,322
Trainable params: 93,322
Non-trainable params: 0
_________________________________________________________________
~~~

我们可以看到，每一个Conv2D和MaxPooling2D层的输出都是一个三维的张量(height, width, channels)。height和width会逐渐地变小。输出的channel的个数，是由第一个参数(例如，32或64)控制的，随着height和width的变小，channel可以变大（从算力的角度）。

模型的后半部分，是定义输出张量的。layers.Flatten会将三维的张量转为一维的向量。展开前张量的维度是(3, 3, 64) ，转为一维(576)的向量后，紧接着使用layers.Dense层，构造了2层全连接层，逐步地将一维向量的位数从576变为64，再变为10。

后半部分相当于是构建了一个隐藏层为64，输入层为576，输出层为10的普通的神经网络。最后一层的激活函数是softmax，10位恰好可以表达0-9十个数字。

最大值的下标即可代表对应的数字，使用numpy很容易计算出来：

~~~
import numpy as np

y1 = [0, 0.8, 0.1, 0.1, 0, 0, 0, 0, 0, 0]
y2 = [0, 0.1, 0.1, 0.1, 0.5, 0, 0.2, 0, 0, 0]
np.argmax(y1) # 1
np.argmax(y2) # 4
~~~

### mnist数据集预处理（train.py）

~~~
class DataSource:
    def __init__(self):
        (train_images, train_labels), (test_images, test_labels) = datasets.mnist.load_data()
        # 6万张训练图片，1万张测试图片 像素值映射到 0 - 1 之间
        train_images = train_images.reshape((60000, 28, 28, 1)).astype('float32') / 255
        test_images = test_images.reshape((10000, 28, 28, 1)).astype('float32') / 255

        self.train_images, self.train_labels = train_images, train_labels
        self.test_images, self.test_labels = test_images, test_labels
~~~

### 训练并保存训练结果（train.py）
~~~
class Train:
    def __init__(self):
        self.cnn = CNN()
        self.data = DataSource()

    def train(self):
        self.cnn.model.compile(optimizer='adam',
                               loss='sparse_categorical_crossentropy',
                               metrics=['accuracy'])
        self.cnn.model.fit(self.data.train_images, self.data.train_labels,
                           epochs=5)

        test_loss, test_acc = self.cnn.model.evaluate(self.data.test_images, self.data.test_labels)
        print(f"准确率: {test_acc:.4f}，共测试了{len(self.data.test_labels)}张图片")
        
        # 保存整个模型
        self.cnn.model.save('mnist_model.h5')
        
        # 调用转换函数
        

if __name__ == "__main__":
    app = Train()
    app.train()
    conver_to_tflite('mnist_model.h5', 'mnist_model.tflite')
~~~

执行后会在当前路径下生成一个`mnist_model.h5`的模型文件。
### 图片预测（predict_h5.py）
预测图片的代码如下：用来验证训练结果是否正确。
~~~
import tensorflow as tf
from PIL import Image
import numpy as np
import os
from tensorflow.keras.models import load_model

from train import CNN




class Predict(object):
    def __init__(self):
        print("Current working directory:", os.getcwd())
        checkpoint_dir = './'
        # 由于使用HDF5格式的权重文件，直接指定文件路径
        latest = os.path.join(checkpoint_dir, 'mnist_model.h5')  # 使用最新的权重文件

        self.cnn = CNN()
        # 直接使用指定的文件路径作为 load_weights 的参数
        self.cnn.model= load_model('mnist_model.h5')

    def predict(self, image_path):
        # 以黑白方式读取图片
        img = Image.open(image_path).convert('L')
        img = np.reshape(img, (28, 28, 1)) / 255.
        x = np.array([1 - img])

        # API refer: https://keras.io/models/model/
        y = self.cnn.model.predict(x)

        # 因为x只传入了一张图片，取y[0]即可
        # np.argmax()取得最大值的下标，即代表的数字
        print(image_path)
        print(y[0])
        print('        -> Predict digit', np.argmax(y[0]))


if __name__ == "__main__":
    app = Predict()
    app.predict('./test_images/0.png')
    app.predict('./test_images/1.png')
    app.predict('./test_images/4.png')

~~~

执行结果如下
~~~
../test_images/0.png
[9.9999809e-01 1.5495613e-10 3.3248398e-08 2.2874749e-10 7.2154744e-09
 2.9732897e-10 9.0776956e-07 8.8862202e-11 1.1108587e-07 7.9468083e-07]
        -> Predict digit 0
../test_images/1.png
[3.2026957e-08 9.9998009e-01 4.3477922e-08 3.4642572e-10 1.4215015e-05
 6.9246203e-10 1.2963224e-07 4.5330389e-06 8.9890926e-07 7.5559392e-08]
        -> Predict digit 1
../test_images/4.png
[1.46609270e-11 2.91387710e-06 2.11647162e-07 5.38430411e-09
 9.99984741e-01 2.79038481e-09 1.04211018e-09 1.61079342e-07
 1.04318104e-07 1.17996497e-05]
        -> Predict digit 4
~~~

至此我们就已经利用mnist的数据集完成了训练模型，并保存了模型文件。在下一篇文章中会介绍如何将训练好的模型转换为tflite格式，以方便在 `PI One` 使用。