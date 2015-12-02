/**
 * 
 */

var map;
var directionsDisplay;
var directionsService;

var markers = [];
var markers2 = [];
var waypts = [];

function initMap()
{
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 4.7109903, lng:-74.0721436},
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsService = new google.maps.DirectionsService();
	directionsDisplay.setMap(map);

//	Create the search box and link it to the UI element.
	var input = document.getElementById('origen');
	var searchBox = new google.maps.places.SearchBox(input);

	var input2 = document.getElementById('destino');
	var searchBox2 = new google.maps.places.SearchBox(input2);
	//map.controls[google.maps.ControlPosition.TOP_LEFT].push(input); eliminar esta linea para mantener los estilos


	// Bias the SearchBox results towards current map's viewport.
	map.addListener('bounds_changed', function() {
		searchBox.setBounds(map.getBounds());
		searchBox2.setBounds(map.getBounds());
	});

	// Listen for the event fired when the user selects a prediction and retrieve
	// more details for that place.
	searchBox.addListener('places_changed', function() {
		var places = searchBox.getPlaces();

		if (places.length == 0) {
			return;
		}

		// Clear out the old markers.
		markers.forEach(function(marker) {
			marker.setMap(null);
		});
		markers = [];

		// For each place, get the icon, name and location.
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function(place) {
			var icon = {
					url: place.icon,
					size: new google.maps.Size(71, 71),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(25, 25)
			};

			// Create a marker for each place.
			markers.push(new google.maps.Marker({
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


	searchBox2.addListener('places_changed', function(){
		var places = searchBox2.getPlaces();
		if (places.length == 0) {
			return;
		}
		markers2.forEach(function(marker) {
			marker.setMap(null);
		});
		markers2 = [];

		var bounds = new google.maps.LatLngBounds();

		places.forEach(function(place) {
			var icon = {
					url: place.icon,
					size: new google.maps.Size(71, 71),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(25, 25)
			};

			// Create a marker for each place.
			markers2.push(new google.maps.Marker({
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

function calcRoute() {
	if (markers.length == 0 || markers2.length == 0)
		return;
	
	waypts.push({
        location: {lat: 5.205117999999999, lng: -74.73708099999999},
        stopover: true
      });
	var start = markers[0].position;
	var end = markers2[0].position;
	var request = {
			origin:start,
			destination:end,
			waypoints: waypts,
		    optimizeWaypoints: true,
			travelMode: google.maps.TravelMode.DRIVING,
			provideRouteAlternatives:true
	};
	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
			map.clearOverlays();
		}
	});
}


$("#fecha").focus(function(){
	$("#icono-fecha").css("color","#2e3436");
});

$("#fecha").focusout(function(){
	$("#icono-fecha").css("color","#b6b6b6");
});
