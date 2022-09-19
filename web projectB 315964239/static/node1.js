

var http = require('http');
var port = 8080;
http.createServer(
    function (req, res) {
    res.write('Hello World!');
        res.end();
    }
).listen(port);