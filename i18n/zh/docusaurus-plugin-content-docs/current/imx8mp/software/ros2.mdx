# ROS2 Installation
## Set locale
  Make sure you have a locale which supports UTF-8. If you are in a minimal environment (such as a docker container), the locale may be something minimal like POSIX. We test with the following settings. However, it should be fine if you’re using a different UTF-8 supported locale.

~~~
locale  # check for UTF-8

sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

locale  # verify settings
~~~

## Setup Sources
You will need to add the ROS 2 apt repository to your system.

First ensure that the Ubuntu Universe repository is enabled.

~~~
sudo apt install software-properties-common
sudo add-apt-repository universe
~~~

Now add the ROS 2 GPG key with apt.

~~~
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
~~~

Then add the repository to your sources list.

If you encounter the error "Failed to connect to raw.githubusercontent.com port 443 after 13 ms: Connection refused",
you can refer to https://www.guyuehome.com/37844
The handling method:
~~~
sudo vi /etc/hosts
#####################
127.0.0.1	localhost
127.0.1.1	iron-virtual-machine
### Add the following resolution
185.199.108.133  raw.githubusercontent.com
~~~


~~~
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
~~~
## Install ROS 2 packages
Update your apt repository caches after setting up the repositories.

~~~
sudo apt update
~~~
ROS 2 packages are built on frequently updated Ubuntu systems. It is always recommended that you ensure your system is up to date before installing new packages.

~~~
sudo apt upgrade
~~~
Desktop Install (Recommended): ROS, RViz, demos, tutorials.

~~~
sudo apt install ros-foxy-desktop 
~~~

## Environment setup
### Sourcing the setup script
Set up your environment by sourcing the following file.
~~~
# Replace ".bash" with your shell if you're not using bash
# Possible values are: setup.bash, setup.sh, setup.zsh
$ source /opt/ros/humble/setup.bash
$ echo " source /opt/ros/humble/setup.bash" >> ~/.bashrc
~~~

## Try some examples
If you installed ros-foxy-desktop above you can try some examples.

In one terminal, source the setup file and then run a C++ talker:
~~~
ros2 run demo_nodes_cpp talker
~~~
In another terminal source the setup file and then run a Python listener:

~~~
ros2 run demo_nodes_py listener
~~~
You should see the talker saying that it’s Publishing messages and the listener saying I heard those messages. This verifies both the C++ and Python APIs are working properly. Hooray!


Example 2:

Little Turtle Simulation Example
Let's try again the classic example in ROS - the little turtle simulator.

Start two terminals and run the following instructions respectively:
~~~
ros2 run turtlesim turtlesim_node
ros2 run turtlesim turtle_teleop_key
~~~
![ros2_demo](/img/imx8mp/software/ros.png)