var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
  return window._; //Underscore must already be loaded on the page
});
angular
  .module('savor.user',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'underscore'])
  .controller('userController', function($scope, $http, _) {
    // window.refresh = function() {
      // $http.get('/api/restaurants').then(function (response) {
      //   console.log('hello');
      //   $scope.restaurants = _.filter(res.data,function(restaurant) {
      //   //filter restaurants such that the email associated with the restaurant is the same as the email of the user currently logged in
      //     console.log('this is the response',response);
      //     console.log('this is res.data', res.data);
      //     if(restaurant.userEmail === user) {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   });
      // })
    // };
    $scope.profile = JSON.parse(localStorage.getItem('profile'));
    
  function getAll() {
    var user = JSON.parse(window.localStorage.profile).email;
    $http.get('/api/restaurants').then(function(res) {
      $scope.restaurants = _.filter(res.data,function(restaurant) {
        console.log('user', user);
        console.log('email', restaurant.userEmail);
        //filter restaurants such that the email associated with the restaurant is the same as the email of the user currently logged in
        if(restaurant.userEmail === user) {
          return true;
        } else {
          return false;
        }
      });
      
      console.log($scope.restaurants, "console.log $scope.rest");
    });
  }
  
  getAll();
    
    
    
   // window.refresh();
})
  