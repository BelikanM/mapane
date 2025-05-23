const { Client, Databases, Permission, Role } = require("node-appwrite");

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('67bb24ad002378e79e38')
  .setKey('standard_3f73de9c98e0013d3f9474426e8fced16bd8b783a1c18b056d34713cd9776621781ac96561cc0e8959ec86b484952d265eb6c5b070334e400eaa91174db365f044904d82ca94cd0f5efceebe6adfd188b2502cfb6d3721ac6a3b1bd14dafda2eaa00713133b050fbc3095fc92bda0b64ddf27cef1d1737f810497aa56fd4a289');

const databases = new Databases(client);
const databaseId = 'tiktok-backend';

async function recreateDatabase() {
  try {
    // Vérifie si la base existe déjà
    const list = await databases.list();
    const exists = list.databases.find(db => db.$id === databaseId);

    if (exists) {
      console.log(`Base "${databaseId}" existante, suppression en cours...`);
      await databases.delete(databaseId);
      console.log(`✅ Base supprimée`);
    }

    await databases.create(databaseId, 'TikTok Backend');
    console.log(`✅ Nouvelle base "${databaseId}" créée`);
  } catch (error) {
    console.error('❌ Erreur lors de la création/suppression de la base :', error.message);
    process.exit(1);
  }
}

async function createCollectionWithAttributes(collectionId, name, attributes) {
  await databases.createCollection(databaseId, collectionId, name, [
    Permission.read(Role.any()),
    Permission.create(Role.any())
  ]);
  console.log(`✅ Collection "${name}" créée`);

  for (const attr of attributes) {
    const [type, key, size, required] = attr;
    if (type === 'string') {
      await databases.createStringAttribute(databaseId, collectionId, key, size, required);
    } else if (type === 'integer') {
      await databases.createIntegerAttribute(databaseId, collectionId, key, required, 0);
    }
    console.log(`  - Attribut "${key}" ajouté`);
  }
}

async function createCollections() {
  await recreateDatabase();

  await createCollectionWithAttributes('users', 'Users', [
    ['string', 'username', 50, false],
    ['string', 'bio', 255, false]
  ]);

  await createCollectionWithAttributes('videos', 'Videos', [
    ['string', 'user_id', 255, true],
    ['string', 'title', 255, true],
    ['string', 'description', 500, false],
    ['string', 'video_url', 1024, true],
    ['string', 'thumbnail', 1024, false],
    ['integer', 'likes', 0, false],
    ['integer', 'comments', 0, false]
  ]);

  await createCollectionWithAttributes('likes', 'Likes', [
    ['string', 'user_id', 255, true],
    ['string', 'video_id', 255, true]
  ]);

  await createCollectionWithAttributes('comments', 'Comments', [
    ['string', 'user_id', 255, true],
    ['string', 'video_id', 255, true],
    ['string', 'content', 500, true]
  ]);

  await createCollectionWithAttributes('followers', 'Followers', [
    ['string', 'follower_id', 255, true],
    ['string', 'followed_id', 255, true]
  ]);

  console.log('\n✅ Toutes les collections et attributs ont été recréés avec succès.');
}

createCollections().catch(console.error);
