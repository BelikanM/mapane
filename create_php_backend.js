const fs = require("fs");
const path = require("path");

const files = {
  "backend-php/config.php": `<?php
$host = "127.0.0.1";
$user = "BelikanM";
$pass = "Dieu19961991??!??!";
$db = "tiktok";
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Erreur MySQL : " . $conn->connect_error);
}
?>`,

  "backend-php/auth/register.php": `<?php
require_once "../config.php";
$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"];
$password = password_hash($data["password"], PASSWORD_BCRYPT);
$stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
echo json_encode(["message" => "Utilisateur créé"]);
?>`,

  "backend-php/auth/login.php": `<?php
require_once "../config.php";
$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"];
$password = $data["password"];
$stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();
if ($result && password_verify($password, $result["password"])) {
    echo json_encode(["user_id" => $result["id"]]);
} else {
    http_response_code(401);
    echo json_encode(["error" => "Identifiants invalides"]);
}
?>`,

  "backend-php/videos/create.php": `<?php
require_once "../config.php";
$data = json_decode(file_get_contents("php://input"), true);
$title = $data["title"];
$url = $data["url"];
$user_id = $data["user_id"];
$stmt = $conn->prepare("INSERT INTO videos (title, file_url, user_id) VALUES (?, ?, ?)");
$stmt->bind_param("ssi", $title, $url, $user_id);
$stmt->execute();
echo json_encode(["message" => "Vidéo ajoutée"]);
?>`,

  "backend-php/videos/my_videos.php": `<?php
require_once "../config.php";
$user_id = $_GET["user_id"];
$stmt = $conn->prepare("SELECT * FROM videos WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$videos = [];
while ($row = $result->fetch_assoc()) {
    $videos[] = $row;
}
echo json_encode($videos);
?>`,

  "backend-php/videos/delete.php": `<?php
require_once "../config.php";
$data = json_decode(file_get_contents("php://input"), true);
$video_id = $data["video_id"];
$user_id = $data["user_id"];
$stmt = $conn->prepare("DELETE FROM videos WHERE id = ? AND user_id = ?");
$stmt->bind_param("ii", $video_id, $user_id);
$stmt->execute();
echo json_encode(["message" => "Vidéo supprimée"]);
?>`,

  "backend-php/likes/like.php": `<?php
require_once "../config.php";
$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data["user_id"];
$video_id = $data["video_id"];
$stmt = $conn->prepare("SELECT id FROM likes WHERE user_id = ? AND video_id = ?");
$stmt->bind_param("ii", $user_id, $video_id);
$stmt->execute();
if ($stmt->get_result()->num_rows > 0) {
    http_response_code(400);
    echo json_encode(["error" => "Déjà liké"]);
    exit;
}
$stmt = $conn->prepare("INSERT INTO likes (user_id, video_id) VALUES (?, ?)");
$stmt->bind_param("ii", $user_id, $video_id);
$stmt->execute();
echo json_encode(["message" => "Like ajouté"]);
?>`,

  "backend-php/comments/add.php": `<?php
require_once "../config.php";
$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data["user_id"];
$video_id = $data["video_id"];
$content = $data["content"];
$stmt = $conn->prepare("INSERT INTO comments (video_id, user_id, content) VALUES (?, ?, ?)");
$stmt->bind_param("iis", $video_id, $user_id, $content);
$stmt->execute();
echo json_encode(["message" => "Commentaire ajouté"]);
?>`
};

// Génération
for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.resolve(filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + "\n");
}

console.log("✅ Backend PHP généré dans ./backend-php");
