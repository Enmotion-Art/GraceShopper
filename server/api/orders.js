const router = require('express').Router()
const {Order, Art, User } = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  console.log("REQ BODY", req.body)
  try {
    const order = await Order.create({
      status: 'processing'
    })

    if(req.body.userId) {
      order.status = 'created';
      const userId = req.body.userId;
      const user = await User.findById(userId);
      await user.addOrder(order);
    }

    if(req.body.orderInfo) {
      await order.update(req.body.orderInfo)
    }

    await order.save();

    const productIds = req.body.productIds;
    console.log('PRODUCT IDS IN POST', productIds)
    let currArt = await Promise.all(productIds.map(productId => Art.findById(productId)));
    await Promise.all(currArt.map(art => order.addArt(art)));

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
    const order = await Order.findOne({
      where: {
        id: req.params.orderId
      }, include: [{model: Art}]
    })
    res.send(order)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
    order.status = req.body.status;

    if(req.body.productIds) {
      await Promise.all(req.body.productIds.map(id => order.addArt(id) ))
    }

    if(req.body.orderInfo) {
      await order.update(req.body.orderInfo)
    }

    await order.save()
    res.send(order)
  } catch (err) {
    next(err)
  }
})
