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

function post({ title, description, year }, creatorId) {
  return Video.create({
    creatorId,
    title,
    description,
    year,
  });
}
function get(videoId) {
  return Video.findById(videoId);
}
function deleteVideo(videoId) {
  return Video.deleteOne({ _id: videoId });
}
function deleteByUser(userId, context) {
  const options = context ? {session: context.session} : {}
	return Video.deleteMany({ creatorId: userId }, options);
}
function getVideos(offset, limit) {
  return Video.find().sort({ createdAt: -1 }).skip(offset).limit(limit);
}
function countVideos() {
  return Video.countDocuments();
}

export default { post, get, getVideos, countVideos, deleteVideo, deleteByUser };
