# OpenClaw 大模型 API 配置

安装好openclaw之后我们还需要配置大模型的API。

要配置OpenClaw模型API，用户需要按照以下步骤进行：

1. **选择模型提供商**：首先，用户需要选择一个大模型提供商，如OpenAI、Anthropic等，并注册获取API密钥。
2. **获取API密钥**：在模型提供商的官方网站上，用户需要创建一个账户并获取API密钥，这个密钥将用于OpenClaw与大模型的通信。
3. **配置OpenClaw**：在OpenClaw的设置界面中，用户需要输入模型提供商的API密钥，并选择要使用的模型类型（如GPT-4、MinMax2.5等）。
4. **测试连接**：配置完成后，用户可以通过OpenClaw的测试功能来验证API连接是否成功，并确保OpenClaw能够正确调用大模型进行任务处理。

我们以MinMax为例：

1. 首先进入到 MinMax 开发平台注册，点击 `获取你的 key`：

```
https://platform.minimaxi.com/user-center/basic-information
```

![image-20260228084431923](./model_config.assets/image-20260228084431923.png)

2. 点击 **创建新的 API Key**：

   ![image-20260228084639160](./model_config.assets/image-20260228084639160.png)

3. 复制刚刚生成的 API key：

   ![image-20260228084735734](./model_config.assets/image-20260228084735734.png)

### 配置 OpenClaw 模型 API

使用下面的命令进入 `OpenClaw` 设置界面：

```bash
openclaw configure
```

![image-20260228085003206](./model_config.assets/image-20260228085003206.png)

- 使用 **上下键** 选择 “本地（Local）”，按 **回车**。
- 接着选择 `Model` 选项，按 **回车**。

![image-20260228085112930](./model_config.assets/image-20260228085112930.png)

- 再次使用 **上下键** 选择 `MiniMax` 模型，回车确认：

> **提示**：因为这里使用的是 `MiniMax` 模型，所以在模型提供商列表中选择 `MiniMax2.5 (CN)`。如使用其他模型，请选择相应的提供商。

![image-20260228085135874](./model_config.assets/image-20260228085135874.png)



然后输入我们之前获取的API密钥，回车确认：

![image-20260228085259895](./model_config.assets/image-20260228085259895.png)

接下来会出现一个多选页面，**直接按回车接受默认选项**，最后选择 `Continue` 退出配置流程：

![image-20260228085341450](./model_config.assets/image-20260228085341450.png)

> 到此，模型 API 配置已完成。

### 测试模型 API 配置

我们进入OpenClaw的聊天界面，给OpenClaw发送一个消息：



![image-20260228090509529](./model_config.assets/image-20260228090509529.png)