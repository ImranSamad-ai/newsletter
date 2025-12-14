const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const { promisify } = require("util");

const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign(user._id);
  res.cookie("jwt", token, {
    secure: true,
    httpOnly: true,
  });
};

exports.signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  const newUser = await userModel.create({ fullName, email, password });

  const token = jwt.sign({ id: newUser._id }, "secret_to_ti_leak", {
    expiresIn: "1h", // Token expires in 1 hour
    algorithm: "HS256", // Using HMAC SHA256
  });

  res.status(200).json(token);
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password)
    res.status(401).json({ message: "password or email required" });

  const user = await userModel.findOne({ email }).select("-password");
  if (!user) {
    res.send({ status: "failed" });
  }
  const isCorrectPassword = user.comparePassword(user.password, password);

  if (!isCorrectPassword) {
    res.send("password is not correct");
  }
  const userdata = await userModel.findOne({ email }).select("-password");

  const token = jwt.sign({ userId: user._id }, "secret_to_ti_leak", {
    expiresIn: "1hr",
  });

  res.json({
    userdata,
    token,
  });
};

exports.protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (token === null) return res.send("401 eror");

    const decoded = await promisify(jwt.verify)(token, "secret_to_ti_leak");

    const freshUser = await userModel.findById(decoded.userId);

    if (!freshUser) res.status(401).json({ message: "dumb user logged out" });

    req.user = freshUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
