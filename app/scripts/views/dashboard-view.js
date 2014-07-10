'use strict';
/* global userGeo, ScavengerHunt */

var DashboardView = Parse.View.extend({
	el: '#view',
	template: _.template($('#dashboard-view-template').text()),
	sectionName: '',
	events: {
		'userGeoLocated h2' : 'queryLocations'
	},
	render: function() {
		this.$el.html(this.template);
		this.sectionName = this.$el.find('h2').text();
		return this;
	},
	queryLocations: function(event){
		if ($(event.currentTarget).text() === this.sectionName) {
			console.log(userGeo.latitude, userGeo.longitude);
			var point = new Parse.GeoPoint({latitude: userGeo.latitude, longitude: userGeo.longitude});
			var query = new Parse.Query(ScavengerHunt);
			// query.near('geolocation', point);
			query.withinMiles('geolocation', point, 30);
			query.find({
				success: function(results) {
					console.log(results);

				},
				error: function(error) {
					alert('Error: ' + error.code + ' ' + error.message);
				}
			});
			// when you get hunts results update map
			// update list of scavenger hunts
		}
	}
});

