'use strict';

var LoadingView = Parse.View.extend({
	el: '#view',
	template: _.template($('#loading-view-template').text()),
	
	render: function() {
		this.$el.html(this.template);
		return this;
	}
});