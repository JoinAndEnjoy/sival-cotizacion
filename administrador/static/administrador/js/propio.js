/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var daton;
var camino = 1;

$(document).ready(function () {

    var table = $('#tabla-datos').DataTable(
            {
                "ajax": {
                    "url": "/administrador/json/",
                    "type": "GET"
                },
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.10/i18n/Spanish.json"
                },
                "order": [[ 2, "desc" ]],
                "aoColumns": [
                    {"mData": 'id'},
                    {"mData": 'nombre'},
                    {"mData": 'fecha'},
                    {"mData": 'origen'},
                    {"mData": 'destino'},
                    {"mData": 'camino',
                        "mRender": function (o) {
                            if (o === 1)
                                return 'no';
                            else
                                return 'si';
                        }
                    },
                    {"mData": null,                        
                        "mRender": function (o) {
                            if (o.camino ===1 )
                                return o.distancia;                       
                            var d1 = parseFloat(o.distancia);
                            var d2 = parseFloat(o.distancia2);
                            var total = d1 + d2;
                            return total;
                        }
                    },
                    {"mData": null,
                        "bSortable": false,
                        "mRender": function (o) {
                            return '<button class="btn m-b-xs w-xs btn-success btn-rounded" id="r-' + o.id + '" type="button">Responder</button>';
                        }
                    }
                ]
            });

    $('#tabla-datos tbody').on('click', 'button', function () {
        var data = this.id;
        var row = $($(this).parent()).parent();
        var fila = table.row(row).data();
        responder(fila);
        $('#contenedor2').css("display", "block");
        $("html, body").animate({scrollTop: $('#contenedor2').offset().top}, 500);
    });

});

$('#but').click(function () {
    window.open('/mapa/informcacion/' + daton.id + '/' + camino);
});


function inicial()
{
    var tam1 = $('#derehca').height();
    var tam2 = $('#izquierda').height();
    if (tam1 > tam2)
        $('#derehca').css("border-right", "1px solid #dee5e7");
    else
        $('#izquierda').css("border-left", "1px solid #dee5e7");
}


function responder(datos)
{
    $('#nom-tab').html(datos.nombre);
    $('#em-tab').html(datos.correo);
    $('#fes-tab').html(datos.fecha);
    $('#ida-puestos').html(datos.puestos);
    if (datos.camino === 1)
    {
        $('#ida-tab').html('no');
        $('#campovuelta').css("display", "none");
        $('#text').css("display", "none");
    } else
    {
        $('#campovuelta').css("display", "block");
        $('#ida-tab').html('si');
        $('#text').css("display", "inline");
    }

    $('#comen').html(datos.comentarios);
    var mifecha = new Date((datos.salida || "").replace(/-/g, "/").replace(/[TZ]/g, " "));
    var date = mifecha.getFullYear() + '-' + (mifecha.getMonth() + 1) + '-' + mifecha.getDate();
    var time = mifecha.toLocaleTimeString();
    $('#fecha').html(date);
    $('#hora').html(time);
    $('#klm').html(datos.distancia);
    daton = datos;
    $('#s2').removeClass('superior');
    $('#s1').addClass('superior');

    puntosIda("/administrador/rutaida/" + daton.id + "/");
}

$(document).ready(function () {
    $('#s1').click(function () {
        camino = 1;
        $('#s2').removeClass('superior');
        $('#s1').addClass('superior');
        var mifecha = new Date((daton.salida || "").replace(/-/g, "/").replace(/[TZ]/g, " "));
        var date = mifecha.getFullYear() + '-' + (mifecha.getMonth() + 1) + '-' + mifecha.getDay();
        var time = mifecha.toLocaleTimeString();
        $('#fecha').html(date);
        $('#hora').html(time);
        $('#klm').html(daton.distancia);
        puntosIda("/administrador/rutaida/" + daton.id + "/");
    });
    $('#s2').click(function () {
        if (daton.camino !== 1)
        {
            camino = 2;
            $('#s1').removeClass('superior');
            $('#s2').addClass('superior');
            var mifecha = new Date((daton.regreso || "").replace(/-/g, "/").replace(/[TZ]/g, " "));
            var date = mifecha.getFullYear() + '-' + (mifecha.getMonth() + 1) + '-' + mifecha.getDay();
            var time = mifecha.toLocaleTimeString();
            $('#fecha').html(date);
            $('#hora').html(time);
            $('#klm').html(daton.distancia2);
            puntosIda("/administrador/rutavuelta/" + daton.id + "/");
        }

    });



});


function puntos(datos)
{
    $('.p-interior').remove();
    var dato = $.parseJSON(datos);
    $('#tabla-trayecto > tbody:last-child').append('<tr role="row" class=" p-interior odd">\
                                     <th>Origen:</th>\
                                     <td>' + dato[0].nombre + '</td>\
                                </tr>');

    for (i = 1; i < dato.length - 1; i++)
    {
        $('#tabla-trayecto > tbody:last-child').append('<tr role="row" class=" p-interior odd">\
                                     <th>Punto ' + i + ':</th>\
                                     <td>' + dato[i].nombre + '</td>\
                                </tr>');
    }

    $('#tabla-trayecto > tbody:last-child').append('<tr role="row" class=" p-interior odd">\
                                     <th>Destino:</th>\
                                     <td>' + dato[dato.length - 1].nombre + '</td>\
                                </tr>');
    inicial();
}

function puntosIda(url)
{
    $.ajax({
        url: url,
        type: 'GET',
        success: function (mensaje) {
            puntos(mensaje);
        }
    });
}

$('#form-origen').on('submit', function (event) {
    event.preventDefault();
    var c1 = $('#cmp1').val();
    var c2 = $('#cmp2').val();
    var c3 = $('#comentarios').val();
    if (!c1 && !c2 && !c3)
    {

        swal({
            title: "Error",
            text: "Propuesta en blanco",
            type: "error",
            confirmButtonText: "Aceptar"
        });
    } else
    {
        var vector = {
            id: daton.id,
            cm1: c1,
            cm2: c2,
            cm3: c3
        };
        $('#load-block').css('display', 'block');
        create_post(vector);
    }
});


// ajax metodos
function create_post(vector) {

    $.ajax({
        url: "/administrador/guardar/", // the endpoint
        type: "POST", // http method
        data: vector, // data sent with the post request

        // handle a successful response
        success: function (mensaje) {
            $('#load-block').css('display', 'none');
            swal({
                title: "Enviado",
                text: "La propuesta se envio correctamente",
                type: "success",
                confirmButtonText: "Aceptar",
                closeOnConfirm: false
            }, function () {
                location.reload();
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
});