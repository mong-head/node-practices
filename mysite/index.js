// function -> 전역변수 최소화
(() => {
    // init
    const { EACCES, EADDRINUSE } = require('constants');
    const express = require('express');
    const session = require('express-session');
    const http = require('http');
    const multer = require('multer');
    const path = require('path');
    const dotenv = require('dotenv');
    
    // Environment Variables(환경변수 관리)
    dotenv.config({path: path.join(__dirname,'config/app.env')})
    dotenv.config({path: path.join(__dirname,'config/db.env')})
    
    // logging
    const logger = require('./logging');
    
    // router
    const mainRouter = require('./routes/main');
    const userRouter = require('./routes/user');
    const guestbookRouter = require('./routes/guestbook');
    const galleryRouter = require('./routes/gallery');
    const boardRouter = require('./routes/board');
    const adminRouter = require('./routes/admin');
    const userApiRouter = require('./routes/user-api');
    const guestbookApiRouter = require('./routes/guestbook-api');
    const errorRouter = require('./routes/error');
    
    // application setup
    const application = express()
        // 1. session environment
        .use(session({
            secret: 'mysite-session',   // session cookie 암호화, 쿠키 변조 방지
            resave: false,              // request에서 session 변경사항이 없어도 항상 저장
            saveUninitialized: false    // 새로 session을 생성할 때 "uninitialized"상태로 둠.
    
        }))
        // 2. request body parser
        .use(express.urlencoded({extended:true})) // application/x-www-form-urlencoded
        .use(express.json()) // application/json
        // 3. multipart
        .use(multer({
            dest: path.join(__dirname, process.env.MULTER_TEMPORARY_STORE)
        }).single('file'))
        // 4. static serve
        .use(express.static(path.join(__dirname,process.env.STATIC_RESOURCES_DIRECTORY)))
        // 5. view engine setup
        .set("views",path.join(__dirname,"views"))
        .set("view engine","ejs")
        // 6. request router
        // 모든 method(GET,POST,PUT,DELETE), 모든 url
        .all('*',function(req,res,next){
            res.locals.req = req;
            res.locals.res = res;
            next();
        })
        .use("/",mainRouter)
        .use("/user",userRouter)
        .use("/guestbook",guestbookRouter)
        .use("/gallery",galleryRouter)
        .use("/board",boardRouter)
        .use("/admin",adminRouter)
        // api
        .use("/api/user",userApiRouter)
        .use("/api/guestbook",guestbookApiRouter)
        // 404: default mapping (잘못된 경로로 들어온 경우)
        .use(errorRouter.error404)
        // 500: server error
        .use(errorRouter.error500);
    
    // server setup
    http.createServer(application)
        .on('listening',function(){
            logger.info(`HTTP server running on port ${process.env.PORT}`);
        })
        .on('error',function(error){
            if(error.syscal !== 'listen'){
                throw error; // node가 처리하도록 함
            }
    
            // listener prob
            switch(error.code){
                // port 못열때
                case 'EACCESS':
                    logger.error(`Port: ${process.env.PORT} requires privileges.`);
                    process.exit(1); // 비정상 종료
                    break;
                // 서버 또 열때
                case 'EADDRINUSE':
                    logger.error(`Port: ${process.env.PORT} is already used.`);
                    process.exit(1);
                    break;
                default:
                    throw errors;
            }
        })
        .listen(process.env.PORT);
})()