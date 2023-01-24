//Hacer un llamado a la ruta 'http://localhost:8080/api/productos-test' y mostrar los productos en una tabla HTML usando fetch

async function getProducts(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

(async () => {

    const url = "http://localhost:8080/api/productos-test";
    const products = await getProducts(url);
    console.log(products);
    const productosHtml = products.map(product => {
        return `<tr>
        <td>${product.nombre}</td>
        <td>$${product.precio}</td>
        <td class="w-25">
        <img src=${product.foto} class="foto" alt=${product.nombre} >
        </td>
        </tr>`
    }).join(' ');

    document.getElementById('tablaProductos').innerHTML = productosHtml;
})();





