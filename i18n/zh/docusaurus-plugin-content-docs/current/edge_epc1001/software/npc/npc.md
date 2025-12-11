# NPC内网穿透
## 1.NPC的介绍
NPC（NPS客户端）是一款轻量级、高性能的内网穿透工具，可配合NPS服务端实现公网访问内网资源，支持 TCP/UDP转发、HTTP代理、SOCKS5代理、P2P 等多种模式。

[NPS'github](https://github.com/ehang-io/nps)

## 2. NPC的使用
NPS服务的搭建在此文档不做赘述，本文档只关注NPC在EPC1001上的使用。

### 2.1 下载arm64版本的NCP客户端
地址如下
https://github.com/ehang-io/nps/releases/download/v0.26.10/linux_arm64_client.tar.gz

解压下载下来的文件：
~~~
tar -zxvf linux_arm64_client.tar.gz
~~~
得到npc客户端，如不能执行就增加执行权限
~~~
chmod +x npc
~~~
### 2.2 运行npc
~~~
nohup ./npc -server='你的服务端地址' -vkey='服务端设置的key'  > ./npc.log 2>&1 &
~~~

## 2.自动启
我们可以把npc服务加入开机自启动，
### 2.1 创建启动脚本
首先创建一个启动脚本，脚本内容如下：
` /home/bitbrick/dev/npc/start.sh`
~~~
#!/bin/bash
cd /home/bitbrick/dev/npc/
# 你自己的npc目录
# 最大等待时间（秒）
TIMEOUT=30
WAITED=0

# 网络接口列表
INTERFACES=("usb0" "wwan0" "eth0")

echo "等待至少一个接口获取 IP..."

while true; do
    NETWORK_READY=false
    for IFACE in "${INTERFACES[@]}"; do
        # 检查接口是否存在并且有 IP
        if ip addr show "$IFACE" 2>/dev/null | grep -q "inet "; then
            NETWORK_READY=true
            break
        fi
    done

    if [ "$NETWORK_READY" = true ]; then
        echo "网络就绪，启动 npc"
        break
    fi

    sleep 1
    WAITED=$((WAITED+1))
    if [ $WAITED -ge $TIMEOUT ]; then
        echo "等待网络超时，退出" >&2
        exit 1
    fi
done

# 启动 npc 前台进程，让 systemd 追踪
exec ./npc -server=xxxxx -vkey=xxxx
~~~
上述脚本加入了网络检测，只有当本地网口`eth0`或者`4G`、`5G`模块获取到IP地址的时候才会去启动npc,你可以按需修改

### 2.2 创建配置文件
在/etc/systemd/system/目录下创建一个npc.service配置文件，内容如下

`/etc/systemd/system/npc.service`
~~~ 
[Unit]
Description=Npc intranet penetration
After=quectel-dial.service
Wants=quectel-dial.service

[Service]
Type=simple
User=bitbrick
WorkingDirectory=/home/bitbrick/dev/npc
ExecStart=/home/bitbrick/dev/npc/start.sh
Restart=on-failure
RestartSec=10s
StartLimitIntervalSec=0


[Install]
WantedBy=multi-user.target
~~~
此处的
~~~
After=quectel-dial.service
Wants=quectel-dial.service
~~~
是当你在使用4G、5G模块的拨号的时候可以选择的配置，如果不使用移动通讯模块进行拨号上网，则可以去掉这部分配置

### 2.3 启用服务
~~~
sudo systemctl daemon-reload
sudo systemctl enable npc.service
sudo systemctl start npc.service
~~~