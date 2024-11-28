const express = require("express");
const cors = require("cors");

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