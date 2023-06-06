import mongoose from 'mongoose';
import { env } from './environment/env';


class Db {
    async connectDb(): Promise<void> {
        try {
            
            await mongoose.connect(env().dbUrl);
            console.log('Database connected');
        } catch (error) {
            console.log(error, 'Error to connecting database');
        }
    }
}

export default new Db();
