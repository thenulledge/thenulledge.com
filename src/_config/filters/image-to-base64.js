import fs from 'fs';
import path from 'path';

/**
 * Converts an image file to a base64 data URI
 * @param {string} imagePath - Relative path to image (e.g., '/assets/images/people/name.jpg')
 * @param {string} projectRoot - Project root directory (default: process.cwd())
 * @returns {string} - Base64 data URI or empty string if file not found
 */
export const imageToBase64 = (imagePath, projectRoot = process.cwd()) => {
  if (!imagePath) return '';

  try {
    // Convert relative path to absolute
    const fullPath = path.join(projectRoot, 'src', imagePath);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.warn(`Image not found: ${fullPath}`);
      return '';
    }

    // Read file and convert to base64
    const fileBuffer = fs.readFileSync(fullPath);
    const base64 = fileBuffer.toString('base64');

    // Determine MIME type from extension
    const ext = path.extname(fullPath).toLowerCase();
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml'
    };

    const mimeType = mimeTypes[ext] || 'image/jpeg';

    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error(`Error converting image to base64: ${imagePath}`, error);
    return '';
  }
};
