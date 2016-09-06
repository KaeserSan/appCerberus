const user = process.getModel( 'usuarios' );

function test( req, res ) {
  //
  user.find()
  .then( ( data ) => res.json( data ) )
  .catch( ( err ) => console.log(err) );
}

export default test;
