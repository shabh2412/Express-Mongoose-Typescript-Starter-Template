import express from "express";
import { config } from "../config/config";
import mongoose from "mongoose";

const port: number = config.env.dev.port;
const dbConfig = config.env.dev.dbConfig;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile(`${process.cwd()}/public/index.html`);
});

mongoose
	.connect(dbConfig.url)
	.then(() => {
		app.listen(port, () => {
			console.log(
				`DB Connected to: ${dbConfig.url} \nServer running on port: ${port}`
			);
		});
	})
	.catch((err) => {
		console.log(err);
	});
