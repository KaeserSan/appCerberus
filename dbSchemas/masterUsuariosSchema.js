/*jshint esversion:6 */
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;
var masterClientes = mongoose.model('MasterClientes');

var masterUsuariosSchema = new Schema (     //BD_Usuarios
  {
    "usuario": String,
    "email": String,
    "password": String,
    "nivelAcceso": Number,
    "admin": Number,
    "fecha": Date,
    "clientes": [
      { type: Schema.ObjectId, ref: "MasterClientes" }
    ]
  });

var masterUsuarios = mongoose.model('masterUsuarios', masterUsuariosSchema);
module.exports = masterUsuarios;
