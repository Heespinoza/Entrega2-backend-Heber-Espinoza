const express = require("express");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");
const routerV = require("./routes/views.router");
const handlebars = require("express-handlebars");
const http = require('http');
const socketIo = require("socket.io");
const socketProducts = require("../src/listener/socketProducts")




//import express from "express";
//import productsRouter from "./routes/products.js";
//import cartsRouter from "./routes/carts.js";
//import { engine } from "express-handlebars";
const app = express();
//Configuracion PORT
const PORT = 8080;

// Crear servidor HTTP y asociarlo a socket.io
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/",routerV);
//configuracion Handlebars
app.engine("handlebars", handlebars.engine());
app.set ("view engine", "handlebars" );
app.set ("views", "./src/views");



//app.listen(PORT, () => {
    //console.log(`Servidor escuchando en http://localhost:${PORT}`);
//});

// Configuración de socket.io
//const io = new Server(httpServer);

//io.on('connection', async (socket) => {
  //  console.log("Un cliente se conectó");

    // Envía los productos al conectar
    
    
    //const products = await productManager.getProducts();
    //socket.emit("productos", products);

    //socket.on("eliminarProducto", async (id) => {
    //    await productManager.deleteProduct(id);
    //    io.emit("productos", await productManager.getProducts());
    //});
//});

//Iniciar Servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en en Puerto: ${PORT}`);
});

//io.on("connection",async(socket)=>{
//    console.log("client connected con ID:", socket.id)
    
//});

socketProducts(io);
