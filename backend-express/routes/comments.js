const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.post("/:video_id", auth, async (req, res) => {
  const { content } = req.body;
  await db.execute("INSERT INTO comments (video_id, user_id, content) VALUES (?, ?, ?)", [req.params.video_id, req.user.user_id, content]);
  res.json({ message: "Commentaire ajouté" });
});

module.exports = router;
