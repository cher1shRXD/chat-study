const Chatroom = require("../../models/chatroom");
const User = require("../../models/user");
const io = require("../../socket");

const send = async (req, res) => {
  try {
    const userId = req.user._id;
    const { message } = req.body;
    const { joinCode } = req.params;
    const sender = await User.findById(userId);

    const targetChat = await Chatroom.findOne({ joinCode });
    if (!targetChat) {
      return res.status(404).json({ message: "ROOM_NOT_FOUND" });
    }

    const isMember = targetChat.members.some((member) => member.equals(userId));
    if (!isMember) {
      return res.status(403).json({ message: "YOU_ARE_NOT_MEMBER" });
    }

    targetChat.chats.push({ sender: userId, message });

    await targetChat.save();
    const socketio = io.getIo();

    socketio.to(joinCode).emit("newMessage", {
      sender: {
        _id: userId,
        nickname: sender.nickname,
        username: sender.username,
      },
      message,
    });

    res.status(201).json({ message: "MESSAGE_SUCCESSFULLY_SENT" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "SERVER_ERROR", error: error.message });
  }
};

module.exports = send;
