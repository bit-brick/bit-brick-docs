# Using Immich to Manage Your Photos on K1

Immich is an open-source, self-hosted photo and video backup solution designed for individuals and families. It allows users to back up, manage, and view photo and video content on their own servers, similar to the functionality of Google Photos. Immich offers automated backup features, synchronizing media files automatically through a client app on mobile devices, and supports efficient storage and fast search.
![alt text](image.png)

## Installation of Immich
We use docker-compose to install Immich.
### Installation of Docker

~~~
sudo apt update
sudo apt install docker.io
~~~

### Installation of Docker Compose
~~~
sudo curl -L "https://github.com/docker/compose/releases/download/v2.29.7/docker-compose-linux-riscv64" -o /usr/local/bin/docker-compose

sudo chmod+x /usr/local/bin/docker-compose
~~~

### Configuration of docker-compose.yml

~~~
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
    #  mapping video decoding devices
    devices:
      - /dev/video0:/dev/video0   # Multiple USB cameras can be mapped
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
~~~

Create an environment variable file `.env` in the same directory:
~~~
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

~~~

Run `sudo docker-compose up` to successfully operate Immich

![alt text](786CA34E-6BC8-4ABD-8EFD-9F2301E35263.png)


## Access

Access the 2283 port with a browser, and you should see the registration page. After registration, you can use it. If you cannot access, you need to further check the container logs for errors.
Assuming your Immich is deployed on 192.168.1.1, then the browser access address is 192.168.1.1:2283
![alt text](<Screenshot from 2024-10-21 15-04-39.png>) 

![alt text](<Screenshot from 2024-10-21 15-05-16.png>) 

![alt text](<Screenshot from 2024-10-21 15-05-55.png>)


Other Immich clients need to enter the API address to use it. Here are some client download addresses:

API address is http://192.168.1.1:2283/api.

Immich Clients
- [Immich Android Client (F-Droid)](https://f-droid.org/en/packages/app.alextran.immich/)
- [Immich Android Client (Google Play)](https://play.google.com/store/apps/details?id=app.alextran.immich)
- [Immich iOS Client](https://apps.apple.com/sg/app/immich/id1613945652)

Usually, after launching the client for the first time, enter the API address to use it.

## Basic Configuration
* Switch between Chinese and English: Click "Settings -> Account Settings -> App Settings -> Language".
* View and execute tasks: Click "Manage -> Tasks" to view the execution of background tasks, and you can manually execute individual tasks.
* Face recognition: Immich can recognize faces in photos and videos, and group them into characters, which can be viewed on the "Explore" page. At the same time, you can assign names to these characters and search for them.
* Intelligent search: Immich supports text search and image search features. Click "Search" on the home page to search for images by entering a text description, or click on a character to search for a specific character, and at the same time, you can set conditions to filter images.
* Settings: Click "Manage -> Settings" to switch machine learning models, set video transcoding parameters, etc.

Click [Immich Docs](https://immich.app/docs/overview/introduction) for more information about Immich.

## Upgrade

Modify the `.env` file in the deployment directory, change the value of IMMICH_VERSION to the latest version, and finally execute `docker-compose up -d`.
