import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
	var signup: () => string[];
}

let mongo: any;

beforeAll(async () => {
	// Without the following, the tests will fail
	process.env.JWT_KEY = "asdf";

	mongo = await MongoMemoryServer.create();
	const mongoUri = mongo.getUri();

	await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	if (mongo) {
		await mongo.stop();
	}
	await mongoose.connection.close();
});

global.signup = () => {
	// Build a JWT payload { id, email }
	const payload = {
		id: "adadkj388998",
		email: "test@test.com",
	};

	// Create a JWT
	const token = jwt.sign(payload, process.env.JWT_KEY!);

	// Build a session object { jat: MY_JWT}
	const session = { jwt: token };

	// Turn that into a session
	const sessionJSON = JSON.stringify(session);

	// Take JSON encode it as base64
	const base64 = Buffer.from(sessionJSON).toString("base64");

	// Return a string of the cookie with the encoded data
	return [`session=${base64}`];
};