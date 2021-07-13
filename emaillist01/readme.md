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
        * query 有 function : async, await (controller 함수도 async, await 사용)
            * query 날려서 데이터 받아오는 함수 : promisify
                ```js
                // models/emaillist.js, 간략히 표현
                async function(emaillist){
                    const query = util.promisify(conn.query).bind(conn); //this를 db connection으로 하고, 쿼리 함수를 promise화시킴
                    const results = await query("insert into emaillist values(null, ?,?,?)", Object.values(emaillist));
                    return results;
                }
                ```
                * emaillist: Object 형태 (```{'no':42, 'email': 'dooly@gmail.com',... }```)
                * ```Object.values(emaillist)``` : Array 형태 (```[42,'dooly@gmail.com',...]```)

