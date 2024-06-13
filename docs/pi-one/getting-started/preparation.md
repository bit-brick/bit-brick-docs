# Getting started with your PI

To get started with your PI one, you’ll need the following:

- a power supply
- boot media (e.g. a microSD card with ample storage and speed)

You can set up your PI one as an interactive computer with a desktop, or as a headless computer accessible only over the network. To set your PI one up headless, you don’t need any additional peripherals: you can preconfigure a hostname, user account, network connection, and SSH when you install an operating system. If you want to use your PI one directly, you’ll need the following additional accessories:

- a display support HDMI
- HDMI cable
- a keyboard
- a mouse
- USB type C cable

## Power supply

The following table shows the USB-PD power mode required to power various Pi one. You can use any high-quality power supply that provides the correct power mode.

| Model       | Recommended power supply (voltage/current) |
|-------------|-------------------------------------------|
| PI one power supply | 5V@2A |
| PI zero      | 10W power supply |
| PI one      | 5V@3A |
|              | 15W power supply |

![power](/img/pi-one/getting-started/preparation/power.png)

Plug your power supply into the port marked "DC-IN".

## Boot media

All Pi series models lack onboard storage, so you have to supply it. You can boot your Pi from an operating system image installed on supported media: microSD cards are used commonly. All the PI series feature a microSD slot, and the board will boot from the microSD slot when the slot contains a card.

![sd_set](/img/pi-one/getting-started/preparation/sd_set.png)

### Recommended SD cards

We recommend using an SD card with at least 32GB of storage for Pi OS installations.


## Keyboard

You can use any of the USB ports on your PI one to connect a wired keyboard or USB Bluetooth receiver.

![keyboard](/img/pi-one/getting-started/preparation/keyboard_connect.png)

## Mouse

You can use any of the USB ports on your PI one to connect a wired mouse or USB Bluetooth receiver.

![mouse](/img/pi-one/getting-started/preparation/mouse_connect.png)

## Display

Pi series have the following display connectivity:

| Model       | Display output       |
|-------------|----------------------|
| PI zero     | MIPI DSI             |
| PI one      | Micro HDMI           |
|              | MIPI DSI             |

![display_hdmi](/img/pi-one/getting-started/preparation/display_hdmi.png)

Plug your monitor into the port marked HDMI. If you want to use the MIPI DSI, please read the document in the hardware and software part.

## Audio

PI one support audio output over HDMI. All PI series support audio over USB. All Pi series equipped with Bluetooth support Bluetooth audio. PI one also include a 3.5mm auxiliary TRRS jack, which may require amplification for sufficient output volume.



## Networking

PI one support two Ethernet ports, you can use both of them to connect the network.

![network](/img/pi-one/getting-started/preparation/networking.png)

## Debugging

PI series support USB to serial on board, so if you want to debug, you can directly use a USB type C cable to connect the PC.

![debugging](/img/pi-one/getting-started/preparation/debugging_port.png)