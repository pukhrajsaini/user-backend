import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import * as express from 'express';
import * as cors from 'cors';
import db from './db';
import routes from './routes/routes';
import * as path from 'path';

export class Server {
    public app: express.Application = express();

    constructor() {
        console.log('environment', process.env.NODE_ENV);
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }

    setConfigurations() {
        this.setMongodb();
        this.enableCors();
        this.configBodyParser();
    }
    setMongodb() {
        db.connectDb();
    }

    enableCors() {
        this.app.use(
            cors({
                origin: true,
                credentials: true
            })
        );
    }

    configBodyParser() {
        this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
        this.app.use(express.json({ limit: '10mb' }));
    }

    setRoutes() {
        this.app.use('/uploads', express.static(path.resolve(process.cwd() + '/uploads')))
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.log(`Api ==> ${req.url}  ${req.method}`);
            console.log('request-body', req.body);
            next();
        });

        this.app.use('/api', routes)
    }

    error404Handler() {
        this.app.use((req: express.Request, res: express.Response) => {
            res.status(404).json({
                message: 'Route not found',
                status: 404
            });
        })
    }

    handleErrors() {
        this.app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
           console.log('Error', error);
            return  res.status(500).json({ status: 500, message: 'something went wrong' })
        });
    }
}