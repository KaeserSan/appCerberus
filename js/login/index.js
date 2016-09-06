
import express from 'express';
import getAll from './handlers/test';

let router = express.Router();

router.get('/test', test );

export default router;







// const loginLoaded = true;

// app.get('/', (req, res) => {
//   // res.json({
//   //   hello: 'world',
//   // });
//   res.render('login');
// });

// app.post('/auth', function (req, res, next) {
//   // main.checkUser(req.params.id , function (data) {   //usar parametros => /auth/:id
//   main.checkUser(req.body, function (data) { //usar post parseado por body-parser
//     if (data.length !== 0) {
//       console.log('datos de usuarios');
//       console.log(data);
//       // res.clearCookie('usuario');
//       res.cookie('usuario', data[0].usuario);

//       const clientes = [];
//       data[0].clientes.map(data => { clientes.push(data._id); });

//       // res.clearCookie('clientes');
//       res.cookie('clientes', clientes);

//       main.getData (req.cookies , function (oData) {

//         if (!oData) {
//           res.send('Cookie problem!!!');
//         } else {
//           console.log(oData);
//           res.render('mainMenu', {
//             clientes: JSON.stringify(oData.clientes),
//             ejercicios: JSON.stringify(oData.ejercicios),
//           }
//            );
//         }
//       });
//     } else {
//       res.send('No tienes acceso.');
//     }
//   });
// });