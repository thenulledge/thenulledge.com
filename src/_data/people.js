/**
 * People/Speaker data
 * 
 * This file imports from people.json for easier programmatic updates.
 * To sync speakers from RingCentral schedules:
 *   npm run fetch:schedules  # Get schedule data
 *   npm run sync:people      # Sync people.json (dry run)
 *   npm run sync:people -- --apply --download-images  # Apply + download photos
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const peoplePath = join(__dirname, 'people.json');

let people;
try {
  const content = readFileSync(peoplePath, 'utf8');
  people = JSON.parse(content);
} catch (e) {
  console.error('Error loading people.json:', e.message);
  people = {};
}

export default people;
