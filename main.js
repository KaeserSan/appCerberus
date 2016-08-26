/*jshint esversion:6 */
let mongo = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let ObjectId = require('mongodb').ObjectID;
let path = require('path');

// SENDFILE
let fs = require('fs');
let exec = require("child_process").exec;
let mime = require('mime');
let url = require('url');
// SENDFILE

// let Promise = require('promise');
let rp = require('request-promise');
var mongoose = require('mongoose');
var Promise = require('promise');
mongoose.Promise = Promise;

var mongoUrl="mongodb://localhost:27017/CerberusRPCtest";
mongoose.connect(mongoUrl);

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + mongoUrl);
});
var masterSchema = require("./dbSchemas/masterSchema.js");



exports.checkUser = function ( param1, callback ){
  let filter = {
    usuario: param1.usu_form,
    password: param1.pass_form
   };
  let project = {};
  masterSchema.masterusuarios.find(filter, project)
  .populate('clientes')
  .exec( function(err, data){
    if ( err ){ callback( false );}
    callback( data );
  });
};

exports.checkUserTest = function ( param1, callback ){
  let filter = param1;
  let project = {};
  masterSchema.masterusuarios.find(filter, project)
  .populate('clientes')
  .exec( function(err, data){
    callback( data );
  });
};

// exports.getExercices = function ( callback ){
//   let filter = {};
//   let project = { ejercicio: { id: 1} };
//   masterSchema.masterclientes
//     .find()
//     .distinct("ejercicio.id")
//     .exec( function(err, data){
//       console.log("getting...");
//       console.log( data );
//       let dataInt = data.map( function( dat ){
//                       return parseInt( dat, 10 );
//                     });
//       let currentYear = new Date().getFullYear();
//       if (dataInt.indexOf( currentYear ) === -1){
//         dataInt.push( currentYear );
//       }
//       callback( dataInt );
//       // return( dataInt );
//     });
// };

exports.getExercices = function ( ){

  let filter = {};
  let project = { ejercicio: { id: 1} };

  // return a Promise
  return masterSchema.masterclientes
    .find()
    .distinct("ejercicio.id");
    // .then( function(err, data){
    //   if ( err ){ console.log( err );}
    //   console.log("getting...");
    //   console.log( data );
    //   dataInt = data.map( function( dat ){
    //     return parseInt( dat, 10 );
    //   });
    //   let currentYear = new Date().getFullYear();
    //   if (dataInt.indexOf( currentYear ) === -1){
    //     console.log("current year is no more, adding... " + currentYear);
    //     dataInt.push( currentYear );
    //     console.log( dataInt );
    //   }
    //   // callback( dataInt );
    //   console.log( "returninggggg" );
    //   console.log( dataInt );
    //   // return( dataInt );
    //   return( dataInt );
    // });

};



exports.getCustomer = function( aClients, callback ){
  let result = {};
  let groupPromisesGetClients = [];
  let clientsCollection = masterSchema.masterclientes;

  aClients.forEach( function( clientId ){

    let query = { 
    "_id": ObjectId( clientId ) 
    }

    let projection = {
      "codigoCliente": 1, 
      "nombreCliente": 1
    }

    let promise =  clientsCollection.find(query, projection)
      .exec( function( err, dataMongo ){
        return dataMongo;
      });
    groupPromisesGetClients.push(promise)
  });

  return Promise.all(groupPromisesGetClients);

};







exports.getDocsOci = function ( cliente, ejercicio, callback ){
  console.log("getDocsOci: ");
  console.log( cliente );
  let filter = {};
  let project = {};
  let collection = 'clientes';
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

/// Code for sending files to browser START
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
/// Code for sending files to browser END

/// Examples Code for sending files to browser START
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
/// Example Code for sending files to browser END




// SAVE DATA MONGOOSE WITH RELATIONED SAVED DATA
// var aaron = new Person({ _id: 0, name: 'Aaron', age: 100 });

// aaron.save(function (err) {
//   if (err) return handleError(err);
  
//   var story1 = new Story({
//     title: "Once upon a timex.",
//     _creator: aaron._id    // assign the _id from the person
//   });
  
//   story1.save(function (err) {
//     if (err) return handleError(err);
//     // thats it!
//   });
// });
// SAVE DATA MONGOOSE WITH RELATIONED SAVED DATA























//Use Mongo without mongoose
// function getMongoData ( filter, project, collection, callback ){
//   filter = filter || {};
//   project = project || {};

//   // console.log('-------MONGO-------');
//   // console.log( "filter: ");
//   // console.log( filter );
//   // console.log( "project: ");
//   // console.log( project );
//   mongo.connect(mongoUrl, function(err, db) {
//     if (err) { console.log( "Error conecting DB: " + error );}
//     let result = db.collection(collection).find( filter, project );
//     result.toArray(function(error, data){
//       if (error) { console.log("Error en los datos..." + err);}
//       callback( data );
//       });
//     });
// }












