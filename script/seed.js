'use strict'

const db = require('../server/db')
const { User, Art, Review } = require('../server/db/models')
const { green, red } = require('chalk')

const arts = [{
  title: 'Profile on Canvas',
  description: 'Handmade; Materials: canvas, acrylic',
  price: 325.00,
  quantity: 5,
  image: 'https://i.etsystatic.com/17185369/r/il/93061f/1437515490/il_570xN.1437515490_nksd.jpg',
  height: 30,
  width: 20,
  category: 'Realism'
}, {
  title: 'Horse on Canvas',
  description: 'Handmade; Materials: canvas, acrylic',
  price: 65.00,
  quantity: 4,
  image: 'https://i.etsystatic.com/17185369/r/il/3dffa3/1484708013/il_570xN.1484708013_4kj2.jpg',
  height: 12,
  width: 12,
  category: 'Realism'
}, {
  title: 'Sankofa',
  description: 'Handmade; Materials: canvas, acrylic',
  price: 65.00,
  quantity: 3,
  image: 'https://i.etsystatic.com/17185369/r/il/95c154/1437477952/il_570xN.1437477952_5e2l.jpg',
  height: 12,
  width: 12,
  category: 'Inspired by...'
}, {
  title: 'Goddess',
  description: 'Handmade; Materials: canvas, oil paint',
  price: 55.00,
  quantity: 2,
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
  quantity: 2,
  image: 'https://i.etsystatic.com/17185369/r/il/fc3c44/1437506008/il_570xN.1437506008_nkwe.jpg',
  height: 20,
  width: 20,
  category: 'Psyche'
}, {
  title: 'Emerging on Canvas',
  description: 'Handmade; Materials: canvas, acrylic',
  price: 180.00,
  quantity: 3,
  image: 'https://i.etsystatic.com/17185369/r/il/d30c93/1484747031/il_570xN.1484747031_tldq.jpg',
  height: 20,
  width: 16,
  category: 'Psyche'
}, {
  title: 'Arrow on Paper',
  description: 'Handmade; Materials: canvas, acrylic',
  price: 45.00,
  quantity: 4,
  image: 'https://i.etsystatic.com/17185369/r/il/bab126/1437485136/il_570xN.1437485136_dagi.jpg',
  height: 9,
  width: 11,
  category: 'Social Justice'
}, {
  title: 'Zero Quantity Test',
  description: 'test',
  price: 500.00,
  quantity: 0,
  image: 'http://www.flexibleproduction.com/wp-content/uploads/2017/06/test-intelligenza-sociale.jpg',
  height: 5,
  width: 5,
  category: 'Test'
}, {
  title: 'Cave Woman',
  description: 'test',
  price: 1.0,
  quantity: 3,
  image: 'https://ayitaenmotion.files.wordpress.com/2017/10/img_7306.jpg?w=2924',
  height: 5,
  width: 5,
  category: 'Test'
}, {
  title: 'Mandorla',
  description: 'test',
  price: 1.0,
  quantity:3,
  image: 'https://ayitaenmotion.files.wordpress.com/2017/10/img_7314.jpg',
  height: 5,
  width: 5,
  category: 'Test'
}, {
  title: 'Dreamer',
  description: 'test',
  price: 1.0,
  quantity: 3,
  image: 'https://ayitaenmotion.files.wordpress.com/2017/10/img_7299.jpg',
  height: 5,
  width: 5,
  category: 'Test'
}, {
  title: 'Ally',
  description: 'test',
  price: 1.0,
  quantity: 3,
  image: 'https://ayitaenmotion.files.wordpress.com/2017/10/img_7282.jpg',
  height: 5,
  width: 5,
  category: 'Test'
}
]

