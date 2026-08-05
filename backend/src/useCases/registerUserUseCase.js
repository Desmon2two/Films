import userService from "../services/userService.js";
import passwordService from "../services/passwordService.js";

export async function registerUser(email, password) {
  const exists = await userService.findByEmail(email);
  if (exists) throw new Error("User already exists");
  const hashedPassword = await passwordService.hashPassword(password)
  const user = await userService.createUser(email, hashedPassword);
  return {
        id: user._id,
        email: user.email
    }
}

// import videoService from "../videos.feature/videoService";

// async function getVideoByIdUseCase({data, user}) {
//     const {filmId} = data;
//   const video = await videoService.getById(filmId);
//   if (!video) {
//     throw new Error("Video not found");
//   }
//   const accessResult = await accessService.checkAccess(user, video);

//   if (!accessResult.allowed) {
//     throw new Error("Access denied");
//   }

//   return video;
// }

// async function createVideoUseCase({data, user}) {
//     // Validation
//     if (!data.title || !data.description) throw new ValidationError("Missing required fields");

// // Authentication

// if (!user) throw new ForbiddenError("Not authenticated");

//   const accessResult = await accessService.checkCreateAccess(user);
//   if (!accessResult.allowed) throw new Error("Access denied");
//   const video = await videoService.create({
//     ...data,
// ownerId: user.id
// });
//   return video;
// };

// export default {getVideoByIdUseCase, createVideoUseCase}
