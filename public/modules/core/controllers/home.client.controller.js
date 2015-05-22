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
	        tooltipTemplate: "<%=label%>: <%=String(value)%>"
	        // tooltipTemplate: "<%if (label){%>"+getHtmlFromTopicName("<%=label%>")+"<%}%>"
	        //$scope.userDetails = data.user_details;
	    }

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
         "title": "Revenue",
         "subtitle": "US$, in thousands",
         "ranges": [150, 225, 300],
         "measures": [220],
         "markers": [250]
	    };


	    $scope.amChartOptions = {
	    	autoMargins: false,
		    marginTop: 30,
		    marginLeft: 80,
		    marginBottom: 30,
		    marginRight: 50,
	        data: [{
		        "category": "Evaluation",
		        "excelent": 20,
		        "good": 20,
		        "average": 20,
		        "poor": 20,
		        "bad": 20,
		        "limit": 78,
		        "full": 100,
		        "bullet": 65
		    }],
	        type: "serial",
	        "categoryAxis": {
	            labelOffset: 20,
	            autoGridCount: false,
	            gridCount: 7,
	            centerLabelOnFullPeriod: true,
	            parseDates: true,
	            gridPosition: "middle"
	        },
	        valueAxes: [{
		        "maximum": 100,
		        "stackType": "regular",
		        "gridAlpha": 0
		    }],
		    startDuration: 1,
	        graphs: [{
		        "columnWidth": 0.5,
		        "lineColor": "#000000",
		        "lineThickness": 3,
		        "noStepRisers": true,
		        "stackable": false,
		        "type": "step",
		        "valueField": "limit"
		    }, {
		        "fillAlphas": 0.8,
		        "lineColor": "#19d228",
		        "showBalloon": false,
		        "type": "column",
		        "valueField": "excelent"
		    }, {
		        "fillAlphas": 0.8,
		        "lineColor": "#b4dd1e",
		        "showBalloon": false,
		        "type": "column",
		        "valueField": "good"
		    }, {
		        "fillAlphas": 0.8,
		        "lineColor": "#f4fb16",
		        "showBalloon": false,
		        "type": "column",
		        "valueField": "average"
		    }, {
		        "fillAlphas": 0.8,
		        "lineColor": "#f6d32b",
		        "showBalloon": false,
		        "type": "column",
		        "valueField": "poor"
		    }, {
		        "fillAlphas": 0.8,
		        "lineColor": "#fb7116",
		        "showBalloon": false,
		        "type": "column",
		        "valueField": "bad"
		    }, {
		        "clustered": false,
		        "columnWidth": 0.3,
		        "fillAlphas": 1,
		        "lineColor": "#000000",
		        "stackable": false,
		        "type": "column",
		        "valueField": "bullet"
		    }],
	        // chartCursor: {
	        //     categoryBalloonDateFormat: 'MMM DD HH:MM A'
	        // },
	        
	    }

	}
]);

/*"type": "serial",
    "theme": "light",
    "path": "http://www.amcharts.com/lib/3/",
    "autoMargins": false,
    "marginTop": 30,
    "marginLeft": 80,
    "marginBottom": 30,
    "marginRight": 50,
    "dataProvider": [{
        "category": "Evaluation",
        "excelent": 20,
        "good": 20,
        "average": 20,
        "poor": 20,
        "bad": 20,
        "limit": 78,
        "full": 100,
        "bullet": 65
    }],
    "valueAxes": [{
        "maximum": 100,
        "stackType": "regular",
        "gridAlpha": 0
    }],
    "startDuration": 1,
    "graphs": [{
        "columnWidth": 0.5,
        "lineColor": "#000000",
        "lineThickness": 3,
        "noStepRisers": true,
        "stackable": false,
        "type": "step",
        "valueField": "limit"
    }, {
        "fillAlphas": 0.8,
        "lineColor": "#19d228",
        "showBalloon": false,
        "type": "column",
        "valueField": "excelent"
    }, {
        "fillAlphas": 0.8,
        "lineColor": "#b4dd1e",
        "showBalloon": false,
        "type": "column",
        "valueField": "good"
    }, {
        "fillAlphas": 0.8,
        "lineColor": "#f4fb16",
        "showBalloon": false,
        "type": "column",
        "valueField": "average"
    }, {
        "fillAlphas": 0.8,
        "lineColor": "#f6d32b",
        "showBalloon": false,
        "type": "column",
        "valueField": "poor"
    }, {
        "fillAlphas": 0.8,
        "lineColor": "#fb7116",
        "showBalloon": false,
        "type": "column",
        "valueField": "bad"
    }, {
        "clustered": false,
        "columnWidth": 0.3,
        "fillAlphas": 1,
        "lineColor": "#000000",
        "stackable": false,
        "type": "column",
        "valueField": "bullet"
    }],
    "rotate": true,
    "columnWidth": 1,
    "categoryField": "category",
    "categoryAxis": {
        "gridAlpha": 0,
        "position": "left"
    }*/