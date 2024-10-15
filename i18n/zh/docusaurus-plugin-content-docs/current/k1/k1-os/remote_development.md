---
sidebar_position: 5
---

# 远程开发



## VS Code in the browser

部署[code-server](https://github.com/coder/code-server)远程VS Code网页，在浏览器上写代码。

在Bianbu上安装`code-server`：

```shell
sudo apt-get install code-server
```

运行`code-server`，其中`IP`要换成本机IP地址：

```shell
code-server --host IP --port PORT
```

注意，不指定`IP`时，默认为localhost，只能在本机浏览器访问，`PORT`通常可以不指定。当看到以下信息，表示`code-server`启动成功。

```
info HTTP server listening on http://IP:PORT/
info  Session server listening on ~/.local/share/code-server/code-server-ipc.sock
```

在任何电脑、平板上打开浏览器，访问`http://IP:PORT`，即可打开远程的文件夹和文件。

![code-server](/img/k1/os/vscode.png)

已知问题：

- 并非所有扩展可以正常使用

## VSCodium Open Remote - SSH

[VSCodium](https://vscodium.com/)是VS Code的开源版本，其中插件[Open Remote - SSH](https://open-vsx.org/extension/jeanp413/open-remote-ssh)支持远程开发。

1. 安装VSCodium，参考[官方指南](https://vscodium.com/#install)。
2. 打开VSCodium，进入扩展页面，搜索`Open Remote - SSH`，然后安装。
3. 打开远程资源管理器，即可连接SSH Target。
4. 连接成功，即可打开远程的文件夹和文件。
