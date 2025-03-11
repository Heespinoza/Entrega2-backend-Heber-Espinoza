const express = require("express");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");
const routerV = require("./routes/views.router");
const handlebars = require("express-handlebars");
const http = require('http');
const socketIo = require("socket.io");
const socketProducts = require("../src/listener/socketProducts")

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


//Iniciar Servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en en Puerto: ${PORT}`);
});


socketProducts(io);
