/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var directionsDisplay;
var directionsService;
var map;

function initMap()
{
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 4.7109903, lng: -74.0721436},
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    directionsService = new google.maps.DirectionsService();
    ida = JSON.parse(ida.replace(/&quot;/g,'"'));
    vuelta = JSON.parse(vuelta.replace(/&quot;/g,'"'));
    calcRoute(ida);
    //calcRoute(vuelta);
}

function renderDirections(result) {
  var directionsRenderer = new google.maps.DirectionsRenderer;
  directionsRenderer.setMap(map);
  directionsRenderer.setDirections(result);
}

function calcRoute(puntos) {
    var tam = puntos.length -1;
    var start = new google.maps.LatLng(parseFloat(puntos[0].lat), parseFloat(puntos[0].lng));
    var end = new google.maps.LatLng(parseFloat(puntos[tam].lat), parseFloat(puntos[tam].lng));
    waypts = [];
    for (i=1;i<tam;i++)
    {
        var posicion = {lat: parseFloat(puntos[i].lat), lng: parseFloat(puntos[i].lng)};
        waypts.push({
                location: posicion,
                stopover: true
            });
    }
    
    var request = {
        origin: start,
        destination: end,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            renderDirections(result);
        }
    });
}