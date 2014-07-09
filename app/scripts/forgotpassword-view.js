'use strict';

var ForgotPasswordView = Parse.View.extend({
	el: '#view',
	template: _.template($('#forgotpassword-view-template').text()),

	render: function() {
		this.$el.html(this.template);
		return this;
	}
});