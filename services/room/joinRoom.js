const Chatroom = require("../../models/chatroom");
const User = require("../../models/user");

const joinRoom = async (req, res) => {
  try {
    const { joinCode } = req.body;
    const user = req.user;
    const joiner = await User.findOne({ username: user.username });

    const targetRoom = await Chatroom.findOne({ joinCode });
    if (!targetRoom) {
      return res.status(404).json({ message: "CHATROOM_NOT_FOUND" });
    }

    const isAlreadyJoined = targetRoom.members.some(
      (member) => member.username === user.username
    );

    if (isAlreadyJoined) {
      return res.status(409).json({ message: "ALREADY_JOINED" });
    }

    targetRoom.members.push(user);
    joiner.chatrooms.push(targetRoom);

    await targetRoom.save();
    await joiner.save();

    res.status(200).json({ message: "SUCCESSFULLY_JOINED" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "SERVER_ERROR", error });
  }
};

module.exports = joinRoom;
