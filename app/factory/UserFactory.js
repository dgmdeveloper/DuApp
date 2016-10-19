app.factory('UserFactory', function($http){
	//'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
	var config = {
		headers:{
			
			'Accept': 'application/json',
         	'Content-Type': 'application/json',
         	'Access-Control-Allow-Credentials': true,
		}
	}
	return {
		//function to login page
		login : function(){
			return $http.post('aqui la peticion');
		},

		//load all user in database
		getUsers : function(){
			return $http.get('http://localhost/api/web/app_dev.php/user');
		},

		getCurrentUser: function(username){
			var params = {user: 'admin'};
			return $http.get('http://localhost/api/web/app_dev.php/user', {params: {params}});
		},

		//post sin probar

		postNewUser: function(data){
			var params = data;
			return $http.post('http://localhost/api/web/app_dev.php/user', params, config);
		},

		postUpdateUser: function(data){
			var params = {userData: data};
			return $http.post('http://localhost/api/web/app_dev.php/user', params, config);
		},

		postTest: function(data){
			var params = data;
			return $http.post('http://localhost/api/web/app_dev.php/test', params, config);
		}
	}

});