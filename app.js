const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
app.use(express.json());

// Configuration — à personnaliser via variables d'environnement
const PORT = process.env.PORT || 3000;
const BASIC_USER = process.env.AUTH_USER || 'admin';
const BASIC_PASS = process.env.AUTH_PASS || 'password';

// Base de données SQLite
const db = new sqlite3.Database(path.join(__dirname, 'var', 'database.sqlite'), (err) => {
  if (err) {
    console.error('Erreur connexion SQLite:', err.message);
    process.exit(1);
  }
  console.log('Connecté à la base SQLite.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS urls (
    id TEXT PRIMARY KEY,
    url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Middleware d'authentification HTTP Basic
function basicAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="URL Shortener"');
    return res.status(401).json({ error: 'Authentification requise' });
  }

  const credentials = Buffer.from(authHeader.slice(6), 'base64').toString('utf-8');
  const [user, pass] = credentials.split(':');

  if (user !== BASIC_USER || pass !== BASIC_PASS) {
    res.set('WWW-Authenticate', 'Basic realm="URL Shortener"');
    return res.status(401).json({ error: 'Identifiants invalides' });
  }

  next();
}

// POST /urls — enregistre une URL et retourne son identifiant court
app.post('/urls', basicAuth, (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Le champ "url" est requis' });
  }

  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: 'URL invalide' });
  }

  const id = uuidv4().split('-')[0]; // ex: "a3f2c1b4" (8 caractères)

  db.run('INSERT INTO urls (id, url) VALUES (?, ?)', [id, url], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Erreur interne' });
    }
    res.status(201).json({ id, short_url: `${req.protocol}://${req.get('host')}/${id}` });
  });
});

// GET /:id — redirige vers l'URL associée
app.get('/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT url FROM urls WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Erreur interne' });
    }
    if (!row) {
      return res.status(404).json({ error: 'URL introuvable' });
    }
    res.redirect(301, row.url);
  });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
