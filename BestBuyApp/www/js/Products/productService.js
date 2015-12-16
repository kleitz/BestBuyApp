angular.module('starter.productService', [])

.factory('Products', function ($http,$log) {
	return {

		getAllProducts: function () {

			var promise = $http({
					method: 'GET',
					url: 'http://api.bestbuy.com/v1/products?show=name,sku,salePrice,image,largeImage&pageSize=15&sort=customerReviewAverage.desc&format=json&apiKey=n3yt4tzd7r9gyruxdc6mtqpd'
				})
				.success(function (data, status, headers, config) {
					return data;
				})
				.error(function (data, status, headers, config) {
					$log.debug("Error while getting All Product - "+ data);
					return data;
				});

			return promise;
		},

		searchProducts: function (searchText) {

			var url = 'http://api.bestbuy.com/v1/products((search=' + searchText + '))?show=name,sku,salePrice,image,largeImage&pageSize=15&sort=customerReviewAverage.desc&format=json&apiKey=n3yt4tzd7r9gyruxdc6mtqpd';
			// Simple GET request example:
			var promise = $http({
					method: 'GET',
					url: url
				})
				.success(function (data, status, headers, config) {
					return data;
				})
				.error(function (data, status, headers, config) {
					$log.debug("Error while search "+searchText+" - "+ data);
					
					return data;
				});
			return promise;
		}
	}
});