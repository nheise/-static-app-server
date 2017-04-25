var express = require( 'express' );
var app = express();

function server( options ) {
  const config = options || {};
  const port = config.port || 8080;
  const filePath = config.path || 'dist';
  const defaultFile = config.defaultFile || "/index.html";
  const defaultFileOptions = { root: filePath };
  
  console.log( "serve files from: " + filePath );
  app.use( express.static( filePath, { fallthrough: true } ) );
  
  console.log( "default file is: " + defaultFileOptions.root + defaultFile );
  app.use( function ( req, res, next ) {
    if( req.accepts('html') ) {
      res.sendFile( defaultFile, defaultFileOptions );
    }
    else {
      res.status(404).send('File not found. ' + req.path );
    }
  } );
  
  var server = app.listen( port );
  console.log( 'Express started on port ' + port );
  
  return server;
}

module.exports = { createServer: server };