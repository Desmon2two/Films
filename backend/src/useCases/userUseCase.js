import userService from "../userFeature/userService.js";
import passwordService from "../authFeature/passwordService.js";
import authService from "../authFeature/authService.js";
import atomicTransaction from "../infrastructure/database/mongoDB/atomicTransaction.js";
import videoService from "../videoFeature/videoService.js";
import { NotFoundError } from "../errors/notFoundError.js";
import { ForbiddenError } from "../errors/forbiddenError.js";
import { UnauthorizedError } from "../errors/unauthorizedError.js";

async function registerUser(email, password) {
  const exists = await userService.findByEmail(email);
  if (exists) throw new ForbiddenError("User already exists");
  const hashedPassword = await passwordService.hashPassword(password);
  const user = await userService.createUser(email, hashedPassword);
  const accessToken = await authService.generateAccessToken(user._id);
  return {
    user: {
      id: user._id,
      email: user.email,
    },
    accessToken,
  };
}
async function loginUser(email, password) {
	const user = await userService.findByEmail(email);
	if (!user) throw new UnauthorizedError("Wrong email");
  const isPasswordCorrect = await passwordService.checkPassword(password, user.password);
  if(!isPasswordCorrect) throw new UnauthorizedError("Wrong password");
  const accessToken = await authService.generateAccessToken(user._id)
  const refreshToken = await authService.generateRefreshToken(user._id)
	return {
		user: {
			id: user._id,
			email: user.email,
		},
		accessToken,
    refreshToken
	};
}
async function refreshToken(token){
  const payload = await authService.verifyRefreshToken(token);
  	const user = await userService.findById(payload.userId);
		if (!user) throw new UnauthorizedError("User does not exists");
  const accessToken = await authService.generateAccessToken(user.id)
  return {accessToken}
}
async function deleteUser(userId){
  const user = await userService.findById(userId)
if (user === null) throw new NotFoundError("User not found");
  return atomicTransaction.execute( async (context)=>{
    await userService.deleteById(userId, context);
    await videoService.deleteByUser(userId, context);
  })
}

export default { registerUser, deleteUser, loginUser, refreshToken };