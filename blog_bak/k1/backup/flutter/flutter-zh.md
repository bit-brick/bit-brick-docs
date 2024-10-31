# 在K1上使用Flutter

Flutter是Google开源的应用开发框架， 只要一套代码兼顾Android、iOS、Web、Windows、macOS和Linux六个平台。 Flutter编译为原生机器代码，助力提升应用的流畅度并实现优美的动画效果。 [10]Flutter由Dart语言强力驱动，助力高效构建全平台应用。 

## 编译安装Flutter

### 1.下载Flutter SDK
~~~
git clone https://github.com/JackWangCA/flutter-sdk-risc-v.git
~~~

### 2.下载 Dart SDK
这是一个针对 RISC-V 的预编译的 Dart SDK。

~~~
git clone https://github.com/JackWangCA/Flutter-on-RISCV.git
~~~

### 3.设置环境变量

~~~
export PATH="$PATH:/home/bitbrick/dev/flutter/bin"
~~~
这里把路径替换成你自己实际的flutter sdk的路径。
### 4.替换Dart sdk
用我们在第二步中下载的预编译好的sdk来替换flutter sdk中的dart sdk
~~~
cp -r ~/dev/Flutter-on-RISCV/dart-sdk/bin/* ~/dev/flutter/bin/cache/dart-sdk/bin/
cp -r ~/dev/Flutter-on-RISCV/dart-sdk/bin/dart ~/dev/flutter/bin 
~~~
现在，我们就可以在我们的riscv的k1上使用dart来进行flutter开发
~~~
flutter doctor
~~~