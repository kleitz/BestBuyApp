angular.module('starter.storeController', [])

.controller('storeCtrl', function ($scope, Stores, $location, $geolocation, $timeout, $log, localStorageService) {

	$timeout($scope.init);

	$scope.init = function () {
		//Double check for Login
		var accessToken = localStorageService.get('accessToken');
		if (!accessToken && accessToken == "") {
			$location.path("/login");
		} else {

			$scope.getCurrentLocation();
		}
	}

	$timeout($scope.init);

	$scope.getCurrentLocation = function () {

		$geolocation.getCurrentPosition({
			timeout: 60000
		}).then(function (position) {
			
			$log.debug('current latitude : ' + position.coords.latitude);
			$log.debug('current longitude : ' + position.coords.longitude);

			$scope.myPosition = position.coords;
			$scope.getStoreLocations(position.coords);
		});
	};

	$scope.getStoreLocations = function (postion) {

		Stores.getAllLocations(postion).then(function (response) {
			$scope.locationList = response.data.stores;
			//console.log("products :" + JSON.stringify(response.data.products));
		});
	};

	$scope.searchForLocation = function () {
		
		if (!this.searchLocationText || this.searchLocationText == "") {
			this.getStoreLocations();
			return;
		};
		
		$log.debug("Search for product - "+this.searchLocationText);

		Stores.searchLocation(this.searchLocationText).then(function (response) {
			$scope.locationList = response.data.stores;
			
			if($scope.locationList.length == 0){
				
				$log.debug("Not any Store found for - " + $scope.searchLocationText );
				alert("Not any Store found for this city.");
			}

		});
	};
});