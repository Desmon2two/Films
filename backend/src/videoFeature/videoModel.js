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
  const options = context ? { session: context.session } : {};
  return Video.deleteMany({ creatorId: userId }, options);
}
function getVideos(offset, limit) {
  return Video.find().sort({ createdAt: -1 }).skip(offset).limit(limit);
}
function getVideosByTitle(title) {
  const search = new RegExp(RegExp.escape(title), "i")
  return Video.find({title: search}).sort({ createdAt: -1 });
}
function getVideosByTitleWords(wordsArray) {
  const searchArr = wordsArray.map((el)=>{
    return {title: new RegExp(RegExp.escape(el), "i")}
  })
  return Video.find({$or: searchArr}).sort({ createdAt: -1 });
}
function countVideos() {
  return Video.countDocuments();
}

export default {
  post,
  get,
  getVideos,
  getVideosByTitle,
  getVideosByTitleWords,
  countVideos,
  deleteVideo,
  deleteByUser,
};
