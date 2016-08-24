/*jshint esversion:6 */
var express = require('express');
var pug = require('pug');
var bodyParser = require('body-parser');
//var stylus = require('stylus');
//var hbs = require('hbs');
var path = require('path');
//var jade = require('jade');
var dateFormat = require('date-format');
var fs = require('fs');
var mime = require('mime');

var main = require("./main.js");

var app = express();

app.locals.moment = require('moment');

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

app.use( express.static('public') );
app.use(bodyParser.urlencoded({extended: false}));

//app.use(require('stylus').middleware('public'));



app.get('/', function(req, res, next) {
  res.render('login');
});

app.post('/auth', function(req, res, next){
  // main.checkUser( req.params.id , function( data ){   //usar parametros => /auth/:id
  main.checkUser( req.body , function( data ){ //usar post parseado por body-parser
    if (data){
      console.log( data );
      res.render( "mainMenu", { clientes: data.clientes } );
    }
    else {
      res.send( "No tienes acceso.");
    }
  });
});

app.get('/oci', function(req, res, next){
  res.render( "oci", { clientes: {}, ejercicios: {} } );
});

app.get('/getDocsOci', function( req, res, next){
  main.getDocsOci( '*', '*', function ( data ){
  res.status(200).send( data );
  } );
});

app.get('/sendFile', function( req, res, next){

  // let fileName = req.body.filename;
  // let filePath = req.body.filepath;
  // let fullFilePath = path.join(__dirname, "Data/", filePath );
  // let mimetype = mime.lookup(fullFilePath);

  let fullFilePath = '/Users/angel/Documents/proyectos/appCerberus/Data/ATCerberus.pdf'

  // res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
  // res.setHeader('Content-type', mimetype);

  // var filestream = fs.createReadStream(fullFilePath);
  // filestream.on('data', function(chunk) {
  //     // console.log( chunk );
  //     res.write(chunk);
  //     // console.log("Have set file info, starting download...");
  // });
  // filestream.on('end', function() {
  //   console.log("Finishing file sending...");
  //     res.end();
  // });
  var options = {
      dotfiles: 'deny',
      headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };
  console.log("--> Sending " + fullFilePath);
  // res.download( fullFilePath, fileName );
  res.sendFile(fullFilePath, /*options, */function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });// res.sendFile( fullFilePath );
  // main.sendFile( req.body, res, function ( data ){
  //   // res.sendFile( data );
  //   // window.alert("Fichero enviado");
  // } );
});

















app.post('/tasks', function(req,res) {
  if ( !req.body || !req.body.name ) res.send ("error!");
  var taskName = req.body.name;
  var newTask = {
    name: taskName,
    completed: false,
    timeDateCreation: new Date(),
    timeDateCompletion: null
  };
  _tasks.addTask(newTask, function( data ){
    res.redirect('/tasks');
  });
});

app.get('/completed', function(req, res, next) {
  _tasks.getCompleted( 0, function( data ){
    console.log( data );
    res.render('completed', { title: 'Completed', tasks: data, path: req.path });
  });
});

app.post('/completeAll', function( req, res, next){
  _tasks.markCompleted( '*', function ( data ){
  res.status(200).send('task deleted!');
  } );
});





app.post('/complete/:id', function( req, res, next){
  _tasks.markCompleted( req.params.id,function ( data ){
  res.status(200).send('task deleted!');
  } );
});



app.listen(3000, function() {
	console.log("Listening on port 3000");
});