import {toISOString, formatDate, formatDateWithTimezone, formatDateShort, formatSessionTime, formatSessionDuration} from './filters/dates.js';
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

/**
 * Truncate a string to a specified length with ellipsis
 * @param {string} str - String to truncate
 * @param {number} length - Maximum length (default 50)
 * @returns {string} - Truncated string
 */
function truncate(str, length = 50) {
  if (!str || typeof str !== 'string') return str;
  if (str.length <= length) return str;
  return str.substring(0, length - 3).trim() + '...';
}

/**
 * Format a number with thousands separators
 * @param {number} num - Number to format
 * @returns {string} - Formatted number string
 */
function thousands(num) {
  if (num === null || num === undefined) return '';
  return Number(num).toLocaleString('en-US');
}

export default {
  toISOString,
  formatDate,
  formatDateWithTimezone,
  formatDateShort,
  formatSessionTime,
  formatSessionDuration,
  splitlines,
  slugifyString,
  eventsToArray,
  urlEncode,
  nlToBr,
  truncate,
  thousands,
  imageToBase64
};
