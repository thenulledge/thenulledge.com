import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parses a CSV line respecting quoted fields
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
}

/**
 * Parses a chat CSV file and returns an array of message objects
 */
export function parseChatFile(filename) {
  if (!filename) {
    return [];
  }

  const chatDir = path.join(__dirname, '../../_data/chats');
  const filePath = path.join(chatDir, filename);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`Chat file not found: ${filename}`);
    return [];
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      return [];
    }
    
    // Parse header
    const headers = parseCSVLine(lines[0]);
    const timeIndex = headers.indexOf('Time');
    const firstNameIndex = headers.indexOf('First Name');
    const lastNameIndex = headers.indexOf('Last Name');
    const textIndex = headers.indexOf('Text');
    const linkedinIndex = headers.indexOf('Linkedin');
    
    // Parse messages
    const messages = [];
    for (let i = 1; i < lines.length; i++) {
      const fields = parseCSVLine(lines[i]);
      
      const text = fields[textIndex] || '';
      
      // Only add messages with text
      if (text && text.trim()) {
        messages.push({
          time: fields[timeIndex] || '',
          firstName: fields[firstNameIndex] || '',
          lastName: fields[lastNameIndex] || '',
          text: text,
          linkedin: fields[linkedinIndex] || ''
        });
      }
    }
    
    return messages;
  } catch (error) {
    console.error(`Error parsing chat file ${filename}:`, error);
    return [];
  }
}

export default { parseChatFile };
