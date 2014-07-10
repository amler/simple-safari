'use strict';
/* global menu, DashboardView, DiscoverView, SafarisView, LoginView, SignUpView, ForgotPasswordView, HomeView, Map, userGeo */

Parse.initialize('tST7HFW9NWFhy9y9fan8kOYqFEy5TVFyV32XV3zk', 'xBNOXQU66455p4QokthOKO8ZLDx5oo0ACV52xuBg');

var map = new Map('map-container');

menu.init();


function changeLayout(showLogin, showMap){
	menu.hide();
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
	signup:			new SignUpView(),
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
		'discover'			: 'discover',
		'*actions'			: 'logout'
	},

	home: function(){
		var currentUser = Parse.User.current();
		if (currentUser){
			changeLayout(false, true);
			views.dashboard.render();
			userGeo.findLocation();
			// query nearby scavhunts
			// when you get hunts results update map
			// update list of scavenger hunts
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

	},
	discover: function(){
		changeLayout(false, true);
		views.discover.render();
		// get users location
		// query nearby locations
		// when you get location results update map
		// update list of nearby locations
	},

	logout: function(){
		Parse.User.logOut();
		window.router.navigate('login',{trigger:true});
	}
});

var router = new AppRouter();
Parse.history.start();

