import express from "express";
import dotenv from "dotenv";
import Server from "./app";

dotenv.config();

const server = new Server(3000);

server.start(() => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});
