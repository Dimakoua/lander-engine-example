# Lander Engine Example

> A production-ready example project demonstrating [lander-engine](https://github.com/Dimakoua/lander-engine) — a configuration-driven landing page framework built on Astro.

## Overview

This repository showcases how to build high-performance, scalable landing pages using **lander-engine** with a JSON-first configuration approach. It integrates seamlessly with Astro, React, and Tailwind CSS to provide a complete static site generation workflow optimized for modern web standards.

### Key Features

- 🎯 **Configuration-Driven**: Define landing pages via JSON configurations instead of writing boilerplate code
- ⚡ **Astro-Powered**: Zero-JavaScript by default; opt-in interactivity with React components
- 🎨 **Tailwind CSS**: Utility-first styling out of the box
- 📱 **Mobile-Ready**: Built-in mobile detection and responsive layouts
- 🔧 **Customizable**: Extend with custom components and action handlers
- 🚀 **Static Generation**: Fast, secure, CDN-friendly output

## Prerequisites

- **Node.js** 18.0 or higher
- **npm** (or yarn/pnpm)

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Dimakoua/lander-engine-example.git
cd lander-engine-example
npm install
```

### Development

Start the development server with hot reload:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser (or the address shown in your terminal).

### Production Build

Generate an optimized static site:

```bash
npm run build
```

Output is written to the `dist/` directory, ready for deployment to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

### Preview Production Build

After building, you can run a local preview server to verify the generated HTML/CSS/JS exactly as it will be deployed:

```bash
npm run preview
```

Then open `http://localhost:4321` (or the address shown in the terminal).

## Project Structure

```
lander-engine-example/
├── lander.config.js           # Main engine configuration
├── routing.config.js          # Route and navigation setup
├── package.json               # Project dependencies
├── components/                # Reusable Astro/React UI components
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Testimonials.tsx
│   └── ...
├── actions/                   # Custom action handlers
│   └── analytics.ts
├── json_configs/              # Campaign and page definitions
│   └── campaign_alpha/
│       ├── flow.json          # User journey flow
│       ├── layout.json        # Page layout structure
│       ├── theme.json         # Styling configuration
│       ├── steps/             # Step-specific configs
│       └── mobile/            # Mobile-specific overrides
└── dist/                      # Build output (generated)
```

## Core Configuration Files

### `lander.config.js`
Engine settings for directories, plugin configuration, and build optimization.

```javascript
export default {
  jsonConfigsDir: 'json_configs',
  componentsDir: 'components',
  actionsDir: 'actions',
  outputDir: 'dist',
  plugins: []
};
```

### `json_configs/`
Campaign definitions using JSON for layouts, flows, themes, and step-specific configurations. Supports desktop and mobile variants.

## Usage Examples

### Building a Campaign

1. Create a new directory under `json_configs/` with your campaign name
2. Define `flow.json`, `layout.json`, and `theme.json`
3. Add step-specific configurations in the `steps/` subdirectory
4. Reference components from `components/` in your JSON configs
5. Run `npm run build` to generate static output

### Adding Custom Components

Create `.tsx` files in the `components/` directory. They are auto-registered and available for use in JSON configs.

### Adding Custom Actions

Create action handlers in `actions/` to handle form submissions, analytics, or custom events defined in your JSON configs.

## Updating Dependencies

### Astro Upgrade

To keep Astro up to date:

```bash
npm install astro@latest
npm install
npm run build
```

### Other Dependencies

For all dependencies:

```bash
npm update
npm run build
```

## Deployment

This project builds to static HTML, CSS, and JavaScript. Deploy the `dist/` directory to any static host:

- **Vercel**: Connect your GitHub repo and deploy with zero config
- **Netlify**: Drag and drop `dist/` or connect via Git
- **GitHub Pages**: Push `dist/` to your `gh-pages` branch
- **AWS S3 + CloudFront**: Sync `dist/` to S3 and serve via CloudFront

## Documentation

For comprehensive documentation on `lander-engine`, visit: [github.com/Dimakoua/lander-engine](https://github.com/Dimakoua/lander-engine)

## License

This project is licensed under the MIT License. See `LICENSE` file for details.

## Support

- 📖 [Lander Engine Docs](https://github.com/Dimakoua/lander-engine)
- 🐛 [Report Issues](https://github.com/Dimakoua/lander-engine/issues)
- 💬 [Discussions](https://github.com/Dimakoua/lander-engine/discussions)

---

**Built with [Astro](https://astro.build), [React](https://react.dev), and [Tailwind CSS](https://tailwindcss.com)**

