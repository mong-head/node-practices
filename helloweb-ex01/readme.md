# helloweb prac01

* web application 만들기 실습

* 맨바닥에서 web application 만들어보기 ( helloweb-ex01 )
    1. app01.js : based on (http) core module
    2. app02.js : based on (http + fs) core module 
        - error page 표시 안해줌
        - 이미지 요청을 이상하게 처리함 (이미지가 아닌 문자들로 표현됨)
    3. app03.js : based on (connect,serve-static) npm package(module) : npm i 로 설치하기
        ```shell
        npm i connect
        npm i serve-static
        ```
        - 없는 페이지에 대해 요청잘못왔다고 해줌
        - 이미지에 대해서 요청을 처리해줌
        - controller등을 이용해서 사용한 루트는 못감
    4. app04.js : based on v(connect,serve-static, connect-rule) npm package
        ```shell
        npm i connect-rule
        ```
        - controller등 이용한 루트도 갈 수 있음

* 사용 modules
    * core module
        * http : 연결관련
        * fs : 비동기로 처리, 파일 읽기 관련
    * npm module
        * connect : 연결 관련
            - use : middle ware 사용하는 것
                ```js
                const app = connect();
                app.use(serveStatic(__dirname + "/public"));
                ```
        * serve-static : static resource 처리
        * connect-route : routing(mapping); resource route를 mapping 한 route사용가능
    * 이 프로젝트에서 사용한 것들로는 어느정도의 web application을 만들기 어려움