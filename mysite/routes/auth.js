module.exports = (role) => {
  return (req, res, next) => {
	if (req.session.authUser && (role !== "ADMIN" || req.session.authUser.role === "ADMIN")) {
		next(); //controller.update등으로 가야함
		return;
	  }

    // not api
    if (req.accepts("html")) {
      res.redirect("/user/login");
      return;
    }

    // json req
    res.send({
      result: "fail",
      data: null,
      message: "auth failed",
    });
  };
};
