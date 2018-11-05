const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  status: {
    type: Sequelize.ENUM('created','processing','cancelled', 'shipped'),
    defaultValue: 'created',
    allowNull:false
  },
  subtotal: {
    type: Sequelize.INTEGER,
    allowNull:true
  },
  streetNum: {
    type: Sequelize.INTEGER,
    allowNull:true
  },
  street: {
    type: Sequelize.STRING,
    allowNull:true
  },
  city: {
    type: Sequelize.STRING,
    allowNull:true
  },
  state: {
    type: Sequelize.STRING,
    allowNull:true
  },
  zip: {
    type: Sequelize.INTEGER,
    allowNull:true
  }
})

module.exports = Order
