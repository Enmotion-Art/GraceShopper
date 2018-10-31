const Sequelize = require('sequelize')
const db = require('../db')
const art = require('./art')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Created','Processing','Canceled', 'Shipped'),
    defaultValue: 'Created',
    allowNull:false
  },
  subtotal: {
    type: Sequelize.INTEGER,
    allowNull:false
  },
  streetNum: {
    type: Sequelize.INTEGER,
    allowNull:false
  },
  street: {
    type: Sequelize.STRING,
    allowNull:false
  },
  city: {
    type: Sequelize.STRING,
    allowNull:false
  },
  state: {
    type: Sequelize.STRING,
    allowNull:false
  },
  zip: {
    type: Sequelize.INTEGER,
    allowNull:false
  }
})

module.exports = Order
