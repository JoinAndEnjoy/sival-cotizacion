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


$("#fecha").focus(function(){
	$("#icono-fecha").css("color","#2e3436");
});

$("#fecha").focusout(function(){
	$("#icono-fecha").css("color","#b6b6b6");
});
