var mainController = angular.module('mainController', [])



	// inject the food, specials, and category service factory into our controller
	mainController.controller('MenuCtrl', ['$scope','$http','Category', 'Food', 'Specials', '$location', '$anchorScroll',
		function($scope, $http, Category, Food, Specials, $location, $anchorScroll) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.oldPrice = 0;
		$scope.scrollTo = function(id){
			$location.hash(id);
			$anchorScroll();
			$anchorScroll.yOffset = 130;
		}

		$scope.callAddToBasket = function(food){
			Food.addToBasket(food)
			$scope.basket = Food.getBasket();
			$scope.basketPrice = Food.getBasketPrice();
			
			$scope.loading = false;
		}

		/*$scope.callGetBasketPrice = function(){
			$scope.basketPrice = Food.getBasketPrice();
		}
*/
		//FILTER on value
		$scope.filterKey = function(value){
			return{
				category_id: value
			};
		};

		// GET =====================================================================
		Specials.get()
			.success(function(data) {
				$scope.specials = data;
			});


		// GET =====================================================================
		Food.get()
			.success(function(data) {
				$scope.foods = data;

				
			});


		// GET =====================================================================
		Category.get()
			.success(function(data) {
				$scope.categories = data;
			});



		$scope.addFood = function(food){
			$scope.loading = true;

			/*$scope.basket.push(food);*/
			//$scope.basketPrice = 0.00;
			
		}



	}]); //main controller


mainController.controller('HomeCtrl', ['$scope' ,
		function($scope) {
			
			$scope.name= "AngularNode101";
	 
		}]); // HomeCtrl



mainController.controller('SpecialCtrl', ['$scope', 'Specials', 'Food',
		function($scope, Specials, Food) {
			$scope.activeFoodIndex;
			$scope.oldFoodPrice = "hi";
			$scope.foodQuantity = [];

			

			$scope.showFoods = function(index){
				$scope.activeFoodIndex = index;
				
					
					for(var i = 0; i < $scope.specials[index].quantity.length; i++){
						//console.log($scope.specials[index].quantity[i]);
						/*$scope.foodQuantity.push($scope.specials[index].quantity[i]);*/
					}
				
			};

			$scope.isShowing = function(index){
				return $scope.activeFoodIndex === index;
			}

			// GET =====================================================================
			Specials.get()
				.success(function(data) {
					$scope.specials = data;

			
			});

			// GET =====================================================================
			Food.get()
				.success(function(data) {
					$scope.foods = data;
			});

			
			


	 
		}]); // SpecialCtrl


mainController.controller('ctrl', ['$scope',
		function($scope){
			$scope.things = [
		        { values: [ 'a', 'b', 'c'] },
		        { values: [ 'd', 'e', 'f'] }
		    ];
		}]); //ctrl


