const mongoose = require ( 'mongoose' );
const Schema = mongoose.Schema;
const clients = mongoose.model( 'clients' );

var mapaRiesgos = new Schema (     // BD_M_DelitosRPC
  {
    clienteId: { type: Schema.ObjectId, ref: 'clients', required: true },
    cliente: { type: Number, required: true },
    ejercicio: { type: Number, required: true },
    tipoPenal: { type: String, required: true },
    fechaauditoria: Date,
    probabilidad: String,
    impacto: String,
    situacion: String,
    notas: String,
  });

module.exports = mapaRiesgos;

