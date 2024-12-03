const User = require("../../models/user");

const getMyRoom = async (req, res) => {
  try {
    const { username } = req.user;
    const user = await User.findOne({ username });
    const chatrooms = [];

    user.chatrooms.forEach((item) => {
      chatrooms.push({
        name: item.name,
        members: item.members,
        joinCode: item.joinCode,
      });
    });
    res.status(200).json({ chatrooms });
  } catch (error) {
    res.status(500).json({ message: "SERVER_ERROR", error });
  }
};

module.exports = getMyRoom;
