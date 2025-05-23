const express = require("express");
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

module.exports = router;
