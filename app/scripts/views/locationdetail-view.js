'use strict';
/* global Photo, Location, userGeo */

var LocationDetailView = Parse.View.extend({
	el: '#view',
	template: _.template($('#detail-location-template').text()),
	sectionName: '',
	events: {
		'userGeoLocated h2' : 'queryLocations'
	},
	selectedLocation: '',
	render: function() {
		this.$el.html(this.template);
		this.sectionName = this.$el.find('h2').text();
		return this;
	},
	queryLocations: function(event){
		if ($(event.currentTarget).text() === this.sectionName) {
			console.log(userGeo.latitude, userGeo.longitude);
		}
	},

	subscribedPhoto: function(id) {
		var that = this;
		var query = new Parse.Query(Location);
		query.equalTo('objectId', id);
		query.find({
			success: function(results) {
				results.forEach(function(location){
					that.selectedLocation = location;
					that.queryLocationPhotos();
				});
			},
			error: function(error) {
				console.log('Error: ' + error.code + ' ' + error.message);
			}
		});
	},
	//queryLocationPhotos: function() {
		// var relation = this.selectedLocation.relation('location');
		// console.log(relation);
		// var query = relation.query();
		//var photo = new Photo();
		// var relation = this.selectedLocation.relation('location');
		//query.find({
			//success: function(results) {
				//console.log(results);
			//},
			//error: function(error) {
				//console.log(error);
			//}
		//})
	//}
});


