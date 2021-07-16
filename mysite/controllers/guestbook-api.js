const models = require("../models"); // /models/index.js
const { Op } = require("sequelize");

module.exports = {
    read: async (req,res,next) => {
        const startNo = parseInt(req.query.sno) || 0;
        const results = await models.Guestbook.findAll({
            attributes: [
                "no","name","password","message", 
                [models.sequelize.Sequelize.fn('date_format', models.sequelize.Sequelize.col('reg_date'),'%Y-%m-%d'), 'reg_date']
            ],
            order: [
                ['no', 'DESC'],
            ],
            where: (startNo > 0) ? {no: {[Op.lt]:startNo}} : {},
            limit: 3
        });
        res.status(200).send({
            result: "success",
            data: results,
            message: null
        })
    },
    delete: async (req,res,next) => {
        console.log(req.params.no + ":" + req.body.password);
        const results = await models.Guestbook.destroy({
            where: {
              no: req.params.no,
              password: req.body.password
            }
          });
     
        res.status(200).send({
            result: 'success',
            data: results,
            message: null
        });
       
        
    },
    post: async (req,res,next) =>{
        const results = await models.Guestbook.create(req.body);
        if(results){
            res.status(200).send({
                result: 'success',
                data: Object.assign(req.body,{
                    password: '', //password 가리기
                }),
                message: null
            });
        }
        return;
    }
}