const router = require('express').Router()
const {User, Order, Art, OrderProduct } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // {attributes: ['id', 'email']}

    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      }, include: [{model: Order, OrderProduct,
          include: [{ model:  Art }]}],
    })
    console.log("USER IN API", user)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  if(!req.user || req.user.UserType !== 'admin') {
    const error = new Error("Action not permitted");
    console.error(error)
    res.status(403).send("Action forbidden")
  } else if (req.user.UserType === 'admin') {
    try {
      await User.destroy({
        where: {
          id: req.body.id
        }
      });
      res.json({ deletedUser: req.body.id})
    } catch (err) {
      next(err)
    }
  }
})
