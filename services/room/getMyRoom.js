const User = require("../../models/user");

const getMyRoom = async (req, res) => {
  try {
    const { username } = req.user;

    const user = await User.findOne({ username }).populate("chatrooms");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const chatrooms = user.chatrooms.map((room) => ({
      name: room.name,
      members: room.members,
      joinCode: room.joinCode,
      createdAt: room.createdAt,
    }));

    res.status(200).json({ chatrooms });
  } catch (error) {
    res.status(500).json({ message: "SERVER_ERROR", error: error.message });
  }
};

module.exports = getMyRoom;
