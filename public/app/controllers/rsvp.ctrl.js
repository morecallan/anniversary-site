app.controller("RSVPCtrl", function($scope){
  $scope.rsvp = {
    firstName: "",
    lastName: "",
    email: "",
    outOfTown: false,
    needPetFriendly: false
  }


  let numOfGuestsAtLastCalc;


  $scope.additionalGuests = [];
  $scope.guestsToBeAdded = [];


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

    // This is a pretty annoying fix for if they change the # of guests they are bringing
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

    $(document).ready(function() {
      Materialize.updateTextFields();
    });

    numOfGuestsAtLastCalc = $scope.numOfGuests;

  }

  $scope.submission = () => {
    console.log($scope.guestsToBeAdded)
    console.log($scope.song)
    console.log($scope.rsvp)
  }
})
