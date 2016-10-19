app.controller('UserCtrl',function($scope,$state,$http,$window, $timeout, UserFactory,SecurityFactory, localStorageService){

	SecurityFactory.ComprobeDataToken();

	$scope.pagina = {
		titulo: 'Listado de Usuarios'
	}
	

	//se comprueba el token

	$scope.app = 'asdasdasd';
	//var to page show content
	$scope.logbutton = false;
	$scope.loginWelcomeMessage = false;
	$scope.errorMessage = true;

	//var for user data to login and register
	$scope.user = {
		nombres:'',
		apellidos:'',
		email:'',
		direccion:'',
		telefono:'',
		genero:'',
		username: '',
		pass: ''
	}

	//datos para la peticion del token
	$scope.grant_type = 'password';
	$scope.cleinte_id = '1_3u1ygqbft3okosook8koss00og4gcgcscsw800oc04sc0coos4';
	$scope.client_secret  = '37n4fcqiclogo8cw88c8kckkc4ggw0kw8o0g4gcswccgkgk4kw';
	$scope.username = 'admin';
	$scope.password = 'amdin';

	//config to get request login
	var config = {
		params: $scope.user,
		headers: { 'Accept': 'application/json' }
	}

	$scope.posts = [];

	//function login
	$scope.loginStart = function(){

		if($scope.user.username == '' || $scope.user.pass == '')
		{
			alert("sdsd");
			$scope.errorMessage = false;
			$scope.errorText = 'Todos los campos son requeridos';
			$timeout(function(){$scope.errorMessage = true}, 3000);

			return;
		}

		$scope.logbutton = true;

		var params = {
			'grant_type':'password',
			'client_id': '1_3u1ygqbft3okosook8koss00og4gcgcscsw800oc04sc0coos4',
			'client_secret': '37n4fcqiclogo8cw88c8kckkc4ggw0kw8o0g4gcswccgkgk4kw',
			'username':$scope.user.username,
			'password':$scope.user.pass
		}
		//call to http function to request to server
		$http.post('http://localhost/api/web/app_dev.php/oauth/v2/token', params
		)
		.success(function(data, status, headers, config){
			//console.log(data);
			/*console.log("Token: " + data.access_token);
			console.log("Expira es: " + data.expires_in);
			console.log("Token type: " + data.token_type);
			console.log("Scope: " + data.scope);
			console.log("Refres token: " + data.refresh_token);
			$scope.posts = data;*/

			//save data in te localstorage
			localStorageService.set("access_data",data);
			localStorageService.set("access_user",$scope.user.username);

			//redireccionar al index
			$window.location.href = 'index.html';
		})
		.error(function(error, status, headers, config){
			$scope.logbutton = false;
			$scope.errorMessage = false;
			$scope.errorText = '!Datos incorrectos';
			
			//clear field password
			$scope.user.pass = '';
			$timeout(function(){$scope.errorMessage = true}, 3000);
		});

		

		/*listado de todos los usuarios*/
		/*
		var Indata = {'product': $scope.product, 'product2': $scope.product2 };
		$http.post("http://localhost:53263/api/Products/", Indata).
		then(function (data, status, headers, config) { alert("success") },
			function (data, status, headers, config) { alert("error") });

		*/
	}

	//function to return data to single user by username
	$scope.getUser = function(User)
	{
		params = {user:User};
		/*get user data for username*/
		$http.get('http://localhost/api/web/app_dev.php/user', params
		)
		.success(function(data, status, headers, config){
			console.log(data);
		});
	}


	//funcioanes administracion de usuarios
	//var to new user
	$scope.newUserData = { };

	//load data all users
	$scope.datauser = {};

	//mapping data user
	$scope.useractions = {

	}


	$scope.loadUsers= function(){
		//carga los daros del usuario
		var handleSuccess = function(data, status, headers, config)
		{
			//console.log(data);

			//decode angular array
			var dat = angular.fromJson(data);
			console.log(data[0]);
			console.log(dat);
			$scope.datauser = dat;
			console.log("mostrando hacia abajo");
			console.log($scope.datauser[0].id);
			//console.log($scope.datauser);

		    //console.log("el usuario es: "+dat.username);

		    //$scope.userdata.username = dat.username;
		    //$scope.userdata.email = dat.email;
		    //console.log("username "+localStorageService.get("access_user"));

		}
		var handleError = function(error, status, headers, config)
		{
			console.log(error); //deacuerdo al stado envias la pagina a mostrar
			console.log(status);
		} 
		UserFactory.getUsers().success(handleSuccess).error(handleError);
	}

	$scope.updateUser = function(){
		//postUpdateUser
	}

	
	
	
	//carga los daros del usuario
	var handleSuccess = function(data, status, headers, config)
	{
		//console.log(data);

		//decode angular array
		var dat = SecurityFactory.decodeJson(data);

	    console.log("el usuario es: "+dat.username);

	    $scope.userdata.username = dat.username;
	    $scope.userdata.email = dat.email;
	    //console.log("username "+localStorageService.get("access_user"));

	}
	var handleError = function(error, status, headers, config)
	{
		console.log(error); //deacuerdo al stado envias la pagina a mostrar
		console.log(status);
	} 
	UserFactory.getCurrentUser().success(handleSuccess).error(handleError);



	/*get user data for username*/
	$scope.getUser = function()
	{
		/*
		var suern = localStorageService.get("access_user");
		params = {user: 'admin'};
		console.log(suern);
		
		alert("iniciando");
		
		.success(function(data, status, headers, config){
			alert("entro desde el inicio");
			console.log(data);
		})
		.error(function(error, status, headers, config){
			
		});*/
	}

	$scope.show = function(){
		
		ModalService.showModal({
			remplateUrl: "modal.html",
			controller: "IndexCtrl",

			}).then(function(modal){
				modal.element.modal();
				modal.close.the(function(result){
					console.log(result);
				});
			});
	}
	$scope.alerta = function(){
		alert("mira desde aqui");
	}



	$scope.name = 'asdsad';
	$scope.mostrar = function(dato)
	{
		$scope.showActions(2);
		
		console.log("mostrando lo recivido");
		console.log(dato);
		console.log("mostrando los datos del usuario seleccionado para evitar una consulta al servidor");
		//console.log($scope.datauser[dato]);
		$scope.datos = $scope.datauser[dato];
		$scope.useractions  = $scope.datos;
		/*$scope.useractions.username = $scope.datos.username;
		$scope.useractions.email = $scope.datos.email;
		$scope.useractions.enabled = $scope.datos.enabled;
		$scope.useractions.expired = $scope.datos.expired;*/
		/*
		//call the modal
		ModalService.showModal({
            templateUrl: 'views/modals/userModal.html',
            controller: "IndexCtrl"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.message = "You said " + result;
            });
        });*/
	};

	$scope.saveNewUser = function(){
		console.log("inicio del guardado de datoos");
		console.log($scope.newUserData);

		
		//execute request to server
		var handleSuccess = function(data, status, headers, config)
		{
			//console.log(data);

			//decode angular array
//			var dat = angular.fromJson(data);
			console.log(data);
			console.log("Proceso realizado");
			
			//console.log($scope.datauser);

		    //console.log("el usuario es: "+dat.username);

		    //$scope.userdata.username = dat.username;
		    //$scope.userdata.email = dat.email;
		    //console.log("username "+localStorageService.get("access_user"));

		}
		var handleError = function(error, status, headers, config)
		{
			console.log("ocurrio un error");
			console.log(error); //deacuerdo al stado envias la pagina a mostrar
			console.log(status);
		} 
		UserFactory.postNewUser($scope.newUserData).success(handleSuccess).error(handleError);

		console.log("proceso terminado");
	};

	console.log($state.current.name);

	if($state.current.name === "usuarios")
	{
		$scope.loadUsers();
	}



	//datos para las variables de mostar y ocultar
	$scope.showList = false;
	$scope.showEdit = true;
	$scope.showNew  = true;

	$scope.showActions = function(IdShow)
	{
		switch(IdShow)
		{
			case 1:
				//show table
				$scope.showList = false;
				$scope.showEdit = true;
				$scope.showNew  = true;
				$scope.pagina.titulo = 'Listado de Usuarios';
				break;
			case 2:
				//show edit action form
				$scope.showList = true;
				$scope.showEdit = false;
				$scope.showNew  = true;
				$scope.pagina.titulo = 'Editar Usuario';
				break;
			case 3:
				//show new action form
				$scope.showList = true;
				$scope.showEdit = true;
				$scope.showNew  = false;
				$scope.pagina.titulo = 'Registrar Usuario';
				break;
			default:
				break;
		}
	}

});