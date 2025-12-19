/**
 * Sort events by their start date (when.start)
 * @param {Array} events - Array of event objects
 * @returns {Array} - Sorted array of events
 */
export function sortEventsByDate(events) {
  if (!Array.isArray(events)) {
    return events;
  }
  
  return events.sort((a, b) => {
    const dateA = new Date(a.when?.start || 0);
    const dateB = new Date(b.when?.start || 0);
    return dateA - dateB;
  });
}

/**
 * Convert an object of events to a sorted array
 * @param {Object} eventsObj - Object with event data
 * @returns {Array} - Sorted array of event objects
 */
export function eventsToArray(eventsObj) {
  if (!eventsObj || typeof eventsObj !== 'object') {
    return [];
  }
  
  const eventsArray = Object.values(eventsObj);
  return sortEventsByDate(eventsArray);
}
