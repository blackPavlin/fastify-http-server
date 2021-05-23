import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

export const connect = async (): Promise<void> => {
	const databaseURI = await mongod.getUri();

	await mongoose.connect(databaseURI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	});
};

export const closeDatabase = async (): Promise<void> => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
	await mongod.stop();
};

export const clearDatabase = async (): Promise<void> => {
	const collections = mongoose.connection.collections;

	for (const key in collections) {
		const collection = collections[key];
		await collection.deleteMany({});
	}
};
