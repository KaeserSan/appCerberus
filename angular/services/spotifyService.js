angular.module("myAppServices")
	.factory('spotifyService', function ($http) {

		var urlSearch = 'https://api.spotify.com/v1/search?type=artist&query=<VALUE>'
		var urlAlbums = 'https://api.spotify.com/v1/artists/<ID-ARTIST>/albums'
		var urlTracks = 'https://api.spotify.com/v1/albums/<ID-ALBUM>/tracks'

		function getArtists ( valueToSearch ) {
			var url  = urlSearch.replace('<VALUE>', valueToSearch)
			return 	$http.get(url)
		}

		function getAlbums ( idArtist ) {
			var url  = urlAlbums.replace('<ID-ARTIST>', idArtist)
			return 	$http.get(url)
		}

		function getTracks ( idAlbum ) {
			var url  = urlTracks.replace('<ID-ALBUM>', idAlbum)
			return 	$http.get(url)
		}

		return {
			getArtists : getArtists,
			getAlbums : getAlbums,
			getTracks : getTracks
		}
	})