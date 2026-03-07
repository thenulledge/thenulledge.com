#!/usr/bin/env node
/**
 * Sync speaker data from RingCentral schedules to people.json
 * 
 * This script:
 * 1. Reads existing people.json
 * 2. Extracts unique speakers from schedules.json
 * 3. Adds missing speakers without overwriting existing entries
 * 4. Optionally downloads speaker photos from RingCentral
 * 5. Generates a report of additions/changes
 * 
 * Usage:
 *   npm run sync:people                    # Dry run (shows what would change)
 *   npm run sync:people -- --apply         # Apply changes to people.json
 *   npm run sync:people -- --apply --download-images  # Also download photos
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCHEDULES_PATH = path.join(process.cwd(), 'src', '_data', 'schedules.json');
const PEOPLE_JSON_PATH = path.join(process.cwd(), 'src', '_data', 'people.json');
const IMAGES_DIR = path.join(process.cwd(), 'src', 'assets', 'images', 'people');

const APPLY = process.argv.includes('--apply');
const DOWNLOAD_IMAGES = process.argv.includes('--download-images');

/**
 * Load existing people data from JSON
 */
async function loadExistingPeople() {
  try {
    const jsonContent = await fs.readFile(PEOPLE_JSON_PATH, 'utf8');
    const data = JSON.parse(jsonContent);
    console.log(`✓ Loaded ${Object.keys(data).length} existing people from people.json`);
    return data;
  } catch (e) {
    console.log('ℹ No existing people.json found, starting fresh');
    return {};
  }
}

/**
 * Download image from URL
 */
async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const buffer = await response.arrayBuffer();
    await fs.writeFile(filepath, Buffer.from(buffer));
    return true;
  } catch (err) {
    console.error(`  ✗ Failed to download: ${err.message}`);
    return false;
  }
}

/**
 * Extract unique speakers from schedules
 */
function extractSpeakersFromSchedules(schedules) {
  const speakers = new Map();

  for (const [eventId, eventData] of Object.entries(schedules)) {
    const sessions = eventData.sessions || [];
    
    for (const session of sessions) {
      const sessionSpeakers = session.speakers || [];
      
      for (const speaker of sessionSpeakers) {
        if (!speaker.name) continue;
        
        const name = speaker.name.trim();
        
        if (!speakers.has(name)) {
          speakers.set(name, {
            name,
            title: speaker.headline || '',
            linkedin: speaker.linkedin || '',
            website: speaker.website || '',
            twitter: speaker.twitter || '',
            picture_url: speaker.picture_url || '',
            thumb_picture_url: speaker.thumb_picture_url || '',
            sources: [eventId]
          });
        } else {
          const existing = speakers.get(name);
          if (!existing.sources.includes(eventId)) {
            existing.sources.push(eventId);
          }
          
          // Update fields if we have better data
          if (speaker.linkedin && !existing.linkedin) {
            existing.linkedin = speaker.linkedin;
          }
          if (speaker.headline && !existing.title) {
            existing.title = speaker.headline;
          }
          if (speaker.picture_url && !existing.picture_url) {
            existing.picture_url = speaker.picture_url;
          }
        }
      }
    }
  }

  return speakers;
}

/**
 * Create filename from speaker name
 */
