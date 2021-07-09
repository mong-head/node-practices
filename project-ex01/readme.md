# project-ex01

* node project 생성
    ```shell
    npm init
    ```

* node library 설치
    ```shell
    npm i ejs
    ```

* project
    ```txt
    project-ex01
    |--- package.json (manifest file : project 설명)
    |--- package-lock.json (dependency script : 의존 library 정보-버전까지)
    |--- /node_modules  (gitignore)
    |--- /public 
    |--- index.js (start page)
    |--- /src
    |--- /controller
    |--- /view
    |--- /router
    |--- /model
    ```
    * package.json 
        * pom.xml 비슷
        * 이거가지고 설치
    * node_modules
        * library 여기에 설치됨
        * git 시에는 ignore
    * public
        * webapp 비슷 
        * static resource
            * landing page 존재
    * router
        * dispatcher
