import express from 'express';
import cors from 'cors';
import categoriaRoute from './routes/categoria.routes';
import productoRoute from './routes/producto.routes';

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
        this.app.use("/categorias",categoriaRoute);
        this.app.use("/productos", productoRoute);
    }

    start(callback: () => void) {
        this.app.listen(this.port, callback);
    }
}
export default Server;