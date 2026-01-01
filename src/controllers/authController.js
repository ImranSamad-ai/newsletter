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
  try {
    const { fullName, email, password } = req.body;
    const newUser = await userModel.create({ fullName, email, password });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
      algorithm: "HS256", // Using HMAC SHA256
    });

    res.json({ statusCode: 200, token });
  } catch (error) {
    res.send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password)
      res
        .status(401)
        .json({ statusCode: 401, message: "password or email required" });

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "user not found" });
    }
    const isCorrectPassword = user.comparePassword(user.password, password);

    if (!isCorrectPassword) {
      res
        .status(401)
        .json({ statusCode: 401, message: "password is not correct" });
    }
    const userdata = await userModel.findOne({ email }).select("-password");

    const token = jwt.sign({ userId: user._id }, "juytreueiejsijiodjdsmld", {
      expiresIn: "2hr",
    });

    res.json({
      userdata,
      token,
    });
  } catch (error) {
    res.send(error);
  }
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

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const freshUser = await userModel.findById(decoded.userId);

    if (!freshUser) res.status(401).json({ message: "dumb user logged out" });

    req.user = freshUser;
    next();
  } catch (error) {
    return res.json({ message: error });
  }
};
