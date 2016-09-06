/* jshint esversion:6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const masterProfesionalesTiposSchema = new Schema(     // BD_M_ProfesionalesTipos
  {
    tipoProfesional: String,
  });

// const masterprofesionalestipos = mongoose.model('masterprofesionalestipos', masterProfesionalesTiposSchema);
module.exports = masterprofesionalestipos;
