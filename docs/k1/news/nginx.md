# Having Fun with Nginx Web Server on K1
## Introduction to Nginx
Nginx (pronounced like "engine x") is an asynchronous framework Web server, and it can also be used as a reverse proxy, a load balancer, and an HTTP cache. The software was created by [Igor Sysoev](https://en.wikipedia.org/wiki/Igor_Sysoev) and first publicly released in 2004. The company with the same name was founded in 2011 to provide support. Nginx is a free and open-source software, released under the terms of a BSD - like license. A large part of Web servers use Nginx, usually as a load balancer. <sup>[[1]][wiki]</sup>
## Features of Nginx
- Faster:
    - A single request will get a faster response.
    - In a high - concurrency environment, Nginx has a faster response than other WEB servers.
- High Scalability:
    - Nginx is based on a modular design and consists of multiple modules with extremely low coupling, so it has high scalability. Many high - traffic websites tend to develop customized modules that suit their business characteristics.
- High Reliability:
    - The reliability of Nginx comes from the excellent design of its core framework code and the simplicity of its module design. Additionally, the commonly used modules provided by the official are very out stable, each worker process is relatively independent, and the master process can quickly start a new worker subprocess to provide service when a worker process encounters an error.
- Low Memory Consumption:
    - In general, 10,000 inactive `HTTP Keep - Alive` connections in Nginx only consume `2.5MB` of memory. This is the basis for Nginx to support a high number of concurrent connections.
    - A single machine supports more than 100,000 concurrent connections: **In theory, the upper limit of concurrent connections supported by Nginx depends on memory, and 100,000 is far from the limit.**
- Hot Deployment:
    - The separation design of the master process and the worker processes enables Nginx to provide a hot deployment feature, that is, to upgrade the Nginx executable file under the premise of providing 7x24 uninterrupted service. Of course, it also supports updating configuration items and replacing log files without stopping the service.
- The Most Liberal BSD License:
    - This is a powerful driving force for the rapid development of Nginx. The BSD license not only allows users to use Nginx for free, but also allows users to directly use or modify the Nginx source code in their own projects and then release it.
[wiki]:https://en.wikipedia.org/wiki/Nginx "wiki"
## Installing Nginx
Nginx is already supported in the Bianbu OS source. We can install it directly using apt:
~~~
sudo apt update
sudo apt install nginx
~~~
To verify whether the installation is successful, we can use `nginx -v` to check the version:
~~~
nginx -v
nginx version: nginx/1.24.0 (Ubuntu)
~~~
## A Preliminary Guide to Using Nginx
Nginx has one master process and multiple worker processes. The main purpose of the master process is to read and evaluate the configuration and maintain the worker processes. The worker processes actually handle requests. Nginx uses an event - based model and an operating system - dependent mechanism to effectively distribute requests among the worker processes. The number of worker processes is defined in the configuration file and can be fixed for a given configuration or automatically adjusted according to the number of available CPU cores (see worker_processes).
Nginx and its modules operate in a way determined by the configuration file. By default, the configuration file is named nginx.conf and is placed in the directories /usr/local/nginx/conf, /etc/nginx, or /usr/local/etc/nginx.
### Starting, Stopping, and Reloading the Configuration
To start Nginx, run the executable file. Once Nginx is started, it can be controlled by calling the executable file with the -s parameter. Use the following syntax:
~~~
nginx -s signal
~~~
where the signal can be one of the following:
- stop — fast shutdown
- quit — graceful shutdown
- reload — reload the configuration file
- reopen — reopen the log file
For example, to stop the Nginx process and wait for the worker processes to finish serving the current requests, execute the following command:
~~~
nginx -s quit
~~~
This command should be executed under the same user who started Nginx.
Changes made in the configuration file will not be applied until the command to reload the configuration is sent to Nginx or it is restarted. To reload the configuration, execute:
~~~
nginx -s reload
~~~
Once the master process receives the signal to reload the configuration, it checks the syntactic validity of the new configuration file and tries to apply the configuration provided in it. If successful, the master process will start new worker processes and send a message to the old worker processes, asking them to close. Otherwise, the master process will roll back the changes and continue using the old configuration. The old worker processes receive the close command, stop accepting new connections and continue serving the current requests until all such requests are served. After that, the old worker processes exit.
The signal can also be sent to the Nginx process with the help of Unix tools (such as the kill utility). In this case, the signal will be sent directly to the process with the given process ID. By default, the process ID of the Nginx master process is written to the `nginx.pid` file in the directories `/usr/local/nginx/logs` or `/var/run`. For example, if the master process ID is 1628, to send the QUIT signal to cause Nginx to close gracefully, execute:
~~~
kill -s QUIT 1628
~~~
To get a list of all running Nginx processes, the ps utility can be used, for example, in the following way:
~~~
ps -ax | grep nginx
~~~
For more information about sending signals to Nginx, see [Controlling Nginx](https://nginx.github.net.cn/en/docs/control.html).
### Structure of the Configuration File
Nginx consists of modules controlled by directives specified in the configuration file. Directives are divided into simple directives and block directives. A simple directive consists of a name and parameters, separated by a space between the name and the parameters, and ends with a semicolon (;). A block directive has the same structure as a simple directive, but instead of ending with a semicolon, it ends with a set of additional directives enclosed by braces ({ and }). If a block directive can contain other directives within the braces, it is called a context (e.g., events, http, server, and location).
Directives in the configuration file placed outside any context are considered to be in the main context. The events and http directives reside in the main context, and the server and location directives reside in the server context.
The remaining lines after the # symbol are considered comments.
### Providing Static Content
One important task of a Web server is to provide files (such as images or static HTML pages). You will implement an example where, according to the request, files will be provided from different local directories: (/data/www may contain HTML files) and /data/images (contains images). This will require editing the configuration file and setting a server block with two location blocks within the http block.
First, create the /data/www directory and put an index.html file with any text content into it, then create the /data/images directory and put some images in it.
Next, open the configuration file. The default configuration file already contains several examples of the server block, most of which are commented out. Now comment out all such blocks and start a new server block:
~~~
http {
    server {
    }
~~~
In general, the configuration file can include several server blocks, which are distinguished by the ports they listen on and the server names. Once Nginx decides which process will handle a request, it tests the URI specified in the request header according to the parameters of the directives defined within the block. serverlocationserver
Add the following location block to the server block:
~~~
location / {
    root /data/www;
~~~
This location block specifies the " " prefix compared to the URI in the request. For a matching request, the URI will be added to the path specified by the root directive (i.e., to /data/www) to form the path of the requested file on the local file system. If there are multiple matching location blocks, Nginx will choose the one with the longest prefix. The above location block provides the shortest prefix of length 1, so it will be used only when all other location blocks fail to provide a match.
Next, add a second location block:
~~~
(Also include a "{" and "}" for the location block in the markdown code block)
location /images/ {
    root /data;
}
~~~
It will match requests starting with /images/ (the location / also matches such requests, but with a shorter prefix).
The final configuration of the server block should be as follows:
~~~
server {
    location / {
        root /data/www;
    }
    location /images/ {
        root /
data;
    }
~~~
This is already a working configuration for a server that listens on the standard port 80 and can be accessed on the local computer as http://localhost/. To respond to requests starting with /images/, the server will send files from the /data/images directory. For example, to respond to the request http://localhost/images/example.png, Nginx will send the /data/images/example.png file. If the file does not exist, Nginx will send a 404 error response. Requests whose URIs do not start with /images/ will be mapped to the /data/www directory. For example, to respond to the request http://localhost/some/example.html, Nnginx will send the /data/www/some/example.html file.
To apply the new configuration, start Nginx (if it is not already started) or send the reload signal to Nginx's master process by executing the following command:
~~~
nginx -s reload
~~~
### Setting a Simple Proxy Server
One common use of Nginx is to set it as a proxy server, which means the server receives requests, passes them to the proxy server, retrieves their responses, and then sends them to the client.
We will configure a basic proxy server that serves image requests with files in a local directory and sends all other requests to the proxy server. In this example, both servers will be defined on a single Nginx instance.
First, define the proxy server by adding a server block to Nginx's configuration file, which contains the following:
~~~
server {
    listen 8080;
    root /data/up1;
    location / {
    }
~~~
This will be a simple server that listens on port 8080 (previously, the listen directive was not specified because the standard port 80 was used) and maps all requests to the /data/up1 directory on the local file system. Create this directory and put an index.html file into it. Note that the root directive is placed in the server context. When the block selected to serve a request does not contain its own root directive, the root directive in the server context is used.
Next, use the server configuration from the previous section and modify it to make it a proxy server configuration. In the first location block, put the proxy_pass directive together with the protocol, name, and port of the proxy server specified in the parameters (in our case, http://localhost:8080):
~~~
server {
    location / {
        proxy_pass http://localhost:8080;
    }
    location /images/ {
        root /data;
    }
~~~
We will modify the second location block, which currently maps requests with the /images/ prefix to files in the /data/images directory, to make it match requests for images with typical file extensions. The modified location block is as follows:
~~~
location ~ \.(gif|jpg|png)$ {
    root /data/images;
~~~
The parameter is a regular expression that matches all URIs ending with.gif,.jpg, or.png. The regular expression should be preceded by ~. The corresponding requests will be mapped to the /data/images directory.
When Nginx selects a location block to serve a request, it first checks the location of the specified prefix, remembers the longest prefix, and then checks the regular expression. If it matches the regular expression, Nginx will choose this location, otherwise, it will choose the one remembered before.
The final configuration of the proxy server is as follows:
~~~
server {
    location / {
        proxy_pass http://localhost:8080/;
    }
    location ~ \.(gif|jpg|png)$ {
        root /data/images;
    }
~~~
This server will filter requests ending with.gif,.jpg, or.png and map them to the /data/images directory (by adding the URI to the root directive's parameters), and send all other requests to the proxy server configured above.
To apply the new configuration, send the reload signal to Nginx as described in the previous section.
There are more [instructions](https://nginx.github.net.cn/en/docs/http/ngx_http_proxy_module.html) available for further configuring the proxy connection.
### Setting a FastCGI Proxy
Nginx can be used to route requests to a FastCGI server, which runs applications built using various frameworks and programming languages (e.g., PHP).
The most basic Nginx configuration for working with a FastCGI server includes using the [fastcgi_pass](https://nginx.github.net.cn/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_pass) directive instead of the proxy_pass directive, and using the [fastcgi_param](https://nginx.github.net.cn/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_param) directive to set the parameters passed to the FastCGI server. Assume it can be accessed at localhost:9000. Based on the proxy configuration in the previous section, replace the proxy_pass directive with the fastcgi_pass directive and change the parameters to localhost:900 directeur

The final configuration will be:
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
~~~
This will set a server that routes all requests except static image requests to a proxy server running via the FastCGI protocol at localhost:9000.