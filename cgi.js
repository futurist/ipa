var cgi = require('cgi');
var http = require('http');
var path = require('path');

var script = path.resolve(__dirname, 'convert.py');

http.createServer( cgi(script) ).listen(8000);