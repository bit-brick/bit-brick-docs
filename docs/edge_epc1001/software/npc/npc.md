# NPC Intranet Penetration
## 1. Introduction to NPC
NPC (NPS client) is a lightweight, high-performance intranet penetration tool. Together with the NPS server it enables public network access to internal resources, supporting various modes such as TCP/UDP forwarding, HTTP proxy, SOCKS5 proxy, and P2P.

[NPS's GitHub](https://github.com/ehang-io/nps)

## 2. Using NPC
The setup of the NPS server is not covered in this document; this document focuses only on using NPC on EPC1001.

### 2.1 Download the arm64 version of the NPC client
Download address:
https://github.com/ehang-io/nps/releases/download/v0.26.10/linux_arm64_client.tar.gz

Unpack the downloaded file:
~~~
tar -zxvf linux_arm64_client.tar.gz
~~~
You will get the npc client. If it is not executable, add execute permission:
~~~
chmod +x npc
~~~
### 2.2 Run npc
~~~
nohup ./npc -server='your_server_address' -vkey='key_set_on_server'  > ./npc.log 2>&1 &
~~~


## 2. Auto start
We can add the npc service to startup.

### 2.1 Create the start script
First create a start script with the following content:
` /home/bitbrick/dev/npc/start.sh`
~~~
#!/bin/bash
cd /home/bitbrick/dev/npc/
# your npc directory
# maximum wait time (seconds)
TIMEOUT=30
WAITED=0

# Network interface list
INTERFACES=("usb0" "wwan0" "eth0")

echo "Waiting for at least one interface to obtain an IP..."

while true; do
    NETWORK_READY=false
    for IFACE in "${INTERFACES[@]}"; do
        # Check if the interface exists and has an IP
        if ip addr show "$IFACE" 2>/dev/null | grep -q "inet "; then
            NETWORK_READY=true
            break
        fi
    done

    if [ "$NETWORK_READY" = true ]; then
        echo "Network ready, starting npc"
        break
    fi

    sleep 1
    WAITED=$((WAITED+1))
    if [ $WAITED -ge $TIMEOUT ]; then
        echo "Network wait timed out, exiting" >&2
        exit 1
    fi
done

# Start npc as a foreground process so systemd can track it
exec ./npc -server=xxxxx -vkey=xxxx
~~~
The above script includes network detection: npc will only start when local interfaces `eth0` or the `4G`/`5G` modules have acquired an IP address. You can modify it as needed.

### 2.2 Create the service file
Create an npc.service file under /etc/systemd/system/ with the following content:

`/etc/systemd/system/npc.service`
~~~ 
[Unit]
Description=Npc intranet penetration
After=quectel-dial.service
Wants=quectel-dial.service

[Service]
Type=simple
User=bitbrick
WorkingDirectory=/home/bitbrick/dev/npc
ExecStart=/home/bitbrick/dev/npc/start.sh
Restart=on-failure
RestartSec=10s
StartLimitIntervalSec=0


[Install]
WantedBy=multi-user.target
~~~
The following lines:
~~~
After=quectel-dial.service
Wants=quectel-dial.service
~~~
are optional and can be used if you are using 4G/5G module dialing. If you are not using a mobile network module for internet access, you can remove these lines.

### 2.3 Enable the service
~~~
sudo systemctl daemon-reload
sudo systemctl enable npc.service
sudo systemctl start npc.service
~~~