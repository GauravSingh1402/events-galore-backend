const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("HELLO THERE from auth");
});

router.post("/signup", (req, res) => {
	console.log(req.body);
	res.json({ message: req.body });
});

module.exports = router;
