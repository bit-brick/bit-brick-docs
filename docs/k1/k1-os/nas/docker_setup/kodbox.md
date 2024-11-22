---
sidebar_position: 4
---

# Kodbox

Kodbox is an open-source online file management system, similar to a private cloud drive. It supports multi-user management and file sharing, allowing users to easily manage, preview, edit, and share files through a browser. Kodbox offers features such as file upload and download, online preview, document editing, and multi-format support, making it suitable for individuals and teams to set up private cloud storage on a local network or server for file management. It supports a wide range of plugin extensions, has a user-friendly interface, and is commonly used for internal file management or team collaboration within organizations.

The docker-compose.yml configuration for Kodbox is as follows:

```yaml
version: '3.5'

services:
  kodbox:
    image: harbor.spacemit.com/application/kodbox:1.50.02
    restart: always
    ports:
      - 8080:80
    volumes:
      - "./site:/var/www/html"        # ./site is the site directory location and can be modified.
```

After pulling the service, access Kodbox via `http://HOST_IP:8080`. You'll be prompted to set up the admin account and password on the first login.