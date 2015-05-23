'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'planejamento';
	var applicationModuleVendorDependencies = [
		'ngResource',
		'ngCookies',  
		'ngAnimate',  
		'ngTouch',  
		'ngSanitize',  
		'ui.router', 
		'ui.bootstrap', 
		'ui.utils', 
		'duScroll', 
		'chart.js', 
		'uiGmapgoogle-maps', 
		'mgcrea.bootstrap.affix',
	];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
	}
]);
'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

angular.module('core').config(["uiGmapGoogleMapApiProvider", function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
}]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$sce', '$document',
	function($scope, Authentication, $sce, $document) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.compromissos = [
	       {titulo:'<strong>Missão</strong>', texto: 'Integrar as ações governamentais, por meio da coordenação do planejamento e da gestão pública, visando o desenvolvimento sustentável do município e promoção da cidadania.'},
	       {titulo:'<strong>Visão</strong>', texto: 'Alcançar a excelência e competência na gestão dos recursos, na elaboração e cumprimento dos planos de desenvolvimento, no monitoramento e avaliação permanente dos programas e ações de governo, produzir instrumentos que melhoram a capacidade de atuação dos órgãos, objetivando uma administração moderna, transparente e participativa.'},
	       {titulo:'<strong>Valores</strong>', texto: '<ul class="list-bxslider"><li>Integração</li><li>Resultado</li><li>Transparência</li><li>Inovação</li><li>Cidadania</li></ul>'}
	    ];

		$scope.myInterval = 1000;
		var slides = $scope.slides = [
			{
		      	image: 'http://www.teixeiradefreitas.ba.gov.br/n/wp-content/uploads/2014/05/PapelParede02.jpg',
		      	text: ['More','Extra','Lots of','Surplus']
		    },
		    {
		      	image: 'http://www.teixeiradefreitas.ba.gov.br/n/wp-content/uploads/2014/05/PapelParede03.jpg',
		      	text: ['More','Extra','Lots of','Surplus']
		    },
		    {
		      	image: 'http://www.teixeiradefreitas.ba.gov.br/n/wp-content/uploads/2014/05/PapelParede04.jpg',
		      	text: ['More','Extra','Lots of','Surplus']
		    }
		];

		$scope.map = { center: { latitude: -17.5459, longitude: -39.7239 }, zoom: 15 };

		$scope.tabs2 = [
		    { title:'DESENVOLVIMENTO', template : '/modules/core/views/superintendencias/01.html' },
		    { title:'ORÇAMENTO', template : '/modules/core/views/superintendencias/02.html' },
		    { title:'PARTICIPAÇÃO POPULAR', template : '/modules/core/views/superintendencias/03.html' },
		    { title:'PROJETOS', template : '/modules/core/views/superintendencias/04.html' }
		];

		$scope.tabs = [
		    { title:'Orgãos Públicos', id:'mapa-1', url:$sce.trustAsResourceUrl('https://www.google.com/maps/d/u/2/embed?mid=z-EA_dQ7N5eg.koso8-dU7WfY') },
		    { title:'Obras', id:'mapa-2', url:$sce.trustAsResourceUrl('https://www.google.com/maps/d/u/2/embed?mid=z-EA_dQ7N5eg.k7tLSeDQecjU') },
		    { title:'Pavimentação', id:'mapa-3', url:$sce.trustAsResourceUrl('https://www.google.com/maps/d/u/2/embed?mid=z-EA_dQ7N5eg.kMiMNCGhXXlY') }
		];

		function doStuff(item){
			console.log('aqui--->'+item);
		    var id = item.attributes['data-src'].value; // 345
		}

		$scope.labels = ['2000', '2001', '2002','2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'];
		$scope.series = ['Evolução da população'];
		$scope.chartoptions = {
	        tooltipTemplate: '<%=label%>: <%=String(value)%>'
	        // tooltipTemplate: '<%if (label){%>'+getHtmlFromTopicName('<%=label%>')+'<%}%>'
	        //$scope.userDetails = data.user_details;
	    };

		$scope.data = [
		    [107.486, 109.908, 112.077, 114.207, 116.332, 121.158, 123.611, 125.987, 123.858, 125.433, 138.341, 140.710, 143.001, 153.385, 155.659],
		];

		$scope.labels_1 = ['2000', '2001', '2002','2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'];
		$scope.series_1 = ['Teixeira de freitas', 'Brasil'];

		$scope.data_1 = [
		    [2626.71, 3130.30, 3698.00, 4132.50, 4542.49, 5100.51, 5460.42, 6250.34, 7420.94, 8481.91, 9172.58, 9887.34, 9743.21],
		    [6946.34, 7553.61, 8462.45, 9610.94, 10839.81, 11658.12, 12686.60, 14056.26, 15991.55, 16917.62, 19763.93, 21535.65, 22642.40]
		];


		$scope.exampleData =  {
         'title': 'Revenue',
         'subtitle': 'US$, in thousands',
         'ranges': [150, 225, 300],
         'measures': [220],
         'markers': [250]
	    };


	    $scope.amChartOptions = {
	    	autoMargins: false,
		    marginTop: 30,
		    marginLeft: 80,
		    marginBottom: 30,
		    marginRight: 50,
	        data: [{
		        'category': 'Evaluation',
		        'excelent': 20,
		        'good': 20,
		        'average': 20,
		        'poor': 20,
		        'bad': 20,
		        'limit': 78,
		        'full': 100,
		        'bullet': 65
		    }],
	        type: 'serial',
	        'categoryAxis': {
	            labelOffset: 20,
	            autoGridCount: false,
	            gridCount: 7,
	            centerLabelOnFullPeriod: true,
	            parseDates: true,
	            gridPosition: 'middle'
	        },
	        valueAxes: [{
		        'maximum': 100,
		        'stackType': 'regular',
		        'gridAlpha': 0
		    }],
		    startDuration: 1,
	        graphs: [{
		        'columnWidth': 0.5,
		        'lineColor': '#000000',
		        'lineThickness': 3,
		        'noStepRisers': true,
		        'stackable': false,
		        'type': 'step',
		        'valueField': 'limit'
		    }, {
		        'fillAlphas': 0.8,
		        'lineColor': '#19d228',
		        'showBalloon': false,
		        'type': 'column',
		        'valueField': 'excelent'
		    }, {
		        'fillAlphas': 0.8,
		        'lineColor': '#b4dd1e',
		        'showBalloon': false,
		        'type': 'column',
		        'valueField': 'good'
		    }, {
		        'fillAlphas': 0.8,
		        'lineColor': '#f4fb16',
		        'showBalloon': false,
		        'type': 'column',
		        'valueField': 'average'
		    }, {
		        'fillAlphas': 0.8,
		        'lineColor': '#f6d32b',
		        'showBalloon': false,
		        'type': 'column',
		        'valueField': 'poor'
		    }, {
		        'fillAlphas': 0.8,
		        'lineColor': '#fb7116',
		        'showBalloon': false,
		        'type': 'column',
		        'valueField': 'bad'
		    }, {
		        'clustered': false,
		        'columnWidth': 0.3,
		        'fillAlphas': 1,
		        'lineColor': '#000000',
		        'stackable': false,
		        'type': 'column',
		        'valueField': 'bullet'
		    }],
	        // chartCursor: {
	        //     categoryBalloonDateFormat: 'MMM DD HH:MM A'
	        // },
	        
	    };

	}
]);

