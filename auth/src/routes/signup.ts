import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post(
	"/api/users/signup",
	[
		body("username")
			.trim()
			.isLength({ min: 3, max: 12 })
			.withMessage("Username must be between 3 and 12 characters long."),
		body("email").isEmail().withMessage("Email must be valid"),
		body("password")
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage("Password must be between 4 and 20 characters long."),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { username, email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw new BadRequestError("Email in use");
		}

		const user = User.build({ username, email, password });
		await user.save();

		// Generate json web token
		const userJwt = jwt.sign(
			{
				id: user.id,
				username: user.username,
				email: user.email,
			},
			process.env.JWT_KEY!
		);

		// Store it in our session object
		req.session = {
			jwt: userJwt,
		};

		res.status(201).send(user);
	}
);

export { router as signupRouter };
