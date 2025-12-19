import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import slugify from 'slugify';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function() {
  // Read all .js files in the current directory (pages/2025/)
  // Exclude this data file itself
  const files = fs.readdirSync(__dirname).filter(file => 
    file.endsWith('.js') && 
    file !== '2025.11tydata.js'
  );
  
  // Load each event file
  const eventsArray = [];
  for (const file of files) {
    const filePath = path.join(__dirname, file);
    const module = await import(filePath);
    const eventData = await module.default();
    eventsArray.push(eventData);
  }
  
  // Sort by date
  eventsArray.sort((a, b) => {
    return new Date(a.when.start) - new Date(b.when.start);
  });
  
  return {
    events2025Array: eventsArray,
    slugifyTitle: (title) => {
      return slugify(title, {
        replacement: '-',
        remove: /[#,&,+()$~%.'":*¿?¡!<>{}]/g,
        lower: true
      });
    }
  };
}

