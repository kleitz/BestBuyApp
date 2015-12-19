angular.module('starter.productController', [])

.controller('productCtrl', function ($scope, $timeout, Products, $log, localStorageService, $location, $http) {

	$scope.init = function () {

		//Double check for Login
		var accessToken = localStorageService.get('accessToken');
		if (!accessToken && accessToken == "") {
			$location.path("/login");
		} else {
			$scope.getProducts();
		}
	}

	$timeout($scope.init);

	$scope.getProducts = function () {

		Products.getAllProducts().then(function (response) {

			$scope.productList = response.data.products;
			
		});
	};

	$scope.searchProducts = function () {
		
		if (!this.searchText || this.searchText == "") {

			this.getProducts();
			return;
		};
		
		$log.debug("Search for product - "+this.searchText);

		Products.searchProducts(this.searchText).then(function (response) {
			$scope.productList = response.data.products;
			if($scope.productList.length == 0){
				
				$log.debug("No product found for - "+this.searchText);
				alert("No product found.");
			}
		});
	};
});