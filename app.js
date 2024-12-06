const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const authRouter = require("./routers/authRouter");
const roomRouter = require("./routers/roomRouter");
const sendRouter = require("./routers/sendRouter");
const socket = require("./socket");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const corsOption = {
  origin: ["http://localhost:5173", "http://10.80.163.21:5173", 'https://chat.cher1shrxd.me'],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();
app.use(cors(corsOption));
app.use(express.json());

const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/?retryWrites=true&w=majority&appName=${process.env.MONGO_APP_NAME}`;
mongoose
  .connect(url)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

app.use("/auth", authRouter);
app.use("/room", roomRouter);
app.use("/send", sendRouter);

const server = http.createServer(app);

const io = socket.init(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
