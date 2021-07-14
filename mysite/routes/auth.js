module.exports = (req,res,next) =>{
    if(req.session.authUser == null){
        res.redirect('/user/login');
        return;
    }

    next(); //controller.update등으로 가야함
}