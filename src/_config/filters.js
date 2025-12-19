import {toISOString, formatDate, formatDateWithTimezone, formatDateShort} from './filters/dates.js';
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

export default {
  toISOString,
  formatDate,
  formatDateWithTimezone,
  formatDateShort,
  markdownFormat,
  splitlines,
  sortAlphabetically,
  slugifyString,
  parseChatFile,
  sortEventsByDate,
  eventsToArray,
  urlEncode
};
