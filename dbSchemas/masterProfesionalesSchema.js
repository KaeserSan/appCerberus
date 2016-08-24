/*jshint esversion:6 */
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var masterProfesionalesSchema = new Schema (     //BD_M_Profesionales
  {
    "id": Number,
    "tipoProfesional": Number,
    "nombre": String,
    "emailPersonal": String,
    "direccion": String,
    "codigoPostal": String,
    "provincia": String,
    "activo": Number
  });

module.exports = mongoose.model('MasterProfesionales', masterProfesionalesSchema);
