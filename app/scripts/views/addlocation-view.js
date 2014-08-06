'use strict';
/* global map, userGeo */

var AddLocationView = Parse.View.extend({
	el: '#view',
	template: _.template($('#addlocation-view-template').text()),
	events: {
		'click .get-geolocation'	: 'getGeoLocation',
		// 'click .save-safari'		: 'saveSafari',
		'click .save-geolocation'	: 'saveLocation'
	},
	render: function() {
		this.$el.html(this.template);
		this.queryScavengerHunts();
		userGeo.findLocation();
		return this;
	},
	queryScavengerHunts: function() {
		var that = this;
		var templateMethod = _.template($('#addlocation-menu-template').text());
		var ScavengerHunt = Parse.Object.extend('ScavengerHunt');
		var query = new Parse.Query(ScavengerHunt);
		query.ascending('name');
		query.find({
			success: function(results) {
				results.forEach(function(safari){
					$('#safari').append(templateMethod(safari));
				});
			},
			error: function(error) {
				alert('There was a problem ', error);
			}
		});
	},
	getGeoLocation: function(event) {
		event.preventDefault();
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				console.log('Latitude: ' + position.coords.latitude + 'Longitude: ' + position.coords.longitude);
				$('#latitude').val(position.coords.latitude);
				$('#longitude').val(position.coords.longitude);
				map.deleteMarker(0);
				map.addMarker(1, position.coords.latitude, position.coords.longitude);
				map.zoomMapToFitAllMarkers();
			});
		} else { 
			console.log('Geolocation is not supported by this browser.');	
		}
	},
	saveLocation: function(event){
		event.preventDefault();
		var safariID = $('#safari').val();
		var locationName = $('#location-name').val();
		var locationDescription = $('#location-description').val();
		var newLatitude = parseFloat($('#latitude').val());
		var newLongitude = parseFloat($('#longitude').val());

		var Location = Parse.Object.extend('Location');
		var location = new Location();

		location.save({
			name: locationName,
			geolocation: new Parse.GeoPoint({latitude: newLatitude, longitude: newLongitude}),
			description: locationDescription
		}, {
			success: function(local) {
			// The object was saved successfully.
				alert('saved');
				console.log(local);
				var ScavengerHunt = Parse.Object.extend('ScavengerHunt');
				var scavengerHunt = new ScavengerHunt();
				scavengerHunt.id = safariID;
				var relation = scavengerHunt.relation('locations').add(location);
				scavengerHunt.save();
			},
			error: function(scavengerHunt, error) {
			// The save failed.
				console.log('scavhunt: ', scavengerHunt);
				console.log('error: ', error);
			// error is a Parse.Error with an error code and description.
				alert('There was an error with Parse.');
			}
		});
	}
});

