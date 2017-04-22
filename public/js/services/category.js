angular.module('categoryService', [])

	// super simple service
	// each function returns a promise object 
	.service('Category', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/categories');
			}
		}
	}]);