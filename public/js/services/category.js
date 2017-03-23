angular.module('categoryService', [])

	// super simple service
	// each function returns a promise object 
	.service('Category', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/categories');
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}
		}
	}]);