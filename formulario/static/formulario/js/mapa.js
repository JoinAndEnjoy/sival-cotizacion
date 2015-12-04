/* global google */

/**
 * 
 */

var map;
var directionsDisplay;
var directionsService;
var tamano = 20;
var tamano2 = 20;


var markers = [];
var markers2 = [];
var waypts = [];
var internalmark = [];

var numPun = 0;

function initMap()
{
    $('.pws_tabs_list').css("height", tamano+"px");
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 4.7109903, lng: -74.0721436},
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();
    directionsDisplay.setMap(map);
    var tama = 8;
    for (i = 0; i < 8; i++)
    {
        internalmark.push(undefined);
    }


//	Create the search box and link it to the UI element.
    var input = document.getElementById('origen');
    var searchBox = new google.maps.places.SearchBox(input);

    var input2 = document.getElementById('destino');
    var searchBox2 = new google.maps.places.SearchBox(input2);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input); eliminar esta linea para mantener los estilos


    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
        searchBox2.setBounds(map.getBounds());
    });

    agregarListener("markers", searchBox);
    agregarListener("markers2", searchBox2);

}

function agregarListener(markersn, searchBoxn) {
    searchBoxn.addListener('places_changed', function () {
        var places = searchBoxn.getPlaces();
        if (places.length == 0) {
            return;
        }
        window[markersn].forEach(function (marker) {
            marker.setMap(null);
        });
        window[markersn] = [];

        var bounds = new google.maps.LatLngBounds();

        places.forEach(function (place) {
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            window[markersn].push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);

        calcRoute();
    });
}

function agregarListenerInternal(searchBoxn, index) {
    var markersn = [];
    var indice = index;
    searchBoxn.addListener('places_changed', function () {
        var places = searchBoxn.getPlaces();
        if (places.length == 0) {
            return;
        }
        markersn.forEach(function (marker) {
            marker.setMap(null);
        });
        markersn = [];

        var bounds = new google.maps.LatLngBounds();

        places.forEach(function (place) {
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markersn.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
        internalmark.splice(indice, 1, markersn[0])
        calcRoute();
    });
}


function calcRoute() {
    if (markers.length == 0 || markers2.length == 0) {
        return;
    }

    waypts = [];
    internalmark.forEach(function (punto) {
        if (punto != undefined)
        {
            waypts.push({
                location: punto.position,
                stopover: true
            });
        }

    });
    var start = markers[0].position;
    var end = markers2[0].position;
    var request = {
        origin: start,
        destination: end,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
    };
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
            eliminarMarks();
        }
    });
}

function eliminarMarks()
{
    markers.forEach(function (marker) {
        marker.setMap(null);
    });

    markers2.forEach(function (marker) {
        marker.setMap(null);
    });

    internalmark.forEach(function (marker) {
        if (marker != undefined)
            marker.setMap(null);
    });
}

$("#fecha").focus(function () {
    $("#icono-fecha").css("color", "#2e3436");
});

$("#fecha").focusout(function () {
    $("#icono-fecha").css("color", "#b6b6b6");
});

$('#definir-ruta').click(function () {
    tamano += 40;
    if(tamano<150)
        $('.pws_tabs_list').css("height", tamano+"px");
    numPun++;
    if (numPun < 9)
    {
        $('#puntos-div').css("display", "block");
        $('#puntos-div').append("<div class = 'punto-int'>\
				<div class='inner-addon left-addon'>\
				<input type='text' name='origen' id='intermedio" + numPun + "'\
				placeholder='Punto intermedio " + numPun + "' class='botones-fomulario punto-int-input' required>\
				<i class='glyphicon glyphicon-map-marker mis-iconos'></i> \
		</div>");

        $('#puntos-div').animate({
            scrollTop: 1000
        }, 600);
        var input = document.getElementById('intermedio' + numPun);
        var searchBox = new google.maps.places.SearchBox(input);
        agregarListenerInternal(searchBox, numPun - 1);
    } else
    {
        alert("No se pueden definir más puntos")
    }
});

// script tablas

jQuery(document).ready(function ($) {
    $('.tabla').pwstabs();
});

$('#ida').click(function (){
    $('.pws_tabs_list').css("height", tamano+"px");
});

$('#vuelta').click(function (){
    $('.pws_tabs_list').css("height", tamano2+"px");
});

