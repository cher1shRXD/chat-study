const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routers/authRouter");
const roomRouter = require("./routers/roomRouter");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const corsOption = {
  origin: ["http://localhost:5173"],
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

