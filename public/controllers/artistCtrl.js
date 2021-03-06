angular.module('LiveAPP.artist',[])
.controller('artistCtrl', ['$scope', '$http', '$location', 'dataFactory', '$stateParams','getArtist', 'getArtistUpcomingShows','ArtistInfoFactory', artistCtrl])

.directive('ratemain', function() {
  return {
    restrict: 'A',
    template: '<div id="rateYo"></div>',
    link: function( scope, ele, attrs ) {
      var ratingStars = scope.avgData.avgRating;
      
      if (isNaN(ratingStars)) {
        ratingStars = 0; 
      }
      
      var $rateYoMain = $(ele).rateYo({
        readOnly: true,
        rating:ratingStars
      })
    }
  }
})

.directive('ratereview', function() {
  return {
    restrict: 'E',
    template: '<div id="rateYo"></div>',
    link: function( scope, ele, attrs ) {
        var $rateYoMain = $(ele).rateYo({
          readOnly: true,
          rating:scope.review.number_of_stars,
          starWidth: '20px'
        });
    }
  }
})

function artistCtrl($scope, $http, $location, dataFactory, $stateParams, getArtist, getArtistUpcomingShows, ArtistInfoFactory){
  $scope.artistInfo =  getArtist.data === undefined ? getArtist : getArtist.data[0]

  $scope.reviews = getArtist.data === undefined ? '' : dataFactory.dateFormat(getArtist.data[1])
  
  $scope.avgData = dataFactory.avgReview($scope.reviews);
  
  $scope.artistConcerts = getArtistUpcomingShows

  $scope.reviewArtist = function() {
    dataFactory.reviewArtist = $scope.artistInfo.artist_name;
    $location.url('/review'); 
  };  
}


