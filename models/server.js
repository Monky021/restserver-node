
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.pathUsers= '/api/users';
        //Conectar base de datos
        this.connectionDB();
        //Middlewares
        this.middlewares();
        
        //Rutas de mi servidor
        this.routes();
        
    }
    async connectionDB(){
        await dbConnection();
    }

    middlewares(){
        //Cors
        this.app.use(cors());
        //Parceo del body 
        this.app.use( express.json() );
        //Directorio publico
        this.app.use(express.static('public'));
        
    }



    routes(){
       this.app.use(this.pathUsers, require('../routes/user.routes'))
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Rest Server esta corriendo en el http://localhost:${this.port}`)
        })
    }
}


module.exports = Server;