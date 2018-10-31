const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create({
        status: 'Created',
        subtotal: 3,
        shippingAddress: 'Macdonough St',
        contactEmail: 'mags21walker@gmail.com'
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
    try {
    const orders = await Order.findAll(); 
    res.send(orders)
    } catch (err) {
      next(err)
    }
  })