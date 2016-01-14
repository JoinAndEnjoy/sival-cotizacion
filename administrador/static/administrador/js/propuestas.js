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
                    "url": "/administrador/json2/",
                    "type": "GET"
                },
                "aoColumns": [
                    {"mData": 'fecha'},
                    {"mData": 'origen'},
                    {"mData": 'destino'},
                    {"mData": 'pida',
                        "mRender": function (o){
                            return '$'+$.number( o, 2, ',','.' );
                        }
                    },
                    {"mData": 'pregreso',
                        "mRender": function (o){
                            return '$'+$.number( o, 2, ',','.' );
                        }
                    },
                    {"mData": 'respondido',
                        "mRender": function (o) {
                            if (o)
                                return '<p class="verde">Si</p>';
                            else
                                return '<p class="rojo">No</p>';
                        }
                    },
                    {"mData": 'vista',
                        "mRender": function (o) {
                            if (o)
                                return '<p class="verde">Si</p>';
                            else
                                return '<p class="rojo">No</p>';
                        }
                    },
                    {"mData": null,
                        "bSortable": false,
                        "mRender": function (o) {
                            return '<button class="btn m-b-xs w-xs btn-success btn-rounded" id="' + o.cotizacion_id + '" type="button">Ver</button>';
                        }
                    }
                ]
           });
});