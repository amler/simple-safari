'use strict';

var LoginView = Parse.View.extend({
	el: '#view',
	template: _.template($('#login-view-template').text()),

	render: function() {
		this.$el.html(this.template);
		return this;
	}
});