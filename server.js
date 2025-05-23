const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'BelikanM',
  password: 'Dieu19961991??!??!',
  database: 'tiktok'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connecté à MySQL');
});

// Créer une vidéo
app.post('/videos', (req, res) => {
  const { user_id, url, title, description, thumbnail } = req.body;

  // Créer utilisateur s'il n'existe pas
  db.query('INSERT IGNORE INTO users (uid) VALUES (?)', [user_id], (err) => {
    if (err) return res.status(500).json({ error: 'Erreur user' });

    // Insérer vidéo
    db.query(
      'INSERT INTO videos (user_id, url, title, description, thumbnail) VALUES (?, ?, ?, ?, ?)',
      [user_id, url, title, description, thumbnail],
      err => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Vidéo enregistrée' });
      }
    );
  });
});

// Lancer serveur
app.listen(3000, () => console.log('Serveur prêt sur le port 3000'));
