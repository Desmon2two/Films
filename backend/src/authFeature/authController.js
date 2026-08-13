import userUseCase from "../useCases/userUseCase.js";

async function registerUser(req, res, next) {
	try {
		const { email, password } = req.body;
		const result = await userUseCase.registerUser(email, password);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
}
async function loginUser(req, res, next) {
	try {
		const { email, password } = req.body;
		const result = await userUseCase.loginUser(email, password);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
}
async function refreshToken(req, res, next) {
	try {
		const { token } = req.body;
		const result = await userUseCase.refreshToken(token)
		res.status(200).json(result)
	} catch (error) {
		next(error);
	}
}
async function deleteUser(req, res, next) {
	try {
		const { userId } = req.user;
		await userUseCase.deleteUser(userId);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
}

export default { registerUser, deleteUser, loginUser, refreshToken };
