/**
 * Convert an object of events to a sorted array by start date
 * @param {Object} eventsObj - Object with event data
 * @returns {Array} - Sorted array of event objects
 */
export function eventsToArray(eventsObj) {
  if (!eventsObj || typeof eventsObj !== 'object') {
    return [];
  }
  
  const eventsArray = Object.values(eventsObj);
  
  // Sort by start date inline
  return eventsArray.sort((a, b) => {
    const dateA = new Date(a.when?.start || 0);
    const dateB = new Date(b.when?.start || 0);
    return dateA - dateB;
  });
}
