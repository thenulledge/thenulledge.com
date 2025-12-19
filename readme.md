# nullEDGE Conference Website

The official website for nullEDGE, a community-driven ServiceNow conference series featuring technical sessions, networking events, and educational content.

## Overview

This site is built with Eleventy 3.x and serves as the hub for all nullEDGE events, including:
- Annual flagship conference
- Networking sessions
- Session recordings and chat transcripts
- Speaker and sponsor information

## Features

- **Event Management**: Dynamic event pages generated from JavaScript data files
- **Session Pages**: Individual pages for each conference session with video embeds and chat transcripts
- **Chat Transcripts**: CSV-based chat logs with support for LinkedIn profiles and GIFs
- **Image Optimization**: Automated image processing with eleventy-img
- **Responsive Design**: Tailwind CSS with custom design tokens
- **Build Pipeline**: PostCSS + esbuild for CSS and JS bundling
- **SEO Ready**: XML sitemap, Open Graph images, structured data

## Development

### Install dependencies

```bash
npm install
```

### Working locally

Starts dev server with live reload:

```bash
npm start
```

### Creating a production build

Minifies JS, CSS and HTML:

```bash
npm run build
```

### Clean build artifacts

```bash
npm run clean
```

## Project Structure

```
src/
├── _config/          # Eleventy configuration (collections, filters, plugins)
├── _data/            # Global data files and event definitions
│   ├── events/       # Event data organized by year
│   └── chats/        # Session chat CSV files
├── _includes/        # Layouts, partials, and components
├── _layouts/         # Base page layouts
├── assets/           # Static assets (images, CSS, JS, fonts)
└── pages/            # Content pages organized by year
    ├── 2025/         # 2025 event pages and sessions
    └── 2026/         # 2026 event pages
```

## Adding Events

Events are defined in JavaScript files:

1. **For upcoming events**: Create in `src/pages/{year}/{event-name}.js`
2. **For past events**: Create in `src/_data/events/{year}/{event-name}.js`

Each event exports an async function returning event data:

```javascript
export default async function () {
  return {
    name: "Event Name",
    when: { start: "2026-10-16T09:00:00-04:00", end: "..." },
    type: "full-day", // or "networking" or "sessions"
    url: "/2026/event-name",
    registrationUrl: "...",
    description: "...",
    sessions: [...], // Array of session objects
    sponsors: [...], // Array of sponsor objects
    // ... more fields
  };
}
```

## Session Pages

Session pages are automatically generated from event data using pagination:

- Template: `src/pages/{year}/event.njk`
- Output: `/2025/conference/{session-slug}/`
- Features: Video embed, chat transcript, metadata, breadcrumbs

## Tech Stack

- **Static Site Generator**: Eleventy 3.x (ES modules)
- **CSS**: Tailwind CSS (custom config, no preflight)
- **Build Tools**: PostCSS, esbuild, cssnano
- **Templating**: Nunjucks (.njk), WebC components
- **Markdown**: markdown-it with plugins
- **Images**: eleventy-img for optimization
- **Dates**: dayjs with timezone support

## Code Style

- ES modules (`import`/`export`)
- Prettier enforced (110 char width, single quotes)
- camelCase for functions/variables
- kebab-case for CSS classes and filenames

## Credits

Originally based on [Eleventy Excellent](https://eleventy-excellent.netlify.app/) by Lene Saile.

Built for the ServiceNow community by [Jace Benson](https://jace.pro) and contributors.
