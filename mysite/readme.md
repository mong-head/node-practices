# MySite on Node(Express)

## 환경 구성

* 환경 구성
    ```ps
    npm init -y
    ```

* 설치 패키지
    ```ps
    npm i express
    npm i ejs
    npm i -D nodemon
    ```
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