# Package Management
## Software Packages
BitOS software packages follow the Debian software package specification and are managed using apt.
## Software Sources
The software source, that is, the BitOS software package source: http://archive.spacemit.com/bianbu-ports/
## Updating the Software Source
```
apt-get update
```
## Installing Software Packages
For example, to install the software package `hello`:

```
apt-get install hello
```
## Updating Software Packages
For example, to update `hello`:

```
apt-get upgrade hello
```
## Uninstalling Software Packages
For example, to uninstall `hello`:

```
apt-get remove hello
```