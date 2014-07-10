'use strict';

var ScavengerHunt = Parse.Object.extend({
	className: 'ScavengerHunt',
});

var ScavengerHuntsCollection = Parse.Collection.extend({
	model: ScavengerHunt
});
