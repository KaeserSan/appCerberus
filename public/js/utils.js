function operateFormatter(value, row, index) {
    return [
      '<a class="edit ml10" href="javascript:void(0)" title="Editar">',
      '<i class="glyphicon glyphicon-edit"></i>',
      '</a>',
      '<a class="gap ml10"  title="">',
      '<i>   </i>',
      '</a>',
      '<a class="delete ml10" href="javascript:void(0)" title="Borrar">',
      '<i class="glyphicon glyphicon-remove"></i>',
      '</a>',
      '<a class="gap ml10"  title="">',
      '<i>   </i>',
      '</a>',
    ].join('');
  }

const operateEvents = {
  'click .edit': function ( e, value, row, index ) {
    const respuesta = confirm('¿Realmente desea editar el documento?');
    if (respuesta === true) {
      const cadena = String(JSON.stringify(row));
      // Doc = cadena.substring(cadena.indexOf('"id":')+5,cadena.indexOf('}'));
      // alert(Doc);
      // window.location.replace('/editDoc/"+ Doc);
      alert('Edit...');
    }
  },
  'click .delete': function ( e, value, row, index ) {
    e.preventDefault();
    const tableId = (e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id)
    .replace('_', '-');
    console.log(`tableID = ${tableId}`);
    const collection = (e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id)
      .replace('_', '-').split('-')[0];
    console.log(`collection = ${collection}`);
    const category = (e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id)
      .replace('_', '-').split('-')[1];
    console.log(`category = ${category}`);
    const respuesta = confirm('¿Realmente desea borrar el documento?');
    if (respuesta === true) {
      const cadena = String(JSON.stringify(row));
      // Doc = cadena.substring(cadena.indexOf('"id":')+5,cadena.indexOf('}'));
      // alert('Delete...');
      const object = {
        data: cadena,
        col: collection,
        cat: category,
      };
      console.log( object );
      $.ajax({
        url: '/delete',
        type: 'POST',
        data: object,
        success: function ( result ) {
          console.log("borrado...");
          $( '.myTable[id]' ).each( ( i, bTable ) => {
            reloadOciTable( bTable );
          });
        },
      });
    }
  },
};

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

module.exports = {
  operateFormatter: operateFormatter,
  operateEvents: operateEvents,
}