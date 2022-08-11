const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var MongoClient = require("mongodb").MongoClient;
var object = require("mongodb").ObjectId;
const authenticate = require("../middleware/authenticate");
const Razorpay = require('razorpay');
const crypto = require('crypto');
const app = express();
const db =
	"mongodb+srv://eventgalore:eventgalore@cluster0.kz4zp.mongodb.net/events_galore?retryWrites=true&w=majority";
const Event = require("../model/eventSchema");
const User = require("../model/userSchema");
router.get("/", (req, res) => {
	res.send("HELLO THERE from auth");
});


router.post("/payment",async(req,res)=>{
	try{
		const instance = new Razorpay({
			key_id:process.env.KEY_ID,
			key_secret:process.env.KEY_SECRET_KEY,
		});
		const options = {
			amount:req.body.amount*100,
			currency:"INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};
		instance.orders.create(options,(error,order)=> {
			if (error)
			{
				console.log(error);
				return res.status(500).json({message: "Something went Wrong"});
			}
			return res.status(200).json({ data: order });
		});
	}
	catch(error)
	{
		console.log(error);
		res.status(500).json({ message:"Internal Server Error" });
	}
})

router.post("/verify",async(req,res)=>
{
	const{
		razorpay_order_id,
		razorpay_payment_id,
		razorpay_signature
	} = req.body;
	const sign = razorpay_order_id + "|" + razorpay_payment_id;
	const expectedSign = crypto.createHmac("sha256",process.env.KEY_SECRET_KEY).update(sign.toString()).digest("hex");
	if (razorpay_signature === expectedSign)
	{
		return res.status(200).json("Successfull Payment")
	}
	else
	{
		return res.status(500).json({"message":"Invalid Signature sent"})
	}

})
// router.post("/profile", async (req, res) => {
// 	const { firstname, lastname, username, email, password } = req.body;
// 	console.log(firstname);
// 	res.status(200).send("Success");
// });

router.post("/createv", async (req, res) => {
	const {
		title,
		description,
		image,
		cost,
		venue,
		eventspeaker,
		contact,
		tags,
		ispaid,
		isoffline,
		link,
		isfeatured,
		date,
		time,
		no_of_users,
		username,
	} = req.body;

	// if (!title) {
	// 	return res.status(422).json({ error: "fill the title" });
	// }
	// if (!description) {
	// 	return res.status(422).json({ error: "fill the description" });
	// }
	// if (!eventspeaker) {
	// 	return res.status(422).json({ error: "fill the fields" });
	// }
	// if (!contact) {
	// 	return res.status(422).json({ error: "fill the contact" });
	// }
	// if (!tags) {
	// 	console.log("enter tag");
	// }
	// if (!ispaid) {
	// 	console.log("enter paid");
	// }
	// if (!isoffline) {
	// 	console.log("enter offline");
	// }
	// if (!isfeatured) {
	// 	console.log("enter featured");
	// }
	// if (!date) {
	// 	console.log("enter date");
	// }
	// if (!time) {
	// 	console.log("enter time");
	// }
	// if (!username) {
	// 	console.log("enter username");
	// }

	try {
		const cevent = new Event({
			title,
			description,
			image,
			cost,
			venue,
			eventspeaker,
			contact,
			tags,
			ispaid,
			isoffline,
			isfeatured,
			link,
			date,
			time,
			no_of_users,
			username,
		});
		cevent
			.save()
			.then(() => {
				console.log("ZA WARUDO");
				return res.status(200).json({ Success: "Event Created" });
			})
			.catch((err) => {
				return res.status(400).json({ Error: "Error creating event" });
			});
	} catch (error) {
		console.log(error);
		return res.status(400).json({ Error: "Error creating event" });
	}
});

router.get("/createv", authenticate, (req, res) => {
	res.send(req.rootUser);
});
router.get("/profile", authenticate, (req, res) => {
	res.send(req.rootUser);
});
router.post("/profile", (req, res) => {
	res.send(req.rootUser);
});

router.get("/logout", authenticate, (req, res) => {
	res.clearCookie("jwtoken", { path: "/" });
	res.status(200).send("User logout");
});

router.get("/event", (req, res) => {
	MongoClient.connect(db, function (err, client) {
		var db = client.db("events_galore");
		if (err) throw err;
		db.collection("events")
			.find({})
			.sort({ no_of_users: -1 })
			.toArray((err, result) => {
				if (err) throw err;
				res.send(result);
			});
	});
});

user = "";

router.post("/userevent", async (req, res) => {
	console.log(req.body);
	const u = req.body;
	user = u.usern;
	console.log(user);
});
router.get("/usrevent", (req, res) => {
	MongoClient.connect(db, function (err, client) {
		console.log("hi", user);
		var db = client.db("events_galore");
		if (err) throw err;
		db.collection("events")
			.find({ username: user })
			.toArray((err, result) => {
				if (err) throw err;
				res.send(result);
			});
	});
});

router.get("/pevent", (req, res) => {
	MongoClient.connect(db, function (err, client) {
		var db = client.db("events_galore");
		if (err) throw err;
		db.collection("events")
			.find({ ispaid: "paid" })
			.toArray((err, result) => {
				if (err) throw err;
				res.send(result);
			});
	});
});

router.get("/fevent", (req, res) => {
	MongoClient.connect(db, function (err, client) {
		var db = client.db("events_galore");
		if (err) throw err;
		db.collection("events")
			.find({ ispaid: "free" })
			.toArray((err, result) => {
				if (err) throw err;
				res.send(result);
			});
	});
});

router.get("/oevent", (req, res) => {
	MongoClient.connect(db, function (err, client) {
		var db = client.db("events_galore");
		if (err) throw err;
		db.collection("events")
			.find({ isoffline: "online" })
			.toArray((err, result) => {
				if (err) throw err;
				res.send(result);
			});
	});
});

router.get("/ofevent", (req, res) => {
	MongoClient.connect(db, function (err, client) {
		var db = client.db("events_galore");
		if (err) throw err;
		db.collection("events")
			.find({ isoffline: "offline" })
			.toArray((err, result) => {
				if (err) throw err;
				res.send(result);
			});
	});
});

router.get("/eventweek", (req, res) => {
	MongoClient.connect(db, function (err, client) {
		var db = client.db("events_galore");
		if (err) throw err;
		db.collection("events")
			.find({})
			.sort({ date: 1 })
			.toArray((err, result) => {
				if (err) throw err;
				res.send(result);
			});
	});
});

router.put("/update", async (req, res) => {
	const register_count = req.body.register_count;
	let eve_id = req.body._id;
	console.log(eve_id);
	console.log(register_count);
	MongoClient.connect(db, function (err, client) {
		if (err) throw err;
		var db = client.db("events_galore");
		var update_id = { _id: object(eve_id) };
		var update_no = { $set: { no_of_users: register_count } };
		db.collection("events").updateOne(
			update_id,
			update_no,
			function (err, res) {
				if (err) throw err;
				console.log("Id", update_id);
				console.log("Updated Count", update_no);
				console.log("1 document updated");
			}
		);
	});
});

router.get("/event", (req, res) => {
	MongoClient.connect(db, function (err, client) {
		var db = client.db("events_galore");
		if (err) throw err;
		db.collection("events")
			.find({})
			.sort({ no_of_users: -1 })
			.toArray((err, result) => {
				if (err) throw err;
				res.send(result);
			});
	});
});

router.get("/eventweek", (req, res) => {
	MongoClient.connect(db, function (err, client) {
		var db = client.db("events_galore");
		if (err) throw err;
		db.collection("events")
			.find({})
			.sort({ date: 1 })
			.toArray((err, result) => {
				if (err) throw err;
				res.send(result);
			});
	});
});

router.get("/bevent", (req, res) => {
	MongoClient.connect(db, function (err, client) {
		var db = client.db("events_galore");
		if (err) throw err;
		db.collection("events")
			.find({ isfeatured: "yes" })
			.toArray((err, result) => {
				if (err) throw err;
				res.send(result);
			});
	});
});

router.post("/register", async (req, res) => {
	const { firstname, lastname, username, email, password } = req.body;
	try {
		const emailExists = await User.findOne({ email: email });
		const usernameExists = await User.findOne({ username: username });
		if (emailExists || usernameExists) {
			throw "Invalid Registration";
		} else {
			const user = new User({ firstname, lastname, username, email, password });
			await user.save();
			res.status(201).json({ message: "User registered successfully" });
		}
	} catch (err) {
		return res.status(422).json({ error: `${err}` });
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		let token;
		const userFound = await User.findOne({ email: email });
		if (userFound) {
			const verifyPassword = await bcrypt.compare(password, userFound.password);
			token = await userFound.generateAuthToken();
			// console.log(token);

			res.cookie("jwtoken", token, {
				expires: new Date(Date.now() + 86400000),
				httpOnly: true,
			});

			if (verifyPassword) {
				return res.status(200).json({ Success: "Login Successful" });
			} else {
				throw "Invalid Credentials";
			}
		} else {
			// return res.status(400).json({ error: "Invalid Credentials" });
			throw "Invalid Credentials";
		}
	} catch (err) {
		return res.status(400).json({ error: `${err}` });
	}
});

module.exports = router;

//new route
//user event
//find events where username=current user
//
