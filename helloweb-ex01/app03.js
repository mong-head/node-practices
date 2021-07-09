const connect = require('connect');
const serveStatic = require('serve-static');

const port = 8080;
const app = connect();
app.use(serveStatic(__dirname + "/public")); // static 자원 처리

app.listen(port,function(){
    console.log(`HTTP server running on port ${port}`);
})