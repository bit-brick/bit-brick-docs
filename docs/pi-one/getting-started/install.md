# Install an operating system

To use your Raspberry Pi, you'll need an operating system. By default, Raspberry Pis check for an operating system on any SD card inserted in the SD card slot.

Depending on your Raspberry Pi model, you can also boot an operating system from other storage devices, including USB drives, storage connected via a HAT, and network storage.

## Requirements

To install an operating system on a storage device for your Raspberry Pi, you'll need:

- a computer you can use to image the storage device into a boot device
- a way to plug your storage device into that computer

Most Raspberry Pi users choose microSD cards as their boot device.

## Recommended Installation Method

We recommend installing an operating system using [Raspberry Pi Imager](https://www.raspberrypi.com/software/getting-started/#raspberry-pi-imager).

Raspberry Pi Imager is a tool that helps you download and write images on macOS, Windows, and Linux. Imager includes many popular operating system images for Raspberry Pi. It also supports loading images downloaded directly from [Raspberry Pi](https://www.raspberrypi.com/software/operating-systems/) or third-party vendors such as [Ubuntu](https://ubuntu.com/download/raspberry-pi). You can use Imager to preconfigure credentials and remote access settings for your Raspberry Pi.

Imager supports images packaged in the `.img` format as well as container formats like `.zip`.

If you have no other computer to write an image to a boot device, you may be able to install an operating system [directly on your Raspberry Pi from the internet](#install-over-the-network).

## Install using Imager

You can install Imager in the following ways:

- Download the latest version from [raspberrypi.com/software](https://www.raspberrypi.com/software/) and run the installer.
- Install it from a terminal using your package manager, e.g., `sudo apt install rpi-imager`.

Once you've installed Imager, launch the application by clicking the Raspberry Pi Imager icon or running `rpi-imager`.

![Raspberry Pi Imager main window](/img/pi-one/getting-started/imager/welcome.png)

Click **Choose device** and select your Raspberry Pi model from the list.

![Raspberry Pi model selections in Imager](/img/pi-one/getting-started/imager/choose-model.png)

Next, click **Choose OS** and select an operating system to install. Imager always shows the recommended version of Raspberry Pi OS for your model at the top of the list.

![Operating system selections in Imager](/img/pi-one/getting-started/imager/choose-os.png)

Connect your preferred storage device to your computer. For example, plug a microSD card in using an external or built-in SD card reader. Then, click **Choose storage** and select your storage device.

**WARNING**: If you have more than one storage device connected to your computer, be sure to choose the correct device! You can often identify storage devices by size. If you're unsure, disconnect other devices until you've identified the device you want to image.

![Storage selection options in Imager](/img/pi-one/getting-started/imager/choose-storage.png)

Next, click **Next**.

In a popup, Imager will ask you to apply OS customisation. We strongly recommend configuring your Raspberry Pi via the OS customisation settings. Click the **Edit Settings** button to open [OS customisation](#advanced-options).

If you don't configure your Raspberry Pi via OS customisation settings, Raspberry Pi OS will ask you for the same information at first boot during the [configuration wizard](#configuration-on-first-boot). You can click the **No** button to skip OS customisation.

## OS customisation

The OS customisation menu lets you set up your Raspberry Pi before first boot. You can preconfigure:

- a username and password
- Wi-Fi credentials
- the device hostname
- the time zone
- your keyboard layout
- remote connectivity

When you first open the OS customisation menu, you might see a prompt asking for permission to load Wi-Fi credentials from your host computer. If you respond "yes", Imager will prefill Wi-Fi credentials from the network you're currently connected to. If you respond "no", you can enter Wi-Fi credentials manually.

The **hostname** option defines the hostname your Raspberry Pi broadcasts to the network using [mDNS](https://en.wikipedia.org/wiki/Multicast_DNS). When you connect your Raspberry Pi to your network, other devices on the network can communicate with your computer using `<hostname>.local` or `<hostname>.lan`.

The **username and password** option defines the username and password of the admin user account on your Raspberry Pi.

The **wireless LAN** option allows you to enter an SSID (name) and password for your wireless network. If your network does not broadcast an SSID publicly, you should enable the "Hidden SSID" setting. By default, Imager uses the country you're currently in as the "Wireless LAN country". This setting controls the Wi-Fi broadcast frequencies used by your Raspberry Pi. Enter credentials for the wireless LAN option if you plan to run a headless Raspberry Pi.

The **locale settings** option allows you to define the time zone and default keyboard layout for your Pi.

![General settings in the OS customisation menu](/img/pi-one/getting-started/imager/os-customisation-general.png)

The **Services** tab includes settings to help you connect to your Raspberry Pi remotely.

If you plan to use your Raspberry Pi remotely over your network, check the box next to **Enable SSH**. You should enable this option if you plan to run a headless Raspberry Pi.

- Choose the **password authentication** option to SSH into your Raspberry Pi over the network using the username and password you provided in the general tab of OS customisation.

- Choose **Allow public-key authentication only** to preconfigure your Raspberry Pi for passwordless public-key SSH authentication using a private key from the computer you're currently using. If already have an RSA key in your SSH configuration, Imager uses that public key. If you don't, you can click **Run SSH-keygen** to generate a public/private key pair. Imager will use the newly-generated public key.

![Services settings in the OS customisation menu](/img/pi-one/getting-started/imager/os-customisation-services.png)

OS customisation also includes an **Options** menu that allows you to configure the behaviour of Imager during a write. These options allow you to play a noise when Imager finishes verifying an image, to automatically unmount storage media after verification, and to disable telemetry.

![Options in the OS customisation menu](/img/pi-one/getting-started/imager/os-customisation-options.png)

## Write

When you've finished entering OS customisation settings, click **Save** to save your customisation.

Then, click **Yes** to apply OS customisation settings when you write the image to the storage device.

Finally, respond **Yes** to the "Are you sure you want to continue?" popup to begin writing data to the storage device.

![Confirming a reimage of a storage device in Imager](/img/pi-one/getting-started/imager/are-you-sure.png)

If you see an admin prompt asking for permissions to read and write to your storage medium, grant Imager the permissions to proceed.

Grab a cup of coffee or go for a walk. This could take a few minutes.

![Writing an image to a device in Imager](/img/pi-one/getting-started/imager/writing.png)

If you want to live especially dangerously, you can click **cancel verify** to skip the verification process.

![Verifying an image on a device in Imager](/img/pi-one/getting-started/imager/stop-ask-verify.png)

When you see the "Write Successful" popup, your image has been completely written and verified. You're now ready to boot a Raspberry Pi from the storage device!

![The screen Imager shows when it finishes writing an image to a storage device](/img/pi-one/getting-started/imager/finished.png)

Next, proceed to the [first boot configuration instructions](#configuration-on-first-boot) to get your Raspberry Pi up and running.

## Install over the network

Network Install enables a Raspberry Pi to install an operating system on a storage device using a version of Raspberry Pi Imager downloaded over the network. With Network Install, you can get an operating system installed on your Raspberry Pi with no separate SD card reader and no computer other than your Raspberry Pi. You can run Network Install on any compatible storage device, including SD cards and USB storage.

Network Install only runs on Raspberry Pi 4, 400, and 5. If your Raspberry Pi runs an older bootloader, you may need to [update the bootloader](raspberry-pi.adoc#bootloader_update_stable) to use Network Install.

Network Install requires the following:

- a compatible Raspberry Pi model running firmware that supports Network Install
- a monitor
- a keyboard
- a wired internet connection

To launch Network Install, power on your Raspberry Pi while pressing and holding the **SHIFT** key in the following configuration:

- no bootable storage device
- attached keyboard
- attached compatible storage device, such as an SD card or USB storage

![The Network Install screen](/img/pi-one/getting-started/network-install-1.png)

If you haven't already connected your Raspberry Pi to the internet, connect it with an Ethernet cable.

![Starting Network Install](/img/pi-one/getting-started/network-install-2.png)

Once you're connected to the internet, your Raspberry Pi will download Raspberry Pi installer. If the download fails, you can repeat the process to try
## Downloading Imager using Network Install

![Downloading Imager using Network Install](/img/pi-one/getting-started/network-install-3.png)

Once you finish downloading Raspberry Pi Installer, your Raspberry Pi will automatically start Raspberry Pi Imager. For more information about running Raspberry Pi Imager, see [install an operating system](getting-started.adoc#installing-the-operating-system).

## Choose a storage device

![Choose a storage device](/img/pi-one/getting-started/network-install-4.png)

For more information about Network Install configuration, see [HTTP boot](raspberry-pi.adoc#http-boot).