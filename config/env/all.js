'use strict';

module.exports = {
	app: {
		title: 'planejamento',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/fontawesome/css/font-awesome.css',
				'public/lib/angular-chart.js/dist/angular-chart.css',
				
				'http://bxslider.com/lib/jquery.bxslider.css',
				
				'public/lib/textAngular/src/textAngular.css',

				'public/lib/nvd3/nv.d3.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-scroll/angular-scroll.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',

				'public/lib/lodash/dist/lodash.js',
				'public/lib/angular-google-maps/dist/angular-google-maps.js',

				'http://maps.googleapis.com/maps/api/js?sensor=false',

				'public/lib/Chart.js/Chart.js',
				'public/lib/angular-chart.js/dist/angular-chart.js',

				'public/lib/amcharts/dist/amcharts/amcharts.js',
    			'public/lib/amcharts/dist/amcharts/serial.js',
    			'public/lib/amcharts-angular/dist/amChartsDirective.js',



				'public/lib/d3/d3.min.js',
				'public/lib/nvd3/nv.d3.min.js',
				'public/lib/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js',
				
				

				'public/lib/jquery/dist/jquery.min.js',
				'http://bxslider.com/lib/jquery.bxslider.js',

				'public/lib/angular-jquery/dist/angular-jquery.min.js',
				'public/lib/angular-bootstrap-affix/dist/angular-bootstrap-affix.js',

				'public/lib/textAngular/dist/textAngular-rangy.min.js',
				'public/lib/textAngular/dist/textAngular-sanitize.min.js',
				'public/lib/textAngular/dist/textAngular.min.js',
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};