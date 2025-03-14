const ProductManager = require("../managers/productManager.js");
const pm = new ProductManager("./src/data/products.json");

const socketProducts = (socketServer) => {
    socketServer.on("connection",async(socket)=>{
        console.log("client connected con ID:",socket.id)
        const listadeproductos=await pm.getProducts()

        socketServer.emit("enviodeproducts",listadeproductos)

        socket.on("addProduct",async(obj)=>{
            await pm.addProduct(obj)
            const listadeproductos=await pm.getProducts()
            socketServer.emit("enviodeproducts",listadeproductos)
            })
        socket.on("deleteProduct",async(id)=>{
            
            await pm.deleteProduct(id)
            const listadeproductos=await pm.getProducts()
            socketServer.emit("enviodeproducts",listadeproductos)
            })    

            
        
    })
};

module.exports = socketProducts;