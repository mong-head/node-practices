
module.exports = {
    index: async (req,res,next) => {
        try{
            res.render('gallery/index')
        } catch(err){
            next(err);
        }
    },
    delete: async (req,res,next) => {
        console.log(req.params.no + ":" + req.body.password);
        // sql delete - do this
        res.status(200).send({
            result: 'success',
            data: req.params.no,
            message: null
        });
    },
    post: async (req,res,next) =>{
        // sql insert - do this
        res.status(200).send({
            result: 'success',
            data: Object.assign(req.body,{
                no: 10,
                password: '', //password 가리기
                reg_date: new Date() // now
            }),
            message: null
        });

    }
}