# VisualBoyAdvance - GBA Game Console Emulator
![alt text](image.png)

VisualBoyAdvance is a free game emulator for the GBA game console. It can simulate the handheld game console released by Nintendo on a computer.
## Installing visualboyadvance-m
~~~
cd ~ && mkdir src && cd src
git clone https://github.com/visualboyadvance-m/visualboyadvance-m.git
cd visualboyadvance-m
./installdeps # On Linux or macOS
mkdir build
cd build
cmake.. -DCMAKE_BUILD_TYPE=Release -G Ninja
ninja
~~~

After compilation, there will be an executable file `visualboyadvance-m` in the build path. Execute this file to start the emulator.

![alt text](image-1.png)