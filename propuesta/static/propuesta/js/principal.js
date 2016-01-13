/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
    }
    else
    {
        $('#t1').html('19 pasajeros');
        $('#t2').html('2015-2016');
        $('#t3').html('Si');
        $('#t4').html('Si');
        $('#t5').html('Si'); 
        llenarTabla('Premium');
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
