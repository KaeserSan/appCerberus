angular.module("myAppControllers",[ 'myAppServices' ])
	.controller("mainAppController", function($rootScope, $scope, carsService ) {
    console.log("mainAppController loaded...");
    // $scope.submit = function() {
    //   spotifyService.getArtists( $scope.searchValue )
    //     .then(function( dataFromApi ) {
    //       $scope.artists = dataFromApi.data.artists.items;
    //     })
    // }
    $scope.submit = function(  ) {
      console.log("button pressed");
      console.log( $scope.text_search );
      carsService.getOffers( $scope.text_search )
        .then(function( data ) {
          console.log( data );
          console.log( $(data) );
        });
    };

	});