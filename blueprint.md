# AI Clothing Classifier - Project Blueprint

## Overview
A sophisticated AI-powered web application that classifies clothing into three categories: Underwear, Swimwear, and Everyday Wear. Built using Google's Teachable Machine and TensorFlow.js, this tool provides real-time visual recognition through a webcam.

## Features
- **Real-time AI Classification:** Uses a pre-trained deep learning model to identify clothing types via webcam.
- **Visual Confidence Gauges:** Displays classification results with interactive progress bars for better UX.
- **Modern & Responsive UI:** A clean, dark-themed interface optimized for all devices.
- **Webcam Integration:** Easy-to-use "Start AI" interface with privacy-conscious implementation.
- **Premium Aesthetics:** Soft shadows, gradients, and subtle glassmorphism effects.

## Technical Details
- **AI Engine:** TensorFlow.js & Teachable Machine Image Model.
- **Framework:** Vanilla HTML5, CSS3, JavaScript (ES6+).
- **Libraries:**
    - `@tensorflow/tfjs`
    - `@teachablemachine/image`
- **Model URL:** `https://teachablemachine.withgoogle.com/models/9OEeUeU7l/`

## Current Tasks / Plan
1. **Refactor UI for AI:**
    - [ ] Replace Lotto UI with a dedicated Webcam and Results container.
    - [ ] Add loading states and intuitive controls.
2. **Integrate AI Model:**
    - [ ] Implement model loading and real-time prediction logic in `main.js`.
    - [ ] Create dynamic result bars that update based on confidence scores.
3. **Refine Styling:**
    - [ ] Enhance the webcam preview with a modern frame.
    - [ ] Improve typography for clarity.
