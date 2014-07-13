'use strict';
/* global userGeo, map, ScavengerHunt, helper, Photo, Location, PhotoCollection*/

var DiscoverView = Parse.View.extend({
	el: '#view',
	template: _.template($('#discover-view-template').text()),
	sectionName: '',
	locations: [],
	events: {
		'userGeoLocated h2' : 'userLocated',
		'userGeoWatched h2' : 'userWatched',
		'change .photo'		: 'photoCaptured'
	},
	render: function () {
		this.$el.html(this.template);
		this.sectionName = this.$el.find('h2').text();
		this.queryUsersHunts();	
		return this;
	},
	queryUsersHunts: function(){
		var that = this;
		var user = Parse.User.current();
		var relation = user.relation('scavengerHunts');
		var query = relation.query();
		query.find({
			success: function(results) {
				that.queryUsersLocations(results);
			},
			error: function(error) {
				console.log('Nope');
			}
		});
	},
	queryUsersLocations: function(safaris) {
		var count = 0;
		this.locations = [];
		var that = this;
		safaris.forEach(function(safari) {
			var relation = safari.relation('locations');
			var query = relation.query();
			query.find({
				success: function(results) {
					that.locations.push.apply(that.locations, results);
					count ++;
					if (count >= safaris.length) {
						that.addLocationsToMap();
					}
				},
				error: function(error) {
					console.log('There was an error: ', error);
				}
			});
		});
	},
	addLocationsToMap: function() {
		this.locations.forEach(function(location) {
			map.addMarker(1, location.attributes.geolocation._latitude, location.attributes.geolocation._longitude);
		});
		userGeo.findLocation();
	},
	userLocated: function(event) {
		if ($(event.currentTarget).text() === this.sectionName) {
			this.userLocationUpdated();
			userGeo.watchLocation();
		}
	},
	userWatched: function(event) {
		if ($(event.currentTarget).text() === this.sectionName) {
			this.userLocationUpdated();
		}
	},
	userLocationUpdated: function() {
		var templateMethod = _.template($('#location-item-template').text());
		this.locations.forEach(function(location) {
			var distance = helper.getDistance(userGeo.latitude, userGeo.longitude, location.attributes.geolocation._latitude, location.attributes.geolocation._longitude);
			if (distance <= 1) {
				var rendered = templateMethod(location);
				$('.nearby-safaris').append(rendered);
			}
		});
	},
	photoCaptured: function(event){
		var objectId = $(event.currentTarget).data('object-id');
		console.log(objectId);
		console.log('photoCaptured');
		// save a photo to parse 
		// once I get a photo detail page redirect to page.

		var fileUploadControl = $(event.currentTarget)[0];
		if (fileUploadControl.files.length > 0) {
			var file = fileUploadControl.files[0];
			var name = 'photo.png'; // TO-DO: make something else
			var parseFile = new Parse.File(name, file);

			parseFile.save().then(function() {
				// The file has been saved to Parse.
				// alert('New object created with objectId: ' + photo.id);
				var currentUser = Parse.User.current();
				var photo = new Photo();
				var point = new Parse.GeoPoint({latitude: userGeo.latitude, longitude: userGeo.longitude });
				var location = new Location();
				location.id = objectId;
				// set location
				// set photo
				// set user
				photo.set('geolocation', point);
				photo.set('location', location);
				photo.set('photo', parseFile);
				photo.set('user', currentUser);

				photo.save().done(function(){
					alert('Upload successful');
				});

			}, function(error) {
				// The file either could not be read, or could not be saved to Parse.
				alert('Failed to create new object, with error code: ' + error);
			});
		}	
	}
});



