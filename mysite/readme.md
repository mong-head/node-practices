# MySite on Node(Express)

## 환경 구성

* 환경 구성
    * create project manifest file(package.json)
        ```ps
        npm init -y
        ```

* 설치 패키지
    ```ps
    npm i express
    npm i express-session
    npm i ejs
    npm i dotenv       
    npm i sequelize
    npm i mysql2
    npm i multer
    npm i moment
    npm i winston
    npm i winston-daily-rotate-file
    npm i -D nodemon
    npm i -D mocha
    ```
    * development
        * nodemon : for development (live server)
        * express : for web application development
        * mocha : testing
    * configuration
        * dotenv : 설정파일관련(환경변수)
        * logging
            * winston
            * winston-daily-rotate-file
    * views
        * ejs : views
        * moment : date format lib
    * session
        * express-session
    * DB
        * orm : 객체와 mysql table mapping (object relational mapping)
            * sequelize : DBMS(MySQL, Oracle, Postgre,...) 상관없이 사용가능
            * [문서 참고](https://sequelize.org/master/manual/model-querying-basics.html)
        * mysql2 : mysql보다 좋은 mysql 모듈, sequelize가 mysql사용할 수 있게 바꿔줌
        * multer : multi-part parser; image upload (gallery에 필요)
* scripts in package.json
    ```json
     "scripts": {
            "start": "node index.js",
            "debug": "nodemon index.js",
            "test": "npx mocha"
        }
    ```
    * ```npm start``` : 운용시
    * ```npm run debug``` : 개발시; live update

* Restful API tester : Postman 사용

## Project

* Structure
    ```txt
    /mysite
        |--- index.js                   : application define, init
        |--- package.json               : module 정보 저장, project manifest(설명)
        |--- package-lock.json          : module 정보 저장(버전까지)
        |--- [/node-modules]            : modules 저장 (gitignore)
        |--- /config                    : 환경 변수
        |--- /logging                   : log format등등 저장(winston 사용)
        |--- [/logs]                    : logging file 존재
        |--- [/multer-temporary-store]
        |--- /test                      : testing (using mocha)
        |--- /public                    : static resources
        |       |--- /assets
        |               |--- /gallery   : multi-part img 저장소
        |--- /routes
        |--- /controllers
        |--- /models
        |--- /views
                |--- /main
                |--- /user
                |--- /guestbook
                |--- /board
                |--- /gallery
                |--- /admin
    ```
    * config
        * 환경 변수 저장
            * PROFILE
                * development : 개발중일 떄
                * production : 개발 마치고 release할 때
        * 환경 변수 사용? ```process.env.PROFILE```