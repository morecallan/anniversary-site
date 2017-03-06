app.controller("RSVPCtrl", function($scope){
  $scope.rsvp = {
    firstName: "",
    lastName: "",
    email: "",
    outOfTown: false,
    needPetFriendly: false,
    image: "",
  }

  let numOfGuestsAtLastCalc;
  

  $scope.additionalGuests = [];

  $scope.displayMoreGuestView = false;

  $scope.displayMoreGuests = (event) => {
    if ($scope.guests == true) {
      $scope.displayMoreGuestView = true;
    } else {
      $scope.displayMoreGuestView = fale;
    }
  }

  $scope.calculateNumToDisplay = () => {

    let newGuest = {
      guestId: 0,
      firstName: "",
      lastName: "",
      email: ""
    }
    console.log(numOfGuestsAtLastCalc, $scope.numOfGuests)


    if ($scope.additionalGuests.length == 0) {
      for (var i = 0; i < $scope.numOfGuests; i++) {
        newGuest.guestId = i;
        $scope.additionalGuests.push(newGuest)
      }
    } else if (numOfGuestsAtLastCalc < $scope.numOfGuests) {
      for (var i = numOfGuestsAtLastCalc; i < $scope.numOfGuests; i++) {
        newGuest.guestId = i;
        $scope.additionalGuests.push(newGuest)
      }
    } else if (numOfGuestsAtLastCalc > $scope.numOfGuests){
      for (var i = $scope.numOfGuests; i < numOfGuestsAtLastCalc; i++) {
        $scope.additionalGuests.pop()
      }
    }

    numOfGuestsAtLastCalc = $scope.numOfGuests;

  }
})
