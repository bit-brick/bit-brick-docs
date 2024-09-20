# Install Docker
Docker was originally an internal project initiated by Solomon Hykes, the founder of dotCloud, during his time in France. It was an innovation based on dotCloud's years of cloud service technology and was open sourced under the Apache 2.0 license in March 2013. The main project code is maintained on GitHub. The Docker project later joined the Linux Foundation and established the Open Container Initiative (OCI).
Since its open source, Docker has received widespread attention and discussion. To date, its GitHub project has received over 57,000 stars and over 10,000 forks. Even due to the popularity of the Docker project, at the end of 2013, dotCloud decided to change its name to Docker. Docker was originally developed and implemented on Ubuntu 12.04; Red Hat began supporting Docker from RHEL 6.5; Google also widely used Docker in its PaaS products.
Docker is developed and implemented using the Go language introduced by Google and is based on technologies such as cgroup, namespace, and OverlayFS-like Union FS of the Linux kernel to encapsulate and isolate processes, belonging to the virtualization technology at the operating system level. Since the isolated processes are independent of the host and other isolated processes, it is also called a container. The initial implementation was based on LXC, and from version 0.7 onwards, LXC was removed and replaced with self-developed libcontainer, and from version 1.11 onwards, it further evolved to use runC and containerd.


## 1.Installing docker
~~~
sudo apt-get update
sudo apt-get install docker.io
~~~


## 2.Starting docker
~~~
sudo systemctl enable docker
sudo systemctl start docker
~~~

## 3.Verifying the Success

~~~
sudo docker run hello-world
~~~
![alt text](/img/k1/software/docker.png)
