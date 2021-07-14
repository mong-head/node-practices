const models = require("../models"); // /models/index.js

module.exports = {
    list: async (req,res) => {
        const results = await models.Guestbook.findAll({
            attributes: [
                "no","name","password","message",
                [models.sequelize.Sequelize.fn('date_format', models.sequelize.Sequelize.col('reg_date'),'%Y-%m-%d'), 'reg_date']
            ],
            order: [
                ['no', 'DESC'],
            ],
        });
        res.render("guestbook/list",{
            list: results || []
        });
    },
    insert:  async (req,res) => {
        const results = await models.Guestbook.create({
            name: req.body.name,
            password: req.body.password,
            message: req.body.message,
            reg_date: models.sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
        });
        res.redirect("/guestbook");
    },
    delete: (req,res) => res.render("guestbook/delete",{ no: req.params.no || 0, correctness: -1}),
    _delete: async (req,res) => {
        const results = await models.Guestbook.destroy({
            where: {
              no: req.body.no,
              password: req.body.password
            }
          });
        if(results == 1){
            res.redirect("/guestbook");
        } else {
            res.render("guestbook/delete",{
                no: results.no || 0,
                correctness: results
            });
        }
    },
    
}