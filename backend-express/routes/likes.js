const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.post("/:video_id", auth, async (req, res) => {
  const [rows] = await db.execute("SELECT id FROM likes WHERE user_id = ? AND video_id = ?", [req.user.user_id, req.params.video_id]);
  if (rows.length) return res.status(400).json({ error: "Déjà liké" });

  await db.execute("INSERT INTO likes (user_id, video_id) VALUES (?, ?)", [req.user.user_id, req.params.video_id]);
  res.json({ message: "Like ajouté" });
});

module.exports = router;
