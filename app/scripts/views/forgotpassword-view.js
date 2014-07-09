'use strict';

var ForgotPasswordView = Parse.View.extend({
	el: '#view',
	template: _.template($('#forgotpassword-view-template').text()),
	events: {
		'click .forgot-password-button' : 'password'
	},
	render: function() {
		this.$el.html(this.template);
		return this;
	},
	password: function(event) {
		event.preventDefault();
		var forgotEmail = $('.enter-email').val();
		Parse.User.requestPasswordReset(forgotEmail, {
			success: function() {
				alert('An email has been sent. Please be sure to check your spam folder!');
				window.router.navigate('login', {trigger:true});
				//password reset request sent successfully
			},

			error: function(error) {
				//show the error message somewhere
				alert('There was a problem processing your request.');
			}
		});
	}
});