// ═══════════════════════════════════════════════════════════════
// SHARED UTILITIES & COMMON FUNCTIONS
// ═══════════════════════════════════════════════════════════════

// ─── HTML Escape ───────────────────────────────────────────────
function escHtml(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ─── Wissen Helper builders ────────────────────────────────────
function section(title, icon, content) {
  return `<div class="wissen-section">
    <div class="wissen-section-title">${icon} ${title}</div>
    ${content}
  </div>`;
}

function defList(items) {
  return '<ul class="def-list">' +
    items.map(([term, desc]) => `<li><span class="def-term">${term}</span><span class="def-desc">${desc}</span></li>`).join('') +
    '</ul>';
}

function cards(items) {
  return '<div class="cards-grid">' +
    items.map(({label, title, body}) =>
      `<div class="info-card"><div class="card-label">${label}</div><div class="card-title">${title}</div><div class="card-body">${body}</div></div>`
    ).join('') + '</div>';
}

function callout(html) { return `<div class="callout">${html}</div>`; }
function merke(text)   { return `<div class="merke-box">${text}</div>`; }

// ─── Lernfortschritt (localStorage) ────────────────────────────
const STORAGE_KEY = 'hp_lernfortschritt_v1';

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return {}; }
}

function saveProgress(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function getTopicScore(id) {
  const p = loadProgress();
  return p[id] || { correct: 0, total: 0, lastPct: 0 };
}

function setTopicScore(id, correct, total) {
  const p = loadProgress();
  p[id] = { correct, total, lastPct: total ? Math.round(correct / total * 100) : 0 };
  saveProgress(p);
}

// ═══════════════════════════════════════════════════════════════
// PRÜFUNGSNOTIZEN MODULE - Eigene Notizen bearbeiten (Server-persistent)
// ═══════════════════════════════════════════════════════════════

let pruefungsNotizenServerAvailable = false;
let pruefungsNotizenCache = {};

async function checkPruefungsNotizenServer() {
  try {
    const response = await fetch('/api/pruefungsnotizen', { method: 'GET' });
    pruefungsNotizenServerAvailable = response.ok;
    return pruefungsNotizenServerAvailable;
  } catch (e) {
    pruefungsNotizenServerAvailable = false;
    return false;
  }
}

async function getPruefungsNotizen(topicId) {
  // Versuche vom Server zu laden
  try {
    const response = await fetch(`/api/pruefungsnotizen/${topicId}`);
    if (response.ok) {
      const notizen = await response.json();
      pruefungsNotizenCache[topicId] = notizen;
      pruefungsNotizenServerAvailable = true;
      return notizen;
    }
  } catch (e) {
    console.log('Server nicht erreichbar, verwende Cache/localStorage');
  }
  
  // Fallback: localStorage
  try {
    const data = JSON.parse(localStorage.getItem('hp_pruefungsnotizen_v1') || '{}');
    return data[topicId] || [];
  } catch { return []; }
}

async function savePruefungsNotizenToServer(topicId, notizen) {
  try {
    const response = await fetch(`/api/pruefungsnotizen/${topicId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notizen })
    });
    if (response.ok) {
      pruefungsNotizenCache[topicId] = notizen;
      return true;
    }
  } catch (e) {
    console.log('Server-Speicherung fehlgeschlagen, speichere in localStorage');
  }
  
  // Fallback: localStorage
  try {
    const data = JSON.parse(localStorage.getItem('hp_pruefungsnotizen_v1') || '{}');
    data[topicId] = notizen;
    localStorage.setItem('hp_pruefungsnotizen_v1', JSON.stringify(data));
  } catch {}
  return false;
}

async function addNotizToServer(topicId, notiz) {
  try {
    const response = await fetch(`/api/pruefungsnotizen/${topicId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notiz)
    });
    if (response.ok) {
      const result = await response.json();
      return result.notiz;
    }
  } catch (e) {
    console.log('Server-Speicherung fehlgeschlagen');
  }
  return null;
}

