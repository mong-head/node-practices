const models = require("../models"); // /models/index.js

module.exports = {
  joinsuccess: (req, res) => res.render("user/joinsuccess"),
  join: (req, res) => res.render("user/join"),
  _join: async (req, res) => {
    const result = await models.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
    });
    res.redirect("/user/joinsuccess");
  },
  login: (req, res) => res.render("user/login"),
  _login: async (req, res) => {
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
  },
  logout: async (req,res) => { await req.session.destroy(); res.redirect("/") },
  update: (req,res) => res.render('user/update'),
  _update: async (req,res) => {

    const updateObject = Object.assign(req.body);
    if(req.body['password'] == ''){
      delete updateObject['password'];
    }
    if(req.body['name'] == ''){
      delete updateObject['name'];
    }

    //const{[req.body.password == ''? 'password': '', req.body.name == ''? 'name': '']:remove, ...updateObject} = req.body;

    console.log(updateObject);
    await models.User.update(updateObject, {
      where: {
        no: req.body.no
      }
    });

    if(req.body.name !== ""){
      req.session.authUser.name = req.body.name;
    }
    console.log( req.session.authUser.name);
    //req.body.name == "" ?  req.body.name = req.session.authUser.name : req.session.authUser.name = req.body.name;
    res.redirect('/');
  }
};
