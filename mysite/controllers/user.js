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
    console.log(req.body)
    if(req.body.password !== '' && req.body.name !== ''){
      await models.User.update({ 
        name: req.body.name,
        password: req.body.password,
        gender: req.body.gender
      }, {
      where: {
        no: req.body.no
      }
    });
    } else if(req.body.password == '' && req.body.name == ''){
        await models.User.update({ 
          gender: req.body.gender
        }, {
        where: {
          no: req.body.no
        }
      });
    } else if(req.body.password === ''){
        await models.User.update({ 
          name: req.body.name,
          gender: req.body.gender
        }, {
        where: {
          no: req.body.no
        }
      });
    } else if(req.body.name === ''){
        await models.User.update({ 
          password: req.body.password,
          gender: req.body.gender
        }, {
        where: {
          no: req.body.no
        }
      });
    } 
    req.session.authUser.name = req.body.name;
    res.redirect('/');
  }
};
