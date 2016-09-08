/* jshint esversion:6 */
const mongo = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID;
const path = require('path');
const _ = require('underscore');
const rp = require('request-promise');
const mongoose = require('mongoose');
const Promise = require('promise');
const models = require( './models' );
const db = require( './db' );
const bcrypt = require ( 'bcrypt-nodejs' );
const fs = require( 'fs' );

mongoose.Promise = Promise;

const mongoUrl = 'mongodb://localhost:27017/CerberusRPCtest';
const conexion = db.connect( mongoUrl );
// exports.conexion = conexion;

function checkUser( param1 ) {
  const filter = {
    user: param1.usu_form,
    password: param1.pass_form,
  };
  const project = {};

  return process.getModel('users').find(filter, project)
  .populate('clients');
}

function checkUserTest( param1 ) {
  const filter = param1;
  const project = {};
  process.getModel('users').find(filter, project)
  .populate('clientes')
  .exec( ( err, data ) => callback(data) );
}

function getExercices() {
  console.log('---getExercices');
  const filter = {};
  const project = { ejercicio: { id: 1 } };
  // return a Promise
  return process.getModel('clients')
    .find()
    .distinct('ejercicio.id');
}

function getClients(aClients, callback) {
  console.log('---getClients');
  const result = {};
  const groupPromisesGetClients = [];

  aClients.forEach(function(clientId) {
    const query = {
      _id: ObjectId(clientId),
    };

    const projection = {
      'datos.codigo': 1,
      'datos.nombre': 1,
      'datos.logo': 1,
    };

    const promise = process.getModel('clients').find(query, projection)
      .exec(function(err, dataMongo) {
        return dataMongo;
      });
    groupPromisesGetClients.push(promise);
  });

  return Promise.all(groupPromisesGetClients);
}

function getData(cookies, callback) {
  console.log('--- getData');
  console.log( cookies );
  if (_.isEmpty(cookies)) {
    console.log('Empty cookies, exiting...');
    callback(false);
  }
  const user   = cookies.user.user;
  const clientes = cookies.user.clients;
  const data     = {};
  const dataEx   = [];
  const aEjercicios = [];
  const aClientes   = [];
  const oTemp    = {};
  let defCli = '';
  let defEj = '';
  let defTab = '';
  if (_.isEmpty(cookies.path)) {
    console.log('path cookie empty');
    defCli   = '';
    defEj    = '';
  } else {
    console.log('path cookie filled');
    defCli   = cookies.path.defCli;
    defEj    = cookies.path.defEj;
    console.log( cookies.path.defTab );
    if ( _.isEmpty( cookies.path.tabSelected ) ) {
      console.log('cookie defTab empty');
      defTab = '';
    } else {
      console.log('cookie defTab NOT empty');
      defTab = cookies.path.tabSelected;
    }
  }



  const aPromises = [getExercices(), getClients(clientes)];

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
      data.user = user;
      data.ejercicios = aEjercicios;
      data.defCli = defCli;
      data.defEj = defEj;
      data.defTab = defTab;

      aResults[1].forEach( ( data ) => {
        aClientes.push(data[0]);
      });
      data.clientes = aClientes;

      callback(data);
    });
}

function setCookies( oUserData, res ) {
  const clients = [];
  oUserData[0].clients.map( mapData => {
    clients.push( mapData._id );
  } );

  const cookies = {
    user: oUserData[0].user,
    clients: clients,
  };
  res.clearCookie('user');
  res.clearCookie('path');
  res.cookie( 'user', cookies );
  return cookies;
}

function setCookieDefaults( oData, res, callback ) {
  console.log('setCookiedefaults');
  console.log( oData );

  const cookies = {
    defCli: oData.defCli,
    defEj: oData.defEj,
  };

  if ( oData.defTab !== undefined ) {
    cookies.tabSelected = oData.defTab;
  }

  res.cookie( 'path', cookies );
  callback('OK');
}

function docs( params, proj, callback ) {
  getDocs( params, proj )
  .then( ( data ) => {
    if ( data.length === 0 ) {
      callback( {} );
    } else {
      callback( data );
    }
  })
  .catch( ( err ) => {
    console.log( err.err );
    callback( {} );
  });

}

function getDocs( filtro, proj ) {
  // :col/:cat/:id/:ej  => oci/personal/1/2015
  const collection = filtro.colection;
  const category = filtro.category;
  const client = Number( filtro.client );
  const exercice = Number( filtro.exercice );
  const filter = {
    cliente: client,
    ejercicio: exercice,
    coleccion: collection,
    categoria: category,
  };
  let project = proj || {};
  if (   category === 'estatutos'      || category === 'memoria' 
      || category === 'actasreuniones' || category === 'economicos' 
      || category === 'generales'      || category === 'documentos'
      || category === 'denuncias'      || category === 'propuestas'
      || category === 'oci'            || category === 'auditorias'
      || category === 'controles'      || category === 'protocolos'
      || category === 'formacion' 
      ) {
    // console.log('model documentos');
    return process.getModel('documents').find(filter, project);
  }
  else if ( category === 'personal') {
    // console.log('model personal');
    return process.getModel('persons').find(filter, project);
  }

  return new Promise((resolve, reject) => {
    reject('Not implemented');
  });
}

function getDocsTest( param1, param2, callback ) {
  const filter = param1;
  const project = param2;
  process.getModel('clients').find(filter, project)
  .exec( (err, data) => {
    callback(data);
  });
}

