const sdk = require("appwrite");
require("dotenv").config();

const client = new sdk.Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new sdk.Databases(client);
const databaseId = "tiktok"; // à créer manuellement dans Appwrite console

async function setup() {
  try {
    // VIDEOS
    await databases.createCollection(databaseId, "videos", "Videos", [
      { read: ["*"], write: ["users"] }
    ]);
    await databases.createStringAttribute(databaseId, "videos", "title", 255, true);
    await databases.createStringAttribute(databaseId, "videos", "url", 1000, true);
    await databases.createStringAttribute(databaseId, "videos", "userId", 64, true);

    // COMMENTS
    await databases.createCollection(databaseId, "comments", "Comments", [
      { read: ["*"], write: ["users"] }
    ]);
    await databases.createStringAttribute(databaseId, "comments", "videoId", 64, true);
    await databases.createStringAttribute(databaseId, "comments", "userId", 64, true);
    await databases.createStringAttribute(databaseId, "comments", "content", 500, true);

    // LIKES
    await databases.createCollection(databaseId, "likes", "Likes", [
      { read: ["*"], write: ["users"] }
    ]);
    await databases.createStringAttribute(databaseId, "likes", "videoId", 64, true);
    await databases.createStringAttribute(databaseId, "likes", "userId", 64, true);

    // FOLLOWERS
    await databases.createCollection(databaseId, "followers", "Followers", [
      { read: ["*"], write: ["users"] }
    ]);
    await databases.createStringAttribute(databaseId, "followers", "followerId", 64, true);
    await databases.createStringAttribute(databaseId, "followers", "followingId", 64, true);

    console.log("✅ Toutes les collections et attributs ont été créés !");
  } catch (err) {
    console.error("❌ Erreur :", err.message);
  }
}

setup();
