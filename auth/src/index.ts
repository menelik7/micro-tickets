import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error("JWT_KEY must be defined!!!");
	}

	try {
		await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
		console.log("Connected to MongoDB");
	} catch (err) {
		console.error(err);
	}

	const PORT = process.env.PORT || 3000;

	app.listen(PORT, () => {
		console.log("App listening on port", PORT);
	});
};

start();
