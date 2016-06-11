//necessary to use underscore
var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
  //Underscore must already be loaded on the page
  return window._;
});

angular
  .module('savor.user',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'underscore'])
  .controller('userController', function($scope, $http, _) {

    $scope.profile = JSON.parse(localStorage.getItem('profile'));

    function getAll() {
      var user = JSON.parse(window.localStorage.profile).email;
      $http.get('/api/restaurants').then(function(res) {
        $scope.restaurants = _.filter(res.data,function(restaurant) {
          //filter restaurants such that the email associated with the restaurant is the same as the email of the user currently logged in
          if(restaurant.userEmail === user) {
            return true;
          } else {
            return false;
          }
        });
      });
    }
    getAll();
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
  });
