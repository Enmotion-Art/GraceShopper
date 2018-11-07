const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

OrderProduct.findQuantity = function(productIds) {
  let obj = {};
  productIds.forEach(product => {
    if(obj[product]) {
      obj[product] += 1;
    } else {
      obj[product] = 1;
    }
  })
  return obj;
}

OrderProduct.setQuantity = async function (obj, orderId) {
  for(let key in obj) {
    let orderProduct = await OrderProduct.findOne({
      where: {
        orderId: orderId,
        artId: key
      }
    })
    for(let i = 0; i<obj[key]; i++) {
      orderProduct.quantity +=1;
      await orderProduct.save();
    }
  }
}

module.exports = OrderProduct
