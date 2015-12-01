/**
 * 
 */

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 4.7109903, lng:-74.0721436},
    zoom: 13
  });
}

$(function () {
	$('#fecha').datetimepicker();
});