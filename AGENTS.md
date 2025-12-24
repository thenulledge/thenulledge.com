# Coding Agent Reference for nullEDGE Conference Site

## Recent Simplification (Dec 2024)

This project was simplified following **Getting Real** principles:
- **Removed Tailwind CSS** - Not using utility classes, switched to static CSS vars
- **Removed WebC plugin** - Unused custom web components
- **Removed @11ty/is-land** - Island architecture not needed
- **Removed AVIF format** - WebP + JPEG sufficient
- **Result**: -1,519 lines of code, -56 npm dependencies (37→20), same functionality

The site is now simpler, faster to build, and easier to maintain. All CSS custom properties are directly in `variables.css` instead of being generated through a complex JSON → JS → Tailwind pipeline.

## Build/Dev Commands
- `npm start` - Start dev server with live reload at http://localhost:8080 (runs `dev:11ty`)
- `npm run build` - Production build (cleans, then runs `build:11ty`)
- `npm run build:og` - Force regenerate Open Graph images (sets FORCE_OG_REGEN=true)
- `npm run clean` - Remove dist and generated includes (src/_includes/css, src/_includes/scripts)
- `npm run clean:og` - Remove generated OG images (src/assets/og-images)
- **No tests configured** - This project has no test suite or linting commands

## Tech Stack
- **Static Site Generator**: Eleventy 3.x with ES modules (requires Node >= 20.x)
- **CSS**: Custom CSS with PostCSS (NO Tailwind - removed in simplification)
- **PostCSS Pipeline**: postcss-import-ext-glob → postcss-import → autoprefixer → cssnano
- **Templates**: Nunjucks (.njk), Markdown (.md) with markdown-it (WebC removed)
- **JavaScript**: esbuild for bundling, ES modules only
- **Images**: @11ty/eleventy-img for optimization (webp, jpeg only - avif removed)
- **Dates**: dayjs with utc, timezone, and advancedFormat plugins
- **Build Tools**: fast-glob for file finding, rimraf for cleaning
- **Dependencies**: 20 packages (down from 37 - simplified Dec 2024)

## Code Style

### Imports & Modules
- **ES modules only**: Always use `import`/`export`, never CommonJS (`require`)
- **Import order**: Group by category with blank lines between:
  1. Node built-ins (`node:fs`, `node:path`)
  2. Eleventy packages (`@11ty/*`)
  3. External dependencies (`dayjs`, `tailwindcss`)
  4. Internal modules (relative imports)
- **Named vs default**: Use named exports for utilities/filters, default for Eleventy configs
- **File extensions**: Include `.js` extension in relative imports

### Formatting (Prettier enforced)
- **Line width**: 110 characters max
- **Indentation**: 2 spaces (no tabs)
- **Quotes**: Single quotes for JS, double quotes for HTML/templates
- **Trailing commas**: Never (trailingComma: "none")
- **Bracket spacing**: Disabled (`{foo}` not `{ foo }`)
- **Arrow parens**: Avoid when possible (`x => x` not `(x) => x`)
- **Template files**: Nunjucks (.njk) use jinja-template parser

### Naming Conventions
- **Functions & variables**: camelCase (`buildAllCss`, `imageShortcode`, `speakerNames`)
- **Exported functions**: camelCase (`toISOString`, `formatDate`)
- **CSS classes**: kebab-case (`main-nav`, `flow-space-2xl`, `text-primary`)
- **File names**: kebab-case (`build-css.js`, `sort-events.js`, `custom-masonry.webc`)
- **Constants**: UPPER_SNAKE_CASE only for true constants (`ELEVENTY_ENV`)
- **Private helpers**: Prefix with underscore if needed (`_processImage`)

### Documentation & Comments
- **JSDoc required**: For all exported functions
- **Format**: Include @param with types and @returns
  ```javascript
  /**
   * Converts the given date string to ISO8601 format.
   * @param {string} dateString - Date string to convert
   * @returns {string} - ISO formatted date string
   */
  ```
- **Inline comments**: Use sparingly, prefer self-documenting code
- **TODO comments**: Acceptable format `// TODO: description`

### Async Operations
- **Always use async/await**: Never use raw Promises or callbacks
- **Parallel operations**: Use `Promise.all()` for independent async tasks
  ```javascript
  await Promise.all([
    buildCss('input1.css', ['output1.css']),
    buildCss('input2.css', ['output2.css'])
  ]);
  ```
- **Sequential when needed**: Use await in sequence only when operations depend on each other
- **Error handling**: Let errors bubble up; Eleventy will catch and display them

### Error Handling
- **Validation**: Check required parameters early, throw descriptive errors
  ```javascript
  if (!src) {
    throw new Error(`src parameter is required for {% ${shortcodeName} %} shortcode`);
  }
  ```
- **Guard clauses**: Return early for invalid input
  ```javascript
  if (!str || typeof str !== 'string') return str;
  ```
- **No try-catch**: Unless you're handling the error meaningfully; let Eleventy handle build failures

### Types (no TypeScript)
- **JSDoc types**: Use JSDoc for type hints in editors
- **Type checking**: Parameters validated at runtime when critical
- **Null safety**: Check for undefined/null with guard clauses

## File Organization

### Eleventy Configuration
- **Main config**: `eleventy.config.js` - Minimal, imports from `src/_config/`
- **Collections**: `src/_config/collections.js` - Export named collection functions
- **Filters**: `src/_config/filters.js` - Aggregate and re-export from `filters/` subdirectory
- **Plugins**: `src/_config/plugins.js` - Export plugins as object properties
- **Shortcodes**: `src/_config/shortcodes.js` - Export shortcode functions
- **Events**: `src/_config/events.js` - Build lifecycle hooks (before/after)
- **Utils**: `src/_config/utils/*.js` - Helper functions (clamp-generator, tokens-to-tailwind)
- **NEVER modify main eleventy.config.js**: Always add new features in `src/_config/` subdirectories

