const router = require('express').Router()
const Art = require('../db/models/art')
const User = require('../db/models/user')
const Review = require('../db/models/review')
const Sequelize = require('sequelize')
module.exports = router

// GET api/art - get all art
router.get('/', async (req, res, next) => {
  if (req.query.search) {
    //Not secure but works
    const search = req.query.search;
    const Op = Sequelize.Op
    try {

      const response = await Art.findAll({
        where:
        {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: search + '%'
              }
            },
            {
              description: {
                [Op.iLike]: '%' + search + '%'
              }
            }
          ]
        }
      })
      res.json(response)
    }
    catch (err) {
      console.log('getSearch not working:', err)
      next(err)
    }
  } else {


    try {
      res.json(await Art.findAll())
    }
    catch (err) {
      next(err)
    }
  }
});

// GET api/art/:artId - get single art
router.get('/:artId', async (req, res, next) => {
  try {
    let art = await Art.findById(req.params.artId)
    if (!art) res.sendStatus(404)
    else res.json(art)
  }
  catch (err) {
    next(err)
  }
});

router.put('/:artId', async (req, res, next) => {
  if (!req.user || req.user.UserType !== 'admin') {
    const error = new Error("Action not permitted");
    console.error(error)
    res.status(403).send("Action forbidden")
  } else if (req.user.UserType === 'admin') {
    try {
      let art = await Art.findById(req.params.artId)
      await art.update({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        image: req.body.image,
        height: req.body.height,
        width: req.body.width,
        depth: req.body.depth,
        category: req.body.category
      })
      await art.save()
      res.send(art)
    } catch (err) {
      console.err(err)
      next(err)
    }

  }
})

router.post('/', async (req, res, next) => {
  if (!req.user || req.user.UserType !== 'admin') {
    const error = new Error("Action not permitted");
    console.error(error)
    res.status(403).send("Action forbidden")
  } else if (req.user.UserType === 'admin') {
    try {
      if (req.body.image === '') {
        req.body.image = Art.image;
      }
      const newArt = await Art.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        image: req.body.image,
        height: req.body.height,
        width: req.body.width,
        depth: req.body.depth,
        category: req.body.category
      })
      res.status(201).send(newArt)
    } catch (err) {
      console.error(err);
      next(err)
    }
  }
});


router.delete('/', async (req, res, next) => {
  if (!req.user || req.user.UserType !== 'admin') {
    const error = new Error("Action not permitted");
    console.error(error)
    res.status(403).send("Action forbidden")
  } else if (req.user.UserType === 'admin') {
    try {
      await Art.destroy({
        where: {
          id: req.body.id
        }
      });
      res.json({ deletedArt: req.body.id })
    } catch (err) {
      next(err)
    }
  }
})


// POST api/art/:artId/reviews - create review and set relationship with art
router.post('/:artId/reviews', async (req, res, next) => {
  try {
    console.log('HIIIIIIIIIIII', req.body)
    let art = await Art.findById(req.params.artId)
    let user = await User.findById(req.body.userId)
    let review = await Review.create(req.body)
    review.setArt(art)
    review.setUser(user)

    res.status(201).json(review)
  }
  catch (error) { next(error) }
})

// GET api/art/:artId/reviews  - get reviews for single art
router.get('/:artId/reviews', async (req, res, next) => {
  try {
    let reviews = await Review.findAll({
      where: {
        artId: req.params.artId,
      }
    })
    res.json(reviews)
  }
  catch (error) { next(error) }

})


function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "");
}
