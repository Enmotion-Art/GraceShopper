'use strict'

const db = require('../server/db')
const {User, Art} = require('../server/db/models')

const art = [ {
  title: 'Profile on Canvas',
  description: 'Handmade; Materials: canvas, acrylic',
  price: 325.00,
  quantity: 1,
  image: 'https://i.etsystatic.com/17185369/r/il/93061f/1437515490/il_570xN.1437515490_nksd.jpg',
  height: 30,
  width: 20,
  category: 'Realism'
}, {
  title: 'Horse on Canvas',
  description: 'Handmade; Materials: canvas, acrylic',
  price: 65.00,
  quantity: 1,
  image: 'https://i.etsystatic.com/17185369/r/il/3dffa3/1484708013/il_570xN.1484708013_4kj2.jpg',
  height: 12,
  width: 12,
  category: 'Realism'
}, {
  title: 'Sankofa',
  description: 'Handmade; Materials: canvas, acrylic',
  price: 65.00,
  quantity: 1,
  image: 'https://i.etsystatic.com/17185369/r/il/95c154/1437477952/il_570xN.1437477952_5e2l.jpg',
  height: 12,
  width: 12,
  category: 'Inspired by...'
}, {
  title: 'Goddess',
  description: 'Handmade; Materials: canvas, oil paint',
  price: 55.00,
  quantity: 1,
  image: 'https://i.etsystatic.com/17185369/r/il/3142af/1484726583/il_570xN.1484726583_r2tp.jpg',
  height: 14,
  width: 11,
  category: 'Inspired by...'
}, {
  title: 'Upside',
  description: 'Handmade; Materials: canvas, oil paint',
  price: 450.00,
  quantity: 1,
  image: 'https://i.etsystatic.com/17185369/r/il/52af29/1484780625/il_570xN.1484780625_39av.jpg',
  height: 35.5,
  width: 24,
  category: 'Psyche'
}, {
  title: 'Phoenix on Canvas',
  description: 'Handmade; Materials: canvas, acrylic',
  price: 225.00,
  quantity: 1,
  image: 'https://i.etsystatic.com/17185369/r/il/fc3c44/1437506008/il_570xN.1437506008_nkwe.jpg',
  height: 20,
  width: 20,
  category: 'Psyche'
}, {
  title: 'Emerging on Canvas',
  description: 'Handmade; Materials: canvas, acrylic',
  price: 180.00,
  quantity: 1,
  image: 'https://i.etsystatic.com/17185369/r/il/d30c93/1484747031/il_570xN.1484747031_tldq.jpg',
  height: 20,
  width: 16,
  category: 'Psyche'
}, {
  title: 'Arrow on Paper',
  description: 'Handmade; Materials: canvas, acrylic',
  price: 45.00,
  quantity: 1,
  image: 'https://i.etsystatic.com/17185369/r/il/bab126/1437485136/il_570xN.1437485136_dagi.jpg',
  height: 9,
  width: 11,
  category: 'Social Justice'
}
]

const users = [{
  name: 'Cody',
  email: 'cody@email.com',
  password: '123',
  userType: 'standard'
}, {
  name: 'Murphy',
  email: 'murphy@email.com',
  password: '123',
  userType: 'standard'
}, {
  name: 'Lexi',
  email: 'lexi@email.com',
  password: '123',
  userType: 'admin'
}
]

const seed = () =>
  Promise.all(art.map(elem => Art.create(elem))
  )
  .then(() =>
  Promise.all(users.map(elem => User.create(elem))
  )
);

const main= () => {
  console.log('Syncing the db...');
  db.sync({force: true})
      .then(() => {
        console.log(green('Seeding the database...'));
        return seed();
      })
      .catch(err => {
        console.error(red('Oh noes! Something went wrong!'))
        console.error(err);
      })
      .then(() => {
        db.close();
        return null;
      })

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${art.length} users`)
}
main();

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
