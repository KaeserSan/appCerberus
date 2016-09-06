/* jshint esversion:6 */
const express = require( 'express' );
const pug = require( 'pug' );
const bodyParser = require( 'body-parser' );
const cookieParser = require( 'cookie-parser' );
const path = require( 'path' );
const dateFormat = require( 'date-format' );
const fs = require( 'fs' );
const mime = require( 'mime' );
const Promise = require( 'promise' );
const _ = require( 'underscore' );
const formidable = require('formidable');
const Busboy = require('busboy');
const inspect = require('util').inspect;
const bcrypt = require ( 'bcrypt-nodejs' );

const main = require( './main' );
// require( './js/login/index.js' );

const app = express();

app.locals.moment = require( 'moment' );

app.set( 'views', path.join( __dirname, '/views' ) );
app.set( 'view engine', 'pug' );

app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );

// app.use( '/', require( './js/login' ) );

app.get( '/', ( req, res ) => {
  res.render( 'login' );
} );

app.post( '/auth', ( req, res ) => { //  req.params.id => /auth/:id
  main.checkUser( req.body )
  .then( ( userData ) => {
    if ( userData.length === 0) {
      res.send( 'No tienes acceso.' );
    } else {
      const cookie = { user: main.setCookies( userData, res ) };
      main.getData( cookie, ( oData ) => {
        res.render( 'mainMenu', {
          clientes: JSON.stringify( oData.clientes ),
          ejercicios: JSON.stringify( oData.ejercicios ),
        });
      });
    }
  });
});

app.get( '/oci', ( req, res ) => {
  main.getData( req.cookies, ( oData ) => {
    res.render( 'oci', {
      clientes: JSON.stringify( oData.clientes),
      ejercicios: JSON.stringify( oData.ejercicios),
    });
  });
});

app.get( '/protocolos', ( req, res ) => {
  main.getData( req.cookies, ( oData ) => {
    res.render( 'protocolos', {
      clientes: JSON.stringify( oData.clientes),
      ejercicios: JSON.stringify( oData.ejercicios),
    });
  });
});

app.get( '/registros', ( req, res ) => {
  main.getData( req.cookies, ( oData ) => {
    res.render( 'registros', {
      clientes: JSON.stringify( oData.clientes),
      ejercicios: JSON.stringify( oData.ejercicios),
    });
  });
});

app.get( '/plantillas', ( req, res ) => {
  main.getData( req.cookies, ( oData ) => {
    res.render( 'plantillas', {
      clientes: JSON.stringify( oData.clientes),
      ejercicios: JSON.stringify( oData.ejercicios),
    });
  });
});

app.get( '/getDocs/:col/:cat/:id/:ej', ( req, res ) => {
  const params = {
    colection: req.params.col,
    category: req.params.cat,
    client: req.params.id,
    exercice: req.params.ej,
  };
  main.docs( params, {}, ( data ) => {
    if ( data.length === 0 ) {
      res.status(200).json( {} );
    } else {
      res.status(200).json( data );
    }
  });
});

app.get( '/getFile/:file', ( req, res ) => {
  // const fullFilePath = '/Users/angel/Documents/proyectos/appCerberus/Data/ATCerberus.pdf';
  // console.log(`sending file... ${req.params.file}` );
  const fullFilePath = path.join( __dirname, '/Data/', req.params.file);

  res.sendFile( fullFilePath, /* options, */( err ) => { // res.download
    if ( err ) {
      res.status( err.status ).end();
    }
  });
});

app.post('/upload', ( req, res ) => {
  if (req.method.toLowerCase() == 'post') {
    const fields = {};
    const files = {};
    const busboy = new Busboy({ headers: req.headers });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      try {
        fields[fieldname] = JSON.parse( val );
      } catch( err ) {
        fields[fieldname] = val;
      }
    });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      const nombreFichero = main.randomFileName(40, path.extname(filename) );

      files[fieldname] = {
        nombreFichero: nombreFichero,
        nombreDocumento: filename,
      };

      var saveTo = path.join( __dirname, '/Data', path.basename(nombreFichero));
      file.pipe(fs.createWriteStream(saveTo));

      file.on('data', (data) => {
        // console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
      });
      file.on('end', () => {
        // console.log('File [' + fieldname + '] Finished');
      });
    });
    busboy.on('finish', () => {
      res.writeHead(303, { Connection: 'close', Location: fields.oContainer.url });
      const object = {
        col: fields.oContainer.object.col,
        cat: fields.oContainer.object.cat,
        cli: fields.oContainer.object.cli,
        cliId: fields.oContainer.object.cliId,
        ej: fields.oContainer.object.ej,
        files: files,
        filename: files.uploadFile,
        fields: fields,
      };
      // console.log( object );
      main.addFile( object, () => {
        res.send();
      } );
    });
    req.pipe(busboy);
  }
  // res.send( form );
});

app.post('/delete', ( req, res ) => {
  main.deleteFile( req.body.data, ( data ) => {
    console.log( data );
    if ( data === 'OK') {
      console.log( 'data OK');
      res.status(200).send();
    } else {
      console.log( 'data KO');
      res.status(200).send();
    }
  });
});

app.get( '/tiposPersonal', ( req, res ) => {
  main.getTiposPersonal()
  .then( ( data ) => {
    if ( data.length === 0 ) {
      res.status(200).json( {} );
    } else {
      res.status(200).json( data );
    }
  });
});

app.post('/personal', ( req, res ) => {

});



app.listen(3000, ( req, res) => {
  // console.log('Listening on port 3000');
  console.log(`Listening on port 3000`);
} );


// Routes para pruebas

app.get( '/usuarios', ( req, res, next) => {
  main.checkUserTest( { usuario: 'angel' }, ( data ) => {
    if ( data ) {
      res.json( data );
    } else {
      res.json( {} );
    }
  } );
} );

app.get( '/getExercices', ( req, res, next) => {
  main.getExercices( ( data ) => {
    if ( data ) {
      res.json( data );
    } else {
      res.json( {} );
    }
  } );
} );

app.get( '/getDocsTest', ( req, res, next) => {
  const filter = {
    'datos.codigo': 1,
    'ejercicio.id': 2015
  };
  const project = {
    _id: 0,
    'ejercicio.documentos.oci.estatutos': 1,
  };
  main.getDocsTest(filter, project, ( data ) => {
    if ( data ) {
      res.json( data[0].ejercicio[0].documentos.oci.estatutos[0]);
    } else {
      res.json( {} );
    }
  } );
} );

// 'ejercicio':[{'documentos':{'oci':{'estatutos':
