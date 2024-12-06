const Chatroom = require("../../models/chatroom");
const User = require("../../models/user");

const joinRoom = async (req, res) => {
  try {
    const { joinCode } = req.body;
    const userId = req.user._id; // 사용자 ID

    // joinCode로 채팅방 찾기
    const targetRoom = await Chatroom.findOne({ joinCode });
    if (!targetRoom) {
      return res.status(404).json({ message: "CHATROOM_NOT_FOUND" });
    }

    // 이미 참가한 사용자인지 확인
    const isAlreadyJoined = targetRoom.members.some((member) =>
      member.equals(userId)
    );
    if (isAlreadyJoined) {
      return res.status(409).json({ message: "ALREADY_JOINED" });
    }

    // 사용자를 members 배열에 추가
    targetRoom.members.push(userId);

    // 채팅방 저장
    await targetRoom.save();

    // 사용자에게 채팅방 추가
    const user = await User.findById(userId);
    if (!user.chatrooms.includes(targetRoom._id)) {
      user.chatrooms.push(targetRoom._id);
      await user.save();
    }

    res.status(200).json({ message: "SUCCESSFULLY_JOINED" });
  } catch (error) {
    console.error("Error joining room:", error);
    res.status(500).json({ message: "SERVER_ERROR", error });
  }
};

module.exports = joinRoom;
