const socketC = io();
socketC.on("enviodeproducts",(obj)=>{
    updateProductList(obj)
})

function updateProductList(productList) {
 
    const productsDiv  = document.getElementById('list-products')

    let productosHTML = "";
  
    productList.forEach((product) => {
        productosHTML += `<div class="card bg-secondary mb-3 mx-4 my-4" style="max-width: 20rem;">
        <div class="card-header bg-primary text-white">code: ${product.code}</div>
        <div class="card-body">
            <h4 class="card-title text-white">${product.title}</h4>
            <p class="card-text">
            <ul class="card-text">
            <li>id: ${product.id}</li>
            <li>description: ${product.description}</li>
            <li>price: $${product.price}</li>
            <li>category: ${product.category}</li>
            <li>status: ${product.status}</li>
            <li>stock: ${product.stock}</li>
            thumbnail: <img src="${product.thumbnails}" alt="img" class="img-thumbnail img-fluid">        </ul>
            </p>
            </div>
            <div class="d-flex justify-content-center mb-4">
            <button type="button" class="btn btn-danger delete-btn" onclick="deleteProduct(${product.id})">Eliminar</button>
            </div>
        
    </div>
</div>`;
    });
  
    productsDiv .innerHTML = productosHTML;
  }


  let form = document.getElementById("formProduct");
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
  
    let title = form.elements.title.value;
    let description = form.elements.description.value;
    let stock = form.elements.stock.value;
    let thumbnails = form.elements.thumbnails.value;
    let category = form.elements.category.value;
    let price = form.elements.price.value;
    let code = form.elements.code.value;
    let status = form.elements.status.checked; 
  
    socketC.emit("addProduct", {
      title,
      description,
      stock,
      thumbnails,
      category,
      price,
      code,
      status, // Agrega el campo status al objeto enviado al servidor
  
    });
  
    form.reset();
  });

  //Eliminar Producto Card
  function deleteProduct(productId) {
    socketC.emit("deleteProduct", productId);
  }