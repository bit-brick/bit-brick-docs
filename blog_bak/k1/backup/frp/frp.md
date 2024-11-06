# Using frp for Internal Network Penetration on K1
## Introduction to Internal Network Penetration

![alt text](image.png)
For two different hosts on the Internet to communicate, they first need to know each other's IP. According to the IP protocol, only devices assigned a public IP can communicate and transmit data on the Internet. China has a large population/devices, and the IPv4 resources allocated are scarce, so in most cases, devices access the Internet after being converted through a router/switch with a public IP.

Devices behind a router/switch are generally internal network devices, assigned IP addresses starting with 192.168/172.16/10.0, which are internal IPs. To provide services externally from an internal network device, internal network penetration is required.
## Introduction to frp
frp is an open-source, simple, easy-to-use, high-performance internal network penetration and reverse proxy software, supporting protocols such as tcp, udp, http, https, etc.

The official website of the frp project is https://github.com/fatedier/frp, and the official Chinese documentation address is: https://github.com/fatedier/frp/blob/master/README_zh.md In addition to the installation process, the Chinese documentation has a very detailed introduction to the usage process. If you encounter any problems, it is recommended to check the official documentation first.

The working principle of frp is as follows:

1. The server runs and listens on a main port, waiting for the client to connect;
2. The client connects to the server's main port and tells the server the port to listen to and the forwarding type;
3. The server forks a new process to listen on the port specified by the client;
4. External network users connect to the port specified by the client, and the server forwards the data to the client through the connection with the client;
5. The client process then forwards the data to the local service, thereby achieving the ability to expose services externally from the internal network.

## Deploy frp Server
First, you need to have a server with a public IP, which can be a VPS or cloud service. We will use Alibaba Cloud ECS as an example.
1. Open the frp [download page](https://github.com/fatedier/frp/releases) and download the latest version frp_0.61.0_linux_amd64.tar.gz, then upload it to the server (you can also download it using wget after connecting to the server via ssh):

~~~
wget https://github.com/fatedier/frp/releases/download/v0.61.0/frp_0.61.0_linux_amd64.tar.gz
~~~

2. Extract and install the package on the server: `tar -zxvf frp_0.61.0_linux_amd64.tar.gz`;
3. Edit `frps.toml`
~~~
[common]
# The port frp listens on, default is 7000, can be changed to others
bind_port = 7000
# Authorization code, please change to a more complex one
token = 1234567890
~~~
4. Start the server: `./frps -c ./frps.toml`
5. Firewall to allow port 7000:

## Deploy frp Client
Download the frp client on K1:
~~~
wget https://github.com/fatedier/frp/releases/download/v0.61.0/frp_0.61.0_linux_riscv64.tar.gz 
~~~

2. Extract and install the package: `tar -zxvf frp_0.61.0_linux_riscv64.tar.gz`;
3. Edit `frpc.toml`
~~~
# Server configuration
[common]
server_addr = your server ip
server_port = 7000
token = 1234567890

# Configure ssh service
[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = Custom remote server port, for example 2222
~~~

4. Start the client: `./frpc -c ./frpc.toml`

Now we have completed the internal network penetration, and we can use ssh to access our K1 from anywhere.
~~~
ssh -p 2222 bitbrick@xxx.xx.xxx
~~~
