'use strict';
/* global views*/

var UserPhotosView = Parse.View.extend({
	el: '#view',
	template: _.template($('#userphotos-view-template').text()),

	render: function() {
		this.$el.html(this.template);
		this.findUserPhotos();
		return this;
	},
	findUserPhotos: function() {
		var that = this;
		var templateMethod = _.template($('#userimage-thumbnail-template').text());
		var user = Parse.User.current();
		var Photo = Parse.Object.extend('Photo');
		var query = new Parse.Query(Photo);
		query.equalTo('user', user);
		query.find({
			success: function(object) {
			// Successfully retrieved the object.
				console.log('this is a sucees', object);
				object.forEach(function(photo){
					console.log(photo);
					var rendered = templateMethod(photo);
					$('.users-images').append(rendered);
				});
			},
			error: function(error) {
				alert('Error: ' + error.code + ' ' + error.message);
			}
		});
	}
});