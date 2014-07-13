'use strict';
/* global userGeo */

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
		
		// determine whether or not the user is subscribed
		// then show subscribe button or unsubscribe button
		var user = Parse.User.current();
		var relation = user.relation('scavengerHunts');
		var query = relation.query();
		var that = this;
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
		query.find({
			success: function(results) {
				console.log(results);
			},
			error: function(error) {
			}
		});
	}
});