/*jshint esversion:6 */
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var masterDelitosRPCSchema = new Schema (     // BD_M_DelitosRPC
  {
    nombreTipoPenal: String,
    activo: Boolean,
  });

var masterdelitosrpc = mongoose.model('masterdelitosrpc', masterDelitosRPCSchema);
module.exports = {
  masterdelitosrpc: masterdelitosrpc,
};
