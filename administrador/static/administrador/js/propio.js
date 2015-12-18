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
                            return '<button class="btn m-b-xs w-xs btn-default btn-rounded">Ver mapa</button> <button class="btn m-b-xs w-xs btn-success btn-rounded">Responder</button>';
                        }
                    }
                ]
            });

});