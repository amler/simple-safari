'use strict';
/* global menu, DashboardView, DiscoverView, SafarisView, SafariDetailView, LoginView, SignUpView, ForgotPasswordView, HomeView, Map, userGeo, ScavengerHuntsCollection, LocationsCollection, ScavengerHunt, Location, LoadingView, Photo, PhotoDetailView, UserPhotosView, LocationDetailView */

var map = new Map('map-container');

menu.init();

var collections = {
	scavengerHunts:	new ScavengerHuntsCollection(),
	locations:		new LocationsCollection()
};

var models = {
	scavengerHunt:	new ScavengerHunt(),
	huntLocation:	new Location(),
	photo:			new Photo()
};

var views = {
	dashboard:		new DashboardView(),
	discover:		new DiscoverView(),
	forgotPassword:	new ForgotPasswordView(),
	home:			new HomeView(),
	loading:		new LoadingView(),
	locationDetail: new LocationDetailView(),
	login:			new LoginView(),
	photoDetail:	new PhotoDetailView(),
	userPhoto:		new UserPhotosView(),
	safaris:		new SafarisView(),
	safariDetail:	new SafariDetailView(),
	signup:			new SignUpView()
	
};

function changeLayout(showLogin, showMap){
	menu.hide();
	views.loading.render();
	map.deleteAllMarkers();
	userGeo.clearWatchLocation();
	if (showLogin === true) {
		// show login button
		$('header .button').show();
		// hide menu button
		$('header button').hide();
	} else {
		// show menu button
		$('header button').show();
		// hide login
		$('header .button').hide();
	}

	if (showMap === true) {
		//show map
		$('#map-container').show();
	} else {
		// hide map
		$('#map-container').hide();
	}
}

////////////////////////
// Router
////////////////////////
var AppRouter = Parse.Router.extend({
	routes: {
		''					: 'home',
		'login'				: 'login',
		'signup'			: 'signup',
		'forgot-password'	: 'forgotPassword',
		'safaris'			: 'safaris',
		'safari/:name'		: 'safariDetail',
		'photo/:id'			: 'photoDetail',
		'photos'			: 'photoThumbnails',
		'discover'			: 'discover',
		'location/:id'		: 'locationDetail',
		'*actions'			: 'logout'
	},

	home: function(){
		var currentUser = Parse.User.current();
		if (currentUser){
			changeLayout(false, true);
			views.dashboard.render();
			userGeo.findLocation();

		} else {
			changeLayout(true, false);
			views.home.render();
		}
	},
	login: function(){
		changeLayout(true, false);
		views.login.render();
	},
	signup: function(){
		changeLayout(true, false);
		views.signup.render();
	},
	forgotPassword: function(){
		changeLayout(true, false);
		views.forgotPassword.render();
	},
	safaris: function(){
		changeLayout(false, false);
		views.safaris.render();
		// show list of all scavengerhunts you've joined
		// user needs to join a safari
	},
	photoDetail: function(id) {
		changeLayout(false, true);
		views.photoDetail.findPhoto(id);
	},
	photoThumbnails: function() {
		changeLayout(false, false);	
		views.userPhoto.render();
	},
	safariDetail: function(id){
		changeLayout(false, true);
		var selectedHunt = id;
		var query = new Parse.Query(ScavengerHunt);
		query.equalTo('objectId', selectedHunt);
		query.find({
			success: function(results) {
				results.forEach(function(hunt) {
					views.safariDetail.render(hunt);
				});
			},
			error: function(error) {
				alert('Router/safariDetail Error: ' + error.code + ' ' + error.message);
			}
		});
	},
	discover: function(){
		changeLayout(false, true);
		views.discover.render();
	},
	locationDetail: function(id){
		changeLayout(false, true);
		views.locationDetail.subscribedPhoto(id);
		
		
	},
	logout: function(){
		Parse.User.logOut();
		window.router.navigate('login',{trigger:true});
	}
});

var router = new AppRouter();
Parse.history.start();