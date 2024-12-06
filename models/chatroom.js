const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    chats: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        message: { type: String, required: true },
      },
    ],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    founder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    joinCode: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Chatroom = mongoose.model("Chatroom", chatroomSchema);
module.exports = Chatroom;
