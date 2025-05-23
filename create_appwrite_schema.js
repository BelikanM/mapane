require('dotenv').config();
const { Client, Databases, Permission, Role } = require('node-appwrite');

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const databaseId = 'tiktok-backend';

async function recreateDatabase() {
  const dbs = await databases.list();
  const exists = dbs.databases.find(db => db.$id === databaseId);
  if (exists) {
    console.log('Base existante trouvée, suppression...');
    await databases.delete(databaseId);
    console.log('✅ Base supprimée.');
  }
  await databases.create(databaseId, 'TikTok Backend');
  console.log('✅ Nouvelle base créée.');
}

async function createCollectionWithAttributes(id, name, attributes) {
  await databases.createCollection(databaseId, id, name, [
    Permission.read(Role.any()),
    Permission.create(Role.any())
  ]);
  console.log(`✅ Collection "${name}" créée`);

  for (const [type, key, size, required] of attributes) {
    if (type === 'string') {
      await databases.createStringAttribute(databaseId, id, key, size, required);
    } else if (type === 'integer') {
      await databases.createIntegerAttribute(databaseId, id, key, required, 0);
    }
    console.log(`  - Attribut "${key}" ajouté`);
  }
}

async function main() {
  try {
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

    console.log('\n✅ Schéma Appwrite TikTok créé avec succès.');
  } catch (err) {
    console.error('❌ Erreur :', err.message);
  }
}

main();
