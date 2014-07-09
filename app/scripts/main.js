'use strict';
/* global menu, DashboardView, DiscoverView, SafarisView, Map */

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
	dashboard:	new DashboardView(),
	discover:	new DiscoverView(),
	safaris:	new SafarisView()
};

var AppRouter = Parse.Router.extend({
	routes: {
		''				: 'dashboard',
		'safaris'		: 'safaris',
		'discover'		: 'discover',
		'*actions'		: 'logout'
	},

	dashboard: function(){
		changeLayout(false, true);
		views.dashboard.render();
	},
	safaris: function(){
		changeLayout(false, false);
		views.safaris.render();
	},
	discover: function(){
		changeLayout(false, true);
		views.discover.render();
	},
	logout: function(){
		console.log('router logout');
	}
});

var router = new AppRouter();
Parse.history.start();