const users = [{
  firstName: 'Cody',
  lastName: 'Puppy',
  email: 'cody@email.com',
  password: '123',
  UserType: 'standard'
}, {
  firstName: 'Murphy',
  lastName: 'Dear',
  email: 'murphy@email.com',
  password: '123',
  UserType: 'standard'
}, {
  firstName: 'Lexi',
  lastName: 'Admin',
  email: 'lexi@email.com',
  password: '123',
  UserType: 'standard'
}, {
  firstName: 'Lee',
  lastName: 'Kirincich',
  email: 'le@email.com',
  password: '123',
  UserType: 'admin'
}, {
  firstName: 'Erica',
  lastName: 'Luong',
  email: 'erica@email.com',
  password: '123',
  UserType: 'admin'
}, {
  firstName: 'Mags',
  lastName: 'Walker',
  email: 'mags@email.com',
  password: '123',
  UserType: 'standard'
}, {
  firstName: 'Adrienne',
  lastName: 'Johnson',
  email: 'adrienne@email.com',
  password: '123',
  UserType: 'standard'
}
]


const reviews = [{
  stars: 5,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget enim metus. Duis ut lectus ac mi laoreet bibendum nec sit amet dolor. Nunc aliquam lorem quis vulputate tincidunt. Nulla mattis pharetra nisi, id venenatis est hendrerit et. Vivamus euismod placerat justo, ac sollicitudin dui facilisis ac. Aliquam molestie nisi mollis rhoncus mollis. Donec ac odio nec massa pretium facilisis nec et enim. Nullam vel condimentum eros.',
  userId: 1,
  artId: 1
}, {
  stars: 4,
  content: 'Sed felis purus, tristique et dignissim id, pretium eu felis. Aenean mi sem, lobortis eu est in, eleifend condimentum ipsum. Cras condimentum congue purus, a finibus ipsum vehicula ac. Vestibulum ornare rutrum enim. Suspendisse vitae elit ac metus sodales lacinia sed eu ipsum. Nullam tincidunt sit amet ante quis posuere.',
  userId: 1,
  artId: 1
}, {
  stars: 3,
  content: 'liquam molestie nisi mollis rhoncus mollis. Donec ac odio nec massa pretium facilisis nec et enim. Nullam vel condimentum eros. Nunc eget lorem nisi. Aenean cursus consectetur dui, at ultrices justo rutrum at. Vivamus dapibus posuere augue et fringilla. Suspendisse nibh nibh, maximus egestas posuere a, euismod in ante. Aenean fermentum orci sit amet luctus mollis. Aenean finibus ipsum ut purus mollis, non venenatis tortor efficitur.',
  userId: 1,
  artId: 1
}, {
  stars: 4,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget enim metus. Duis ut lectus ac mi laoreet bibendum nec sit amet dolor. Nunc aliquam lorem quis vulputate tincidunt. Nulla mattis pharetra nisi, id venenatis est hendrerit et. Vivamus euismod placerat justo, ac sollicitudin dui facilisis ac',
  userId: 1,
  artId: 2
}
]

const seed = () =>
  Promise.all(arts.map(elem => Art.create(elem))
  )
    .then(() =>
      Promise.all(users.map(elem => User.create(elem))
      )
    )
    .then(() =>
      Promise.all(reviews.map(elem => Review.create(elem))
      )
    )
const main = () => {
  console.log('Syncing the db...');
  db.sync({ force: true })
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
      console.log(green('Seeded Successfully!!'));
      return null;
    })

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${arts.length} arts`)
}
main();

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
// async function runSeed() {
//   console.log('seeding...')
//   try {
//     await seed()
//   } catch (err) {
//     console.error(err)
//     process.exitCode = 1
//   } finally {
//     console.log('closing db connection')
//     await db.close()
//     console.log('db connection closed')
//   }
// }

// // Execute the `seed` function, IF we ran this module directly (`node seed`).
// // `Async` functions always return a promise, so we can use `catch` to handle
// // any errors that might occur inside of `seed`.
// if (module === require.main) {
//   runSeed()
// }

// // we export the seed function for testing purposes (see `./seed.spec.js`)
// module.exports = seed
