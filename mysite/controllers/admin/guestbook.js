const models = require('../../models')

module.exports = {
    index: (req,res) => {
        res.render('admin/guestbook',{
            menu: 'guestbook'
        });
    }
}