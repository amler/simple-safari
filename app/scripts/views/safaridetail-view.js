
'use strict';
/* global userGeo, map */

var SafariDetailView = Parse.View.extend({
	el: '#view',
	template: _.template($('#safaridetail-view-template').text()),
	sectionName: '',
	events: {
		'userGeoLocated h2'					: 'queryLocations',
		'click .subscribe-scavengerhunt'	: 'subscribeToHunt',
		'click .unsubscribe-scavengerhunt'	: 'unsubscribeFromHunt',
	},
	scavengerHuntModel:'',
	render: function(model) {
		this.scavengerHuntModel = model;
		var renderedTemplate = this.template(model);
		this.$el.html(renderedTemplate);
		this.sectionName = this.$el.find('h2').text();
		var that = this;
		
		// determine whether or not the user is subscribed
		// then show subscribe button or unsubscribe button
		var user = Parse.User.current();
		var relation = user.relation('scavengerHunts');
		var query = relation.query();
		query.equalTo('objectId', this.scavengerHuntModel.id);
		query.find({
			success: function(results) {
				that.findLocationsForScavengerHunt();
				if (results.length > 0) {
					$('.unsubscribe-scavengerhunt').show();
				} else {
					$('.subscribe-scavengerhunt').show();
				}
			},
			error: function(error) {
				alert('There was an error determining if you are subscribed to this safari.');
			}
		});
		return this;
	},
	queryLocations: function(event){
		if ($(event.currentTarget).text() === this.sectionName) {
			console.log(userGeo.latitude, userGeo.longitude);
		}
	},
	subscribeToHunt: function(event){
		$('.subscribe-scavengerhunt').hide();
		event.preventDefault();
		var user = Parse.User.current();
		var relation = user.relation('scavengerHunts');
		relation.add(this.scavengerHuntModel);
		user.save();
		$('.unsubscribe-scavengerhunt').show();
	},
	unsubscribeFromHunt: function(event){
		$('.unsubscribe-scavengerhunt').hide();
		event.preventDefault();
		var user = Parse.User.current();
		var relation = user.relation('scavengerHunts');
		relation.remove(this.scavengerHuntModel);
		user.save();
		$('.subscribe-scavengerhunt').show();
	},
	findLocationsForScavengerHunt: function() {
		var relation = this.scavengerHuntModel.relation('locations');
		var query = relation.query();
		var point = new Parse.GeoPoint({latitude: userGeo.latitude, longitude: userGeo.longitude});
		query.withinMiles('geolocation', point, 30);
		query.find({
			success: function(results) {
				var templateMethod = _.template($('#location-listing-template').text());
				results.forEach(function(location) {
					var rendered = templateMethod(location);
					$('.selected-safari-locations').append(rendered);
					map.addMarker(1, location.attributes.geolocation._latitude, location.attributes.geolocation._longitude);
				});
			},
			error: function(error) {
				alert('error on rendering locations');
			}
		});
	}
});
