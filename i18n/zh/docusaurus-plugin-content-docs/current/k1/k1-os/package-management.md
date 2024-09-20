
# 软件包管理

## 软件包

BitOS 软件包遵循 Debian 软件包规范，使用 apt 管理。

## 软件源

软件源，即 BitOS 软件包源：http://archive.spacemit.com/bianbu-ports/

## 更新软件源

```
apt-get update
```

## 安装软件包

例如安装软件包 `hello`：

```
apt-get install hello
```

## 更新软件包

例如更新 `hello`：

```
apt-get upgrade hello
```

## 卸载软件包

例如卸载 `hello`：

```
apt-get remove hello
```