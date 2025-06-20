
# Linux 基础

## 1. 介绍

大部分用户都已经习惯了 Windows 图形界面化的操作，K1 Pro 日常的基础应用也都可以通过它的图形界面完成，但还是有很多操作无法通过界面完成的，例如系统配置。但是几乎所有的程序都能通过命令行来调用运行，因此，Linux 常用命令的熟练使用在入门学习中占有很高的地位，为更加方便使用 K1 Pro，本章将介绍在 K1 Pro 开发时一些常用的 Linux 命令。

## 2. 终端简介

1. 在 K1 Pro 上，可以通过串口或 SSH 登录进入终端。如果使用本地显示器登录，可以按快捷键 `Ctrl+Alt+T` 打开默认终端。K1 Pro 的默认提示符如下：
   - `linaro` 表示当前用户名 / 登录名
   - `linaro` 表示主机名
   - `~` 表示当前用户所在的目录是 `/home/linaro`
   - `$` 字符表示当前登录的是普通用户
   - `#` 字符表示登录的是 root 用户

2. K1 Pro 默认登录普通 linaro 用户，想要切换 root 用户，在终端输入：

```bash
sudo su root  # 普通用户切换 root 用户
su linaro     # root 用户切换普通用户
```

## 3. Linux 文件目录

在 Windows 中每一个分区都是一个树形结构，有多少个分区就有多少个树形结构，而 Linux 中只有一个树形结构，所有的文件、分区都是存在于一个树形结构中。在这个结构中，最上层的是根目录，其他所有的目录、文件、分区都是在根目录下建立的。常用目录：

- `/bin`：放置与 K1 Pro 系统有关（包括运行图形界面所需的）的二进制可执行文件。
- `/boot`：引导目录，放置 Linux 内核以及其它用来启动 K1 Pro 的软件包。
- `/dev`：设备目录，在 Linux 系统中，所有设备都视为文件，在这个目录中存放了所有设备，例如第一个 SATA 硬盘或 U 盘会被识别为 `sda` 文件。
- `/etc`：系统管理和配置文件。
- `/home`：用户目录，除了 root 用户外，其他所有的使用者的数据都存放在这个目录下。
- `/lib`：基本系统的动态链接库文件存放位置。
- `/media`：放置可移动存储驱动器，例如 U 盘、光驱等等。
- `/root`：该目录为系统管理员，也称作超级权限者的用户主目录。

## 4. 文件系统

在 Linux 操作系统中，一切被操作系统管理的资源，如网络接口卡、磁盘驱动器、打印机、输入输出设备、普通文件或目录等，都被视为文件。这是 Linux 系统中一个重要的概念，即“一切都是文件”。**文件系统（File System）** 是操作系统用来管理和组织存储设备（如硬盘、SSD、闪存等）上的数据的一种机制。其核心作用是定义如何在存储设备上存储、检索和管理文件。Linux 支持非常广泛的文件系统，常见的文件系统有 EXT 系列（EXT2、EXT3、EXT4），XFS 文件系统，还有专门针对 NAND 类型设备的文件系统 ubifs、jffs2、yaffs2 等。

- **EXT2**：早期的 Linux 文件系统，没有日志功能，适合小型存储设备，如 USB 驱动器。
- **EXT3**：EXT2 的升级版，支持日志功能，极大提高了数据的安全性和文件恢复能力。
- **EXT4**：是目前最常用的 Linux 文件系统，支持大文件（最高支持 16 TB 文件和 1 EB 的文件系统），性能、稳定性和安全性都非常好。
- **XFS**：是一个高性能 64 位日志文件系统，设计用于处理大文件和高并发的应用。
- **JFFS2 和 UBIFS**：是专为 FLASH 存储器设计的文件系统，具有擦写平衡和掉电保护，减少存储损耗。JFFS2 (Journaling Flash File System v2) 提供日志结构和坏块管理，但随着容量增大，其性能和内存占用增加，通过磨损均衡和数据压缩延长寿命。UBIFS (Unsorted Block Image File System) 支持动态文件管理和直接挂载，适合大容量 NAND 闪存，需与 UBI 层配合使用，以实现更有效的磨损均衡和坏块管理，同时采用数据压缩。

### 4.1 inode 和 block 介绍

