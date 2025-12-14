const jwt = require("jsonwebtoken");

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.send("You cannot accesss to this resource");
    }
    next();
  };
};
