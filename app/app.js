/**
 * Created by duviel on 27/08/16.
 */
var app = angular.module('app',
    [
        'ngAnimate',
        'ui.router',
        'ngAnimate',
        'LocalStorageModule',
        'angularModalService'
    ], function($httpProvider){
    	  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    });


app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/otherwise');
	$stateProvider
	.state("otherwise", { 
		url : '/otherwise',
		templateUrl: 'views/listadoUsuarios.html',
		controller : 'IndexCtrl'

	})
	.state('usuarios',{
		url: '/usuarios',
		templateUrl: 'views/users/adminUsers.html',
		controller : 'UserCtrl'
	})

});

