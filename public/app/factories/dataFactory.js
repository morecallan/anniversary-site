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
          if (data.data != null && data.data != undefined) {
            let imagesFromRSVP = data.data;
            let iterations = Object.keys(imagesFromRSVP).length;
            let resolveArray = [];
            for (let img in imagesFromRSVP) {
              getGuestName(imagesFromRSVP[img].submittedBy).then((name) => {
                imagesFromRSVP[img].submittedBy = name;
                resolveArray.push(imagesFromRSVP[img]);
                if (resolveArray.length == iterations) {
                  resolve(imagesFromRSVP);
                }
              })
            }
          } else {
            resolve(null)
          }
        }, (error) => reject(error));
    });
  }

  const getGuests = () => {
    return $q(function(resolve, reject) {
        $http.get(`${FIREBASE_CONFIG.databaseURL}/guests.json`)
        .then((data) => {
          let guest = data.data
          resolve(guest);
        }, (error) => reject(error));
    });
  }

  var getGuestName = (guestId) => {
    return $q(function(resolve, reject) {
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

  var submitSong = (song) => {
    return $q(function(resolve, reject) {
        $http.post(`${FIREBASE_CONFIG.databaseURL}/songsFromShare.json`, JSON.stringify(song))
        .then((data) => {
          resolve(data);
        }, (error) => reject(error));
    });
  }

  var getSongs = () => {
    return $q(function(resolve, reject) {
        $http.get(`${FIREBASE_CONFIG.databaseURL}/songsFromShare.json`)
        .then((data) => {
          resolve(data.data);
        }, (error) => reject(error));
    });
  }

  var returnRSVPSongs = function(){
    return $q(function(resolve, reject) {
        $http.get(`${FIREBASE_CONFIG.databaseURL}/songs.json`)
        .then((data) => {
          if (data.data != null && data.data != undefined) {
            let songsFromRSVP = data.data;
            let iterations = Object.keys(songsFromRSVP).length;
            let resolveArray = [];
            for (let song in songsFromRSVP) {
              getGuestName(songsFromRSVP[song].submittedBy).then((name) => {
                songsFromRSVP[song].submittedBy = name;
                resolveArray.push(songsFromRSVP[song]);
                if (resolveArray.length == iterations) {
                  resolve(songsFromRSVP);
                }
              })
            }
          } else {
            resolve(null)
          }
        }, (error) => reject(error));
    });
  }

  return {addNewGuest, addNewSong, addNewImageRef, returnRSVPPhotos, submitMemory, getMemories, submitPicturesFromShare, getSharedPics, submitSong, getSongs, returnRSVPSongs, getGuests}
})
