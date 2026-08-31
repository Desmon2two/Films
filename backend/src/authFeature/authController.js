import userUseCase from "../useCases/userUseCase.js";

async function registerUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await userUseCase.registerUser(email, password);
	res.cookie("accessToken", result.accessToken, {httpOnly: true})
    res.status(201).json({user: result.user});
  } catch (error) {
    next(error);
  }
}
async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await userUseCase.loginUser(email, password);
    res.cookie("accessToken", result.accessToken, {httpOnly: true});
    res.cookie("refreshToken", result.refreshToken, {httpOnly: true});
    res.status(200).json({user: result.user});
  } catch (error) {
    next(error);
  }
}
async function logoutUser(req, res, next) {
  try {
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
async function refreshToken(req, res, next) {
  try {
    const { token } = req.body;
    const result = await userUseCase.refreshToken(token);
	res.cookie("accessToken", result.accessToken, {httpOnly: true})
    res.status(200).send();
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
    const { email, password } = req.body;
    await userUseCase.patchUserEmail(userId, password, email);
    res.status(200).json({ message: "Email changed" });
  } catch (error) {
    next(error);
  }
}

export default {
  registerUser,
  deleteUser,
  loginUser,
  logoutUser,
  refreshToken,
  getCurrentUser,
  patchUser,
  patchUserPassword,
  patchUserEmail,
};
