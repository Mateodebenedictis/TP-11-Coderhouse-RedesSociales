const fs = require('fs');

/*
class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.id = 0;
    }

    createFile(){
        fs.writeFileSync(this.nombreArchivo, '');
    }

    checkIfFileExists(){
        if (!fs.existsSync(this.nombreArchivo)) {
            this.createFile();
        }
    }

    getLastId(){
        let array = this.getAll();
        if (array.length === 0) {
            return 0;
        }
        let lastId = array[array.length - 1].id;
        return lastId;
    }
    
    save(objeto) {
        let array = this.getAll();
        this.id = this.getLastId() + 1;
        objeto.id = this.id;
        array.push(objeto);
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(array, null, 2));
        return this.id;
    }

    getById(id) {
        let array = this.getAll();
        let objeto = array.find(objeto => objeto.id === id);
        return objeto;
    }

    updateById(id, objeto) {
        try {
            let array = this.getAll();
            let objetoActualizado = array.find(objeto => objeto.id === id);
            let indice = array.indexOf(objetoActualizado);
            objeto.id = id;
            array[indice] = objeto;
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(array, null, 2));
        }
        catch (error) {
            console.log(error);
            console.log('No se pudo actualizar el objeto con ese ID');
        }
    }

    getAll() {
        let array = fs.readFileSync(this.nombreArchivo, 'utf-8');
        if (array.length === 0) {
            return [];
        } else {
            return JSON.parse(array);
        }
    }

    deleteById(id) {
        let array = this.getAll();
        let objeto = array.find(objeto => objeto.id === id);
        let indice = array.indexOf(objeto);
        array.splice(indice, 1);
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(array, null, 2));
    }
    
    deleteAll() {
        fs.writeFileSync(this.nombreArchivo, '');
    }
}
**/

//La misma clase pero con async/await y promesas

class ContenedorArchivo {

    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.id = 0;
    }

    async createFile() {
        await fs.promises.writeFile(this.nombreArchivo, '');
    }

    async checkIfFileExists() {
        if (!fs.existsSync(this.nombreArchivo)) {
            await this.createFile();
        }
    }

    async getLastId() {
        let array = await this.getAll();
        if (array.length === 0) {
            return 0;
        }
        let lastId = array[array.length - 1].id;
        return lastId;
    }

    async save(objeto) {
        let array = await this.getAll();
        this.id = await this.getLastId() + 1;
        objeto.id = this.id;
        array.push(objeto);
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(array, null, 2));
        return this.id;
    }

    async getById(id) {
        let array = await this.getAll();
        let objeto = array.find(objeto => objeto.id === id);
        return objeto;
    }

    async updateById(id, objeto) {
        try {
            let array = await this.getAll();
            let objetoActualizado = array.find(objeto => objeto.id === id);
            let indice = array.indexOf(objetoActualizado);
            objeto.id = id;
            array[indice] = objeto;
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(array, null, 2));
        }
        catch (error) {
            console.log(error);
            console.log('No se pudo actualizar el objeto con ese ID');
        }
    }

    async getAll() {
        let array = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
        if (array.length === 0) {
            return [];
        } else {
            return JSON.parse(array);
        }
    }

    async deleteById(id) {
        let array = await this.getAll();
        let objeto = array.find(objeto => objeto.id === id);
        let indice = array.indexOf(objeto);
        array.splice(indice, 1);
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(array, null, 2));
    }

    async deleteAll() {
        await fs.promises.writeFile(this.nombreArchivo, '');
    }
}


module.exports = ContenedorArchivo;
