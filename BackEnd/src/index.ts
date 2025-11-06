import express from "express";
import Server from "./app";

const server = new Server(3000);

server.start(() => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});
