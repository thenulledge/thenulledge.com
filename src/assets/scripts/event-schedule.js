// Fetch /api/schedule and render sessions into .sessions-grid
(function () {
  async function loadSchedule() {
    const root = document.getElementById('event-sessions');
    if (!root) return;

    const eventId = root.dataset.eventId;
    const slug = root.dataset.eventSlug;
    if (!slug && !eventId) return;

    const query = eventId ? `event=${encodeURIComponent(eventId)}` : `slug=${encodeURIComponent(slug)}`;
    try {
      const res = await fetch(`/api/schedule?${query}`);
      if (!res.ok) return;
      const json = await res.json();
      const sessions = json.sessions || [];
      if (!sessions.length) return; // keep SSR content

      const grid = root.querySelector('.sessions-grid');
      if (!grid) return;

      grid.innerHTML = sessions.map(s => sessionHtml(s)).join('');
    } catch (err) {
      // fail softly -- leave server-rendered content intact
      console.error('loadSchedule error', err);
    }
  }

  function sessionHtml(s) {
    const start = formatTime(s.time_start);
    const end = formatTime(s.time_end);
    const time = start || end ? `${start}${start && end ? ' — ' : ''}${end || ''}` : '';

    const speakers = (s.speakers || []).map(sp => {
      const img = sp.thumb_picture_url ? `<img src="${escape(sp.thumb_picture_url)}" alt="${escape(sp.name)}" width="40" height="40">` : '';
      return `<div class="session-speaker">${img}<div><strong>${escape(sp.name)}</strong>${sp.headline ? `<div class="muted">${escape(sp.headline)}</div>` : ''}</div></div>`;
    }).join('');

    return `
      <article class="card session-card" id="session-${escapeAttr(s.external_id)}">
        <h3 class="h5">${escape(s.name)}</h3>
        ${time ? `<div class="meta">${escape(time)}</div>` : ''}
        ${s.description ? `<div class="session-desc">${s.description}</div>` : ''}
        ${speakers ? `<div class="session-speakers">${speakers}</div>` : ''}
      </article>`;
  }

  function formatTime(iso) {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    } catch (e) {
      return iso;
    }
  }

  function escape(str = '') {
    return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function escapeAttr(s = '') { return escape(s).replace(/\s+/g, '-'); }

  document.addEventListener('DOMContentLoaded', loadSchedule);
})();
