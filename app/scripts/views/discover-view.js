'use strict';
/* global userGeo */

var DiscoverView = Parse.View.extend({
	el: '#view',
	template: _.template($('#discover-view-template').text()),
	sectionName: '',
	locations: [],
	events: {
		'userGeoLocated h2' : 'queryLocations'
	},
	render: function() {
		this.$el.html(this.template);
		this.sectionName = this.$el.find('h2').text();
		this.queryUsersHunts();	
		return this;
	},
	queryLocations: function(event){
		if ($(event.currentTarget).text() === this.sectionName) {
			console.log(userGeo.latitude, userGeo.longitude);
		}
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
	queryUsersLocations: function(safaris){
		var count = 0;
		var that = this;
		console.log(that.locations);
		safaris.forEach(function (safari){
			var relation = safari.relation('locations');
			var query = relation.query();
			query.find({
				success: function(results) {
					that.locations.push.apply(that.locations, results);
					count ++;
					if (count >= safaris.length) {
						console.log(count);
						console.log(safaris.length);
						// all done, next step is to render
					}
				},
				error: function(error) {
					console.log('Nope');
				}
			});
		});
	},


});