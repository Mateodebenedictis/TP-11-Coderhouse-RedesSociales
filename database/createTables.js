const {knexMySql, knexSqlite3} = require('./connection');

const createTables = () => {

  knexMySql.schema.hasTable('productos').then((exists) => {
    if (!exists) {

      knexMySql.schema.createTable('productos', (table) => {
        table.increments('id').primary()
        table.string('title', 50).notNullable()
        table.string('thumbnail')
        table.float('price')
      })
      .then(() => console.log('TABLE productos created'))
      .catch((error) => console.log('TABLE productos error: ', error))
      .finally(() => knexMySql.destroy());
    }
  })
  .catch((error) => console.log('TABLE productos error: ', error))
  .finally(() => knexMySql.destroy());

  
  knexSqlite3.schema.hasTable('mensajes').then((exists) => {

    if (!exists) {

      knexSqlite3.schema.createTable('mensajes', (table) => {
        table.increments('id').primary()
        table.string('email').notNullable()
        table.string('date').notNullable()
        table.string('text').notNullable()
      })
      .then(() => console.log('TABLE mensajes created'))
      .catch((error) => console.log('TABLE mensajes error: ', error))
    }

  })
  .catch((error) => console.log('TABLE mensajes error: ', error))

}

createTables();

module.exports = createTables;