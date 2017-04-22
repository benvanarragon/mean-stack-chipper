angular.module('foodService', [])

	// super simple service
	// each function returns a promise object 
	.service('Food', ['$http',function($http) {
		var basket = [];
		var basketPrice=0;
		var foodCount = 0;

		var addToBasket = function(newObj){
			var i = basket.indexOf(newObj);
			if(i === -1){
				basket.push(newObj);
				basketPrice = 0;
				for(var i = 0; i < basket.length; i++){
					basketPrice += basket[i].price	
				}
			}else{
				basket.splice(i,1);
				basketPrice=0;
				for(var i = 0; i < basket.length; i++){
					basketPrice += basket[i].price	
				}
			}
		};



		var getBasketPrice = function(){
			//console.log(basketPrice);
			return basketPrice;
		}
	
		var getBasket = function(){
			return basket;
		};

		return {
			addToBasket: addToBasket,
			getBasketPrice: getBasketPrice,
			getBasket: getBasket,
			get : function() {
				return $http.get('/api/foods');
			}
		}
	}]);