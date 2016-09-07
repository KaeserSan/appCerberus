console.log("protocolos_economicos.js running...");

const operateFormatter = require('../utils.js').operateFormatter;
const operateEvents = require('../utils.js').operateEvents;
const client = $('#comboClientes').val();
const ej = $('#comboEjercicios').val();
const ajaxUrl = `/getDocs/protocolos/economicos/${client}/${ej}`;
console.log( `...loading Protocolos Table ${ajaxUrl}` );

$('#protocolos-economicos').bootstrapTable({
  method: 'GET',
  url: ajaxUrl,
  columns: [{
    field: '_id',
    title: 'id',
    align: 'left',
    valign: 'top',
    sortable: true,
    visible: false,
  }, {
    field: 'nombreDocumento',
    title: 'Nombre',
    align: 'left',
    valign: 'top',
    sortable: true,
  }, {
    field: 'nombreFichero',
    title: 'Fichero',
    align: 'left',
    valign: 'top',
    sortable: true,
    visible: false,
  }, {
    field: 'version',
    title: 'version',
    align: 'left',
    valign: 'top',
    sortable: true,
    visible: true,
  }, {
    field: 'responsable',
    title: 'Responsable',
    align: 'left',
    valign: 'top',
    sortable: true,
    visible: true,
  }, {
    field: 'operate',
    title: 'Operacion',
    align: 'center',
    valign: 'top',
    clickToSelect: false,
    formatter: operateFormatter,
    events: operateEvents,
  }],
});


