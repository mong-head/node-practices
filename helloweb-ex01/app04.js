const connect = require('connect');
const serveStatic = require('serve-static');
const connectRoute = require('connect-route');

const port = 8080;
const app = connect();
app.use(serveStatic(__dirname + "/public"));

// mapping (routing)
app.use(connectRoute(function(router){
    router.get("/",function(req,resp){
        resp.writeHeader(200,{
            'Content-Type': "text/html"
        });
        resp.end("<h1>main</h1>");
    });

    // request variable
    router.get("/user",function(req,resp){
        console.log(req._parsedUrl.query);

        // 복잡함 -> express에서는 간편히 함 (req.query)
        params = {};
        parameters = (req._parsedUrl.query || "").split("&"); // "" : parameter안들어올 때
        parameters.forEach(parameter => {
            tokens = parameter.split("=");
            params[tokens[0]] = tokens[1];
        });

        resp.writeHeader(200,{
            'Content-Type': "text/html"
        });
        resp.end("<h1>user no(" + params.no + ")</h1>");
    });

    router.get("/guestbook",function(req,resp){
        resp.writeHeader(200,{
            'Content-Type': "text/html"
        });
        resp.end("<h1>guestbook list</h1>");
    });

    router.get("/board",function(req,resp){
        resp.writeHeader(200,{
            'Content-Type': "text/html"
        });
        resp.end("<h1>board list</h1>");
    });

    // pathVariable
    router.get("/board/:no",function(req,resp){
        resp.writeHeader(200,{
            'Content-Type': "text/html"
        });
        resp.end("<h1>board list(" + req.params.no + ")</h1>");
    });
}));


app.listen(port,function(){
    console.log(`HTTP server running on port ${port}`);
})