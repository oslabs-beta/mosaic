const authenticationController = {};

authenticationController.saveUserSession = (req, res, next) => {
  req.session.user = req.user;
  next();
  // req.session.save(err => {
  //   if(err){
  //     console.log(err);
  //   } else {
  //     next();
  //   }
  // });
};

authenticationController.logOutNClearUserSession = (req, res, next) => {
  if (req?.session && req.session?.user) {
    req.logOut();
    // delete req.session.user;
    req.session.destroy();
  }
  res.locals.user = {};
  next();
};

authenticationController.getCurrentUser = (req, res, next) => {
  if (req?.session?.user) {
    res.locals.user = req.session.user;
  } else {
    res.locals.user = {};
  }
  next();
};

export default authenticationController;