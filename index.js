/*jshint esversion:6 */
var express = require( 'express' );
var pug = require( 'pug' );
var bodyParser = require( 'body-parser' );
var cookieParser = require( 'cookie-parser' );
var path = require( 'path' );
var dateFormat = require( 'date-format' );
var fs = require( 'fs' );
var mime = require( 'mime' );
var Promise = require( 'promise' );
var _ = require( 'underscore' );

var main = require( "./main.js" );

var app = express();

app.locals.moment = require( 'moment' );

app.set( 'views', path.join(__dirname, '/views' ) );
app.set( 'view engine', 'pug' );

app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded({extended: false}) );
app.use( cookieParser() );




app.get( '/', function(req, res, next) {
  res.render( 'login' );
});


app.post( '/auth', function(req, res, next){
  // main.checkUser( req.params.id , function( data ){   //usar parametros => /auth/:id
  main.checkUser( req.body , function( data ){ //usar post parseado por body-parser
    if (data.length !== 0){
      console.log("datos de usuarios");
      console.log( data );
      // res.clearCookie( 'usuario' );
      res.cookie( 'usuario', data[0].usuario );

      var clientes = [];
      data[0].clientes.map( data => { clientes.push(data._id); });

      // res.clearCookie( 'clientes' );
      res.cookie( 'clientes', clientes );

      main.getData ( req.cookies , function( oData ){

      if ( !oData ){
        res.send("Cookie problem!!!");
      }
      else{
        console.log( oData );
          res.render( "mainMenu", {
                              clientes: JSON.stringify(oData.clientes),
                              ejercicios: JSON.stringify(oData.ejercicios)
                                  } 
          );
        }
      });
    }
    else {
      res.send( "No tienes acceso." );
    }
  });
});

app.get( '/oci', function(req, res, next){
  main.getData ( req.cookies , function( oData ){
  res.render( "oci", {
                        clientes: JSON.stringify(oData.clientes),
                        ejercicios: JSON.stringify(oData.ejercicios)
                            } );
  });
});

app.get( '/getDocsOci/:id/:ej', function( req, res, next){
  main.getDocsOci( {
    cliente: req.params.id,
    ejercicio: req.params.ej }, '*', function ( data ){
  res.status(200).send( data );
  } );
});

app.get( '/sendFile', function( req, res, next){

  let fullFilePath = '/Users/angel/Documents/proyectos/appCerberus/Data/ATCerberus.pdf';

  var options = {
      dotfiles: 'deny',
      headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };
  console.log( "--> Sending " + fullFilePath);
  // res.download( fullFilePath, fileName );
  res.sendFile(fullFilePath, /*options, */function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log( 'Sent:', fileName);
    }
  });// res.sendFile( fullFilePath );
  // main.sendFile( req.body, res, function ( data ){
  //   // res.sendFile( data );
  //   // window.alert( "Fichero enviado" );
  // } );
});
















app.post( '/tasks', function(req,res) {
  if ( !req.body || !req.body.name ) res.send ( "error!" );
  var taskName = req.body.name;
  var newTask = {
    name: taskName,
    completed: false,
    timeDateCreation: new Date(),
    timeDateCompletion: null
  };
  _tasks.addTask(newTask, function( data ){
    res.redirect( '/tasks' );
  });
});

app.get( '/completed', function(req, res, next) {
  _tasks.getCompleted( 0, function( data ){
    console.log( data );
    res.render( 'completed', { title: 'Completed', tasks: data, path: req.path });
  });
});

app.post( '/completeAll', function( req, res, next){
  _tasks.markCompleted( '*', function ( data ){
  res.status(200).send( 'task deleted!' );
  } );
});





app.post( '/complete/:id', function( req, res, next){
  _tasks.markCompleted( req.params.id,function ( data ){
  res.status(200).send( 'task deleted!' );
  } );
});



app.listen(3000, function() {
	console.log( "Listening on port 3000" );
});


// Routes para pruebas

app.get( '/usuarios',function( req, res, next ){
  main.checkUserTest({usuario: 'angel'}, function( data ){
    if ( data ){
      res.json( data );
    } else {
      res.json({});
    }
  });
});

app.get( '/getExercices',function( req, res, next ){
  main.getExercices( function( data ){
    if ( data ){
      res.json( data );
    } else {
      res.json({});
    }
  });
});

app.get( '/getDocs',function( req, res, next ){
  let filter = {
          "datos.codigo": 1,
          "ejercicio.id": 2015
        };
  let project = { "ejercicio.documentos.oci.estatutos": 1 };
  main.getDocsTest(filter, project, function( data ){
    if ( data ){
      res.json( data );
    } else {
      res.json({});
    }
  });
});

// "ejercicio":[{"documentos":{"oci":{"estatutos":
