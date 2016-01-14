/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function (){
   var tabla = $('#tabla-propuestas').DataTable(
           {
               "language": {
                    "url": "http://cdn.datatables.net/plug-ins/1.10.10/i18n/Spanish.json"
                },
                "ajax": {
                    "url": "/administrador/json3/",
                    "type": "GET"
                },
                "aoColumns": [
                    {"mData": 'fecha'},
                    {"mData": 'puestos'},
                    {"mData": 'cedula'},
                    {"mData": 'telefono'},
                    {"mData": 'tipo'}
                ]
           });
});