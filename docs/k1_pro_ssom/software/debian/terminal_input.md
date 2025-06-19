# Chinese Input Method Configuration
## 1. Configure IBUS Auto-Start File

1. Open the terminal and edit `~/.xprofile`
Command: `vi ~/.xprofile`

2. Press i to enter insert mode, and write the following commands into the file
Command: `i`

```bash
          export GTK_IM_MODULE=ibus
          export QT_IM_MODULE=ibus
          export XMODIFIERS="@im=ibus"
          ibus-daemon -drx
```
3. Press esc to exit insert mode, then enter :wq to save and exit the editor
Command: `:wq`

4. Enter the following command to make the configuration take effect
Command: `source ~/.xprofile`


## 2. Configure IBUS Application Auto-Start Session

1. Add ibus application to auto-start
Path: All Applications — Settings — Session and Startup — Application Autostart — Add Application

2. Configuration
Name: IBUS
Description: Optional
Command: ibus-daemon -drx
Trigger: On login

After configuration, click OK

### 3. Restart the System
If the input method icon appears at the top right of the desktop, the configuration is successful

FAQ:

Q: Xterm Chinese squares:

1. If squares appear when entering Chinese in Xterm, it may be due to missing Chinese fonts. You can install common Chinese fonts with the following command:
```
sudo apt install fonts-noto-cjk fonts-wqy-zenhei  -y
```
2. Use a more modern terminal, such as Gnome Terminal, which usually has better Chinese support.
```
sudo apt install gnome-terminal -y
```
3. When using gnome-terminal, you may not be able to input Chinese.

This is because XFCE does not automatically read ~/.xprofile at startup, but it does read ~/.profile and ~/.xsessionrc. You can add environment variables to these files.
Recommended method:
Edit ~/.xsessionrc (create one if it does not exist):
nano ~/.xsessionrc
Add the following content:
```bash
export GTK_IM_MODULE=ibus
export QT_IM_MODULE=ibus
export XMODIFIERS="@im=ibus"
```
After restarting, you will be able to input Chinese in gnome-terminal.