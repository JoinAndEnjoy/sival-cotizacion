/* global google */

/**
 * 
 */

var map;
var directionsDisplay;
var directionsService;
var inicio = true;
var distance;

var markers = [];
var markers2 = [];
var waypts = [];
var internalmark = [];
var internalmark2 = [];

var numPun = 0;
var numPun2 = 0;

function initMap()
{
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 4.7109903, lng: -74.0721436},
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();
    directionsDisplay.setMap(map);

    for (i = 0; i < 8; i++)
    {
        internalmark.push(undefined);
    }

    for (i = 0; i < 8; i++)
    {
        internalmark2.push(undefined);
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
        if (places.length === 0) {
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
        if (inicio)
            internalmark.splice(indice, 1, markersn[0]);
        else
            internalmark2.splice(index, 1, markersn[0]);
        calcRoute();
    });
}


function calcRoute() {
    if (markers.length === 0 || markers2.length === 0) {
        return;
    }

    waypts = [];
    var intep;
    if (inicio)
        intep = internalmark;
    else
        intep = internalmark2;

    intep.forEach(function (punto) {
        if (punto !== undefined)
        {
            waypts.push({
                location: punto.position,
                stopover: true
            });
        }

    });
    var start;
    var end;
    if (inicio)
    {
        start = markers[0].position;
        end = markers2[0].position;
    } else
    {
        end = markers[0].position;
        start = markers2[0].position;
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
            directionsDisplay.setDirections(result);            
            distance = 0;
            for (i = 0; i < result.routes[0].legs.length; i++) {
                distance += parseFloat(result.routes[0].legs[i].distance.value);
                //for each 'leg'(route between two waypoints) we get the distance and add it to the total
            }
           distance = distance/1000;
            
            eliminarMarks();
        }
        else
        {
            swal({
                title: "Error",
                text: "No se puede trazar ruta",
                type: "error",
                confirmButtonText: "Aceptar"                
            });
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
        if (marker !== undefined)
            marker.setMap(null);
    });

    internalmark2.forEach(function (marker) {
        if (marker !== undefined)
            marker.setMap(null);
    });
}

$("#fecha").focus(function () {
    $("#icono-fecha").css("color", "#2e3436");
});

$("#fecha").focusout(function () {
    $("#icono-fecha").css("color", "#b6b6b6");
});

function cambio()
{
    var anch = $('.punto-int').width();
    $('#cont1').width(anch);
}

function cambio2()
{
    var ancho2 = $('#conttt').width();
    $('#cont2').width( ancho2);
}


