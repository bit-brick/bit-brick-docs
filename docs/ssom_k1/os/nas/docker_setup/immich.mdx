---
sidebar_position: 6
---

# Immich

Immich is an open-source, self-hosted solution for backing up photos and videos, designed for personal and family use. It enables users to back up, manage, and view their media on their own server, offering features similar to Google Photos. Immich supports automated backups via a mobile client app, ensuring efficient storage and fast search functionality.

The docker-compose.yml configuration for Immich is as follows:

```
name: immich

services:
  immich-server:
    container_name: immich_server
    image: harbor.spacemit.com/application/immich-server:${IMMICH_VERSION:-release}
    #extends:
    #  file: hwaccel.transcoding.yml
    #   service: cpu # set to one of [nvenc, quicksync, rkmpp, vaapi, vaapi-wsl] for accelerated transcoding
    volumes:
      - ${UPLOAD_LOCATION}:/usr/src/app/upload
      - /etc/localtime:/etc/localtime:ro
    # 映射视频解码设备
    devices:
      - /dev/video0:/dev/video0   # 可以映射多个USB摄像头
      - /dev/video1:/dev/video1
      - /dev/dri/card0:/dev/dri/card0
      - /dev/dri/renderD128:/dev/dri/renderD128
    env_file:
      - .env
    ports:
      - 2283:3001
    depends_on:
      - redis
      - database
    restart: always
    privileged: true

  immich-machine-learning:
    container_name: immich_machine_learning
    # For hardware acceleration, add one of -[armnn, cuda, openvino] to the image tag.
    # Example tag: ${IMMICH_VERSION:-release}-cuda
    image: harbor.spacemit.com/application/immich-machine-learning:${IMMICH_VERSION:-release}
    # extends: # uncomment this section for hardware acceleration - see https://immich.app/docs/features/ml-hardware-acceleration
    #   file: hwaccel.ml.yml
    #   service: cpu # set to one of [armnn, cuda, openvino, openvino-wsl] for accelerated inference - use the `-wsl` version for WSL2 where applicable
    volumes:
      - model-cache:/cache
    env_file:
      - .env
    ports:
      - 3003:3003
    restart: always

  redis:
    container_name: immich_redis
    image: harbor.spacemit.com/application/redis:6.2-alpine3.20
    healthcheck:
      test: redis-cli ping || exit 1
    restart: always

  database:
    container_name: immich_postgres
    image: harbor.spacemit.com/application/pgvector:pg15-bianbu-mantic
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_DB: ${DB_DATABASE_NAME}
      POSTGRES_INITDB_ARGS: '--data-checksums'
    volumes:
      - ${DB_DATA_LOCATION}:/var/lib/postgresql/data
    command: ["postgres", 
      "-c" ,"shared_preload_libraries=/usr/lib/postgresql/15/lib/vector.so", 
      "-c", 'search_path="$$user", public, vector', 
      "-c", "logging_collector=on", 
      "-c", "max_wal_size=2GB", 
      "-c", "shared_buffers=512MB", 
      "-c", "wal_compression=on"]
    restart: always

volumes:
  model-cache:
```

Create an environment variable file `.env` in the same directory:

```yaml
# The location where your uploaded files are stored
UPLOAD_LOCATION=./library
# The location where your database files are stored
DB_DATA_LOCATION=./postgres

# TZ=Etc/UTC

# The Immich version to use. You can pin this to a specific version like "v1.71.0"
IMMICH_VERSION="v1.107.2"

# Connection secret for postgres. You should change it to a random password
DB_PASSWORD=postgres

# The values below this line do not need to be changed
###################################################################################
DB_USERNAME=postgres
DB_DATABASE_NAME=immich
DB_VECTOR_EXTENSION=pgvector
```

Once the service is up, access Immich via `http://HOST_IP:2283`. You'll be prompted to set up the admin account and password on the first login.

## Getting Started

- Switch to Chinese: Go to "Settings -> Account Settings -> App Settings -> Language -> Chinese (Simplified)".
- View and execute tasks: Click "Manage -> Tasks" to check the status of background tasks, and manually execute individual tasks if needed.
- Facial Recognition: Immich can detect faces in photos and videos, grouping them by person. You can view these groups on the "Explore" page and assign names to individuals, making them searchable.
- Smart Search: Immich supports both text-to-image and image-to-image search. On the homepage, click "Search" to enter a text description or select a person to find specific images. You can also apply filters to refine your search.
- Settings: Go to "Manage -> Settings" to switch machine learning models, set video transcoding parameters, and more.

For more details about Immich, visit [Immich Docs](https://immich.app/docs/overview/introduction).