const dotenv = require('dotenv');
const path = require('path');
const assert = require('assert').strict;
const should = require('chai').should();

dotenv.config({path:path.join(path.resolve(__dirname,'..'), 'config/db.env')});

describe('Model Board', function(){
    let models;
    let user;

    before(async function(){
        models = require('../models');
        user = await models.User.create({
            name: 'testuser',
            email: 'testuser@gmail.com',
            password: '1234',
            gender: 'female'
        });
    });

    it('Create 3 Boards',async function(){
        const board = await models.Board.create({
            title: 'test',
            contents: 'test',
            hit: 0,
            group_no: 0,
            order_no: 0,
            depth: 0,
            user_no: user.no,
        })
        board.no.should.not.equal(undefined);
    })

    it('Fetch Boards by user(test)',async function(){
        const results = await models.Board.findAll({
            where:{
                user_no : user.no
            },
            include:{
                model: models.User,
                required: true
            }
        })
        results.should.have.lengthOf(1);
    })

    after(async function(){
        await models.User.destroy({
            where:{
                no: user.no
            }
        });
        await models.Board.destroy({
            where:{
                user_no: user.no
            }
        })
    });
});

const models = require('../models');