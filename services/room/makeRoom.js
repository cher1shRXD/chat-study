const Chatroom = require("../../models/chatroom");
const crypto = require("crypto");
const User = require("../../models/user");

const makeRoom = async (req, res) => {
  try {
    const { name } = req.body;
    const user = req.user;
    const founder = await User.findOne({ username: user.username });

    const timestamp = Date.now().toString(36);
    const userHash = crypto
      .createHash("sha256")
      .update(user.id || user._id || "")
      .digest("hex")
      .slice(0, 4);
    const joinCode = (timestamp + userHash).slice(0, 6).toUpperCase();

    const chatRoom = new Chatroom({
      name,
      joinCode,
      founder: user,
      members: [user],
      chats: [],
    });
    console.log(chatRoom);

    founder.chatrooms.push(chatRoom);
    console.log(founder);

    await chatRoom.save();
    await founder.save();

    res.status(201).json({ joinCode });
  } catch (error) {
    console.error("Error creating chat room:", error);
    res.status(500).json({ message: "SERVER_ERROR", error });
  }
};

module.exports = makeRoom;
