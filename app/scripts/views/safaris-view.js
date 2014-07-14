'use strict';
/* global userGeo */

var SafarisView = Parse.View.extend({
	el: '#view',
	template: _.template($('#safaris-view-template').text()),
	sectionName: '',
	events: {
		'userGeoLocated h2' : 'queryLocations'
	},
	render: function() {
		this.$el.html(this.template);
		this.sectionName = this.$el.find('h2').text();
		this.queryUserScavengerHunts();
		return this;
	},
	queryLocations: function(event) {
		if ($(event.currentTarget).text() === this.sectionName) {
			console.log(userGeo.latitude, userGeo.longitude);
		}
	},

	queryUserScavengerHunts: function() {	
		var user = Parse.User.current();
		var relation = user.relation('scavengerHunts');
		console.log(user);
		var query = relation.query();
		// query.equalTo('objectId', this.scavengerHuntModel.id);
		query.find({
			success: function(results) {
				var sarfariListTemplate = _.template($('#safaris-listing-template').text());
				results.forEach(function(hunt){
					console.log('these are the user\'s hunts: ', hunt);
					var rendered = sarfariListTemplate(hunt);
					$('.users-scavengerhunt-list').append(rendered);
				});
			},
			error: function(error) {
				console.log('Fuck error: ', error);
			}
		});
	}
});