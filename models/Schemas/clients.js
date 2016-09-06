const mongoose = require ( 'mongoose' );

const Schema = mongoose.Schema;

const clients = new Schema(     // BD_Clientes
  {
    datos: {
      codigo: Number,
      nombre: { type: String, required: true, unique: true },
      cif: { type: String, required: true, unique: true },
      logo: String,
    },
    departamentos: [{
      nombre: String,
      responsable: String,
      cargo: String,
      activo: Boolean,
    }],
    ejercicio: [{
      id: Number,
      planAccion: {
        globales: [{
          tipoAccion: String,
          accion: String,
          responsable: String,
          supervisor: String,
          deadline: Date,
        }],
        especificas: [{
          tipoAccion: String,
          accion: String,
          responsable: String,
          supervisor: String,
          departamento: String,
          deadline: Date,
        }],
      },
      mapaRiesgos: [{
        tipoPenal: String,
        fechaauditoria: Date,
        probabilidad: String,
        impacto: String,
        situacion: String,
        departamento: String,
        notas: String,
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
        }],
      },
      protocolos: {
        economicos: [{
          nombreDocumento: String,
          nombreFichero: String,
          version: String,
          fechaUpload: Date,
          responsable: String,
        }],
        generales: [{
          nombreDocumento: String,
          nombreFichero: String,
          version: String,
          fechaUpload: Date,
          responsable: String,
        }],
      },
      registros: {
        documentos: [{
          nombreDocumento: String,
          nombreFichero: String,
          version: String,
          fechaUpload: Date,
          responsable: String,
        }],
        denuncias: [{
          nombreDocumento: String,
          nombreFichero: String,
          version: String,
          fechaUpload: Date,
          responsable: String,
        }],
        propuestasSancion: [{
          nombreDocumento: String,
          nombreFichero: String,
          version: String,
          fechaUpload: Date,
          responsable: String,
        }],
      },
      atenuantesGestion: {
        denunciaDirecta: [{
          nombreDocumento: String,
          nombreFichero: String,
          version: String,
          fechaUpload: Date,
          responsable: String,
          concepto: String,
        }],
        investigacion: [{
          nombreDocumento: String,
          nombreFichero: String,
          version: String,
          fechaUpload: Date,
          responsable: String,
          concepto: String,
          profesionales: [{
            tipoProfesional: String,
            profesional: String,
          }],
          pruebas: [{
            nombreDocumento: String,
            nombreFichero: String,
            version: String,
            fechaUpload: Date,
          }],
        }],
        reparacion: [{
          nombreDocumento: String,
          nombreFichero: String,
          version: String,
          fechaUpload: Date,
          responsable: String,
          concepto: String,
        }],
        aplicacionMedidas: [{
          nombreDocumento: String,
          nombreFichero: String,
          version: String,
          fechaUpload: Date,
          responsable: String,
          concepto: String,
        }],
      },
    }],
    plantillas: {
      oci: [{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String,
        active: Boolean,
      }],
      auditorias: [{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String,
        active: Boolean,
      }],
      controles: [{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String,
        active: Boolean,
      }],
      protocolos: [{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String,
        active: Boolean,
      }],
      formacion: [{
        nombreDocumento: String,
        nombreFichero: String,
        version: String,
        fechaUpload: Date,
        responsable: String,
        active: Boolean,
      }],
    },
  });

// var masterclientes = mongoose.model('masterclientes', masterClientesSchema);
// module.exports = masterclientes;
module.exports = clients;
