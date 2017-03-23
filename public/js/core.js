var app = angular.module('app', ['ngRoute','todoController', 'todoService', 'categoryService', 'foodService', 'specialsService']);

app.run(function( ) {
 // editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

app.config(['$routeProvider', function($routeProvider){
// You can not ask for instance during configuration phase - you can ask only for providers.	 
console.log("app.config")	  // runs once only

			$routeProvider.					
					  when('/home', {
						templateUrl: './partials/home.html',
						controller: 'HomeCtrl'
					  }).												  
					  when('/menu', {
						templateUrl: './partials/menu.html',
						controller: 'MenuCtrl'
					  }).						  
					  when('/specials', {
						templateUrl: './partials/specials.html',
						controller: 'SpecialCtrl'
					  }).
					  when('/checkout', {
						templateUrl: './partials/checkout.html',
						controller: 'CheckoutCtrl'
					  }).	
					  when('/about', {
						templateUrl: './partials/about.html',
						controller: 'HomeCtrl'
					  }).		 	 	
					  otherwise({
						redirectTo: '/home'
					  });
 			
  }]);