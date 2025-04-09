# Linux Basics

## 1. Introduction

Most users are accustomed to Windows' graphical interface operations. While K1 Pro's basic applications can be completed through its graphical interface, there are still many operations that cannot be done through the interface, such as system configuration. However, almost all programs can be called and run through the command line. Therefore, proficiency in common Linux commands holds a high position in entry-level learning. To make K1 Pro more convenient to use, this chapter will introduce some common Linux commands used in K1 Pro development.

## 2. Terminal Introduction

1. On K1 Pro, you can access the terminal through serial port or SSH login. If using a local display to log in, you can press `Ctrl+Alt+T` to open the default terminal. K1 Pro's default prompt is as follows:
   - `linaro` indicates the current username / login name
   - `linaro` indicates the hostname
   - `~` indicates the current user's directory is `/home/linaro`
   - `$` character indicates the current login is a regular user
   - `#` character indicates the login is root user

2. K1 Pro defaults to logging in as regular linaro user. To switch to root user, enter in the terminal:

```bash
sudo su root  # Regular user switching to root user
su linaro     # Root user switching to regular user
```

## 3. Linux File Directory

In Windows, each partition is a tree structure, with as many tree structures as there are partitions, while in Linux there is only one tree structure, and all files and partitions exist within this single tree structure. In this structure, the top level is the root directory, and all other directories, files, and partitions are established under the root directory. Common directories:

- `/bin`: Contains binary executable files related to the K1 Pro system (including those required to run the graphical interface).
- `/boot`: Boot directory, contains the Linux kernel and other software packages used to start K1 Pro.
- `/dev`: Device directory, in Linux systems, all devices are treated as files, and this directory contains all devices, such as the first SATA hard drive or USB drive recognized as the `sda` file.
- `/etc`: System management and configuration files.
- `/home`: User directory, where data for all users except the root user is stored.
- `/lib`: Location for dynamic link library files of the basic system.
- `/media`: Contains removable storage drives, such as USB drives, optical drives, etc.
- `/root`: This directory is the home directory for the system administrator, also known as the superuser.

## 4. File System

In the Linux operating system, all resources managed by the operating system, such as network interface cards, disk drives, printers, input/output devices, regular files or directories, etc., are treated as files. This is an important concept in Linux systems, namely "everything is a file." **File System** is a mechanism used by the operating system to manage and organize data on storage devices (such as hard drives, SSDs, flash memory, etc.). Its core function is to define how to store, retrieve, and manage files on storage devices. Linux supports a wide range of file systems, including the EXT series (EXT2, EXT3, EXT4), XFS file system, and file systems specifically designed for NAND-type devices such as ubifs, jffs2, yaffs2, etc.

- **EXT2**: An early Linux file system without journaling functionality, suitable for small storage devices like USB drives.
- **EXT3**: An upgraded version of EXT2, supports journaling functionality, greatly improving data security and file recovery capabilities.
- **EXT4**: Currently the most commonly used Linux file system, supports large files (up to 16 TB files and 1 EB file system), with excellent performance, stability, and security.
- **XFS**: A high-performance 64-bit journaling file system designed for handling large files and high-concurrency applications.
- **JFFS2 and UBIFS**: File systems specifically designed for FLASH memory, featuring wear leveling and power failure protection to reduce storage wear. JFFS2 (Journaling Flash File System v2) provides journaling structure and bad block management, but as capacity increases, its performance and memory usage increase, extending lifespan through wear leveling and data compression. UBIFS (Unsorted Block Image File System) supports dynamic file management and direct mounting, suitable for large-capacity NAND flash, requiring cooperation with the UBI layer for more effective wear leveling and bad block management, while employing data compression.

### 4.1 inode and block Introduction

