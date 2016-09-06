/*jshint esversion:6 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var masterControlesTiposSchema = new Schema (     //BD_M_ControlesTipos
  {
    tipoControl: String,
    activo: Boolean
  });

var mastercontrolestipos = mongoose.model('mastercontrolestipos', masterControlesTiposSchema);
module.exports = {
  mastercontrolestipos: mastercontrolestipos,
};
