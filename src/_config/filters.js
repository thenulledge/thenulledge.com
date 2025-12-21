import {toISOString, formatDate, formatDateWithTimezone, formatDateShort, formatDateShortEST} from './filters/dates.js';
import {markdownFormat} from './filters/markdown-format.js';
import {sortAlphabetically} from './filters/sort-alphabetic.js';
import {splitlines} from './filters/splitlines.js';
import {slugifyString} from './filters/slugify.js';
import {parseChatFile} from './filters/parse-chat.js';
import {sortEventsByDate, eventsToArray} from './filters/sort-events.js';

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
  formatDateShortEST,
  markdownFormat,
  splitlines,
  sortAlphabetically,
  slugifyString,
  parseChatFile,
  sortEventsByDate,
  eventsToArray,
  urlEncode,
  nlToBr
};
