'use strict';
/* global map, userGeo */

var AddLocationView = Parse.View.extend({
	el: '#view',
	template: _.template($('#addlocation-view-template').text()),
	events: {
		'click .get-geolocation'	: 'getGeoLocation',
		'click .save-safari'		: 'saveSafari',
		'click .save-geolocation'	: 'saveLocation',
		// 'click .save-safari'		: 'saveSafari',
		// 'click .save-geolocation'	: 'saveLocation'
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
	saveSafari: function(event) {
		// event.preventDefault();
		// "#safari-name" // Name your Safari
		// "#safari-description" // Describe your safari.
		// "#safari-latitude" // Latitude
		// "#safari-longitude"  // Longitude
	},
	saveLocation: function(event){
		event.preventDefault();

		var safariID = $('#safari').val();
		var locationName = $('#location-name').val();
		var locationDescription = $('#location-description').val();
		var newLatitude = parseFloat($('#latitude').val());
		var newLongitude = parseFloat($('#longitude').val());

		if (!safariID) {
			alert('Please selet a safari.');
		} else if (!locationName) {
			alert('Please name this location.');
		} else if (!locationDescription) {
			alert('Please enter a brief description.');
		} else if (!newLatitude) {
			alert('Please enter a latitude value.');
			return;
		} else if (!newLongitude) {
			alert('Please enter a longitude value.');
			return;
		} else {
			var Location = Parse.Object.extend('Location');
			var location = new Location();
			location.save({
				name: locationName,
				geolocation: new Parse.GeoPoint({latitude: newLatitude, longitude: newLongitude}),
				description: locationDescription
			}, {
				success: function(local) {
				// The object was saved successfully.
					alert('The location has been saved!');
					var ScavengerHunt = Parse.Object.extend('ScavengerHunt');
					var scavengerHunt = new ScavengerHunt();
					scavengerHunt.id = safariID;
					var relation = scavengerHunt.relation('locations').add(location);
					scavengerHunt.save();
					$('#safari').val('');
					$('#location-name').val('');
					$('#location-description').val('');
					$('#latitude').val('');
					$('#longitude').val('');
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
	}
});