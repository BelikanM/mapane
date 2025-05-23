const express = require("express");
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

module.exports = router;
