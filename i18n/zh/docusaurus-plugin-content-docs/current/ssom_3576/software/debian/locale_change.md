# 切换系统语言

在Debian下可以使用
```bash
locale
```
查看当前系统的语言环境。   
如果需要切换系统语言成英文，可以按照以下步骤进行：
1. 编辑语言环境配置文件：
```bash
sudo dpkg-reconfigure locales
```
- 使用空格键选中 en_US.UTF-8 UTF-8
- （可选）取消选中 zh_CN.UTF-8 UTF-8 等中文选项
- 然后按 Tab → OK，并在接下来的界面中选择默认语言为：en_US.UTF-8
  
![alt text](./static/image.png)

2. 重启系统

