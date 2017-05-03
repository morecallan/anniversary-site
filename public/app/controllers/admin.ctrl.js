app.controller("AdminCtrl", function($scope, DataFactory){
  DataFactory.getGuests().then((data) => {
    $scope.guests = data;
  })
})