**Inode**（索引节点）是 Linux 文件系统中每个文件或目录的元数据结构，记录了文件的属性（如文件大小、权限、时间戳等），但不包含文件名和文件数据。每个文件或目录在创建时都会分配一个唯一的 Inode，系统通过 Inode 号找到文件的存储位置。文件存储在硬盘上，硬盘的最小存储单位是扇区（sector），每个扇区大小为 512 字节。为了提高效率，操作系统一次性读取多个扇区，组成一个 **块（block）**，通常大小为 4KB（由 8 个扇区组成）。文件的元信息存储在 Inode 中，文件数据则存储在一个或多个 block 中。

1. 查看扇区大小：

```bash
root@linaro:/home/linaro# fdisk -l /dev/mmcblk1
Disk /dev/mmcblk1: 29.13 GiB, 31272730624 bytes, 61079552 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 46680000-0000-454D-8000-121D00005F9A

Device          Start      End  Sectors  Size Type
/dev/mmcblk1p1  16384    24575     8192    4M unknown
/dev/mmcblk1p2  24576    32767     8192    4M unknown
/dev/mmcblk1p3  32768   163839   131072   64M unknown
/dev/mmcblk1p4 163840   425983   262144  128M unknown
/dev/mmcblk1p5 425984   491519    65536   32M unknown
/dev/mmcblk1p6 491520 61079518 60587999 28.9G unknown

root@linaro:/home/linaro# cat /sys/block/mmcblk1/queue/hw_sector_size
512
```

2. 查看 `inode` 信息：

```bash
# 新建文件并写入三行数字
linaro@linaro:~$ tee 1.txt <<EOF
> 1111
> 1111
> 1111
> EOF

# 查看 inode 信息
linaro@linaro:~$ stat 1.txt
    File: 1.txt
    Size: 15              Blocks: 8          IO Block: 4096   regular file
Device: 179,6   Inode: 95246       Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/ linaro)   Gid: ( 1000/ linaro)
Access: 2024-08-26 12:51:16.816002017 +0000
Modify: 2024-08-26 12:51:35.924002026 +0000
Change: 2024-08-26 12:51:35.924002026 +0000
    Birth: 2024-08-26 12:51:16.816002017 +0000
```

- **Access**: `(0644/-rw-r--r--)`：文件权限
- **Access**: `2024-08-26 12:51:16.816002017 +00`：文件上次被访问的时间
- **Modify**: `2024-08-26 12:51:35.924002026 +0000`：文件内容最后一次被修改的时间。
- **Change**: `2024-08-26 12:51:35.924002026 +0000`：文件的元数据（如权限或所有者）最后一次被修改的时间
- **Birth**: `2024-08-26 12:51:16.816002017 +0000`：文件的创建时间（某些文件系统不支持此信息）

### 4.2 inode 注意事项

1. inode 的数量是有限的，每个文件系统只能包含固定数量的 inode。这意味着当文件系统中的 inode 用完时，无法再创建新的文件或目录，即使磁盘上还有可用空间。因此，在创建文件系统时，需要根据文件和目录的预期数量来合理分配 inode 的数量。

2. 文件名包含特殊字符，可能无法正常删除。这时直接删除 `inode`，能够起到删除文件的作用。

```bash
find ./* -inum 节点号 -delete
```

### 4.3 软链接和硬链接

| 特性          | 硬链接                          | 软链接                          |
|---------------|----------------------------------|----------------------------------|
| 指向方式      | 指向相同的 inode                | 指向路径（文本引用）            |
| 跨文件系统支持| 不支持                          | 支持                            |
| 源文件删除后影响| 链接仍然有效                    | 链接失效（悬挂链接）            |
| 创建命令      | `ln filename linkname`          | `ln -s target linkname`         |
| 可以链接的对象| 任何文件                        | 任何文件或目录                  |

## 5. Linux 常用命令

### ls

#### 命令功能

`ls` 命令用于显示指定工作目录下之内容（列出目前工作目录所含之文件及子目录）。

#### 命令格式

`ls`[-ahl] _directory_

#### 参数说明

| 参数          | 参数说明                          | 路径                            |
|---------------|-----------------------------------|----------------------------------|
| _directory_   | 要显示的目标目录                  | 可以是相对路径或绝对路径。       |

#### 使用实例

