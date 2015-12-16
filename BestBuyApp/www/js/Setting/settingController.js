angular.module('starter.settingController', [])

.controller('settingCtrl', function ($scope, $http, $log, $timeout, $location, localStorageService) {

	$scope.logs = JSON.parse($log.getErrors());
	//	$scope.$on('$ionicView.enter', function(){
	//
	//	});

	$scope.init = function () {
		
		var accessToken = localStorageService.get('accessToken');
		var loginTypeFacebook = localStorageService.get('isLoginWithFacebook');

		if (loginTypeFacebook == "true") {

			if (accessToken && accessToken != "") {

				$http.get("https://graph.facebook.com/v2.2/me", {
					params: {
						access_token: accessToken,
						fields: "id,name,picture",
						format: "json"
					}
				}).then(function (result) {

					$scope.profileData = result.data;
					$scope.name = result.data.name;
					$scope.picture = result.data.picture.data.url;
					
					$log.debug("Facebook User Name - "+result.data.name);
					
					localStorageService.set('username',result.data.name);

				}, function (error) {
					alert("There was a problem while getting your profile.");
					$log.debug(error);
				});
			} else {
				//alert("Not signed in");
				$location.path("/login");
			}
		} else if (loginTypeFacebook == "false") {

			var profileData = JSON.parse(localStorageService.get('userProfileData'));
			$scope.name = profileData.name;
			$scope.picture = profileData.picture;
		} else {

			$location.path("/login");
		}
	};

	$scope.logOut = function () {

		$log.debug(localStorageService.get('username') + " - Logged Out !");
		
		localStorageService.remove('accessToken');
		localStorageService.remove('isLoginWithFacebook');
		localStorageService.remove('userProfileData');
		localStorageService.remove('username');
		
		$location.path("/login");
		
		
	}

	$timeout($scope.init);
});