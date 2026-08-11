import userService from "../userFeature/userService.js";
import passwordService from "../authFeature/passwordService.js";
import authService from "../authFeature/authService.js";
import atomicTransaction from "../infrastructure/database/mongoDB/atomicTransaction.js";
import videoService from "../videoFeature/videoService.js";
import { NotFoundError } from "../errors/notFoundError.js";

async function registerUser(email, password) {
  const exists = await userService.findByEmail(email);
  if (exists) throw new Error("User already exists");
  const hashedPassword = await passwordService.hashPassword(password);
  const user = await userService.createUser(email, hashedPassword);
  const token = await authService.generateToken(user._id);
  return {
    user: {
      id: user._id,
      email: user.email,
    },
    token,
  };
}
async function deleteUser(userId){
  const user = await userService.findById(userId)
if (user === null) throw new NotFoundError("User not found");
  return atomicTransaction.execute( async (context)=>{
    await userService.deleteById(userId, context);
    await videoService.deleteByUser(userId, context);
  })
}

export default {registerUser, deleteUser}