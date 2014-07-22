'use strict';
/* global Photo, Location, userGeo, map, views */

var LocationDetailView = Parse.View.extend({
	el: '#view',
	template: _.template($('#detail-location-template').text()),
	sectionName: '',
	selectedLocation: '',
	render: function() {
		this.$el.html(this.template);
		this.sectionName = this.$el.find('h2').text();
		return this;
	},
	subscribedPhoto: function(id) {
		var that = this;
		var query = new Parse.Query(Location);
		query.equalTo('objectId', id);
		query.find({
			success: function(results) {
				var templateMethod = _.template($('#location-name-template').text());
				results.forEach(function(location){
					that.selectedLocation = location;
					that.queryLocationPhotos();
					that.render();
					var rendered = templateMethod(location);
					$('.location-detail').append(rendered);
					map.deleteMarker(0);
					map.addMarker(1, location.attributes.geolocation._latitude, location.attributes.geolocation._longitude);
					map.zoomMapToFitAllMarkers();
				});
			},
			error: function(error) {
				console.log('Error: ' + error.code + ' ' + error.message);
			}
		});
	},
	queryLocationPhotos: function() {
		var location = this.selectedLocation;
		var Photo = Parse.Object.extend('Photo');
		var query = new Parse.Query(Photo);
		query.descending('createdAt');
		query.equalTo('location', location);
		query.limit(10);
		query.find({
			success: function(results) {
				var templateMethod = _.template($('#location-photolist-template').text());
				results.forEach(function(photo) {
					var rendered = templateMethod(photo);
					$('.subscribed-photolist').append(rendered);
				});
			},
			error: function(error) {
				console.log(error);
			}
		});
	}
});


