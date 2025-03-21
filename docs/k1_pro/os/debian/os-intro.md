# to be done

~~~
sudo apt update
sudo apt install docker.io
~~~
设置iptable
~~~
sudo update-alternatives --set iptables /usr/sbin/iptables-legacy
sudo update-alternatives --set ip6tables /usr/sbin/ip6tables-legacy
~~~
设置镜像源并重启docker服务
~~~
sudo mkdir -p /etc/docker 
sudo tee /etc/docker/daemon.json <<EOF{ "registry-mirrors": [ "https://docker.1ms.run", "https://docker.xuanyuan.me" ]}EOF
sudo systemctl daemon-reload 
sudo systemctl restart docker
~~~


安装HA
~~~
mkdir /home/linaro/HA/ha_config
~~~


~~~
sudo docker run -d \
--name homeassistant \
--privileged \
--restart=unless-stopped \
-e TZ="Asia/Shanghai" \
-v /home/linaro/HA/ha_config:/config \
-v /run/dbus:/run/dbus:ro \
--network=host \
ghcr.nju.edu.cn/home-assistant/home-assistant:stable
~~~
