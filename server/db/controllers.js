var Restaurant = require('./models');
var _ = require('underscore');
var express = require('express');

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
    Restaurant.findById(id).then(function(restaurant){
        callback(restaurant);
      }
    )
    .catch(function(err){
      console.log(err);
    });
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
    Restaurant.findByIdAndUpdate(id, newProperties)
      .then(function () {
        callback("Restaurant Updated");
      })
      .catch(function (err) {
      console.log(err);
      res.status(404).send('DatabaseError');
    });
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
        });
      }
    });
  }
};
