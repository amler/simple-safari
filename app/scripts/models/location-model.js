'use strict';

var Location = Parse.Object.extend({
	className: 'Location',
});

var LocationsCollection = Parse.Collection.extend({
	model: Location
});