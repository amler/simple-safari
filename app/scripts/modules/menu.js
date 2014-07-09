'use strict';

var menu = {
	init: function(){
		var that = this;
		$('body').on('click', '.toggle-menu', function() {
			that.toggle();
		});
	},
	kill: function(){
		$('body').off('click', '.toggle-menu');
	},

	show: function(){
		$('body').addClass('show-menu');
	},
	hide: function(){
		$('body').removeClass('show-menu');
	},
	toggle: function(){
		$('body').toggleClass('show-menu');
	}
};