angular.module("mySpotifyAppControllers")
	.controller('artistsController', function( $rootScope, $scope, spotifyService ) {

		$scope.$watch("artist", function(newValueArtist, oldValue) {

			if (newValueArtist) {
				spotifyService.getAlbums( newValueArtist )
					.then(function( dataFromApi ) {
						$scope.$parent.$parent.albums = dataFromApi.data.items;
					})
			}
		});

	})