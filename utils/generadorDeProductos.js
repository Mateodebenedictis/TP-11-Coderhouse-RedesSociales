const { faker } = require('@faker-js/faker');

faker.locale = 'es';

function generarProducto(id){
    return {
        id,
        nombre: faker.commerce.productName(),
        precio: faker.commerce.price(),
        foto: faker.image.image()
    };

}

module.exports = { generarProducto };
