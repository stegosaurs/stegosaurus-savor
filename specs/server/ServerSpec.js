var expect = require('chai').expect;
var request = require('request');

var app = require('../../server/server.js');
var Restaurant = require('../../server/db/models.js');


describe('/rest - Restaurants', function () {

  before(function (done) {
    Restaurant.find({}).then(function (docs) {
      docs.forEach(function (doc) {
        doc.remove().then(function () {
        });
      });
    }).catch(function (err) {
      done(err);
      throw {
        type: 'DatabaseError',
        message: 'Failed to clear Restaurant Colletion'
      };
    }).then(function () {
      new Restaurant({
        restaurantName: String,
        restaurantAddress: "93 School St, Watertown, MA",
        priceRating: 10,
        serviceRating: 10,
        foodRating: 10,
        ambienceRating: 10,
        restaurantReview: "Best buttermilk-dutch-oven fried chicken on the planet.",
        userEmail: 'bc@gmail.com',
        image: "http://s3-media1.fl.yelpcdn.com/bphoto/YiLAieTSO18oPjEuRzZSQA/348s.jpg"
      }).save().then(function(){
        done();
      }).catch(function (err) {
        done(err);
        throw {
          type: 'DatabaseError',
          message: 'Failed to save new Product'
        };
      });
    });
  });

  it('Retrieve all ', function (done) {

      expect(true).to.equal(true);
      done();

  });

});

