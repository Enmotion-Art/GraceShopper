const Sequelize = require('sequelize')
const db = require('../db')
const art = require('./art')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Created','Processing','Canceled', 'Complete'),
    defaultValue: 'Created',
    allowNull:false
  },
  subtotal: {
    type: Sequelize.INTEGER,
    allowNull:false
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull:false
  },
  contactEmail: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }

})

module.exports = Order

//Order.belongsTo(User)
//User.hasMany(Order)

//Order.belongsToMany(Art)
//Art.belongsToMany(User)
