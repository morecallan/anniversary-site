"use strict"

app.controller("ShareCtrl", function($scope, $q, $location, $anchorScroll, DataFactory){

  // Scroll To Utility Function
   $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
   }

  /*************************/
  /******* Memories ********/
  /*************************/

  $scope.memory = {};

  $scope.memories = [];

  $scope.submitMemory = () => {
    if ($scope.memory.memory != undefined && $scope.memory.memory != "") {
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
    DataFactory.getSharedPics().then((pics) => {
      for (var pic in pics) {
        $scope.photos.push(pics[pic]);
      }
      DataFactory.returnRSVPPhotos().then((datas) => {
        if (datas != null) {
          for (var data in datas) {
            $scope.photos.push(datas[data]);
          }
        }
      })
    })
  }


  $scope.getAllPhotos();


  $scope.submitPictures = () => {
    if ($scope.images) {
      for (var i = 0; i < $scope.images.length; i++) {
        uploadPhotoTask($scope.images[i].name, $scope.images[i]).then((uploadURL) => {
          if (uploadURL != null) {
            $scope.submitPicturesWithSubmissionName(uploadURL, $scope.image.submittedBy || "Anonymous")
          }
        })
      }
    } else {
      Materialize.toast(`Oops! You didn't select an image!`, 2000, "red")
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


  /*************************/
  /******** Songs **********/
  /*************************/

  $scope.song = {};

  $scope.songs = [];

  $scope.submitSong = () => {
    if ($scope.song.song != undefined && $scope.song.song != "" ) {
      DataFactory.submitSong($scope.song).then((data) => {
        Materialize.toast(`Thanks for sharing!`, 2000, "green")
        $scope.getAllCurrentSongs();
      })
    } else {
      Materialize.toast(`Oops! Don't forget to add a song!`, 2000, "red")
    }
  }

  $scope.getAllCurrentSongs = () => {
    $scope.songs = [];
    DataFactory.getSongs().then((moresongs) => {
      for (var moresong in moresongs) {
        $scope.songs.push(moresongs[moresong])
      }
      DataFactory.returnRSVPSongs().then((songs) => {
        if (songs != null) {
          for (var song in songs) {
            $scope.songs.push(songs[song])
          }
        }
      })
    })
  }

  $scope.getAllCurrentSongs();
})
