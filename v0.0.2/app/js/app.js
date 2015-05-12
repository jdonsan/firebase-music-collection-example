/* global Firebase */
/* global jQuery */

(function($, Firebase) {
   
    $(document).ready(function () {
        'use strict';
        var sesion;
        
        function obtenerDesdeFormulario($formulario) {
            var datos = {};
            
            $.each($formulario.serializeArray(), function (indice, elemento) {
                datos[elemento.name] = elemento.value;
            });
            
            return datos;
        }
        
        function guardarDisco(evento) {
            evento.preventDefault();
            
            var fb = new Firebase('https://boiling-fire-5083.firebaseio.com/' + sesion.key() + '/discos'),
                disco = obtenerDesdeFormulario($(this));
            
            fb.push(disco);
        }
        
        function guardarUsuario(evento) {
            evento.preventDefault();
            var fb = new Firebase('https://boiling-fire-5083.firebaseio.com/');
            var usuario = obtenerDesdeFormulario($(this)).usuario;
            
            sesion = fb.push(usuario,  function (error) {
                if (error) {
                    console.log("Los datos no se han guardado debido a: " + error);
                } else {
                    $('div#panel-usuario').addClass('ocultar');
                    $('div#panel-disco').removeClass('ocultar');
                }
            });
        }
                   
        $('form#guardar-usuario').submit(guardarUsuario);
        $('form#guardar-disco').submit(guardarDisco);
        
    });

})(jQuery, Firebase);