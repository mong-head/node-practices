const models = require('../models');
const { Op } = require("sequelize");
const board = require('./admin/board');
const url = require('url');  

module.exports = {
    index: async (req,res,next) => {
        try{
            // variance
            let currentPageNo = (req.query.p == null ? 1 : req.query.p);
            let looking_for = (req.query.looking_for ? req.query.looking_for : (req.body.looking_for ? req.body.looking_for :"title_contents"));
            let kwd = (req.query.kwd ? req.query.kwd : (req.body.kwd ? req.body.kwd : ""));
            
            // sql
            const size_list = await models.Board.findAll();
            const size = size_list.length;
            const list = await models.Board.findAll({
                attributes: ['no','title','contents','hit','group_no','order_no','depth','user_no',
                    [models.sequelize.Sequelize.fn('date_format', models.sequelize.Sequelize.col('reg_date'),'%Y-%m-%d'), 'reg_date']
                ],
                include:{
                    model: models.User,
                    required: true,
                },
                order: [
                    ['group_no','desc'],
                    ['order_no','asc']
                ],
                where: (looking_for === 'title_contents' ? {[Op.or]: [ {title: {[Op.substring]:kwd}},{contents: {[Op.substring]:kwd}}]}: 
                        (looking_for === 'title' ? {title: {[Op.substring]:kwd}} : 
                        (looking_for === 'contents' ? {contents: {[Op.substring]:kwd}} : 
                        (looking_for === 'writer' ? { [`$User.name$`] : {[Op.substring]:kwd}} : ""
                )))),
                limit: 5,
                offset: (currentPageNo - 1) * 5
            });
            
            // page info
            let totalPage = Math.ceil(size / 5);
            let firstPageNo = currentPageNo - (currentPageNo - 1) % 5;
            let lastPageNo = firstPageNo + 4;
            let nextPageNo = lastPageNo + 1;
            let prevPageNo = firstPageNo - 1;
            if (prevPageNo < 1) {
                prevPageNo = 1;
            }
            if (nextPageNo > totalPage) {
                nextPageNo = totalPage;
            }

            const pageInfo = {
                currentPageNo: currentPageNo,
                totalPage: totalPage,
                firstPageNo: firstPageNo,
                lastPageNo: lastPageNo,
                nextPageNo: nextPageNo,
                prevPageNo: prevPageNo
            }

            res.render('board/list',{
                list: list,
                size: size,
                pageInfo: pageInfo,
                looking_for: looking_for,
                kwd: kwd
            });
        } catch(err){
            next(err);
        }
    },
    view: async (req,res,next) => {
        try{
            let no = req.params.no;
            const boardVo = await models.Board.findOne({
                where:{
                    no : no
                }
            })
            // update hit
            await models.Board.update({
                    hit: boardVo.hit + 1 
                }, { 
                    where : {
                        no : no
                    }
                }
            );
            res.render('board/view',{
                boardVo: boardVo
            });
        } catch(err){
            next(err);
        }
    },
    write : (req,res) => {
        res.render('board/write');
    },
    _write:  async (req,res,next) => {
        try{
            let user_no = req.session.authUser.no;
            
            if(req.params.no){
                let currentVo = await models.Board.findOne({
                    where: {
                        no : req.params.no
                    }
                });
                await models.Board.update({
                    order_no: models.sequelize.Sequelize.literal('order_no + 1'),
                 }, { where: {
                        order_no : {[Op.gt] : currentVo.order_no},
                        group_no : currentVo.group_no
                    }
                });
                await models.Board.create({
                    title : req.body.title,
                    contents: req.body.contents,
                    hit: 0,
                    group_no : currentVo.group_no,
                    order_no: currentVo.order_no + 1,
                    depth: currentVo.depth + 1,
                    user_no : user_no
                });

            } else {
                let max_groupNo = await models.Board.max('group_no');
                max_groupNo = isNaN(max_groupNo) ? 0 : max_groupNo + 1;
                await models.Board.create({
                    title : req.body.title,
                    contents: req.body.contents,
                    hit: 0,
                    group_no : max_groupNo,
                    order_no: 0,
                    depth: 0,
                    user_no : user_no
                });
            }
            console.log(req.body);
            res.redirect('/board');
        } catch(err){
            next(err);
        }
    },
    update: async (req,res,next) => {
        try{
            const no = req.params.no;
            const boardVo = await models.Board.findOne({
                where : {
                    no : no
                }
            });
            res.render('board/modify',{
                no : no,
                boardVo: boardVo
            })

        } catch(err){
            next(err);
        }
    },
    _update: async (req,res,next) => {
        try{
            await models.Board.update({
                title: req.body.title,
                contents: req.body.contents
             }, { where: {
                    no : req.params.no
                }
            });
            res.redirect("/board");
        }catch(err){
            next(err);
        }
    },
    delete: async (req,res,next) => {
        try{
            const no = req.params.no;
            const currentPageNo = req.query.p;
            const kwd = (req.query.kwd ? req.query.kwd : null);
            const looking_for = (req.query.looking_for ? req.query.looking_for : "title_contents");
            
            await models.Board.destroy({
                where : {
                    no : no
                }
            })
            res.redirect(url.format({
                pathname : '/board',
                query: {
                    p : currentPageNo,
                    kwd: kwd,
                    looking_for: looking_for
                }
            }));
        }catch(err){
            next(err);
        }
    }
}