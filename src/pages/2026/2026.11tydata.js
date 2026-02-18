import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function() {
  // Read all .js files in the current directory (pages/2026/)
  // Exclude event.njk and this data file itself
  const files = fs.readdirSync(__dirname).filter(file => 
    file.endsWith('.js') && 
    file !== '2026.11tydata.js'
  );
  
  // Load each event file
  const eventsArray = [];
  // load schedules & registrations data if present
  let schedules = {};
  let registrations = {};
  try {
    const s = await import('../../_data/schedules.js');
    schedules = await s.default();
  } catch (e) {
    schedules = {};
  }
  try {
    const r = await import('../../_data/registrations.js');
    registrations = await r.default();
  } catch (e) {
    registrations = {};
  }
  for (const file of files) {
    const filePath = path.join(__dirname, file);
    const module = await import(filePath);
    const eventData = await module.default();
    // merge schedule sessions if available (schedules keyed by event id)
    if (schedules && schedules[eventData.id] && schedules[eventData.id].sessions && schedules[eventData.id].sessions.length) {
      eventData.sessions = schedules[eventData.id].sessions;
    }
    // merge registration counts if available
    if (registrations && registrations[eventData.id]) {
      eventData._registrations = registrations[eventData.id];
    }
    eventsArray.push(eventData);
  }
  
  // Sort by date
  eventsArray.sort((a, b) => {
    return new Date(a.when.start) - new Date(b.when.start);
  });
  
  return {
    events2026Array: eventsArray
  };
}
