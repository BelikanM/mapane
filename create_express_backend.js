const fs = require("fs");
const path = require("path");

const files = {
  ".env": `DB_HOST=localhost
DB_USER=BelikanM
DB_PASSWORD=Dieu19961991??!??!
DB_NAME=tiktok
JWT_SECRET=secretjwtkey123`,

  "package.json": `{
  "name": "backend-express",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mysql2": "^3.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}`,

  "server.js": `require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/videos", require("./routes/videos"));
app.use("/likes", require("./routes/likes"));
app.use("/comments", require("./routes/comments"));

app.get("/", (req, res) => res.send("API TikTok Express.js OK"));

const PORT = 8000;
app.listen(PORT, () => console.log("Serveur en écoute sur le port", PORT));`,

  "db.js": `const mysql = require("mysql2");
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
module.exports = pool.promise();`,

  "middleware/auth.js": `const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Non autorisé" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: "Token invalide" });
  }
}
module.exports = auth;`,

  "routes/auth.js": `const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const [users] = await db.execute("SELECT id FROM users WHERE username = ?", [username]);
  if (users.length) return res.status(400).json({ error: "Nom déjà utilisé" });

  const hash = await bcrypt.hash(password, 10);
  await db.execute("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash]);
  res.json({ message: "Inscription réussie" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const [users] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
  if (!users.length) return res.status(400).json({ error: "Utilisateur introuvable" });

  const user = users[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Mot de passe incorrect" });

  const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;`,

  "routes/videos.js": `const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const { title, url } = req.body;
  await db.execute("INSERT INTO videos (title, file_url, user_id) VALUES (?, ?, ?)", [title, url, req.user.user_id]);
  res.json({ message: "Vidéo ajoutée" });
});

router.get("/me", auth, async (req, res) => {
  const [videos] = await db.execute("SELECT * FROM videos WHERE user_id = ?", [req.user.user_id]);
  res.json(videos);
});

router.delete("/:id", auth, async (req, res) => {
  await db.execute("DELETE FROM videos WHERE id = ? AND user_id = ?", [req.params.id, req.user.user_id]);
  res.json({ message: "Vidéo supprimée" });
});

module.exports = router;`,

  "routes/likes.js": `const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.post("/:video_id", auth, async (req, res) => {
  const [rows] = await db.execute("SELECT id FROM likes WHERE user_id = ? AND video_id = ?", [req.user.user_id, req.params.video_id]);
  if (rows.length) return res.status(400).json({ error: "Déjà liké" });

  await db.execute("INSERT INTO likes (user_id, video_id) VALUES (?, ?)", [req.user.user_id, req.params.video_id]);
  res.json({ message: "Like ajouté" });
});

module.exports = router;`,

  "routes/comments.js": `const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.post("/:video_id", auth, async (req, res) => {
  const { content } = req.body;
  await db.execute("INSERT INTO comments (video_id, user_id, content) VALUES (?, ?, ?)", [req.params.video_id, req.user.user_id, content]);
  res.json({ message: "Commentaire ajouté" });
});

module.exports = router;`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join("backend-express", filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + "\n");
}

console.log("✅ Backend Express généré dans ./backend-express");