```bash
ls -a  # 显示所有文件及目录 (. 开头的隐藏文件也会列出 )
ls -l  # 将文件型态、权限、拥有者、文件大小等资讯详细列出
ls -lh # 文件大小以容易理解的格式列出，例如 4K
ls -i  # 查看文件i节点号
```

### cd

#### 命令功能

`cd` 命令用于改变当前工作目录的命令。

#### 命令格式

`cd`[ _directory_ ]

#### 参数说明

| 参数          | 参数说明                          | 取值                            |
|---------------|-----------------------------------|----------------------------------|
| _directory_   | 要切换的目标目录，可以是相对路径或绝对路径。| 字符串形式，不支持空格，绝对路径名长度范围为1～64。|

#### 使用实例

```bash
cd          # 返回用户目录
cd ..       # 返回上一层目录
cd /bin     # 进入 /bin 目录
cd ../..    # 进入当前目录的上两层目录
cd ~        # 进入用户家目录
cd -        # 切换到上次访问的目录
```

### pwd

#### 命令功能

`pwd` 命令用于显示工作目录，执行 pwd 指令可立刻得知您目前所在的工作目录的绝对路径名称。

#### 使用实例

### df

#### 命令功能

`df` 命令用于显示目前在 Linux 系统上的文件系统磁盘使用情况统计。

#### 使用实例

```bash
linaro@linaro:~$ df -Th
Filesystem     Type      Size  Used Avail Use% Mounted on
/dev/root      ext4       29G  3.7G   24G  14% /
devtmpfs       devtmpfs  1.9G  8.0K  1.9G   1% /dev
tmpfs          tmpfs     2.0G     0  2.0G   0% /dev/shm
tmpfs          tmpfs     781M  1.5M  779M   1% /run
tmpfs          tmpfs     5.0M  8.0K  5.0M   1% /run/lock
tmpfs          tmpfs     391M   32K  391M   1% /run/user/1000
```

### touch

#### 命令功能

`touch` 命令用于修改文件或者目录的时间属性，包括存取时间和更改时间。若文件不存在，系统会建立一个新的文件。

#### 使用实例

```bash
touch file.txt       # 新建一个file文件
```

### mkdir

#### 命令功能

`mkdir` 命令用于创建目录。

#### 命令格式

`mkdir`[ _options_ ] directory

#### 参数说明

| 参数          | 参数说明                          |
|---------------|-----------------------------------|
| _options_     | -p 原来的目录不存在则新建一个     |
| _directory_   | 指定被创建的文件名。              |

#### 使用实例

```bash
mkdir linaro              # 建立一个名为 linaro 的子目录
mkdir -p linaro/test      # 建立一个名为 linaro/test 的目录
```

### cp

#### 命令功能

`cp` 命令主要用于复制文件或目录。

#### 命令格式

`cp`[ _options_ ] source dest

#### 参数说明

| 参数          | 参数说明                          |
|---------------|-----------------------------------|
| _options_     | -r、-f 等选项                     |
| _source_      | 指定被复制文件的路径及源文件名。   |
| _dest_        | 指定目标文件的路径及目标文件名。   |

#### 使用实例

```bash
cp test.txt /bin           # 将 test.txt 复制到 /bin 目录下
cp –r test/ /usr/newtest   # 将 test 文件夹复制到 /usr 目录下并重新命名为 newtest
```

### mv

#### 命令功能

`mv` 用来为文件或目录改名、或将文件或目录移入其它位置。

#### 命令格式

`mv`[ _options_ ] source dest

#### 参数说明

| 参数          | 参数说明                          |
|---------------|-----------------------------------|
| _options_     | -i、-f 等选项                     |
| _source_      | 指定被移动文件的路径及源文件名。   |
| _dest_        | 指定目标文件路径及目标文件名。     |

#### 使用实例

```bash
mv file1 /userdata          # 将 file1 文件移动到 /userdata 目录下
```

### rm

#### 命令功能

`rm` 命令用于删除一个文件或者目录。

#### 命令格式

`rm`[ _options_ ] file/directory

#### 参数说明

| 参数          | 参数说明                          |
|---------------|-----------------------------------|
| _options_     | -r、-f 等选项                     |
| _file/directory_| 要删除的目标文件名或目录名。     |

#### 使用实例

