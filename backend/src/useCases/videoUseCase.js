import userService from "../userFeature/userService.js"
import videoService from "../videoFeature/videoService.js"


async function createVideo(videoData, userId){
    const user = await userService.findById(userId);
    if (!user) throw new Error("User not found");

    if (user.status !== "active") throw new Error("User cannot create videos");

    const video = await videoService.create(videoData, userId)
    return video

}

export default {createVideo}