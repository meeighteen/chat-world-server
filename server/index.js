import express from "express";
import http from "http";
import cors from "cors";
import { initializeSocket } from "./socket";

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "*" }));
app.use(express.json());

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

// Inicializar WebSockets con el servidor HTTP
initializeSocket(server);

server.listen(process.env.PORT || 3001, () =>
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`)
);
