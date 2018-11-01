const router = require('express').Router()
const {Order, Art, User} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  console.log("REQ BODY", req.body)
  try {
    const order = await Order.create({
        status: 'created',
    })
    const productId = req.body.productId;
    const currArt = await Art.findById(productId)
    await order.addArt(currArt)
    if(req.body.userId) {
      const userId = req.body.userId;
      const user = await User.findById(userId);
      console.log("USER IN POST", user)
      await user.addOrder(order);
    }
    console.log("ORDER IN POST", order)
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

//   router.get('/:orderId', async (req, res, next) => {
//     try {
//       const order = await Order.findById(req.params.orderId);
//       res.send(order)
//     } catch (err) {
//       next(err)
//     }
//   })


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
