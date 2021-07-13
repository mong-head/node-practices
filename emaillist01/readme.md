# emaillist01 : model based mysql

## 환경 구성

* project 생성
    * init & modules
        ```shell
        npm init -y
        npm i express
        npm i ejs
        npm i -D nodemon
        npm i mysql
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
    * controllers : rendering/ redirecting
    * models : DB query관련
    * views : ejs(화면)

* project 설명

    <img src="https://user-images.githubusercontent.com/52481037/125382758-3d3cd900-e3d1-11eb-87f1-0bfdde40124a.jpg" width="50%"/>

    * model 연습
        * [db 연결](models/dbconn.js)
        * query 有 function : 비동기 함수

