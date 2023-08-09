import express from "express";
import { json } from "body-parser";

const app = express();
app.use(json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("App listening on port", PORT);
});