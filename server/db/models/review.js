const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  stars: {
    type: Sequelize.INTEGER
  },
  validate: {
    len: [3, 600]
  }
})

module.exports = Review
