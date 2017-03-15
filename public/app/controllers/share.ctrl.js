"use strict"

app.controller("ShareCtrl", function($scope, $q, DataFactory){

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
    $scope.photos = [];
    DataFactory.returnRSVPPhotos().then((datas) => {
      for (var data in datas) {
        $scope.photos.push(datas[data]);
      }
      DataFactory.getSharedPics().then((pics) => {
        for (var pic in pics) {
          $scope.photos.push(pics[pic]);
        }
      })
    })

  }

  $scope.getAllPhotos();


  $scope.submitPictures = () => {
    for (var i = 0; i < $scope.images.length; i++) {
      uploadPhotoTask($scope.images[i].name, $scope.images[i]).then((uploadURL) => {
        if (uploadURL != null) {
          $scope.submitPicturesWithSubmissionName(uploadURL, $scope.image.submittedBy || "Anonymous")
        }
      })
    }
  }

  const uploadPhotoTask = (imageName, image) => {
    return $q(function(resolve, reject) {
      var uploadTask = storageRef.child(`momAndDadImg/${imageName}`).put(image);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
      }, function(error) {
        Materialize.toast(`${error.message}`, 2000, "red accent-2")
      }, function() {
        resolve(uploadTask.snapshot.downloadURL)
      })
    })
  }

  var shareObj = {
    imageURL: "",
    submittedBy: ""
  }


  $scope.submitPicturesWithSubmissionName = (url, submitter) => {
    shareObj.imageURL =  url;
    shareObj.submittedBy = submitter

    DataFactory.submitPicturesFromShare(shareObj).then((data)=> {
      $scope.getAllPhotos();
    })
  }
})
