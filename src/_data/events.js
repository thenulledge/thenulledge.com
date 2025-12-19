import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load all event data from pages/{year}/*.js files
 * @returns {Object} Events organized by year
 */
export default async function() {
  const eventsData = {};
  const pagesDir = path.join(__dirname, '..', 'pages');
  
  // Find all year directories (2025, 2026, etc.)
  const yearDirs = fs.readdirSync(pagesDir)
    .filter(item => {
      const fullPath = path.join(pagesDir, item);
      return fs.statSync(fullPath).isDirectory() && /^\d{4}$/.test(item);
    });
  
  // Load events from each year directory
  for (const year of yearDirs) {
    const yearDir = path.join(pagesDir, year);
    const files = fs.readdirSync(yearDir).filter(file => 
      file.endsWith('.js') && 
      !file.includes('.11tydata.js')
    );
    
    eventsData[year] = {};
    
    for (const file of files) {
      const filePath = path.join(yearDir, file);
      const module = await import(filePath);
      const eventData = await module.default();
      
      // Use the event name as the key (e.g., "nullEDGE", "nullHUB")
      const eventKey = eventData.name.replace(/\s+/g, '');
      eventsData[year][eventKey] = eventData;
    }
  }
  
  return eventsData;
}
