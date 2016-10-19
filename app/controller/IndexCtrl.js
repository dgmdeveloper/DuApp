app.controller('IndexCtrl', function($scope,$http,  $location, $window, localStorageService, SecurityFactory, UserFactory, ModalService){

	//comprobar si el token esta creado 
	//console.log(localStorageService.get("access_data"));
	//se comprueba que el token este creado mejorara para renovar el token co el tiempo 
	//o ver si ya vencio el token
	//scroll to top
	
	

	$window.scrollTo(0, 0);
	var datos = SecurityFactory.ComprobeDataToken();



	//variables para los datos del usuario
	$scope.userdata = {
		username:'sdsd',
		email:'',
	}

	
	 $scope.close = function(result) {
 	   close(result, 500); // close, but give 500ms for bootstrap to animate
 	 };


	

	



	



     

});
