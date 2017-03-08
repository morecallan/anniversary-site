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

  return {addNewGuest: addNewGuest, addNewSong: addNewSong, addNewImageRef: addNewImageRef}
})
