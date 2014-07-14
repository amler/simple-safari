'use strict';

var PhotoDetailView = Parse.View.extend({
	el: '#view',
	template: _.template($('#photodetail-view-template').text()),

	render: function(model) {
		var renderedTemplate = this.template(model);
		// console.log('this model in the detail view: ', model.attributes);
		this.$el.html(renderedTemplate);
		return this;
	},
	findPhoto: function(id) {
		var that = this;
		var Photo = Parse.Object.extend('Photo');
		var query = new Parse.Query(Photo);
		query.get(id, {
			success: function(photo) {
			// The object was retrieved successfully.
				that.render(photo);
				that.findPhotoLocation(photo);
			},
			error: function(object, error) {
			// The object was not retrieved successfully.
			// error is a Parse.Error with an error code and description.
				alert('There was an error retrieving you photo');
			}
		});
	},
	findPhotoLocation: function(photoModel) {
		console.log(photoModel);
		var photoLocation = photoModel.get('location');
		photoLocation.fetch({
			success: function(local) {
				var title = local.get('name');
				console.log(local);
				console.log(title);
			}
		});

		// var query = relation.query();
		// query.find({
		// 	success: function(results) {
		// 		console.log(results);
		// 	},

		// 	error: function(error) {
		// 		console.log('error on rendering locations');
		// 	}
		// });
		// var photoLocation = photoModel.attributes.location.id;
		// var query = new Parse.Query(Location);
		// query.equalTo('objectId', photoLocation);
		// query.get({
		// 	success: function(results) {
		// 		console.log(results);
		// 		results.forEach(function(location){
		// 			console.log(location);
		// 		});
		// 	},
		// 	error: function(error) {
		// 		alert('Error: ' + error.code + ' ' + error.message);
		// 	}
		// });

	}
});