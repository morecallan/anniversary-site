app.controller("ShareCtrl", function($scope, DataFactory){
  $scope.photos = [];

  $scope.getRsvpPhotos = () => {
    DataFactory.returnRSVPPhotos().then((data) => {
      $scope.photos = data;
    })
  }

  $scope.getRsvpPhotos();
})
