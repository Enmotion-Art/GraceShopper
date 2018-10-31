const User = require('./user')
const Art = require('./art')
const Order = require('./order')
const Review = require('./review')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Order.hasMany(Art);
Art.hasMany(Order);

Order.belongsTo(User);
User.hasMany(Order);

User.hasMany(Art);
Art.hasMany(User);

Review.belongsTo(User);
User.hasMany(Review);

Review.belongsTo(Art);
Art.hasMany(Review);
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Art,
  Order,
  Review
}
