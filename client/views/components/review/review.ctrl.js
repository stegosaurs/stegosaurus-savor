 var app = angular.module('savor.review',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngDialog', 'ngFileUpload'])
  .controller('reviewController', function($scope, $http, ngDialog, Upload, $window) {

    /**
     * [for the ng-show that displays once a photo has been uploaded]
     * @type {Boolean}
     */
    $scope.photoUploaded = false;

    /**
     * to get the filename of the pic uploaded.
     */
    var pic;
    $scope.picName;

    /**
     * [uploads a selected photo]
     */
    $scope.add = function(){
      pic = document.getElementById('file').files[0];
      console.log(pic.name);
      $scope.picName = pic.name;
      $scope.photoUploaded = true;
    }
    /**
     * sends information entered on form to database
     * @return {[Object]}
     */
    $scope.sendPost = function () {
      var data = ({
        restaurantName: $scope.restaurant.name,
        restaurantAddress: $scope.restaurant.address,
        priceRating: $scope.price,
        serviceRating: $scope.service,
        foodRating: $scope.food,
        ambienceRating: $scope.ambience,
        restaurantReview: $scope.restaurant.review,
        //useremail file is parsed into the windowlocal storage
        userEmail: JSON.parse(window.localStorage.profile).email,
        //saves image in uploads folder using the uploaded photo's file name
        image: "http://localhost:4000/uploads/"+ pic.name.toString()
      });

      var config = {
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      }

      $http({
        method: "POST",
        data: data,
        url: '/api/restaurants'
      })

    //'this' is the scope. So setting 'that' equal to 'this' ensures that 'this' stays bound to the scope
    var that = this;
    that.upload = function(file){
      Upload.upload({
        //webAPI exposed to upload the file
        url: 'http://localhost:4000/uploads', 
        //pass file as data, should be user ng-model
        data:{file:file}
      //upload function returns a promise
      }).then(function (resp){ 
        if(resp.data.error_code === 0) { //validate success
          console.log('Success ' + that.up.file.name + 'uploaded. Response: ');
        } else {
          console.log('an error occured');
        }
      });
    };

    that.upload(that.up.file);
    //closes the dialog box once the 'submit' is clicked
    ngDialog.close();
    //removes line that confirms a photo has been added
    $scope.photoUploaded = false;

    /**
     * The following is two ideas to get the page to automatically append the just submitted data (so that you don't have to refresh the page to see your new entry)
     */
    //using jQuery to append...
      // $("#start").append('<div id="container"><div id="content"><div class="row"><div class="col-md-4"><img id="restphoto" src="{{'data.image'}}" alt=""></div><div class="col-md-8"><h1>{{'data.restaurantName'}}</h1><div class="restinfo"><p>{{'data.restaurantAddress'}}</p><p>{{'data.restaurantReview'}}</p></div><h3>Ratings</h3><div class ="ratinginfo"><ul><li>Food: {{'data.foodRating'}}</li><li>Service: {{'data.serviceRating'}}</li><li>Ambience: {{'data.ambienceRating'}}</li><li>Price per: {{'$' '+ data.priceRating'}}</li></ul></div></div></div></div></div>')

    //using the refresh function found in user.ctrl.js
      // window.refresh();
    };

  });
