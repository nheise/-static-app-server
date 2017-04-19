var o = require("ospec");
var http = require("http");

var server = require("../index.js")( { port: 8080, path: 'tests/dist/' } );

o.spec("static-app-server", function() {
  
  o.after( () => server.close() );
  
  o("get /index.html must respond 200", function( done ) {
    
    var options = { hostname: 'localhost', port: 8080, path: '/index.html', method: 'GET' };
    
    var req = http.request( options, (res) => {
      o( res.statusCode ).equals( 200 );
      o( res.headers["content-type"] ).equals( "text/html; charset=UTF-8" );
      
      res.setEncoding('utf8');
      
      res.on('data', (chunk) => {
        o( chunk.includes("<body>Hello") ).equals( true );
      });
      res.on('end', () => {
        done();
      });
    } );
    
    req.end();
  });

  o("get /anyUrl must respond 200 and return index.html", function( done ) {
    
    var options = { hostname: 'localhost', port: 8080, path: '/anyUrl', method: 'GET' };
    
    var req = http.request( options, (res) => {
      o( res.statusCode ).equals( 200 );
      o( res.headers["content-type"] ).equals( "text/html; charset=UTF-8" );
      
      res.setEncoding('utf8');
      
      res.on('data', (chunk) => {
        o( chunk.includes("<body>Hello") ).equals( true );
      });
      res.on('end', () => {
        done();
      });
    } );
    
    req.end();
  });

  o("get /test.js must respond 200", function( done ) {
    
    var options = { hostname: 'localhost', port: 8080, path: '/test.js', method: 'GET' };
    
    var req = http.request( options, (res) => {
      o( res.statusCode ).equals( 200 );
      o( res.headers["content-type"] ).equals( "application/javascript" );
      
      res.setEncoding('utf8');
      
      res.on('data', (chunk) => {
        o( chunk ).equals( "var test=\"test\";" );
      });
      res.on('end', () => {
        done();
      });
    } );
    
    req.end();
  });
  
  o("any request without accept header \"html\" and file is not available, must respond 404", function( done ) {
    
    var options = { hostname: 'localhost', port: 8080, path: '/notThere.js', method: 'GET', headers: { 'Accept': 'application/javascript' } };
    
    var req = http.request( options, (res) => {
      o( res.statusCode ).equals( 404 );
      
      res.setEncoding('utf8');
      
      res.on('data', (chunk) => {
        o( chunk ).equals( "File not found. /notThere.js" );
      });
      res.on('end', () => {
        done();
      });
    } );
    
    req.end();
  });
});