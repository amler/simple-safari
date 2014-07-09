'use strict';

var DashboardView = Parse.View.extend({
	el: '#view',
	template: _.template($('#dashboard-view-template').text()),

	render: function() {
		this.$el.html(this.template);
		return this;
	}
});