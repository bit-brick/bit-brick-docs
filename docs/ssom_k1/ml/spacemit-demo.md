---
sidebar_position: 5
---

# SpacemiT AI Demo Repository

## Introduction

The SpacemiT AI Demo Repository is a comprehensive collection of AI application examples adapted for SpacemiT K-series chips. This project provides developers with rich AI model deployment tutorials and complete sample code, covering multiple AI domains including Computer Vision (CV), Natural Language Processing (NLP), and speech processing.

📦 **Source Repository**: [https://gitee.com/bianbu/spacemit-demo.git](https://gitee.com/bianbu/spacemit-demo.git)

## Key Features

- 🚀 **Ready-to-Use**: Complete model download, quantization, and deployment workflow
- 🔧 **Multi-Language Support**: Provides both Python and C++ example code
- 📊 **Performance Optimized**: Deeply optimized for SpacemiT K1 chips with detailed performance metrics
- 📚 **Complete Documentation**: Each example includes detailed README documentation and usage instructions

## Directory Structure

```
spacemit_demo/
├── examples/
│   ├── CV/                           # Computer Vision Examples
│   │   ├── yolov5/                  # Object Detection Model
│   │   ├── yolov6/                  # Object Detection Model
│   │   ├── yolov8/                  # Object Detection Model  
│   │   ├── yolov8-pose/             # Pose Detection Model
│   │   ├── yolov11/                 # Object Detection Model
│   │   ├── yolov5-face/             # Face Detection Model
│   │   ├── yolo-world/              # Open-Vocabulary Detection Model
│   │   ├── resnet/                  # Image Classification Model
│   │   ├── efficientnet/            # Image Classification Model
│   │   ├── mobilenet_v2/            # Lightweight Classification Model
│   │   ├── inception_v1/            # Image Classification Model
│   │   ├── inception_v3/            # Image Classification Model
│   │   ├── swin-tiny_16xb64_in1k/   # Vision Transformer Model
│   │   ├── fcn/                     # Semantic Segmentation Model
│   │   ├── unet/                    # Semantic Segmentation Model
│   │   ├── SAM/                     # Image Segmentation Model
│   │   ├── arcface/                 # Face Recognition Model
│   │   ├── nanotrack/               # Object Tracking Model
│   │   └── CLIP/                    # Multimodal Model
│   └── NLP/                         # Natural Language Processing Examples
│       ├── spacemit_asr/            # Automatic Speech Recognition Module
│       ├── spacemit_llm/            # Large Language Model Module
│       ├── spacemit_tts/            # Text-to-Speech Module
│       ├── spacemit_audio/          # Audio Processing Module
│       └── *.py                     # Various AI Function Demo Scripts
└── README.md                        # Project Overview
```

## Example Categories

### Computer Vision (CV)

The computer vision module contains mainstream CV model examples, covering image classification, object detection, semantic segmentation, face recognition, and other tasks:

#### Image Classification
- **ResNet50**: Classic deep residual network for image classification tasks
- **EfficientNet**: Efficient convolutional neural network with good balance between accuracy and efficiency
- **MobileNetv2**: Lightweight network optimized for mobile devices
- **Inception**: Google's multi-scale feature extraction network
- **Swin Transformer**: Vision Transformer based on windowed attention

#### Object Detection
- **YOLOv5/v8/v11**: Latest YOLO series object detection algorithms
- **YOLOv6**: Efficient object detection algorithm proposed by Meituan
- **YOLOv8-pose**: Human pose detection model based on YOLOv8
- **YOLO-World**: Open-vocabulary object detection model

#### Semantic Segmentation
- **FCN**: Fully Convolutional Network, classic method for semantic segmentation
- **U-Net**: Classic network in medical image segmentation
- **SAM**: Segment Anything Model proposed by Meta

#### Face-Related
- **ArcFace**: Face recognition algorithm based on angular margin
- **YOLOv5-face**: YOLO variant specifically for face detection

#### Others
- **NanoTrack**: Lightweight object tracking algorithm
- **CLIP**: OpenAI's image-text multimodal understanding model

### Natural Language Processing (NLP)

The NLP module provides complete speech and text processing solutions, supporting the full workflow from speech input to intelligent responses:

#### Core Functions
- **Automatic Speech Recognition (ASR)**: Convert speech to text with real-time recognition support
- **Large Language Models (LLM)**: Support local deployment of mainstream models like Qwen, DeepSeek
- **Text-to-Speech (TTS)**: High-quality speech synthesis functionality
- **Function Calling**: LLM's ability to automatically select and call external functions
- **Vision Language Models**: Multimodal functionality for image understanding and text generation

#### Complete Application Scenarios
- **Voice Assistant**: Speech Input → Speech Recognition → LLM Inference → Speech Synthesis Output
- **Intelligent Dialogue**: Dialogue system with contextual understanding support
- **Image Q&A**: Intelligent Q&A based on image content

## Performance Metrics

### CV Model Performance (4 cores)
| Model Type | Specific Model | Input Size | Data Type | Frame Rate |
|------------|----------------|------------|-----------|------------|
| Classification | ResNet50 | 224×224 | INT8 | 23 FPS |
| Classification | EfficientNet-B1 | 224×224 | INT8 | 18 FPS |
| Detection | YOLOv5n | 640×640 | INT8 | 6 FPS |
| Detection | YOLOv8n | 320×320 | INT8 | 26 FPS |
| Face Recognition | ArcFace | 320×320 | INT8 | 23 FPS |

### LLM Model Performance (4 cores)
| Model | Parameters | Quantization | Storage Size | Inference Speed |
|-------|------------|-------------|--------------|----------------|
| Qwen2.5-0.5B | 0.5B | Q4_0 | 336MB | 11 tokens/s |
| DeepSeek R1-1.5B | 1.5B | Q4_0 | 1017MB | 4.5 tokens/s |
| SmolLM2-135M | 135M | FP16 | 271MB | 15 tokens/s |

### Speech Model Performance
| Model Type | Model | Quantization | Storage Size | Performance Metric |
|------------|-------|-------------|--------------|-------------------|
| ASR | SenseVoice-Small | Dynamic | 229MB | RTF=0.38 |
| TTS | MeloTTS | Dynamic | 74MB | RTF=2-4 |

## Quick Start

### 1. Clone Repository
```bash
git clone https://gitee.com/bianbu/spacemit-demo.git
cd spacemit-demo
```

### 2. Choose Example Type

**Computer Vision Examples**:
```bash
cd examples/CV/yolov5
# Download model and data
cd model && sh download_model.sh
cd ../data && sh download_data.sh
# Run Python example
cd ../python && python test_yolov5.py
```

**Natural Language Processing Examples**:
```bash
cd examples/NLP
# Install dependencies
pip install -r requirements.txt
# Run speech recognition example
python 03_asr_demo.py
```

## Use Cases

- **AI Learning**: Provides complete AI model deployment learning materials for beginners
- **Product Prototyping**: Quickly build AI feature prototypes and MVPs
- **Performance Evaluation**: Evaluate performance of different models on SpacemiT K1
- **Application Development**: Provides referenceable code templates for actual projects

## Technical Support

- 📖 **Official Documentation**: Detailed usage instructions and API documentation
- 🐛 **Issue Reporting**: [Gitee Issues](https://gitee.com/bianbu/spacemit-demo/issues)
- 💬 **Community Discussion**: SpacemiT Developer Community

Visit the [SpacemiT AI Demo Source Repository](https://gitee.com/bianbu/spacemit-demo.git) now to start your AI development journey!
