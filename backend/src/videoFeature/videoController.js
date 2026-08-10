import videoUseCase from "../useCases/videoUseCase.js";

async function postVideo(req, res, next) {
	try {
		const { userId } = req.user;
		const { title, description, year } = req.body;
		const result = await videoUseCase.createVideo(
			{ title, description, year },
			userId,
		);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
}
async function getVideo(req, res, next) {
	try {
		const videoId = req.params.id;
		const result = await videoUseCase.getVideo(videoId);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
}
async function showVideos(req, res, next) {
	try {
		const { page, limit } = req.query;
		const result = await videoUseCase.showVideos(page, limit);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
}

export default {
	postVideo,
	getVideo,
	showVideos,
};