```bash
rm test.txt         # 删除 test.txt 文件
rm -r linaro       # 删除 linaro 目录
```

### chmod

#### 命令功能

`chmod` 命令是控制用户对文件的权限的命令。

#### 命令详解

1. Linux/Unix 的文件调用权限分为三级 : 文件所有者（Owner）、用户组（Group）、其它用户（Other Users）。

2. 在下面终端中，显示了 Linux 根目录下的详细文件信息。在这些文件信息中，最重要的就是第一列，它详细描述了文件和目录的权限，而第三与第四列则显示了这个文件和目录属于哪一个用户或组。

```bash
# ls -lh
drwxr-xr-x    2 1002     1002         160 media
lrwxrwxrwx    1 1002     1002           3 lib64 -> lib
lrwxrwxrwx    1 1002     1002           3 lib32 -> lib
drwxrwxr-x    6 1002     1002         664 rockchip_test
drwxrwxr-x    5 1002     1002         576 userdata
lrwxrwxrwx    1 1002     1002          11 linuxrc -> bin/busybox
drwxr-xr-x    2 1002     1002         160 root
drwxrwxr-x    2 1002     1002        2.2K sbin
dr-xr-xr-x  114 root     root           0 proc
lrwxrwxrwx    1 1002     1002           8 data -> userdata
drwxrwxr-x    6 1002     1002         544 usr
drwxr-xr-x    4 1002     1002         672 var
dr-xr-xr-x   13 root     root           0 sys
drwxrwxrwt    2 root     root          60 tmp
drwxr-xr-x    3 root     root          80 run
drwxr-xr-x    2 1002     1002         160 opt
drwxrwxr-x    3 1002     1002         296 oem
drwxr-xr-x    3 1002     1002         224 mnt
drwxrwxr-x    3 1002     1002        2.0K lib
drwxrwxr-x    6 1002     1002        1.5K etc
drwxr-xr-x   12 root     root        1.9K dev
drwxrwxr-x    2 1002     1002        4.1K bin
```

3. Linux 的文件属性可以分为三种：只读（r）、写（w）和可执行（x）。但是上面的文件属性却分为 10 小格，这是因为除了第一格显示目录外，另外三组每组三格分别表示文件所有者权限、同一组内的权限以及其他用户权限。第一栏中如果显示 `d`，则表示这是一个目录；如果是链接文件，则在这里显示 `l`；如果是设备文件，则显示 `c`。

   - 第一个 `rwx` 栏位：- rwx --- --- 表示文件拥有者所拥有的权限。
   - 第二个 `rwx` 栏位：- --- rwx --- 表示同一工作组内用户权限。
   - 第三个 `rwx` 栏位：- --- --- rwx 表示其他用户权限。
   - `rwx rwx rwx` 表示无论哪个用户都可以对这个文件读写与执行。
   - `rw- --- ---` 表示只有文件拥有者有读写权限，但是没有执行权限。
   - `rw- rw- rw-` 表示所有用户都有读写权。

4. 符号模式

   - **who（用户类型）**

     | who | 用户类型 | 说明 |
     |-----|----------|------|
     | u   | user     | 文件所有者 |
     | g   | group    | 文件所有者所在组 |
     | o   | others   | 所有其他用户 |
     | a   | all      | 所用用户, 相当于 ugo |

   - **operator（符号模式表）**

     | Operator | 说明 |
     |----------|------|
     | +        | 为指定的用户类型增加权限 |
     | -        | 去除指定用户类型的权限 |
     | =        | 设置指定用户权限的设置，即将用户类型的所有权限重新设置 |

   - **permission （符号模式表）**

     | 模式 | 名字 | 说明 |
     |------|------|------|
     | r    | 读   | 设置为可读权限 |
     | w    | 写   | 设置为可写权限 |
     | x    | 执行权限 | 设置为可执行权限 |
     | X    | 特殊执行权限 | 只有当文件为目录文件，或者其他类型的用户有可执行权限时，才将文件权限设置可执行 |
     | s    | setuid/gid | 当文件被执行时，根据who参数指定的用户类型设置文件的setuid或者setgid权限 |
     | t    | 粘贴位 | 设置粘贴位，只有超级用户可以设置该位，只有文件所有者u可以使用该位 |

   - **实例**

     ```bash
     chmod a+r file             # 给 file 的所有用户增加读权限
     chmod a-x file             # 删除 file 的所有用户的执行权限
     chmod a+rw file            # 给 file 的所有用户增加读写权限
     chmod +rwx file            # 给 file 的所有用户增加读写执行权限
     chmod u=rw,go= file        # 对 file 的所有者设置读写权限，清空该用户组和其他用户对 file 的所有权限（空格代表无权限）
     chmod -R u+r,go-r linaro  # 对目录 linaro 和其子目录层次结构中的所有文件给用户增加读权限，而对用户组和其他用户删除读权限
     ```