function addFile( oParam, callback ) {
  const datos = {
    collection: oParam.col,
    category: oParam.cat,
    client: oParam.cli,
    clientId: new ObjectId(oParam.cliId),
    exercice: oParam.ej,
    filename: oParam.filename,
    files: oParam.files,
    fields: oParam.fields,
  };
  const category = datos.category;

  if (   category === 'estatutos'      || category === 'memoria' 
      || category === 'actasreuniones' || category === 'economicos' 
      || category === 'generales'      || category === 'documentos'
      || category === 'denuncias'      || category === 'propuestas'
      || category === 'oci'            || category === 'auditorias'
      || category === 'controles'      || category === 'protocolos'
      || category === 'formacion' 
      ) {
    newDoc ( datos, () => {
      callback();
    });
  } else if ( datos.category === 'personal') {
    newPersonal ( datos, () => {
      callback();
    });
  }

  // callback();
}

function newDoc( param, callback) {
  const Doc = process.getModel('documents');
  const newDoc = new Doc({
    cliente: param.client,
    clienteId: param.clientId,
    coleccion: param.collection,
    categoria: param.category,
    ejercicio: param.exercice,
    nombreDocumento: param.files.uploadFile.nombreDocumento,
    nombreFichero: param.files.uploadFile.nombreFichero,
    responsable: param.fields.resp,
    version: param.fields.ver,
  });
  newDoc.save( ( err ) => {
    if ( err ) {
      console.error( `Error adding doc to DB documents ${err}`);
    } else {
    console.log("data saved to bd"); }
  });
  callback();
}

function newPersonal( param, callback) {
  const Pers = process.getModel('persons');
  const newPerson = new Pers({
    cliente: param.client,
    clienteId: param.clientId,
    coleccion: param.collection,
    categoria: param.category,
    ejercicio: param.exercice,
    nombreDocumento: param.files.uploadFile.nombreDocumento,
    nombreFichero: param.files.uploadFile.nombreFichero,
    nombre: param.fields.nombre,
    cargo: param.fields.cargo,
    fechaAlta: param.fields.fechaAlta,
    fechaBaja: param.fields.fechaBaja,
    tipoPersonal: param.fields.tipoPersonal,
  });
  newPerson.save( ( err ) => {
    if ( err ) {
      console.error( `Error adding doc to DB personal ${err}`);
    }
  });
  callback();
}

function randomFileName( numChars, ext) {
  let i = 0;
  let result='';
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  while ( i < numChars ) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
    i++;
  }
  let extension = '';
  if (ext.indexOf('.') !== -1 ) {
    extension = ext;
  } else{
    extension = '.' + ext;
  }
  result += extension;
  return ( result );
}


function deleteFile( oParam, callback) {
  const param = JSON.parse( oParam );
  const fichero = param.nombreFichero || '';
  console.log( `delete: ${param._id} ${fichero}`);
  console.log( param );
  fileId = param._id;
  const filter = {
    _id: ObjectId(fileId),
  };

  let deleteReg = '';
  const category = param.categoria;
  if (   category === 'estatutos'      || category === 'memoria' 
      || category === 'actasreuniones' || category === 'economicos' 
      || category === 'generales'      || category === 'documentos'
      || category === 'denuncias'      || category === 'propuestas'
      || category === 'oci'            || category === 'auditorias'
      || category === 'controles'      || category === 'protocolos'
      || category === 'formacion'
      ) {
    console.log("deleting from documents");
    deleteReg = process.getModel('documents');
  }
  else if( category === 'personal' ) {
    console.log("deleting from persons");
    deleteReg = process.getModel('persons');
  }

  if ( deleteReg !== '' ) {
    deleteReg.find( filter, {})
    .remove()
    .exec( () => {
      console.log('success deleting db');
      if ( fichero !== '') { fs.unlink( path.join( __dirname, 'Data', fichero ), ( err ) => { if ( err ) console.log(`error ${err}`); }); }
      callback( 'OK' );
    })
    .catch( () => {
      console.log('error deleting db');
      callback( 'KO' );
    });
  } else {
    callback( 'KO' );
  }
}

function getTiposPersonal() {
  const project = {
    _id: 0,
    tipoPersonal: 1,
  };
  return process.getModel('dbpersonaltipos').find({}, project).sort('tipoPersonal');
}


exports.checkUser = checkUser;
exports.checkUserTest = checkUserTest;
exports.getExercices = getExercices;
exports.getClients = getClients;
exports.getData = getData;
exports.docs = docs;
exports.getDocsTest = getDocsTest;
exports.setCookies = setCookies;
exports.addFile = addFile;
exports.deleteFile = deleteFile;
exports.getTiposPersonal = getTiposPersonal;
exports.randomFileName = randomFileName;
exports.setCookieDefaults = setCookieDefaults;




// SAVE DATA MONGOOSE WITH RELATIONED SAVED DATA
// var aaron = new Person({ _id: 0, name: 'Aaron', age: 100 });

// aaron.save(function(err) {
//   if (err) return handleError(err);
//
//   var story1 = new Story({
//     title: 'Once upon a timex.',
//     _creator: aaron._id    // assign the _id from the person
//   });
//
//   story1.save(function(err) {
//     if (err) return handleError(err);
//     // thats it!
//   });
// });
// SAVE DATA MONGOOSE WITH RELATIONED SAVED DATA


// Use Mongo without mongoose
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


