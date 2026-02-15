/**
 * Netlify Function: Fetches and normalizes RingCentral schedule items for a given event.
 *
 * Usage: GET /.netlify/functions/schedule?event=2026-nullstack-alpha
 *    or: GET /.netlify/functions/schedule?slug=nullstack-alpha
 *
 * Returns: { slug, sessions: [ ...normalized items ] }
 */

// Map our event IDs to RingCentral event slugs (keep in sync with registrations.js)
const EVENT_SLUGS = {
  '2026-nulledge': 'nulledge-26',
  '2026-nullstack-alpha': 'nullstack-alpha',
  '2026-nullstack-beta': 'nullstack-beta',
  '2026-nullhub': 'nullhub'
};

// Simple in-memory cache to reduce upstream API calls between invocations
const CACHE_TTL_SECONDS = 300; // 5 minutes
const cache = new Map();

/**
 * Normalize a RingCentral schedule item into the site's session shape.
 * @param {Object} item - Raw item from RingCentral API
 * @returns {Object} Normalized session
 */
function normalizeItem(item) {
  const speakers = (item.speakers || []).map(s => ({
    name: s.name || s.full_name || null,
    headline: s.headline || s.title || null,
    picture_url: s.picture_url || s.pictureUrl || null,
    thumb_picture_url: s.thumb_picture_url || s.thumbPictureUrl || null,
    website: s.website || s.url || null,
    twitter: s.twitter || null,
    linkedin: s.linkedin || null
  }));

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
    speakers,
    tags: item.tags || []
  };
}

/**
 * Fetch the RingCentral schedule items for the given slug.
 * @param {string} slug - RingCentral schedule slug
 * @returns {Promise<Array>} - Array of normalized session objects
 */
async function fetchScheduleItems(slug) {
  const url = `https://events.ringcentral.com/api/v2/schedules/public/${slug}/items`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`RingCentral API responded ${res.status}: ${text}`);
  }

  const json = await res.json();
  // API may return { items: [...] } or an array directly
  const items = Array.isArray(json) ? json : (json.items || []);
  return items.map(normalizeItem);
}

/**
 * Netlify function handler
 * @param {Request} request
 * @returns {Promise<Response>}
 */
export default async function (request) {
  try {
    const url = new URL(request.url);
    const eventParam = url.searchParams.get('event');
    const slugParam = url.searchParams.get('slug');

    const key = eventParam || slugParam;
    const slug = (EVENT_SLUGS[key] || slugParam || null);

    if (!slug) {
      return new Response(JSON.stringify({ error: 'missing event or slug parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // serve from cache when available
    const now = Date.now();
    const cached = cache.get(slug);
    if (cached && cached.expiresAt > now) {
      return new Response(JSON.stringify({ slug, sessions: cached.payload }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=0, s-maxage=' + CACHE_TTL_SECONDS
        }
      });
    }

    // fetch and normalize
    const sessions = await fetchScheduleItems(slug);

    // cache
    cache.set(slug, { payload: sessions, expiresAt: now + CACHE_TTL_SECONDS * 1000 });

    return new Response(JSON.stringify({ slug, sessions }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=0, s-maxage=' + CACHE_TTL_SECONDS
      }
    });
  } catch (err) {
    // Return an error JSON (do not leak internals)
    return new Response(JSON.stringify({ error: 'failed to fetch schedule', message: String(err.message) }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export const config = {
  path: '/api/schedule'
};
