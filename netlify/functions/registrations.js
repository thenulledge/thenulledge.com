/**
 * Netlify Function: Fetches registration counts from public RingCentral event pages.
 * No authentication required - scrapes the public event listing pages.
 *
 * Usage: GET /.netlify/functions/registrations?slug=nulledge-26
 *    or: GET /.netlify/functions/registrations (returns all events)
 */

// Map our event IDs to RingCentral event slugs
const EVENT_SLUGS = {
  '2026-nulledge': 'nulledge-26',
  '2026-nullstack-alpha': 'nullstack-alpha',
  '2026-nullstack-beta': 'nullstack-beta',
  '2026-nullhub': 'nullhub'
};

/**
 * Fetches registration count from a public RingCentral event page
 * @param {string} slug - RingCentral event slug
 * @returns {Promise<number|null>} - Registration count or null if not found
 */
async function fetchEventRegistrations(slug) {
  const url = `https://events.ringcentral.com/events/${slug}`;

  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }

  const html = await response.text();

  // Look for registrationsCount in the data-react-props JSON
  // Format can be either:
  //   registrationsCount&quot;:3 (unquoted number)
  //   registrationsCount&quot;:&quot;14&quot; (quoted string)
  const match = html.match(/registrationsCount&quot;:(?:&quot;)?(\d+)/);
  if (match) {
    return parseInt(match[1], 10);
  }

  return null;
}

/**
 * Formats registration count for display
 * @param {number} count - Raw registration count
 * @returns {string} - Formatted display string
 */
function formatCount(count) {
  if (count < 100) {
    return `${count}`;
  }
  const rounded = Math.floor(count / 10) * 10;
  return `${rounded}+`;
}

export default async (request) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  // If a specific slug is requested
  if (slug) {
    const count = await fetchEventRegistrations(slug);
    if (count === null) {
      return new Response(JSON.stringify({error: 'Event not found'}), {
        status: 404,
        headers: {'Content-Type': 'application/json'}
      });
    }
    return new Response(JSON.stringify({
      slug,
      count,
      display: formatCount(count)
    }), {
      headers: {'Content-Type': 'application/json'}
    });
  }

  // Fetch all events in parallel
  const results = {};
  const entries = Object.entries(EVENT_SLUGS);

  await Promise.all(
    entries.map(async ([eventId, eventSlug]) => {
      const count = await fetchEventRegistrations(eventSlug);
      if (count !== null) {
        results[eventId] = {
          slug: eventSlug,
          count,
          display: formatCount(count)
        };
      }
    })
  );

  return new Response(JSON.stringify(results), {
    headers: {'Content-Type': 'application/json'}
  });
};

export const config = {
  path: '/api/registrations'
};
