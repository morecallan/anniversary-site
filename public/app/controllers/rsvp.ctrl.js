app.controller("RSVPCtrl", function($scope, DataFactory){
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
    let imageObj = {
      imageURL: uploadImageUrl
    }

    let songObj = {
      song: $scope.song
    }

    DataFactory.addNewGuest($scope.rsvp).then((data) => {
      songObj.submittedBy = data.data.name;
      imageObj.submittedBy = data.data.name;
      DataFactory.addNewSong(songObj).then((data) => {})
      DataFactory.addNewImageRef(imageObj).then((data) => {
        Materialize.toast(`Can't wait to see you there, ${$scope.rsvp.firstName}`, 2000, "green")
      })
    })

    for (var i = 0; i < $scope.guestsToBeAdded.length; i++) {
      DataFactory.addNewGuest($scope.guestsToBeAdded[i]).then((data) => {})
    }
  }
})
