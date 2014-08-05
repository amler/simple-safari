'use strict';

var AddLocationView = Parse.View.extend({
	el: '#view',
	template: _.template($('#addlocation-view-template').text()),
	sectionName: '',
	events: {
		'userGeoLocated h2' : 'queryLocations'
	},
	render: function () {
		this.$el.html(this.template);
		this.sectionName = this.$el.find('h2').text();
		return this;
	}
});