async function updateNotizOnServer(topicId, notizId, notiz) {
  try {
    const response = await fetch(`/api/pruefungsnotizen/${topicId}/${notizId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notiz)
    });
    if (response.ok) {
      const result = await response.json();
      return result.notiz;
    }
  } catch (e) {
    console.log('Server-Update fehlgeschlagen');
  }
  return null;
}

async function deleteNotizOnServer(topicId, notizId) {
  try {
    const response = await fetch(`/api/pruefungsnotizen/${topicId}/${notizId}`, {
      method: 'DELETE'
    });
    return response.ok;
  } catch (e) {
    console.log('Server-Löschung fehlgeschlagen');
    return false;
  }
}

function renderPruefungsNotizenEditor(topicId) {
  const containerId = `pruefungsnotizen-${topicId}`;
  return `
    <div class="pruefungsnotizen-section" id="${containerId}">
      <div class="pruefungsnotizen-header">
        <h3>✏️ Eigene Notizen</h3>
        <button class="pruefungsnotizen-add-btn" onclick="showAddNotizModal('${topicId}')">+ Notiz hinzufügen</button>
      </div>
      <div class="pruefungsnotizen-list" id="notizen-list-${topicId}">
        <p class="pruefungsnotizen-empty">Lade Notizen...</p>
      </div>
    </div>
  `;
}

async function renderNotizenList(topicId) {
  const container = document.getElementById(`notizen-list-${topicId}`);
  if (!container) return;
  
  container.innerHTML = '<p class="pruefungsnotizen-empty">Lade Notizen...</p>';
  
  const notizen = await getPruefungsNotizen(topicId);
  
  if (notizen.length === 0) {
    container.innerHTML = '<p class="pruefungsnotizen-empty">Noch keine eigenen Notizen. Füge deine persönlichen Lernnotizen hinzu!</p>';
    return;
  }
  
  container.innerHTML = notizen.map((notiz, idx) => `
    <div class="pruefungsnotiz-item" data-id="${notiz.id}" data-idx="${idx}">
      <div class="pruefungsnotiz-content">
        <div class="pruefungsnotiz-title">${escapeHtml(notiz.title)}</div>
        <div class="pruefungsnotiz-text">${escapeHtml(notiz.text).replace(/\n/g, '<br>')}</div>
        ${notiz.wichtig ? '<span class="pruefungsnotiz-wichtig">⭐ Sehr wichtig</span>' : ''}
      </div>
      <div class="pruefungsnotiz-actions">
        <button class="pruefungsnotiz-btn edit" onclick="editNotiz('${topicId}', ${idx}, ${notiz.id})" title="Bearbeiten">✏️</button>
        <button class="pruefungsnotiz-btn delete" onclick="deleteNotiz('${topicId}', ${idx}, ${notiz.id})" title="Löschen">🗑️</button>
      </div>
    </div>
  `).join('');
}

async function showAddNotizModal(topicId, editIdx = null, notizId = null) {
  const isEdit = editIdx !== null;
  let existing = { title: '', text: '', wichtig: false };
  
  if (isEdit) {
    const notizen = await getPruefungsNotizen(topicId);
    existing = notizen[editIdx] || existing;
  }
  
  const overlay = document.createElement('div');
  overlay.className = 'pruefungsnotiz-modal-overlay';
  overlay.id = 'notiz-modal';
  overlay.innerHTML = `
    <div class="pruefungsnotiz-modal">
      <div class="pruefungsnotiz-modal-header">
        <h3>${isEdit ? 'Notiz bearbeiten' : 'Neue Notiz hinzufügen'}</h3>
        <button class="pruefungsnotiz-modal-close" onclick="closeNotizModal()">×</button>
      </div>
      <div class="pruefungsnotiz-modal-body">
        <div class="pruefungsnotiz-form-group">
          <label>Titel / Thema:</label>
          <input type="text" id="notiz-title" value="${escapeHtml(existing.title)}" placeholder="z.B. Merkregel für Blutgruppen">
        </div>
        <div class="pruefungsnotiz-form-group">
          <label>Notiz:</label>
          <textarea id="notiz-text" rows="5" placeholder="Deine Lernnotiz...">${escapeHtml(existing.text)}</textarea>
        </div>
        <div class="pruefungsnotiz-form-group checkbox">
          <label>
            <input type="checkbox" id="notiz-wichtig" ${existing.wichtig ? 'checked' : ''}>
            <span>⭐ Als sehr wichtig markieren</span>
          </label>
        </div>
      </div>
      <div class="pruefungsnotiz-modal-footer">
        <button class="pruefungsnotiz-btn-cancel" onclick="closeNotizModal()">Abbrechen</button>
        <button class="pruefungsnotiz-btn-save" onclick="saveNotiz('${topicId}', ${editIdx}, ${notizId})">
          ${isEdit ? 'Speichern' : 'Hinzufügen'}
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.getElementById('notiz-title').focus();
}

function closeNotizModal() {
  const modal = document.getElementById('notiz-modal');
  if (modal) modal.remove();
}

async function saveNotiz(topicId, editIdx, notizId) {
  const title = document.getElementById('notiz-title').value.trim();
  const text = document.getElementById('notiz-text').value.trim();
  const wichtig = document.getElementById('notiz-wichtig').checked;
  
  if (!title || !text) {
    alert('Bitte Titel und Notiz ausfüllen.');
    return;
  }
  
  const notiz = { title, text, wichtig };
  
  if (editIdx !== null && notizId !== null) {
    // Update bestehende Notiz
    const result = await updateNotizOnServer(topicId, notizId, notiz);
    if (!result) {
      // Fallback: lokale Speicherung
      const notizen = await getPruefungsNotizen(topicId);
      notizen[editIdx] = { ...notizen[editIdx], ...notiz };
      await savePruefungsNotizenToServer(topicId, notizen);
    }
  } else {
    // Neue Notiz hinzufügen
    const result = await addNotizToServer(topicId, notiz);
    if (!result) {
      // Fallback: lokale Speicherung
      const notizen = await getPruefungsNotizen(topicId);
      notizen.push({ ...notiz, id: Date.now(), timestamp: Date.now() });
      await savePruefungsNotizenToServer(topicId, notizen);
    }
  }
  
  closeNotizModal();
  await renderNotizenList(topicId);
}

function editNotiz(topicId, idx, notizId) {
  showAddNotizModal(topicId, idx, notizId);
}

async function deleteNotiz(topicId, idx, notizId) {
  if (!confirm('Diese Notiz wirklich löschen?')) return;
  
  const deleted = await deleteNotizOnServer(topicId, notizId);
  if (!deleted) {
    // Fallback: lokale Speicherung
    const notizen = await getPruefungsNotizen(topicId);
    notizen.splice(idx, 1);
    await savePruefungsNotizenToServer(topicId, notizen);
  }
  
  await renderNotizenList(topicId);
}

// ═══════════════════════════════════════════════════════════════
// YOUTUBE VIDEOS MODULE
// ═══════════════════════════════════════════════════════════════

let videosServerAvailable = false;

async function checkVideosServerAvailability() {
  try {
    const response = await fetch('/api/videos', { method: 'GET' });
    videosServerAvailable = response.ok;
    return videosServerAvailable;
  } catch (e) {
    videosServerAvailable = false;
    return false;
  }
}

async function getVideosForTopic(topicId) {
  try {
    const response = await fetch(`/api/videos/${topicId}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    console.log('Videos-API nicht verfügbar');
  }
  try {
    const stored = localStorage.getItem('heilpraktiker_videos');
    if (stored) {
      const data = JSON.parse(stored);
      return data[topicId] || [];
    }
  } catch (e) {}
  return [];
}

async function addVideo(topicId, videoData) {
  try {
    const response = await fetch(`/api/videos/${topicId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(videoData)
    });
    
    if (response.ok) {
      const video = await response.json();
      console.log('✓ Video auf Server gespeichert');
      return video;
    }
    
    const error = await response.json();
    throw new Error(error.error || 'Fehler beim Speichern');
  } catch (e) {
    console.log('Speichere Video lokal:', e.message);
    
    let videoId = null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    for (const pattern of patterns) {
      const match = videoData.url.match(pattern);
      if (match) {
        videoId = match[1];
        break;
      }
    }
    
    if (!videoId) {
      throw new Error('Ungültige YouTube-URL');
    }
    
    const stored = localStorage.getItem('heilpraktiker_videos') || '{}';
    const data = JSON.parse(stored);
    if (!data[topicId]) data[topicId] = [];
    
    if (data[topicId].some(v => v.videoId === videoId)) {
      throw new Error('Dieses Video wurde bereits hinzugefügt');
    }
    
    const video = {
      id: Date.now(),
      videoId: videoId,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      title: videoData.title || 'YouTube Video',
      channel: videoData.channel || '',
      description: videoData.description || '',
      addedAt: new Date().toISOString()
    };
    
    data[topicId].push(video);
    localStorage.setItem('heilpraktiker_videos', JSON.stringify(data));
    return video;
  }
}

async function deleteVideo(topicId, videoId) {
  try {
    const response = await fetch(`/api/videos/${topicId}/${videoId}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      console.log('✓ Video vom Server gelöscht');
      return;
    }
  } catch (e) {
    console.log('Lösche Video lokal');
  }
  
  const stored = localStorage.getItem('heilpraktiker_videos') || '{}';
  const data = JSON.parse(stored);
  if (data[topicId]) {
    data[topicId] = data[topicId].filter(v => v.id !== videoId);
    localStorage.setItem('heilpraktiker_videos', JSON.stringify(data));
  }
}

function renderVideosSection(topicId) {
  const sectionId = `videos-${topicId}`;
  setTimeout(() => loadAndRenderVideos(topicId), 100);
  
  return `
    <div class="wissen-section videos-section" id="${sectionId}">
      <div class="wissen-section-title"><span class="wissen-section-icon">🎬</span>Lernvideos</div>
      <div class="videos-header">
        <p class="wissen-prose" style="margin-bottom:1rem;">Füge YouTube-Videos hinzu, die dir beim Lernen helfen.</p>
        <button class="videos-add-btn" onclick="toggleVideoForm('${topicId}')">
          <span class="plus-icon">+</span> Video hinzufügen
        </button>
      </div>
      
      <div class="video-add-form" id="video-form-${topicId}" style="display:none;">
        <input type="text" id="video-url-${topicId}" placeholder="YouTube-URL einfügen (z.B. https://youtube.com/watch?v=...)" class="video-input">
        <input type="text" id="video-title-${topicId}" placeholder="Titel (optional)" class="video-input">
        <input type="text" id="video-channel-${topicId}" placeholder="Kanal (optional)" class="video-input">
        <textarea id="video-desc-${topicId}" placeholder="Beschreibung (optional)" class="video-input video-textarea"></textarea>
        <div class="video-form-actions">
          <button class="video-save-btn" onclick="saveNewVideo('${topicId}')">Speichern</button>
          <button class="video-cancel-btn" onclick="toggleVideoForm('${topicId}')">Abbrechen</button>
        </div>
      </div>
      
      <div class="video-link-list" id="video-list-${topicId}">
        <div class="videos-loading">Lade Videos...</div>
      </div>
    </div>
  `;
}

function toggleVideoForm(topicId) {
  const form = document.getElementById(`video-form-${topicId}`);
  if (form) {
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
  }
}

async function loadAndRenderVideos(topicId) {
  const container = document.getElementById(`video-list-${topicId}`);
  if (!container) return;
  
  try {
    const videos = await getVideosForTopic(topicId);
    
    if (videos.length === 0) {
      container.innerHTML = `
        <div class="videos-empty">
          <div class="videos-empty-icon">🎬</div>
          <div>Noch keine Videos hinzugefügt</div>
          <div style="font-size:0.85rem;margin-top:0.3rem;">Klicke auf "+ Video hinzufügen" um YouTube-Videos zu verknüpfen</div>
        </div>
      `;
      return;
    }
    
    const videosHTML = videos.map(v => `
      <div class="video-link-item">
        <a href="${v.url}" target="_blank" class="video-link-content-wrapper">
          <div class="video-link-icon">▶️</div>
          <div class="video-link-content">
            ${v.channel ? `<div class="video-link-channel">${escapeHtml(v.channel)}</div>` : ''}
            <div class="video-link-title">${escapeHtml(v.title)}</div>
            ${v.description ? `<div class="video-link-desc">${escapeHtml(v.description)}</div>` : ''}
          </div>
          <div class="video-link-arrow">→</div>
        </a>
        <button class="video-delete-btn" onclick="confirmDeleteVideo('${topicId}', ${v.id})" title="Video entfernen">🗑️</button>
      </div>
    `).join('');
    
    container.innerHTML = videosHTML;
  } catch (err) {
    console.error('Fehler beim Laden der Videos:', err);
    container.innerHTML = `
      <div class="videos-empty">
        <div class="videos-empty-icon">⚠️</div>
        <div>Fehler beim Laden der Videos</div>
      </div>
    `;
  }
}

async function saveNewVideo(topicId) {
  const urlInput = document.getElementById(`video-url-${topicId}`);
  const titleInput = document.getElementById(`video-title-${topicId}`);
  const channelInput = document.getElementById(`video-channel-${topicId}`);
  const descInput = document.getElementById(`video-desc-${topicId}`);
  
  const url = urlInput.value.trim();
  if (!url) {
    alert('Bitte gib eine YouTube-URL ein.');
    return;
  }
  
  try {
    await addVideo(topicId, {
      url: url,
      title: titleInput.value.trim() || 'YouTube Video',
      channel: channelInput.value.trim(),
      description: descInput.value.trim()
    });
    
    urlInput.value = '';
    titleInput.value = '';
    channelInput.value = '';
    descInput.value = '';
    toggleVideoForm(topicId);
    
    await loadAndRenderVideos(topicId);
  } catch (err) {
    alert(err.message || 'Fehler beim Speichern des Videos.');
  }
}

async function confirmDeleteVideo(topicId, videoId) {
  if (!confirm('Möchtest du dieses Video wirklich entfernen?')) return;
  
  try {
    await deleteVideo(topicId, videoId);
    await loadAndRenderVideos(topicId);
  } catch (err) {
    console.error('Fehler beim Löschen:', err);
    alert('Fehler beim Entfernen des Videos.');
  }
}

// ═══════════════════════════════════════════════════════════════
// ANHÄNGE / DOKUMENTE MODULE
// ═══════════════════════════════════════════════════════════════

const API_BASE = '';
let serverAvailable = false;

async function checkServerAvailability() {
  try {
    const response = await fetch('/api/anhaenge', { method: 'GET' });
    serverAvailable = response.ok;
    if (serverAvailable) {
      console.log('✓ Backend-Server verfügbar - Daten werden auf Server gespeichert');
    }
  } catch (e) {
    serverAvailable = false;
    console.log('Backend-Server nicht verfügbar - Fallback auf localStorage');
  }
  return serverAvailable;
}

async function getAnhaengeForTopic(topicId) {
  if (!serverAvailable) {
    return getAnhaengeForTopicLocal(topicId);
  }
  
  try {
    const response = await fetch(`/api/anhaenge/${topicId}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    console.warn('API-Fehler, Fallback auf localStorage:', e);
  }
  return getAnhaengeForTopicLocal(topicId);
}

async function addAnhang(topicId, file) {
  if (!serverAvailable) {
    return addAnhangLocal(topicId, file);
  }
  
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`/api/anhaenge/${topicId}`, {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      const anhang = await response.json();
      console.log('✓ Anhang auf Server gespeichert');
      return anhang.id;
    }
  } catch (e) {
    console.warn('API-Fehler, Fallback auf localStorage:', e);
  }
  return addAnhangLocal(topicId, file);
}

async function deleteAnhang(id, topicId) {
  if (!serverAvailable) {
    return deleteAnhangLocal(id, topicId);
  }
  
  try {
    const response = await fetch(`/api/anhaenge/${topicId}/${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      console.log('✓ Anhang vom Server gelöscht');
      return;
    }
  } catch (e) {
    console.warn('API-Fehler, Fallback auf localStorage:', e);
  }
  return deleteAnhangLocal(id, topicId);
}

// ─── Lokale Fallback-Funktionen ────────────────────────────────
const LOCAL_ANHAENGE_KEY = 'heilpraktiker_anhaenge_local';

function getLocalAnhaenge() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_ANHAENGE_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

function saveLocalAnhaenge(data) {
  try {
    localStorage.setItem(LOCAL_ANHAENGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('localStorage voll:', e);
  }
}

function getAnhaengeForTopicLocal(topicId) {
  const data = getLocalAnhaenge();
  return data[topicId] || [];
}

async function addAnhangLocal(topicId, file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const data = getLocalAnhaenge();
      if (!data[topicId]) data[topicId] = [];
      
      const anhang = {
        id: Date.now(),
        name: file.name,
        type: file.type,
        size: file.size,
        data: reader.result,
        addedAt: new Date().toISOString()
      };
      
      data[topicId].push(anhang);
      saveLocalAnhaenge(data);
      resolve(anhang.id);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function deleteAnhangLocal(id, topicId) {
  const data = getLocalAnhaenge();
  if (data[topicId]) {
    data[topicId] = data[topicId].filter(a => a.id !== id);
    saveLocalAnhaenge(data);
  }
}

async function initAnhaengeDB() {
  await checkServerAvailability();
  return true;
}

setInterval(() => {
  if (!serverAvailable) checkServerAvailability();
}, 30000);

function getFileIcon(type) {
  if (type.startsWith('image/')) return '🖼️';
  if (type.includes('pdf')) return '📄';
  if (type.includes('word') || type.includes('document')) return '📝';
  if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
  if (type.includes('powerpoint') || type.includes('presentation')) return '📽️';
  if (type.includes('text')) return '📃';
  return '📁';
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function renderAnhaengeSection(topicId) {
  const sectionId = `anhaenge-${topicId}`;
  setTimeout(() => loadAndRenderAnhaenge(topicId), 100);
  
  return `
    <div class="anhaenge-section" id="${sectionId}">
      <div class="anhaenge-header">
        <div class="anhaenge-title">📎 Meine Anhänge & Notizen</div>
        <button class="anhaenge-add-btn" onclick="triggerAnhangUpload('${topicId}')">
          <span class="plus-icon">+</span> Datei hinzufügen
        </button>
        <input type="file" class="anhaenge-file-input" id="anhang-input-${topicId}" 
               multiple accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
               onchange="handleAnhangUpload('${topicId}', this.files)">
      </div>
      <div class="anhaenge-content" id="anhaenge-content-${topicId}">
        <div class="anhaenge-empty">
          <div class="anhaenge-empty-icon">📂</div>
          <div>Lade Anhänge...</div>
        </div>
      </div>
    </div>
  `;
}

async function loadAndRenderAnhaenge(topicId) {
  const container = document.getElementById(`anhaenge-content-${topicId}`);
  if (!container) return;
  
  try {
    const anhaenge = await getAnhaengeForTopic(topicId);
    
    if (anhaenge.length === 0) {
      container.innerHTML = `
        <div class="anhaenge-empty">
          <div class="anhaenge-empty-icon">📂</div>
          <div>Noch keine Anhänge vorhanden</div>
          <div style="font-size:0.85rem;margin-top:0.3rem;">Klicke auf "+ Datei hinzufügen" um Dokumente, Bilder oder Notizen anzuhängen</div>
        </div>
      `;
      return;
    }
    
    const cardsHTML = anhaenge.map(a => {
      const isImage = a.type.startsWith('image/');
      const isPDF = a.type === 'application/pdf';
      const isText = a.type.startsWith('text/') || a.name.endsWith('.txt') || a.name.endsWith('.md');
      const isOffice = a.type.includes('word') || a.type.includes('document') || 
                       a.type.includes('excel') || a.type.includes('spreadsheet') ||
                       a.type.includes('powerpoint') || a.type.includes('presentation');
      
      const fileUrl = a.path || a.data;
      
      const preview = isImage 
        ? `<img src="${fileUrl}" alt="${a.name}">`
        : `<div class="anhang-preview-icon">${getFileIcon(a.type)}</div>`;
      
      let viewAction;
      let viewLabel;
      if (isImage) {
        viewAction = `openAnhangLightbox('${fileUrl.replace(/'/g, "\\'")}', '${a.name.replace(/'/g, "\\'")}')`;
        viewLabel = '🔍 Ansehen';
      } else if (isPDF) {
        viewAction = `openPDFPreview('${fileUrl.replace(/'/g, "\\'")}', '${a.name.replace(/'/g, "\\'")}')`;
        viewLabel = '👁️ Vorschau';
      } else if (isText) {
        viewAction = `openTextPreview('${fileUrl.replace(/'/g, "\\'")}', '${a.name.replace(/'/g, "\\'")}')`;
        viewLabel = '👁️ Vorschau';
      } else if (isOffice) {
        viewAction = `openOfficePreview('${fileUrl.replace(/'/g, "\\'")}', '${a.name.replace(/'/g, "\\'")}', '${a.type}')`;
        viewLabel = '👁️ Vorschau';
      } else {
        viewAction = `downloadAnhang('${fileUrl}', '${a.name.replace(/'/g, "\\'")}', '${a.type}')`;
        viewLabel = '⬇ Öffnen';
      }
      
      return `
        <div class="anhang-card">
          <div class="anhang-preview">${preview}</div>
          <div class="anhang-info">
            <div class="anhang-name" title="${a.name}">${a.name}</div>
            <div class="anhang-meta">${formatFileSize(a.size)}</div>
            <div class="anhang-actions">
              <button class="anhang-btn anhang-btn-view" onclick="${viewAction}">
                ${viewLabel}
              </button>
              <button class="anhang-btn anhang-btn-delete" onclick="confirmDeleteAnhang(${a.id}, '${topicId}')">
                🗑️
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
    
    container.innerHTML = `<div class="anhaenge-grid">${cardsHTML}</div>`;
  } catch (err) {
    console.error('Fehler beim Laden der Anhänge:', err);
    container.innerHTML = `
      <div class="anhaenge-empty">
        <div class="anhaenge-empty-icon">⚠️</div>
        <div>Fehler beim Laden der Anhänge</div>
      </div>
    `;
  }
}

function triggerAnhangUpload(topicId) {
  document.getElementById(`anhang-input-${topicId}`).click();
}

async function handleAnhangUpload(topicId, files) {
  if (!files || files.length === 0) return;
  
  for (const file of files) {
    if (file.size > 50 * 1024 * 1024) {
      alert(`Die Datei "${file.name}" ist zu groß (max. 50 MB).`);
      continue;
    }
    try {
      await addAnhang(topicId, file);
    } catch (err) {
      console.error('Fehler beim Hinzufügen:', err);
      alert(`Fehler beim Hinzufügen von "${file.name}".`);
    }
  }
  
  document.getElementById(`anhang-input-${topicId}`).value = '';
  await loadAndRenderAnhaenge(topicId);
}

async function confirmDeleteAnhang(id, topicId) {
  if (!confirm('Möchtest du diesen Anhang wirklich löschen?')) return;
  
  try {
    await deleteAnhang(id, topicId);
    await loadAndRenderAnhaenge(topicId);
  } catch (err) {
    console.error('Fehler beim Löschen:', err);
    alert('Fehler beim Löschen des Anhangs.');
  }
}

function openAnhangLightbox(dataUrl, name) {
  const lightbox = document.createElement('div');
  lightbox.className = 'anhang-lightbox';
  lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.remove(); };
  lightbox.innerHTML = `
    <button class="anhang-lightbox-close" onclick="this.parentElement.remove()">×</button>
    <img src="${dataUrl}" alt="${name}">
  `;
  document.body.appendChild(lightbox);
}

function downloadAnhang(dataUrl, name, type) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function openPDFPreview(dataUrl, name) {
  const modal = document.createElement('div');
  modal.className = 'doc-preview-modal';
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  modal.innerHTML = `
    <div class="doc-preview-header">
      <div class="doc-preview-title">📄 ${name}</div>
      <div class="doc-preview-actions">
        <button class="doc-preview-btn doc-preview-btn-download" onclick="downloadAnhang('${dataUrl.replace(/'/g, "\\'")}', '${name.replace(/'/g, "\\'")}', 'application/pdf')">⬇ Herunterladen</button>
        <button class="doc-preview-btn doc-preview-btn-close" onclick="this.closest('.doc-preview-modal').remove()">× Schließen</button>
      </div>
    </div>
    <div class="doc-preview-content">
      <iframe src="${dataUrl}" type="application/pdf"></iframe>
    </div>
  `;
  document.body.appendChild(modal);
}

function openTextPreview(dataUrl, name) {
  const base64Content = dataUrl.split(',')[1];
  let textContent;
  try {
    textContent = decodeURIComponent(escape(atob(base64Content)));
  } catch (e) {
    textContent = atob(base64Content);
  }
  
  const modal = document.createElement('div');
  modal.className = 'doc-preview-modal';
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  modal.innerHTML = `
    <div class="doc-preview-header">
      <div class="doc-preview-title">📃 ${name}</div>
      <div class="doc-preview-actions">
        <button class="doc-preview-btn doc-preview-btn-download" onclick="downloadAnhang('${dataUrl.replace(/'/g, "\\'")}', '${name.replace(/'/g, "\\'")}', 'text/plain')">⬇ Herunterladen</button>
        <button class="doc-preview-btn doc-preview-btn-close" onclick="this.closest('.doc-preview-modal').remove()">× Schließen</button>
      </div>
    </div>
    <div class="doc-preview-content">
      <div class="doc-preview-text"></div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector('.doc-preview-text').textContent = textContent;
}

