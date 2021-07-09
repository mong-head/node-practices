const http = require('http'); //core module
const fs = require('fs');

const port = 8080;

const server = http.createServer(function(req, resp){
    console.log(req.url);
    if(req.url === '/'){
        req.url = '/hello.html';
    }

    // async
    fs.readFile(__dirname + "/public" + req.url,function(error,data){
        resp.writeHead(200,{
            'CONTENT-Type': 'text/html'
        });
        resp.end(data);
    }); 
});

server.listen(port,function(){
    console.log(`HTTP server running on port ${port}`);
})