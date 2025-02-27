import express from "express";
import http from "http";
import cors from "cors";
import { initializeSocket } from "./socket";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Inicializar WebSockets con el servidor HTTP
initializeSocket(server);

const PORT = 3001;

server.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`)
);
