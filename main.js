/*jshint esversion:6 */
let mongo = require('mongodb').MongoClient,
    bodyParser = require('body-parser'),
    ObjectId = require('mongodb').ObjectID,
    path = require('path'),
    _ = require( 'underscore' ),
    rp = require('request-promise'),
    mongoose = require('mongoose'),
    Promise = require('promise');
mongoose.Promise = Promise;

// SENDFILE
let fs = require('fs'),
    exec = require("child_process").exec,
    mime = require('mime'),
    url = require('url');
// SENDFILE

// let Promise = require('promise');

var mongoUrl="mongodb://localhost:27017/CerberusRPCtest";
mongoose.connect(mongoUrl);

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + mongoUrl);
});
var masterSchema = require("./dbSchemas/masterSchema.js");



exports.checkUser = checkUser;
exports.checkUserTest = checkUserTest;
exports.getExercices = getExercices;
exports.getCustomer = getCustomer;
exports.getData = getData;
exports.getDocsOci = getDocsOci;
exports.getDocsTest = getDocsTest;


function checkUser ( param1, callback ){
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
}

function checkUserTest ( param1, callback ){
  let filter = param1;
  let project = {};
  masterSchema.masterusuarios.find(filter, project)
  .populate('clientes')
  .exec( function(err, data){
    callback( data );
  });
}

function getExercices ( ){
  console.log("Inside getExercices...");

  let filter = {};
  let project = { ejercicio: { id: 1} };

  // return a Promise
  return masterSchema.masterclientes
    .find()
    .distinct("ejercicio.id");
}

function getCustomer ( aClients, callback ){
  let result = {};
  let groupPromisesGetClients = [];
  let clientsCollection = masterSchema.masterclientes;

  console.log("..function getCustomers");
  console.log( aClients );
  aClients.forEach( function( clientId ){

    let query = {
    "_id": ObjectId( clientId )
    };

    let projection = {
      "datos.codigo": 1,
      "datos.nombre": 1
    };

    let promise =  clientsCollection.find(query, projection)
      .exec( function( err, dataMongo ){
        return dataMongo;
      });
    groupPromisesGetClients.push(promise);
  });
  console.log("finishing getcustomer function");
  return Promise.all(groupPromisesGetClients);
}

function getData( cookies , callback ){
  console.log( "inside function for getting data object" );
  console.log( cookies );
  if ( _.isEmpty( cookies )){
    console.log("Empty cookies, exiting...");
    callback( false );
  }
  var usuario = cookies.usuario;
  var clientes = cookies.clientes;
  var data = {};
  var dataEx = [];
  var aEjercicios = [];
  var aClientes = [];
  var oTemp = {};

  console.log( "cookies" );
  console.log( usuario );
  console.log( clientes );
  var aPromises = [ getExercices(), getCustomer( clientes ) ];

  Promise.all(aPromises)
    .then( function( aResults ){
      console.log( "all promises done" );
      aResults[0].forEach( function( data ){
        oTemp.year = parseInt(data, 10);
        aEjercicios.push(oTemp);
      });

      let currentYear = new Date().getFullYear();
      if ( _.findWhere(aEjercicios, { year: currentYear }) === undefined){
        aEjercicios.push( { year: currentYear} );
      }

      data.ejercicios = aEjercicios;

      aResults[1].forEach( function( data ){
        aClientes.push( data[0] );
      });
      data.clientes = aClientes;

      console.log( "returning data object" );
      callback ( data );
    });

}

function getDocsOci ( filtro, ejercicio, callback ){
  console.log("getDocsOci: ");
  console.log( filtro );
  let filter = {
              "datos.codigo": Number(filtro.cliente),
              "ejercicio.id": Number(filtro.ejercicio)
            };
  let project = {};
  project = { "ejercicio.documentos.oci.estatutos": 1 };
  let collection = 'clientes';

  masterSchema.masterclientes.find( filter, project ) //"favorites.food"
    .exec( function(err, data){
    if ( err ){ console.log( err );}
    console.log( data );
  });

}

function getDocsTest ( param1, param2, callback ){
  let filter = param1;
  let project = param2;
  masterSchema.masterclientes.find(filter, project)
  .exec( function(err, data){
    callback( data );
  });
}



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












