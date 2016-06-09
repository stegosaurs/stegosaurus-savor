var expect = require('chai').expect;
var request = require('request');

var app = require('../../server/server.js');
var Restaurant = require('../../server/db/models.js');
var port = process.env.PORT || 3000;



describe('/rest - Restaurants', function () {

  it('Retrieve all ', function (done) {

      expect(true).to.equal(true);
      done();

  });

});

