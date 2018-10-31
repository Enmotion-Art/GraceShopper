const router = require('express').Router()
const Art = require('../db/models/art')
module.exports = router


router.get('/', async (req, res, next) => {
  try {
    res.json(await Art.findAll())
  }
    catch (err) {
    next(err)
  }
});

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

router.put('/:artId/edit', async (req, res, next) => {
  if(!req.user || req.user.UserType !== 'admin') {
    const error = new Error("Action not permitted");
    console.error(error)
    res.status(403).send("Action forbidden")
  } else if (req.user.UserType === 'admin') {
    try{
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
  if(!req.user || req.user.UserType !== 'admin') {
    const error = new Error("Action not permitted");
    console.error(error)
    res.status(403).send("Action forbidden")
  } else if (req.user.UserType === 'admin') {
    try {
      if(req.body.image === '') {
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
    } catch(err) {
      console.error(err);
      next(err)
    }
  }
});

