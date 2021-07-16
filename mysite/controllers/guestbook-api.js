
module.exports = {
    read: async (req,res,next) => {
        const startNo = req.query.sno || 0;
        console.log(startNo);
        // sql select(limit) - do this
        res.status(200).send({
            result: "success",
            data: [{
                no: startNo-1,
                name: '둘리',
                message: '호이~~',
                reg_date: new Date()
            },{
                no: startNo-2,
                name: '둘리2',
                message: '호이2~~',
                reg_date: new Date()
            },{
                no: startNo-3,
                name: '둘리3',
                message: '호이3~~',
                reg_date: new Date()
            }],
            message: null
        })
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