5. 数值模式

   - **八进制语法**

     | # | 权限 | rwx | 二进制 |
     |---|------|-----|--------|
     | 7 | 读 + 写 + 执行 | rwx | 111 |
     | 6 | 读 + 写 | rw- | 110 |
     | 5 | 读 + 执行 | r-x | 101 |
     | 4 | 只读 | r-- | 100 |
     | 3 | 写 + 执行 | -wx | 011 |
     | 2 | 只写 | -w- | 010 |
     | 1 | 只执行 | --x | 001 |
     | 0 | 无 | --- | 000 |

   - **例如：765 的解释如下：**

     - 所有者的权限用数字表达：属主的那三个权限位的数字加起来的总和。如 `rwx`，也就是 `4 + 2 + 1`，应该是 `7`。
     - 用户组的权限用数字表达：属组的那个权限位数字的相加的总和。如 `rw-`，也就是 `4 + 2 + 0`，应该是 `6`。
     - 其它用户的权限数字表达：其它用户权限位的数字相加的总和。如 `r-x`，也就是 `4 + 0 + 1`，应该是 `5`。

   - **常用数字权限**

     - `400` - `r-- --- ---` 拥有者能够读，其他任何人不能进行任何操作；
     - `644` - `rw- r-- r--` 拥有者都能够读，但只有拥有者可以编辑；
     - `660` - `rw- rw- ---` 拥有者和组用户都可读和写，其他人不能进行任何操作；
     - `664` - `rw- rw- r--` 所有人都可读，但只有拥有者和组用户可编辑；
     - `700` - `rwx --- ---` 拥有者能够读、写和执行，其他用户不能任何操作；
     - `744` - `rwx r-- r--` 所有人都能读，但只有拥有者才能编辑和执行；
     - `755` - `rwx r-x r-x` 所有人都能读和执行，但只有拥有者才能编辑；
     - `777` - `rwx rwx rwx` 所有人都能读、写和执行（该设置不建议使用）。

   - **实例**

     ```bash
     chmod 664 file  # 给 file 的所有用户增加读权限，拥有者和组用户可编辑权限
     ```

### tar

#### 命令功能

`tar` 命令是用来建立，还原备份文件的工具程序，它可以解压缩备份文件内的文件。tar 本身不压缩文件，但可以与压缩工具（如 gzip 或 bzip2）结合使用，创建压缩的归档文件（如 `.tar.gz` 或 `.tar.bz2`）。

#### 命令格式

`tar`[options] -f linaro.tar [file/directory]

#### 参数说明

| 参数 | 参数说明 |
|------|----------|
| -x   | 表示解压操作 |
| -c   | 表示创建操作 |
| -v   | 显示详细操作过程 |
| -f   | 指定归档文件的名称（必须放在选项列表的最后） |
| -z   | 使用 gzip 进行解压缩 |
| -j   | 使用 bzip2 进行解压缩 |
| -J   | 使用 xz 进行解压缩 |
| file/directory | 要解压缩的目标文件或目录 |

#### 使用实例

1. 创建压缩文件

```bash
tar -czvf linaro.tar.gz 1.txt 2.txt 3.txt directory            # 将文件和目录使用 gzip 压缩
tar -czvf linaro.tar.gz directory                              # 使用 gzip 压缩
tar -cjvf linaro.tar.bz2 directory                             # 使用 bzip2 压缩
tar -cJvf linaro.tar.xz directory                              # 使用 xz 压缩
```

2. 解压压缩文件

```bash
tar -xzvf linaro.tar.gz directory                              # 使用 gzip 解压
tar -xjvf linaro.tar.bz2 directory                             # 使用 bzip2 解压
tar -xJvf linaro.tar.xz directory                              # 使用 xz 解压
```

