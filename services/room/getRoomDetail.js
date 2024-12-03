const Chatroom = require("../../models/chatroom");

const getRoomDetail = async (req, res) => {
  try {
    const { joinCode } = req.params;
    const { username } = req.user;
    const room = await Chatroom.findOne({ joinCode });

    const isMember =
      room.members.findIndex((item) => item.username == username) >= 0;

    if (!isMember) {
      return res.status(403).json({ message: "YOU_ARE_NOT_MEMBER" });
    }

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "SERVER_ERROR", error });
  }
};

module.exports = getRoomDetail;