var Restaurant = require('./models');
var _ = require('underscore');

module.exports = {
  //function not being used...
  fetchAllById: function(clientID, callback) {
    Restaurant.findById(clientID).then(function(err, restaurant) {
      if (err) {
        console.log(err);
      } else {
        callback(restaurant);
      }
    })
  },
  
  fetchAll: function(callback) {
    Restaurant.find(function(err,restaurants) {
      if(err) {
        console.error(err);
      } else {
        callback(restaurants);
      }
    });
  },
  //function not being used...
  fetchOne: function(id, callback) {
    Restaurant.findById(id).then(function(err, restaurant) {
      if (err) {
        console.log(err);
      } else {
        callback(restaurant);
      }
    })
  },

  addRestaurantReview: function(restaurant, callback) {
    var newRestaurant = new Restaurant(restaurant);
    newRestaurant.save(function(err, newEntry) {
      if (err) {
        console.log(err);
      } else {
        callback(newEntry);
      }
    })
  },
  //function not being used...
  updateOne: function(id, newProperties, callback) {
    //refactor to use promises?
    fetchOne(id, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        _.extend(user, newProperties);
        user.save(function(err, updatedUser) {
          if (err) {
            console.log('There was an error updating entry')
          } else {
            callback(updatedUser);
          }
        })
      }
    })
  },
  //function not being used...
  deleteOne: function(id, callback) {
    fetchOne(id, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        user.remove(function(err, removed) {
          if (err) {
            console.log('There was an error deleting the entry');
          } else {
            callback(removed);
          }
        })
      }
    })
  }
};
