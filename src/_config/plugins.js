// Eleventy
import webc from '@11ty/eleventy-plugin-webc';
import {eleventyImageTransformPlugin} from '@11ty/eleventy-img';

// custom
import {markdownLib} from './plugins/markdown.js';
import {drafts} from './plugins/drafts.js';

// Custom transforms
import {htmlConfig} from './plugins/html-config.js';

export default {
  webc,
  eleventyImageTransformPlugin,
  markdownLib,
  drafts,
  htmlConfig
};
