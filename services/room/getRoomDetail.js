const Chatroom = require("../../models/chatroom");

const getRoomDetail = async (req, res) => {
  try {
    const { joinCode } = req.params;
    const userId = req.user._id;

    const room = await Chatroom.findOne({ joinCode })
      .populate("members", "username nickname")
      .populate({
        path: "chats.sender",
        select: "username nickname",
      });

    if (!room) {
      return res.status(404).json({ message: "CHATROOM_NOT_FOUND" });
    }

    const isMember = room.members.some((member) => member._id.equals(userId));
    if (!isMember) {
      return res.status(403).json({ message: "YOU_ARE_NOT_MEMBER" });
    }

    res.status(200).json({
      name: room.name,
      joinCode: room.joinCode,
      founder: room.founder,
      members: room.members.map((member) => ({
        id: member._id,
        username: member.username,
        nickname: member.nickname,
      })),
      chats: room.chats.map((chat) => ({
        sender: {
          id: chat.sender._id,
          username: chat.sender.username,
          nickname: chat.sender.nickname,
        },
        message: chat.message,
      })),
      createdAt: room.createdAt,
    });
  } catch (error) {
    console.error("Error getting room detail:", error);
    res.status(500).json({ message: "SERVER_ERROR", error: error.message });
  }
};

module.exports = getRoomDetail;
