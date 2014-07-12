'use strict';
/* global userGeo, ScavengerHunt, map */

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
			var point = new Parse.GeoPoint({latitude: userGeo.latitude, longitude: userGeo.longitude});
			var query = new Parse.Query(ScavengerHunt);
			query.withinMiles('geolocation', point, 30);
			query.find({
				success: function(results) {
					var templateMethod = _.template($('#hunt-item-template').text());
					results.forEach(function(hunt) {
						var rendered = templateMethod(hunt);
						$('.nearby-safaris').append(rendered);
						map.addMarker(1, hunt.attributes.geolocation._latitude, hunt.attributes.geolocation._longitude);
					});
				},
				error: function(error) {
					alert('Error: ' + error.code + ' ' + error.message);
				}
			});
		}
	}
});



