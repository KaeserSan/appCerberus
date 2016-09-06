console.log("oci_personal.js running...");

const operateFormatter = require('../utils.js').operateFormatter;
const operateEvents = require('../utils.js').operateEvents;
const client = $('#comboClientes').val();
const ej = $('#comboEjercicios').val();
const ajaxUrl = `/getDocs/oci/personal/${client}/${ej}`;
console.log( `...loading Personal Table ${ajaxUrl}` );

$('#oci-personal').bootstrapTable({
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
    field: 'clienteId',
    title: 'clienteId',
    align: 'left',
    valign: 'top',
    sortable: true,
    visible: false,
  }, {
    field: 'cliente',
    title: 'Cliente',
    align: 'left',
    valign: 'top',
    sortable: true,
    visible: false,
  }, {
    field: 'nombre',
    title: 'Nombre',
    align: 'left',
    valign: 'top',
    sortable: true,
    visible: true,
  }, {
    field: 'cargo',
    title: 'Cargo',
    align: 'left',
    valign: 'top',
    sortable: true,
    visible: true,
  }, {
    field: 'fechaAlta',
    title: 'Alta',
    align: 'left',
    valign: 'top',
    sortable: true,
    visible: true,
  }, {
    field: 'fechaBaja',
    title: 'Baja',
    align: 'left',
    valign: 'top',
    sortable: true,
    visible: true,
  }, {
    field: 'tipoPersonal',
    title: 'Tipo',
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
