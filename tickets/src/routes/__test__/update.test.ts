import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

const createTicket = () => {
	return request(app).post("/api/tickets").set("Cookie", global.signup()).send({
		title: "Title",
		price: 20,
	});
};

it("Returns a 404 if the provided id does not exist", async () => {
	const id = new mongoose.Types.ObjectId().toHexString();

	await request(app)
		.put(`/api/tickets/${id}`)
		.set("Cookie", global.signup())
		.send({
			title: "Title",
			price: 20,
		})
		.expect(404);
});

it("Returns a 401 if the user is not authenticated", async () => {
	const id = new mongoose.Types.ObjectId().toHexString();

	await request(app).put(`/api/tickets/${id}`).send({}).expect(401);
});

it("Returns a 401 if the user does not own the ticket", async () => {
	const response = await createTicket();

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set("Cookie", global.signup())
		.send({
			title: "Title",
			price: 1000,
		})
		.expect(401);
});

it("Returns a 400 if the user provides an invalid title or price", async () => {
	const cookie = global.signup();
	const response = await request(app)
		.post("/api/tickets")
		.set("Cookie", cookie)
		.send({
			title: "Title",
			price: 20,
		});

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set("Cookie", cookie)
		.send({
			title: "",
			price: 20,
		})
		.expect(400);

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set("Cookie", cookie)
		.send({
			title: "Title",
			price: -10,
		})
		.expect(400);
});

it("Updates the ticket if provided valid inputs", async () => {
	const cookie = global.signup();
	const response = await request(app)
		.post("/api/tickets")
		.set("Cookie", cookie)
		.send({
			title: "Title",
			price: 20,
		});

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set("Cookie", cookie)
		.send({
			title: "New title",
			price: 20,
		})
		.expect(200);

	const ticketResponse = await request(app)
		.get(`/api/tickets/${response.body.id}`)
		.send();

	expect(ticketResponse.body.title).toEqual("New title");
	expect(ticketResponse.body.price).toEqual(20);
});
