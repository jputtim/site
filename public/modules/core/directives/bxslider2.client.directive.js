'use strict';

angular.module('core').directive('startslider', [
	function() {
		return {
	       restrict: 'A',
	       replace: true,
	       template: '<ul id="teste" class="bxslider">' +
	                   '<li ng-repeat="item in compromissos">' +
	                     '<h2 ng-bind-html="item.titulo"></h2>' +
	                     '<p class="text-justify" ng-bind-html="item.texto"></p>' +
	                     '<div class="clearfix"></div>' +
	                   '</li>' +
	                  '</ul>',
	       link: function(scope, elm, attrs) {
	          elm.ready(function() {    
	               $(elm).bxSlider({
	                    mode: 'vertical',
	                    speed: 800,
               			pause: 6000,
	                    controls: true,
	                    pager:false,
	                    auto: true,
	                    responsive: true,
	                    autoControls: false,
	                    // slideWidth: 440,
	                    // slideHeight: 440
	            });

	          });
	      }
	    };
	}
]);

