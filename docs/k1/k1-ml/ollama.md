---
sidebar_position: 2
---

# Ollama

‌Ollama‌ is an open-source, cross-platform tool for local deployment of large language models (LLMs), engineered to simplify the execution, management, and inference workflows of LLMs in on-premises environments. It empowers users to deploy and invoke pre-trained models (e.g., LLaMA, DeepSeek) directly on personal devices (including PCs and edge servers) via simple CLI commands, eliminating dependencies on cloud services or high-end GPU hardware.

## Installation

```shell
sudo apt update
sudo apt install spacemit-ollama-toolkit
```

Verify:

```shell
ollama list
```

The final output of `NAME  ID  SIZE  MODIFIED` indicates a successful installation.

## Pull models

To ensure maximum performance efficiency on the K1 development board, we strongly recommend deploying the ‌q4_0 quantized model‌ by downloading GGUF-format models with ‌q4_0 quantization precision‌ from platforms like ModelScope or Hugging Face and transferring them to your K1 board or MuseBook device for optimal hardware compatibility.

Below is a model creation example demonstrating the production workflow:

```shell
sudo apt install wget
wget https://huggingface.co/second-state/Qwen2.5-0.5B-Instruct-GGUF/blob/main/Qwen2.5-0.5B-Instruct-Q4_0.gguf ~/
wget https://archive.spacemit.com/spacemit-ai/modelfile/qwen2.5:0.5b.modelfile ~/
cd ~/
ollama create qwen2.5:0.5b -f qwen2.5:0.5b.modelfile
```

## Usage

```shell
ollama run qwen2.5:0.5b
```
