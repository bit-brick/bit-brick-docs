# Building Your Own Blog on K1
![alt text](image-1.png)
We can build our own static blog on K1 to record our life and study. There are many ways to implement a blog. Today, we will use Hexo to build our first blog.

## Introduction to Hexo
Hexo is a fast, simple, and efficient blog framework. Hexo parses articles using Markdown (or other markup languages) and can generate static web pages with beautiful themes within seconds.

## Installing Hexo
The installation of Hexo requires a nodejs environment, npm, and git. Let's install its prerequisites first. If you already have them, you can skip this step.
~~~
sudo apt install nodejs
sudo apt install npm
sudo apt install git
~~~
After the installation is completed, we can start installing Hexo.
~~~
sudo npm install -g hexo-cli
~~~
At this point, we have completed the installation of Hexo.

## Using Hexo
After installing Hexo, please execute the following commands. Hexo will create the required files in the specified folder.
~~~
$ hexo init <folder>
$ cd <folder>
$ npm install
~~~
After initialization, your project folder will be as follows:
~~~
├── _config.yml
├── package.json
├── scaffolds
|── source
|   ├── _drafts
|   └── _posts
└── themes
~~~
Run hexo server, and you can access your blog locally.
~~~
bitbrick@k1:~$ cd blog
bitbrick@k1:~/blog$ hexo server
INFO  Validating config
INFO  Start processing
INFO  Hexo is running at http://localhost:4000/. Press Ctrl+C to stop.
~~~
![alt text](image.png)
For more information on using Hexo, please visit the official website: https://hexo.io/.