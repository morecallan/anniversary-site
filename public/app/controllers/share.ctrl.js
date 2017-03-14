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
  var storage = firebase.storage();
  var storageRef= firebase.storage().ref();

  $scope.photos = [];
  $scope.image = {};

  $scope.getAllPhotos = () => {
    DataFactory.returnRSVPPhotos().then((data) => {
      $scope.photos.push(data);
      DataFactory.getSharedPics().then((pics) => {
        for (var pic in pics) {
          $scope.photos.push(pics[pic]);
        }
      })
    })

  }

  $scope.getAllPhotos();

  $scope.submitPictures = () => {
    console.log($scope.images)
    for (var i = 0; i < $scope.images.length; i++) {
      console.log(i)
      uploadTask = storageRef.child(`momAndDadImg/${$scope.images[i].name}`).put($scope.images[i]);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
      }, function(error) {
        Materialize.toast(`${error.message}`, 2000, "red accent-2")
      }, function() {
        $scope.submitPicturesWithSubmissionName(uploadTask.snapshot.downloadURL, $scope.image.submittedBy || "Anonymous")
      })
    }
  }

  $scope.submitPicturesWithSubmissionName = (url, submitter) => {
    let shareObj = {
      imageURL: url,
      submittedBy: submitter
    }

    DataFactory.submitPicturesFromShare(shareObj).then((data)=> {
      $scope.getAllPhotos();
    })
  }
})
