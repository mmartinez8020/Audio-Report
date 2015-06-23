angular.module('LiveAPP.artist',[])
.controller('artistCtrl', ['$scope', '$http', '$location', 'dataFactory', '$routeParams', artistCtrl])

.directive("mainstar", function() {
    return {
        restrict: "E",
        template: "<div id='rateYo'></div>",
        link: function( scope, ele, attrs ) {
            console.log(scope.ratingInfo)
            // var $rateYo = $(ele).rateYo({
            //   starWidth: "20px",
            //   rating:3
            // });
 
        }
    };
})


.directive("ratestar", function() {
    return {
        restrict: "E",
        template: "<div id='rateYo'></div>",
        link: function( scope, ele, attrs ) {
            console.log("DATA",scope.ratingInfo.avgRating)
            var $rateYo = $(ele).rateYo({
              starWidth: "20px",
              rating:scope.review.number_of_stars
            });
 
        }
    };
})










function artistCtrl($scope, $http, $location, dataFactory, $routeParams){
    
    $scope.artistName = $routeParams.artistname;

    $scope.$watch( 'artistName', function( newValue, oldValue ) {
      dataFactory.checkDb( newValue ).then(function(dbData){
        if(dbData.data != "No data"){
          $scope.artistInfo = dbData.data[0];
          $scope.reviews = dbData.data[1];
          
          $scope.ratingInfo = dataFactory.avgReview($scope.reviews);
        } else{
          dataFactory.artistInfoAPIs(newValue);
        }
      })
    });
    
    $scope.$on('artist:updated', function(event, data){
      $scope.artistInfo = data;
    });


    $scope.ratingInfo = ""
    
    $scope.artistInfo = {
      artist_name: dataFactory.artistInfo.artist_name,
      artist_genre: dataFactory.artistInfo.artist_genre,
      artist_imageurl: dataFactory.artistInfo.artist_imageurl,
      artist_bio: dataFactory.artistInfo.artist_bio
    };

    $scope.reviewArtist = function(){
      dataFactory.reviewArtist = $scope.artistInfo.artist_name;
      $location.url("/review");
    };

    
    
}


