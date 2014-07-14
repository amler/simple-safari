'use strict';


var LocationDetailView = Parse.View.extend({
	el: '#view',
	template: _.template($('#detail-locations-template').text()),
	sectionName: '',
	events: {
		'userGeoLocated h2' : 'queryLocations'
	},
	render: function(id) {
		this.$el.html(this.template);
		this.sectionName = this.$el.find('h2').text();
		console.log(id);
		return this;
	},
	queryLocations: function(event){
		if ($(event.currentTarget).text() === this.sectionName) {
			console.log('location fired')
		}
	}
});