/* jshint esversion:6 */
const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const dateFormat = require('date-format');
const fs = require('fs');
const mime = require('mime');
const Promise = require('promise');
const _ = require('underscore');

const main = require('./main');


const app = express();

app.locals.moment = require('moment');

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// app.use('/', require('./js/login'));

app.get('/', function (req, res, next) {
  res.render('login');
});

app.post('/auth', function (req, res, next) {
  // main.checkUser(req.params.id , function (data) {   //usar parametros => /auth/:id
  main.checkUser(req.body, function (data) { //usar post parseado por body-parser
    if (data.length !== 0) {
      console.log('datos de usuarios');
      console.log(data);
      // res.clearCookie('usuario');
      res.cookie('usuario', data[0].usuario);

      const clientes = [];
      data[0].clientes.map(data => { clientes.push(data._id); });

      // res.clearCookie('clientes');
      res.cookie('clientes', clientes);

      main.getData (req.cookies , function (oData) {

        if (!oData) {
          res.send('Cookie problem!!!');
        } else {
          console.log(oData);
          res.render('mainMenu', {
            clientes: JSON.stringify(oData.clientes),
            ejercicios: JSON.stringify(oData.ejercicios),
          }
           );
        }
      });
    } else {
      res.send('No tienes acceso.');
    }
  });
});

app.get('/oci', function(req, res, next) {
  main.getData(req.cookies, function(oData) {
    res.render('oci', {
      clientes: JSON.stringify(oData.clientes),
      ejercicios: JSON.stringify(oData.ejercicios),
    });
  });
});

app.get('/getDocsOci/:id/:ej', function(req, res, next) {
  main.getDocsOci({
    cliente: req.params.id,
    ejercicio: req.params.ej,
  }, '*', function(data) {
    res.status(200).send(data);
  });
});

app.get('/sendFile', function(req, res, next) {

  let fullFilePath = '/Users/angel/Documents/proyectos/appCerberus/Data/ATCerberus.pdf';

  let options = {
      dotfiles: 'deny',
      headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };
  console.log('--> Sending ' + fullFilePath);
  // res.download(fullFilePath, fileName);
  res.sendFile(fullFilePath, /* options, */function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('Sent:', fileName);
    }
  });// res.sendFile(fullFilePath);
  // main.sendFile(req.body, res, function (data) {
  //   // res.sendFile(data);
  //   // window.alert('Fichero enviado');
  // });
});


















app.listen(3000, function() {
  console.log('Listening on port 3000');
});


// Routes para pruebas

app.get('/usuarios', function (req, res, next) {
  main.checkUserTest({usuario: 'angel'}, function (data) {
    if (data) {
      res.json(data);
    } else {
      res.json({});
    }
  });
});

app.get('/getExercices', function (req, res, next) {
  main.getExercices(function (data) {
    if (data) {
      res.json(data);
    } else {
      res.json({});
    }
  });
});

app.get('/getDocsTest', function (req, res, next) {
  let filter = {
          'datos.codigo': 1,
          'ejercicio.id': 2015
        };
  let project = {
    _id: 0,
    'ejercicio.documentos.oci.estatutos': 1,
  };
  main.getDocsTest(filter, project, function (data) {
    if (data) {
      res.json(data[0].ejercicio[0].documentos.oci.estatutos[0]);
    } else {
      res.json({});
    }
  });
});

// 'ejercicio':[{'documentos':{'oci':{'estatutos':
