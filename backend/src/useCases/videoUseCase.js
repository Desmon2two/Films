import userService from "../userFeature/userService.js";
import { validateVideoId } from "../utility/validateId.js";
import videoService from "../videoFeature/videoService.js";
import { NotFoundError } from "../errors/notFoundError.js";
import { ValidationError } from "../errors/validationError.js";

async function createVideo(videoData, userId) {
	const user = await userService.findById(userId);
	if (!user) throw new NotFoundError("User not found");

	// if (user.status !== "active") throw new Error("User cannot create videos");

	const video = await videoService.create(videoData, userId);
	return video;
}
async function getVideo(videoId) {
	const isValid = validateVideoId(videoId);
	if (!isValid) throw new ValidationError("Wrong video id");
	const video = await videoService.get(videoId);
	if (!video) throw new NotFoundError("Requested video does not exist");
	return video;
}
async function showVideos(page, limit) {
	if (page === undefined) page = 1;
	if (limit === undefined) limit = 20;
	page = Number(page);
	limit = Number(limit);
	if (!Number.isInteger(page) || !Number.isInteger(limit))
		throw new ValidationError("Invalid request");
	if (page < 1 || limit < 1 || limit > 100)
		throw new ValidationError("Invalid request");
	const offset = (page - 1) * limit;
	const [videos, totalVideos] = await Promise.all([
		videoService.showVideos(offset, limit),
		videoService.countVideos(),
	]);
	const totalPages = Math.ceil(totalVideos / limit);
	const result = {
		videos,
		pagination: {
			page,
			limit,
			totalVideos,
			totalPages,
		},
	};
	return result;
}

export default {
	createVideo,
	getVideo,
	showVideos,
};