function createFilename(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Merge RingCentral speakers with existing people data
 */
async function mergePeople(existingPeople, ringcentralSpeakers) {
  const merged = { ...existingPeople };
  const added = [];
  const updated = [];
  const imagesDownloaded = [];
  const imagesFailed = [];

  // Ensure images directory exists
  if (DOWNLOAD_IMAGES && APPLY) {
    await fs.mkdir(IMAGES_DIR, { recursive: true });
  }

  for (const [name, rcData] of ringcentralSpeakers) {
    const filename = createFilename(name);
    const imagePath = `/assets/images/people/${filename}.jpg`;
    const fullImagePath = path.join(IMAGES_DIR, `${filename}.jpg`);
    
    // Check if image already exists locally
    let hasLocalImage = false;
    try {
      await fs.access(fullImagePath);
      hasLocalImage = true;
    } catch (e) {
      // Image doesn't exist
    }

    // Download image if requested and available
    let imageDownloaded = false;
    if (DOWNLOAD_IMAGES && rcData.picture_url && !hasLocalImage) {
      console.log(`  📸 Downloading image for ${name}...`);
      const success = await downloadImage(rcData.picture_url, fullImagePath);
      if (success) {
        imagesDownloaded.push(name);
        imageDownloaded = true;
        console.log(`  ✓ Downloaded: ${filename}.jpg`);
      } else {
        imagesFailed.push(name);
      }
    }

    if (!merged[name]) {
      // New speaker
      merged[name] = {
        image: hasLocalImage || imageDownloaded ? imagePath : '',
        title: rcData.title || '',
        company: '',
        bio: '',
        linkedin: rcData.linkedin || '',
        website: rcData.website || '',
        twitter: rcData.twitter || '',
        _source: 'ringcentral',
        _events: rcData.sources
      };
      added.push(name);
    } else {
      // Existing speaker - check for updates
      const existing = merged[name];
      let hasUpdate = false;
      
      if (rcData.linkedin && !existing.linkedin) {
        existing.linkedin = rcData.linkedin;
        hasUpdate = true;
      }
      if (rcData.title && !existing.title) {
        existing.title = rcData.title;
        hasUpdate = true;
      }
      if ((hasLocalImage || imageDownloaded) && !existing.image) {
        existing.image = imagePath;
        hasUpdate = true;
      }
      
      // Track events
      if (!existing._events) existing._events = [];
      for (const eventId of rcData.sources) {
        if (!existing._events.includes(eventId)) {
          existing._events.push(eventId);
          hasUpdate = true;
        }
      }
      
      if (hasUpdate) {
        updated.push(name);
      }
    }
  }

  return { merged, added, updated, imagesDownloaded, imagesFailed };
}

/**
 * Save people data to JSON file
 */
async function savePeopleJson(people) {
  // Sort by name for consistency
  const sorted = Object.keys(people).sort().reduce((acc, key) => {
    acc[key] = people[key];
    return acc;
  }, {});

  await fs.writeFile(PEOPLE_JSON_PATH, JSON.stringify(sorted, null, 2), 'utf8');
  console.log(`\n✅ Saved to ${PEOPLE_JSON_PATH}`);
}

/**
 * Generate a report
 */
function generateReport(people, added, imagesDownloaded, imagesFailed) {
  const needsImage = [];
  const needsBio = [];
  const needsCompany = [];

  for (const [name, data] of Object.entries(people)) {
    if (!data.image) needsImage.push(name);
    if (!data.bio) needsBio.push(name);
    if (!data.company) needsCompany.push(name);
  }

  console.log('\n📋 Status Report');
  console.log('================\n');

  if (added.length > 0) {
    console.log(`🆕 New speakers added (${added.length}):`);
    added.forEach(name => {
      const data = people[name];
      console.log(`  + ${name}`);
      if (data.title) console.log(`    Title: ${data.title}`);
      if (data.linkedin) console.log(`    LinkedIn: ${data.linkedin}`);
      if (data.image) console.log(`    Image: ${data.image}`);
      console.log('');
    });
  }

  if (imagesDownloaded.length > 0) {
    console.log(`📸 Images downloaded (${imagesDownloaded.length}):`);
    imagesDownloaded.forEach(name => console.log(`  ✓ ${name}`));
    console.log('');
  }

  if (imagesFailed.length > 0) {
    console.log(`⚠️  Images failed (${imagesFailed.length}):`);
    imagesFailed.forEach(name => console.log(`  ✗ ${name}`));
    console.log('');
  }

  if (needsImage.length > 0) {
    console.log(`📷 Still need images (${needsImage.length}):`);
    needsImage.slice(0, 5).forEach(name => {
      const filename = createFilename(name);
      console.log(`  - src/assets/images/people/${filename}.jpg`);
    });
    if (needsImage.length > 5) {
      console.log(`  ... and ${needsImage.length - 5} more`);
    }
    console.log('');
  }

  if (needsCompany.length > 0) {
    console.log(`🏢 Need company info (${needsCompany.length} speakers)`);
    console.log('');
  }

  if (needsBio.length > 0) {
    console.log(`📝 Need bios (${needsBio.length} speakers)`);
    console.log('');
  }

  console.log('💡 Tips:');
  console.log('  - Add missing images to src/assets/images/people/');
  console.log('  - Edit people.json to add bios and company info');
  console.log('  - Run "npm start" to see changes locally');
}

async function main() {
  console.log('🔄 Syncing people from RingCentral schedules...\n');

  if (DOWNLOAD_IMAGES) {
    console.log('📸 Image download enabled\n');
  }

  // Load schedules
  let schedules;
  try {
    const schedulesContent = await fs.readFile(SCHEDULES_PATH, 'utf8');
    schedules = JSON.parse(schedulesContent);
    console.log(`✓ Loaded schedules from ${SCHEDULES_PATH}`);
  } catch (e) {
    console.error(`✗ Could not read schedules.json. Run 'npm run fetch:schedules' first.`);
    process.exit(1);
  }

  // Load existing people
  const existingPeople = await loadExistingPeople();

  // Extract speakers from schedules
  const ringcentralSpeakers = extractSpeakersFromSchedules(schedules);
  console.log(`✓ Found ${ringcentralSpeakers.size} unique speakers in schedules`);

  // Merge data
  const { merged, added, updated, imagesDownloaded, imagesFailed } = await mergePeople(
    existingPeople, 
    ringcentralSpeakers
  );

  // Report
  console.log(`\n📊 Summary:`);
  console.log(`  - Total speakers: ${Object.keys(merged).length}`);
  console.log(`  - New speakers: ${added.length}`);
  console.log(`  - Updated speakers: ${updated.length}`);
  if (DOWNLOAD_IMAGES) {
    console.log(`  - Images downloaded: ${imagesDownloaded.length}`);
    console.log(`  - Images failed: ${imagesFailed.length}`);
  }

  // Save or report
  if (APPLY) {
    await savePeopleJson(merged);
    console.log('\n✅ Changes applied!');
  } else {
    console.log('\n⏸️  Dry run - no changes made');
    console.log('   Run with --apply to save changes');
    if (!DOWNLOAD_IMAGES) {
      console.log('   Run with --apply --download-images to also fetch photos');
    }
  }

  // Generate report
  generateReport(merged, added, imagesDownloaded, imagesFailed);
}

main().catch(err => {
  console.error('❌ sync:people failed:', err);
  process.exit(1);
});
