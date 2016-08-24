/*jshint esversion:6 */
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var masterClientesSchema = new Schema (     //BD_Clientes
  {
    "datos": {
      "codigoCliente": Number,
      "nombreCliente": String,
      "cifCliente": String,
      "logoCliente": String
    },
    "departamentos": [{
      "nombreDepartamento": String,
      "responsable": String,
      "cargo": String
    }],
    "planAccion": {
      "globales": [{
        "tipoAccion": String,
        "accion": String,
        "responsable": String,
        "supervisor": String,
        "deadline": Date
      }],
      "especificas": [{
        "tipoAccion": String,
        "accion": String,
        "responsable": String,
        "supervisor": String,
        "departamento": String,
        "deadline": Date
      }]
    },
    "documentos": {
      "oci": {
        "estatutos": [{
              "nombreDocumento": String,
              "nombreFichero": String,
              "version": String,
              "fechaUpload": Date,
              "responsable": String
        }],
        "personal": [{
              "nombre": String,
              "cargo": String,
              "fechaAlta": Date,
              "fechaBaja": Date,
              "tipoPersonal": String
        }],
        "actasReuniones": [{
              "nombreDocumento": String,
              "nombreFichero": String,
              "version": String,
              "fechaUpload": Date,
              "responsable": String
        }],
        "memoria": [{
              "nombreDocumento": String,
              "nombreFichero": String,
              "version": String,
              "fechaUpload": Date,
              "responsable": String
        }],
        "scope": [{
              "nombreEmpresa": String,
              "grupo": String,
              "fecha": Date,
              "empresas": [{
                "nombreEmpresa": String,
                "scope": Boolean
              }]
        }]
      }
    },
    "mapaRiesgos": [{
      "tipoPenal": String,
      "fechaauditoria": Date,
      "probabilidad": String,
      "impacto": String,
      "situacion": String,
      "departamento": String,
      "notas ": String,
    }],
    "auditorias": {
      "generales": [{
          "Auditoria": String,
          "Notas": String,
          "Realizada": Boolean,
          "Fecha": Date,
          "FechaProxima": Date,
      }],
      "programadas": [{
          "Auditoria": String,
          "Notas": String,
          "Realizada": Boolean,
          "Fecha": Date,
          "FechaProxima": Date,
      }],
      "noProgramadas": [{
          "Auditoria": String,
          "Notas": String,
          "Realizada": Boolean,
          "Fecha": Date,
          "FechaProxima": Date,
      }],
      "controles": [{
          "Auditoria": String,
          "Notas": String,
          "Realizada": Boolean,
          "Fecha": Date,
          "FechaProxima": Date,
      }]
    },
    "protocolos":{
      "economicos": [{
        "nombreDocumento": String,
        "nombreFichero": String,
        "version": String,
        "fechaUpload": Date,
        "responsable": String
      }],
      "generales": [{
        "nombreDocumento": String,
        "nombreFichero": String,
        "version": String,
        "fechaUpload": Date,
        "responsable": String
      }]
    },
    "registros":{
      "documentos":[{
        "nombreDocumento": String,
        "nombreFichero": String,
        "version": String,
        "fechaUpload": Date,
        "responsable": String
      }],
      "denuncias":[{
        "nombreDocumento": String,
        "nombreFichero": String,
        "version": String,
        "fechaUpload": Date,
        "responsable": String
      }],
      "propuestasSancion":[{
        "nombreDocumento": String,
        "nombreFichero": String,
        "version": String,
        "fechaUpload": Date,
        "responsable": String
      }]
    },
    "plantillas":{
      "oci": [{
        "nombreDocumento": String,
        "nombreFichero": String,
        "version": String,
        "fechaUpload": Date,
        "responsable": String
      }],
      "auditorias": [{
        "nombreDocumento": String,
        "nombreFichero": String,
        "version": String,
        "fechaUpload": Date,
        "responsable": String
      }],
      "controles": [{
        "nombreDocumento": String,
        "nombreFichero": String,
        "version": String,
        "fechaUpload": Date,
        "responsable": String
      }],
      "protocolos": [{
        "nombreDocumento": String,
        "nombreFichero": String,
        "version": String,
        "fechaUpload": Date,
        "responsable": String
      }],
      "formacion": [{
        "nombreDocumento": String,
        "nombreFichero": String,
        "version": String,
        "fechaUpload": Date,
        "responsable": String
      }]
    },
    "atenuantesGestion": {
      "denunciaDirecta": [{
        "nombreDocumento": String,
        "nombreFichero": String,
        "version": String,
        "fechaUpload": Date,
        "responsable": String,
        "concepto": String
      }],
      "investigacion":[{
        "nombreDocumento": String,
        "nombreFichero": String,
        "version": String,
        "fechaUpload": Date,
        "responsable": String,
        "concepto": String,
        "profesionales": [{
          "tipoProfesional": String,
          "profesional": String
        }],
        "pruebas": [{
          "nombreDocumento": String,
          "nombreFichero": String,
          "version": String,
          "fechaUpload": Date,
        }]
      }],
      "reparacion": [{
        "nombreDocumento": String,
        "nombreFichero": String,
        "version": String,
        "fechaUpload": Date,
        "responsable": String,
        "concepto": String
      }],
      "aplicacionMedidas": [{
        "nombreDocumento": String,
        "nombreFichero": String,
        "version": String,
        "fechaUpload": Date,
        "responsable": String,
        "concepto": String
      }]
    }
  });

var masterClientes = mongoose.model('MasterClientes', masterClientesSchema);
module.exports = masterClientes;
