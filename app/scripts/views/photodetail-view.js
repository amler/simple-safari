'use strict';

var PhotoDetailView = Parse.View.extend({
	el: '#view',
	template: _.template($('#photodetail-view-template').text()),

	render: function(model) {
		var renderedTemplate = this.template(model);
		console.log('this model in the detail view: ', model.attributes);
		this.$el.html(renderedTemplate);
		return this;
	},
	findPhoto: function(id) {
		var that = this;
		var Photo = Parse.Object.extend('Photo');
		var query = new Parse.Query(Photo);
		query.get(id, {
			success: function(photo) {
			// The object was retrieved successfully.
				that.render(photo);
			},
			error: function(object, error) {
			// The object was not retrieved successfully.
			// error is a Parse.Error with an error code and description.
			}
		});
	}
});