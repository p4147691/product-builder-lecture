# AI Smart Hub - Project Blueprint

## Overview
A multi-functional web utility featuring an **AI Clothing Classifier** and a **Lotto Number Generator**. This project combines deep learning (TensorFlow.js) with practical daily tools in a premium, dark-themed interface.

## Key Features
1. **AI Clothing Classifier (Dual Mode):**
    - **Real-time Webcam:** Instant classification via live camera feed.
    - **Image Upload:** Supports analyzing static image files (JPG, PNG) for users without cameras or who prefer privacy.
    - **Categories:** Underwear, Swimwear, and Everyday Wear.
2. **Lotto Number Generator:**
    - Generates 6 unique random numbers (1-45).
    - Visual representation of numbers in styled circles.
3. **Premium Design:**
    - Fully responsive, dark-themed UI.
    - Glassmorphism effects and interactive progress bars for AI results.

## Technical Details
- **AI Engine:** TensorFlow.js & Teachable Machine Image Model.
- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+).
- **External Integrations:**
    - Formspree (Contact Form)
    - Disqus (Comments)
- **Deployment:** GitHub Pages (Automated via Actions).

## Current Tasks / Plan
1. **Restore & Merge Features:**
    - [ ] Add Lotto UI card back to the layout.
    - [ ] Add Image Upload input to the AI section.
2. **Enhanced JavaScript Logic:**
    - [ ] Implement file reader to process uploaded images.
    - [ ] Re-implement the unique Lotto number generation logic.
3. **UI Refinement:**
    - [ ] Style the new "Upload" button and "Lotto" card to match the premium theme.
