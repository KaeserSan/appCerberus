/*jshint esversion:6 */
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;
var path = require('path');
// SENDFILE
var fs = require('fs');
var exec = require("child_process").exec;
var mime = require('mime');
var url = require('url');



var url="mongodb://localhost:27017/CerberusRPC";
// var $ = require('jquery');

var _tasks = {};
var counter = 0;

exports.checkUser = function ( param1, callback ){
  console.log("checkUser: ");
  console.log( param1 );
  let filter = {
    usuario: param1.usu_form,
    pass: param1.pass_form
   };
  let project = {};
  let collection = 'user';
  let userOk = getMongoData(filter, project, collection, function( data ){
    console.log(data.length);
    if ( data.length === 0 ) {
      callback( false );
    }
    else {
      callback ( true ) ;
    }
  });
};

exports.getDocsOci = function ( cliente, ejercicio, callback ){
  console.log("getDocsOci: ");
  console.log( cliente );
  let filter = {};
  let project = {};
  let collection = 'oci';
  let userOk = getMongoData(filter, project, collection, function( data ){
    // console.log( data );
    if ( data.length === 0 ) {
      callback( {} );
    }
    else {
      callback ( data ) ;
    }
  });
};

exports.sendFile = function ( file, response, callback ){
  console.log("sendingFile...");
  console.log( file );
  let fileName = file.filename;
  let filePath = file.filepath;
  let fullFilePath = path.join(__dirname, "Data/", filePath);
  let mimetype = mime.lookup(fullFilePath);

  console.log("Have set file info, starting download...");
  console.log( fullFilePath );
  response.setHeader('Content-disposition', 'attachment; filename=' + fileName);
  response.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(fullFilePath);
  filestream.on('data', function(chunk) {
      response.write(chunk);
      console.log("Have set file info, starting download...");
  });
  filestream.on('end', function() {
      response.end();
      callback( true );
  });
};

function getFileInfo(request) {
    fileName = url.parse(request.url, true).query.file;
    console.log("File Name: " + fileName);

    filePath = __dirname + "/Files/" + fileName;
    console.log("File Path: " + filePath);

    mimetype = mime.lookup(fileName);
    console.log("Mime Type: " + mimetype);
}
// var fs = require('fs');
// var exec = require("child_process").exec;
// var mime = require('mime');
// var url = require('url');

// var fileName;
// var filePath;
// var mimetype;

// function downloadFile(request, response) {
//     console.log("Request handler 'downloadFile' was called.");

//     // use exec so that this handler is non-blocking
//     exec(getFileInfo(request), function(error, stdout, stderr) {
//         console.log("Have set file info, starting download...");

//         response.setHeader('Content-disposition', 'attachment; filename=' + fileName);
//         response.setHeader('Content-type', mimetype);

//         var filestream = fs.createReadStream(filePath);
//         filestream.on('data', function(chunk) {
//             response.write(chunk);
//             console.log("Have set file info, starting download...");
//         });
//         filestream.on('end', function() {
//             response.end();
//         }
//     );

//     });
// }



























function getMongoData ( filter, project, collection, callback ){
  filter = filter || {};
  project = project || {};

  console.log( "filter: ");
  console.log( filter );
  console.log( "project: ");
  console.log( project );
  mongo.connect(url, function(err, db) {
    if (err) { console.log( "Error conecting DB: " + error );}
    let result = db.collection(collection).find( filter, project );
    result.toArray(function(error, data){
      if (error) { console.log("Error en los datos..." + err);}
      callback( data );
      });
    });
}














// var users = [
//   {
//     id: 1,
//     name: "my first task",
//     completed: false,
//     timeDateCreation: new Date("01/01/2000"),
//     timeDateCompletion: undefined
//   },
//   {
//     id: 2,
//     name: "another task",
//     completed: false,
//     timeDateCreation: new Date("01/01/2001"),
//     timeDateCompletion: undefined
//   },
//   {
//     id: 3,
//     name: "and another task one more time",
//     completed: false,
//     timeDateCreation: new Date("01/01/2002"),
//     timeDateCompletion: undefined
//   }
// ];
// var counter = 100;