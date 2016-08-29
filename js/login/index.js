

const express = require('express');
const router = express.Router();
const pug = require('pug');
const path = require('path');

const loginLoaded = true;

router.set('views', path.join(__dirname, '../../views'));
router.set('view engine', 'pug');

router.get('/', (req, res) => {
  // res.json({
  //   hello: 'world',
  // });
  res.render('login');
});

router.post('/auth', function (req, res, next) {
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