# 在K1上玩转 Nginx web服务器

## Nginx 简介

Nginx（发音同engine x）是一个异步框架的 Web 服务器，也可以用作反向代理，负载平衡器 和 HTTP 缓存。该软件由 [Igor Sysoev](https://zh.wikipedia.org/wiki/%E4%BC%8A%E6%88%88%E7%88%BE%C2%B7%E8%B3%BD%E7%B4%A2%E8%80%B6%E5%A4%AB) 创建，并于2004年首次公开发布。同名公司成立于2011年，以提供支持。Nginx 是一款免费的开源软件，根据类 BSD 许可证的条款发布。一大部分Web服务器使用 Nginx ，通常作为负载均衡器。<sup>[[1]][wiki]</sup>

## Nginx的特点

- 更快：
    - 单次请求会得到更快的响应。
    - 在高并发环境下，Nginx 比其他 WEB 服务器有更快的响应。
- 高扩展性：
    - Nginx 是基于模块化设计，由多个耦合度极低的模块组成，因此具有很高的扩展性。许多高流量的网站都倾向于开发符合自己业务特性的定制模块。
- 高可靠性：
    - Nginx 的可靠性来自于其核心框架代码的优秀设计，模块设计的简单性。另外，官方提供的常用模块都非常稳定，每个 worker 进程相对独立，master 进程在一个 worker 进程出错时可以快速拉起新的 worker 子进程提供服务。
- 低内存消耗：
    - 一般情况下，10000个非活跃的 `HTTP Keep-Alive` 连接在 Nginx 中仅消耗 `2.5MB` 的内存，这是 Nginx 支持高并发连接的基础。
    - 单机支持10万以上的并发连接：**理论上，Nginx 支持的并发连接上限取决于内存，10万远未封顶。**
- 热部署:
    - master 进程与 worker 进程的分离设计，使得 Nginx 能够提供热部署功能，即在 7x24 小时不间断服务的前提下，升级 Nginx 的可执行文件。当然，它也支持不停止服务就更新配置项，更换日志文件等功能。
- 最自由的 BSD 许可协议:
    - 这是 Nginx 可以快速发展的强大动力。BSD 许可协议不只是允许用户免费使用 Nginx ，它还允许用户在自己的项目中直接使用或修改 Nginx 源码，然后发布。

[wiki]:https://zh.wikipedia.org/wiki/Nginx "wiki"

## 安装 Nginx
在 Bianbu OS 的源中已经支持nginx，我们直接用apt的方式安装
~~~
sudo apt update
sudo apt install nginx
~~~

验证是否安装成功，可以使用`nginx -v`看查看版本
~~~
nginx -v
nginx version: nginx/1.24.0 (Ubuntu)
~~~

## Nginx 初步使用指南

nginx有一个master进程和多个worker进程。主进程的主要目的是读取和评估配置，以及维护工作进程。工作进程实际处理请求。nginx 采用基于事件的模型和依赖于操作系统的机制来在工作进程之间有效地分配请求。工作进程的数量在配置文件中定义，对于给定的配置可以是固定的，也可以根据可用 CPU 核心的数量自动调整（请参阅 worker_processes）。

nginx 及其模块的工作方式是在配置文件中确定的。默认情况下，配置文件被命名nginx.conf 并放置在目录 /usr/local/nginx/conf、 /etc/nginx或 中/usr/local/etc/nginx。

### 启动、停止和重新加载配置
要启动 nginx，请运行可执行文件。一旦nginx启动，就可以通过带-s参数调用可执行文件来控制它。使用以下语法：
~~~
nginx -s signal
~~~
其中信号可能是以下之一：

- stop — 快速关闭
- quit — 优雅关闭
- reload — 重新加载配置文件
- reopen — 重新打开日志文件
例如，要停止 nginx 进程并等待工作进程完成当前请求的服务，可以执行以下命令：
~~~
nginx -s quit
~~~
该命令应在启动 nginx 的同一用户下执行。

在将重新加载配置的命令发送到 nginx 或重新启动之前，配置文件中所做的更改将不会应用。要重新加载配置，请执行：
~~~
nginx -s reload
~~~
一旦主进程收到重新加载配置的信号，它就会检查新配置文件的语法有效性并尝试应用其中提供的配置。如果成功，主进程将启动新的工作进程并向旧工作进程发送消息，请求它们关闭。否则，主进程将回滚更改并继续使用旧配置。旧的工作进程收到关闭命令，停止接受新连接并继续服务当前请求，直到所有此类请求都得到服务。之后，旧的工作进程退出。

信号也可以在 Unix 工具（例如kill实用程序）的帮助下发送到 nginx 进程。在这种情况下，信号将直接发送到具有给定进程 ID 的进程。默认情况下，nginx主进程的进程ID写入到 `nginx.pid`目录 `/usr/local/nginx/logs`或 `/var/run`. 例如，如果主进程 ID 为 1628，要发送 QUIT 信号导致 nginx 正常关闭，请执行：
~~~
kill -s QUIT 1628
~~~
为了获取所有正在运行的 nginx 进程的列表，ps 可以使用该实用程序，例如，按以下方式：
~~~
ps -ax | grep nginx
~~~
有关向 nginx 发送信号的更多信息，请参阅 [控制 nginx](https://nginx.github.net.cn/en/docs/control.html)。

### 配置文件的结构
nginx 由由配置文件中指定的指令控制的模块组成。指令分为简单指令和块指令。简单的指令由名称和参数组成，名称和参数之间用空格分隔，并以分号 ( ;) 结尾。块指令具有与简单指令相同的结构，但它不是以分号结尾，而是以一组由大括号 ({和}) 包围的附加指令结尾。如果块指令可以在大括号内包含其他指令，则称为上下文（例如： events、 http、 server和 location）。

放置在任何上下文之外的配置文件中的指令都被视为位于 主上下文中。和events指令http驻留在main上下文中、server http和location  中 server。

符号之后的其余行#被视为注释。

### 提供静态内容
一项重要的 Web 服务器任务是提供文件（例如图像或静态 HTML 页面）。您将实现一个示例，其中根据请求，将从不同的本地目录提供文件：（/data/www 可能包含 HTML 文件）和/data/images （包含图像）。这将需要编辑配置文件并在http块 内设置 具有两个位置块的服务器块 。

首先，创建/data/www目录并将 index.html包含任何文本内容的文件放入其中，然后创建/data/images目录并在其中放置一些图像。

接下来，打开配置文件。默认配置文件已包含该server块的几个示例，大部分已注释掉。现在注释掉所有此类块并开始一个新 server块：
~~~
http {
    server {
    }
}
~~~
一般来说，配置文件可以包括几个 server块， 这些块通过它们侦听的端口和 服务器名称来区分。一旦 nginx 决定由哪个进程处理请求，它就会根据块内定义的指令 参数测试请求标头中指定的 URI 。 serverlocationserver

将以下location块添加到 server块中：
~~~
location / {
    root /data/www;
}
~~~

该location块指定/与请求中的 URI 相比的“ ”前缀。对于匹配的请求，URI 将被添加到root指令中指定的路径 （即 to ）/data/www中，以形成请求的文件在本地文件系统上的路径。如果有多个匹配location块，nginx 将选择具有最长前缀的那个。上面的块location提供了长度为 1 的最短前缀，因此只有当所有其他location 块无法提供匹配时，才会使用该块。

接下来，添加第二个location块：
~~~
location /images/ {
    root /data;
}
~~~
它将匹配以/images/ (location /也匹配此类请求，但前缀较短) 开头的请求。

该块的最终配置server应如下所示：
~~~
server {
    location / {
        root /data/www;
    }

    location /images/ {
        root /data;
    }
}
~~~
这已经是一个服务器的工作配置，它侦听标准端口 80，并且可以在本地计算机上访问 http://localhost/。为了响应 URI 开头的请求/images/，服务器将从/data/images目录发送文件。例如，为了响应请求， http://localhost/images/example.png   nginx 将发送/data/images/example.png文件。如果该文件不存在，nginx将发送404错误响应。URI 不以 开头的请求/images/将被映射到/data/www目录上。例如，为了响应请求， http://localhost/some/example.html  nginx 将发送/data/www/some/example.html文件。

要应用新配置，请启动 nginx（如果尚未启动）或reload通过执行以下命令将信号发送到 nginx 的主进程：
~~~
nginx -s reload
~~~

### 设置简单的代理服务器
nginx 的常见用途之一是将其设置为代理服务器，这意味着服务器接收请求，将它们传递到代理服务器，检索它们的响应，然后将它们发送到客户端。

我们将配置一个基本的代理服务器，它服务于本地目录中带有文件的图像请求，并将所有其他请求发送到代理服务器。在此示例中，两个服务器都将在单个 nginx 实例上定义。

首先，通过在 nginx 的配置文件中添加一个块来定义代理服务器，server 其中包含以下内容：
~~~
server {
    listen 8080;
    root /data/up1;

    location / {
    }
}
~~~
这将是一个简单的服务器，它侦听端口 8080（以前，listen由于使用了标准端口 80，因此尚未指定该指令）并将所有请求映射到/data/up1本地文件系统上的目录。创建该目录并将index.html文件放入其中。请注意，该root指令放置在 server上下文中。当选择用于服务请求的块不包含其自己的指令 时，root使用 此类指令。locationroot

接下来，使用上一节中的服务器配置并修改它以使其成为代理服务器配置。在第一个location块中，将 proxy_pass 指令与参数中指定的代理服务器的协议、名称和端口放在一起（在我们的例子中是http://localhost:8080 ）：
~~~
server {
    location / {
        proxy_pass http://localhost:8080;
    }

    location /images/ {
        root /data;
    }
}
~~~
我们将修改第二个location 块，该块当前将带有/images/ 前缀的请求映射到目录下的文件/data/images，以使其匹配具有典型文件扩展名的图像的请求。修改后的location块如下所示：
~~~
location ~ \.(gif|jpg|png)$ {
    root /data/images;
}
~~~
参数是匹配所有以.gif、.jpg、 或结尾的 URI 的正则表达式.png。正则表达式前面应带有~. 相应的请求将被映射到该/data/images 目录。

当 nginx 选择一个location块来服务请求时，它首先检查 指定前缀的位置location指令，记住 最长的前缀，然后检查正则表达式。如果与正则表达式匹配，nginx 会选择这个 location，否则，它会选择之前记住的那个。

代理服务器的最终配置如下所示：
~~~
server {
    location / {
        proxy_pass http://localhost:8080/;
    }

    location ~ \.(gif|jpg|png)$ {
        root /data/images;
    }
}
~~~
该服务器将过滤以.gif、 .jpg、 或结尾的请求.png ，并将它们映射到/data/images目录（通过将 URI 添加到 root指令的参数），并将所有其他请求传递到上面配置的代理服务器。

要应用新配置，请将reload信号发送到 nginx，如前面部分所述。

还有更多[指令](https://nginx.github.net.cn/en/docs/http/ngx_http_proxy_module.html) 可用于进一步配置代理连接。


### 设置 FastCGI 代理
nginx 可用于将请求路由到 FastCGI 服务器，该服务器运行使用各种框架和编程语言（例如 PHP）构建的应用程序。

与 FastCGI 服务器配合使用的最基本的 nginx 配置包括使用 [fastcgi_pass](https://nginx.github.net.cn/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_pass) 指令代替 指令proxy_pass，以及使用[fastcgi_param](https://nginx.github.net.cn/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_param) 指令来设置传递给 FastCGI 服务器的参数。假设可以在localhost:9000. 以上一节的代理配置为基础，将proxy_pass指令替换为 fastcgi_pass指令，并将参数更改为 localhost:9000。在PHP中，SCRIPT_FILENAME参数用于确定脚本名称，QUERY_STRING 参数用于传递请求参数。最终的配置将是：
~~~
server {
    location / {
        fastcgi_pass  localhost:9000;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param QUERY_STRING    $query_string;
    }

    location ~ \.(gif|jpg|png)$ {
        root /data/images;
    }
}
~~~
这将设置一个服务器，它将除静态图像请求之外的所有请求路由到通过 localhost:9000FastCGI 协议运行的代理服务器。
