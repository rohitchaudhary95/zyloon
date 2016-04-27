var rte = angular.module('appRoutes', ['ngRoute'])

rte.config(function($routeProvider, $locationProvider){

	//$routeProvider
		//.when('/', {
		//	templateUrl: 'app/views/pages/home.html',
		//	controller: 'tempController'
		//})
		
		
		$locationProvider.html5Mode(true);
});