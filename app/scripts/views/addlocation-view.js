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
	getGeoLocation: function() {
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
	// saveSafari: function(){
	// 	console.log('saveSafari is firing');
	// }
	saveLocation: function(event){
		event.preventDefault();

		var safariID = $('#safari').val();
		console.log(safariID);
		// saving a geopoint
		// var point = new Parse.GeoPoint({latitude: 40.0, longitude: -30.0});
		
		// placeObject.set("location", point);

		// // saving an object
		// var GameScore = Parse.Object.extend("GameScore");
		// var gameScore = new GameScore();
		// gameScore.save({
		// 	score: 1337,
		// 	playerName: "Sean Plott",
		// 	cheatMode: false
		// }, {
		// 	success: function(gameScore) {
		// 	// The object was saved successfully.
		// 	},
		// 	error: function(gameScore, error) {
		// 	// The save failed.
		// 	// error is a Parse.Error with an error code and description.
		// 	}
		// });
	}
});
