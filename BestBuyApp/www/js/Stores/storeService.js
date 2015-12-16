angular.module('starter.storeService', [])

.factory('Stores', function ($http) {
	return {

		getAllLocations: function (position) {

			var url = 'http://api.bestbuy.com/v1/stores?format=json&apiKey=n3yt4tzd7r9gyruxdc6mtqpd';

			if (position) {
				url = 'http://api.bestbuy.com/v1/stores(area(' + position.latitude + ',' + position.longitude + ',1000))?format=json&apiKey=n3yt4tzd7r9gyruxdc6mtqpd';
			}

			var promise = $http({
					method: 'GET',
					url: url
				})
				.success(function (data, status, headers, config) {
					return data;
				})
				.error(function (data, status, headers, config) {
					
					$log.debug("Error while getting All Location - "+data);
					return data;
				});

			return promise;
		},

		searchLocation: function (searchText) {

			var url = 'http://api.bestbuy.com/v1/stores(city=' + searchText + ')?format=json&apiKey=n3yt4tzd7r9gyruxdc6mtqpd';
			// Simple GET request example:
			var promise = $http({
					method: 'GET',
					url: url
				})
				.success(function (data, status, headers, config) {
					return data;
				})
				.error(function (data, status, headers, config) {
					
					$log.debug("Error while searching "+searchText+" - "+data);
					return data;
				});
			return promise;
		}
	}
});