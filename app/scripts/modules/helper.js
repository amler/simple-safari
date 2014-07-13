'use strict';
/* global userGeo, LatLon */

var helper = {
	getDistance: function(lat1, lon1, lat2, lon2) {
		var p1 = new LatLon(lat1, lon1);
		var p2 = new LatLon(lat2, lon2);
		var dist = p1.distanceTo(p2);
		return dist * 0.621371; // convert km to miles
	}		
};

