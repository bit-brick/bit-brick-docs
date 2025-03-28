# OpenCL Programming Guide

## 1. Introduction

OpenCL (Open Computing Language) is an open, cross-platform parallel computing framework maintained by the Khronos Group. It provides developers with a unified programming interface, allowing applications to run on different hardware platforms (CPU, GPU, DSP, and other processors), thereby improving code portability and performance. OpenCL mainly consists of the following two parts:

1. A language for writing kernels (functions that run on OpenCL devices) based on C99

2. An API for defining and controlling the platform

As shown in the figure below, the OpenCL framework includes two APIs: the Platform Layer API and the Runtime API.

![opencl](./static/how_it_works.jpg#pic_center)

- The Platform Layer API runs on the host CPU and is mainly used to query and enable available parallel processors or computing devices in the system. By querying available computing devices, applications can be ported to different systems to adapt to various combinations of hardware acceleration devices.

- The Runtime API allows applications to compile kernel programs for their selected computing devices and load them in parallel onto these processors for execution. After the kernel program execution is complete, the Runtime API is also used to collect and process the results.

## 2. Execution of OpenCL Programs

OpenCL treats kernel programs as the basic unit of executable code (similar to C functions). Kernels can be executed in a data-parallel or task-parallel manner. An OpenCL program is a collection of multiple kernels and functions (similar to a dynamically linked library with runtime linking).

OpenCL command queues are used by the host application to send kernels and data transfer functions to the device for execution. By queuing commands into the command queue, kernels and data transfer functions can be executed asynchronously and in parallel with the host application code.

Kernels and functions in the command queue can be executed in order or out of order. A computing device can have multiple command queues.

The figure below shows the process of executing an OpenCL Kernel:

![opencl](./static/executing_programs.jpg#pic_center)

The complete steps for executing an OpenCL program are as follows:

1. Query available OpenCL platforms and devices

2. Create a context for OpenCL devices in one or more platforms

3. Create and build a program for the OpenCL devices in the context

4. Select the kernel to execute from the program

5. Create memory objects for the kernel to operate on

6. Create command queues to execute commands on the OpenCL devices

7. Retrieve the execution results and clean up the environment

For more detailed information, refer to:

1. [OpenCL Guide](https://github.com/KhronosGroup/OpenCL-Guide)

## 3. Main API

### 3.1 OpenCL Platform

Selecting an OpenCL platform is the first step in OpenCL. The `clGetPlatformIDs()` API is used to find the set of available OpenCL platforms on a given system.
`cl_int clGetPlatformIDs(cl_uint num_entries, cl_platform_id *platforms, cl_uint *num_platforms)`

- num_entries: The index value of the OpenCL platform. Set to 0 and platforms to NULL to query the number of available platforms

- platforms: Pointer to the platform

- num_platforms: Number of OpenCL platforms, generally used as a return value

This API is usually called twice to query and obtain the corresponding platform information, as shown below:

```c
cl_int err = 0; // Error code
cl_uint num_platform = 0; // Number of platforms
cl_platform_id *platform = NULL; // Platform ID pointer
err = clGetPlatformIDs(0, NULL, &num_platform); // Get the number of platforms, the first parameter is the number of platforms to get, the second parameter is the platform ID array, the third parameter is the number of platforms returned
if (err != CL_SUCCESS) { // Check for errors
    fprintf(stderr, "Failed to create context: %d\n", err); // Output error message
    exit(-1); // Exit the program
}
platform = (cl_platform_id*)malloc(sizeof(cl_platform_id) * num_platform); // Allocate memory to store platform IDs
err = clGetPlatformIDs(num_platform, platform, NULL); // Get platform IDs
```

### 3.2 OpenCL Devices

After determining the platform, the next step is to query the available devices on the platform:

```c
/**
 * Function to get device IDs
 * @return cl_int Error code
 */
cl_int clGetDeviceIDs(
    cl_platform_id platform,  // Platform ID
    cl_device_type device_type,  // Device type
    cl_uint num_entries,  // Number of device IDs to get
    cl_device_id *devices,  // Array to store device IDs
    cl_uint *num_devices  // Number of device IDs actually obtained
);
// Usage:
cl_int err = 0;  // Used to store error codes
cl_uint num_devices = 0;  // Used to store the number of devices
cl_device_id *devices = NULL;  // Pointer to store device IDs
err = clGetDeviceIDs(platform, CL_DEVICE_TYPE_GPU, 0, NULL, &num_devices);  // Get the number of GPU devices, platform is the platform, CL_DEVICE_TYPE_GPU indicates getting GPU devices, 0 indicates not specifying a specific device, NULL indicates not returning the device ID list, &num_devices is used to store the number of devices
if (err != CL_SUCCESS)  // Check for errors
    exit(-1);  // Exit the program if there is an error
devices = (cl_device_id*)malloc(sizeof(cl_device_id) * num_devices);  // Allocate memory for device IDs
err = clGetDeviceIDs(platform, CL_DEVICE_TYPE_GPU, num_devices, devices, NULL);  // Get the device ID list
```

The `cl_device_type` parameter is described as follows:

- CL_DEVICE_TYPE_CPU: Use CPU as an OpenCL device

- CL_DEVICE_TYPE_GPU: GPU device

- CL_DEVICE_TYPE_ACCELERATOR: FPGA devices belong to the accelerator type of OpenCL devices, accelerator devices

- CL_DEVICE_TYPE_DEFAULT: The default OpenCL device associated with the platform

- CL_DEVICE_TYPE_ALL: All OpenCL devices supported by the platform

### 3.3 OpenCL Context

In OpenCL, the context coordinates and manages memory for the correct execution of kernels. Context objects can be created using `clCreateContext()`.

```c
// Create an OpenCL context
cl_context clCreateContext(
    const cl_context_properties *properties,  // Context property list
    cl_uint num_devices,  // Number of devices
    const cl_device_id *devices,  // Array of device IDs
    void (CL_CALLBACK *pfn_notify)(const char *errinfo, const void *private_info, size_t cb, void *user_data),  // Error notification callback function, reports errors that occur during the context lifecycle
    void *user_data,  // User-provided data, passed to the error notification callback function
    cl_int *errcode_ret  // Pointer to return error codes
);
```

OpenCL provides another API to create contexts: `clCreateContextFromType()` can be used to create contexts using all device types (CPU, GPU, and ALL).

### 3.4 OpenCL Command Queue

When operating on program objects, memory objects, and kernel objects in the context, command queues are needed. Commands are messages sent from the host to the device, instructing the device to perform operations. Each command queue can only manage one device.

The OpenCL `clCreateCommandQueueWithProperties()` is used to create command queues and associate them with a device, as shown below:

```c
// Create a command queue with specific properties
cl_command_queue clCreateCommandQueueWithProperties(
    cl_context context, // Context object, used to associate the command queue and device
    cl_device_id device, // Device to associate with
    cl_command_queue_properties properties, // Command queue properties, out-of-order execution or performance analysis enable, default is in-order execution
    cl_int *errcode_ret // Pointer to return error codes
);
```

### 3.5 OpenCL Program Objects and Kernel Objects

Program objects and kernel objects are the most important parts of OpenCL. A program object is a container for kernels, and a program object can contain multiple kernel objects, which are created and managed by the program object.
An OpenCL program object gathers the corresponding OpenCL C kernels, functions called by the kernels, and constant data. For example, in an algebraic solution application, the same OpenCL program object may contain a vector addition kernel, a matrix multiplication kernel, and a matrix transpose kernel.
The steps to create a kernel using source code are as follows:

1. Store the OpenCL C source code in a character array. If the source code is stored on disk as a file, it needs to be read into memory and stored in a character array.

2. Call `clCreateProgramWithSource()` to create a cl_program type object from the source code.

3. The created program object needs to be compiled, and the compiled kernel can run on one or more OpenCL devices. Call `clBuildProgram()` to compile the kernel. If there are issues with the compilation, this API will output error messages.

4. Finally, create a `cl_kernel` type kernel object. Call `clCreateKernel()` and specify the corresponding program object and kernel function name to create the kernel object.

The essence of a kernel object is a function (with parameters and return values, requiring memory objects for input and output), which can run on OpenCL devices. An example of a vector addition kernel source code:

```c
// Perform an element-wise addition of A and B and store in C.
// N work-items will be created to execute this kernel.
__kernel
void vecadd(__global int *C, __global int *A, __global int *B){
  int tid = get_global_id(0); // OpenCL intrinsic function
  C[tid] = A[tid] + B[tid];
}
```

Create a program object:

```c
cl_program clCreateProgramWithSource(
    cl_context context,          // Context object
    cl_uint count,               // Number of source code strings
    const char **strings,        // Array of source code strings
    const size_t *lengths,       // Array of lengths of each source code string
    cl_int *errcode_ret          // Pointer to return error codes
    )
```

Compile the program object:

```c
@return Compiled program object */
cl_int clBuildProgram(
    cl_program program, // Program object to create the kernel from
    cl_uint num_devices, // Number of devices
    const cl_device_id *device_list, // List of devices
    const char* options, // Build options
    void(*pfn_notify)(cl_program, void* user_data), // Callback function
    void* user_data // User data
    )
```

Create a kernel object:

```c
@return Created kernel object */
cl_kernel
clCreateKernel(
  cl_program program,  // Program object to create the kernel from
  const char *kernel_name,  // Name of the kernel, which is the name of the kernel function
  cl_int *errcode_ret  // Pointer to return error codes
  )
```

### 3.6 OpenCL Memory Objects

OpenCL kernels usually need to classify input and output data (e.g., arrays or multidimensional matrices). Before program execution, it is necessary to ensure that the input data can be accessed on the device side. To transfer data to the device side, corresponding memory space needs to be allocated, and the allocated space needs to be encapsulated into a memory object. OpenCL defines three types of memory: buffers, images, and pipes.
Data in Buffer type (arrays) is contiguous in memory, and this type can be used as pointers on the device side. `clCreateBuffer()` can allocate memory for this type of data and return a memory object.

```c
cl_mem clCreateBuffer(
    cl_context context, // Context object, used to associate the device and command queue
    cl_mem_flags flags, // Memory object flags, e.g., CL_MEM_READ_WRITE indicates read-write
    size_t size, // Size of the memory object
    void* host_ptr, // Host pointer, if NULL, memory is allocated on the device
    cl_int *errcode_ret) // Pointer to return error codes, if NULL, no error code is returned
```

Unlike calling C functions, we cannot directly assign parameters to the kernel function's parameter list. Executing a kernel requires publishing through an enqueue function. Since the syntax within the kernel is C, and kernel parameters are persistent (if we only change the values within the parameters, there is no need to reassign them). OpenCL provides `clSetKernelArg()` to set the parameters of the kernel.

```c
cl_int clSetKernelArg(
    cl_kernel kernel,  // Kernel object to set the parameter for
    cl_uint arg_index,  // Index of the kernel parameter, starting from 0
    size_t arg_size,  // Size of the parameter in memory
    const void* arg_value)  // Address of the parameter value
```

### 3.7 OpenCL Kernel Execution and Error Handling

Calling `clEnqueueNDRangeKernel()` enqueues a command into the command queue, marking the start of kernel execution. The command queue is specified by the target device. The kernel object identifies which code needs to be executed. When the kernel executes, there are four places related to work-item creation. The work_dim parameter specifies the number of dimensions for creating work-items (one-dimensional, two-dimensional, three-dimensional). The global_work_size parameter specifies how many work-items there are in each dimension of the NDRange, the local_work_size parameter specifies how many work-groups there are in each dimension of the NDRange. The global_work_offset parameter can specify whether the ID in the global work-group starts from 0.

```c
// Function: Enqueue the kernel function into the command queue
cl_int clEnqueueNDRangeKernel(
    cl_command_queue command_queue, // Command queue, used to execute the kernel function
    cl_kernel kernel, // Kernel function to execute
    cl_uint work_dim, // Number of work dimensions
    const size_t* global_work_offset, // Global work offset
    const size_t* global_work_size, // Global work size
    const size_t* local_work_size, // Local work size
    cl_uint num_events_in_wait_list, // Number of events in the wait list
    const cl_event *event_wait_list, // Array of events in the wait list
    cl_event *event // Pointer to get the event when the kernel execution is complete
);
```

After execution is complete, retrieve the results:

```c
cl_int clEnqueueReadBuffer(
    cl_command_queue command_queue,  // Command queue
    cl_mem buffer,  // Buffer object to read
    cl_bool blocking_read,  // Blocking or non-blocking read flag
    size_t offset,  // Offset in the buffer, usually set to 0
    size_t cb,  // Size of the memory occupied by the execution result
    void* ptr,  // Pointer on the host side to receive the read data
    cl_uint num_events_in_wait_list,  // Number of events in the wait list
    const cl_event *event_wait_list,  // Event wait list
    cl_event *event  // Pointer to get the event
    )  
```

Finally, use clRelease to release all resources:

```c
clReleaseKernel(kernel);  // Release kernel object
clReleaseProgram(program);  // Release program object
clReleaseCommandQueue(cmdQueue);  // Release command queue object
clReleaseMemObject(bufA);  // Release memory object bufA
clReleaseMemObject(bufB);  // Release memory object bufB
clReleaseMemObject(bufC);  // Release memory object bufC
clReleaseContext(context);  // Release context object
```

For more detailed API usage, refer to:

1. [OpenCL 3.0 Reference Guide](https://www.khronos.org/files/opencl30-reference-guide.pdf)

2. [OpenCL Reference Pages](https://registry.khronos.org/OpenCL/sdk/3.0/docs/man/html/)

3. [The OpenCL™ Specification](https://registry.khronos.org/OpenCL/specs/3.0-unified/html/OpenCL_API.html)

## 4. OpenCL Demo

### 4.1 Introduction

Source code location on bianbu-linux: xxx/bianbu-linux/package-src/k1x-gpu-test/openCLDemo

On bianbu-desktop, you can install k1x-gpu-test to get the related demo: `sudo apt install k1x-gpu-test`

The directory structure is as follows:

```c
.
|-- add_demo.c // Vector addition demo
|-- CMakeLists.txt // Used for compilation and build
`-- README.md

0 directories, 3 files
```

### 4.2 Compilation & Execution

```bash
sudo apt install opencl-headers ocl-icd-opencl-dev # Install dependencies
cd k1x-gpu-test/openCLDemo
cmake .
make -j
```

After compilation, the gpu-addDemo file will be generated in the current directory. Run it directly: `./gpu-addDemo`. To install, execute the `make install` command in the current directory (i.e., the source code directory), which will automatically install the executable file to the /usr/local/bin/ directory. After installation, you can run it directly in the terminal: `gpu-addDemo`. The correct running result is shown below:

```shell
65024.000000 65028.000000 65032.000000 65036.000000 65040.000000 65044.000000 65048.000000 65052.000000 65056.000000 65060.000000 65064.000000 65068.000000 65072.000000 65076.000000 65080.000000 65084.000000 65088.000000 65092.000000 65096.000000 65100.000000 65104.000000 65108.000000 65112.000000 65116.000000 65120.000000 65124.000000 65128.000000 65132.000000 65136.000000 65140.000000 65144.000000 65148.000000 65152.000000 65156.000000 65160.000000 65164.000000 65168.000000 65172.000000 65176.000000 65180.000000 65184.000000 65188.000000 65192.000000 65196.000000 65200.000000 65204.000000 65208.000000 65212.000000 65216.000000 65220.000000 65224.000000 65228.000000 65232.000000 65236.000000 65240.000000 65244.000000 65248.000000 65252.000000 65256.000000 65260.000000 65264.000000 65268.000000 65272.000000 65276.000000 65280.000000 65284.000000 65288.000000 65292.000000 65296.000000 65300.000000 65304.000000 65308.000000 65312.000000 65316.000000 65320.000000 65324.000000 65328.000000 65332.000000 65336.000000 65340.000000 65344.000000 65348.000000 65352.000000 65356.000000 65360.000000 65364.000000 65368.000000 65372.000000 65376.000000 65380.000000 65384.000000 65388.000000 65392.000000 65396.000000 65400.000000 65404.000000 65408.000000 65412.000000 65416.000000 65420.000000 65424.000000 65428.000000 65432.000000 65436.000000 65440.000000 65444.000000 65448.000000 65452.000000 65456.000000 65460.000000 65464.000000 65468.000000 65472.000000 65476.000000 65480.000000 65484.000000 65488.000000 65492.000000 65496.000000 65500.000000 65504.000000 65508.000000 65512.000000 65516.000000 65520.000000 65524.000000 65528.000000 65532.000000
Start time: 1732783455 sec, 480682 usec
End time: 1732783455 sec, 699529 usec
Calculate time for 102400000 addition operations: 218847 us
```

### 4.3 Adding a Demo

If you add a file named testDemo.c and want to compile it into an executable file named testDemo, you can modify the CMakeLists.txt as shown in the example below:

```CMake
# Define OpenCL version as 300
add_definitions(-DCL_TARGET_OPENCL_VERSION=300)

# Add link libraries
set(LINK_LIBRARIES OpenCL)  // Set the link library variable, specify the link library name

add_executable(gpu-addDemo ${CMAKE_CURRENT_SOURCE_DIR}/add_demo.c)
add_executable(testDemo ${CMAKE_CURRENT_SOURCE_DIR}/testDemo.c) # Create a new executable file

# Link libraries, link the specified libraries with the executable files
target_link_libraries(gpu-addDemo ${LINK_LIBRARIES})
target_link_libraries(testDemo ${LINK_LIBRARIES})

# Install, install the executable files to the specified directory
install(TARGETS 
gpu-addDemo
testDemo # Install the new executable file
DESTINATION "${CMAKE_INSTALL_PREFIX}/bin")
```

Then execute `make -j` again.

## 5. Others

### 5.1 Using printf in the kernel

Due to GPU hardware limitations, the buffer size for using printf in OpenCL is approximately 360,000 bytes. When using the printf function in an OpenCL kernel, you need to add the escape character "\", as shown below:

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

If you use an external xxx.cl file for import, there is no need to add the escape character.
