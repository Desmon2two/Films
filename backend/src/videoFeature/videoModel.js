import mongoose from "mongoose";
const videoSchema = new mongoose.Schema(
	{
		creatorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		year: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true },
);

const Video = mongoose.model("Video", videoSchema);

async function post({ title, description, year }, creatorId) {
	const newVideo = await Video.create({
		creatorId,
		title,
		description,
		year,
	});
	return newVideo;
}
async function get(videoId) {
	return Video.findById(videoId);
}
async function getVideos(offset, limit) {
	return Video.find().sort({ createdAt: -1 }).skip(offset).limit(limit);
}
async function countVideos() {
	return Video.countDocuments();
}

export default { post, get, getVideos, countVideos };
