let rooms = {}; // Almacena las salas activas

const handleChatEvents = (io, socket) => {
  // Unirse a una sala específica
  socket.on("joinRoom", ({ user, room }) => {
    socket.join(room);
    console.log(`${user} se unió a la sala: ${room}`);

    if (!rooms[room]) {
      rooms[room] = [];
    }
    rooms[room].push(user);

    io.to(room).emit("roomUsers", rooms[room]); // Enviar la lista de usuarios en la sala
    socket
      .to(room)
      .emit("message", { user: user, text: `${user} se unió al chat` });
  });

  // Enviar un mensaje a la sala
  socket.on("sendMessage", ({ room, user, text }) => {
    console.log("message", { user, text, room });
    io.to(room).emit("message", { user, text });
  });

  // Salir de la sala
  socket.on("leaveRoom", ({ user, room }) => {
    socket.leave(room);
    rooms[room] = rooms[room].filter((u) => u !== user);
    io.to(room).emit("roomUsers", rooms[room]);
    // socket
    //   .to(room)
    //   .emit("message", { user: "admin", text: `${user} salió del chat` });
  });
};

module.exports = { handleChatEvents };
