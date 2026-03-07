/**
 * Check if an event has already passed
 * @param {Object} event - Event object with when.end property
 * @returns {boolean} - True if event end date is in the past
 */
export function isPastEvent(event) {
  if (!event || !event.when || !event.when.end) {
    return false;
  }
  
  const endDate = new Date(event.when.end);
  const now = new Date();
  
  return endDate < now;
}
