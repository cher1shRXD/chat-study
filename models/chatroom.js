const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    chats: [
      {
        sender: { type: mongoose.Schema.Types.Mixed }, // Mixed 타입으로 수정
        message: { type: String, required: true },
      },
    ],
    members: [{ type: mongoose.Schema.Types.Mixed }], // Mixed 타입으로 유지
    founder: { type: mongoose.Schema.Types.Mixed }, // Mixed 타입으로 유지
    joinCode: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Chatroom = mongoose.model("Chatroom", chatroomSchema);
module.exports = Chatroom;
