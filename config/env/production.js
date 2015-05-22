'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/planejamento',
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
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
