/*jshint esversion:6 */
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var masterProfesionalesTiposSchema = new Schema (     //BD_M_ProfesionalesTipos
  {
    "tipoProfesional": String
  });

module.exports = mongoose.model('MasterProfesionalesTipos', masterProfesionalesTiposSchema);
