const express = require("express");
const auth = require("../middleware/auth");
const makeRoom = require("../services/room/makeRoom");
const joinRooom = require("../services/room/joinRoom");
const getMyRoom = require("../services/room/getMyRoom");
const getRoomDetail = require("../services/room/getRoomDetail");
const roomRouter = express.Router();

roomRouter.post("/make", auth, makeRoom);
roomRouter.post('/join', auth, joinRooom);
roomRouter.get('/my', auth, getMyRoom);
roomRouter.get('/my/:joinCode', auth, getRoomDetail);

module.exports = roomRouter;
