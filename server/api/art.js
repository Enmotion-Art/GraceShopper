const router = require('express').Router()
const Art = require('../db/models/art')
module.exports = router


router.get('/', async (req, res, next) => {
  try {
    res.json(await Art.findAll())
  }
    catch (err) {
    console.log('getArt not working:', err)
    //next(err)
  }
})

router.get('/:artId', async (req, res, next) => {
  try {
    let art = await Art.findById(req.params.artId)
    if (!art) res.sendStatus(404)
    else res.json(art)
  }
    catch (err) {
    console.log('getArtbyID not working:', err)
    //next(err)
  }
})
