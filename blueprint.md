# Lotto Number Generator - Project Blueprint

## Overview
A modern, framework-less web application for generating Lotto numbers (1-45). Built with a focus on clean design, responsiveness, and a smooth user experience.

## Features
- **Lotto Number Generator:** Generates 6 unique numbers between 1 and 45.
- **Responsive Design:** Optimized for both mobile and desktop screens.
- **Theme Toggle (Light/Dark Mode):** Allows users to switch between light and dark themes. **Default is now Dark Mode.**
- **Contact Form:** Integrated with Formspree for user feedback and inquiries.
- **Disqus Comments:** Integrated community discussion platform, **positioned to the right on desktop.**
- **Modern UI:** Uses soft shadows, gradients, and subtle textures for a premium feel.

## Technical Details
- **Framework:** None (Vanilla HTML, CSS, JavaScript).
- **Standards:** HTML5, CSS3 (Flexbox, CSS Variables), ES6 Modules.
- **Integrations:**
    - **Formspree:** Used for handling form submissions (Endpoint: `https://formspree.io/f/xdalddzk`).
    - **Disqus:** Community comments section (Shortname: `productbuilder-gwwnslrqum`).
- **Deployment:**
    - **GitHub Pages:** Automated deployment via GitHub Actions (`.github/workflows/deploy.yml`).
- **Styling:**
    - Uses CSS variables for consistent color management.
    - Two-column layout on desktop for better space utilization.
    - Animated button with hover effects.
- **JavaScript:**
    - `Set` object for unique number generation.
    - DOM manipulation for dynamic content updates.
    - `localStorage` for saving theme preference, defaulting to 'dark'.

## Current Tasks / Plan
1. **Automate Deployment:**
    - [x] Create GitHub Actions workflow for static site deployment.
    - [x] Push all changes to trigger initial automated deploy.
