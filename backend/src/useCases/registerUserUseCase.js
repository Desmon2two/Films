import userService from "../userFeature/userService.js";
import passwordService from "../authFeature/passwordService.js";
import authService from "../authFeature/authService.js";

export async function registerUser(email, password) {
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
