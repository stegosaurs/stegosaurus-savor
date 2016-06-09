//necessary to use underscore
var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
  //Underscore must already be loaded on the page
  return window._; 
});

angular
  .module('savor.home',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'underscore'])
  .controller('homeController', function($scope, $http, _) {
    //refresh function that was an attempt to get just added restaurant to render on page without a refresh
    /*window.refresh = function() {
      $http.get('/api/restaurants').then(function (response) {
        console.log('hello');
        $scope.restaurants = response.data;
      })
    };*/

    $scope.profile = JSON.parse(localStorage.getItem('profile'));
    
    function getAll() {
      $http.get('/api/restaurants').then(function(res) {
        $scope.restaurants = res.data;
      });
    }
    getAll();
  });
  