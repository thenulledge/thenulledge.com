import {promises as fsPromises, existsSync} from 'node:fs';
import {execSync} from 'node:child_process';
import path from 'node:path';

/**
 * Convert SVG OG images to PNG format
 * - Skips in development (ENV=dev) unless FORCE_OG_REGEN=true
 * - Regenerates all PNGs if FORCE_OG_REGEN=true
 * - Otherwise only generates missing PNGs
 * @param {boolean} force - Force regeneration of all PNGs
 */
export const svgToJpeg = async (force = false) => {
  const isDev = process.env.ENV === 'dev';
  const forceRegen = process.env.FORCE_OG_REGEN === 'true' || force;

  // Skip in development mode unless forced
  if (isDev && !forceRegen) {
    console.log('⚠ Skipping OG image PNG generation in development mode (ENV=dev)');
    console.log('  Run with FORCE_OG_REGEN=true to regenerate anyway');
    return;
  }

  const socialPreviewImagesDir = 'dist/assets/og-images/';

  if (!existsSync(socialPreviewImagesDir)) {
    console.log('⚠ No OG images dir found at', socialPreviewImagesDir);
    return;
  }

  const files = await fsPromises.readdir(socialPreviewImagesDir);
  const svgFiles = files.filter(f => f.endsWith('.svg'));
  
  if (svgFiles.length === 0) {
    console.log('⚠ No SVG files found in OG images dir');
    return;
  }

  console.log(`🎨 Converting ${svgFiles.length} SVG OG images to PNG...`);
  if (forceRegen) {
    console.log('  Force regeneration enabled - overwriting existing PNGs');
  }

  let convertedCount = 0;
  let skippedCount = 0;
  
  for (const filename of svgFiles) {
    const outputFilename = filename.substring(0, filename.length - 4);
    const inputPath = path.join(socialPreviewImagesDir, filename);
    const outputPath = path.join(socialPreviewImagesDir, `${outputFilename}.png`);
    
    // Skip if PNG already exists (unless forcing regeneration)
    if (existsSync(outputPath) && !forceRegen) {
      skippedCount++;
      continue;
    }
    
    try {
      // Convert SVG to PNG using rsvg-convert (handles external images)
      execSync(`rsvg-convert "${inputPath}" --format=png --output="${outputPath}" --background-color=#1a1a1a`, {
        stdio: 'pipe'
      });
      
      console.log(`  ✓ ${outputFilename}.png`);
      convertedCount++;
    } catch (error) {
      console.error(`  ✗ Failed to convert ${filename}:`, error.message);
    }
  }
  
  if (convertedCount > 0) {
    console.log(`✓ Converted ${convertedCount} OG images to PNG`);
  }
  if (skippedCount > 0) {
    console.log(`  Skipped ${skippedCount} existing PNGs (use FORCE_OG_REGEN=true to regenerate)`);
  }
  if (convertedCount === 0 && skippedCount === 0) {
    console.log('⚠ No images were converted');
  }
};
