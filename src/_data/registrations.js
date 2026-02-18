import fs from 'fs/promises';
import path from 'path';

/**
 * Eleventy data file that returns registration counts previously fetched
 * by the `fetch:schedules` script. If missing, returns empty object.
 */
export default async function () {
  const file = path.join(process.cwd(), 'src', '_data', 'registrations.json');
  try {
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return {};
  }
}
