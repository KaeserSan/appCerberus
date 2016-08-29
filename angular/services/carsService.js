angular.module("myAppServices")
	.factory('carsService', function ($http) {
		console.log('carsService loaded...');

		var urlSearch = 'http://www.infoempleo.com/trabajo/en_barcelona/';
		urlSearch = 'http://www.infoempleo.com/trabajo/en_barcelona/localidad_barcelona/';
		urlSearch = "";
		// http://www.infoempleo.com/trabajo/en_barcelona/pagina_2/
		// li class="next disabled"
		//http://www.infoempleo.com/trabajo/en_barcelona/localidad_barcelona/area-de-empresa_tecnologia-e-informatica/sub-area-de-empresa_analisis-y-programacion/
		function getOffers ( params ){
			console.log("getOffers...");
			console.log( params );
			return 	$http.get( urlSearch + params );
		}





		return{
			getOffers: getOffers
		};

	});


// Coches.net
	$("#btn_buscar").click(function(e) {
        return buscar($(".txt_buscar").val()) });