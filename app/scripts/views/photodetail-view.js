'use strict';
/* global map */

var PhotoDetailView = Parse.View.extend({
	el: '#view',
	template: _.template($('#photodetail-view-template').text()),
	render: function(model) {
		var renderedTemplate = this.template(model);
		this.$el.html(renderedTemplate);
		return this;
	},
	findPhoto: function(id) {
		var that = this;
		var Photo = Parse.Object.extend('Photo');
		var query = new Parse.Query(Photo);
		query.get(id, {
			success: function(photo) {
				that.render(photo);
				that.findPhotoLocation(photo);
			},
			error: function(object, error) {
				alert('There was an error retrieving your photo');
			}
		});
	},
	findPhotoLocation: function(photoModel) {
		var photoLocation = photoModel.get('location');
		photoLocation.fetch({
			success: function(photolocationModel) {
				var templateMethod = _.template($('#fetched-location-template').text());
				var rendered = templateMethod(photolocationModel);
				$('.photodetail-location-name').append(rendered);
				map.deleteMarker(0);
				map.addMarker(1, photolocationModel.attributes.geolocation._latitude, photolocationModel.attributes.geolocation._longitude);
				map.zoomMapToFitAllMarkers();
			},
			error: function(object, error) {
				alert('There was an error getting the location of your photo.');
			}
		});
	}
});