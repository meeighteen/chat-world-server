import { Server } from "socket.io";
import { handleChatEvents } from "./chatHandlers";

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    path: "/socket",
    cors: {
      origin: "*",
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: {
        "Access-Control-Allow-Origin": "*",
        allowedHeaders: ["Authorization", "Content-Type"],
      },
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket) => {
    console.log(`🔗 Usuario conectado: ${socket.id}`);
    // socket.join("default");

    // Pasamos la instancia de `io` y `socket` al manejador de eventos
    handleChatEvents(io, socket);

    socket.on("disconnecting", () => {
      console.log(`Salas a las que pertenecía ${socket.id}:`, socket.rooms);
      const user = socket.data.user;
      socket.rooms.forEach((room) => {
        if (room !== socket.id && room !== "default") {
          console.log(`El usuario ${user} se desconectó abruptamente de la sala: ${room}`);

          socket.to(room).emit("message", { 
            user: "Sistema", 
            text: `${user} se ha desconectado`, 
            isNew: true, 
            room 
          });
        }
      })
    });
  });
};

module.exports = { initializeSocket };
