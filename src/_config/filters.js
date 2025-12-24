import {toISOString, formatDate, formatDateWithTimezone, formatDateShort} from './filters/dates.js';
import {splitlines} from './filters/splitlines.js';
import {slugifyString} from './filters/slugify.js';
import {eventsToArray} from './filters/sort-events.js';
import {imageToBase64} from './filters/image-to-base64.js';

/**
 * URL encode a string using encodeURIComponent
 * @param {string} str - String to encode
 * @returns {string} - URL encoded string
 */
function urlEncode(str) {
  return encodeURIComponent(str);
}

/**
 * Convert newlines to <br> tags
 * @param {string} str - String with newlines
 * @returns {string} - String with <br> tags
 */
function nlToBr(str) {
  if (!str || typeof str !== 'string') return str;
  return str.replace(/\n/g, '<br>');
}

export default {
  toISOString,
  formatDate,
  formatDateWithTimezone,
  formatDateShort,
  splitlines,
  slugifyString,
  eventsToArray,
  urlEncode,
  nlToBr,
  imageToBase64
};
