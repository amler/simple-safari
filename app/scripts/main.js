'use strict';
/* global menu */
Parse.initialize('tST7HFW9NWFhy9y9fan8kOYqFEy5TVFyV32XV3zk', 'xBNOXQU66455p4QokthOKO8ZLDx5oo0ACV52xuBg');


var map = new Map('map-container');

menu.init();

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
		console.log('dashboard');
	},
	safaris: function(){
		console.log('safaris');
	},
	discover: function(){
		console.log('router discover');
	},
	logout: function(){
		console.log('router logout');
	}
});

var router = new AppRouter();
Parse.history.start();

