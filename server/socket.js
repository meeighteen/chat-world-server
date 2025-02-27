import { Server } from "socket.io";
import { handleChatEvents } from "./chatHandlers";

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" }, // Permitir cualquier origen (configurable)
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
