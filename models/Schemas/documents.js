const mongoose = require ( 'mongoose' );
const Schema = mongoose.Schema;
const clients = mongoose.model( 'clients' );

const documents = new Schema(
  {
    clienteId: { type: Schema.ObjectId, ref: 'clients', required: true },
    cliente: { type: Number, required: true },
    coleccion: { type: String, required: true },
    categoria: { type: String, required: true },
    ejercicio: { type: Number, required: true },
    nombreDocumento: { type: String, required: true },
    nombreFichero: { type: String, required: true },
    version: String,
    fechaUpload: Date,
    responsable: String,
  });

// documents.pre('save', ( next ) => {
//   documents.fechaUpload = new Date();
// });

// var masterusuarios = mongoose.model('masterusuarios', masterUsuariosSchema);
// module.exports = {
//   masterusuarios: masterusuarios,
// };
module.exports = documents;