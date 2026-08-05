import videoUseCase from "../useCases/videoUseCase.js";

async function postVideo(req, res, next) {
  try {
    const { userId } = req.user;
    const {title, description, year} = req.body;
    const result = await videoUseCase.createVideo({title, description, year}, userId);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export default { postVideo };
