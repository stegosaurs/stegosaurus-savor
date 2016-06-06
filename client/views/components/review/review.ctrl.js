 var app = angular.module('savor.review',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngDialog', 'ngFileUpload'])
  .controller('reviewController', function($scope, $http, ngDialog, Upload, $window) {

    //to get the filename of the pic uploaded.
    $scope.photoUploaded = false;
    var pic;
    $scope.picName;

    $scope.add = function(){
      pic = document.getElementById('file').files[0];
      console.log(pic.name);
      $scope.picName = pic.name;
      $scope.photoUploaded = true;
    }

    $scope.sendPost = function () {
        //useremail file is parsed into the windowlocal storage
        var data = ({
            restaurantName: $scope.restaurant.name,
            restaurantAddress: $scope.restaurant.address,
            priceRating: $scope.price,
            serviceRating: $scope.service,
            foodRating: $scope.food,
            ambienceRating: $scope.ambience,
            restaurantReview: $scope.restaurant.review,
            userEmail: JSON.parse(window.localStorage.profile).email,
            image: "http://localhost:4000/uploads/"+ pic.name.toString()
        });

        console.log("data", data);
        //console.log("user", JSON.parse(window.localStorage.profile).email);

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

      var that = this;
      that.upload = function(file){
        Upload.upload({
          url: 'http://localhost:4000/uploads', //webAPI exposed to upload the file
          data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp){ //upload function returns a promise
          // if(resp.data.error_code === 0){ //validate success
          //   $window.alert('Success ' + that.up.file.name + 'uploaded. Response: ');
          // }else{
          //   $window.alert('an error occured');
          // }
        });
      };

      that.upload(that.up.file);
      console.log(this);


        // $("#start").append('<div id="container"><div id="content"><div class="row"><div class="col-md-4"><img id="restphoto" src="{{'data.image'}}" alt=""></div><div class="col-md-8"><h1>{{'data.restaurantName'}}</h1><div class="restinfo"><p>{{'data.restaurantAddress'}}</p><p>{{'data.restaurantReview'}}</p></div><h3>Ratings</h3><div class ="ratinginfo"><ul><li>Food: {{'data.foodRating'}}</li><li>Service: {{'data.serviceRating'}}</li><li>Ambience: {{'data.ambienceRating'}}</li><li>Price per: {{'$' '+ data.priceRating'}}</li></ul></div></div></div></div></div>')
        ngDialog.close();
        //doesn't do anything
        // window.refresh();

        $scope.photoUploaded = false;
      };

  });
