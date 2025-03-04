# OpenCL Programming Guide

## 1. 简介

OpenCL（Open Computing Language，开放计算语言）是一种开放的、跨平台的并行计算框架，由Khronos Group维护。它为开发者提供了统一的编程接口，使得应用程序可以在不同的硬件平台（CPU、GPU、DSP和其他处理器）上运行，从而提高了代码的可移植性和性能。OpenCL主要包含以下两个部分：

1. 用于编写 kernels(在OpenCL设备上运行的函数) 的语言(基于C99)

2. 用于定义并控制平台的API

如下图所示，OpenCL框架包含两个API：平台层（Platform Layer）API 和 运行时（Runtime）API。

![opencl](./static/how_it_works.jpg#pic_center)

- 平台层API在主机（Host）CPU上运行，主要用于查询和使能系统中可用的并行处理器或计算设备。通过查询可用的计算设备，应用程序可以移植到不同系统中运行，从而适应各种硬件加速设备的组合。

- 运行时API则使应用程序能够为其选定的计算设备编译内核程序，并将其并行加载到这些处理器上执行。内核程序执行完成后，运行时API还将用于收集和处理结果。

## 2. OpenCL程序的执行

OpenCL将内核程序视为可执行代码的基本单元（类似于C函数）。内核能够以数据并行或任务并行的方式执行。一个 OpenCL 程序是由多个内核和函数组成的集合（类似于具有运行时链接的动态库）。

OpenCL 命令队列由主机应用程序用于将内核和数据传输函数发送到设备以执行。通过将命令排队到命令队列中，内核和数据传输函数可以异步且并行地与主机应用程序代码一起执行。

命令队列中的内核和函数可以按顺序或乱序执行。一个计算设备可以拥有多个命令队列。

下图展示了执行OpenCL Kernel的流程：

![opencl](./static/executing_programs.jpg#pic_center)

执行 OpenCL 程序的完整步骤如下：

1. 查询可用的 OpenCL 平台和设备

2. 为一个或多个平台中的 OpenCL 设备创建上下文

3. 为上下文中的 OpenCL 设备创建并构建程序

4. 从程序中选择要执行的内核

5. 为内核创建内存对象以进行操作

6. 创建命令队列以在 OpenCL 设备上执行命令

7. 获取执行结果并清理环境

更详细的介绍可以参考：

1. [OpenCL Guide](https://github.com/KhronosGroup/OpenCL-Guide)

## 3. 主要API

### 3.1 OpenCL平台

选择OpenCL平台是OpenCL的第一步，`clGetPlatformIDs()`这个API就是查找制定系统上的可用OpenCL平台的集合。
`cl_int clGetPlatformIDs(cl_uint num_entries, cl_platform_id *platforms, cl_uint *num_platforms)`

- num_entries：表示OpenCL平台的索引值。设置为0，且platforms为NULL时用于查询可用的平台数

- platforms：表示平台的指针

- num_platforms：表示OpenCL平台的数量，一般作为返回值

这个API一般会调用两次，用来查询和获取到对应的平台信息，使用方式如下：

```c
cl_int err = 0; // 错误代码
cl_uint num_platform = 0; // 平台数量
cl_platform_id *platform = NULL; // 平台 ID 指针
err = clGetPlatformIDs(0, NULL, &num_platform); // 获取平台数量，第一个参数为要获取的平台数量，第二个参数为平台 ID 数组，第三个参数为返回的平台数量
if (err!= CL_SUCCESS) { // 检查错误
    fprintf(stderr, "Failed to create context: %d\n", err); // 输出错误信息
    exit(-1); // 退出程序
}
platform = (cl_platform_id*)malloc(sizeof(cl_platform_id) * num_platform); // 分配内存以存储平台 ID
err = clGetPlatformIds(num_platform, platform, NULL); // 获取平台 ID
```

### 3.2 OpenCL设备

当平台确定好之后，下一步就是查询平台上可用的设备：

```c
/**
 * 获取设备 ID 的函数
 * @return cl_int 错误代码
 */
cl_int clGetDeviceIDs(
    cl_platform_id platform,  //平台 ID
    cl_device_type device_type,  //设备类型
    cl_uint num_entries,  //要获取的设备 ID 数量
    cl_device_id *devices,  //存储设备 ID 的数组
    cl_uint *num_devices  //实际获取到的设备 ID 数量
);
// 使用：
cl_int err = 0;  // 用于存储错误代码
cl_uint num_devices = 0;  // 用于存储设备数量
cl_device_id *devices = NULL;  // 用于存储设备 ID 的指针
err = clGetDeviceIDs(platform, CL_DEVICE_TYPE_GPU, 0, NULL, &num_devices);  // 获取 GPU 设备数量，platform 是平台，CL_DEVICE_TYPE_GPU 表示获取 GPU 设备，0 表示不指定特定设备，NULL 表示不返回设备 ID 列表，&num_devices 用于存储设备数量
if (err!= CL_SUCCESS)  // 检查是否有错误
    exit(-1);  // 如果有错误，退出程序
devices = (cl_device_id*)malloc(sizeof(cl_device_id) * num_devices);  // 为设备 ID 分配内存
err = clGetDeviceIDs(platform, CL_DEVICE_TYPE_GPU, num_devices, devices, NULL);  // 获取设备 ID 列表
```

`cl_device_type`参数描述如下：

- CL_DEVICE_TYPE_CPU：将 CPU 作为 OpenCL 设备

- CL_DEVICE_TYPE_GPU：GPU 设备

- CL_DEVICE_TYPE_ACCELERATOR：FPGA 设备属于加速卡类型的 OpenCL 设备，加速卡设备

- CL_DEVICE_TYPE_DEFAULT：与平台关联的默认 OpenCL 设备

- CL_DEVICE_TYPE_ALL：平台支持的所有 OpenCL 设备

### 3.3 OpenCL上下文

OpenCL中上下文为了内核的正确执行，进行协调和内存管理。上下文对象可以通过`clCreateContext()`进行创建。

```c
// 创建 OpenCL 上下文
cl_context clCreateContext(
    const cl_context_properties *properties,  // 上下文属性列表
    cl_uint num_devices,  // 设备数量
    const cl_device_id *devices,  // 设备 ID 数组
    void (CL_CALL_BACK *pfn_notify)(const char *errinfo, const void *private_info, size_t cb, void *user_data),  // 与user_data共同做一个错误通知回调函数，报告上下文生命周期中出现的错误信息
    void *user_data,  // 用户提供的数据，将传递给错误通知回调函数
    cl_int *errcode_ret  // 用于返回错误代码的指针
);
```

OpenCL提供了另一个API也能用来创建上下文：通过`clCreateContextFromType()`可以使用所有的设备类型（CPU、GPU和ALL）创建上下文。

### 3.4 OpenCL队列命令

对上下文的程序对象、内存对象、内核对象进行操作时需要借助命令队列。 命令是主机（Host）发送给设备（Devices）的消息，通知设备执行操作。每个命令队列只能管理一个设备。

OpenCL的`clCreateCommandQueueWithProperties()`就是用来创建命令队列，且将命令队列与一个device进行关联，其用法如下：

```c
// 创建具有特定属性的命令队列
cl_command_queue clCreateCommandQueueWithProperties(
    cl_context context, // 上下文对象，用于关联命令队列和设备
    cl_device_id device, // 要关联的设备
    cl_command_queue_properties properties, // 命令队列的属性，乱序执行或性能分析使能，默认为顺序执行
    cl_int *errcode_ret // 用于返回错误代码的指针
);
```

### 3.5 OpenCL程序对象与内核对象

程序对象和内核对象是OpenCL最重要的部分。程序对象就是内核的一个容器，一个程序对象可以包含多个内核对象，内核对象由程序对象创建和管理。
一个OpenCL程序对象汇集了对应的OpenCL C内核、内核调用的函数以及常量数据。例如，一个代数解决应用中，同一个OpenCL程序对象可能包含一个向量相加内核，一个矩阵相乘的内核和一个矩阵转置的内核。
使用源码创建内核的步骤如下：

1. 将 OpenCL C 源码存放在一个字符数组中。若源码以文件形式存于硬盘，那么需将其读入内存，并存储至一个字符数组。

2. 调用`clCreateProgramWithSource()`，通过源码可创建一个cl_program类型对象。

3. 所创建的程序对象需要进行编译，编译后的内核方能在一个或多个 OpenCL 设备上运行。调用`clBuildProgram()`完成对内核的编译，若编译存在问题，该 API 会输出错误信息。

4. 最后，创建`cl_kernel`类型的内核对象。调用`clCreateKernel()`，并指定对应的程序对象和内核函数名，以创建内核对象。

内核对象的本质是一个函数（有参数和返回值，需要使用内存对象进行传入传出），可以在OpemCL设备上运行。一个向量相加的内核源码示例：

```c
// Perform an element-wise addition of A and B and store in C.
// N work-items will be created to execute this kernel.
__kernel
void vecadd(__global int *C, __global int *A, __global int *B){
  int tid = get_global_id(0); // OpenCL intrinsic函数
  c[tid] = A[tid] + B[tid];
}
```

创建一个程序对象：

```c
cl_program clCreateProgramWithSource(
    cl_context context,          // 上下文对象
    cl_uint count,               // 源代码字符串的数量
    const char **strings,        // 源代码字符串数组
    const size_t *lengths,       // 每个源代码字符串的长度数组
    cl_int *errcode_ret          // 错误代码返回值
    )
```

编译程序对象：

```c
@return 编译的程序对象 */
cl_int clBuildProgram(
    cl_program program, //要创建内核的程序对象
    cl_uint num_devices, //设备数量
    const cl_device_id *device_list, //设备列表
    const char*options, //构建选项
    void(*pfn_notify)(cl_program, void*user_data), //回调函数
    void*user_data //用户数据
    )
```

创建一个内核对象

```c
@return 创建的内核对象 */
cl_kerenl
clCreateKernel(
  cl_program program,  //要创建内核的程序对象
  const char *kernel_name,  //内核的名称，即为内核函数名称
  cl_int *errcode_ret  //用于返回错误代码的指针
  )
```

### 3.6 OpenCL内存对象

OpenCL内核通常需要对输入和输出数据进行分类（例如，数组或多维矩阵）。程序执行前，需要保证输入数据能够在设备端访问到。为了将数据转移到设备端，则需要开辟相应大小的空间，以及将开辟的空间封装成一个内存对象。OpenCL定义了三种内存类型：数组、图像和管道。
Buffer类型（数组）中的数据在内存上是连续的，这种类型可以在设备端以指针的方式使用。`clCreateBuffer()`可以为这种类型的数据分配内存，并返回一个内存对象。

```c
cl_mem clCreateBuffer(
    cl_context context, // 上下文对象，用于关联设备和命令队列
    cl_mem_flags flags, // 内存对象的标志，例如 CL_MEM_READ_WRITE 表示可读可写
    size_t size, // 内存对象的大小
    void* host_ptr, // 主机指针，如果为 NULL，则在设备上分配内存
    cl_int *errcode_ret) // 错误代码返回指针，如果为 NULL，则不返回错误代码
```

与调用C函数不同，我们不能直接将参数赋予内核函数的参数列表中。执行一个内核需要通过一个入队函数进行发布。由于核内的语法为C，且内核参数具有持续性(如果我们只改变参数里面的值，就没有必要再重新进行赋值)。OpenCL中提供`clSetKernelArg()`对内核的参数进行设置。

```c
cl_int clSetKernelArg(
    cl_kernel kernel,  // 要设置参数的内核对象
    cl_uint arg_index,  // 内核参数的索引，从0开始
    size_t arg_size,  // 参数所占内存的大小
    const void* arg_value)  // 参数值的地址
```

### 3.7 OpenCL内核执行与错误处理

调用`clEnqueueNDRangeKernel()`会入队一个命令道命令队列中，其是内核执行的开始。命令队列被目标设备指定。内核对象标识了哪些代码需要执行。内核执行时，有四个地方与工作项创建有关。work_dim参数指定了创建工作项的维度(一维，二维，三维)。global_work_size参数指定NDRange在每个维度上有多少个工作项，local_work_size参数指定NDRange在每个维度上有多少个工作组。global_work_offset参数可以指定全局工作组中的ID是否从0开始计算。

```c
// 函数：将内核函数排入命令队列
cl_int clEnqueueNDRangeKernel(
    cl_command_queue command_queue, // 命令队列，用于执行内核函数
    cl_kernel kernel, // 要执行的内核函数
    cl_uint work_dim, // 工作维度的数量
    const size_t* global_work_offset, // 全局工作偏移量
    const size_t* global_work_size, // 全局工作大小
    const size_t* local_work_size, // 本地工作大小
    cl_uint num_events_in_wait_list, // 等待列表中的事件数量
    const cl_event *event_wait_list, // 等待列表中的事件数组
    cl_event *event // 用于获取内核执行完成事件的指针
);
```

执行完成之后，获取结果：

```c
cl_int clEnqueueReadBuffer(
    cl_command_queue command_queue,  // 命令队列
    cl_mem buffer,  // 要读取的缓冲区对象
    cl_bool blocking_read,  // 阻塞或非阻塞读取标志
    size_t offset,  // 缓冲区中的偏移量，通常设置为0
    size_t cb,  // 执行结果所占据的内存大小
    void* ptr,  // 主机端接收读取数据的指针
    cl_uint num_events_in_wait_list,  // 等待列表中的事件数量
    const cl_event *event_wait_list,  // 事件等待列表
    cl_event *event  // 用于获取事件的指针
    )  
```

最后，使用 clRelease 对所有的资源进行回收：

```c
clReleaseKernel(kernel);  //释放内核对象
clReleaseProgram(program);  //释放程序对象
clReleaseCommandQueue(cmdQueue);  //释放命令队列对象
clReleaseMemObject(bufA);  //释放内存对象 bufA
clReleaseMemObject(bufB);  //释放内存对象 bufB
clReleaseMemObject(bufC);  //释放内存对象 bufC
clReleaseContext(context);  //释放上下文对象
```

更详细的API用法可以参考：

1. [OpenCL 3.0 Reference Guide](https://www.khronos.org/files/opencl30-reference-guide.pdf)

2. [OpenCL Reference Pages](https://registry.khronos.org/OpenCL/sdk/3.0/docs/man/html/)

3. [The OpenCL™ Specification](https://registry.khronos.org/OpenCL/specs/3.0-unified/html/OpenCL_API.html)

## 4. OpenCL Demo

### 4.1 简介

bianbu-linux 上的源码位置：xxx/bianbu-linux/package-src/k1x-gpu-test/openCLDemo

bianbu-desktop 上可以安装 k1x-gpu-test 来获取相关demo：`sudo apt install k1x-gpu-test`

目录结构如下：

```c
.
|-- add_demo.c //向量加法Demo
|-- CMakeLists.txt //用于编译构建
`-- README.md

0 directories, 3 files
```

### 4.2 编译 & 运行

```bash
sudo apt install opencl-headers ocl-icd-opencl-dev #安装依赖
cd k1x-gpu-test/openCLDemo
cmake .
make -j
```

编译完成后会在当前目录下生成 gpu-addDemo 文件，直接运行即可：`./gpu-addDemo`。如需安装，可在当前目录（即源码目录）下执行`make install`命令，会自动将可执行文件安装到 /usr/local/bin/ 目录下，安装完成后可在终端直接运行：`gpu-addDemo`。正确的运行结果如下图所示：

```shell
65024.000000 65028.000000 65032.000000 65036.000000 65040.000000 65044.000000 65048.000000 65052.000000 65056.000000 65060.000000 65064.000000 65068.000000 65072.000000 65076.000000 65080.000000 65084.000000 65088.000000 65092.000000 65096.000000 65100.000000 65104.000000 65108.000000 65112.000000 65116.000000 65120.000000 65124.000000 65128.000000 65132.000000 65136.000000 65140.000000 65144.000000 65148.000000 65152.000000 65156.000000 65160.000000 65164.000000 65168.000000 65172.000000 65176.000000 65180.000000 65184.000000 65188.000000 65192.000000 65196.000000 65200.000000 65204.000000 65208.000000 65212.000000 65216.000000 65220.000000 65224.000000 65228.000000 65232.000000 65236.000000 65240.000000 65244.000000 65248.000000 65252.000000 65256.000000 65260.000000 65264.000000 65268.000000 65272.000000 65276.000000 65280.000000 65284.000000 65288.000000 65292.000000 65296.000000 65300.000000 65304.000000 65308.000000 65312.000000 65316.000000 65320.000000 65324.000000 65328.000000 65332.000000 65336.000000 65340.000000 65344.000000 65348.000000 65352.000000 65356.000000 65360.000000 65364.000000 65368.000000 65372.000000 65376.000000 65380.000000 65384.000000 65388.000000 65392.000000 65396.000000 65400.000000 65404.000000 65408.000000 65412.000000 65416.000000 65420.000000 65424.000000 65428.000000 65432.000000 65436.000000 65440.000000 65444.000000 65448.000000 65452.000000 65456.000000 65460.000000 65464.000000 65468.000000 65472.000000 65476.000000 65480.000000 65484.000000 65488.000000 65492.000000 65496.000000 65500.000000 65504.000000 65508.000000 65512.000000 65516.000000 65520.000000 65524.000000 65528.000000 65532.000000
Start time: 1732783455 sec, 480682 usec
End time: 1732783455 sec, 699529 usec
Calculate time for 102400000 addition operations: 218847 us
```

### 4.3添加Demo

如果增加一个名为 testDemo.c 的文件，并希望编译得到名为 testDemo 的可执行文件，可按以下示例修改CMakeLists.txt

```CMake
# 定义 OpenCL 版本为 300
add_definitions(-DCL_TARGET_OPENCL_VERSION=300)

# 添加链接库
set(LINK_LIBRARIES OpenCL)  //设置链接库变量，指定链接库名称

add_executable(gpu-addDemo ${CMAKE_CURRENT_SOURCE_DIR}/add_demo.c)
add_executable(testDemo ${CMAKE_CURRENT_SOURCE_DIR}/testDemo.c) # 创建新的可执行文件

# 链接库，将指定的链接库与可执行文件链接
target_link_libraries(gpu-addDemo ${LINK_LIBRARIES})
target_link_libraries(testDemo ${LINK_LIBRARIES})

# 安装， 将可执行文件安装到指定目录
install(TARGETS 
gpu-addDemo
testDemo #安装新的可执行文件
DESTINATION "${CMAKE_INSTALL_PREFIX}/bin")
```

然后再次执行`make -j`即可。

## 5. 其它

### 5.1 kernel中使用printf

由于GPU的硬件限制，使用OpenCL的printf时，其buffer最大约为360,000 Bytes。在 openCL kernel 中使用 printf 函数时，需要添加转义字符 “\”，如下：

```c
const char *programSource =
    "__kernel                                         \n"
    "void vec_add(__global float *A,                  \n"
    "             __global float *B,                  \n"
    "             __global float *C)                  \n"
    "{                                                \n"
    "  // Get the work-item's unique ID               \n"
    "  int idx = get_global_id(0);                    \n"
    "  printf(\"test\");                              \n"
    "}                                                \n";

```

如使用外部 xxx.cl 文件导入的方式，则无需添加转义字符。
