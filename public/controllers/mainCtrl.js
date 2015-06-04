angular.module('LiveAPP.main',['LiveAPP.factory'])
.controller('mainCtrl', ['$scope','$http', '$location','dataFactory',mainCtrl]);

function mainCtrl($scope,$http,$location,dataFactory){
  $scope.getArtist = function(artist){
    
    dataFactory.checkDb(artist).then(function(data){
      if(data.data != "No data"){
        dataFactory.artistinfo = data.data[0]
      }
      return data.data

    }).then(function(data){
      if(data === "No data"){
        $scope.hitAPI(artist);
      } else{
        $location.path('/artist/' + artist)
      }
    })

  }



  $scope.hitAPI = function(artist){

      dataFactory.artistfromSpotify(artist).success(function(data){
        dataFactory.artistInformation = data;
        
        dataFactory.artistBio(data.artists.items[0].name).success(function(data){
          dataFactory.artistInformation.artistBio = dataFactory.findWiki(data);

          dataFactory.postTodb(dataFactory.artistInformation).success(function(dbData){  
            dataFactory.checkDb(dbData).success(function(data){
              dataFactory.artistinfo = data[0]    
            }).then(function(){ $location.path("/artist/" + artist)}) 
          })
        })   
      })
    }
}    





    




