'use strict';

var userGeo = {
	latitude: '',
	longitude: '',
	watchID: 0,
	findLocation: function(){
		var that = this;
		if (!navigator.geolocation){
			alert('Geolocation is not supported by your browser');
			return;
		}
		navigator.geolocation.getCurrentPosition(function(position) {
			that.latitude = position.coords.latitude;
			that.longitude = position.coords.longitude;
			window.map.updateMarkerPosition(0, position.coords.latitude, position.coords.longitude);
			window.map.centerMapAtPosition(position.coords.latitude, position.coords.longitude);
			$('#view h2').trigger('userGeoLocated');
		});

	},
	watchLocation: function(position){
		var that = this;
		if (!navigator.geolocation){
			alert('Geolocation is not supported by your browser');
			return;
		}
		navigator.geolocation.watchPosition(function(position){
			that.latitude = position.coords.latitude;
			that.longitude = position.coords.longitude;
			window.map.updateMarkerPosition(0, position.coords.latitude, position.coords.longitude);
			window.map.centerMapAtPosition(position.coords.latitude, position.coords.longitude);
			$('#view h2').trigger('userGeoWatched');
		});
	},
	clearWatchLocation: function(watchID){
		navigator.geolocation.clearWatch(this.watchID);
	}
};

