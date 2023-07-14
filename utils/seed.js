const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsername, getRandomEmail, getRandomThought} = require('./data');
connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }
    const users = [];
    const thoughts = [];
    
    for (let i = 0; i < 20; i++) {
        const email = getRandomEmail();
        const username = getRandomUsername();
        const thought = getRandomThought();
        
        users.push({ 
            username,
            email,
        }); 
         thoughts.push({
            thought,
        }); 

    }
    // Add Users to the collection and await the results
  await User.collection.insertMany(users);

    //   const thoughts = [];

    //   for (let i = 0; i < 20; i++) {
    //     const thoughts = getRandomThought();
    

    //     thoughts.push({
    //        thoughts,
    //     }); 
    // }
    await Thought.collection.insertMany(thoughts);
    

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});