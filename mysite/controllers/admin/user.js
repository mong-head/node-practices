const models = require('../../models')

module.exports = {
    index: (req,res) => {
        res.render('admin/user',{
            menu: 'user'
        });
    }
}