app.controller("RSVPCtrl", function($scope){
  var storage = firebase.storage();
  var storageRef= firebase.storage().ref();


  $scope.rsvp = {
    firstName: "",
    lastName: "",
    email: "",
    outOfTown: false,
    needPetFriendly: false
  }


  ////////////////////////////////////
  /////////// Image Upload ///////////
  ////////////////////////////////////

  let uploadImageUrl;

  $scope.submitPicture = () => {
    uploadTask = storageRef.child(`momAndDadImg/${$scope.picture.name}`).put($scope.picture);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
    }, function(error) {
      Materialize.toast(`${error.message}`, 2000, "red accent-2")
    }, function() {
      uploadImageUrl = uploadTask.snapshot.downloadURL;
      console.log(uploadImageUrl)
    })
  }

  ////////////////////////////////////
  /////////// Extra Guests ///////////
  ////////////////////////////////////

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


  ////////////////////////////////////
  /////////// Submit Guest ///////////
  ////////////////////////////////////

  $scope.submission = () => {
    console.log($scope.guestsToBeAdded)
    console.log($scope.song)
    console.log($scope.rsvp)
  }
})
