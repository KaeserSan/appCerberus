/*jshint esversion:6 */
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var masterClientesSchema = new Schema (     //BD_Clientes
  {
    datos: {
      codigoCliente: Number,
      nombreCliente: { type: String, required: true, unique: true },
      cifCliente: { type: String, required: true, unique: true },
      logoCliente: String
    },
    departamentos: [{
      nombreDepartamento: String,
      responsable: String,
      cargo: String
    }],
    planAccion: {
      globales: [{
        tipoAccion: String,
        accion: String,
        responsable: String,
        supervisor: String,
        deadline: Date
      }],
      especificas: [{
        tipoAccion: String,
        accion: String,
        responsable: String,
        supervisor: String,
        departamento: String,
        deadline: Date
      }]
    },
    documentos: {
      oci: {
        estatutos: [{
              nombreDocumento: String,
              nombreFichero: String,
              version: String,
              fechaUpload: Date,
              responsable: String
        }],
        personal: [{
              nombre: String,
              cargo: String,
              fechaAlta: Date,
              fechaBaja: Date,
              tipoPersonal: String
        }],
        actasReuniones: [{
              nombreDocumento: String,
              nombreFichero: String,
              version: String,
              fechaUpload: Date,
              responsable: String
        }],
        memoria: [{
              nombreDocumento: String,
              nombreFichero: String,
              version: String,
              fechaUpload: Date,
              responsable: String
        }],
        scope: [{
              nombreEmpresa: String,
              grupo: String,
              fecha: Date,
              empresas: [{
                nombreEmpresa: String,
                scope: Boolean
              }]
        }]
      }
    },
    mapaRiesgos: [{
      tipoPenal: String,
      fechaauditoria: Date,
      probabilidad: String,
      impacto: String,
      situacion: String,
      departamento: String,
      notas : String,
    }],
    auditorias: {
      generales: [{
          Auditoria: String,
          Notas: String,
          Realizada: Boolean,
          Fecha: Date,
          FechaProxima: Date,
      }],
      programadas: [{
          Auditoria: String,
          Notas: String,
          Realizada: Boolean,
          Fecha: Date,
          FechaProxima: Date,
      }],
      noProgramadas: [{
          Auditoria: String,
          Notas: String,
          Realizada: Boolean,
          Fecha: Date,
          FechaProxima: Date,
      }],
      controles: [{
          Auditoria: String,
          Notas: String,
          Realizada: Boolean,
          Fecha: Date,
          FechaProxima: Date,
      }]
    },
    protocolos:{
      economicos: [{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String
      }],
      generales: [{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String
      }]
    },
    registros:{
      documentos:[{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String
      }],
      denuncias:[{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String
      }],
      propuestasSancion:[{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String
      }]
    },
    plantillas:{
      oci: [{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String
      }],
      auditorias: [{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String
      }],
      controles: [{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String
      }],
      protocolos: [{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String
      }],
      formacion: [{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String
      }]
    },
    atenuantesGestion: {
      denunciaDirecta: [{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String,
        concepto: String
      }],
      investigacion:[{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String,
        concepto: String,
        profesionales: [{
          tipoProfesional: String,
          profesional: String
        }],
        pruebas: [{
          nombreDocumento: String,
          nombreFichero: String,
          version: String,
          fechaUpload: Date,
        }]
      }],
      reparacion: [{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String,
        concepto: String
      }],
      aplicacionMedidas: [{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String,
        concepto: String
      }]
    }
  });
var masterDelitosRPCSchema = new Schema (     //BD_M_DelitosRPC
  {
    nombreTipoPenal: String,
    activo: Boolean
  });

var masterPlanAccionSchema = new Schema (     //BD_M_PlanAccion
  {
    tipoAccion: Number,
    codigoIncidencia: String,
    tituloAccion: String,
    descripcionAccion: String
  });

var masterPlanAccionTiposSchema = new Schema (     //BD_M_AccionTipos
  {
    claveAccion: Number,
    tipoAccion: String
  });

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

var masterProfesionalesTiposSchema = new Schema (     //BD_M_ProfesionalesTipos
  {
    tipoProfesional: String
  });

var masterControlesTiposSchema = new Schema (     //BD_M_ControlesTipos
  {
    tipoControl: String,
    activo: Boolean
  });

var masterPersonalTiposSchema = new Schema (     //BD_M_PersonalTipos
  {
    id: Number,
    tipoPersonal: String
  });

var masterUsuariosSchema = new Schema (     //BD_Usuarios
  {
    usuario: { type: String, required: true, unique: true },
    email: String,
    password: { type: String, required: true, unique: true },
    nivelAcceso: Number,
    admin: Number,
    fecha: Date,
    clientes: [
      { type: Schema.ObjectId, ref: "masterclientes" }
    ]
  });

var masterclientes = mongoose.model('masterclientes', masterClientesSchema);
var masterdelitosrpc = mongoose.model('masterdelitosrpc', masterDelitosRPCSchema);
var masterplanaccion = mongoose.model('masterplanaccion', masterPlanAccionSchema);
var masterplanacciontipos = mongoose.model('masterplanacciontipos', masterPlanAccionTiposSchema);
var masterprofesionales = mongoose.model('masterprofesionales', masterProfesionalesSchema);
var masterprofesionalestipos = mongoose.model('masterprofesionalestipos', masterProfesionalesTiposSchema);
var mastercontrolestipos = mongoose.model('mastercontrolestipos', masterControlesTiposSchema);
var masterpersonaltipos = mongoose.model('masterpersonaltipos', masterPersonalTiposSchema);
var masterusuarios = mongoose.model('masterusuarios', masterUsuariosSchema);

module.exports = {
                  masterclientes: masterclientes,
                  masterdelitosrpc: masterdelitosrpc,
                  masterplanaccion: masterplanaccion,
                  masterplanacciontipos: masterplanacciontipos,
                  masterprofesionales: masterprofesionales,
                  masterprofesionalestipos: masterprofesionalestipos,
                  mastercontrolestipos: mastercontrolestipos,
                  masterpersonaltipos: masterpersonaltipos,
                  masterusuarios: masterusuarios
                  };