function openOfficePreview(dataUrl, name, type) {
  const modal = document.createElement('div');
  modal.className = 'doc-preview-modal';
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  
  let icon = '📝';
  if (type.includes('excel') || type.includes('spreadsheet')) icon = '📊';
  if (type.includes('powerpoint') || type.includes('presentation')) icon = '📽️';
  
  modal.innerHTML = `
    <div class="doc-preview-header">
      <div class="doc-preview-title">${icon} ${name}</div>
      <div class="doc-preview-actions">
        <button class="doc-preview-btn doc-preview-btn-download" onclick="downloadAnhang('${dataUrl.replace(/'/g, "\\'")}', '${name.replace(/'/g, "\\'")}', '${type}')">⬇ Herunterladen</button>
        <button class="doc-preview-btn doc-preview-btn-close" onclick="this.closest('.doc-preview-modal').remove()">× Schließen</button>
      </div>
    </div>
    <div class="doc-preview-content">
      <div class="doc-preview-unsupported">
        <div class="doc-preview-unsupported-icon">${icon}</div>
        <h3>Office-Dokument</h3>
        <p>Office-Dateien können nicht direkt im Browser angezeigt werden.<br>Lade die Datei herunter, um sie mit Microsoft Office oder einem kompatiblen Programm zu öffnen.</p>
        <button class="doc-preview-btn doc-preview-btn-download" style="padding: 0.8rem 2rem; font-size: 1rem;" onclick="downloadAnhang('${dataUrl.replace(/'/g, "\\'")}', '${name.replace(/'/g, "\\'")}', '${type}')">⬇ Jetzt herunterladen</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// Init beim Laden
initAnhaengeDB().catch(err => console.warn('Anhänge-API nicht verfügbar:', err));

// ═══════════════════════════════════════════════════════════════
// WISSEN-INHALTE API (Wichtig für Prüfung aus JSON laden)
// ═══════════════════════════════════════════════════════════════

let wissenInhalteCache = null;

async function loadWissenInhalte() {
  if (wissenInhalteCache) return wissenInhalteCache;
  
  try {
    const response = await fetch('/api/wissen');
    if (response.ok) {
      wissenInhalteCache = await response.json();
      return wissenInhalteCache;
    }
  } catch (e) {
    console.log('Wissen-API nicht verfügbar');
  }
  return { topics: {} };
}

async function getWissenTopic(topicId) {
  const data = await loadWissenInhalte();
  return data.topics[topicId] || null;
}

async function getPruefungswichtigSections(topicId) {
  const topic = await getWissenTopic(topicId);
  return topic?.pruefungswichtig?.sections || [];
}

// Render "Wichtig für Prüfung" aus JSON
async function renderPruefungswichtigFromJSON(topicId) {
  const sections = await getPruefungswichtigSections(topicId);
  
  if (sections.length === 0) {
    return `<p style="color:#666; text-align:center; padding:1rem;">Keine Prüfungszusammenfassung verfügbar.</p>`;
  }
  
  return sections.map(sec => {
    const borderWidth = sec.title.includes('⭐⭐⭐') ? '3px' : '2px';
    
    if (sec.isTable && sec.tableRows) {
      // Tabellen-Sektion
      return `
        <div style="background: linear-gradient(135deg, ${hexToLightGradient(sec.color)}); border: ${borderWidth} solid ${sec.color}; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
          <h3 style="margin: 0 0 1rem 0; color: ${sec.color}; font-family: 'Playfair Display', serif;">${sec.icon || ''} ${sec.title}</h3>
          <div style="overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse; font-size:0.86rem; background: white;">
              <thead>
                <tr style="background:var(--ink); color:var(--parchment);">
                  ${sec.tableHeaders.map(h => `<th style="padding:0.5rem 0.8rem; text-align:left;">${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${sec.tableRows.map((row, i) => `
                  <tr style="background:${i % 2 === 0 ? '#fff' : '#f9f6f0'};">
                    ${row.map((cell, ci) => `<td style="padding:0.5rem 0.8rem; ${ci === 0 ? 'font-weight:700;' : ''}">${cell}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
    
    // Standard-Sektion mit Aufzählung
    return `
      <div style="background: linear-gradient(135deg, ${hexToLightGradient(sec.color)}); border: ${borderWidth} solid ${sec.color}; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <h3 style="margin: 0 0 1rem 0; color: ${sec.color}; font-family: 'Playfair Display', serif;">${sec.icon || ''} ${sec.title}</h3>
        <ul style="margin: 0; padding-left: 1.2rem; line-height: 1.8;">
          ${sec.content.map(item => `<li>${formatMarkdown(item)}</li>`).join('')}
        </ul>
      </div>
    `;
  }).join('');
}

// Hilfsfunktion: Hex-Farbe zu hellem Gradient
function hexToLightGradient(hex) {
  // Fallback für ungültige Farben
  if (!hex || !hex.startsWith('#')) return '#fff8e7 0%, #fff0d4 100%';
  
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  // Sehr helle Version erstellen
  const lightR = Math.min(255, r + (255 - r) * 0.85);
  const lightG = Math.min(255, g + (255 - g) * 0.85);
  const lightB = Math.min(255, b + (255 - b) * 0.85);
  
  const lighterR = Math.min(255, r + (255 - r) * 0.75);
  const lighterG = Math.min(255, g + (255 - g) * 0.75);
  const lighterB = Math.min(255, b + (255 - b) * 0.75);
  
  return `rgb(${Math.round(lightR)},${Math.round(lightG)},${Math.round(lightB)}) 0%, rgb(${Math.round(lighterR)},${Math.round(lighterG)},${Math.round(lighterB)}) 100%`;
}

// Hilfsfunktion: Markdown-ähnliche Formatierung
function formatMarkdown(text) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

// Sektion zum Bearbeiten öffnen (Admin-Modal)
async function editPruefungswichtigSection(topicId, sectionIndex) {
  const sections = await getPruefungswichtigSections(topicId);
  const sec = sections[sectionIndex];
  if (!sec) return;
  
  const overlay = document.createElement('div');
  overlay.className = 'pruefungsnotiz-modal-overlay';
  overlay.id = 'edit-section-modal';
  overlay.innerHTML = `
    <div class="pruefungsnotiz-modal" style="max-width: 700px;">
      <div class="pruefungsnotiz-modal-header">
        <h3>Sektion bearbeiten</h3>
        <button class="pruefungsnotiz-modal-close" onclick="this.closest('.pruefungsnotiz-modal-overlay').remove()">×</button>
      </div>
      <div class="pruefungsnotiz-modal-body">
        <div class="pruefungsnotiz-form-group">
          <label>Titel:</label>
          <input type="text" id="edit-section-title" value="${escapeHtml(sec.title)}">
        </div>
        <div class="pruefungsnotiz-form-group">
          <label>Icon:</label>
          <input type="text" id="edit-section-icon" value="${sec.icon || ''}" style="width: 60px;">
        </div>
        <div class="pruefungsnotiz-form-group">
          <label>Farbe:</label>
          <input type="color" id="edit-section-color" value="${sec.color || '#b8860b'}">
        </div>
        <div class="pruefungsnotiz-form-group">
          <label>Inhalte (einer pro Zeile, **fett**, *kursiv*):</label>
          <textarea id="edit-section-content" rows="10" style="font-family: monospace;">${sec.content ? sec.content.join('\n') : ''}</textarea>
        </div>
      </div>
      <div class="pruefungsnotiz-modal-footer">
        <button class="pruefungsnotiz-btn-cancel" onclick="this.closest('.pruefungsnotiz-modal-overlay').remove()">Abbrechen</button>
        <button class="pruefungsnotiz-btn-save" onclick="savePruefungswichtigSection('${topicId}', ${sectionIndex})">Speichern</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

async function savePruefungswichtigSection(topicId, sectionIndex) {
  const title = document.getElementById('edit-section-title').value.trim();
  const icon = document.getElementById('edit-section-icon').value.trim();
  const color = document.getElementById('edit-section-color').value;
  const contentText = document.getElementById('edit-section-content').value;
  const content = contentText.split('\n').filter(line => line.trim());
  
  const sections = await getPruefungswichtigSections(topicId);
  const sec = sections[sectionIndex];
  
  try {
    const response = await fetch(`/api/wissen/${topicId}/pruefungswichtig/section/${sec.id || sectionIndex}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, icon, color, content })
    });
    
    if (response.ok) {
      // Cache invalidieren
      wissenInhalteCache = null;
      document.getElementById('edit-section-modal')?.remove();
      // Seite neu laden um Änderungen zu sehen
      location.reload();
    } else {
      alert('Fehler beim Speichern');
    }
  } catch (e) {
    alert('Server nicht erreichbar');
  }
}

// Neue Sektion hinzufügen
async function addPruefungswichtigSection(topicId) {
  const overlay = document.createElement('div');
  overlay.className = 'pruefungsnotiz-modal-overlay';
  overlay.id = 'add-section-modal';
  overlay.innerHTML = `
    <div class="pruefungsnotiz-modal" style="max-width: 700px;">
      <div class="pruefungsnotiz-modal-header">
        <h3>Neue Prüfungs-Sektion hinzufügen</h3>
        <button class="pruefungsnotiz-modal-close" onclick="this.closest('.pruefungsnotiz-modal-overlay').remove()">×</button>
      </div>
      <div class="pruefungsnotiz-modal-body">
        <div class="pruefungsnotiz-form-group">
          <label>Titel:</label>
          <input type="text" id="new-section-title" placeholder="z.B. Merkregeln für...">
        </div>
        <div class="pruefungsnotiz-form-group">
          <label>Icon:</label>
          <input type="text" id="new-section-icon" value="📝" style="width: 60px;">
        </div>
        <div class="pruefungsnotiz-form-group">
          <label>Farbe:</label>
          <input type="color" id="new-section-color" value="#b8860b">
        </div>
        <div class="pruefungsnotiz-form-group">
          <label>Inhalte (einer pro Zeile, **fett**, *kursiv*):</label>
          <textarea id="new-section-content" rows="10" style="font-family: monospace;" placeholder="**Wichtiger Punkt** – Erklärung&#10;Weiterer Punkt&#10;..."></textarea>
        </div>
      </div>
      <div class="pruefungsnotiz-modal-footer">
        <button class="pruefungsnotiz-btn-cancel" onclick="this.closest('.pruefungsnotiz-modal-overlay').remove()">Abbrechen</button>
        <button class="pruefungsnotiz-btn-save" onclick="saveNewPruefungswichtigSection('${topicId}')">Hinzufügen</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

async function saveNewPruefungswichtigSection(topicId) {
  const title = document.getElementById('new-section-title').value.trim();
  const icon = document.getElementById('new-section-icon').value.trim();
  const color = document.getElementById('new-section-color').value;
  const contentText = document.getElementById('new-section-content').value;
  const content = contentText.split('\n').filter(line => line.trim());
  
  if (!title || content.length === 0) {
    alert('Bitte Titel und mindestens einen Inhaltspunkt eingeben.');
    return;
  }
  
  try {
    const response = await fetch(`/api/wissen/${topicId}/pruefungswichtig/section`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, icon, color, content })
    });
    
    if (response.ok) {
      wissenInhalteCache = null;
      document.getElementById('add-section-modal')?.remove();
      location.reload();
    } else {
      alert('Fehler beim Speichern');
    }
  } catch (e) {
    alert('Server nicht erreichbar');
  }
}

// Sektion löschen
async function deletePruefungswichtigSection(topicId, sectionId) {
  if (!confirm('Diese Prüfungs-Sektion wirklich löschen?')) return;
  
  try {
    const response = await fetch(`/api/wissen/${topicId}/pruefungswichtig/section/${sectionId}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      wissenInhalteCache = null;
      location.reload();
    }
  } catch (e) {
    alert('Server nicht erreichbar');
  }
}

// ═══════════════════════════════════════════════════════════════
// KARTEIKARTEN SYSTEM
// ═══════════════════════════════════════════════════════════════

let karteikarten = {
  currentDeck: null,
  currentCardIndex: 0,
  cards: [],
  allCards: [],
  isFlipped: false,
  progress: {},
  shuffled: false,
  showOnlyUnlearned: false
};

// Karteikarten-Deck laden
async function loadKarteikartenDeck(deckId) {
  try {
    const [deckResponse, progressResponse] = await Promise.all([
      fetch(`/api/karteikarten/${deckId}`),
      fetch(`/api/karteikarten/${deckId}/progress`)
    ]);
    
    if (!deckResponse.ok) {
      throw new Error('Deck nicht gefunden');
    }
    
    const deck = await deckResponse.json();
    const progress = await progressResponse.json();
    
    karteikarten.currentDeck = deck;
    karteikarten.allCards = [...deck.cards];
    karteikarten.cards = [...deck.cards];
    karteikarten.progress = progress;
    karteikarten.currentCardIndex = 0;
    karteikarten.isFlipped = false;
    karteikarten.showOnlyUnlearned = false;
    
    return deck;
  } catch (e) {
    console.error('Fehler beim Laden der Karteikarten:', e);
    return null;
  }
}

// Karteikarten-Modal öffnen
async function openKarteikarten(deckId) {
  const deck = await loadKarteikartenDeck(deckId);
  if (!deck) {
    alert('Karteikarten konnten nicht geladen werden.');
    return;
  }
  
  // Modal erstellen
  const modal = document.createElement('div');
  modal.id = 'karteikarten-modal';
  modal.className = 'karteikarten-overlay';
  modal.innerHTML = `
    <div class="karteikarten-container">
      <div class="karteikarten-header">
        <div class="karteikarten-header-left">
          <span class="karteikarten-deck-icon">${deck.icon}</span>
          <h3>${deck.name}</h3>
        </div>
        <div class="karteikarten-header-right">
          <span class="karteikarten-counter">
            <span id="kk-current">1</span> / <span id="kk-total">${deck.cards.length}</span>
          </span>
          <button class="karteikarten-close" onclick="closeKarteikarten()">✕</button>
        </div>
      </div>
      
      <div class="karteikarten-toolbar">
        <button class="kk-tool-btn" onclick="shuffleKarteikarten()" title="Mischen">
          🔀 Mischen
        </button>
        <button class="kk-tool-btn" id="kk-filter-btn" onclick="toggleUnlearnedFilter()" title="Nur ungelernte anzeigen">
          📚 Alle
        </button>
        <button class="kk-tool-btn" onclick="resetKarteikartenProgress('${deckId}')" title="Fortschritt zurücksetzen">
          🔄 Reset
        </button>
        <div class="kk-progress-display">
          <span id="kk-progress-text">0%</span> gelernt
        </div>
      </div>
      
      <div class="karteikarten-body">
        <button class="kk-nav-btn kk-prev" onclick="prevKarteikarte()" id="kk-prev-btn">
          ◀
        </button>
        
        <div class="karteikarten-card-wrapper" onclick="flipKarteikarte()">
          <div class="karteikarten-card" id="kk-card">
            <div class="kk-card-front" id="kk-front">
              <div class="kk-category" id="kk-category"></div>
              <div class="kk-content" id="kk-front-content"></div>
              <div class="kk-flip-hint">Klicken zum Umdrehen</div>
            </div>
            <div class="kk-card-back" id="kk-back">
              <div class="kk-content" id="kk-back-content"></div>
            </div>
          </div>
        </div>
        
        <button class="kk-nav-btn kk-next" onclick="nextKarteikarte()" id="kk-next-btn">
          ▶
        </button>
      </div>
      
      <div class="karteikarten-rating" id="kk-rating" style="display: none;">
        <span class="kk-rating-label">Wie gut wusstest du es?</span>
        <div class="kk-rating-buttons">
          <button class="kk-rate-btn kk-rate-wrong" onclick="rateKarteikarte(false)">
            ❌ Nicht gewusst
          </button>
          <button class="kk-rate-btn kk-rate-correct" onclick="rateKarteikarte(true)">
            ✅ Gewusst
          </button>
        </div>
      </div>
      
      <div class="karteikarten-footer">
        <div class="kk-difficulty" id="kk-difficulty"></div>
        <div class="kk-tags" id="kk-tags"></div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Erste Karte anzeigen
  showKarteikarte(0);
  updateKarteikartenProgress();
  
  // Tastatur-Navigation
  document.addEventListener('keydown', handleKarteikartenKeydown);
}

// Modal schließen
function closeKarteikarten() {
  const modal = document.getElementById('karteikarten-modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKarteikartenKeydown);
  }
}

// Tastatur-Handler
function handleKarteikartenKeydown(e) {
  if (e.key === 'Escape') {
    closeKarteikarten();
  } else if (e.key === 'ArrowLeft') {
    prevKarteikarte();
  } else if (e.key === 'ArrowRight') {
    nextKarteikarte();
  } else if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    flipKarteikarte();
  } else if (e.key === '1' || e.key === 'n') {
    rateKarteikarte(false);
  } else if (e.key === '2' || e.key === 'j') {
    rateKarteikarte(true);
  }
}

// Prüfen ob Karte als gelernt gilt
function isCardLearned(cardId) {
  const progress = karteikarten.progress[cardId];
  return progress && progress.correct >= 1;
}

// Karte anzeigen
function showKarteikarte(index) {
  if (!karteikarten.cards || karteikarten.cards.length === 0) {
    // Keine Karten vorhanden (z.B. alle gefiltert)
    const cardEl = document.getElementById('kk-card');
    if (cardEl) {
      document.getElementById('kk-front-content').innerHTML = '<p style="text-align:center; color:#666;">Alle Karten gelernt! \ud83c\udf89<br><br>Klicke "Alle" um alle Karten zu sehen.</p>';
      document.getElementById('kk-category').textContent = '';
    }
    document.getElementById('kk-current').textContent = '0';
    document.getElementById('kk-total').textContent = '0';
    return;
  }
  
  if (index < 0) index = karteikarten.cards.length - 1;
  if (index >= karteikarten.cards.length) index = 0;
  
  karteikarten.currentCardIndex = index;
  karteikarten.isFlipped = false;
  
  const card = karteikarten.cards[index];
  const cardEl = document.getElementById('kk-card');
  const learned = isCardLearned(card.id);
  
  // Karte zurückdrehen
  cardEl.classList.remove('flipped');
  cardEl.classList.toggle('kk-learned', learned);
  
  // Kategorie mit Gelernt-Badge
  const categoryEl = document.getElementById('kk-category');
  if (learned) {
    categoryEl.innerHTML = `${card.category || ''} <span class="kk-learned-badge">✓ Gelernt</span>`;
  } else {
    categoryEl.textContent = card.category || '';
  }
  
  document.getElementById('kk-front-content').innerHTML = formatKarteikartenText(card.front);
  document.getElementById('kk-back-content').innerHTML = formatKarteikartenText(card.back);
  
  // Counter aktualisieren
  document.getElementById('kk-current').textContent = index + 1;
  document.getElementById('kk-total').textContent = karteikarten.cards.length;
  
  // Schwierigkeit
  const diffEl = document.getElementById('kk-difficulty');
  const stars = '⭐'.repeat(card.difficulty || 1);
  diffEl.innerHTML = `Schwierigkeit: ${stars}`;
  
  // Tags
  const tagsEl = document.getElementById('kk-tags');
  if (card.tags && card.tags.length > 0) {
    tagsEl.innerHTML = card.tags.map(t => `<span class="kk-tag">${t}</span>`).join('');
  } else {
    tagsEl.innerHTML = '';
  }
  
  // Rating ausblenden
  document.getElementById('kk-rating').style.display = 'none';
  
  // Mastered-Status basierend auf altem Kriterium
  const progress = karteikarten.progress[card.id];
  if (progress && progress.attempts >= 3 && (progress.correct / progress.attempts) >= 0.8) {
    cardEl.classList.add('kk-mastered');
  } else {
    cardEl.classList.remove('kk-mastered');
  }
}

// Text formatieren (Markdown-ähnlich)
function formatKarteikartenText(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/↑/g, '<span class="kk-arrow-up">↑</span>')
    .replace(/↓/g, '<span class="kk-arrow-down">↓</span>')
    .replace(/→/g, '<span class="kk-arrow">→</span>')
    .replace(/💡/g, '<span class="kk-icon-tip">💡</span>')
    .replace(/⚠️/g, '<span class="kk-icon-warn">⚠️</span>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/\|(.+)\|/g, (match, content) => {
      // Einfache Tabellen-Unterstützung
      const rows = content.split('|').map(cell => `<td>${cell.trim()}</td>`).join('');
      return `<tr>${rows}</tr>`;
    });
}

// Karte umdrehen
function flipKarteikarte() {
  const cardEl = document.getElementById('kk-card');
  karteikarten.isFlipped = !karteikarten.isFlipped;
  cardEl.classList.toggle('flipped', karteikarten.isFlipped);
  
  // Rating anzeigen wenn umgedreht
  if (karteikarten.isFlipped) {
    document.getElementById('kk-rating').style.display = 'flex';
  }
}

// Nächste Karte
function nextKarteikarte() {
  showKarteikarte(karteikarten.currentCardIndex + 1);
}

// Vorherige Karte
function prevKarteikarte() {
  showKarteikarte(karteikarten.currentCardIndex - 1);
}

// Karteikarten mischen
function shuffleKarteikarten() {
  for (let i = karteikarten.cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [karteikarten.cards[i], karteikarten.cards[j]] = [karteikarten.cards[j], karteikarten.cards[i]];
  }
  karteikarten.shuffled = true;
  showKarteikarte(0);
}

// Karte bewerten
async function rateKarteikarte(correct) {
  const card = karteikarten.cards[karteikarten.currentCardIndex];
  const deckId = karteikarten.currentDeck.id;
  
  try {
    const response = await fetch(`/api/karteikarten/${deckId}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cardId: card.id,
        correct: correct,
        timestamp: new Date().toISOString()
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      karteikarten.progress[card.id] = result.progress;
      updateKarteikartenProgress();
      
      // Visuelles Feedback
      const cardEl = document.getElementById('kk-card');
      cardEl.classList.add(correct ? 'kk-flash-correct' : 'kk-flash-wrong');
      setTimeout(() => {
        cardEl.classList.remove('kk-flash-correct', 'kk-flash-wrong');
        // Automatisch zur nächsten Karte
        nextKarteikarte();
      }, 500);
    }
  } catch (e) {
    console.error('Fehler beim Speichern des Fortschritts:', e);
  }
}

// Fortschritts-Anzeige aktualisieren
function updateKarteikartenProgress() {
  // Fortschritt basiert immer auf ALLEN Karten, nicht nur gefilterten
  const total = karteikarten.allCards.length;
  let mastered = 0;
  
  for (const card of karteikarten.allCards) {
    if (isCardLearned(card.id)) {
      mastered++;
    }
  }
  
  const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;
  document.getElementById('kk-progress-text').textContent = `${percent}%`;
}

// Filter für ungelernte Karten umschalten
function toggleUnlearnedFilter() {
  karteikarten.showOnlyUnlearned = !karteikarten.showOnlyUnlearned;
  
  const filterBtn = document.getElementById('kk-filter-btn');
  if (karteikarten.showOnlyUnlearned) {
    // Nur ungelernte Karten zeigen
    karteikarten.cards = karteikarten.allCards.filter(card => !isCardLearned(card.id));
    filterBtn.innerHTML = '📖 Ungelernte';
    filterBtn.classList.add('kk-filter-active');
  } else {
    // Alle Karten zeigen
    karteikarten.cards = [...karteikarten.allCards];
    filterBtn.innerHTML = '📚 Alle';
    filterBtn.classList.remove('kk-filter-active');
  }
  
  // Counter aktualisieren
  document.getElementById('kk-total').textContent = karteikarten.cards.length;
  
  // Zur ersten Karte springen
  karteikarten.currentCardIndex = 0;
  showKarteikarte(0);
}

// Fortschritt zurücksetzen
async function resetKarteikartenProgress(deckId) {
  if (!confirm('Möchtest du deinen Lernfortschritt für dieses Deck wirklich zurücksetzen?')) {
    return;
  }
  
  try {
    await fetch(`/api/karteikarten/${deckId}/progress`, { method: 'DELETE' });
    karteikarten.progress = {};
    
    // Filter zurücksetzen auf "Alle"
    karteikarten.showOnlyUnlearned = false;
    karteikarten.cards = [...karteikarten.allCards];
    const filterBtn = document.getElementById('kk-filter-btn');
    if (filterBtn) {
      filterBtn.innerHTML = '📚 Alle';
      filterBtn.classList.remove('kk-filter-active');
    }
    document.getElementById('kk-total').textContent = karteikarten.cards.length;
    
    updateKarteikartenProgress();
    showKarteikarte(0);
  } catch (e) {
    console.error('Fehler beim Zurücksetzen:', e);
  }
}

// Button für Karteikarten rendern
function renderKarteikartenButton(topicId) {
  return `
    <button class="karteikarten-start-btn" onclick="openKarteikarten('${topicId}')">
      <span class="kk-btn-icon">🎴</span>
      <span class="kk-btn-text">Karteikarten lernen</span>
      <span class="kk-btn-arrow">→</span>
    </button>
  `;
}
