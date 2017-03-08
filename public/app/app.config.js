app.config (function($routeProvider){
	$routeProvider.
	when('/', {
		templateUrl: 'partials/splash.html',
		controller: 'SplashCtrl'
	}).
	when('/rsvp', {
		templateUrl: 'partials/rsvp.html',
		controller: 'RSVPCtrl',
	}).
	when('/more-info', {
		templateUrl: 'partials/more-info.html',
		controller: 'MoreInfoCtrl',
	}).
	when('/share', {
		templateUrl: 'partials/share.html',
		controller: 'ShareCtrl',
	}).
	when('/accomodations', {
		templateUrl: 'partials/accomodations.html',
		controller: 'AccomodationsCtrl',
	}).
	otherwise('/')
});

app.constant("FIREBASE_CONFIG", {
	apiKey: "AIzaSyBs5H0tSgWoGCVk9AmxKl62XoGz-yguql4",
	authDomain: "anniversary-61e42.firebaseapp.com",
	databaseURL: "https://anniversary-61e42.firebaseio.com",
	storageBucket: "anniversary-61e42.appspot.com",
	messagingSenderId: "890352153892"
})
