const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { cloudinary } = require("./utils/cloudinary");

require("./db/conn");


app.use(cookieParser());

app.use(require("./router/auth"));

// app.get("/", (req, res) => {
// 	res.send("HELLO THERE");
// });

// const middleware = (req, res, next) => {
// 	console.log("hello middle");
// 	next();
// };

app.get("/createv", (req, res) => {
	res.send("CREATE EVENT");
});

app.get("/event", (req, res) => {
	res.send("EVENTS:");
});

app.listen(2000, () => {
	console.log("server is running");
});

app.use(express.static("public"));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

let imageurl = "";

app.post("/image", async (req, res) => {
	try {
		const fileStr = req.body.data;
		const uploadResponse = await cloudinary.uploader.upload(fileStr, {
			upload_preset: "eventimages",
		});
		imageurl = uploadResponse.url;
		res.send(imageurl);
		console.log(imageurl);
	} catch (err) {
		console.error(err);
	}
});
app.get("/image", (req, res) => res.send({ imageurl }));



