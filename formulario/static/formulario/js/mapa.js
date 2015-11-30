/**
 * 
 */

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 4.378872703630117, lng:-73.59086318750002},
    zoom: 6
  });
}