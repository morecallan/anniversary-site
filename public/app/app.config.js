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
	otherwise('/')
});
