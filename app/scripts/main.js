'use strict';
/* global menu, DashboardView, DiscoverView, SafarisView, SafariDetailView, LoginView, SignUpView, ForgotPasswordView, HomeView, Map, userGeo */

Parse.initialize('tST7HFW9NWFhy9y9fan8kOYqFEy5TVFyV32XV3zk', 'xBNOXQU66455p4QokthOKO8ZLDx5oo0ACV52xuBg');

var map = new Map('map-container');

menu.init();


function changeLayout(showLogin, showMap){
	menu.hide();
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

var views = {
	dashboard:		new DashboardView(),
	discover:		new DiscoverView(),
	forgotPassword:	new ForgotPasswordView(),
	home:			new HomeView(),
	login:			new LoginView(),
	safaris:		new SafarisView(),
	safariDetail:	new SafariDetailView(),
	signup:			new SignUpView()
};

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
		'discover'			: 'discover',
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
		userGeo.findLocation();
		// show list of all scavengerhunts you've joined
		// user needs to join a safari
	},
	safariDetail: function(name){
		console.log('you\'re route to detail worked');
		changeLayout(false, true);
		views.safariDetail.render();
		// userGeo.findLocation();
	},
	discover: function(){
		changeLayout(false, true);
		views.discover.render();
		userGeo.findLocation();
		// query nearby locations
		// when you get location results update map
		// update list of nearby locations you're subscribed to
	},

	logout: function(){
		Parse.User.logOut();
		window.router.navigate('login',{trigger:true});
	}
});

var router = new AppRouter();
Parse.history.start();

