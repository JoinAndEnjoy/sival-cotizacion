/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {

    $('#tabla-datos').DataTable(
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
                    {"mData": 'camino'},
                    {"mData": 'distancia'},
                    {"mData": null,
                        "bSortable": false,
                        "mRender": function (o) {
                            return '<button class="btn m-b-xs w-xs btn-default btn-rounded" style="margin-right: 3%;">Ver mapa</button> <button class="btn m-b-xs w-xs btn-success btn-rounded">Responder</button>';
                        }
                    }
                ]
            });

});

$(document).ready(function () {
    var tam1 = $('#derehca').height();
    var tam2 = $('#izquierda').height();
    if(tam1>tam2)
        $('#derehca').css("border-right", "1px solid #dee5e7");
    else
        $('#izquierda').css("border-left", "1px solid #dee5e7");
    
});