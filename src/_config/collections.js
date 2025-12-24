import people from '../_data/people.js';

/** All relevant pages as a collection for sitemap.xml */
export const showInSitemap = collection => {
  return collection.getFilteredByGlob('./src/**/*.{md,njk}');
};

/** All 2025 sessions with video IDs for OG image generation */
export const sessions2025 = collection => {
  const allData = collection.getAll();
  
  // Find the page that has events2025Array
  const eventsPage = allData.find(item => item.data.events2025Array);
  if (!eventsPage) return [];
  
  // Get the nullEDGE event
  const nullEDGE = eventsPage.data.events2025Array.find(e => e.id === '2025-nulledge');
  if (!nullEDGE || !nullEDGE.sessions) return [];
  
  // Return only sessions with video IDs (exclude networking break)
  return nullEDGE.sessions.filter(session => session.id !== null);
};

/** All 2026 events for OG image generation */
export const events2026 = collection => {
  const allData = collection.getAll();
  
  // Find the page that has events2026Array
  const eventsPage = allData.find(item => item.data.events2026Array);
  if (!eventsPage) return [];
  
  return eventsPage.data.events2026Array || [];
};

/** All speakers as an array for pagination - only people who have presented */
export const speakers = async (collection) => {
  // Import events data dynamically
  const eventsModule = await import('../_data/events.js');
  const events = await eventsModule.default();
  
  // Collect all unique speaker names from all events
  const speakerNames = new Set();
  
  // Check 2025 events
  if (events['2025']) {
    Object.values(events['2025']).forEach(event => {
      if (event.sessions) {
        event.sessions.forEach(session => {
          if (session.speakers) {
            session.speakers.forEach(speaker => speakerNames.add(speaker));
          }
        });
      }
    });
  }
  
  // Check 2026 events (if they have sessions in the future)
  if (events['2026']) {
    Object.values(events['2026']).forEach(event => {
      if (event.sessions) {
        event.sessions.forEach(session => {
          if (session.speakers) {
            session.speakers.forEach(speaker => speakerNames.add(speaker));
          }
        });
      }
    });
  }
  
  // Filter people object to only include actual speakers (imported at top)
  const speakersArray = [];
  Object.entries(people).forEach(([name, data]) => {
    if (speakerNames.has(name)) {
      speakersArray.push([name, data]);
    }
  });
  
  return speakersArray;
};

