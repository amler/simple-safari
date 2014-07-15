'use strict';
/* global userGeo, ScavengerHunt */

var SafarisView = Parse.View.extend({
	el: '#view',
	template: _.template($('#safaris-view-template').text()),
	events: {
		'click .unsubscribe-safari-view' : 'retrieveHunt'
	},
	selectedHunt:'',
	render: function() {
		this.$el.html(this.template);
		this.sectionName = this.$el.find('h2').text();
		this.queryUserScavengerHunts();
		return this;
	},
	queryUserScavengerHunts: function() {	
		var user = Parse.User.current();
		var relation = user.relation('scavengerHunts');
		var query = relation.query();
		// query.equalTo('objectId', this.scavengerHuntModel.id);
		query.find({
			success: function(results) {
				var sarfariListTemplate = _.template($('#safaris-listing-template').text());
				results.forEach(function(hunt){
					var rendered = sarfariListTemplate(hunt);
					$('.users-scavengerhunt-list').append(rendered);
				});
			},
			error: function(error) {
				console.log('error: ', error);
			}
		});
	},
	retrieveHunt: function(event){
		var that = this;
		var huntObjectId = $(event.currentTarget).data('object-id');
		var query = new Parse.Query(ScavengerHunt);
		query.equalTo('objectId', huntObjectId);
		query.find({
			success: function(results) {
				results.forEach(function(hunt){
					that.selectedHunt = hunt;
					that.unsubscribe();
				});
			},
			error: function(error) {
				alert('Error: ' + error.code + ' ' + error.message);
			}
		});
	},
	unsubscribe: function(){
		var user = Parse.User.current();
		var relation = user.relation('scavengerHunts');
		relation.remove(this.selectedHunt);
		user.save();
		this.render();
	}	
});