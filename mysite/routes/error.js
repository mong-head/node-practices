const logger = require('../logging');

module.exports = {
    error404: (req,res) => res.status(404).render('error/404'),
    error500: (err,req,res,next) => {
        // logging
        // err.name, err.message, err.stack 中
        logger.error(err.stack);
        
        // apology page
        //res.status(500).render('error/500');              // for release
        res.status(500).send(`<pre>${err.stack}</pre>`);    // for dev
    }
}