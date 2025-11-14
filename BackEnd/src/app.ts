import express from 'express';
import cors from 'cors';
import categoriaRoute from './routes/categoria.routes';
import productoRoute from './routes/producto.routes';
import authRoute from './auth/auth.routes';

class Server {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.middlewares();
        this.routes();
        
    }

    middlewares(){
        this.app.use(express.json({limit: '150mb'}));
        //Cors
        this.app.use( cors());
    }

    routes(){
        this.app.use("/api/categorias",categoriaRoute);
        this.app.use("/api/productos", productoRoute);
        this.app.use("/api/auth", authRoute);
    }

    start(callback: () => void) {
        this.app.listen(this.port, callback);
    }
}
export default Server;