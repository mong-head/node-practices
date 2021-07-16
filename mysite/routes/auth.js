module.exports = (req,res,next) =>{
    if(req.session.authUser){
        next(); //controller.update등으로 가야함
        return;
    }
    
    // not api
    if(req.accepts("html")){
        res.redirect("/user/login");
        return;
    }
    
    // json req
    res.send({
        result: "fail",
        data: null,
        message: "auth failed"
    })
}