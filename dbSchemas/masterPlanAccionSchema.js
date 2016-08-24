/*jshint esversion:6 */
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var masterPlanAccionSchema = new Schema (     //BD_M_PlanAccion
  {
    "tipoAccion": Number,
    "codigoIncidencia": String,
    "tituloAccion": String,
    "descripcionAccion": String
  });

module.exports = mongoose.model('MasterPlanAccion', masterPlanAccionSchema);
