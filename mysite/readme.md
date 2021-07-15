# MySite on Node(Express)

## 환경 구성

* 환경 구성
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
    npm i moment
    npm i -D nodemon
    ```
    * development
        * nodemon : for development (live server)
        * express : for web application development
    * configuration
        * dotenv : 설정파일관련(환경변수)
    * views
        * ejs : views
    * session
        * express-session
    * DB
        * orm : 객체와 mysql table mapping
            * sequelize : DBMS(MySQL, Oracle, Postgre,...) 상관없이 사용가능
            * [문서 참고](https://sequelize.org/master/manual/model-querying-basics.html)
        * mysql2 : mysql보다 좋은 mysql 모듈, sequelize가 mysql사용할 수 있게 바꿔줌
        * moment : date format lib
* scripts in package.json
    ```json
     "scripts": {
            "start": "node index.js",
            "debug": "nodemon index.js"
        }
    ```
    * ```npm start``` : 운용시
    * ```npm run debug``` : 개발시; live update

## Project

* Structure
    ```txt
    /mysite
        |--- index.js
        |--- package.json
        |--- package-lock.json
        |--- /node-modules
        |--- /config
        |--- /public
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