**Inode** (index node) is the metadata structure for each file or directory in the Linux file system, recording the file's attributes (such as file size, permissions, timestamps, etc.), but does not include the file name and file data. Each file or directory is assigned a unique inode upon creation, and the system uses the inode number to locate the file's storage location. Files are stored on the hard disk, and the smallest storage unit of the hard disk is a sector, each sector being 512 bytes in size. To improve efficiency, the operating system reads multiple sectors at once, forming a **block**, usually 4KB in size (composed of 8 sectors). File metadata is stored in the inode, while file data is stored in one or more blocks.

1. View sector size:

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

2. View `inode` information:

```bash
# Create a new file and write three lines of numbers
linaro@linaro:~$ tee 1.txt <<EOF
> 1111
> 1111
> 1111
> EOF

# View inode information
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

- **Access**: `(0644/-rw-r--r--)`: File permissions
- **Access**: `2024-08-26 12:51:16.816002017 +00`: Last access time of the file
- **Modify**: `2024-08-26 12:51:35.924002026 +0000`: Last modification time of the file content.
- **Change**: `2024-08-26 12:51:35.924002026 +0000`: Last modification time of the file's metadata (such as permissions or owner)
- **Birth**: `2024-08-26 12:51:16.816002017 +0000`: File creation time (not supported by some file systems)

### 4.2 inode Considerations

1. The number of inodes is limited, and each file system can only contain a fixed number of inodes. This means that when the inodes in the file system are exhausted, new files or directories cannot be created, even if there is available space on the disk. Therefore, when creating a file system, it is necessary to reasonably allocate the number of inodes based on the expected number of files and directories.

2. If a file name contains special characters, it may not be deleted normally. In this case, directly deleting the `inode` can achieve the purpose of deleting the file.

```bash
find ./* -inum inode_number -delete
```

### 4.3 Soft Links and Hard Links

| Feature       | Hard Link                        | Soft Link                        |
|---------------|----------------------------------|----------------------------------|
| Pointing Method | Points to the same inode        | Points to the path (text reference) |
| Cross File System Support | Not supported                  | Supported                        |
| Impact After Source File Deletion | Link remains valid            | Link becomes invalid (dangling link) |
| Creation Command | `ln filename linkname`          | `ln -s target linkname`         |
| Objects That Can Be Linked | Any file                        | Any file or directory           |

## 5. Common Linux Commands

### ls

#### Command Function

The `ls` command is used to display the contents of the specified working directory (list the files and subdirectories contained in the current working directory).

#### Command Format

`ls`[-ahl] _directory_

#### Parameter Description

| Parameter      | Description                        | Path                             |
|----------------|------------------------------------|----------------------------------|
| _directory_    | Target directory to display        | Can be a relative path or absolute path. |

#### Usage Examples

```bash
ls -a  # Display all files and directories (hidden files starting with . will also be listed)
ls -l  # List detailed information such as file type, permissions, owner, file size, etc.
ls -lh # List file sizes in an easy-to-understand format, such as 4K
ls -i  # View file inode number
```

### cd

#### Command Function

The `cd` command is used to change the current working directory.

#### Command Format

`cd`[ _directory_ ]

#### Parameter Description

| Parameter      | Description                        | Value                            |
|----------------|------------------------------------|----------------------------------|
| _directory_    | Target directory to switch to, can be a relative path or absolute path. | String format, does not support spaces, absolute path name length range is 1~64. |

#### Usage Examples

```bash
cd          # Return to the user directory
cd ..       # Return to the previous directory
cd /bin     # Enter the /bin directory
cd ../..    # Enter the upper two levels of the current directory
cd ~        # Enter the user's home directory
cd -        # Switch to the last visited directory
```

### pwd

#### Command Function

The `pwd` command is used to display the working directory. Executing the pwd command immediately reveals the absolute path name of the current working directory.

#### Usage Examples

### df

#### Command Function

The `df` command is used to display the current disk usage statistics of the file system on the Linux system.

#### Usage Examples

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

#### Command Function

The `touch` command is used to modify the time attributes of files or directories, including access time and modification time. If the file does not exist, the system will create a new file.

#### Usage Examples

```bash
touch file.txt       # Create a new file named file.txt
```

### mkdir

#### Command Function

The `mkdir` command is used to create directories.

#### Command Format

`mkdir`[ _options_ ] directory

#### Parameter Description

| Parameter      | Description                        |
|----------------|------------------------------------|
| _options_      | -p Create parent directories if they do not exist |
| _directory_    | Specify the name of the directory to be created. |

#### Usage Examples

```bash
mkdir linaro              # Create a subdirectory named linaro
mkdir -p linaro/test      # Create a directory named linaro/test
```

### cp

#### Command Function

The `cp` command is mainly used to copy files or directories.

#### Command Format

`cp`[ _options_ ] source dest

#### Parameter Description

| Parameter      | Description                        |
|----------------|------------------------------------|
| _options_      | Options such as -r, -f            |
| _source_       | Specify the path and source file name to be copied. |
| _dest_         | Specify the path and target file name. |

#### Usage Examples

```bash
cp test.txt /bin           # Copy test.txt to the /bin directory
cp –r test/ /usr/newtest   # Copy the test folder to the /usr directory and rename it to newtest
```

### mv

#### Command Function

The `mv` command is used to rename files or directories, or move files or directories to other locations.

#### Command Format

`mv`[ _options_ ] source dest

#### Parameter Description

| Parameter      | Description                        |
|----------------|------------------------------------|
| _options_      | Options such as -i, -f            |
| _source_       | Specify the path and source file name to be moved. |
| _dest_         | Specify the path and target file name. |

#### Usage Examples

```bash
mv file1 /userdata          # Move the file1 file to the /userdata directory
```

### rm

#### Command Function

The `rm` command is used to delete a file or directory.

#### Command Format

`rm`[ _options_ ] file/directory

#### Parameter Description

| Parameter      | Description                        |
|----------------|------------------------------------|
| _options_      | Options such as -r, -f            |
| _file/directory_| Target file or directory name to be deleted. |

#### Usage Examples

```bash
rm test.txt         # Delete the test.txt file
rm -r linaro       # Delete the linaro directory
```

### chmod

#### Command Function

The `chmod` command is used to control user permissions for files.

#### Command Details

1. Linux/Unix file permissions are divided into three levels: file owner (Owner), user group (Group), and other users (Other Users).

2. In the terminal below, detailed file information in the Linux root directory is displayed. Among this file information, the most important is the first column, which describes the permissions of files and directories in detail, while the third and fourth columns show which user or group the file or directory belongs to.

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

3. Linux file attributes can be divided into three types: read (r), write (w), and execute (x). However, the file attributes above are divided into 10 small grids, because in addition to the first grid showing the directory, the other three groups of three grids each represent the permissions of the file owner, the permissions within the same group, and the permissions of other users. If the first column shows `d`, it indicates that this is a directory; if it is a link file, it shows `l`; if it is a device file, it shows `c`.

   - The first `rwx` column: - rwx --- --- indicates the permissions of the file owner.
   - The second `rwx` column: - --- rwx --- indicates the permissions of users within the same group.
   - The third `rwx` column: - --- --- rwx indicates the permissions of other users.
   - `rwx rwx rwx` indicates that any user can read, write, and execute this file.
   - `rw- --- ---` indicates that only the file owner has read and write permissions, but no execute permissions.
   - `rw- rw- rw-` indicates that all users have read and write permissions.

4. Symbol Mode

   - **who (User Type)**

     | who | User Type | Description |
     |-----|-----------|-------------|
     | u   | user      | File owner |
     | g   | group     | Group to which the file owner belongs |
     | o   | others    | All other users |
     | a   | all       | All users, equivalent to ugo |

   - **operator (Symbol Mode Table)**

     | Operator | Description |
     |----------|-------------|
     | +        | Add permissions for the specified user type |
     | -        | Remove permissions for the specified user type |
     | =        | Set permissions for the specified user type, i.e., reset all permissions for the user type |

   - **permission (Symbol Mode Table)**

     | Mode | Name | Description |
     |------|------|-------------|
     | r    | Read | Set read permissions |
     | w    | Write | Set write permissions |
     | x    | Execute | Set execute permissions |
     | X    | Special Execute | Only set execute permissions if the file is a directory file or other types of users have execute permissions |
     | s    | setuid/gid | Set the file's setuid or setgid permissions when the file is executed, based on the who parameter |
     | t    | Sticky Bit | Set the sticky bit, only superusers can set this bit, and only the file owner u can use this bit |

   - **Examples**

     ```bash
     chmod a+r file             # Add read permissions for all users to file
     chmod a-x file             # Remove execute permissions for all users from file
     chmod a+rw file            # Add read and write permissions for all users to file
     chmod +rwx file            # Add read, write, and execute permissions for all users to file
     chmod u=rw,go= file        # Set read and write permissions for the file owner, clear all permissions for the group and other users (space represents no permissions)
     chmod -R u+r,go-r linaro  # Add read permissions for the user to the linaro directory and its subdirectory hierarchy, and remove read permissions for the group and other users
     ```

5. Numeric Mode

   - **Octal Syntax**

     | # | Permissions | rwx | Binary |
     |---|-------------|-----|--------|
     | 7 | Read + Write + Execute | rwx | 111 |
     | 6 | Read + Write | rw- | 110 |
     | 5 | Read + Execute | r-x | 101 |
     | 4 | Read Only | r-- | 100 |
     | 3 | Write + Execute | -wx | 011 |
     | 2 | Write Only | -w- | 010 |
     | 1 | Execute Only | --x | 001 |
     | 0 | None | --- | 000 |

   - **For example: 765 is explained as follows:**

     - The owner's permissions are expressed numerically: The sum of the numbers for the owner's three permission bits. For example, `rwx`, which is `4 + 2 + 1`, should be `7`.
     - The group's permissions are expressed numerically: The sum of the numbers for the group's permission bits. For example, `rw-`, which is `4 + 2 + 0`, should be `6`.
     - Other users' permissions are expressed numerically: The sum of the numbers for other users' permission bits. For example, `r-x`, which is `4 + 0 + 1`, should be `5`.

   - **Common Numeric Permissions**

     - `400` - `r-- --- ---` The owner can read, but no one else can perform any operations;
     - `644` - `rw- r-- r--` Everyone can read, but only the owner can edit;
     - `660` - `rw- rw- ---` The owner and group users can read and write, but no one else can perform any operations;
     - `664` - `rw- rw- r--` Everyone can read, but only the owner and group users can edit;
     - `700` - `rwx --- ---` The owner can read, write, and execute, but no one else can perform any operations;
     - `744` - `rwx r-- r--` Everyone can read, but only the owner can edit and execute;
     - `755` - `rwx r-x r-x` Everyone can read and execute, but only the owner can edit;
     - `777` - `rwx rwx rwx` Everyone can read, write, and execute (this setting is not recommended).

   - **Examples**

     ```bash
     chmod 664 file  # Add read permissions for all users to file, and edit permissions for the owner and group users
     ```

### tar

#### Command Function

The `tar` command is used to create and restore backup files. It can extract files from backup files. tar itself does not compress files, but it can be combined with compression tools (such as gzip or bzip2) to create compressed archive files (such as `.tar.gz` or `.tar.bz2`).

#### Command Format

`tar`[options] -f linaro.tar [file/directory]

#### Parameter Description

| Parameter | Description |
|----------|-------------|
| -x       | Indicates extraction operation |
| -c       | Indicates creation operation |
| -v       | Display detailed operation process |
| -f       | Specify the name of the archive file (must be placed at the end of the option list) |
| -z       | Use gzip for compression |
| -j       | Use bzip2 for compression |
| -J       | Use xz for compression |
| file/directory | Target file or directory to be compressed or extracted |

#### Usage Examples

1. Create a compressed file

```bash
tar -czvf linaro.tar.gz 1.txt 2.txt 3.txt directory            # Compress files and directories using gzip
tar -czvf linaro.tar.gz directory                              # Compress using gzip
tar -cjvf linaro.tar.bz2 directory                             # Compress using bzip2
tar -cJvf linaro.tar.xz directory                              # Compress using xz
```

2. Extract a compressed file

```bash
tar -xzvf linaro.tar.gz directory                              # Extract using gzip
tar -xjvf linaro.tar.bz2 directory                             # Extract using bzip2
tar -xJvf linaro.tar.xz directory                              # Extract using xz
```

### find

#### Command Function

The `find` command is used to search for files in the specified directory. Any string before the parameters will be considered as the directory name to search. If no parameters are set when using this command, the find command will search for subdirectories and files in the current directory. It will display all found subdirectories and files.

#### Command Format

`find`[path][match condition][action]

#### Parameter Description

| Parameter      | Description                        |
|----------------|------------------------------------|
| _path_         | Directory path to search, can be a directory or file name, or multiple paths separated by spaces. If no path is specified, the current directory is used by default |
| _match condition_ | Specifies the search criteria, such as file name, file type, file size, etc. |
| _action_       | Specifies the action to be performed on the matched files, such as delete, copy, etc. |

#### Usage Examples

- Search by file name, for example, search for the `linaro.py` file:

```bash
sudo find -name linaro.py
```

- Search by file nesting level.

```bash
# Search files with a maximum depth of 1, all found files are in the /etc directory, for example, search for .conf files in the /etc directory
sudo find /etc/ -maxdepth 1 -name *.conf

# Search files with a minimum depth of 2, found files will not include files in the /etc directory, but will search the /etc subdirectory
sudo find /etc/ -mindepth 2 -name *.conf
```

- List all files updated within the last 20 days in the current directory and its subdirectories:

```bash
sudo find . -type f -mtime -20
```

- Search for files in the current directory whose owner has read and write permissions, and whose group and other users have read permissions:

```bash
sudo find . -type f -perm 644 -exec ls -l {} \;
```

- Search for all zero-length regular files in the system and list their full paths:

```bash
sudo find / -type f -size 0 -exec ls -l {} \;
```

### cat

#### Command Function

The `cat` command is used to concatenate files and print them to the standard output device. Its main function is to view and concatenate files.

#### Command Format

`cat`[options][file]

#### Parameter Description

| Parameter      | Description                        |
|----------------|------------------------------------|
| _options_      | `-n`: Display line numbers, adds line numbers to each line of output |
| _file_         | File name                          |

#### Usage Examples

1. Display the contents of the `test.txt` file in the terminal:

```bash
cat test.txt
```

2. List the contents of all `.txt` files in the current directory:

```bash
cat *.txt
```

3. Append standard input to the end of the file `file`:

```bash
cat >> file
```

4. Redirect standard input to the file `file`, overwriting its contents:

```bash
cat > file
```

5. Merge the contents of `file1` and `file2` into `file3`:

```bash
cat file1 file2 > file3
```

### grep

#### Command Function

The `grep` command, as one of the Linux text processing tools, along with sed and awk, is used to search for specific patterns within files. It can list all combinations containing specific letters.

#### Command Format

`grep`[options] pattern [files]

#### Parameter Description

| Parameter      | Description                        |
|----------------|------------------------------------|
| options        | `-i`: Ignore case during matching   |
|                | `-v`: Perform reverse search, only print non-matching lines |
|                | `-n`: Display line numbers of matching lines |
|                | `-r`: Recursively search files in subdirectories |
|                | `-l`: Only print matching file names |
|                | `-c`: Only print the number of matching lines |
| pattern        | Specifies the string or regular expression to search for |
| files          | Specifies the file name(s) to search, can search multiple files simultaneously |

#### Usage Examples

1. Search for files containing the string `sys` in a folder:

```bash
grep -r "sys" *
```

2. Search the file `config.txt` using a regular expression to find lines starting with `arm`:

```bash
grep "^arm" config.txt
```

3. In the current directory, search for files with the suffix `file` containing the string `test`, and print the lines containing the string:

```bash
grep "test" *.file
```

4. Recursively search all files in the folder `dir` for lines matching the regular expression `linaro`, and print the file name and line number of the matching lines:

```bash
grep -rn "linaro" dir/
```

### ifconfig

#### Command Function

The `ifconfig` command is used to view and configure network devices. When the network environment changes, this command can be used to configure the network accordingly. Note: The network card information configured using the ifconfig command will not persist after the network card or machine is restarted. To permanently store the configuration information, the network card configuration file must be modified.

#### Usage Examples

```bash
sudo ifconfig eth0          # View wired network IP address
sudo ifconfig wlan0         # View wireless network IP address
```

### apt

#### Command Function

Currently, popular Linux distributions provide a centralized package management mechanism to help users search, install, and manage software. Software is usually stored in repositories in the form of "packages," and the use and management of software packages is called package management. This section introduces the basic methods and quick references for package management in Ubuntu and Debian systems, helping you quickly understand basic operations and techniques for different Linux package management.

#### Command Format

`apt`[options][command][package ...]

#### Parameter Description

| Parameter      | Description                        |
|----------------|------------------------------------|
| _options_      | Options include `-h` (help), `-y` (skip prompts during installation), `-q` (do not display installation process), etc. |
| _command_      | Operation to be performed         |
| _package_      | Package name to be installed       |

#### Usage Examples

1. The local database stores the list of remote available package repositories, so it is best to update this database before installing or upgrading packages. The command is as follows:

```bash
sudo apt-get update
```

2. After updating, you can install software using its name. The command is as follows:

```bash
sudo apt-get install XXX -y     #-y Skip prompts during installation
```

3. Without a package management system, upgrading and keeping Linux-installed software up-to-date is a huge task. Administrators and users have to manually track upstream software version changes and security warnings. The package management system can keep software up-to-date with just a few commands, as follows:

```bash
sudo apt-get upgrade            # Update installed packages
sudo apt-get dist-upgrade       # Upgrade the system to the latest version (use with caution)
```

   - Both `upgrade` and `dist-upgrade` are used to upgrade installed packages on the system. However, the `apt-get upgrade` command cannot install new packages or remove installed packages, while `dist-upgrade` can install new packages or remove existing packages when needed.

4. Since package management knows which files are provided by which packages, after uninstalling unnecessary packages, you can get a clean system. You can uninstall an already installed package using the following command:

```bash
# Command to delete a package
sudo apt remove <package_name>
# Clean up unused dependencies and library files
sudo apt autoremove
# Remove package and configuration files
sudo apt purge <package_name>
```

### dpkg

#### Command Function

The Debian system package format is `.deb` files. To directly install generated `.deb` packages, the `dpkg` command is required.

#### Usage Examples

1. Install a package

```bash
sudo dpkg -i package_name.deb
```

2. Uninstall a package

```bash
sudo dpkg -r package_name
```

### shutdown & reboot

1. K1 Pro's shutdown is not recommended to directly unplug the power cord. If using TF card boot, directly unplugging the power cord will cause some data in memory to not be written to the TF card in time, resulting in data loss or damage to the TF card data, causing the system to fail to boot:

```bash
sudo shutdown -h now         # Shut down immediately
sudo shutdown -r now         # Restart the computer
sudo shutdown -h 10          # Shut down in 10 minutes
sudo reboot                  # Restart (commonly used)
```

2. Regardless of which command is used to shut down the system, root user permissions are required. If using a regular user like linaro, you can use the `sudo` command to temporarily obtain root permissions.

## 6. Rockchip Common Commands

1. View NPU driver version

```bash
cat /sys/kernel/debug/rknpu/version
```

2. View chip unique ID

```bash
cat /proc/cpuinfo | grep Serial
```

3. View CPU temperature

```bash
echo "$(cat /sys/class/thermal/thermal_zone0/temp) / 1000" | bc
```
