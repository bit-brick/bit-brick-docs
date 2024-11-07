# Setting Up an End-to-End Encrypted Chat Server on K1
![alt text](image.png)
To meet the demand for private communication, the open-source community has been continuously developing and improving instant messaging tools. Matrix is an excellent encrypted communication protocol among them. When I was researching this, I found that the online tutorials were rather fragmented and scattered. So I simply organized a relatively complete one myself, hoping it would be helpful to those who come later.

The Matrix protocol supports many features: decentralized communication, end-to-end encryption, WebRTC voice calls/video calls, message read receipts, input status indications, group chats...

Moreover, just as its name suggests: "matrix", if you are the administrator of this server, you can also allow your Matrix server to form a matrix network with other Matrix servers, enabling users to communicate with users of other Matrix servers.

All conversations on the Matrix server support end-to-end encryption and are very secure.

Synapse is a server implementation based on the Matrix protocol written in Python, allowing users and organizations to deploy their own Matrix nodes. This enables us to host our own chat service through Synapse and maintain full control over the data.
## Installing Synapse
~~~
sudo apt install matrix-synapse
~~~
After the installation is completed, start the Synapse service:
~~~
mkdir ~/synapse
cd ~/synapse
synctl start
~~~
You may encounter the following error:
~~~
synctl start Config file homeserver.yaml does not exist. To generate a config file, run: /usr/bin/python3 -m synapse.app.homeserver -c homeserver.yaml --generate-config --server-name=<server name> --report-stats=<yes/no>
~~~
This is because the configuration file has not been generated. We use the following command to generate the configuration file:
~~~
python3 -m synapse.app.homeserver -c homeserver.yaml --generate-config --server-name=your.domain.com --report-stats=yes
~~~
Now we have generated the configuration file. We open the file and modify it as follows:

1. If using it on the intranet, modify the configuration file `bind_addresses: ['::']`.
   
2. Open user registration:
~~~
enable_registration: true
enable_registration_without_verification: true
~~~

The complete configuration file is as follows:

~~~
server_name: "your.domain.com"
pid_file: /home/bitbrick/synapse/homeserver.pid
listeners:
  - port: 8008
    tls: false
    type: http
    x_forwarded: true
    bind_addresses: ['::']
    resources:
      - names: [client, federation]
        compress: false
database:
  name: sqlite3
  args:
    database: /home/bitbrick/synapse/homeserver.db
log_config: "/home/bitbrick/synapse/your.domain.com.config"
media_store_path: /home/bitbrick/synapse/media_store
registration_shared_secret: "zmutd~qyz^PUz9eYu,dc*l+l2#f4Hw+r#;1K5pFZsumiUH,aK*"
enable_registration: true
enable_registration_without_verification: true
report_stats: false
macaroon_secret_key: "R54t^eMDWXYF7_:9:3.M4dAQxMkclCMvsrfEt&VsGTg=.sM@16"
form_secret: "OVIUum_sYg48Fl.i=+SDy&@,ETr.,0aXIaJj.AwvWyZZ9YlbfK"
signing_key_path: "/home/bitbrick/synapse/im.iao.app.signing.key"
trusted_key_servers:
  - server_name: "matrix.org"
registration:
  open: true
  admin: true
# vim:ft=yaml
~~~

Restart the service:

~~~
synctl restart
~~~

If you can see the following when accessing http://localhost:8008/, it means the service has started successfully.

![alt text](image-2.png)

## Client Configuration
What is Element?

![alt text](image-1.png)

Element is a client application based on the Matrix protocol, supporting instant messaging, audio, and video calls. It has multiple versions including Web, desktop, and mobile, and is one of the most popular clients in the Matrix ecosystem.

Simply put, Matrix is a communication protocol, and Element is a client application based on this protocol. Our goal is to use the end-to-end encryption of Matrix to build a decentralized encrypted communication service through Element, which also supports voice and video calls, suitable for both individuals and teams.

Compared with common communication software such as QQ and WeChat, the advantage of Matrix lies in its open-source and privatizable deployment, ensuring the security and privacy of communication. In addition, Matrix also has the characteristics of decentralization. Any server running Matrix is an independent node, and users can choose to register and connect to any node, and users of the same node can communicate freely. At the same time, different nodes can also communicate through the federation mechanism to achieve end-to-end encryption.

Download the client at https://element.io/
Configure the server address as the address of our K1 and register a user:

![alt text](17190840-25E6-4EE0-A2A9-90F3F76DC15F.png)
The login interface is as follows:

![alt text](FE258E7A-8BF5-4F86-9144-6533AD5B7D5D.png)
The chat interface is as follows:

![alt text](0A4793FD-3114-429A-8392-C9023DA9152B.png)

The client supports Android/iOS. For more features, you can visit the official website: https://element.io/