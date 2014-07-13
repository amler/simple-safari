'use strict';

var Photo = Parse.Object.extend({
	className: 'Photo'
});

var PhotoCollection = Parse.Collection.extend({
	model: Photo
});
