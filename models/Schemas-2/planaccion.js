/*jshint esversion:6 */
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var masterPlanAccionSchema = new Schema (     //BD_M_PlanAccion
  {
    tipoAccion: Number,
    codigoIncidencia: String,
    tituloAccion: String,
    descripcionAccion: String
  });

var masterplanaccion = mongoose.model('masterplanaccion', masterPlanAccionSchema);
module.exports = {
  masterplanaccion: masterplanaccion,
};
