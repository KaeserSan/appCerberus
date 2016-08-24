/*jshint esversion:6 */
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var masterPlanAccionTiposSchema = new Schema (     //BD_M_AccionTipos
  {
    "claveAccion": Number,
    "tipoAccion": String
  });

module.exports = mongoose.model('MasterPlanAccionTipos', masterPlanAccionTiposSchema);
