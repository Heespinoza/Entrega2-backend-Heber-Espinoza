const express = require("express");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");
const handlebars = require("express-handlebars");

//import express from "express";
//import productsRouter from "./routes/products.js";
//import cartsRouter from "./routes/carts.js";
//import { engine } from "express-handlebars";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//configuracion Handlebars


app.engine("handlebars", handlebars.engine());
app.set ("view engine", "handlebars" );
app.set ("views", "./src/views");
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
