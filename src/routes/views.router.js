const express = require("express");
const ProductManager = require("../managers/productManager.js");
const routerv = express.Router();
const productManager = new ProductManager("./src/data/products.json");

routerv.get("/", async(req, res)=>{
    const listaProductos = await productManager.getProducts();
    res.render("index",{listaProductos});
});

routerv.get("/realtimeproducts",(req,res)=>{
    res.render("realtimeproducts")
    })

module.exports = routerv;