# K1 JOH5.0 下载编译烧录说明

# 环境准备

## ubuntu 环境（推荐 22.04，其他版本暂未验证）

安装依赖：

```
sudo apt-get update

sudo apt-get install binutils git git-lfs gnupg gperf build-essential zip curl zlib1g-dev gcc-multilib lib32ncurses5-dev x11proto-core-dev libx11-dev lib32z1-dev libxml2-utils xsltproc unzip m4 bc gnutls-bin python3-pip ruby ccache libgl1-mesa-dev g++-multilib libc6-dev-i386 flex bison openjdk-19-jdk openssl libelf-dev lz4 genext2fs libncurses5 libssl-dev u-boot-tools dosfstools mtools libstdc++-12-dev repo python2 cpio nodejs npm
```

## 安装 make\_exf4fs

下载附件 bin.zip（[点我下载](https://archive.spacemit.com/tools/openharmony/bin.zip)）并解压放入服务器，在~/.bashrc 中添加到 PATH

```cpp
export PATH=$PATH:~/WorkSpace/bin
```

# 源码准备

## gitee

代码仓托管在 gitee（[代码仓库路径](https://gitee.com/riscv-sig)）中，下载代码需要进行如下准备：

- 开通 gitee 账号
- 将服务器的 ssh key 上传到 gitee(“设置” - “安全设置” - “SSH 公钥”)

## 下载源码

```bash
mkdir oh5
cd oh5
repo init -u git@gitee.com:riscv-sig/manifest.git -b riscv/OpenHarmony-v5.0.0-Release --no-repo-verify
## 如果repo init过程中下载repo失败（概率出现过），使用国内源
## 后面添加参数 --repo-url=https://gerrit-googlesource.lug.ustc.edu.cn/git-repo
 
repo sync -j4 -c --fail-fast
## 3小时左右
## 出现报错及时处理

repo forall -c 'git lfs pull'
## 拉一些大文件，haps，音视频等，2小时左右

repo start OpenHarmony-v5.0.0-Release --all
```

## 安装编译器

在源码根目录下执行脚本，安装编译器及二进制工具。

```bash
bash build/prebuilts_download.sh
```

下载的文件默认存放在与 `OpenHarmony` 同目录下的 `openharmony_prebuilts` 下。

```bash
fuqiang@snode2:~/WorkSpace$ tree -L 1
.
|-- oh5
`-- openharmony_prebuilts

2 directories, 0 files
```

`openharmony_prebuilts` 里面的内容如下：

```bash
fuqiang@snode2:~/WorkSpace/openharmony_prebuilts$ ls -al
total 4970668
drwxr-xr-x 2 fuqiang dc-sw-users       4096 Oct 28 08:39 .
drwxr-xr-x 6 fuqiang dc-sw-users       4096 Oct 26 18:06 ..
-rw-r--r-- 1 fuqiang dc-sw-users   70959548 Sep 27 17:35 015654433b541c15ac605ecb2dd32f11.libcxx-ndk_ohos-arm64-5fbff2-20240727.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users    1151488 Sep 27 17:27 03a7b98353c5261f51bc2e5ec28dfed9.gn-linux-x86-20240510.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users  118696253 Sep 27 17:38 0c65e233a7c5b1ecf6585a38903cc52e.clang-mingw-20240510.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users   70970417 Oct 28 08:40 1822bea68b38ab77f1714d89e8453c34.libcxx-ndk_linux-x86_64-ef33c3-20240828.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users     298786 Sep 27 17:27 1ad55caffc571c067e7748967b86f477.ninja-windows-x86-1.12.0-20240523.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users     530721 Sep 27 17:28 20738011b324e100f6aab09353a7e7fa.bpftool_v5.10.93_20221114.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users   29078522 Sep 27 17:31 44e99f695a2058603263903a1198b79e.rust-std-nightly-x86_64-pc-windows-gnullvm_20240528.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users   35031005 Sep 27 17:32 44f2993d118ed3cefe4792a2fd62547f.node-v14.21.1-linux-x64.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users   31562008 Sep 27 17:32 46e8165e2cfa7799732c23615c5a3fa1.rust-std-nightly-x86_64-unknown-linux-ohos_20240528.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users  620135753 Sep 27 17:46 4fe01b604194d203f0371902cd6b4473.clang_windows-x86_64-5fbff2-20240727.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users 1446576155 Sep 27 17:51 5211242bf5608753c7488874c758dd0f.clang_ohos-arm64-5fbff2-20240727.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users  194623101 Sep 27 17:38 59325cdd5538f70910f66328acedea7d.prebuilts_gcc_linux-x86_arm_gcc-linaro-7.5.0-arm-linux-gnueabi.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users  329772635 Sep 27 17:41 6a4909fc4262070aea24465c9a3aabc4.ark_js_prebuilts_20230713.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users   70953802 Sep 27 17:35 6be4fdb05760c8b2887f96c08ebff7b8.libcxx-ndk_windows-x86_64-5fbff2-20240727.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users    9048182 Oct 28 08:39 6c3294e4d1c73219c2bed617e6ab9676.python-linux-x86-Ubuntu_18.04-3.11.4_20240823.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users   30678419 Sep 27 17:31 6ea2077dceef4e1f0953819bc7c96e1f.rust-std-nightly-aarch64-unknown-linux-ohos_20240528.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users    9254059 Sep 27 17:29 741544d67d8d0281ba0d670b561b379b.python-linux-x86-Ubuntu_18.04-3.11.4_20240715.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users   27628068 Sep 27 17:32 76a4e507e09cb3693edaa91f5985ab8f.rust-std-nightly-armv7-unknown-linux-ohos_20240528.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users   17297524 Sep 27 17:29 7bcb19ee6150676833e5aa5d6a7bfe03.cmake-ohos-3.28.2.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users  106664705 Sep 27 17:36 8038bbe7160f809232e8df72e3980c92.rust-nightly-x86_64-unknown-linux-gnu_20240528.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users   52840113 Sep 27 17:33 9b1ca53ad98ebfaa0fbfa26d20d534df.cmake-linux-x86-3.28.2.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users   12397424 Sep 27 17:30 ae867132e2a2bdbbae5b58aa89eb883e.pahole_v1.21_20221124.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users   70969730 Oct 28 08:41 c9b9261adf5c264aa35312aeb8261419.libcxx-ndk_ohos-arm64-ef33c3-20240828.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users  117896452 Sep 27 17:36 cd98ff85e2af3869cf318497e6a1d559.gcc-linaro-7.5.0-2019.12-x86_64_aarch64-linux-gnu.tar.xz
-rw-r--r-- 1 fuqiang dc-sw-users   15135801 Oct 28 08:39 d699eb29e0a9c9febb2b13bb779c1ebb.cmake-ohos-3.28.2-20240827.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users   70960099 Sep 27 17:35 d991cf9857b70074d0e7981807f280de.libcxx-ndk_linux-x86_64-5fbff2-20240727.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users     128365 Sep 27 17:27 dfcaa71177f12992d9542b6c8e60d363.ninja-linux-x86-1.12.0-20240523.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users     270405 Oct 28 08:39 e0c9e1b221277cd431bc9dcba432c3e1.ninja-ohos-1.12.0-20240827.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users   33784208 Sep 27 17:33 e778f29e95d22f8e3cb6e604936229dc.node-v16.20.2-linux-x64.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users   39492529 Sep 27 17:33 ebe7c49b8fdbb8cebc06adb7fef9cb4b.cmake-windows-x86-3.28.2.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users    2052940 Sep 27 17:28 ecc8770b5ab13932696406bf43a5401b.packing_tool_libs_20240730.zip
-rw-r--r-- 1 fuqiang dc-sw-users     462116 Sep 27 17:27 f8dea77cc089365ea9b35880dbc252b3.ninja-ohos-1.12.0-20240527.tar.gz
-rw-r--r-- 1 fuqiang dc-sw-users 1452493082 Oct 28 08:52 f997ab75c9658a9e47bb4db7b91b89a3.clang_ohos-arm64-ef33c3-20240828.tar.gz
```

# 完整编译

进入源码根目录，执行

```bash
cd oh5
./build.sh --product-name **xxx **--ccache --prebuilt-sdk
```

进行版本编译。其中，xxx 代表产品方案，目前支持的产品方案包括：

- deb1
- musepaper
- musepaper2
- musepapermini4g

例如，要编译 musepaper 的固件，使用如下命令：

```bash
./build.sh --product-name musepaper** **--ccache --prebuilt-sdk
```

## 常用构建参数说明

### --fast-rebuild

```
./build.sh --product-name rk3568 --ccache --no-prebuilt-sdk --fast-rebuild
## 编译流程主要分为：preloader->loader->gn->ninja这四个过程
## 在本地没有修改gn和产品配置相关文件的前提下，--fast-rebuild会直接从ninja编译开始
## 该参数可以减少编译总耗时
```

### --prebuilt-sdk

在执行完整编译前先编译 SDK，并整理拷贝 SDK 到 `prebuilts/ohos-sdk`，build.sh 支持通过参数 `sdk_platform=xxx` 指定 SDK 的运行平台，支持 mac/win/linux/ohos/default，default 在 linux 主机下为`{windows,linux,ohos}`，在 mac 主机下为`{mac}`

例如：

```bash
./build.sh --product-name xxx --ccache --prebuilt-sdk sdk_platform=default
```

# 生成烧录 img

```bash
./build/gen_zip.sh **xxx**
```

其中，xxx 代表产品方案，目前支持的产品方案包括：

- deb1
- musepaper
- musepaper2
- musepapermini4g

生成的可烧录的 img 在

```bash
out/**xxx**/packages/phone/images/**openharmony-spacemit-xxx.zip**
```

该 img 可以通过进迭的烧录工具 TitanFlasher 烧录。TitanFlasher 烧录工具的使用方法和下载连接如下：[点我查看](https://developer.spacemit.com/documentation?token=O6wlwlXcoiBZUikVNh2cczhin5d)

# 单独编译模块

## 单独编译内核

```bash
./build.sh -product-name xxx --ccache --prebuilt-sdk -T build_kernel
```

上面的 `build_kernel` 定义在 `device/board/spacemit/xxx/kernel/BUILD.gn`：

```bash
action("build_kernel") {
  script = "build_kernel.sh"
  sources = [ kernel_source_dir ]
  outputs = [ "$root_build_dir/packages/phone/images/Image" ]
  args = [
      rebase_path(kernel_build_script_dir,root_build_dir),
      rebase_path("$root_build_dir/../.."),
      rebase_path("$root_build_dir/packages/phone/images"),
      rebase_path(kernel_source_dir),
      rebase_path(kernel_build_script_dir),
      kernel_ramdisk,
      product_company,
      product_name,
  ]
}

```

内核源码路径在：`kernel/linux/spacemit_kernel-6.6`

out 目录下生成的 patching 后的内核源码路径在：`out/kernel/OBJ/xxx`

编译生成的内核镜像路径在：`out/kernel/OBJ/xxx/arch/riscv/boot/Image.itb`

编译生成的 dtb 文件路径在：`out/kernel/OBJ/xxx/arch/riscv/boot/dts/spacemit/k1-x_xxx.dtb`

生成的内核镜像和 dtb 文件会自动拷贝到 `out/xxx/packages/phone/images/bootfs` 目录中，打包脚本会将其打包到 img 中。

## 单独编译 HDF 适配层

以 display 为例：

```c
./build.sh -product-name xxx --ccache --prebuilt-sdk -T display_composer_vendor
```

display 的适配代码在 `device/soc/spacemit/k1/hardware/display`，`display_composer_vendor` 的定义在 `device/soc/spacemit/k1/hardware/display/BUILD.gn`

```bash
ohos_shared_library("display_composer_vendor") {
  sources = [
    "src/display_device/drm_connector.cpp",
    "src/display_device/drm_crtc.cpp",
    "src/display_device/drm_device.cpp",
    ...
```

编译后生成的 so 在：

```bash
-rwxr-x---+ 1 fuqiang dc-sw-users 181000 Jun  7 08:55 ./out/deb1/hdf/spacemit_products/libdisplay_composer_vendor.z.so
```

而下面文件夹中的 so 没有更新，需要注意看更新时间和 md5 值

```bash
-rwxr-x---+ 1 fuqiang dc-sw-users 180968 Jun  6 16:02 ./out/deb1/packages/phone/vendor/lib64/libdisplay_composer_vendor.z.so
```

生成的动态库可以通过 hdc 推送到机器中，方便调试，避免重新烧固件，命令如下：

```
D:\>hdc shell
# mount -o remount,rw /                #system分区可读写
# mount -o remount,rw /vendor          #vendor分区可读写
# exit

D:\>hdc file send xxx.so /vendor/lib64/
D:\>hdc shell
# reboot
```

## 单独编译 SDK

```bash
./build.py --product-name ohos-sdk --ccache=true --xcache=false --load-test-config=false --get-warning-list=false --stat-ccache=false --compute-overlap-rate=false --deps-guard=false --generate-ninja-trace=false --gn-args skip_generate_module_list_file=true **sdk_platform=linux** **ndk_platform=linux** use_cfi=false use_thin_lto=false enable_lto_O0=true sdk_check_flag=false enable_ndk_doxygen=false archive_ndk=false sdk_for_hap_build=true enable_archive_sdk=false enable_notice_collection=false enable_process_notice=false
```

通过更改 `sdk_platform` 和 `ndk_platform` 参数可以编译在不同 OS 运行的 SDK，NDK 输出位于 `out/sdk/sdk-native`

## 快速编译

用下面的命令编译目标模块速度更快：

```sql
ninja -w dupbuild=warn -C out/xxx yyy -j8

# xxx表示方案名
# yyy表示构建目标
```

例如要编译 MUSEPaper 方案的 libomxvpu\_dec 目标，命令如下：

```sql
ninja -w dupbuild=warn -C out/musepaper libomxvpu_dec -j8
```

# FAQ

引用自 [进迭时空开发者文档](https://developer.spacemit.com/documentation?token=OQRQwIzlAiPAxikkNSJcKvFJnQf)
