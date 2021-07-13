const model = require("../models/guestbook");

exports.index = async function(req,res){
    const results = await model.findAll();
    res.render("index",{
        list: results || []
    });
}
exports.deleteform = function(req,res){
    res.render("deleteform",{
        no: req.params.no || 0
    });
}
exports.delete = async function(req,res){
    const results = await model.delete(req.body);
    res.redirect("/");
}
exports.insert = async function(req,res){
    const results = await model.insert(req.body);
    res.redirect("/");
}