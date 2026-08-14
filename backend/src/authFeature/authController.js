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
		const result = await userUseCase.refreshToken(token);
		res.status(200).json(result);
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
async function getCurrentUser(req, res, next) {
	try {
		const { userId } = req.user;
		const result = await userUseCase.getCurrentUser(userId);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
}
async function patchUser(req, res, next) {
	try {
		const { userId } = req.user;
		const userData = req.body;
		const result = await userUseCase.patchUser(userId, userData);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
}
async function patchUserPassword(req, res, next) {
	try {
		const { userId } = req.user;
		const { currentPassword, newPassword } = req.body;
		await userUseCase.patchUserPassword(userId, currentPassword, newPassword);
		res.status(200).json({ message: "Password changed" });
	} catch (error) {
		next(error);
	}
}
async function patchUserEmail(req, res, next) {
	try {
		const { userId } = req.user;
		const { newEmail, password } = req.body;
		await userUseCase.patchUserEmail(userId, password, newEmail);
		res.status(200).json({ message: "Email changed" });
	} catch (error) {
		next(error);
	}
}

export default {
	registerUser,
	deleteUser,
	loginUser,
	refreshToken,
	getCurrentUser,
	patchUser,
	patchUserPassword,
	patchUserEmail,
};
