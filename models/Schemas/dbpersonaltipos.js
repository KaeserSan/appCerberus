const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbpersonaltipos = new Schema (     // BD_M_PersonalTipos
  {
    id: Number,
    tipoPersonal: { type: String, required: true },
  });

module.exports = dbpersonaltipos;
