window.operateEvents = {
  'click .edit': function ( e, value, row, index ) {
    var respuesta = confirm("¿Realmente desea editar el documento?");
    if (respuesta === true) {
      cadena = String(JSON.stringify(row));
      // Doc = cadena.substring(cadena.indexOf('"id":')+5,cadena.indexOf("}"));
      //alert(Doc);
      //Exp = cadena.substring(cadena.indexOf("NumeroProcedimiento")+22,cadena.indexOf("NumeroProcedimiento")+31);
      // window.location.replace("/editDoc/"+ Doc);
      alert("Edit...");
    }
  }
};

console.log("public.js....");
$('#btnAdd').on('click', function(){
  alert( this );
})


$('#ociTable').bootstrapTable({
  method: 'get',
  url: "/getDocsOci/",
  cache: false,
  height: 500,
  striped: true,
  pagination: true,
  pageSize: 50,
  pageList: [10, 25, 50, 100, 200],
  search: true,
  showColumns: true,
  showRefresh: true,
  minimumCountColumns: 2,
  clickToSelect: true,
  columns: [/*{
    field: 'state',
    checkbox: true
  }, */{
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
    visible: true,
  }, {
    field: 'operate',
    title: 'Operacion',
    align: 'center',
    valign: 'top',
    clickToSelect: false,
    formatter: operateFormatter,
    events: operateEvents
  }]
});

function operateFormatter(value, row, index) {
  return [
    '<a class="edit ml10" href="javascript:void(0)" title="Editar">',
      '<i class="glyphicon glyphicon-edit"></i>',
    '</a>',
    '<a class="gap ml10"  title="">',
       '<i>   </i>',
    '</a>'
  ].join('');
  }

$('#ociTable').on('all.bs.table', function (e, name, args) {
        // console.log('Event:', name, ', data:', args);
    })
    .on('click-row.bs.table', function (e, row, $element) {
        // $result.text('Event: click-row.bs.table');
        // alert( row.nombreDocumento );
        $.ajax({
            url: '/sendFile',
            type: 'post',
            data: {
              filename: row.nombreDocumento,
              filepath: row.nombreFichero
            },
            // success: function (data) {
            //   data
            // }
          });
    });



































// $('.btnDelete').on('click', function( e ){
//   e.preventDefault();
//   console.log( "ajax: "+ $(this)[0].attributes.action.nodeValue );
//   console.log( window.location );
//   console.log( window.location.origin + $(this)[0].attributes.action.nodeValue );

//   var $self = $(this);

//   $.ajax({
//       url: $(this)[0].attributes.action.nodeValue,
//       type: 'delete',
//       success: function() {
//         // window.location.redirect = "/tasks";
//         $self.parent().remove();
//       }
//     });
// });

// $('.btnComplete').on('click', function( e ){
//   e.preventDefault();
//   var $self = $(this);
//   $.ajax({
//       url: $(this)[0].attributes.action.nodeValue,
//       type: 'post',
//       success: function() {
//         $self.parent().remove();
//       }
//     });
// });

// $('.btnCompleteAll').on('click', function( e ){
//   var res = confirm("Are you sure you want to complete all tasks?");
//   if ( res ){
//     e.preventDefault();
//     var $self = $(this);
//     // console.log( $self.parent );
//     $.ajax({
//         url: $(this)[0].attributes.action.nodeValue,
//         type: 'post',
//         success: function() {
//           console.log($('.tasks'));
//           $('.tasks')[0].innerHTML="";
//         }
//       });
//   }
// });


// $('.menuButton').on('click', function( e ){
//   e.preventDefault();
//   console.log( "button: "+ this );
//     $(".menuButton").removeClass('selected');
//     $(this).addClass('selected');
//     window.location.href = this ;
// });
