angular.module('specialsService', [])

	// super simple service
	// each function returns a promise object 
	.service('Specials', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/specials');
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}
		}
	}]);