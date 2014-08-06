'use strict';

var AddLocationView = Parse.View.extend({
	el: '#view',
	template: _.template($('#addlocation-view-template').text()),
	sectionName: '',
	events: {
		// 'userGeoLocated h2' : 'queryLocations'
	},
	render: function() {
		this.$el.html(this.template);
		this.sectionName = this.$el.find('h2').text();
		this.queryScavengerHunts();
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
					console.log(safari);
					$('#safari').append(templateMethod(safari));
				});
			},
			error: function(error) {
				alert('There was a problem ', error);
			}

		});
	}
});
