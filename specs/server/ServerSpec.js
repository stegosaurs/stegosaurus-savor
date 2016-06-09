var expect = require('chai').expect;
var request = require('request');

var app = require('../../server/server.js');
var Restaurant = require('../../server/db/models.js');
var port = process.env.PORT || 4040;


describe('', function() {

  before(function (done) {
    app.listen(port, function (err) {
      if(err) {
        done(err);
      } else {
        done();
      }
    });
  });

  describe('/auth - User authentication', function () {
    var options = {
      'method': 'GET',
      'followAllRedirects': true,
      'uri': 'http://localhost:' + port + '/api/restaurants'
      // 'json': {
      //   'username': 'Cara',
      //   'password': 'Chernoff'
      // }
    };

    before(function (done) {

    });

    it('Login with Existing User Data', function (done) {
      request(options, function (err, res) {
        if(err) return done(err);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('');
        done();
      });
    });

  });

});