### find

#### 命令功能

`find` 命令用来在指定目录下查找文件。任何位于参数之前的字符串都将被视为欲查找的目录名。如果使用该命令时，不设置任何参数，则 find 命令将在当前目录下查找子目录与文件。并且将查找到的子目录和文件全部进行显示。

#### 命令格式

`find`[path][match condition][action]

#### 参数说明

| 参数          | 参数说明                          |
|---------------|-----------------------------------|
| _path_        | 要查找的目录路径，可以是一个目录或文件名，也可以是多个路径，多个路径之间用空格分隔，如果未指定路径，则默认为当前目录 |
| _match condition_ | 用于指定查找的条件，可以是文件名、文件类型、文件大小等 |
| _action_      | 用于对匹配到的文件执行操作，比如删除、复制等 |

#### 使用实例

- 通过文件名查找，例如我们查找 `linaro.py` 文件：

```bash
sudo find -name linaro.py
```

- 通过文件嵌套层数查找。

```bash
# 文件查找最大层数为 1，找出的文件全部在 /etc 目录下，例如查找 /etc 目录下的 .conf 文件
sudo find /etc/ -maxdepth 1 -name *.conf

# 文件查找最小层数为 2，找出的文件不会包含 /etc 目录下文件，而是去 /etc 子目录查找
sudo find /etc/ -mindepth 2 -name *.conf
```

- 将当前目录及其子目录下所有最近 20 天内更新过的文件列出：

```bash
sudo find . -type f -mtime -20
```

- 查找当前目录中文件属主具有读、写权限，并且文件所属组的用户和其他用户具有读权限的文件：

```bash
sudo find . -type f -perm 644 -exec ls -l {} \;
```

- 查找系统中所有文件长度为 0 的普通文件，并列出它们的完整路径：

```bash
sudo find / -type f -size 0 -exec ls -l {} \;
```

### cat

#### 命令功能

`cat` 命令用于连接文件并打印到标准输出设备上，它的主要作用是用于查看和连接文件。

#### 命令格式

`cat`[options][file]

#### 参数说明

| 参数          | 参数说明                          |
|---------------|-----------------------------------|
| _options_     | `-n`：显示行号，会在输出的每一行前加上行号 |
| _file_        | 文件名称                          |

#### 使用实例

1. 在终端上显示 `test.txt` 文件的内容：

```bash
cat test.txt
```

2. 列出 `.txt` 当前目录下所有文件的内容：

```bash
cat *.txt
```

3. 将标准输入追加到文件 `file` 的末尾：

```bash
cat >> file
```

4. 将标准输入重定向到文件 `file`，覆盖该文件的内容：

```bash
cat > file
```

5. 将 `file1` 和 `file2` 的内容合并到 `file3` 中：

```bash
cat file1 file2 > file3
```

### grep

#### 命令功能

`grep` 命令作为 Linux 文本处理三剑客的一员，另外两个是 sed 和 awk。grep 在文件内部搜索某些搜索模式，可以列出包含特殊字母所有组合。

#### 命令格式

`grep`[options] pattern [files]

#### 参数说明

| 参数          | 参数说明                          |
|---------------|-----------------------------------|
| options       | `-i`：忽略大小写进行匹配           |
|               | `-v`：表反向查找，只打印不匹配的行 |
|               | `-n`：显示匹配行的行号             |
|               | `-r`：递归查找子目录中的文件       |
|               | `-l`：只打印匹配的文件名           |
|               | `-c`：只打印匹配的行数             |
| pattern       | 表示要查找的字符串或正则表达式     |
| files         | 表示要查找的文件名，可以同时查找多个文件 |

#### 使用实例

1. 搜索文件夹下包含 `sys` 字符串的文件：

```bash
grep -r "sys" *
```

2. 搜索文件 `config.txt`，使用正则表达式找出以 `arm` 开头的数据行：

```bash
grep "^arm" config.txt
```

3. 在当前目录中，查找后缀有 `file` 字样的文件中包含 `test` 字符串的文件，并打印出该字符串的行：

```bash
grep "test" *.file
```

4. 在文件夹 `dir` 中递归查找所有文件中匹配正则表达式 `linaro` 的行，并打印匹配行所在的文件名和行号：

