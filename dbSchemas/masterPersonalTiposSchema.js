/*jshint esversion:6 */
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var masterPersonalTiposSchema = new Schema (     //BD_M_PersonalTipos
  {
    "id": Number,
    "tipoPersonal": String
  });

module.exports = mongoose.model('MasterPersonalTipos', masterPersonalTiposSchema);
