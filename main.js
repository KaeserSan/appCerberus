/* jshint esversion:6 */
const mongo = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID;
const path = require('path');
const _ = require('underscore');
const rp = require('request-promise');
const mongoose = require('mongoose');
const Promise = require('promise');

mongoose.Promise = Promise;

// SENDFILE
const fs = require('fs');
const exec = require('child_process').exec;
const mime = require('mime');
const url = require('url');
// SENDFILE

// let Promise = require('promise');

const mongoUrl = 'mongodb://localhost:27017/CerberusRPCtest';
mongoose.connect(mongoUrl);

mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + mongoUrl);
});
const masterSchema = require('./dbSchemas/masterSchema');


/**
 * Add two numbers.
 * @param {number} param1 The first number.
 * @param {number} callback The second number.
 * @returns {number} The sum of the two numbers.
 */
function checkUser(param1, callback) {
  const filter = {
    usuario: param1.usu_form,
    password: param1.pass_form,
  };
  const project = {};
  masterSchema.masterusuarios.find(filter, project)
  .populate('clientes')
  .exec(function(err, data) {
    if (err) { callback(false); }
    callback(data);
  });
}

function checkUserTest(param1, callback) {
  const filter = param1;
  const project = {};
  masterSchema.masterusuarios.find(filter, project)
  .populate('clientes')
  .exec(function(err, data) {
    callback(data);
  });
}

function getExercices() {
  const filter = {};
  const project = { ejercicio: { id: 1 } };
  // return a Promise
  return masterSchema.masterclientes
    .find()
    .distinct('ejercicio.id');
}

function getCustomer(aClients, callback) {
  const result = {};
  const groupPromisesGetClients = [];
  const clientsCollection = masterSchema.masterclientes;

  aClients.forEach(function(clientId) {

    const query = {
      _id: ObjectId(clientId),
    };

    const projection = {
      'datos.codigo': 1,
      'datos.nombre': 1,
    };

    const promise = clientsCollection.find(query, projection)
      .exec(function(err, dataMongo) {
        return dataMongo;
      });
    groupPromisesGetClients.push(promise);
  });

  return Promise.all(groupPromisesGetClients);
}

function getData(cookies, callback) {

  if (_.isEmpty(cookies)) {
    console.log('Empty cookies, exiting...');
    callback(false);
  }
  const usuario = cookies.usuario;
  const clientes = cookies.clientes;
  const data = {};
  const dataEx = [];
  const aEjercicios = [];
  const aClientes = [];
  const oTemp = {};

  const aPromises = [getExercices(), getCustomer(clientes)];

  Promise.all(aPromises)
    .then(function(aResults) {
      aResults[0].forEach(function(data) {
        oTemp.year = parseInt(data, 10);
        aEjercicios.push(oTemp);
      });

      const currentYear = new Date().getFullYear();
      if (_.findWhere(aEjercicios, { year: currentYear }) === undefined) {
        aEjercicios.push({ year: currentYear });
      }

      data.ejercicios = aEjercicios;

      aResults[1].forEach(function(data) {
        aClientes.push(data[0]);
      });
      data.clientes = aClientes;

      callback(data);
    });
}

function getDocsOci(filtro, ejercicio, callback) {
  console.log('getDocsOci: ');
  console.log(filtro);
  const filter = {
    'datos.codigo': Number(filtro.cliente),
    'ejercicio.id': Number(filtro.ejercicio),
  };
  const project = {};
  project = {
    _id: 0,
    'ejercicio.documentos.oci.estatutos': 1,
  };

  masterSchema.masterclientes.find(filter, project) // 'favorites.food'
    .exec(function(err, data) {
    if (err) { console.log(err); }
      console.log(data[0].ejercicio[0].documentos.oci.estatutos[0]);
    });
}

function getDocsTest(param1, param2, callback) {
  let filter = param1;
  let project = param2;
  masterSchema.masterclientes.find(filter, project)
  .exec(function(err, data) {
    callback(data);
  });
}



/// Code for sending files to browser START
exports.sendFile = function(file, response, callback) {
  console.log('sendingFile...');
  console.log(file);
  let fileName = file.filename;
  let filePath = file.filepath;
  let fullFilePath = path.join(__dirname, 'Data/', filePath);
  let mimetype = mime.lookup(fullFilePath);

  console.log('Have set file info, starting download...');
  console.log(fullFilePath);
  response.setHeader('Content-disposition', 'attachment; filename=' + fileName);
  response.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(fullFilePath);
  filestream.on('data', function(chunk) {
      response.write(chunk);
      console.log('Have set file info, starting download...');
  });
  filestream.on('end', function() {
      response.end();
      callback(true);
  });
};

function getFileInfo(request) {
    fileName = url.parse(request.url, true).query.file;
    console.log('File Name: ' + fileName);

    filePath = __dirname + '/Files/' + fileName;
    console.log('File Path: ' + filePath);

    mimetype = mime.lookup(fileName);
    console.log('Mime Type: ' + mimetype);
}
/// Code for sending files to browser END




// SAVE DATA MONGOOSE WITH RELATIONED SAVED DATA
// var aaron = new Person({ _id: 0, name: 'Aaron', age: 100 });

// aaron.save(function(err) {
//   if (err) return handleError(err);
  
//   var story1 = new Story({
//     title: 'Once upon a timex.',
//     _creator: aaron._id    // assign the _id from the person
//   });
  
//   story1.save(function(err) {
//     if (err) return handleError(err);
//     // thats it!
//   });
// });
// SAVE DATA MONGOOSE WITH RELATIONED SAVED DATA























//Use Mongo without mongoose
// function getMongoData(filter, project, collection, callback) {
//   filter = filter || {};
//   project = project || {};

//   // console.log('-------MONGO-------');
//   // console.log('filter: ');
//   // console.log(filter);
//   // console.log('project: ');
//   // console.log(project);
//   mongo.connect(mongoUrl, function(err, db) {
//     if (err) { console.log('Error conecting DB: ' + error);}
//     let result = db.collection(collection).find(filter, project);
//     result.toArray(function(error, data) {
//       if (error) { console.log('Error en los datos...' + err);}
//       callback(data);
//       });
//     });
// }






exports.checkUser = checkUser;
exports.checkUserTest = checkUserTest;
exports.getExercices = getExercices;
exports.getCustomer = getCustomer;
exports.getData = getData;
exports.getDocsOci = getDocsOci;
exports.getDocsTest = getDocsTest;








