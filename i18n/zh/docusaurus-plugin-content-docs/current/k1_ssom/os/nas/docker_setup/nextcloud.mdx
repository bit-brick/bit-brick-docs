---
sidebar_position: 3
---

# NextCloud

Nextcloud 是一个开源的文件同步和共享平台，类似于私人云存储服务。它允许用户在自己的服务器上托管文件、日历、联系人等数据，确保数据的完全控制和隐私保护。Nextcloud 支持文件同步、在线协作、共享以及与各种应用和服务的集成，广泛应用于企业、组织和个人的云解决方案。

NextCloud 的 docker-compose.yml 内容如下：

```yaml
version: '3.2'

networks:
  default:
    name: nextcloud

services:
  app:
    image: harbor.spacemit.com/application/nextcloud:28.0.3   # 移植的NextCloud镜像
    restart: unless-stopped
    volumes:
      - ./Nextcloud_docker/app:/var/www/html
    environment:
      - MYSQL_PASSWORD=nextcloud_password # 按需修改
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_HOST=db
      - TZ=Asia/Shanghai
    ports:
      - 8443:443  # 映射 HTTPS 端口
    networks:
      - default

  db:
    image: harbor.spacemit.com/application/mariadb:10.11.6   # 移植的MariaDB镜像
    restart: unless-stopped
    volumes:
      - ./Nextcloud_docker/db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=nextcloud_mysql_password # 按需修改
      - MYSQL_PASSWORD=nextcloud_password            # 按需修改
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - TZ=Asia/Shanghai
    networks:
      - default
```

拉取服务后，浏览器输入 `https://HOST_IP:8443` 访问 NextCloud，管理员账号和密码自行设置。