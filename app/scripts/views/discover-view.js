'use strict';

var DiscoverView = Parse.View.extend({
	el: '#view',
	template: _.template($('#discover-view-template').text()),

	render: function() {
		this.$el.html(this.template);
		return this;
	}
});