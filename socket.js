let io;

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: ["http://localhost:5173", "http://10.80.163.21:5173"],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
      },
    });
    return io;
  },
  getIo: () => {
    if (!io) {
      throw new Error("Socket.io is not initialized!");
    }
    return io;
  },
};
