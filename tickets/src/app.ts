import express from "express";
import "express-async-errors"; // Handling errors in an async function
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@mwttickets/common";

import { createTicketRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== "test", // Share only if it is a secure request (i.e. https) when not in test mode.
	})
);

app.use(currentUser);

app.use(createTicketRouter);

app.all("*", async () => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
