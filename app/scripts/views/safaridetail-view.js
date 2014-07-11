'use strict';
/* global userGeo */

var SafariDetailView = Parse.View.extend({
	el: '#view',
	template: _.template($('#safaridetail-view-template').text()),
	sectionName: '',
	events: {
		'userGeoLocated h2'					: 'queryLocations',
		'click .subscribe-scavengerhunt'	: 'subscribeToHunt',
		'click .unsubscribe-scavengerhunt'	: 'unsubscribeFromHunt',
	},
	model:'',
	render: function(model) {
		this.model = model;
		var renderedTemplate = this.template(model);
		this.$el.html(renderedTemplate);
		this.sectionName = this.$el.find('h2').text();
		// determine whether or not the user is subscribed
		// then show subscribe button or unsubscribe button
		$('.subscribe-scavengerhunt').show();
		return this;
	},
	queryLocations: function(event){
		if ($(event.currentTarget).text() === this.sectionName) {
			console.log(userGeo.latitude, userGeo.longitude);
		}
	},
	subscribeToHunt: function(event){
		$('.subscribe-scavengerhunt').hide();
		event.preventDefault();
		var user = Parse.User.current();
		var relation = user.relation('scavengerHunts');
		relation.add(this.model);
		user.save();
		$('.unsubscribe-scavengerhunt').show();
	},
	unsubscribeFromHunt: function(event){
		$('.unsubscribe-scavengerhunt').hide();
		event.preventDefault();

	}
});