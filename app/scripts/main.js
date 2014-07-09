'use strict';
/* global menu, DashboardView, DiscoverView, SafarisView, Map */

Parse.initialize('tST7HFW9NWFhy9y9fan8kOYqFEy5TVFyV32XV3zk', 'xBNOXQU66455p4QokthOKO8ZLDx5oo0ACV52xuBg');

var map = new Map('map-container');

menu.init();

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

	initialize: function(){
		console.log('router initialize');
	},

	dashboard: function(){
		views.dashboard.render();
		menu.hide();	
	},
	safaris: function(){
		views.safaris.render();
		menu.hide();
	},
	discover: function(){
		views.discover.render();
		menu.hide();
	},
	logout: function(){
		console.log('router logout');
	}
});

var router = new AppRouter();
Parse.history.start();

