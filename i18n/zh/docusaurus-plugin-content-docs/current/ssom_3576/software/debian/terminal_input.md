# 中文输入法配置
## 一、配置IBUS开机自启动文件

1、打开终端，编辑 `~/.xprofile`
命令：`vi ~/.xprofile`

2、输入i进入插入模式，将以下命令写进文件中
命令：`i`

```bash
          export GTK_IM_MODULE=ibus
          export QT_IM_MODULE=ibus
          export XMODIFIERS="@im=ibus"
          ibus-daemon -drx
```
3、先按esc退出编辑模式，随后输入:wq命令保存并退出编辑器
命令：`:wq`

4、输入以下命令使配置生效
命令：`source ~/.xprofile`


## 二、配置IBUS应用程序自启动会话

1、添加ibus应用程序自启动
路径：所有应用程序—设置—会话和启动—应用程序自启动—添加应用程序

2、配置
名称：IBUS
描述：可不写
命令：ibus-daemon -drx
触发器：登录时

配置完成后点击确定

### 三、重启系统
如桌面右上角出现输入法图标则表示配置成功

FAQ：

Q:Xterm 中文方块：

1、如果在Xterm中输入中文时出现方块，可能是因为缺少中文字体。可以通过以下命令安装常用的中文字体：
```
sudo apt install fonts-noto-cjk fonts-wqy-zenhei  -y
```
2、换用更加现代化的terminal，如Gnome Terminal等，这些终端通常对中文支持更好。
```
sudo apt install gnome-terminal -y
```
3、使用gnome-terminal时，可能出现不能输入中文的情况。

这是因为XFCE 启动时不会自动读取 ~/.xprofile，但会读取 ~/.profile 和 ~/.xsessionrc，我们可以在这些文件中加入环境变量。
推荐方式：
编辑 ~/.xsessionrc（如果没有就创建一个）：
nano ~/.xsessionrc
加入以下内容：
```bash
export GTK_IM_MODULE=ibus
export QT_IM_MODULE=ibus
export XMODIFIERS="@im=ibus"
```
重启之后就可以在gnome-terminal中输入中文了。