/**
 * Most adjustments must be made in `./src/_config/*`
 *
 * Hint VS Code for eleventyConfig autocompletion.
 * © Henry Desroches - https://gist.github.com/xdesro/69583b25d281d055cd12b144381123bf
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig -
 * @returns {Object} -
 */

// register dotenv for process.env.* variables to pickup
import dotenv from 'dotenv';
dotenv.config();

//  config import
import {showInSitemap, sessions2025, events2026, speakers} from './src/_config/collections.js';
import events from './src/_config/events.js';
import filters from './src/_config/filters.js';
import plugins from './src/_config/plugins.js';
import shortcodes from './src/_config/shortcodes.js';

export default async function (eleventyConfig) {
  // --------------------- Events: before build
  eleventyConfig.on('eleventy.before', async () => {
    await events.buildAllCss();
    await events.buildAllJs();
  });

  // --------------------- custom wtach targets
  eleventyConfig.addWatchTarget('./src/assets/**/*.{css,js,svg,png,jpeg}');
  eleventyConfig.addWatchTarget('./src/pages/**/*.js');

  //	---------------------  Collections
  eleventyConfig.addCollection('showInSitemap', showInSitemap);
  eleventyConfig.addCollection('sessions2025', sessions2025);
  eleventyConfig.addCollection('events2026', events2026);
  eleventyConfig.addCollection('speakers', speakers);

  // ---------------------  Plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.drafts);

  // Skip image transform plugin in dev mode for faster starts
  if (process.env.ELEVENTY_RUN_MODE !== 'serve') {
    eleventyConfig.addPlugin(plugins.eleventyImageTransformPlugin, {
      formats: ['webp', 'jpeg'],
      widths: ['auto'],
      htmlOptions: {
        imgAttributes: {
          loading: 'lazy',
          decoding: 'async',
          sizes: 'auto'
        },
        pictureAttributes: {}
      }
    });
  }

  // ---------------------  bundle
  eleventyConfig.addBundle('css', {hoist: true});
  eleventyConfig.addBundle('js', {hoist: true});

  // 	--------------------- Library and Data
  eleventyConfig.setLibrary('md', plugins.markdownLib);

  // --------------------- Filters
  eleventyConfig.addFilter('toIsoString', filters.toISOString);
  eleventyConfig.addFilter('formatDate', filters.formatDate);
  eleventyConfig.addFilter('formatDateWithTimezone', filters.formatDateWithTimezone);
  eleventyConfig.addFilter('formatDateShort', filters.formatDateShort);
  eleventyConfig.addFilter('formatSessionTime', filters.formatSessionTime);
  eleventyConfig.addFilter('formatSessionDuration', filters.formatSessionDuration);
  eleventyConfig.addFilter('splitlines', filters.splitlines);
  eleventyConfig.addFilter('slugify', filters.slugifyString);
  eleventyConfig.addFilter('eventsToArray', filters.eventsToArray);
  eleventyConfig.addFilter('urlEncode', filters.urlEncode);
  eleventyConfig.addFilter('nlToBr', filters.nlToBr);
  eleventyConfig.addFilter('truncate', filters.truncate);
  eleventyConfig.addFilter('thousands', filters.thousands);
  eleventyConfig.addFilter('imageToBase64', filters.imageToBase64);

  // --------------------- Shortcodes
  eleventyConfig.addShortcode('image', shortcodes.imageShortcode);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  // --------------------- Events: after build
  // Convert SVG OG images to PNG (skipped in development mode via NODE_ENV check)
  eleventyConfig.on('eleventy.after', events.svgToJpeg);

  // --------------------- Passthrough File Copy

  // -- same path
  ['src/assets/fonts/', 'src/assets/images/template', 'src/assets/images/companies', 'src/assets/images/people', 'src/assets/images/og.png'].forEach(path =>
    eleventyConfig.addPassthroughCopy(path)
  );

  eleventyConfig.addPassthroughCopy({
    // -- to root
    'src/assets/images/favicon/*': '/'
  });

  // ----------------------  ignore test files (no longer needed, pa11y deleted)
  // Keeping this section in case you add test files later

  // --------------------- general config
  return {
    markdownTemplateEngine: 'njk',

    dir: {
      output: 'dist',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
}
