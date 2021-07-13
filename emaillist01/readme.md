# emaillist01 : model based mysql

## 환경 구성

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

* directory 설명
    * public : static resources(img, html)
    * routes : mapping
    * controllers : 
    * models : 
    * views : ejs(화면)

* index.js -> routes/emaillist.js -> controllers/emaillist.js(index) -> models/emaillist.js -> views/index.ejs

* index.js -> routes/emaillist.js -> controllers/emaillist.js(addform) -> models/emaillist.js -> views/add.ejs