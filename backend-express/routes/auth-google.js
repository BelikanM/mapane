const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

// Redirection vers Google OAuth
router.get("/google", passport.authenticate("google", {
  scope: ["profile"]
}));

// Callback de Google
router.get("/google/callback", passport.authenticate("google", { session: false }),
  async (req, res) => {
    const google_uid = req.user.id;
    const username = req.user.displayName;
    const avatar_url = req.user.photos[0].value;

    // Insère ou met à jour l'utilisateur dans la base
    await db.execute(`
      INSERT INTO users (google_uid, username, avatar_url)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE username = VALUES(username), avatar_url = VALUES(avatar_url)
    `, [google_uid, username, avatar_url]);

    // Génère un token contenant google_uid
    const token = jwt.sign({ user_id: google_uid }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Redirige vers React avec le token dans l'URL
    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  }
);

module.exports = router;
