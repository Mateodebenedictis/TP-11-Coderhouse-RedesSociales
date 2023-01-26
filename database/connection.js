const mongoose = require('mongoose');

const mongoDbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        });
        console.log('DB is connected');
    } catch (error) {
        console.log(error.reason);
        console.log(error);
        throw new Error('Error connecting to MongoDB');
    }
};

const config = {
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port : 3307,
    user : 'root',
    password : '',
    database : 'ecommerce'
  }
}        

const knexMySql = require('knex')(config);

const configSqlite3 = {
  client: 'sqlite3',
  connection: {
    filename: './mensajes.sqlite'
  },
}

const knexSqlite3 = require('knex')(configSqlite3);

module.exports = {
  knexMySql,
  knexSqlite3,
  config,
  configSqlite3,
  mongoDbConnection
};
