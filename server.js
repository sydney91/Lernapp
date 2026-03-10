const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('.'));

// Verzeichnisse erstellen falls nicht vorhanden
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

// Multer für Datei-Uploads konfigurieren
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const topicDir = path.join(UPLOADS_DIR, req.params.topicId || 'allgemein');
    if (!fs.existsSync(topicDir)) fs.mkdirSync(topicDir, { recursive: true });
    cb(null, topicDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// ═══════════════════════════════════════════════════════════════
// ANHÄNGE API
// ═══════════════════════════════════════════════════════════════

const ANHAENGE_FILE = path.join(DATA_DIR, 'wissen-anhaenge.json');

// Anhänge-Daten laden
function loadAnhaenge() {
  if (fs.existsSync(ANHAENGE_FILE)) {
    return JSON.parse(fs.readFileSync(ANHAENGE_FILE, 'utf-8'));
  }
  return {
    version: '1.0',
    lastUpdated: new Date().toISOString(),
    description: 'Speichert die Relation zwischen Wissen-Artikeln und deren Anhängen',
    articles: {}
  };
}

// Anhänge-Daten speichern
function saveAnhaenge(data) {
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(ANHAENGE_FILE, JSON.stringify(data, null, 2));
}

// Alle Anhänge laden
app.get('/api/anhaenge', (req, res) => {
  try {
    const data = loadAnhaenge();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Anhänge für ein Topic laden
app.get('/api/anhaenge/:topicId', (req, res) => {
  try {
    const data = loadAnhaenge();
    const topicAnhaenge = data.articles[req.params.topicId]?.anhaenge || [];
    res.json(topicAnhaenge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Anhang hochladen
app.post('/api/anhaenge/:topicId', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Keine Datei hochgeladen' });
    }

    const data = loadAnhaenge();
    const topicId = req.params.topicId;

    if (!data.articles[topicId]) {
      data.articles[topicId] = { id: topicId, anhaenge: [] };
    }

    const anhang = {
      id: Date.now(),
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
      filename: req.file.filename,
      path: `/data/uploads/${topicId}/${req.file.filename}`,
      addedAt: new Date().toISOString()
    };

    data.articles[topicId].anhaenge.push(anhang);
    saveAnhaenge(data);

    res.json(anhang);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Anhang löschen
app.delete('/api/anhaenge/:topicId/:anhangId', (req, res) => {
  try {
    const data = loadAnhaenge();
    const { topicId, anhangId } = req.params;

    if (data.articles[topicId]) {
      const anhang = data.articles[topicId].anhaenge.find(a => a.id === parseInt(anhangId));
      
      // Datei löschen
      if (anhang && anhang.filename) {
        const filePath = path.join(UPLOADS_DIR, topicId, anhang.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      // Aus JSON entfernen
      data.articles[topicId].anhaenge = data.articles[topicId].anhaenge.filter(
        a => a.id !== parseInt(anhangId)
      );
      saveAnhaenge(data);
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Datei-Download
app.get('/data/uploads/:topicId/:filename', (req, res) => {
  const filePath = path.join(UPLOADS_DIR, req.params.topicId, req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'Datei nicht gefunden' });
  }
});

// ═══════════════════════════════════════════════════════════════
// DIAGNOSE-FÄLLE API
// ═══════════════════════════════════════════════════════════════

const DIAGNOSE_FILE = path.join(DATA_DIR, 'diagnose-cases.json');

// Diagnose-Fälle laden (aus data/ oder root)
function loadDiagnoseCases() {
  // Erst in data/ suchen, dann im root
  if (fs.existsSync(DIAGNOSE_FILE)) {
    return JSON.parse(fs.readFileSync(DIAGNOSE_FILE, 'utf-8'));
  }
  const rootFile = path.join(__dirname, 'diagnose-cases.json');
  if (fs.existsSync(rootFile)) {
    const data = JSON.parse(fs.readFileSync(rootFile, 'utf-8'));
    // Nach data/ kopieren für zukünftige Änderungen
    fs.writeFileSync(DIAGNOSE_FILE, JSON.stringify(data, null, 2));
    return data;
  }
  return { version: '1.0', cases: [] };
}

// Diagnose-Fälle speichern
function saveDiagnoseCases(data) {
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(DIAGNOSE_FILE, JSON.stringify(data, null, 2));
}

// Alle Fälle laden
app.get('/api/diagnose-cases', (req, res) => {
  try {
    const data = loadDiagnoseCases();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fall speichern/aktualisieren
app.post('/api/diagnose-cases', (req, res) => {
  try {
    const data = loadDiagnoseCases();
    const newCase = req.body;

    const existingIndex = data.cases.findIndex(c => c.id === newCase.id);
    if (existingIndex >= 0) {
      data.cases[existingIndex] = newCase;
    } else {
      data.cases.push(newCase);
    }

    saveDiagnoseCases(data);
    res.json({ success: true, case: newCase });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fall löschen
app.delete('/api/diagnose-cases/:id', (req, res) => {
  try {
    const data = loadDiagnoseCases();
    data.cases = data.cases.filter(c => c.id !== req.params.id);
    saveDiagnoseCases(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════
// YOUTUBE VIDEOS API
// ═══════════════════════════════════════════════════════════════

const VIDEOS_FILE = path.join(DATA_DIR, 'wissen-videos.json');

// Videos laden
function loadVideos() {
  if (fs.existsSync(VIDEOS_FILE)) {
    return JSON.parse(fs.readFileSync(VIDEOS_FILE, 'utf-8'));
  }
  return {
    version: '1.0',
    lastUpdated: new Date().toISOString(),
    description: 'Speichert YouTube-Video-Verknüpfungen für Wissen-Artikel',
    articles: {}
  };
}

// Videos speichern
function saveVideos(data) {
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(VIDEOS_FILE, JSON.stringify(data, null, 2));
}

// Alle Videos laden
app.get('/api/videos', (req, res) => {
  try {
    const data = loadVideos();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Videos für ein Topic laden
app.get('/api/videos/:topicId', (req, res) => {
  try {
    const data = loadVideos();
    const videos = data.articles[req.params.topicId]?.videos || [];
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Video hinzufügen
app.post('/api/videos/:topicId', (req, res) => {
  try {
    const data = loadVideos();
    const topicId = req.params.topicId;
    const { url, title, channel, description } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'YouTube-URL erforderlich' });
    }

    // YouTube Video-ID extrahieren
    let videoId = null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        videoId = match[1];
        break;
      }
    }

    if (!videoId) {
      return res.status(400).json({ error: 'Ungültige YouTube-URL' });
    }

    if (!data.articles[topicId]) {
      data.articles[topicId] = { id: topicId, videos: [] };
    }

    // Prüfe ob Video bereits existiert
    const exists = data.articles[topicId].videos.some(v => v.videoId === videoId);
    if (exists) {
      return res.status(400).json({ error: 'Dieses Video wurde bereits hinzugefügt' });
    }

    const video = {
      id: Date.now(),
      videoId: videoId,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      title: title || 'YouTube Video',
      channel: channel || '',
      description: description || '',
      addedAt: new Date().toISOString()
    };

    data.articles[topicId].videos.push(video);
    saveVideos(data);

    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Video löschen
app.delete('/api/videos/:topicId/:videoId', (req, res) => {
  try {
    const data = loadVideos();
    const { topicId, videoId } = req.params;

    if (data.articles[topicId]) {
      data.articles[topicId].videos = data.articles[topicId].videos.filter(
        v => v.id !== parseInt(videoId)
      );
      saveVideos(data);
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════
// SERVER STARTEN
// ═══════════════════════════════════════════════════════════════

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🏥 Heilpraktiker Lernapp                                ║
║                                                           ║
║   Server läuft auf: http://localhost:${PORT}              ║
║                                                           ║
║   Öffne diese URL in deinem Browser (Safari, Chrome...)   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});
