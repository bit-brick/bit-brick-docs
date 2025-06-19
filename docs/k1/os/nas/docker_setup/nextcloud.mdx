---
sidebar_position: 3
---

# NextCloud

Nextcloud is an open-source file synchronization and sharing platform, similar to a private cloud storage service. It allows users to host files, calendars, contacts, and more on their own servers, ensuring complete control and privacy protection. Nextcloud supports file synchronization, online collaboration, sharing, and integration with various applications and services, making it widely used in cloud solutions for enterprises, organizations, and individuals.

The docker-compose.yml configuration for Nextcloud is as follows:

```yaml
version: '3.2'

networks:
  default:
    name: nextcloud

services:
  app:
    image: harbor.spacemit.com/application/nextcloud:28.0.3
    restart: unless-stopped
    volumes:
      - ./Nextcloud_docker/app:/var/www/html
    environment:
      - MYSQL_PASSWORD=nextcloud_password 
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_HOST=db
      - TZ=Asia/Shanghai
    ports:
      - 8443:443  # Map HTTPS Port
    networks:
      - default

  db:
    image: harbor.spacemit.com/application/mariadb:10.11.6
    restart: unless-stopped
    volumes:
      - ./Nextcloud_docker/db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=nextcloud_mysql_password
      - MYSQL_PASSWORD=nextcloud_password
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - TZ=Asia/Shanghai
    networks:
      - default
```

After pulling the service, access NextCloud via `https://HOST_IP:8443`. You'll be prompted to set up the admin account and password on the first login.