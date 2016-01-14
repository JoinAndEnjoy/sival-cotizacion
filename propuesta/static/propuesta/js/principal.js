/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var tipo;

$('.btn-normal').click(function (){
    $('.btn-normal').toggleClass('selecionado',false);
    $(this).toggleClass('selecionado',true);
    var id = $(this).attr('id');
    $('.informacion').css('display','block');
    if (id === 'btn1')
    {
        $('#t1').html('19 pasajeros');
        $('#t2').html('2010-2014');
        $('#t3').html('No');
        $('#t4').html('No');
        $('#t5').html('No');
        llenarTabla('Estandar');
        tipo = 'Estandar';
    }
    else
    {
        $('#t1').html('19 pasajeros');
        $('#t2').html('2015-2016');
        $('#t3').html('Si');
        $('#t4').html('Si');
        $('#t5').html('Si'); 
        llenarTabla('Premium');
        tipo = 'Premium';
    }
});

function llenarTabla(tipo)
{
    var coti = JSON.parse(cot.replace(/&quot;/g,'"'));
    $('.hijos').remove();
    $.ajax({
        url: "/administrador/rutaida/" + coti[0].pk + "/",
        type: 'GET',
        success: function (mensaje) {
           var puntos_ida = $.parseJSON(mensaje);
           $('#tab-origen > tbody:last-child').append('<tr class="hijos">\
                                                        <th>Origen</th>\
                                                        <td>'+puntos_ida[0].nombre+'</td>\
                                                        <\tr>\
                                                        <tr class="hijos">\
                                                        <th>Destino</th>\
                                                        <td>'+puntos_ida[puntos_ida.length -1].nombre+'</td>\
                                                        <\tr>');
            for (i = 1; i < (puntos_ida.length - 1); i++)
            {
                $('#tab-origen > tbody:last-child').append('<tr class="hijos">\
                                                        <th>Punto' + i + '</th>\
                                                        <td>' + puntos_ida[i].nombre + '</td>\
                                                        <\tr>');
            }
            var fechaSalida = new Date((coti[0].fields.salida || "").replace(/-/g, "/").replace(/[TZ]/g, " "));
            var date = fechaSalida.getFullYear() + '-' + (fechaSalida.getMonth() + 1) + '-' + fechaSalida.getDay();
            var time = fechaSalida.toLocaleTimeString();
            $('#tab-origen > tbody:last-child').append('<tr class="hijos">\
                                                        <th>Fecha de salida</th>\
                                                        <td>' + date + '</td>\
                                                        <\tr>\
                                                        <tr class="hijos">\
                                                        <th>Hora de salida</th>\
                                                        <td>' + time + '</td>\
                                                        <\tr>\
                                                        <tr class="hijos">\
                                                        <th>Tipo de bus</th>\
                                                        <td>' + tipo + '</td>\
                                                        <\tr>\
                                                        <tr class="hijos">\
                                                        <th>Precio</th>\
                                                        <td> $' + precio.ida + '</td>\
                                                        <\tr>');
        }
    });
    if (coti[0].fields.camino === 2)
    {
        $.ajax({
            url: "/administrador/rutavuelta/" + coti[0].pk + "/",
            type: 'GET',
            success: function (mensaje) {
                var puntos_ida = $.parseJSON(mensaje);
                $('#tab-regreso > tbody:last-child').append('<tr class="hijos">\
                                                        <th>Origen</th>\
                                                        <td>' + puntos_ida[0].nombre + '</td>\
                                                        <\tr>\
                                                        <tr class="hijos">\
                                                        <th>Destino</th>\
                                                        <td>' + puntos_ida[puntos_ida.length - 1].nombre + '</td>\
                                                        <\tr>');
                for (i = 1; i < (puntos_ida.length - 1); i++)
                {
                    $('#tab-regreso > tbody:last-child').append('<tr class="hijos">\
                                                        <th>Punto' + i + '</th>\
                                                        <td>' + puntos_ida[i].nombre + '</td>\
                                                        <\tr>');
                }
                var fechaSalida = new Date((coti[0].fields.salida || "").replace(/-/g, "/").replace(/[TZ]/g, " "));
                var date = fechaSalida.getFullYear() + '-' + (fechaSalida.getMonth() + 1) + '-' + fechaSalida.getDay();
                var time = fechaSalida.toLocaleTimeString();
                $('#tab-regreso > tbody:last-child').append('<tr class="hijos">\
                                                        <th>Fecha de salida</th>\
                                                        <td>' + date + '</td>\
                                                        <\tr>\
                                                        <tr class="hijos">\
                                                        <th>Hora de salida</th>\
                                                        <td>' + time + '</td>\
                                                        <\tr>\
                                                        <tr class="hijos">\
                                                        <th>Tipo de bus</th>\
                                                        <td>' + tipo + '</td>\
                                                        <\tr>\
                                                        <tr class="hijos">\
                                                        <th>Precio</th>\
                                                        <td> $' + precio.regreso + '</td>\
                                                        <\tr>');
            }
        });
    }
    
}

$('#formulario-repsuetsa').on('submit', function (event) {
    event.preventDefault();
    var correcto = true;
    for (i = 1;i<(event.target.length -1) && correcto;i++)
    {
        if(!event.target[i].value)
        {
            correcto = false;
            swal({
                title: "Error",
                text: "Deve llenar todos los campos",
                type: "error",
                confirmButtonText: "Aceptar"
            });
        }
    }
    if(!tipo)
    {
        swal({
                title: "Error",
                text: "Deve selecionar un tipo de propuesta",
                type: "error",
                confirmButtonText: "Aceptar"
            });
    } 
    else if(correcto)
    {
        var vector = {
            puestos: event.target[1].value,
            identificacion: event.target[2].value,
            telefono: event.target[3].value,
            idcot: idcot,
            tipo: tipo
        };
        create_post(vector);
    }
   
    
});



// ajax metodos
function create_post(vector) {

    $.ajax({
        url: "/propuesta/infomracion/", // the endpoint
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