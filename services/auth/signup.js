const User = require("../../models/user");
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  try {
    const { username, password, email, nickname } = req.body;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ message: "USERNAME_ALREADY_IN_USE" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "EMAIL_ALREADY_IN_USE" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword, email, nickname });
    await user.save();

    res.status(201).json({ message: "USER_CREATED_SUCCESSFULLY" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "SERVER_ERROR", error });
  }
};

module.exports = signup;