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
