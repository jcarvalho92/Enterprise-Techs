fs = require('fs') 
fs.readFile('package.json', 'utf8', function(err,data) {
    if (err) { 
        return console.log(err); 
    } 
    console.log(data); 
});

var http = require('http');
var server = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("product information");
} );
server.listen(8000, '127.0.0.1')