var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var directionsMap;
var z = document.getElementById("directions-canvas");
var start;
var end;

function getDirectionsLocation() {
    console.log("getDirectionsLocation");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showDirectionsPosition);
    } else {
        z.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showDirectionsPosition(position) {
    console.log("showDirectionsPosition");
    directionsLatitude = position.coords.latitude;
    directionsLongitude = position.coords.longitude;
    directionsLatLng = new google.maps.LatLng(directionsLatitude,directionsLongitude);
    getDirections();
}

function getDirections() {
    console.log('getDirections');
    directionsDisplay = new google.maps.DirectionsRenderer();
    //start = new google.maps.LatLng(directionsLatLng);
    var directionsOptions = {
        zoom:12,
        center: start
    }
    directionsMap = new google.maps.Map(document.getElementById("map"), directionsOptions);
    directionsDisplay.setMap(directionsMap);
    RouteDetails();
}

function RouteDetails() {
    start = directionsLatLng;
    end = $("#destination").val();
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });
}

$( document ).ready(function( event ) {
    $('.btn').click(function(){
    getDirectionsLocation();
    })
});