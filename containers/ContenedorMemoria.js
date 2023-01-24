class ContenedorMemoria {
    
    constructor() {
        this.elementos = [];
    }

    listar(id) {

        if (id) {

            const elem = this.elementos.find(elemento => elemento.id === id);
            if (!elem) {
                throw new Error('Error al listar: elemento no encontrado');
            }

            return elem;
        }
        return [...this.elementos];
    }

    guardar(elemento) {
        this.elementos.push(elemento);
        return elemento;
    }

    actualizar(elemento) {
        elemento.id = Number(elemento.id);
        const index = this.elementos.findIndex(elem => elem.id === elemento.id);
        if (index === -1) {
            throw new Error('Error al actualizar: elemento no encontrado');
        }
        this.elementos[index] = elemento;
        return elemento;
    }
    
    borrar(id) {
        const index = this.elementos.findIndex(elem => elem.id === id);
        if (index === -1) {
            throw new Error('Error al borrar: elemento no encontrado');
        }
        this.elementos.splice(index, 1);
    }

    borrarAll() {
        this.elementos = [];
    }

}


module.exports = ContenedorMemoria;