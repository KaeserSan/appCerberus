const mongoose = require ( 'mongoose' );
const Schema = mongoose.Schema;

var maestrodelitos = new Schema (     // BD_M_DelitosRPC
  {
    nombre: { type: String, required: true },
    activo: { type: Boolean, required: true },
  });

module.exports = maestrodelitos;

