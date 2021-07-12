# helloweb 2 : express

* 기본 node project 형식 연습

## 환경 설정

* project 생성
    * init & modules
        ```shell
        npm init -y
        npm i express
        npm i ejs
        npm i -D nodemon
        ```

    * package.json 수정
        ```json
        "scripts": {
            "start": "node index.js",
            "debug": "nodemon index.js"
        }
        ```
        * ```npm start``` : 운용시
        * ```npm run debug``` : 개발시; live update

## project

* [index.js](index.js)
    * application setup
        * static serve : 정적 자원 처리 (public 내의 자원)
        * request body parser ("https://localhost:8080/hello?no=10&email=1@gmail.com" 처리)
        * view engine setup : ejs
        * request router
    * server setup

* directory 설명
    * public : static resources(img, html)
    * routes : mapping
    * views : ejs(화면)

* routing (router : express module사용)
    * get
        * parameter X
            ```js
            router.route("/01").get(function(req,res){
                res.render("hello/01") // views/hello/01.jsp mapping
            });
            ```
        * parameter O
            ```js
            router.route("/02").get(function(req,res){
                res.render('hello/02',{
                    no: req.query.no || "", // default : ""
                    email: req.query.email || ""
                })
            });
            ```
    * post
        ```js
        router.route("/join").post(function(req,res) {
            console.log(req.body);
            res.redirect("/");
        });
        ```
    * json (api)
        ```js
        router.route("/api").get(function(req,res) {
            const vo = {
                no: 10,
                name: '둘리',
                email: 'dooly@gmail.com',
                gender: 'male'
            }
            res.writeHead(200,{
                'CONTENT-Type': 'application/json'
            });
            res.end(JSON.stringify(vo));
        });
        ```