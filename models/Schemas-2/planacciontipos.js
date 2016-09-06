/*jshint esversion:6 */
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var masterPlanAccionTiposSchema = new Schema (     // BD_M_AccionTipos
  {
    claveAccion: Number,
    tipoAccion: String
  });

var masterplanacciontipos = mongoose.model('masterplanacciontipos', masterPlanAccionTiposSchema);
module.exports = {
  masterplanacciontipos: masterplanacciontipos,
};
