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
                "aoColumns": [
                    {"mData": 'nombre'},
                    {"mData": 'fecha'},
                    {"mData": 'origen'},
                    {"mData": 'destino'},
                    {"mData": 'camino'},
                    {"mData": 'distancia'}
                ]
            });

});