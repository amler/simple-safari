'use strict';

var SafarisView = Parse.View.extend({
	el: '#view',
	template: _.template($('#safaris-view-template').text()),

	render: function() {
		this.$el.html(this.template);
		return this;
	}
});