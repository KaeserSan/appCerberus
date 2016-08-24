/*jshint esversion:6 */
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var masterControlesTiposSchema = new Schema (     //BD_M_ControlesTipos
  {
    "tipoControl": String,
    "activo": Boolean
  });

module.exports = mongoose.model('MasterControlesTipos', masterControlesTiposSchema);
