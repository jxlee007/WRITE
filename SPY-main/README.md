# SHADES OF THE SHADOWS

A cinematic spy thriller interface built with Astro, React, TailwindCSS, and GSAP. Features immersive animations, character profiles, and case file investigations.

## 🎬 Features

- **Parallax Hero Section** with Framer Motion zoom effects
- **Interactive Character Modal** with ASCII art character cards  
- **Timeline Dossier System** with case file filtering
- **Page Transitions** with custom overlay animations
- **Accessibility Features** including keyboard navigation and screen reader support
- **Responsive Design** optimized for mobile and desktop
- **Performance Optimized** with lazy loading and efficient animations

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
web/
├── astro.config.mjs
├── package.json
├── postcss.config.cjs
├── readme.md
├── ST-plan.md
├── tailwind.config.cjs
├── tsconfig.json
└── src/
    ├── env.d.ts
    ├── components/
    │   ├── CharactersModal.jsx
    │   ├── DecryptedText.jsx
    │   ├── FilmsCarousel.jsx
    │   ├── HeroContent.jsx
    │   └── ParallaxZoom.jsx
    ├── data/
    │   ├── cases.json
    │   ├── characters.json
    │   └── timeline.json
    ├── layouts/
    │   └── Layout.astro
    ├── pages/
    │   ├── dossier.astro
    │   └── index.astro
    └── styles/
        └── global.css
```

## 📅 Versioning and Status

- **Version**: 0.1.0
- **Last Updated**: 2025-10-02
- **Status**: Working prototype (Astro). Some pages/components in `src/components` are implemented. Builds and local dev available via `package.json` in this folder.