$('#definir-ruta').click(function () {
    
    numPun++;
    if (numPun < 9)
    {
        $('#puntos-div').css("display", "block");
        $('#puntos-div').append("<div class = 'punto-int'>\
				<div class='inner-addon left-addon' >\
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
        swal({
                title: "Error",
                text: "No se puede definir más puntos",
                type: "error",
                confirmButtonText: "Aceptar"
                
            });
    }
    cambio();
});

$('#definir-ruta-regreso').click(function () {
    numPun2++;
    if (numPun2 < 9)
    {
        $('#puntos-div-regreso').css("display", "block");
        $('#puntos-div-regreso').append("<div class = 'punto-int'>\
				<div id='conttt'>\
                                <div class='inner-addon left-addon'>\
				<input type='text' name='origen' id='intermedio2" + numPun2 + "'\
				placeholder='Punto intermedio " + numPun2 + "' class='botones-fomulario punto-int-input' required>\
				<i class='glyphicon glyphicon-map-marker mis-iconos'></i>\
                                </div>\
		</div>");

        $('#puntos-div-regreso').animate({
            scrollTop: 1000
        }, 600);
        var input = document.getElementById('intermedio2' + numPun2);
        var searchBox = new google.maps.places.SearchBox(input);
        agregarListenerInternal(searchBox, numPun2 - 1);
    } else
    {
        alert("No se pueden definir más puntos");
    }
    cambio2();
});

$('#ida').click(function () {
    inicio = true;
    calcRoute();
});

$('#regreso').click(function () {
    inicio = false;
    calcRoute();
});



// coge el post del formulario
$('#form-origen').on('submit', function (event) {
    event.preventDefault();
    var vector = validacionCampos();
    if(vector!==undefined)
        create_post(vector);
});



$("#nombre").change(function () {
    if (!(!$("#nombre").val()))
    {
        $('#ic-nombre').css("opacity", "0");
        $("#nombre").removeAttr('style');
    }

});

$("#email").change(function () {
    if (!(!$("#email").val()))
    {
        $('#ic-email').css("opacity", "0");
        $("#email").removeAttr('style');
    }

});

$("#fecha1").bind( "click", function () {
    if (!(!$("#fecha1").val()))
    {
        $('#ic-fecha').css("opacity", "0");
        $("#fecha1").removeAttr('style');
    }

});

$("#origen").change(function () {
    if (!(!$("#origen").val()))
    {
        $('#ic-origen').css("opacity", "0");
        $("#origen").removeAttr('style');
    }

});

$("#destino").change(function () {
    if (!(!$("#destino").val()))
    {
        $('#ic-destino').css("opacity", "0");
        $("#destino").removeAttr('style');
    }

});
//validacion de los campos del formilario
function validacionCampos()
{
    var fechaSalida = $('#fecha1');
    var fechaRegreso = $('#fecha2').val();
    var ruta1 = conversor(markers[0], internalmark, markers2[0]);
    var ruta2 = conversor(markers2[0], internalmark2, markers[0]);
    var email = $('#email');
    var nombre = $('#nombre');
    var punto1 = $('#origen');
    var punto2 = $('#destino');
    var termino = true;
    var condicion = $("input[type='radio'][name='switch']:checked").val();
    
    if(!punto1.val())
    {
        punto1.css("border", "1px solid #2e3436");
        $('#ic-origen').css("opacity", "1");
        termino = false;
    }
    if(!punto2.val())
    {
        punto2.css("border", "1px solid #2e3436");
        $('#ic-destino').css("opacity", "1");
        termino = false;
    }
    if(!nombre.val())
    {
        nombre.css("border", "1px solid #2e3436");
        $('#ic-nombre').css("opacity", "1");
        termino = false;
    }
    if(!fechaSalida.val())
    {
        fechaSalida.css("border", "1px solid #2e3436");
        $('#ic-fecha').css("opacity", "1");
        termino = false;
    }
    if(!email.val())
    {
        email.css("border", "1px solid #2e3436");
        $('#ic-email').css("opacity", "1");
        termino = false;
    }
    else if(!validator(email.val()))
    {
        alert('Correo no valido');
        termino = false;
    }
    
    if (termino)
    {
        var respuesta = {
            rutaIda: ruta1,
            rutaVenida: ruta2,
            salida: fechaSalida.val(),
            regreso: fechaRegreso,
            nombre: nombre.val(),
            correo: email.val(),
            comentarios: $('#comentarios').val(),
            ruta :condicion,
            distancia: distance
        };
        
        return JSON.stringify(respuesta);
    }
    else
        return undefined;
}


// mapea los markes a posiciones
function conversor(punto1, vector, punto2)
{
	var ind = vector.slice();
	ind.splice(0, 0, punto1);
	ind.splice(ind.length, 0, punto2);
    var s = [];
    ind.forEach(function (punto) {
        if (punto !== undefined)
            s.push({
                nombre: punto.title,
                posicion: punto.position
            });
    });
    return JSON.stringify(s);
}

function validator(sEmail)
{
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail))
        return true;
    else
        return false;
}


//AJAX for posting
function create_post(vector) {
    $.ajax({
        url: "/crear/", // the endpoint
        type: "POST", // http method
        data: {info : vector}, // data sent with the post request

        // handle a successful response
        success: function (mensaje) {
            swal({
                customClass: "mi-modal",
                title: "Formulario enviado exitosamente",
                text: "¡hola "+$('#nombre').val()+"! <br><br> Revisaremos tu solicitud y te enviaremos nuestra cotización cuanto antes a tu correo: <div class='correo'> "+$('#email').val()+"</div>" ,
                type: "success",
                confirmButtonText: "Aceptar",
                html: true
            });
        }

        // handle a non-successful response
//		error : function(xhr,errmsg,err) {
//		$('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
//		" <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
//		console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
//		}
    });
}
;




// ajax metodos


//This function gets cookie with a given name
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

/*
 The functions below will create a header with csrftoken
 */

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
function sameOrigin(url) {
    // test that a given url is a same-origin URL
    // url could be relative or scheme relative or absolute
    var host = document.location.host; // host + port
    var protocol = document.location.protocol;
    var sr_origin = '//' + host;
    var origin = protocol + sr_origin;
    // Allow absolute or scheme relative URLs to same origin
    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
}

$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
            // Send the token to same-origin, relative URLs only.
            // Send the token only if the method warrants CSRF protection
            // Using the CSRFToken value acquired earlier
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
})

