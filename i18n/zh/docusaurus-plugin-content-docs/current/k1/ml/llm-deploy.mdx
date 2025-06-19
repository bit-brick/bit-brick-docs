# 大模型部署
## 模型支持列表
进迭时空目前已支持以下大模型在进迭时空 k1 平台上运行：

| 模型名称 | 级别 | 是否支持 |
| ---- | ---- | ---- |
| [Qwen1.5](https://huggingface.co/Qwen/Qwen1.5-4B-Chat) | 4B | ✔ |
| [Qwen2](https://huggingface.co/Qwen/Qwen2-0.5B-Instruct) | 0.5B | ✔ |
| [Qwen2](https://huggingface.co/Qwen/Qwen2-1.5B-Instruct) | 1.5B | ✔ |
| [Lamma3](https://huggingface.co/shenzhi-wang/Llama3-8B-Chinese-Chat) | 8B | ✔ |
| [Lamma3.1](https://modelscope.cn/models/Muulor/Llama3.1-8b-zh) | 8B | ✔ |
| [tinyllama](https://huggingface.co/TinyLlama/TinyLlama-1.1B-Chat-v1.0) | 1.1B | ✔ |
| [minicpm](https://huggingface.co/openbmb/MiniCPM-S-1B-sft-llama-format) | 1B | ✔ |
| [minicpm](https://huggingface.co/openbmb/MiniCPM-2B-sft-fp32) | 2B | ✔ |
| [phi3](https://huggingface.co/microsoft/Phi-3-mini-4k-instruct) | 3.8B | ✔ |
| [chatglm3](https://huggingface.co/THUDM/chatglm2-6b-32k) | 6B | ✔ |

大模型 release 地址：[https://archive.spacemit.com/spacemit-ai/ModelZoo/llm/](https://archive.spacemit.com/spacemit-ai/ModelZoo/llm/)

## 使用说明
### Cpp demo
运行 cpp demo，您需要使用进迭时空提供的 spacemit-ort 工具包，运行 demo 可参考以下工程。

### Python demo
运行 python demo，您需要安装并使用进迭时空提供的以下 python 包：

```python
spacemit-ort
onnxruntime-genai
```

运行 demo 可参考以下文件。

Spacemit-ort release 地址：[https://archive.spacemit.com/spacemit-ai/onnxruntime/spacemit-ort.riscv64.1.2.2.tar.gz](https://archive.spacemit.com/spacemit-ai/onnxruntime/spacemit-ort.riscv64.1.2.2.tar.gz)

注：demo 和 pip whl 都在 release 的压缩包里



### 模型构建（如需）
如果您想自己进行模型转换，可以使用进迭时空提供的模型转换工具，将 [huggingface](https://huggingface.co/) 或者 [modelscope](https://modelscope.cn/home) 上提供的大模型转换成受支持的模型格式，以达到最优的适配效果。

```
python builder.py
-i huggingface_model_path / modelscope_model_path //输入模型地址
-o output_model_path //输出模型地址
-e cpu
-p int4
-c model_cache //模型cache存放地址
--extra_options int4_accuracy_level=4 int4_block_size=64 _# use_spacemit_ep=1 # 可选打开_
```

### 大模型性能数据
k1 芯片端，基于 spacemit-ort 1.2.2：

| 模型 | 级别 | 首字延迟/S（prompt=64t） | 性能数据/TPS（context=1024, prompt=64） |
| ---- | ---- | ---- | ---- |
| qwen2 | 0.5B | 1.75 | 12.52 |
| qwen2 | 1.5B | 7.747 | 5.38 |
| qwen2.5 | 0.5B | 1.83@67t | 13.62 |
| qwen2.5 | 1.5B | 5.42 | 5.38 |
| qwen2.5 | 3B | 12.01@69t | 2.85 |
| qwen2.5 | 7B | 31.25 | 1.39 |
| phi3 | 3.8B | 15.92 | 2.14 |
| tinyllama | 1.1B | 7.84@95t | 7.38 |
| llama3 | 8B | 36.26@69t | 1.18 |
| llama3.2 | 1B | 4.28 | 7.18 |
| llama3.2 | 3B | 13.14 | 2.6 |
| minicpm-1b | 1B | 5.28@68t | 5.14 |
| minicpm-2b | 2B | 14.34@67t | 2.79 |
| minicpm3 | 4B | 20.17s@65t  | 0.92 |
| chatglm3 | 6B | 25.61@58t | 1.66579  |
| gemma2 | 2B | 24.58 | 3.39 | 