```bash
grep -rn "linaro" dir/
```

### ifconfig

#### 命令功能

`ifconfig` 命令用来查看和配置网络设备。当网络环境发生改变时可通过此命令对网络进行相应的配置。注意：用 ifconfig 命令配置的网卡信息，在网卡重启后机器重启后，配置就不存在。要想将上述的配置信息永远的存的电脑里，那就要修改网卡的配置文件了。

#### 使用实例

```bash
sudo ifconfig eth0          # 查看有线网络 IP 地址
sudo ifconfig wlan0         # 查看无线网络 IP 地址
```

### apt

#### 命令功能

目前比较流行的 Linux 发行版本都提供了一个集中的软件包管理机制，以帮助用户搜索、安装和管理软件。而软件通常以「包」的形式存储在仓库「repository」中，对软件包的使用和管理被称为包管理。本小节将介绍在使用 Ubuntu、Debian 系统时，搜索、安装和升级等包管理方面的基本方式和快速参考，可以帮助你快速了解不同 Linux 包管理基本操作与技巧。

#### 命令格式

`apt`[options][command][package ...]

#### 参数说明

| 参数          | 参数说明                          |
|---------------|-----------------------------------|
| _options_     | 选项包括 `-h`（帮助），`-y`（当安装过程提示选择全部为"yes"），`-q`（不显示安装的过程）等 |
| _command_     | 要进行的操作                     |
| _package_     | 安装包名称                        |

#### 使用实例

1. 使用的是本地数据库存储远程可用的包仓库列表，所以在安装或升级包之前最好更新这个数据库，命令如下：

```bash
sudo apt-get update
```

2. 更新完成后，就可以使用软件名称安装，命令如下：

```bash
sudo apt-get install XXX -y     #-y 直接跳过提示安装
```

3. 如果没有包管理系统，要升级并保持 Linux 已安装的软件处在最新版本是一项巨大的工程，管理员和用户不得不手动跟踪上游软件版本变化及安全警告。包管理系统只需几条命令便可保持软件最新，具体如下：

```bash
sudo apt-get upgrade            # 更新已安装的软件包
sudo apt-get dist-upgrade       # 将系统升级最新版本（谨慎使用）
```

   - `upgrade` 和 `dist-upgrade` 都用于升级系统上已安装的软件包。但是，`apt-get upgrade` 命令无法安装新软件包或从系统中删除已安装的软件包，`dist-upgrade` 可以安装新包或在需要时删除现有包。

4. 由于包管理知道哪些文件是由哪个包提供的，所以在卸载了不需要的软件包之后，可以获得一个干净的系统。可以通过以下命令卸载一个已经安装的软件包：

```bash
# 删除软件包命令
sudo apt remove <package_name>
# 清理不再使用的依赖和库文件
sudo apt autoremove
# 移除软件包及配置文件
sudo apt purge <package_name>
```

### dpkg

#### 命令功能

Debian 系统包的格式为 `.deb` 文件，要直接安装生成 `.deb` 包时需要使用 `dpkg` 命令。

#### 使用实例

1. 安装包

```bash
sudo dpkg -i package_name.deb
```

2. 卸载包

```bash
sudo dpkg -r package_name
```

### shutdown & reboot

1. K1 Pro 的关机是不建议直接拔掉电源线的，如果使用 TF 卡启动直接拔掉电源线会使一些在内存中的数据没有来得及写入 TF 卡中，从而造成数据的丢失或是损坏 TF 卡上的数据，造成系统无法启动：

```bash
sudo shutdown -h now         # 立即关机
sudo shutdown -r now         # 重新启动计算机
sudo shutdown -h 10          # 指定 10 分钟后关机
sudo reboot                  # 重启（经常使用）
```

2. 无论使用哪一个命令来关闭系统都需要 root 用户权限，如果用户使用 linaro 这样的普通用户，可以使用 `sudo` 命令暂时获得 root 权限。

## 6. Rockchip 常用命令

1. 查看 NPU 驱动版本

```bash
cat /sys/kernel/debug/rknpu/version
```

2. 查看芯片唯一码

```bash
cat /proc/cpuinfo | grep Serial
```

3. 查看 CPU 温度

```bash
echo "$(cat /sys/class/thermal/thermal_zone0/temp) / 1000" | bc
```
