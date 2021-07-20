const models = require('../models');

module.exports = {
    index: async (req,res,next) => {
        try{
            // variance
            let currentPageNo = (req.params.no == null ? 1 : req.params.no);
            let looking_for = (req.body.looking_for ? req.body.looking_for : "title_contents");
            
            // sql
            const size_list = await models.Board.findAll();
            const size = size_list.length;
            const list = await models.Board.findAll({
                attributes: ['no','title','contents','hit','group_no','order_no','depth','user_no',
                    [models.sequelize.Sequelize.fn('date_format', models.sequelize.Sequelize.col('reg_date'),'%Y-%m-%d'), 'reg_date']
                ],
                include:{
                    model: models.User,
                    required: true
                },
                order: [
                    ['group_no','desc'],
                    ['order_no','asc']
                ],
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
            res.render('board/view',{
                boardVo: boardVo
            });
        } catch(err){
            next(err);
        }
    }
}