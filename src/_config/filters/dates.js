import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

/** Converts the given date string to ISO8610 format. */
export const toISOString = dateString => dayjs(dateString).toISOString();

/** Formats a date using dayjs's conventions: https://day.js.org/docs/en/display/format */
export const formatDate = (date, format) => {
  // Parse the date and keep it in its original timezone
  return dayjs(date).format(format);
};

/** Formats a date with timezone information */
export const formatDateWithTimezone = (date, timezoneStr) => {
  // Extract all parts from the ISO string
  const match = date.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})([+-]\d{2}:\d{2})/);
  if (!match) return date;
  
  const [, year, month, day, hourStr, minute, second, offset] = match;
  const hour = parseInt(hourStr);
  
  // Convert 24h to 12h format
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  
  // Format the date part manually
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November', 'December'];
  const monthName = monthNames[parseInt(month) - 1];
  const datePart = `${monthName} ${parseInt(day)}, ${year}`;
  
  // Map timezone offsets to abbreviations
  const tzMap = {
    '+08:00': 'SGT',  // Singapore Time
    '+01:00': 'BST',  // British Summer Time  
    '+05:30': 'IST',  // India Standard Time
    '-04:00': 'EDT',  // Eastern Daylight Time
    '-05:00': 'EST',  // Eastern Standard Time
  };
  
  const tzAbbr = tzMap[offset] || offset;
  
  return `${datePart} at ${hour12}:${minute} ${ampm} ${tzAbbr}`;
};

/** Formats a date in short format: "Thur Jan 22 '26 @ 5 PM EST" */
export const formatDateShort = (date, timezoneStr) => {
  // Extract all parts from the ISO string
  const match = date.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})([+-]\d{2}:\d{2})/);
  if (!match) return date;
  
  const [, year, month, day, hourStr, minute, second, offset] = match;
  const hour = parseInt(hourStr);
  
  // Convert 24h to 12h format
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  
  // Short month names
  const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = monthNamesShort[parseInt(month) - 1];
  
  // Short year format (last 2 digits)
  const yearShort = year.slice(-2);
  
  // Get day of week
  const dateObj = new Date(date);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  const dayName = dayNames[dateObj.getUTCDay()];
  
  // Map timezone offsets to abbreviations
  const tzMap = {
    '+08:00': 'SGT',  // Singapore Time
    '+01:00': 'BST',  // British Summer Time  
    '+05:30': 'IST',  // India Standard Time
    '-04:00': 'EDT',  // Eastern Daylight Time
    '-05:00': 'EST',  // Eastern Standard Time
  };
  
  const tzAbbr = tzMap[offset] || offset;
  
  // Wrap the time portion in a span to allow controlled line breaking
  return `${dayName} ${monthName} ${parseInt(day)} '${yearShort} <span class="no-break">@ ${hour12} ${ampm} ${tzAbbr}</span>`;
};

/**
 * Formats a session time from UTC to US/Eastern timezone.
 * Returns format: "9:00 AM EDT" or "9:00 AM — 9:30 AM EDT" for ranges.
 * @param {string} startTime - ISO datetime string (e.g., "2026-04-16T13:00:00Z")
 * @param {string} [endTime] - Optional end time for ranges
 * @returns {string} - Formatted time in US/Eastern
 */
export const formatSessionTime = (startTime, endTime) => {
  if (!startTime) return '';

  // Parse as UTC and convert to US/Eastern
  const start = dayjs(startTime).tz('America/New_York');
  if (!start.isValid()) return startTime;

  // Format: "9:00 AM EDT"
  const formatTime = (d) => d.format('h:mm A');
  const tzAbbr = start.format('z'); // EDT or EST

  if (endTime) {
    const end = dayjs(endTime).tz('America/New_York');
    if (end.isValid()) {
      return `${formatTime(start)} — ${formatTime(end)} ${tzAbbr}`;
    }
  }

  return `${formatTime(start)} ${tzAbbr}`;
};

/**
 * Calculates and formats the duration between two times.
 * Returns format: "15 min" or "1 hr 15 min"
 * @param {string} startTime - ISO datetime string
 * @param {string} endTime - ISO datetime string
 * @returns {string} - Formatted duration
 */
export const formatSessionDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return '';

  const start = dayjs(startTime);
  const end = dayjs(endTime);

  if (!start.isValid() || !end.isValid()) return '';

  const diffMinutes = end.diff(start, 'minute');

  if (diffMinutes < 60) {
    return `${diffMinutes} min`;
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  if (minutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${minutes} min`;
};
