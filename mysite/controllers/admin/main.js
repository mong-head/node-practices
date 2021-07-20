const models = require('../../models')

module.exports = {
    index: async (req,res,next) => {
        try{
            const site = await models.Site.findOne({
                attributes: ['title','welcome','image','description'],
            })
            res.render('admin/main',{
                site: site || [],
                menu: 'admin'
            });
        } catch(err) {
            next(err);
        }
    }
}