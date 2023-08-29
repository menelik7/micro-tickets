import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

// This class/file will not be imported into any other file.  Instead, every time we throw an error, express
// will be able to pick it up with this error handler...

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof CustomError) {
		return res.status(err.statusCode).send({ errors: err.serializeErrors() });
	}

	res.status(400).send({ errors: [{ message: "Something went wrong." }] });
};
