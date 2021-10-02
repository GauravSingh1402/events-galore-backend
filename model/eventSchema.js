const mongooose = require(mongoose);

const eventSchema = new mongooose.Schema({
	title: {
		type: "String",
		required: true,
	},
	image: {
		data: Buffer,
		contentType: String,
	},
	description: { type: String, required: true },
	cost: { type: String },
	venue: { type: String },
	eventspeaker: { type: Array, required: true },
	contact: { type: String, required: true },
	tags: {
		type: Array,
	},
	ispaid: { type: Boolean, required: true },
	isoffline: { type: Boolean, required: true },
	isfeatured: { type: Boolean, required: true },
	date: { type: Date, required: true },
	time: { type: String, required: true },
});

const Event = mongooose.model("EVENT", eventSchema);

module.exports = Event;
