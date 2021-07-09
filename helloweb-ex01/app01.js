const http = require('http'); //core module
const port = 8080;

const server = http.createServer(function(req, resp){
    console.log("request");
    resp.writeHead(200,{
        'CONTENT-Type': 'text/html'
    });
    resp.end('<h1>Hello Web</h1>');
});

server.listen(port,function(){
    console.log(`HTTP server running on port ${port}`);
})