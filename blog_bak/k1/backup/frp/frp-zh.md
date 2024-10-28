# 在K1上使用frp来做内网穿透
## 内网穿透介绍
![alt text](image.png)
互联网上两个不同的主机进行通信首先需要知道对方IP。根据IP协议，只有分配了公网IP的设备才能在互联网上通信和传输数据。而中国人口/设备众多，分配到的IPv4资源又少，因此绝大部分情况是通过路由器/交换机转换公网IP后才上网。

位于路由器/交换机后的设备一般是内网设备，分配的IP地址以192.168/172.16/10.0开头，属于内网IP。要让内网设备对外提供服务，就需要进行内网穿透。
## frp介绍
frp 是一个开源、简洁易用、高性能的内网穿透和反向代理软件，支持 tcp, udp, http, https等协议。

frp 项目官网是 https://github.com/fatedier/frp ，中文官方文档地址：https://github.com/fatedier/frp/blob/master/README_zh.md 除了安装过程，中文文档对使用过程已经介绍的非常详细，如遇到问题，建议先查看官方文档。

frp工作原理为：

1. 服务端运行，监听一个主端口，等待客户端的连接；
2. 客户端连接到服务端的主端口，同时告诉服务端要监听的端口和转发类型；
3. 服务端fork新的进程监听客户端指定的端口；
4. 外网用户连接到客户端指定的端口，服务端通过和客户端的连接将数据转发到客户端；
5. 客户端进程再将数据转发到本地服务，从而实现内网对外暴露服务的能力。
   
## 部署frp服务端
首先你得拥有一台有公网ip的服务器，可以是VPS或者云服务，我们以阿里云ECS作为例子。
1. 打开 frp[下载页面](https://github.com/fatedier/frp/releases)，下载最新版的 frp_0.61.0_linux_amd64.tar.gz，然后上传到服务器(，也可以ssh连接到服务器后用wget下载：

~~~
wget https://github.com/fatedier/frp/releases/download/v0.61.0/frp_0.61.0_linux_amd64.tar.gz
~~~

2. 服务器上解压安装包：`tar -zxvf frp_0.61.0_linux_amd64.tar.gz`；
3. 编辑 `frps.toml`
~~~
[common]
# frp监听的端口，默认是7000，可以改成其他的
bind_port = 7000
# 授权码，请改成更复杂的
token = 1234567890
~~~
4. 启动服务端：`./frps -c ./frps.toml`
5. 防火墙放行7000端口：

## 部署frp客户端
在K1上下载frp客户端：
~~~
wget https://github.com/fatedier/frp/releases/download/v0.61.0/frp_0.61.0_linux_riscv64.tar.gz 
~~~

2. 解压安装包：`tar -zxvf frp_0.61.0_linux_riscv64.tar.gz`；
3. 编辑 `frpc.toml`
~~~
# 服务端配置
[common]
server_addr = your server ip
server_port = 7000
token = 1234567890

# 配置ssh服务
[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 自定义的远程服务器端口，例如2222


~~~

4. 启动客户端：`./frpc -c ./frpc.toml`
   
至此我们就完成了内网穿透，就可以随处使用ssh访问我们的K1了。
~~~
ssh -p 2222 bitbrick@xxx.xx.xxx
~~~