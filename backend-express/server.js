require("dotenv").config();
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
app.listen(PORT, () => console.log("Serveur en écoute sur le port", PORT));
