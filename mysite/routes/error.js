const logger = require('../logging');

module.exports = {
    error404: (req,res) => {
        // not api
        if(req.accepts('html')){
            res.status(404).render('error/404');
            return;
        }

        // api
        res.status(404).send({
            result:'fail',
            data: null,
            message: 'Unknown Request'
        })
    },
    error500: (err,req,res,next) => {
        // logging
        // err.name, err.message, err.stack 中
        logger.error(err.stack);
        
        // apology page
        // not api
        if(req.accepts('html')){
            //res.status(500).render('error/500');              // for release
            res.status(500).send(`<pre>${err.stack}</pre>`);    // for dev
            return;
        }

        // api
        res.status(500).send({
            result: 'fail',
            data: null,
            message: err.stack
        });
    }
}