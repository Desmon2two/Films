import videoModel from "./videoModel.js";

async function create(videoData, userId) {
	const video = await videoModel.post(videoData, userId);
	return video;
}
async function get(videoId) {
	const video = await videoModel.get(videoId);
	return video;
}
async function showVideos(offset, limit) {
	const videos = await videoModel.getVideos(offset, limit);
	return videos;
}

export default { create, get, showVideos };
