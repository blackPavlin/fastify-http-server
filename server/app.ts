import mongoose from 'mongoose';
import server from './server';

void async function (): Promise<void> {
    try {
        await mongoose.connect(<string>process.env.MONGO_URL, {
            useUnifiedTopology: true, 
            useNewUrlParser: true,
            useCreateIndex: true,
        });

        await server.listen(3000);
    } catch(error) {
        console.log(error);
    }
}();
