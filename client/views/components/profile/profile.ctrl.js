 //this file is not currently being used. was an experiment with private and public endpoints using Auth0
  angular
    .module('savor.profile', [])
    .controller('profileController', profileController);

  function profileController($http) {
    var vm = this;
    vm.getMessage = getMessage;
    vm.getSecretMessage = getSecretMessage;
    vm.message;

    vm.profile = JSON.parse(localStorage.getItem('profile'));

    // Makes a call to a public API route that
    // does not require authentication. We can
    // avoid sending the JWT as an Authorization
    // header with skipAuthorization: true
    function getMessage() {
      $http.get('http://localhost:4000/api/public', {
        skipAuthorization: true
      }).then(function(response) {
        vm.message = response.data.message;
      });
    }
    // Makes a call to a private endpoint that does
    // require authentication. The JWT is automatically
    // sent with HTTP calls using jwtInterceptorProvider in app.js
    function getSecretMessage() {
      $http.get('http://localhost:4000/api/private').then(function(response) {
        vm.message = response.data.message;
      });
    }
  }
