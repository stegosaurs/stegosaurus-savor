var expect = require('chai').expect;
var request = require('request');

var app = require('../../server/server.js');
var Restaurant = require('../../server/db/models.js');
var port = process.env.PORT || 3000;

describe('/restaurants', function () {
  
  var idOfItem; 

  var GETall = {
    'method': 'GET',
    'followAllRedirects': true,
    'uri': 'http://localhost:' + port + '/api/restaurants'
  };

  var POSTone = {
    'method': 'POST',
    'followAllRedirects': true,
    'uri': 'http://localhost:' + port + '/api/restaurants',
    'json': {
      'restaurantName': 'Belmont Pizza',
      'restaurantAddress': '388 Trapelo Rd, Belmont, MA 02478',
      'priceRating': 'Expensive',
      'serviceRating': 1,
      'foodRating': 10,
      'ambienceRating': 8,
      'restaurantReview': 'String',
      'userEmail': 'cara@bernsteinchernoff.com',
      'image': 'http://s3-media1.fl.yelpcdn.com/bphoto/YiLAieTSO18oPjEuRzZSQA/348s.jpg'
    }
  };

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
        restaurantName: "StripTs",
        restaurantAddress: "93 School St, Watertown, MA",
        priceRating: 10,
        serviceRating: 10,
        foodRating: 10,
        ambienceRating: 10,
        restaurantReview: "Best buttermilk-dutch-oven fried chicken on the planet.",
        userEmail: 'bc@gmail.com',
        image: "http://s3-media1.fl.yelpcdn.com/bphoto/YiLAieTSO18oPjEuRzZSQA/348s.jpg"
      }).save().then(function(saved){
        idOfItem = saved._id;
        console.log("idOfItem: ",idOfItem);
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

  it('Should Return List of all Restaurants', function (done) {
    request(GETall, function (err, res) {
      if(err) return done(err);
      expect(res.statusCode).to.equal(200);
      expect(JSON.parse(res.body)).to.have.lengthOf(1);
      done();
    });
  });

  it('Should Be Able To Store a Restaurant', function (done) {
    request(POSTone, function (err) {
      if(err) return done(err);
      request(GETall, function (err, res) {
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(res.body)).to.have.lengthOf(2);
        done();
      });
    });
  });

  it('Should Be Able to Find One Restaurant', function (done) {
    var GETone = {
      'method': 'GET',
      'followAllRedirects': true,
      'uri': 'http://localhost:' + port + '/api/restaurants/' + idOfItem,
    };
    request(GETone, function (err, res) {
      if(err) return done(err);
      expect(res.statusCode).to.equal(200);
        expect(JSON.parse(res.body)).to.have.property('_id').to.equal(idOfItem.toString());
      done();
    });
  });

  it('Should Be Able to Update One Restaurant', function (done) {
    var UPDATEone = {
      'method': 'PUT',
      'followAllRedirects': true,
      'uri': 'http://localhost:' + port + '/api/restaurants/' + idOfItem,
      'json': {
        'restaurantName': 'Belmont Pizza',
        'restaurantAddress': '388 Trapelo Rd, Belmont, MA 02478',
        'priceRating': 'Expensive',
        'serviceRating': 1,
        'foodRating': 10,
        'ambienceRating': 8,
        'restaurantReview': 'the wonderful, the amazing, the wonderful review!',
        'userEmail': 'cara@bernsteinchernoff.com',
        'image': 'http://s3-media1.fl.yelpcdn.com/bphoto/YiLAieTSO18oPjEuRzZSQA/348s.jpg'
      }  
    };
    request(UPDATEone, function (err, res) {
      if(err) return done(err);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.equal("Restaurant Updated");
      done();
    });
  });

});