angular.module('starter.loginController', [])

.controller('loginCtrl', function ($scope, $rootScope, $cordovaOauth, localStorageService, $location, $timeout, $log) {

	$scope.init = function () {

		var accessToken = localStorageService.get('accessToken');
		if (accessToken && accessToken != "") {

			$location.path("/tab");
		}
	};

	$timeout($scope.init);

	$scope.LoginWithFacebook = function () {

		$cordovaOauth.facebook("541435559356423", ["email,public_profile,user_about_me"]).then(function (result) {
			//console.log("Response Object -> " + JSON.stringify(result));
			localStorageService.set('accessToken', result.access_token);
			localStorageService.set('isLoginWithFacebook', "true");
			localStorageService.remove('userProfileData')

			$log.debug("Facebook User - Logged In !");
			
			$location.path("/tab");

		}, function (error) {

			$log.debug(error);
		});
	};

	$scope.Login = function () {

		if (this.username != "guest" && this.password.length >= 5) {
			localStorageService.set('accessToken', "xxxxxxxxxxxxxxxx");
			localStorageService.set('isLoginWithFacebook', "false");

			var profileData = {};
			profileData.name = this.username;
			profileData.picture = "img/placeholderImage.png";

			localStorageService.set('userProfileData', JSON.stringify(profileData));
			localStorageService.set('username',this.username);
			
			$log.debug(this.username+ " - Logged In !");

			$location.path("/tab");

		} else {

			if (this.username == "guest") {

				$log.debug("Trying to login with \"Guest\" username");
				alert("Guest is not accepted!");
				
			} else if (this.password.length < 5) {

				$log.debug("Password is less than 5 characters");
				alert("Password must be 5 characters long or longer.");
			}
		}
	};
});