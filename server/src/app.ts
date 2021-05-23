import mongoose from 'mongoose';
import server from './server';

void (async function (): Promise<void> {
	try {
		await server.ready();

		await mongoose.connect(server.config.MONGO_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		});

		await server.listen(server.config.PORT);
	} catch (error) {
		console.log(error);
	}
})();
