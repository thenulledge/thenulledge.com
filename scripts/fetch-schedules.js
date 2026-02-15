#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

// Map local event IDs to RingCentral slugs
const EVENT_SLUGS = {
  '2026-nulledge': 'nulledge-26',
  '2026-nullstack-alpha': 'nullstack-alpha',
  '2026-nullstack-beta': 'nullstack-beta',
  '2026-nullhub': 'nullhub'
};

const OUT_PATH = path.join(process.cwd(), 'src', '_data', 'schedules.json');

/**
 * Normalize a RingCentral schedule item into our site-friendly shape
 */
function normalizeItem(item) {
  return {
    external_id: item.external_id || item.id || item.externalId || null,
    name: item.name || item.title || null,
    description: item.description || item.body || '',
    time_start: item.time_start || item.start_time || item.start || null,
    time_end: item.time_end || item.end_time || item.end || null,
    event_part_type: item.event_part_type || item.part_type || item.type || null,
    event_type: item.event_type || null,
    room: item.room || null,
    capacity: item.capacity || null,
    attendance: item.attendance || null,
    stage: item.stage || null,
    session: item.session || null,
    sessions: item.sessions || [],
    booth: item.booth || null,
    booths: item.booths || [],
    speakers: (item.speakers || []).map(s => ({
      name: s.name || s.full_name || null,
      headline: s.headline || s.title || null,
      picture_url: s.picture_url || s.pictureUrl || null,
      thumb_picture_url: s.thumb_picture_url || s.thumbPictureUrl || null,
      website: s.website || s.url || null,
      twitter: s.twitter || null,
      linkedin: s.linkedin || null
    })),
    tags: item.tags || []
  };
}

async function fetchSchedule(slug) {
  const url = `https://events.ringcentral.com/api/v2/schedules/public/${slug}/items`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${slug}: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  const items = Array.isArray(json) ? json : (json.items || []);
  return items.map(normalizeItem);
}

async function main() {
  const results = {};
  for (const [eventId, slug] of Object.entries(EVENT_SLUGS)) {
    try {
      console.log(`Fetching schedule for ${eventId} -> ${slug}`);
      const sessions = await fetchSchedule(slug);
      results[eventId] = { slug, sessions };
      // be polite: short delay to avoid hammering remote
      await new Promise(r => setTimeout(r, 250));
    } catch (err) {
      console.error(`Error fetching ${slug}:`, err.message);
      results[eventId] = { slug, sessions: [] };
    }
  }

  // Ensure output dir exists
  const outDir = path.dirname(OUT_PATH);
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(OUT_PATH, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Wrote schedules to ${OUT_PATH}`);
}

main().catch(err => {
  console.error('fetch-schedules failed:', err);
  process.exit(1);
});
