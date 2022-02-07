const express =  require("express");
const cors = require("cors");  
const fileUpload = require("express-fileupload");

class Server{
    constructor(){ 
        this.app =  express();
        this.port = process.env.PORT  || 5000;

        //path rutas
        this.paths = {
            authPath:'/auth/login', 
            userPath: '/auth/register', 
            characterPath:'/characters',
            genrePath:'/genres',
            moviePath: '/movies'
        } 
        
        //Middlewares
        this.middlewares();
        //rutas
        this.routes();
    }

    middlewares(){
        //cors
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json()); 
        //file upload - cargar archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    //método de controla las rutas
    routes(){
        this.app.use(this.paths.authPath, require('../routes/authRoute')); 
        this.app.use(this.paths.userPath, require('../routes/userRoute'));
        this.app.use(this.paths.characterPath, require('../routes/characterRoute'));
        this.app.use(this.paths.genrePath, require('../routes/genreRoute'));
        this.app.use(this.paths.moviePath, require('../routes/movieRoute'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("The application is running on the port",this.port);
        })
    } 

}

module.exports = Server;