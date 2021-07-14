const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,{
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql'
    }
);

const User = require('./User')(sequelize);
const Guestbook = require('./Guestbook')(sequelize);

User.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // true : (drop) table 데이터 없어질 수 있음
    alter: process.env.TABLE_ALTER_SYNC === 'true'     // 개발 끝나면 false로 하기
})
Guestbook.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true',
    alter: process.env.TABLE_ALTER_SYNC === 'true'     
})
module.exports = {sequelize, User,Guestbook}; 
// {User : User} : User라는 이름으로 User 객체 맵핑, {User} : ES6 같은 기능