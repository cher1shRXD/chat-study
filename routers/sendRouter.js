const express = require('express');
const auth = require('../middleware/auth');
const send = require('../services/send/send');
const sendRouter = express.Router();

sendRouter.post('/:joinCode', auth, send);

module.exports = sendRouter;

