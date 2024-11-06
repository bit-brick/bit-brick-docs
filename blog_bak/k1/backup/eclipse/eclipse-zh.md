# 在K1上使用Eclipse
![alt text](<Screenshot from 2024-10-29 14-59-03.png>)

Eclipse 是一款开源且功能强大的集成开发环境（IDE），广泛支持多种编程语言，为开发者提供了一个统一的平台，用于编写、调试和管理代码。同时，Eclipse 还具备强大的插件系统，可根据需求灵活扩展功能。


近期，来自中国科学院软件研究所（ISCAS）的 RevyOS 小队的工程师联合其他开源社区开发者，成功为 Eclipse 上游代码仓库引入了对 riscv64 架构的初步支持。期间创建了[二十余个 Issue/PR](https://github.com/eclipse-platform/eclipse.platform.releng.aggregator/issues/2310)，涵盖了包括 SWT、Equinox 在内的关键组件。目前，Eclipse 已支持在 riscv64 平台上基于 OpenJDK 开发 Java 项目。

![alt text](image.png)

## 安装Eclipse

根据上述PR，我们在 https://download.eclipse.org/technology/epp/downloads/release/2024-12/M2/ 这里下载相对应的 `riscv64`的eclipse的包。
![alt text](image-1.png)

解压安装。打开其中的`eclipse` 即可
![alt text](<Screenshot from 2024-10-29 14-40-20.png>)

新建一个项目跑一个Hello World。
![alt text](<Screenshot from 2024-10-29 14-41-11.png>)

![alt text](<Screenshot from 2024-10-29 14-43-16-1.png>)

感谢 `RevyOS` 小队