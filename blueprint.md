# Lotto Number Generator - Project Blueprint

## Overview
A modern, framework-less web application for generating Lotto numbers (1-45). Built with a focus on clean design, responsiveness, and a smooth user experience.

## Features
- **Lotto Number Generator:** Generates 6 unique numbers between 1 and 45.
- **Responsive Design:** Optimized for both mobile and desktop screens.
- **Theme Toggle (Light/Dark Mode):** Allows users to switch between light and dark themes, with preference persistence via `localStorage`.
- **Contact Form:** Integrated with Formspree for user feedback and inquiries.
- **Modern UI:** Uses soft shadows, gradients, and subtle textures for a premium feel.

## Technical Details
- **Framework:** None (Vanilla HTML, CSS, JavaScript).
- **Standards:** HTML5, CSS3 (Flexbox, CSS Variables), ES6 Modules.
- **Integrations:**
    - **Formspree:** Used for handling form submissions (Endpoint: `https://formspree.io/f/xdalddzk`).
- **Styling:**
    - Uses CSS variables for consistent color management.
    - Container-based layout with deep shadows.
    - Animated button with hover effects.
- **JavaScript:**
    - `Set` object for unique number generation.
    - DOM manipulation for dynamic content updates.
    - `localStorage` for saving theme preference.

## Current Tasks / Plan
1. **Implement Contact Form:**
    - [x] Add HTML form structure to `index.html`.
    - [x] Add styling for the form in `style.css`, ensuring theme compatibility.
    - [x] Link to Formspree endpoint.
2. **Deployment:**
    - [x] Commit and push changes to GitHub repository.
