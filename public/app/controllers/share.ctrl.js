app.controller("ShareCtrl", function($scope, DataFactory){

  /*************************/
  /******* Memories ********/
  /*************************/

  $scope.memory = {};

  $scope.memories = [];

  $scope.submitMemory = () => {
    if ($scope.memory != "") {
      DataFactory.submitMemory($scope.memory).then((data) => {
        Materialize.toast(`Thanks for sharing!`, 2000, "green")
        DataFactory.getMemories().then((memories) => {
          $scope.memories = memories;
        })
      })
    } else {
      Materialize.toast(`Oops! Don't forget to add a memory!`, 2000, "red")
    }
  }

  $scope.getAllCurrentMemories = () => {
    DataFactory.getMemories().then((memories) => {
      $scope.memories = memories;
    })
  }

  $scope.getAllCurrentMemories();

  /*************************/
  /******** Photos *********/
  /*************************/

  $scope.photos = [];

  $scope.getRsvpPhotos = () => {
    DataFactory.returnRSVPPhotos().then((data) => {
      $scope.photos = data;
    })
  }

  $scope.getRsvpPhotos();
})
