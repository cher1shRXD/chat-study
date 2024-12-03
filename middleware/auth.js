const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "인증 토큰이 없습니다." });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id).select('-refreshToken -password -email -chatrooms');
    req.user = user;
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res.status(401).json({ message: "토큰이 만료되었습니다." });
    }
    return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
};

module.exports = auth;