mainController.controller('CheckoutCtrl', ['$scope', 'Food', 'Specials',
		function($scope, Food, Specials) {
			$scope.activeFoodIndex;
			$scope.oldFoodPrice; 
			$scope.basketPrice = Food.getBasketPrice();
			$scope.basket = Food.getBasket();
			$scope.switchTo = "Special";
			$scope.suggestedSpecial = "Every Day Meal";
			$scope.tempBasket = $scope.basket;
			$scope.lengthOfFood = 0 ;
			$scope.tempBasketPrice = $scope.basketPrice;
			$scope.seletedSpecialObj;
			$scope.selectedSpecial = {};

			$scope.logChange = function(){

			}

			$scope.callGetBasket = function(){
				/*$scope.basket = 
				$scope.tempBasket = $scope.basket;*/
			}
			

			
			$scope.callGetBasketPrice = function(){
				//geting the basket price for all the food in the basket
				/*$scope.basketPrice = Food.getBasketPrice();*/
			}

			$scope.getDayName = function(){
				    var d = new Date();
				    var weekday = new Array(7);
				    weekday[0] = "Sunday";
				    weekday[1] = "Monday";
				    weekday[2] = "Tuesday";
				    weekday[3] = "Wednesday";
				    weekday[4] = "Thursday";
				    weekday[5] = "Friday";
				    weekday[6] = "Saturday";

				    $scope.todayName = weekday[d.getDay()];
				    
			}

			  $scope.changedValue = function() {
			  	//$scope.selectedSpecial.val;
			    //alert('Changed to ' + $scope.selectedSpecial.val);
			  };


			$scope.receipt = function(){
				var items = [];
				for(var i = 0; i < $scope.tempBasket.length; i++){
						items.push($scope.tempBasket[i].food_name); 
					}
				alert("You have payed for your order!\n"
					+ "It came to a total of " + $scope.tempBasketPrice + "\n"
					+ "You got: " + JSON.stringify(items)
					);

			}

			$scope.switch = function(){
				if($scope.selectedSpecial.val === undefined){
					alert("Please select a special to switch to!");
				}else{

					if($scope.switchTo === "Special"){
						$scope.switchTo = "Order";
						for(var i = 0; i < $scope.specials.length; i++){
							if($scope.specials[i].special_name == $scope.selectedSpecial.val){
								$scope.selectedSpecialObj = $scope.specials[i];
								$scope.tempBasketPrice = $scope.selectedSpecialObj.price;
								//$scope.tempBasket = $scope.selectedSpecialObj;
								
								$scope.tempBasket = [];
								$scope.basketPrice = Food.getBasketPrice();
								$scope.basket = Food.getBasket();
								$scope.tempBasket.push($scope.selectedSpecialObj);
								
									/*for(var j = 0; j < $scope.foods.length; j++){
										var n = $scope.selectedSpecialObj.items_ids.indexOf($scope.foods[j].food_id);
										if(n > -1)
										{
											$scope.tempBasket.push($scope.foods[j]);

											
										}
									}*/
									
								
							}
						}
						for(var i = 0; i < $scope.tempBasket.length; i++){
								/*console.log("item id" + $scope.selectedSpecialObj.items_ids[i]);
								console.log("special quantity" +$scope.selectedSpecialObj.quantity[i]);
								console.log("food_id" + $scope.tempBasket[i].food_id);
								console.log("food quantity" +$scope.tempBasket[i].quantity);*/

								$scope.tempBasket[i].quantity = $scope.selectedSpecialObj.quantity[i];
							}
					}else{
						$scope.switchTo = "Special";
						$scope.tempBasketPrice = $scope.basketPrice;
						$scope.tempBasket = $scope.basket;
					}



					
				}
			}

			$scope.generateSpecials = function(){
				//LOGIC HERE FOR WHAT SPECIALS ARE SUGGESTED
				//=============================================
				console.log("generate specials");
			}

			$scope.showFoods = function(index){
				$scope.activeFoodIndex = index;
				
					
					/*for(var i = 0; i < $scope.specials[index].quantity.length; i++){
						//console.log($scope.specials[index].quantity[i]);
						/*$scope.foodQuantity.push($scope.specials[index].quantity[i]);*/
					
				
			};

			$scope.isShowing = function(index){
				return $scope.activeFoodIndex === index;
			}

			Food.get()
				.success(function(data){
					$scope.foods2 = data;
					console.log("food 2 hit");
					$scope.lengthOfFood = $scope.foods2.length;
				});

			// GET =====================================================================
			Food.get()
				.success(function(data) {
				$scope.foods = data;
				console.log("food hit");

				$scope.suggestedMessage = "";

				$scope.suggestedSpecial = "";
				$scope.suggestedSpecial2 = "";
				$scope.suggestedSpecial3 = "";
				
				$scope.mondaySpecial = 0;
				$scope.TuesSpecial = 0;
				$scope.WedSpecial = 0;
				$scope.ThurSpecial = 0;
				$scope.FriSpecial = 0;
				$scope.SatSpecial = 0;
				$scope.EVSpecial = 0;

				$scope.hasChips = 0;
				$scope.hasSausages = 0;
				$scope.hasBurgers = 0;
				$scope.hasChicken = 0;
				$scope.hasFish = 0;

				//console.log($scope.specials);

				for(var i = 0; i < $scope.tempBasket.length; i++){
					//console.log($scope.tempBasket[i].category_id);
					if($scope.tempBasket[i].category_id == 0){
						$scope.hasChips ++;
						$scope.mondaySpecial++;
						$scope.TuesSpecial++;
						$scope.WedSpecial++;
						$scope.ThurSpecial++;
						$scope.SatSpecial++;
						$scope.EVSpecial ++;
						//could check here for exact matches on small chips but every special offers only small chips..not point in that
					}
					if($scope.tempBasket[i].category_id == 1){
						$scope.hasSausages++;	
						$scope.SatSpecial ++;
						$scope.EVSpecial ++;
						//specials only contain plain sausages, no logic for exact matches / bonus points
					}
					if($scope.tempBasket[i].category_id == 2){
						$scope.hasBurgers++;

						$scope.mondaySpecial++;
						$scope.ThurSpecial++;
						$scope.EVSpecial ++;
						//for exact matches , award bonus points
						
						for(var j = 0; j < $scope.specials.length; j++){
							var n = $scope.specials[j].items_ids.indexOf($scope.tempBasket[i].food_id);
							if( n > -1){
								//figure out stuff for adding points
								//console.log("x2 point added for " + $scope.specials[j].special_name);
								//adding double points for exact matches on 1/4 pounders & plain burgers
								if($scope.specials[j].special_name == "Monday"){
									$scope.mondaySpecial +=2;
								}else if($scope.specials[j].special_name == "Every Day Meal"){
									$scope.EVSpecial += 2;	
								}else{
									console.log("Ben IDK what happened...1");
								}
							}
						}
						
					}
					if($scope.tempBasket[i].category_id == 3){
						$scope.hasChicken++;
						
						$scope.TuesSpecial++;
						$scope.WedSpecial++;
						$scope.SatSpecial++;
						$scope.EVSpecial++;

						for(var j = 0; j < $scope.specials.length; j++){
							var n = $scope.specials[j].items_ids.indexOf($scope.tempBasket[i].food_id);
							if( n > -1){
							//figure out stuff for adding points
							//console.log("x2 point added for " + $scope.specials[j].special_name);
							//adding double points for exact matches on menu deals with chicken category
							if($scope.specials[j].special_name == "Tuesday"){
									$scope.TuesSpecial +=2;
								}else if($scope.specials[j].special_name == "Wednesday"){
									$scope.WedSpecial += 2;	
								}else if($scope.specials[j].special_name == "Saturday"){
									$scope.SatSpecial += 2;	
								}else if($scope.specials[j].special_name == "Every Day Meal"){
									$scope.EVSpecial += 2;	
								}else{
									console.log("Ben IDK what happened...2");
								}
							}
						}

					}
					if($scope.tempBasket[i].category_id == 4){
						$scope.hasFish++;

						$scope.FriSpecial++;

						for(var j = 0; j < $scope.specials.length; j++){
							var n = $scope.specials[j].items_ids.indexOf($scope.tempBasket[i].food_id);
							if( n > -1){
							//figure out stuff for adding points
							//console.log("x2 point added for " + $scope.specials[j].special_name);
							//adding double points for exact matches on menu deals with chicken category
							if($scope.specials[j].special_name == "Friday"){
									$scope.FriSpecial +=2;
								}else{
									console.log("Ben IDK what happened...3");
								}
							}
						}

					}

				}

				console.log("M " + $scope.mondaySpecial);
				console.log("T "+ $scope.TuesSpecial );
				console.log("W "+$scope.WedSpecial );
				console.log("TH " + $scope.ThurSpecial);
				console.log("F "+$scope.FriSpecial );
				console.log("S "+$scope.SatSpecial);
				console.log("EV "+$scope.EVSpecial);
				console.log("chips "+$scope.hasChips );
				console.log("sausages "+$scope.hasSausages );
				console.log("burgs "+$scope.hasBurgers);
				console.log("chicken "+$scope.hasChicken);
				console.log("fish "+$scope.hasFish);


				var key = "Day";
				var key2 = "Score";

				var mObj = {};
				var tObj = {};
				var wObj = {};
				var thObj = {};
				var fObj = {};
				var sObj = {};
				var evObj = {};

				mObj[key] = "Monday";
				tObj[key] = "Tuesday";
				wObj[key] = "Wednesday";
				thObj[key] = "Thursday";
				fObj[key] = "Friday";
				sObj[key] ="Saturday";
				evObj[key] ="Every Day Meal";

				mObj[key2] = $scope.mondaySpecial;
				tObj[key2] = $scope.TuesSpecial;
				wObj[key2] = $scope.WedSpecial;
				thObj[key2] = $scope.ThurSpecial;
				fObj[key2] = $scope.FriSpecial;
				sObj[key2] = $scope.SatSpecial;
				evObj[key2] = $scope.EVSpecial;


				//put scores into score array and sort
				$scope.menuScore = [];
				$scope.menuScore.push(mObj,tObj,wObj,thObj,fObj,sObj,evObj);
				$scope.menuScore.sort(function(a, b) {
				  return b.Score - a.Score;
				});

				console.log($scope.menuScore);

				//suggests the 3 highest ranking specials for the user
				$scope.suggestedSpecial = $scope.menuScore[0].Day;
				$scope.suggestedSpecial2 = $scope.menuScore[1].Day;
				$scope.suggestedSpecial3 = $scope.menuScore[2].Day;

				$scope.message = "For $";
				$scope.priceDiff = 0;
				$scope.evaluator = "";
				$scope.specialPrice = $scope.specials[i].price;
								
				for(var i = 0; i < $scope.specials.length; i++){
					if($scope.specialPrice > $scope.tempBasketPrice){
						$scope.priceDiff = $scope.specialPrice - $scope.tempBasketPrice;
						$scope.evaluator = "more";
					}else if($scope.specialPrice < $scope.tempBasketPrice){
						$scope.priceDiff = $scope.tempBasketPrice - $scope.specialPrice;
						$scope.evaluator = "less";
					}else if($scope.specialPrice == $scope.tempBasketPrice){
						$scope.priceDiff = 0;
					}
					$scope.message = "For $" + $scope.priceDiff + " " + $scope.evaluator + " you can get " ;
					$scope.specials[i].messages = $scope.message;
				}
			});

			// GET =====================================================================
			Specials.get()
				.success(function(data) {
					$scope.specials = data;
					console.log("specials hit");
					//this replaces the quanityt value for the specials quanities
					for(var i = 0; i < $scope.specials.length; i++){
						for(var j = 0; j < $scope.specials[i].items_ids.length; j++){
							//console.log("special id" + $scope.specials[i].items_ids[j]);
							//console.log("special quantity" + $scope.specials[i].quantity[j]);
							//console.log($scope.foods.length);
							for(var k = 0; k < $scope.foods2.length; k++){
								if($scope.foods2[k].food_id == $scope.specials[i].items_ids[j]){
									$scope.foods2[k].quantity = $scope.specials[i].quantity[j];
									//console.log($scope.foods[k].quantity);
								}
							}
						}
					}
			});
		}]); //checkout ctrl



