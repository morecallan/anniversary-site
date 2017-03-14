app.factory("DataFactory", function($q, $http, FIREBASE_CONFIG){

  var addNewGuest = function(guest){
      return $q(function(resolve, reject) {
          $http.post(`${FIREBASE_CONFIG.databaseURL}/guests.json`, JSON.stringify(guest))
          .then((data) => {
            resolve(data);
          }, (error) => reject(error));
      });
  };

  var addNewSong = function(song){
      return $q(function(resolve, reject) {
          $http.post(`${FIREBASE_CONFIG.databaseURL}/songs.json`, JSON.stringify(song))
          .then((data) => {
            resolve(data);
          }, (error) => reject(error));
      });
  };

  var addNewImageRef = function(imgUrl){
      return $q(function(resolve, reject) {
          $http.post(`${FIREBASE_CONFIG.databaseURL}/images.json`, JSON.stringify(imgUrl))
          .then((data) => {
            resolve(data);
          }, (error) => reject(error));
      });
  };

  var returnRSVPPhotos = function(){
    return $q(function(resolve, reject) {
        $http.get(`${FIREBASE_CONFIG.databaseURL}/images.json`)
        .then((data) => {
          let imagesFromRSVP = data.data;
          let iterations = Object.keys(imagesFromRSVP).length;
          let resolveArray = [];
          for (var img in imagesFromRSVP) {
            getGuestName(imagesFromRSVP[img].submittedBy).then((name) => {
              imagesFromRSVP[img].submittedBy = name;
            })
            resolveArray.push(imagesFromRSVP[img]);
            if (resolveArray.length == iterations) {
              resolve(imagesFromRSVP);
            }
          }
        }, (error) => reject(error));
    });
  }

  var getGuestName = (guestId) => {
    return $q(function(resolve, reject) {
        console.log(guestId)
        $http.get(`${FIREBASE_CONFIG.databaseURL}/guests/${guestId}.json`)
        .then((data) => {
          let guest = data.data
          let fullName = `${guest.firstName} ${guest.lastName}`
          resolve(fullName);
        }, (error) => reject(error));
    });
  }

  var submitMemory = (memory) => {
    return $q(function(resolve, reject) {
        $http.post(`${FIREBASE_CONFIG.databaseURL}/memories.json`, JSON.stringify(memory))
        .then((data) => {
          resolve(data);
        }, (error) => reject(error));
    });
  }

  var getMemories = () => {
    return $q(function(resolve, reject) {
        $http.get(`${FIREBASE_CONFIG.databaseURL}/memories.json`)
        .then((data) => {
          resolve(data.data);
        }, (error) => reject(error));
    });
  }

  var submitPicturesFromShare = (sharedPic) => {
    return $q(function(resolve, reject) {
        $http.post(`${FIREBASE_CONFIG.databaseURL}/sharedPic.json`, JSON.stringify(sharedPic))
        .then((data) => {
          resolve(data);
        }, (error) => reject(error));
    });
  }

  var getSharedPics = () => {
    return $q(function(resolve, reject) {
        $http.get(`${FIREBASE_CONFIG.databaseURL}/sharedPic.json`)
        .then((data) => {
          resolve(data.data);
        }, (error) => reject(error));
    });
  }

  return {addNewGuest: addNewGuest, addNewSong: addNewSong, addNewImageRef: addNewImageRef, returnRSVPPhotos: returnRSVPPhotos, submitMemory: submitMemory, getMemories: getMemories, submitPicturesFromShare: submitPicturesFromShare, getSharedPics: getSharedPics}
})
