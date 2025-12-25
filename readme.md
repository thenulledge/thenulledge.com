# nullEDGE Conference Website

[![Netlify Status](https://img.shields.io/netlify/deploy-status?url=https://thenulledge.com)](https://thenulledge.com)

The official website for **nullEDGE** - a 100% free, community-driven ServiceNow conference series featuring deep technical sessions, real code examples, and zero sales pitches. Built for the global ServiceNow community.

🌐 **Live Site**: [theNullEDGE.com](https://thenulledge.com)  
📺 **YouTube**: [@theNullEDGE](https://www.youtube.com/@thenulledge)  
📧 **Contact**: team@getaiinabox.com

---

## 🎯 Recent Simplification (December 2024)

This project was simplified following **[Getting Real](https://basecamp.com/gettingreal)** principles by Basecamp:

**What was removed:**
- **Tailwind CSS** - Not used for utility classes, switched to static CSS custom properties
- **WebC plugin** - Unused custom web components  
- **AVIF image format** - WebP + JPEG sufficient for our needs
- **Design token JSON pipeline** - Complex build process replaced with direct CSS variables
- **56 npm dependencies** - Reduced from 37 to 20 packages

**Result:** -1,519 lines of code, -45% dependencies, same functionality. The site is now simpler, faster to build, and easier to maintain.

---

## 🎯 What is nullEDGE?

nullEDGE hosts multiple free virtual events throughout the year:

- **nullEDGE Conference** - Annual flagship full-day conference with 30+ technical sessions
- **nullHUB** - Quarterly networking events for casual connections and community building
- **nullStack Alpha/Beta** - Specialized topic-focused events

All events are:
- ✅ **100% Free** - No registration fees, ever
- 🌍 **Global** - Accessible from anywhere with timezone-friendly scheduling
- 🎓 **Technical** - Deep dives into ServiceNow development, not sales pitches
- 📹 **Recorded** - Full session recordings with chat transcripts available post-event
- 🤝 **Community-Driven** - Built by practitioners, for practitioners

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: >= 20.x.x
- **npm**: (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/thenulledge/thenulledge.com.git
cd thenulledge.com

# Install dependencies
npm install

# Start development server
npm start
```

Visit **http://localhost:8080** - the site will auto-reload on file changes.

### Build Commands

```bash
npm start              # Start dev server with live reload at http://localhost:8080
npm run build          # Production build (cleans dist, minifies CSS/JS/HTML)
npm run clean          # Remove dist/ and generated _includes/
npm run clean:og       # Remove generated Open Graph images
npm run build:og       # Force regenerate all OG images
```

**Note**: There are no tests or linting commands configured in this project.

---

## 📁 Project Structure

```
src/
├── _config/                    # Eleventy configuration modules
│   ├── collections.js          # Collection definitions (speakers, sessions, events)
│   ├── events/                 # Build lifecycle hooks
│   │   ├── build-css.js        # PostCSS build pipeline
│   │   ├── build-js.js         # esbuild JavaScript bundler
│   │   └── svg-to-png.js       # OG image conversion
│   ├── filters/                # Template filters (dates, slugify, etc.)
│   ├── plugins/                # Eleventy plugins (markdown, drafts, etc.)
│   ├── shortcodes/             # Custom shortcodes (image optimization)
│   └── utils/                  # Helper utilities
│
├── _data/                      # Global data files
│   ├── companies.js            # Sponsor/company information
│   ├── events.js               # Events data aggregator
│   ├── meta.js                 # Site metadata
│   ├── navigation.js           # Navigation structure
│   └── people.js               # Speaker profiles
│
├── _includes/                  # Reusable templates
│   ├── partials/               # Template partials (header, footer, hero, etc.)
│   └── schemas/                # Schema.org structured data
│
├── _layouts/                   # Page layouts
│   ├── base.njk                # Base HTML template
│   ├── event.njk               # Event landing pages
│   └── page.njk                # Generic content pages
│
├── assets/                     # Static assets
│   ├── css/                    # Stylesheets (see CSS Architecture below)
│   ├── fonts/                  # Web fonts (Atkinson, Red Hat Display)
│   ├── images/                 # Images organized by type
│   │   ├── companies/          # Sponsor logos
│   │   ├── people/             # Speaker headshots
│   │   ├── favicon/            # Generated favicons
│   │   └── template/           # Template images (OG defaults, etc.)
│   └── scripts/                # JavaScript bundles
│
├── common/                     # Common pages (404, sitemap, robots.txt)
└── pages/                      # Content pages organized by year
    ├── 2025/                   # 2025 events (past events)
    │   ├── chats/              # Session chat CSV files
    │   ├── conference.njk      # Session pages generator
    │   ├── nullEDGE.js         # 2025 conference data
    │   └── session.njk         # Individual session template
    └── 2026/                   # 2026 events (upcoming)
        ├── event.njk           # 2026 event pages
        ├── nullEDGE.js         # 2026 flagship conference
        ├── nullHub.js          # Networking event
        ├── nullStackAlpha.js   # Topic-focused event
        └── nullStackBeta.js    # Topic-focused event
```

---

## ✨ Key Features

### 🎪 Event Management

Events are defined as JavaScript modules that export async functions returning event data.

**Location**: `src/pages/{year}/{event-name}.js`

**Example Event Structure**:
```javascript
export default async function () {
  return {
    id: "2026-nulledge",                          // Unique identifier
    name: "nullEDGE",                             // Display name
    when: {
      start: "2026-10-16T09:00:00-04:00",        // ISO 8601 with timezone
      end: "2026-10-16T17:00:00-04:00"
    },
    type: "full-day",                            // "full-day", "networking", "sessions"
    url: "/2026/conference",                      // Page URL
    registrationUrl: "https://events.ringcentral.com/events/nulledge",
    sponsorUrl: "mailto:{{meta.email}}?subject=Sponsor%20nullEDGE",
    description: "The flagship conference...",
    duration: "8 hours",
    sessionCount: 37,
    timezone: "America/New_York",
    niceDatesTimes: {                            // Human-friendly times
      atlanta: "9:00 AM - 5:00 PM EDT",
      london: "2:00 PM - 10:00 PM BST",
      india: "6:30 PM - 2:30 AM IST",
      sydney: "12:00 AM - 8:00 AM AEDT"
    },
    faqs: [                                      // Event FAQs
      { question: "...", answer: "..." }
    ],
    featuredSpeakers: ["Jace Benson", "..."],   // Must match people.js keys
    stats: {
      attendees: "746",
      sessions: "37",
      sponsors: "13"
    },
    sponsors: ["AI In A Box", "..."],           // Must match companies.js keys
    sessions: [                                  // Session array (see below)
      { id: "dU6JY136vTg", ... }
    ]
  };
}
```

**Session Structure**:
```javascript
{
  id: "dU6JY136vTg",                    // YouTube video ID (null for no video)
  duration: 30,                          // Minutes
  published: "2025-10-17T10:15:00-04:00",
  title: "Showcasing Xplore",
  speakers: ["James Neale"],             // Must match people.js keys
  chatFile: "Session 'Showcasing Xplore' chat.csv"  // Optional chat transcript
}
```

**Automated Features**:
- Individual session pages generated via Eleventy pagination
- Session URLs: `/2025/conference/{session-slug}/`
- Open Graph images auto-generated for each session
- Chat transcripts parsed from CSV and embedded in session pages
- Video embeds using lite-youtube for performance

### 👤 Speaker Profiles

Speakers are defined in `src/_data/people.js` as a plain JavaScript object:

```javascript
const people = {
  'Jace Benson': {
    image: '/assets/images/people/jace-benson.jpg',
    title: 'ServiceNow Architect',
    company: 'AI In A Box',
    bio: 'Founder of nullEDGE and ServiceNow community advocate.',
    linkedin: 'https://www.linkedin.com/in/jacebenson/'  // Optional
  },
  // ... more speakers
};
```

**Requirements**:
- Speaker name must exactly match the key in `people.js`
- Headshot image at `src/assets/images/people/{name}.jpg`
- Images should be square aspect ratio (cropped if needed)
- Use lowercase filenames with hyphens: `jace-benson.jpg`

**Features**:
- Speaker detail pages: `/speakers/{speaker-slug}/`
- Automatic collection of speakers from all events
- LinkedIn profile linking (if provided)
- Responsive image optimization

### 🏢 Sponsors

Sponsors/companies are defined in `src/_data/companies.js`:

```javascript
const companies = {
  'AI In A Box': {
    image: '/assets/images/companies/aiinabox.png',
    website: 'https://getaiinabox.com'
  },
  // ... more sponsors
};
```

**Requirements**:
- Company name must exactly match the key in `companies.js`
- Logo at `src/assets/images/companies/{name}.{png|jpg}`
- Logos should have transparent backgrounds (PNG preferred)
- Square or horizontal aspect ratio works best

**Features**:
- Sponsor carousel on homepage and event pages
- Click-through links to sponsor websites
- Consistent display across all events

### 🎨 CSS Architecture

The site uses **CSS custom properties** (CSS variables) for design consistency.

**CSS Variables** (defined in `src/assets/css/global/base/variables.css`):
- Colors: `--color-primary`, `--color-secondary`, `--color-accent`, etc.
- Spacing: `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`, `--space-2xl`, etc.
- Typography: `--size-step-0` through `--size-step-6` (fluid type scale)
- Font weights: `--font-light`, `--font-regular`, `--font-medium`, `--font-bold`, `--font-black`
- Font families: `--font-base`, `--font-serif`

**CSS Architecture**:
```
src/assets/css/
├── global/
│   ├── global.css              # Entry point (imports everything)
│   ├── base/                   # Resets, typography, CSS variables
│   ├── blocks/                 # Reusable components (cards, buttons, badges)
│   ├── compositions/           # Layout patterns (grids, wrappers, flow)
│   └── utilities/              # Single-purpose utility classes
├── local/                      # Page-specific styles
└── components/                 # Special component styles (lite-youtube)
```

**Important CSS Rules**:
- ❌ **No inline styles** - Never use `style=""` attributes
- ✅ **Check before creating** - Search `blocks/` for existing components first
- ✅ **Use CSS custom properties** - Access via `var(--color-primary)`, `var(--space-xl)`, etc.

### 📊 SEO & Performance

**Automated SEO Features**:
- XML sitemap at `/sitemap.xml`
- robots.txt with proper indexing rules
- Schema.org structured data (Event, Organization, Person, FAQPage)
- Open Graph images for all events and sessions
- Twitter Card metadata
- Canonical URLs

**Performance Optimizations**:
- Responsive images with webp and jpeg formats
- Lazy loading for images and videos
- Lite-youtube for video embeds (3x faster than iframe)
- Minified CSS, JS, and HTML in production
- Font subsetting for faster load times
- Critical CSS inlined in `<head>`

**Build Pipeline**:
- PostCSS: import-ext-glob → import → autoprefixer → cssnano
- esbuild for JavaScript bundling (ES modules)
- eleventy-img for image optimization
- sharp for image processing
- SVGO for SVG optimization

---

## 🛠️ How To...

### Add a New Event

1. **Create event file**: `src/pages/{year}/{event-name}.js`
2. **Define event data** (see Event Management structure above)
3. **Add speaker images**: `src/assets/images/people/`
4. **Add speaker profiles**: Update `src/_data/people.js`
5. **Add sponsor logos**: `src/assets/images/companies/`
6. **Add sponsor info**: Update `src/_data/companies.js`
7. **Test locally**: `npm start` and visit the event URL

**Example**:
```bash
# Create new event for 2026
touch src/pages/2026/nullStackGamma.js

# Add speaker headshots
cp ~/speaker-photo.jpg src/assets/images/people/jane-doe.jpg

# Build and test
npm start
```

### Add Chat Transcripts

Chat transcripts are CSV files exported from RingCentral Events.

1. **Export chat from RingCentral**: Download CSV after event
2. **Place CSV**: `src/pages/{year}/chats/Session '{title}' chat.csv`
3. **Reference in event**: Set `chatFile` property in session object
4. **Format**: CSV must have headers: `Time, First Name, Last Name, Text, Linkedin`

**Example CSV**:
```csv
Time,First Name,Last Name,Text,Linkedin
10:15 AM,John,Doe,"Great presentation!",https://linkedin.com/in/johndoe
10:16 AM,Jane,Smith,"Where can I get the code?",
```

### Add Custom CSS

1. **Check existing**: Search `src/assets/css/global/blocks/` first
2. **Global component** (reusable):
   - Create: `src/assets/css/global/blocks/{component-name}.css`
   - Auto-imported via glob pattern in `global.css`
3. **Page-specific** (one-off):
   - Create: `src/assets/css/local/{page-name}.css`
   - Import in page template: `{% set css %}{% include 'css/{page-name}.css' %}{% endset %}`

### Add a New Filter

1. **Create filter file**: `src/_config/filters/{name}.js`
2. **Export function with JSDoc**:
   ```javascript
   /**
    * Description of what the filter does
    * @param {string} input - Input parameter
    * @returns {string} - Output value
    */
   export const myFilter = input => {
     return input.toUpperCase();
   };
   ```
3. **Import in filters index**: `src/_config/filters.js`
4. **Register in config**: `eleventy.config.js` (add to filter list)
5. **Use in templates**: `{{ someValue | myFilter }}`

### Force Regenerate Open Graph Images

Open Graph images are cached to speed up builds. To regenerate:

```bash
# Remove cached OG images
npm run clean:og

# Rebuild with forced regeneration
npm run build:og
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how to get involved:

### Ways to Contribute

- 🐛 **Report bugs** - Open an issue on GitHub
- 💡 **Suggest features** - Share your ideas in discussions
- 📝 **Improve docs** - Submit PRs for documentation updates
- 🎨 **Design improvements** - UI/UX enhancements welcome
- 🧑‍💻 **Code contributions** - Bug fixes, new features, refactoring

### Contribution Guidelines

1. **Fork the repository** and create a feature branch
2. **Follow code style** - See AGENTS.md for detailed guidelines:
   - ES modules only (`import`/`export`)
   - Prettier enforced (110 char width, single quotes, 2 spaces)
   - camelCase for functions, kebab-case for CSS/files
   - JSDoc required for all exported functions
3. **Test locally** - Run `npm start` and verify changes
4. **Keep commits atomic** - One logical change per commit
5. **Write clear commit messages** - Explain the "why", not just the "what"
6. **Submit a pull request** - Reference any related issues

### Code Style Quick Reference

```javascript
// ✅ Good - ES modules, proper imports, JSDoc
import dayjs from 'dayjs';
import {formatDate} from './filters/dates.js';

/**
 * Formats event date with timezone
 * @param {string} date - ISO 8601 date string
 * @returns {string} - Formatted date string
 */
export const formatEventDate = date => {
  return dayjs(date).format('MMMM D, YYYY');
};

// ❌ Bad - CommonJS, no JSDoc, inconsistent naming
const dayjs = require('dayjs');
function Format_Event_Date(date) {
  return dayjs(date).format('MMMM D, YYYY');
}
```

### Getting Help

- 📖 **Documentation**: See AGENTS.md for detailed technical reference
- 💬 **Questions**: Open a GitHub Discussion
- 🐛 **Issues**: Check existing issues before creating new ones

---

## 📋 Important Notes

### Forms & External Links

- ❌ **Do not embed forms** - Always link to external registration/submission forms
- ✅ **Use RingCentral Events** for registration links
- ✅ **Use Google Forms** or similar for session submissions
- ✅ **Use mailto links** for sponsor inquiries

**Example**:
```javascript
registrationUrl: "https://events.ringcentral.com/events/nulledge",
speakerSubmissionUrl: "https://forms.google.com/...",
sponsorUrl: "mailto:{{meta.email}}?subject=Sponsor%20nullEDGE"
```

### Date & Time Format

Always use **ISO 8601 with timezone offset**:

```javascript
// ✅ Correct
"2026-10-16T09:00:00-04:00"  // October 16, 2026 at 9 AM EDT

// ❌ Wrong
"2026-10-16 09:00:00"         // No timezone
"10/16/2026 9:00 AM"          // Not ISO 8601
```

### Image Requirements

- **Speaker headshots**: 500x500px minimum, square aspect ratio, JPEG
- **Sponsor logos**: 400px wide minimum, PNG with transparency
- **OG images**: Auto-generated at 1200x630px (no manual creation needed)
- **Optimize before adding**: Use tools like Squoosh or ImageOptim

### Build Artifacts

These directories are auto-generated and gitignored:

- `dist/` - Production build output
- `src/_includes/css/` - Compiled CSS
- `src/_includes/scripts/` - Bundled JavaScript
- `src/assets/og-images/` - Generated Open Graph images
- `.cache/` - Eleventy and plugin caches

---

## 🧰 Tech Stack

| Category | Tools |
|----------|-------|
| **Static Site Generator** | [Eleventy 3.x](https://www.11ty.dev/) (ES modules) |
| **CSS** | Custom CSS with PostCSS (autoprefixer + cssnano) |
| **JavaScript Bundler** | [esbuild](https://esbuild.github.io/) |
| **Templating** | [Nunjucks](https://mozilla.github.io/nunjucks/) (.njk) |
| **Markdown** | [markdown-it](https://github.com/markdown-it/markdown-it) with plugins |
| **Image Optimization** | [@11ty/eleventy-img](https://www.11ty.dev/docs/plugins/image/), [sharp](https://sharp.pixelplumbing.com/) (webp, jpeg) |
| **Date Handling** | [dayjs](https://day.js.org/) with UTC, timezone, advancedFormat plugins |
| **Code Formatting** | [Prettier](https://prettier.io/) |
| **Deployment** | [Netlify](https://www.netlify.com/) (automatic deploys from `main` branch) |
| **Version Control** | Git + GitHub |

**Node Version**: >= 20.x.x (ES modules required)

---

## 📜 License

ISC License - See LICENSE.MD for details.

---

## 🙏 Credits

- **Original Template**: Based on [Eleventy Excellent](https://eleventy-excellent.netlify.app/) by [Lene Saile](https://www.lenesaile.com/)
- **Founder**: [Jace Benson](https://jace.pro)
- **Contributors**: Carleen Carter, Chuck Tomasi, Jeff Jessie, Justin Meadows, Kalisha Moore, Slava Savitsky, and the entire nullEDGE team

### Sponsors

Special thanks to our sponsors who make these free events possible:

- AI In A Box
- BizSolutions.Tech
- Kinetic Data
- Apricot Jam Technologies
- CitrusFlows
- SNow Pro Consultants
- Genus Technologies
- ShareLogic
- Serenity EHS
- Echelon AI
- ChecklistPRO
- Intellective
- CJ & The Duke

**Want to sponsor?** Contact us at team@getaiinabox.com

---

## 🔗 Links

- 🌐 **Website**: [theNullEDGE.com](https://thenulledge.com)
- 📺 **YouTube**: [@theNullEDGE](https://www.youtube.com/@thenulledge)
- 💼 **GitHub**: [thenulledge/thenulledge.com](https://github.com/thenulledge/thenulledge.com)
- 📧 **Email**: team@getaiinabox.com

---

Built with ❤️ for the ServiceNow community
