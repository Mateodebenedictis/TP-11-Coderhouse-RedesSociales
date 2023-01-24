const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const { Server: SocketServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const { normalize, schema } = require('normalizr');
const {config, configSqlite3} = require('./database/connection');
const createTables = require('./database/createTables');
const productosRouter = require('./router/productos');

const ContenedorArchivo = require('./containers/ContenedorArchivo');
const ContenedorSQL = require('./containers/ContenedorSQL');

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: 'coderhouse',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: 'mongodb+srv://testCoder:testcoder@coderhouse.zwimx1t.mongodb.net/?retryWrites=true&w=majority',
        ttl: 600
    })
}));

app.get('/', (req, res) => {
    //Verifico si existe el username en la session
    console.log('/ route: ', req.session.username)
    if (!req.session.username) {
        res.sendFile(__dirname + '/public/login.html');
    } else {
        res.sendFile(__dirname + '/public/index.html');
    }
})

app.post('/login', (req, res) => {
    //Guardo el username en la session
    req.session.username = req.body.username;
    console.log('Login: ', req.session.username)
    res.redirect('/');
})

app.post('/logout', (req, res) => {

    req.session.destroy((err) => {
        if (!err) {res.redirect('/');}
        else {res.send({ status: "Logout ERROR", body: err });}
    });
    
});

app.get("/info", (req, res) => {
    console.log("------------ req.session -------------");
    console.log(req.session);
    console.log("--------------------------------------");
  
    console.log("----------- req.sessionID ------------");
    console.log(req.sessionID);
    console.log("--------------------------------------");
  
    console.log("----------- req.cookies ------------");
    console.log(req.cookies);
    console.log("--------------------------------------");
  
    console.log("---------- req.sessionStore ----------");
    console.log(req.sessionStore);
    console.log("--------------------------------------");
  
    res.send("Send info ok!");
  });


app.use(express.static('public'));
app.use('/api', productosRouter);


//crea las tablas correspondientes y si existen las elimina y las vuelve a crear
createTables();

const contenedorProductos = new ContenedorSQL(config, 'productos');

const contenedorMensajes = new ContenedorArchivo('mensajes.txt')


//Defining the schemas for normalizr for the messages

const author = new schema.Entity('author', {}, { idAttribute: 'id' });

const message = new schema.Entity('message', {
    author: author
}, { idAttribute: 'id' });

const normalizedMessages = async () => {
    //Obtengo los mensajes y los normalizo
    let mensajes = await contenedorMensajes.getAll();
    return normalize(mensajes, [message]);
}


io.on('connection', async (socket) => {

    console.log('socket id: ', socket.id);

    socket.emit('conversation', await normalizedMessages());
    socket.emit('productos', await contenedorProductos.getAll());
    
    socket.on('new-message', async (message) => {
        
        console.log('nuevo mensaje');
        await contenedorMensajes.save(message);
        io.sockets.emit('conversation', await normalizedMessages());
    });

    socket.on('new-producto', async (producto) => {
        console.log('nuevo producto');
        await contenedorProductos.save(producto);
        io.sockets.emit('productos', await contenedorProductos.getAll());
    });

});


const port = 8080;

const connectedServer = httpServer.listen(port, () => {
  console.log(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`));



