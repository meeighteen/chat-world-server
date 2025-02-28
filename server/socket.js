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
    socket.join("default");

    // Pasamos la instancia de `io` y `socket` al manejador de eventos
    handleChatEvents(io, socket);

    socket.on("disconnect", () => {
      console.log(`⚠️ Usuario desconectado: ${socket.id}`);
    });
  });
};

module.exports = { initializeSocket };
