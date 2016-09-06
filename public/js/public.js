/* global $ */
const _ = require('underscore');
require('./oci/oci_estatutos.js');
require('./oci/oci_personal.js');
require('./oci/oci_memoria.js');
require('./oci/oci_actasreuniones.js');

console.log('...public.js');

$('.btnAdd').on('click', ( e ) => {
  const collection = (e.currentTarget.parentElement.parentElement.id).replace('_', '/').split('/')[0];
  const category = ((e.currentTarget.parentElement.parentElement.id).replace('_', '/').split('/')[1]).toLowerCase();
  const client = $('#comboClientes').val();
  const clientId = comboClientes.options[comboClientes.selectedIndex].getAttribute('data-cliid');
  const exercice = $('#comboEjercicios').val();
  // console.log( `/upload/${collection}/${category}/${client}/${exercice}` );
  // window.location( `${window.location.origin}/upload/${col}/${client}/${ej}` );
  const object = {
    object: {
      col: collection,
      cat: category,
      cli: client,
      cliId: clientId,
      ej: exercice,
    },
    url: window.location.href,
  };
  // console.log( object );
  if ( category === 'estatutos' || category === 'memoria' || category === 'actasreuniones' ) {
    $('#oContainer').val( JSON.stringify( object ) );
    $('#fileUpload').foundation('reveal', 'open');
  }
  else if( category === 'personal') {
    $('#oContainerP').val( JSON.stringify( object ) );
    $.ajax({
      url: '/tiposPersonal',
      type: 'get',
      data: {},
      success: function ( data ) {
        let cadHtml = "";
        $.each( data, ( i, val ) => {
          cadHtml += `<option val=${val.tipoPersonal}> ${val.tipoPersonal}</option>`;
        });
        $('#TipoPersonal').html( cadHtml );
      },
    });
    $('#personalPopUp').foundation('reveal', 'open');
  }
});

function reloadOciTable( bTable ) {
  const tName = $(bTable).attr('id');
  console.log( `...reloading ${tName}` );
  const client = Number($('#comboClientes').val());
  const ej = Number($('#comboEjercicios').val());
  const col = $(bTable).attr('id').replace('-', '/');
  const ajaxUrl = `/getDocs/${col}/${client}/${ej}`;
  $( bTable ).bootstrapTable('removeAll');
  $( bTable ).bootstrapTable('refresh', { url: ajaxUrl });
}

function comboClientesChanged( param) {
  $( '.myTable[id]' ).each( ( i, bTable ) => {
    reloadOciTable( bTable );
  });
}

function comboEjerciciosChanged(param) {
  $( '.myTable[id]' ).each( ( i, bTable ) => {
    reloadOciTable( bTable );
  });
  // alert( param.currentTarget.value );
}

$('#comboClientes').on('change', ( e ) => {
  comboClientesChanged( e );
});

$('#comboEjercicios').on('change', ( e ) => {
  comboEjerciciosChanged( e );
});

$('.myTable').on('click-cell.bs.table', ( field, value, row, $element ) => {
  if ( value === 'nombreDocumento') {
    const fileToDownload = window.location.origin + '/getFile/'+$element.nombreFichero;
    const win = window.open(fileToDownload, '_blank');
    if (win) {
      win.focus();
    } else {
      alert('Por favor, active ventanas emergentes para ver el contenido.');
    }
  }
});


module.exports.comboClientesChanged = comboClientesChanged;


