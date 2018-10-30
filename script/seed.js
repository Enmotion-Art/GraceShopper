'use strict'

const db = require('../server/db')
const {User, Art} = require('../server/db/models')


async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const art = await Promise.all([
    Art.create({title: 'The Blue Moon', description: 'This post-modern work of genius will excite all of your senses!', price: 400, quantity: 2, height: 6, width: 2, depth: 1, category: 'postmodern'}),
    Art.create({title: 'Techgnosis', description: 'Gaze into the secrets of the tech universe', price: 1000000000, quantity: 5, height: 2, width: 4, depth: 1, category: 'psyche'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

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
