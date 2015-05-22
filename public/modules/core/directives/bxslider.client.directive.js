'use strict';

angular.module('core').directive('topslider', [
	function() {
		return {
	       restrict: 'A',
	       replace: true,
	       template: '<ul class="bxslider">' +
						  // '<li style="background-image: url(modules/core/img/perspectiva_externa_3.jpg); background-position: 0px 100%"></li>' +
						  '<li style="background-image: url(modules/core/img/PapelParede01.png);">' +
						  // '<div class="container"><div class="text-center" style="width:auto; color:#fff; margin:15%;">'+
						  // '<div><h1 style="font-size:55px; text-shadow: 2px 2px 2px rgba(50, 50, 50, 0.5);"><strong>TEIXEIRA DE FREITAS</strong></h1> <p><h4 style="font-size:24px; text-shadow: 2px 2px 2px rgba(50, 50, 50, 0.5);"><strong>Minha, sua, de todos nós!</strong></h4></p></div>'+
						  // '</div></div>' + 
						  '</li>' +
						  '<li style="background-image: url(modules/core/img/PapelParede02.png);">' +
						  // '<div class="container"><div class="text-center" style="width:auto; color:#fff; margin:15%;">'+
						  // '<div><h1 style="font-size:55px; text-shadow: 2px 2px 2px rgba(50, 50, 50, 0.5);"><strong>TEIXEIRA DE FREITAS</strong></h1> <p><h4 style="font-size:24px; text-shadow: 2px 2px 2px rgba(50, 50, 50, 0.5);"><strong>Minha, sua, de todos nós!</strong></h4></p></div>'+
						  // '</div></div>' + 
						  '</li>' +
						  // '<li style="background-image: url(http://www.teixeiradefreitas.ba.gov.br/n/wp-content/uploads/2014/05/PapelParede03.jpg);">' +
						  // '<div class="container"><div class="text-center" style="width:auto; color:#fff; margin:15%;">'+
						  // '<div><h1 style="font-size:55px; text-shadow: 2px 2px 2px rgba(50, 50, 50, 0.5);"><strong>TEIXEIRA DE FREITAS</strong></h1> <p><h4 style="font-size:24px; text-shadow: 2px 2px 2px rgba(50, 50, 50, 0.5);"><strong>Minha, sua, de todos nós!</strong></h4></p></div>'+
						  // '</div></div>' + 
						  // '</li>' +
					 '</ul>',
	       link: function($, scope, elm, attrs) {
	          elm.ready(function() {    
	               $(elm).bxSlider({
               			mode: 'fade',
               			speed: 800,
               			pause: 6000,
	                    controls: true,
	                    pager:false,
	                    auto: true,
	                    responsive: true,
	                    autoControls: false,
	            });
	          });
            }
	    };
	}
]);