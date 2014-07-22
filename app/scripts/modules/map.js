'use strict';

function Map (elementID) {
    this.markers = [];
    this.images = [
        '../images/map-markers/user.png',
        '../images/map-markers/pin.png',
        '../images/map-markers/flag.png'
    ];

    var greenville = new google.maps.LatLng(34.853738, -82.395618);
    var mapOptions = {
        zoom: 13,
        center: greenville,
        // disableDefaultUI: true,
        // panControl: false,
        // draggable: false
    };
    this.map = new google.maps.Map(document.getElementById(elementID), mapOptions);
    this.addMarker(0, 34.853738, -82.395618);
}

Map.prototype.addMarker = function(imageIndex, latitude, longitude) {
    var position = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
        position: position,
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: {
            url: this.images[imageIndex],
            size: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(25, 50),
            scaledSize: new google.maps.Size(50, 50)
        }
    });
    this.markers.push(marker);
    return marker;  
};

Map.prototype.showAllMarkers = function() {
    for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(this.map);
    }
};

Map.prototype.hideAllMarkers = function() {
    for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
    }
};

Map.prototype.deleteMarker = function(index){
    this.markers[index].setMap(null);
    this.markers.splice(index, 1);
};

Map.prototype.deleteAllMarkers = function() {
    this.hideAllMarkers();
    this.markers = [];
    this.addMarker(0, 34.853738, -82.395618);
};

Map.prototype.updateMarkerPosition = function(index, latitude, longitude) {
    var position = new google.maps.LatLng(latitude, longitude);
    this.markers[index].setPosition(position);
};

Map.prototype.centerMapAtPosition = function(latitude, longitude) {
    var position = new google.maps.LatLng(latitude, longitude);
    this.map.panTo(position);
};

Map.prototype.zoomMapToFitAllMarkers = function() {
    var bounds = new google.maps.LatLngBounds();
    for (var i=0; i < this.markers.length; i++) {
        bounds.extend(this.markers[i].getPosition());
    }
    this.map.fitBounds(bounds);
};

Map.prototype.redraw = function() {
    google.maps.event.trigger(this.map, 'resize');
    this.map.setZoom( this.map.getZoom() );
};
