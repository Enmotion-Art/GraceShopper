const Sequelize = require('sequelize')
const db = require('../db')

const Art = db.define('art', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 1,
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: '../../public/favicon.ico'
  },
  height: {
    type: Sequelize.DECIMAL,
  },
  width: {
    type: Sequelize.DECIMAL,
  },
  depth: {
    type: Sequelize.DECIMAL,
  },
  category: {
    type: Sequelize.STRING
  }
})

module.exports = Art
