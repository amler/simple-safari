'use strict';
/* global userGeo */

var SafariDetailView = Parse.View.extend({
	el: '#view',
	template: _.template($('#safaridetail-view-template').text()),
	sectionName: '',
	events: {
		'userGeoLocated h2' : 'queryLocations'
	},
	render: function(model) {
		console.log('this should be a model ', model);
		var renderedTemplate = this.template(model);
		this.$el.html(renderedTemplate);
		this.sectionName = this.$el.find('h2').text();
		return this;
	},
	queryLocations: function(event){
		if ($(event.currentTarget).text() === this.sectionName) {
			console.log(userGeo.latitude, userGeo.longitude);
		}
	}
});