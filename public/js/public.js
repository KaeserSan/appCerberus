/* global $ */
const _ = require('underscore');
require('./oci/oci_estatutos.js');
require('./oci/oci_personal.js');
require('./oci/oci_memoria.js');
require('./oci/oci_actasreuniones.js');
require('./protocolos/protocolos-economicos.js');
require('./protocolos/protocolos-generales.js');
require('./registros/registros_documentos.js');
require('./registros/registros_denuncias.js');
require('./registros/registros_propuestas.js');
require('./plantillas/plantillas_oci.js');
require('./plantillas/plantillas_auditorias.js');
require('./plantillas/plantillas_controles.js');
require('./plantillas/plantillas_formacion.js');
require('./plantillas/plantillas_protocolos.js');

console.log( '...public.js' );

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
  console.log( object );
  if (   category === 'estatutos'      || category === 'memoria' 
      || category === 'actasreuniones' || category === 'economicos' 
      || category === 'generales'      || category === 'documentos'
      || category === 'denuncias'      || category === 'propuestas'
      || category === 'oci'            || category === 'auditorias'
      || category === 'controles'      || category === 'protocolos'
      || category === 'formacion' 
      ) {
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
  const logo = comboClientes.options[comboClientes.selectedIndex].getAttribute('data-logo');
  console.log( logo );
  $('#clientLogo').attr('src', '/img/'+logo)
  .attr('hidden', false);

  const defaults = {
    defCli: e.currentTarget.value,
    defEj: $('#comboEjercicios').val(),
  };
  $.ajax({
    url: '/setDefaults',
    type: 'POST',
    data: defaults,
    success: function (data) {
      comboClientesChanged( e );
    },
  });
});

$('#comboEjercicios').on('change', ( e ) => {
  const defaults = {
    defCli: $('#comboClientes').val(),
    defEj: e.currentTarget.value,
  };
  $.ajax({
    url: '/setDefaults',
    type: 'POST',
    data: defaults,
    success: function (data) {
      comboEjerciciosChanged( e );
    },
  });
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

$('.tab-title').on('click', ( e ) => {
  const defaults = {
    defCli: $('#comboClientes').val(),
    defEj: $('#comboEjercicios').val(),
    defTab: e.currentTarget.id,
  };
  $.ajax({
    url: '/setDefaults',
    type: 'POST',
    data: defaults,
    success: function (data) {
      console.log("data sent OK");
    },
  });
});

$('#lateralMenu').click(function () {
  const menu = document.getElementById('menuLateral');
  const styles = $('#menuLateral').prop('style');
  console.log( styles );
  console.log( typeof(styles));
  console.log( styles.left );
  console.log( menu );
  if ( styles.left === '0px' ) {
    $('.asideMenu').animate({
        left: '-203px',
    }, 500);
    $('.mainContent').css({'opacity': 1});
    $('.semaforo').css({'opacity': 1});
  } else {
    $('.asideMenu').animate({
        left: '0px',
    }, 500);
    $('.mainContent').css({'opacity': 0.3});
    $('.semaforo').css({'opacity': 0.3});
  }
});

let menuVisible = false;
$('#userName').on('click', ( e ) => {
  console.log('menu appears');
  console.log( menuVisible );
  if ( menuVisible === true ){
      $('.userMenu').fadeOut(200);
      menuVisible = false;
  } else {
    $('.userMenu').fadeIn(200);
    menuVisible = true;
  }
});

$('.userMenu').fadeOut(1);
// $('.userMenu').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
console.log("fading out menu");

module.exports.comboClientesChanged = comboClientesChanged;