### Data Files
- **Global data**: `src/_data/*.js` - Export async functions or objects
- **Design tokens**: `src/_data/designTokens/*.json` - JSON format, processed by tokens-to-tailwind
- **Event data**: `src/pages/{year}/*.js` - Event definitions export async default functions
- **People/Companies**: `src/_data/people.js`, `src/_data/companies.js` - Plain JS objects

### Templates & Assets
- **Layouts**: `src/_layouts/*.njk` - Base page templates (base.njk, page.njk, event.njk)
- **Partials**: `src/_includes/partials/*.njk` - Reusable template chunks (header, footer, hero)
- **CSS**: See CSS Architecture section below
- **Scripts**: `src/assets/scripts/bundle/*.js` - Bundled by esbuild on build
- **Images**: `src/assets/images/` - Organized by type (companies, people, template, favicon)

## CSS Architecture

### Directory Structure
- **Global styles**: `src/assets/css/global/global.css` - Entry point, imports everything
- **Base**: `src/assets/css/global/base/*.css` - Resets, typography, root variables
- **Blocks**: `src/assets/css/global/blocks/*.css` - Reusable components (button.css, card.css, badge.css, prose.css)
- **Compositions**: `src/assets/css/global/compositions/*.css` - Layout patterns (grids.css, wrapper.css, flow.css)
- **Utilities**: `src/assets/css/global/utilities/*.css` - Single-purpose classes
- **Local**: `src/assets/css/local/*.css` - Page-specific styles (details.css, gallery.css)
- **Components**: `src/assets/css/components/*.css` - Special component styles (lite-youtube.css)

### CSS Conventions
- **NO inline styles**: Never use `style=""` attributes in HTML
- **Check before creating**: Always search `src/assets/css/global/blocks/` before adding new page-specific CSS
- **Custom properties**: CSS vars defined in variables.css (--color-primary, --space-xl, --size-2xl)
- **Class naming**: Follow BEM-like patterns or semantic naming
- **Build output**: CSS bundled to `src/_includes/css/` (included in templates) and `dist/assets/css/`

## Key Conventions

### Event Management
- **Event files**: JavaScript modules exporting async functions returning event objects
- **Required fields**: id, name, when (start/end), type, url, description
- **Event types**: "full-day", "networking", "sessions"
- **Sessions array**: Each session has id, title, speakers (array of names), videoId, description
- **Speaker names**: Must match keys in `src/_data/people.js`

### Date Handling
- **Format**: ISO 8601 with timezone offset: `"2026-02-05T15:00:00-05:00"`
- **Timezone plugin**: Always extended in filters that handle dates
- **Formatters**: Use custom filters (`formatDate`, `formatDateWithTimezone`, `formatDateShort`)
- **Display**: Include timezone abbreviations (EST, IST, SGT, BST, EDT)

### Image Processing
- **Shortcode**: Use `{% image %}` shortcode, never raw `<img>` tags for content images
- **Path handling**: Shortcode auto-prepends `./src` to paths if missing
- **Optimization**: Generates webp and jpeg at multiple widths (650, 960, 1400px)
- **Output**: Processed to `dist/assets/images/` with format `{name}-{width}w.{format}`
- **Attributes**: Always include alt text, use loading="lazy" by default

### Collections & Pagination
- **Collections**: Defined in `src/_config/collections.js`, registered in main config
- **Usage**: Access via `collections.{name}` in templates
- **Pagination**: Use Eleventy's pagination for generating multiple pages from data
- **Filtering**: Use `getFilteredByGlob()` or custom filter functions

## Development Workflow

1. **Start dev server**: `npm start` (runs on http://localhost:8080)
2. **Make changes**: Edit files in `src/`, server auto-reloads
3. **Add new features**: Create in appropriate `src/_config/` subdirectory, export in index file
4. **Test locally**: Check http://localhost:8080, verify responsive design
5. **Build for production**: `npm run build`, check `dist/` output
6. **Deploy**: Push to Git, Netlify auto-deploys (configured in netlify.toml)

## Common Tasks

### Adding a new filter
1. Create `src/_config/filters/{name}.js` with exported function(s)
2. Import in `src/_config/filters.js` and add to default export object
3. Register in `eleventy.config.js`: `eleventyConfig.addFilter('name', filters.name)`

### Adding a new event
1. Create `src/pages/{year}/{event-name}.js`
2. Export async default function returning event object
3. Add event type to layout if needed (conference.njk, event.njk)
4. Update navigation if necessary

### Adding global CSS component
1. Create `src/assets/css/global/blocks/{component}.css`
2. Component will auto-import via glob pattern in global.css
3. Use in templates with appropriate class names

## Gotchas & Common Mistakes

- **Don't edit eleventy.config.js directly**: Use `src/_config/` subdirectories
- **Don't forget .js in imports**: ES modules require explicit extensions
- **Don't use sync file operations**: Always use async/await with fs/promises
- **Don't create inline styles**: Use CSS classes
- **Don't hardcode dates**: Use filters and CSS custom properties
- **Don't skip JSDoc**: Required for all exported functions
- **Build artifacts are gitignored**: `dist/`, `src/_includes/css/`, `src/_includes/scripts/`

## Performance Notes
- Images optimized to webp+jpeg, served as responsive picture elements
- CSS minified with cssnano in production
- HTML minified in production builds
- SVG OG images converted to JPEG post-build (except in dev mode)
- Fast-glob for efficient file system operations
