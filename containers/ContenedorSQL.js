const { default: knex } = require("knex");


class ContenedorSQL {
    constructor(config, table) {
        this.database = knex(config);
        this.table = table;
    }


    async save(objeto) {

        try {
            let id = await this.database(this.table).insert(objeto);
            return id[0];
            
        } catch (error) {
            console.log('error: ', error);
        }

    }

    async getAll() { 

        let array = [];

        try {

            let resultQueryBuilder  = await this.database(this.table).select('*');
            
            resultQueryBuilder.forEach((result) => {
                let object = {}

                if(this.table == 'productos') {

                    object.id = result.id;
                    object.title = result.title;
                    object.thumbnail = result.thumbnail;
                    object.price = result.price;
                    
                } else if(this.table == 'mensajes') {

                    object.id = result.id;
                    object.email = result.email;
                    object.date = result.date;
                    object.text = result.text;
                }

                array.push(object);

            });

            return array;

        } catch (error) {
            console.log(error);
        }
    }
    
}

module.exports = ContenedorSQL;