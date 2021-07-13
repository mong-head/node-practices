const { query } = require('express');
const mysql = require('mysql');
const util = require('util');
const dbconn = require('./dbconn');

module.exports = {
    findAll: async function(){
        const conn = dbconn();

        // promise
        //const query = (sql,data) => new Promise((resolve,reject) => conn.query(sql,data,(error,rows,field) => error? reject(conn) : resolve(rows)))
        const query = util.promisify(conn.query).bind(conn);

        try{
            const results = await query("select first_name as firstName, last_name as lastName, email from emaillist order by no desc",[]);
            return results;
        } catch(error) {
            console.error(e);
        } finally {
            conn.end();
        }
        
        return null;
    },
    insert: async function(emaillist){
        console.log(emaillist);                 // 객체
        console.log(Object.values(emaillist));  // 배열

        const conn = dbconn();

        // promise
        const query = util.promisify(conn.query).bind(conn);

        try{
            const results = await query("insert into emaillist values(null, ?,?,?)",
                [emaillist.firstName, emaillist.lastName, emaillist.email]);
            return results;
        } catch(error) {
            console.error(e);
        } finally {
            conn.end();
        }
        
        return null;
    }
}