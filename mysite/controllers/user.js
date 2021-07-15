const models = require("../models"); // /models/index.js
const logger = require('../logging');

module.exports = {
  joinsuccess: (req, res) => res.render("user/joinsuccess"),
  join: (req, res) => res.render("user/join"),
  _join: async (req, res,next) => {
    try{
      const result = await models.User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
      });
      res.redirect("/user/joinsuccess");
    } catch(err){
      logger.error(err.stack);
      next(err);
    }
    
  },
  login: (req, res) => res.render("user/login"),
  _login: async (req, res, next) => {
    try{
      const user = await models.User.findOne({
        attributes: ["no", "name", "email","gender","role"],
        where: {
          email: req.body.email,
          password: req.body.password,
        },
      });
      if (user == null) {
        res.render(
          "user/login",
          Object.assign(req.body, {
            result: "fail",
            password: ''
          })
        );
        return ;
      }
      req.session.authUser = user;
      res.redirect("/");
    } catch(err){
      logger.error(err.stack);
      next(err);
    }

    
  },
  logout: async (req,res) => { await req.session.destroy(); res.redirect("/") },
  update: (req,res) => res.render('user/update'),
  _update: async (req,res,next) => {
    try{
      // const updateObject = Object.assign(req.body);
      // if(req.body['password'] == ''){
      //   delete updateObject['password'];
      // }
      // if(req.body['name'] == ''){
      //   delete updateObject['name'];
      // }

      // req.body.name == ''? 'name': ''
      const{[req.body.password == ''? 'password': '']:remove, [req.body.name == ''? 'name': '']:remove_, ...updateObject} = req.body;

      await models.User.update(updateObject, {
        where: {
          no: req.body.no
        }
      });

      if(req.body.name != ""){
        req.session.authUser.name = req.body.name;
      }
      res.redirect('/');
    } catch(err){
      logger.error(err.stack);
      next(err);
    }
  }
};
