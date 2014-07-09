'use strict';

var SignUpView = Parse.View.extend({
	el: '#view',
	template: _.template($('#signup-view-template').text()),
	events: {
		'click .signup-button' : 'signup'
	},
	render: function() {
		this.$el.html(this.template);
		return this;
	},
	signup: function(event) {
		event.preventDefault();
		var userName = $('.signup-username').val();
		var userPassword = $('.signup-password').val();
		var userEmail = $('.signup-email').val();
		$('.signup-username').removeClass('input-error');
		$('.signup-password').removeClass('input-error');
		$('.signup-email').removeClass('input-error');

		if(!$('.signup-username').val()) {
			$('.signup-username').addClass('input-error');
		} else if (!$('.signup-password').val()) {
			$('.signup-password').addClass('input-error');
		} else if (!$('.signup-email').val()) {
			$('.signup-email').addClass('input-error');
		} else {
			var user = new Parse.User();
			user.set('username', userName);
			user.set('password', userPassword);
			user.set('email', userEmail);
			user.signUp(null, {
				success: function(user) {
					var currentUser = Parse.User.current();
					if(currentUser) {
						window.router.navigate('', {trigger:true});
						console.log('success signup');
					} else {
						alert('There was an error processing your information.');
					}
				},
				error: function(user, error) {
					alert('There was an error processing your information.');
				}
			});
		}
	}
});