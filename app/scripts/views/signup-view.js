'use strict';

var SignUpView = Parse.View.extend({
	el: '#view',
	template: _.template($('#signup-view-template').text()),

	render: function() {
		this.$el.html(this.template);
		return this;
	}
});