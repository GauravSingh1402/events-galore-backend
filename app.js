const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

require("./db/conn");

const app = express();

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;

app.use(express.json());

app.use(require("./router/auth"));

app.get("/", (req, res) => {
	res.send("HELLO THERE");
});

const middleware = (req, res, next) => {
	console.log("hello middle");
	next();
};

app.get("/signup", (req, res) => {
	res.send("JOIN THE GALACTIC EMPIRE");
});

app.get("/about", middleware, (req, res) => {
	res.send("DARTH SIDIOUS AND LORD VADER");
});

app.listen(PORT, () => {
	console.log("server is running");
});
