'use strict';

var HomeView = Parse.View.extend({
	el: '#view',
	template: _.template($('#home-view-template').text()),

	render: function() {
		this.$el.html(this.template);
		return this;
	}
});