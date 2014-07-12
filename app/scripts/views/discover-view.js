'use strict';
/* global userGeo, map, ScavengerHunt, helper*/

var DiscoverView = Parse.View.extend({
	el: '#view',
	template: _.template($('#discover-view-template').text()),
	sectionName: '',
	locations: [],
	events: {
		'userGeoLocated h2' : 'userLocated',
		'userGeoWatched h2' : 'userWatched',
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
			if (distance <= 0.05) {
				console.log(location);
				var rendered = templateMethod(location);
				$('.nearby-safaris').append(rendered);
			}
		});
	}
});

