# Using Flutter on K1
Flutter is an application development framework open-sourced by Google. With just one set of code, it can cover six platforms including Android, iOS, Web, Windows, macOS, and Linux. Flutter is compiled into native machine code, helping to improve the smoothness of the application and achieve beautiful animation effects. Flutter is powerfully driven by the Dart language, facilitating the efficient construction of cross-platform applications.

## Compiling and Installing Flutter
### 1. Download the Flutter SDK
~~~
git clone https://github.com/JackWangCA/flutter-sdk-risc-v.git
~~~
### 2. Download the Dart SDK
This is a pre-compiled Dart SDK for RISC-V.
~~~
git clone https://github.com/JackWangCA/Flutter-on-RISCV.git
~~~
### 3. Set Environment Variables
~~~
export PATH="$PATH:/home/bitbrick/dev/flutter/bin"
~~~
Replace this path with the actual path of your Flutter SDK.
### 4. Replace the Dart SDK
Use the pre-compiled SDK we downloaded in the second step to replace the Dart SDK in the Flutter SDK.
~~~
cp -r ~/dev/Flutter-on-RISCV/dart-sdk/bin/* ~/dev/flutter/bin/cache/dart-sdk/bin/
cp -r ~/dev/Flutter-on-RISCV/dart-sdk/bin/dart ~/dev/flutter/bin 
~~~
Now, we can use Dart to conduct Flutter development on our RISC-V K1.
~~~
flutter doctor
~~~