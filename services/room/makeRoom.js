const Chatroom = require("../../models/chatroom");
const crypto = require("crypto");
const User = require("../../models/user");

const makeRoom = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user._id;

    const timestamp = Date.now().toString(36);
    const userHash = crypto
      .createHash("sha256")
      .update(userId.toString())
      .digest("hex")
      .slice(0, 4);
    const joinCode = (timestamp + userHash).slice(0, 6).toUpperCase();

    const chatRoom = new Chatroom({
      name,
      joinCode,
      founder: userId,
      members: [userId],
      chats: [],
    });

    await chatRoom.save();

    const user = await User.findById(userId);
    if (!user.chatrooms.includes(chatRoom._id)) {
      user.chatrooms.push(chatRoom._id);
      await user.save();
    }

    res.status(201).json({ joinCode });
  } catch (error) {
    console.error("Error creating chat room:", error);
    res.status(500).json({ message: "SERVER_ERROR", error });
  }
};

module.exports = makeRoom;
