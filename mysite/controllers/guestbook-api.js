
module.exports = {
    read: async (req,res,next) => {

    },
    delete: async (req,res,next) =>{

    },
    post: async (req,res,next) =>{
        console.log(req.body);
        // sql insert - do this
        res.status(200).send({
            result: 'success',
            data: Object.assign(req.body,{
                no: 10,
                password: '', //password 가리기
                regDate: new Date() // now
            }),
            message: null
        });

    }
}