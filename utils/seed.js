const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsername, getRandomEmail, getRandomThought} = require('./data');
connection.on('error', (err) => err);

connection.once('open', async () => {

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let usernameCheck = await connection.db.listCollections({ name: 'usernames' }).toArray();
    if (usernameCheck.length) {
      await connection.dropCollection('usernames');
    }
    const users = [];

    for (let i = 0; i < 20; i++) {
        const email = getRandomEmail();
        const username = getRandomUsername();

        users.push({
            username,
            email,
        }); 
    }
    // Add Users to the collection and await the results
  await User.collection.insertMany(users);

  const thoughts = [];

  for (let i = 0; i < 20; i++) {
    const thoughts = getRandomThought();
    

    thoughts.push({
       thoughts,
    }); 
}
await Thought.collection.insertMany(thoughts);


    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});