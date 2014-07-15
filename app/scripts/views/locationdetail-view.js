'use strict';
/* global Photo, Location, userGeo */

var LocationDetailView = Parse.View.extend({
	el: '#view',
	template: _.template($('#detail-location-template').text()),
	sectionName: '',
	
	events: {
		'userGeoLocated h2' : 'queryLocations'
	},
	selectedLocation: '',
	render: function() {
		this.$el.html(this.template);
		this.sectionName = this.$el.find('h2').text();
		return this;
	},
	queryLocations: function(event){
		if ($(event.currentTarget).text() === this.sectionName) {
			console.log(userGeo.latitude, userGeo.longitude);
		}
	},

	subscribedPhoto: function(id) {
		var that = this;
		var query = new Parse.Query(Location);
		query.equalTo('objectId', id);
		query.find({
			success: function(results) {
				results.forEach(function(location){
					that.selectedLocation = location;
					that.queryLocationPhotos();
					map.deleteMarker(0)
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
		console.log(location);
		var Photo = Parse.Object.extend('Photo');
		var query = new Parse.Query(Photo);
		query.find({
			success: function(results) {
				console.log('this is a success: ', results);
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


