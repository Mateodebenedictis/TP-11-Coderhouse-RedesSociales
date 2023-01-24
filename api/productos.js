const ContenedorMemoria = require('../containers/ContenedorMemoria');
const {generarProducto} = require('../utils/generadorDeProductos');
const {generarId} = require('../utils/generadorDeIds');


class ApiProductosMock extends ContenedorMemoria {
    constructor(){
        super();
    }

    popular(cant = 10) {
        const lista = [];
        for (let i = 0; i < cant; i++) {
            const nuevoProducto = generarProducto(generarId());
            const prodGuardado = this.guardar(nuevoProducto)
            lista.push(prodGuardado);
        }
        return lista;
    }
}

module.exports = ApiProductosMock;

