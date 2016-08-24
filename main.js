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
// let Promise = require('promise');
let rp = require('request-promise');
var mongoose = require('mongoose');




var mongoUrl="mongodb://localhost:27017/CerberusRPCtest";
mongoose.connect(mongoUrl);

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + mongoUrl);
});
var masterSchema = require("./dbSchemas/masterSchema.js");
// var masterClientes = require("./dbSchemas/masterClientesSchema.js");
// var masterUsuarios = require("./dbSchemas/masterUsuariosSchema.js");






exports.checkUser = function ( param1, callback ){
  // console.log("checkUser: ");
  // console.log( param1 );
  let filter = {
    usuario: param1.usu_form,
    password: param1.pass_form
   };
  let project = {};

  masterSchema.masterusuarios.find(filter, project)
  .populate('clientes')
  .exec( function(err, data){
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


// exports.checkUser = function ( param1, callback ){
//   // console.log("checkUser: ");
//   // console.log( param1 );
//   let filter = {
//     usuario: param1.usu_form,
//     password: param1.pass_form
//    };
//   let project = {};
//   // let collection = 'users';
//   let collection = 'masterusuarios';
//   let userOk = getMongoData(filter, project, collection, function( data ){
//     console.log(data.length);
//     if ( data.length === 0 ) {
//       callback( false );
//     }
//     else {
//         callback ( { data: data } ) ;
//       }
//   });
// };



// function getCustomers( aParam, callback ){
//   console.log("getCustomers...");
//   console.log( aParam );
//   var result= [];
//   let oTemp;
  
//   // Convert aParam to array
  
//   var aParamPromises = aParam.map( function( data, i ) {
//     return rp( data ); // returns a promise
//   });

//   Promise.all(aParamPromises)
//     .then( function( aResults ) {
//       aResults.forEach( function( data, i ) {
        
//       });





//   aParam.forEach( function(data, i){
//     let filter = {
//       codigoCliente: data.id
//      };
//     let project = {};
//     let collection = 'clientes';
//     let customers = getMongoData(filter, project, collection, function( dataCustomers ){
//       // console.log("dentro bucle clientes");
//       // console.log( dataCustomers[0].nombreCliente );
//       oTemp = {
//         id: dataCustomers[0].codigoCliente,
//         nombre: dataCustomers[0].nombreCliente
//       };
//       console.log("...pushingCustomers...oTemp");
//       console.log( oTemp );
//       result.push(oTemp);
//       console.log( result );
//     });
//   });

//   console.log("--getCustomers--");
//   console.log( result );
//   callback( result );
// }


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
























function getMongoData ( filter, project, collection, callback ){
  filter = filter || {};
  project = project || {};

  // console.log('-------MONGO-------');
  // console.log( "filter: ");
  // console.log( filter );
  // console.log( "project: ");
  // console.log( project );
  mongo.connect(mongoUrl, function(err, db) {
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