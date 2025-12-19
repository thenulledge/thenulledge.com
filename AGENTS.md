# Coding Agent Reference for nullEDGE Conference Site

## Build/Dev Commands
- `npm start` - Start dev server with live reload (runs `dev:11ty`)
- `npm run build` - Production build (cleans, then runs `build:11ty`)
- `npm run clean` - Remove dist and generated includes
- No tests configured in this project

## Tech Stack
- Eleventy 3.x static site generator with ES modules
- Tailwind CSS (custom config, no preflight)
- PostCSS pipeline: postcss-import-ext-glob → postcss-import → tailwindcss → autoprefixer → cssnano
- Nunjucks templates (.njk), WebC components, Markdown with plugins
- esbuild for JavaScript bundling
- dayjs for date handling, eleventy-img for image optimization

## Code Style
- **Imports**: ES modules only (`import`/`export`), group by: Eleventy → external → internal
- **Formatting**: Prettier enforced (110 char width, single quotes, 2 spaces, no trailing commas, no bracket spacing)
- **File Organization**: Config split into `src/_config/{collections,events,filters,plugins,shortcodes}.js` with index files that export objects
- **Naming**: camelCase for functions/variables, kebab-case for CSS classes and filenames
- **Comments**: JSDoc for exported functions with param types and descriptions
- **Async**: Use async/await, prefer Promise.all() for parallel operations
- **Data Files**: Design tokens in JSON at `src/_data/designTokens/`, processed via `tokens-to-tailwind.js` utility

## Key Conventions
- Eleventy config modifications go in `src/_config/` subdirectories, not main `eleventy.config.js`
- CSS: Global styles in `src/assets/css/global/`, local/page-specific in `local/`, components in `components/`
- Images: Process through eleventy-img shortcodes, optimize to webp+jpeg
- Dates: Use dayjs with UTC/timezone plugins, custom formatters in `filters/dates.js`
