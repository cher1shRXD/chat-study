const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    nickname: { type: String, required: true },
    password: { type: String, required: true },
    refreshToken: String,
    chatrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chatroom" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
