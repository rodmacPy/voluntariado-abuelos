const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')

const dbConnection = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            abuelos: '/api/abuelos',
            categorias: '/api/categorias',
            buscar: '/api/buscar',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads',
        }

        // Conectar a base de datos
        this.conectarDB()
        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }
    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        //Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));

        // Directorio Público
        // this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.paths.abuelos,          require('../routes/abuelos'));
        this.app.use( this.paths.categorias,          require('../routes/categorias'));
        this.app.use( this.paths.auth,          require('../routes/auth'));
        this.app.use( this.paths.usuarios,      require('../routes/usuarios'));
        this.app.use( this.paths.uploads,      require('../routes/uploads'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
