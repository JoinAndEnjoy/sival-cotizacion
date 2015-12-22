/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var daton;

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
                "aoColumns": [
                    {"mData": 'nombre'},
                    {"mData": 'fecha'},
                    {"mData": 'origen'},
                    {"mData": 'destino'},
                    {"mData": 'camino',
                        "mRender":function (o){
                            if(o===1)
                                return 'no'; 
                            else 
                                return 'si';
                        }
                    },
                    {"mData": 'distancia'},
                    {"mData": null,
                        "bSortable": false,
                        "mRender": function (o) {
                            return '<button class="btn m-b-xs w-xs btn-default btn-rounded" style="margin-right: 3%;" id="m-' + o.id + '" type="button">Ver mapa</button> <button class="btn m-b-xs w-xs btn-success btn-rounded" id="r-' + o.id + '" type="button">Responder</button>';
                        }
                    }
                ]
            });

    $('#tabla-datos tbody').on('click', 'button', function () {
        var data = this.id;
        var row = $($(this).parent()).parent();
        var fila = table.row( row ).data();
        
        var dat = data.split("-");
        if(dat[0]==='r')
        {
            responder(fila);
            $('#contenedor2').css("display","block");
            $("html, body").animate({scrollTop: $('#contenedor2').offset().top }, 500);
        }
        else
        {
            window.open('/mapa/informcacion/'+fila.id);
        }
            
    });

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
    if(datos.camino === 1)
        $('#ida-tab').html('no');
    else
        $('#ida-tab').html('si');
    $('#comen').html(datos.comentarios);
    $('#fecha').html(datos.salida);
    $('#klm').html(datos.distancia);
    daton = datos;
    $('#s2').removeClass('superior');
    $('#s1').addClass('superior');
    $('#fecha').html(daton.salida);
    $('#klm').html(daton.distancia);
    puntosIda("/administrador/rutaida/" + daton.id + "/");
}

$(document).ready(function () {
    $('#s1').click(function () {
        $('#s2').removeClass('superior');
        $('#s1').addClass('superior');
        $('#fecha').html(daton.salida);
        $('#klm').html(daton.distancia);
        puntosIda("/administrador/rutaida/" + daton.id + "/");
    });
  
   
   
   $('#s2').click( function () {
       
       $('#s1').removeClass('superior');
       $('#s2').addClass('superior');
       $('#fecha').html(daton.regreso);
       $('#klm').html(daton.distancia2);
       puntosIda("/administrador/rutavuelta/" + daton.id + "/");
   });
   
});


function puntos (datos)
{
   $('.p-interior').remove();
   var dato = $.parseJSON(datos);
   $('#tabla-trayecto > tbody:last-child').append('<tr role="row" class=" p-interior odd">\
                                     <th>Origen:</th>\
                                     <td>'+dato[0].nombre+'</td>\
                                </tr>');
    
   for (i = 1; i<dato.length-1;i++)
   {
       $('#tabla-trayecto > tbody:last-child').append('<tr role="row" class=" p-interior odd">\
                                     <th>Punto '+i+':</th>\
                                     <td>'+dato[i].nombre+'</td>\
                                </tr>');
   }
   
   $('#tabla-trayecto > tbody:last-child').append('<tr role="row" class=" p-interior odd">\
                                     <th>Destino:</th>\
                                     <td>'+dato[dato.length-1].nombre+'</td>\
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
