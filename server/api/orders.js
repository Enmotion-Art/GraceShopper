const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create({
        status: 'created',
        subtotal: 3,
        street: 'Macdonough St',
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
  
  router.get('/:orderId', async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.orderId);
      res.send(order)
    } catch (err) {
      next(err)
    }
  
  })
  
  //When requesting this route on the checkout button, pass in 'created'; when requesting this route on submit order, pass in 'processing' as the second parameter.
  router.put('/:orderId', async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.orderId)
      order.status = req.body.status;
      await order.save()
      res.send(order)
    } catch (err) {
      next(err)
    }
  })