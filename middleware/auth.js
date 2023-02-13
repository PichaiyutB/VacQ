const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      sucess: false,
      message: "Not authorization to access this route",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    req.user = await User.findById(decode.id);
    next();
  } catch (err) {
    console.log(err.stack);
    return res.status(401).json({
      sucess: false,
      message: "Not authorization to access this route",
    });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        sucess: false,
        message: `User role ${req.user.role} is not authorizied to access this route`,
      });
    }
    next();
  };
};
