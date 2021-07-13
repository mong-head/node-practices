const model = require("../models/emaillist");

exports.index = async function(req,res){
    const results = await model.findAll();
    res.render("index",{
        list: results || []
    });
}
exports.form = function(req,res){
    res.render("form")
}
exports.add = function(req,res){
    console.log(req.body);
    res.redirect("/")
}