angular.module("mySpotifyAppControllers")
	.controller('albumsController', function($rootScope, $scope, spotifyService ) {

		$scope.$watch("album", function(newValueAlbum, oldValue) {

			if (newValueAlbum) {
				spotifyService.getTracks( newValueAlbum )
					.then(function( dataFromApi ) {
						$scope.$parent.$parent.tracks = dataFromApi.data.items;
					})
			}

		})
	})