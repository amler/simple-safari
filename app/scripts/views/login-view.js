'use strict';

var LoginView = Parse.View.extend({
	el: '#view',
	template: _.template($('#login-view-template').text()),
	events: {
		'click .login-button' : 'login'
	},
	render: function() {
		this.$el.html(this.template);
		return this;
	},
	login: function(event) {
		event.preventDefault();
		var userName = $('.login-username').val();
		var userPassword = $('.login-password').val();
		$('.login-username').removeClass('input-error');
		$('.login-password').removeClass('input-error');
		if (!$('.login-username').val()) {
			$('.login-username').addClass('input-error');
		} else if (!$('.login-password').val()) {
			$('.login-password').addClass('input-error');
		} else {
			Parse.User.logIn(userName, userPassword, {
				ACL: new Parse.ACL(),
				success: function(user) {
					var currentUser = Parse.User.current();
					var token = Parse.User.current()._sessionToken;
					if(currentUser) {
						// console.log('success login');
						Parse.User.become(currentUser._sessionToken).then(function(user){
							// console.log('login successful');
						});
						window.router.navigate('', {trigger:true});
					} else {
						alert('There was an error with your login');
					}
				},
				error: function(user, error) {
					alert('login does not work');
				},
			});
		}
	}
});