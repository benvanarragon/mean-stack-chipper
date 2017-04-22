angular.module('specialsService', [])

	// super simple service
	// each function returns a promise object 
	.service('Specials', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/specials');
			}
		}
	}]);