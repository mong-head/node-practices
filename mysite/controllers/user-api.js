const models = require("../models"); // /models/index.js
const logger = require('../logging');

module.exports = {
    checkemail: async (req,res,next) => {
        try{
            const user = await models.User.findOne({
                attributes: ['no'],
                where: {
                    email: req.query.email || ''
                }
            })
    
            res.send({
                result: "success",
                data: user !== null,
                message: null
            });
        } catch(err){
            logger.error(err);
            next(err);
        }
    }
}