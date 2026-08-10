import userService from "../userFeature/userService.js";
import videoService from "../videoFeature/videoService.js";

async function createVideo(videoData, userId) {
  const user = await userService.findById(userId);
  if (!user) throw new Error("User not found");

  // if (user.status !== "active") throw new Error("User cannot create videos");

  const video = await videoService.create(videoData, userId);
  return video;
}
async function getVideo(videoId) {
  const video = await videoService.get(videoId);
  if (!video) throw new Error("Requested video does not exist");
  return video;
}
async function showVideos(page, limit) {
  if (page === undefined) page = 1;
  if (limit === undefined) limit = 20;
  page = Number(page);
  limit = Number(limit);
  if (!Number.isInteger(page) || !Number.isInteger(limit)) throw new Error("Invalid request");
  if (page < 1 || limit < 1 || limit > 100) throw new Error("Invalid request");
  const offset = (page - 1) * limit;
  const videos = await videoService.showVideos(offset, limit);
  return videos;
}

export default { createVideo, getVideo, showVideos };
