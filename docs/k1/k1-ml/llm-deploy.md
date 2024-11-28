### Large Model Deployment
#### List of Supported Models
Space-time Iteration currently supports the following large models to run on the Space-time Iteration K1 platform:

| Model Name | Scale | Supported or Not |
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

The release address of large models: [https://archive.spacemit.com/spacemit-ai/ModelZoo/llm/](https://archive.spacemit.com/spacemit-ai/ModelZoo/llm/)

#### Usage Instructions
##### Cpp Demo
To run the Cpp demo, you need to use the spacemit-ort toolkit provided by Space-time Iteration. You can refer to the following projects to run the demo.

##### Python Demo
To run the Python demo, you need to install and use the following Python packages provided by Space-time Iteration:

```python
spacemit-ort
onnxruntime-genai
```

You can refer to the following files to run the demo.

The release address of Spacemit-ort: [https://archive.spacemit.com/spacemit-ai/onnxruntime/spacemit-ort.riscv64.1.2.2.tar.gz](https://archive.spacemit.com/spacemit-ai/onnxruntime/spacemit-ort.riscv64.1.2.2.tar.gz)

Note: Both the demo and the pip whl are in the released compressed package.

#### Model Construction (If Needed)
If you want to conduct model conversion by yourself, you can use the model conversion tools provided by Space-time Iteration to convert the large models provided on [HuggingFace](https://huggingface.co/) or [ModelScope](https://modelscope.cn/home) into the supported model formats, so as to achieve the optimal adaptation effect.

```
python builder.py
-i huggingface_model_path / modelscope_model_path // Input model address
-o output_model_path // Output model address
-e cpu
-p int4
-c model_cache // Model cache storage address
--extra_options int4_accuracy_level=4 int4_block_size=64 _# use_spacemit_ep=1 # Optionally open _
```

#### Performance Data of Large Models
On the K1 chip side, based on spacemit-ort 1.2.2:

| Model | Scale | First Word Latency / S (prompt = 64t) | Performance Data / TPS (context = 1024, prompt = 64) |
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