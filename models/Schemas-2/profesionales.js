/*jshint esversion:6 */
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var masterProfesionalesSchema = new Schema (     //BD_M_Profesionales
	{
		id: Number,
		tipoProfesional: Number,
		nombre: String,
		emailPersonal: String,
		direccion: String,
		codigoPostal: String,
		provincia: String,
		activo: Number
	});

var masterprofesionales = mongoose.model('masterprofesionales', masterProfesionalesSchema);
module.exports = {
	masterprofesionales: masterprofesionales,
};
