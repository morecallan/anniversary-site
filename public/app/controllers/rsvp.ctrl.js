app.controller("RSVPCtrl", function($scope, $location, $timeout, DataFactory){
  var storage = firebase.storage();
  var storageRef= firebase.storage().ref();

  let petModalHasBeenOpened = false;

  $scope.showPetFriendlyModal = false;

  $scope.needPetFriendlyModal = () => {
    if (!petModalHasBeenOpened && $scope.rsvp.needPetFriendly) {
      $scope.showPetFriendlyModal = true;
    }
  }


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
      $scope.displayMoreGuestView = false;
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

    if ($scope.rsvp.firstName != "" && $scope.rsvp.lastName != "" && $scope.rsvp.email != "") {
      DataFactory.addNewGuest($scope.rsvp).then((data) => {
        songObj.submittedBy = data.data.name;
        imageObj.submittedBy = data.data.name;

        if (songObj.song != undefined && songObj.song != "") {
          DataFactory.addNewSong(songObj).then((data) => {})
        }

        if (imageObj.imageURL != undefined && imageObj.imageURL != "") {
          DataFactory.addNewImageRef(imageObj).then((data) => {
          })
        }

        Materialize.toast(`Can't wait to see you there, ${$scope.rsvp.firstName}`, 3000, "green")

        $scope.rsvp = {
          firstName: "",
          lastName: "",
          email: "",
          outOfTown: false,
          needPetFriendly: false
        }
        $("#submit-btn").attr('disabled', true);

        $timeout(function () {
          $location.path('/share')
        }, 1000);
      })

      for (var i = 0; i < $scope.guestsToBeAdded.length; i++) {
        DataFactory.addNewGuest($scope.guestsToBeAdded[i]).then((data) => {})
      }
    } else {
      Materialize.toast(`Please fill out first name, last name and email.`, 2000, "red")
    }
  }
})
