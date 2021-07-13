# guestbook01 : model based mysql

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

<img src="https://user-images.githubusercontent.com/52481037/125406396-c06f2680-e3f3-11eb-90d7-3196c7083df4.jpg" width="50%" />