/*'type': 'serial',
    'theme': 'light',
    'path': 'http://www.amcharts.com/lib/3/',
    'autoMargins': false,
    'marginTop': 30,
    'marginLeft': 80,
    'marginBottom': 30,
    'marginRight': 50,
    'dataProvider': [{
        'category': 'Evaluation',
        'excelent': 20,
        'good': 20,
        'average': 20,
        'poor': 20,
        'bad': 20,
        'limit': 78,
        'full': 100,
        'bullet': 65
    }],
    'valueAxes': [{
        'maximum': 100,
        'stackType': 'regular',
        'gridAlpha': 0
    }],
    'startDuration': 1,
    'graphs': [{
        'columnWidth': 0.5,
        'lineColor': '#000000',
        'lineThickness': 3,
        'noStepRisers': true,
        'stackable': false,
        'type': 'step',
        'valueField': 'limit'
    }, {
        'fillAlphas': 0.8,
        'lineColor': '#19d228',
        'showBalloon': false,
        'type': 'column',
        'valueField': 'excelent'
    }, {
        'fillAlphas': 0.8,
        'lineColor': '#b4dd1e',
        'showBalloon': false,
        'type': 'column',
        'valueField': 'good'
    }, {
        'fillAlphas': 0.8,
        'lineColor': '#f4fb16',
        'showBalloon': false,
        'type': 'column',
        'valueField': 'average'
    }, {
        'fillAlphas': 0.8,
        'lineColor': '#f6d32b',
        'showBalloon': false,
        'type': 'column',
        'valueField': 'poor'
    }, {
        'fillAlphas': 0.8,
        'lineColor': '#fb7116',
        'showBalloon': false,
        'type': 'column',
        'valueField': 'bad'
    }, {
        'clustered': false,
        'columnWidth': 0.3,
        'fillAlphas': 1,
        'lineColor': '#000000',
        'stackable': false,
        'type': 'column',
        'valueField': 'bullet'
    }],
    'rotate': true,
    'columnWidth': 1,
    'categoryField': 'category',
    'categoryAxis': {
        'gridAlpha': 0,
        'position': 'left'
    }*/
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
	       link: function(scope, elm, attrs) {
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


'use strict';

angular.module('core').directive('refreshable', [function () {
    return {
        restrict: 'A',
        scope: {
            refresh: 'refreshable'
        },
        link: function (scope, element, attr) {
            var refreshMe = function () {
                element.attr('src', element.attr('src'));
            };

            scope.$watch('refresh', function (newVal, oldVal) {
                if (scope.refresh) {
                    scope.refresh = false;
                    refreshMe();
                }
            });
        }
    };
}]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);