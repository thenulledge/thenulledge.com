import fs from 'fs/promises';
import path from 'path';

/**
 * Eleventy data file that returns the schedules.json content if present.
 * If the file is missing, returns an empty object.
 */
export default async function () {
  const file = path.join(process.cwd(), 'src', '_data', 'schedules.json');
  try {
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return {};
  }
}
