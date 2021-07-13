const { query } = require('express');
const mysql = require('mysql');
const util = require('util');
const dbconn = require('./dbconn');

module.exports = {
    findAll: async function(){
        const conn = dbconn();

        // promise
        const query = util.promisify(conn.query).bind(conn);

        try{
            const results = await query("select no,name,password,message,DATE_FORMAT(reg_date, '%y-%m-%d') as regDate from guestbook order by no desc",[]);
            return results;
        } catch(error) {
            console.error(error);
        } finally {
            conn.end();
        }
        
        return null;
    },
    delete: async function(guestbook){
        const conn = dbconn();

        // promise
        const query = util.promisify(conn.query).bind(conn);

        try{
            const results = await query("delete from guestbook where no= ? and password= ?",
            Object.values(guestbook));
            results.no = Object.values(guestbook)[0];
            return results;
        } catch(error) {
            console.error(error);
        } finally {
            conn.end();
        }
        
        return null;
    },
    insert: async function(guestbook){
        const conn = dbconn();

        // promise
        const query = util.promisify(conn.query).bind(conn);

        try{
            const results = await query("insert into guestbook values(null, ?, ?, ?, now());",
            Object.values(guestbook));
            return results;
        } catch(error) {
            console.error(error);
        } finally {
            conn.end();
        }
        
        return null;
    },

}