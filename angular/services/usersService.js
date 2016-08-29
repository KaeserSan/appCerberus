angular.module("myAppServices")
	.factory('usersService', function ($http) {
		console.log('usersService loaded...');

		var url="mongodb://localhost:27017/toDo";

		function getUsers ( filter, project, callback ){
	  filter = filter || {};
	  project = project || {};

	  console.log( filter );
	  console.log( project );
	  mongo.connect(url, function(err, db) {
	    if (err) { console.log( "Error conecting DB: " + error );}
	    var result = db.collection("tasks").find( filter, project );
	    result.toArray(function(error, data){
	      if (error) { console.log("Error en los datos..." + err);}
	      callback( data );
		    });
		  });
		}






		return{
			getUsers: getUsers
		};

	});


// Coches.net
	// $("#btn_buscar").click(function(e) {
 //        return buscar($(".txt_buscar").val()) });


// 	function getTasks ( filter, project, callback ){
//   filter = filter || {};
//   project = project || {};

//   console.log( filter );
//   console.log( project );
//   mongo.connect(url, function(err, db) {
//     if (err) { console.log( "Error conecting DB: " + error );}
//     var result = db.collection("tasks").find( filter, project );
//     result.toArray(function(error, data){
//       if (error) { console.log("Error en los datos..." + err);}
//       callback( data );
//     });
//   });
// }
