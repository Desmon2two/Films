import videoModel from "./videoModel.js"

async function create(videoData, userId){
    const video = await videoModel.post(videoData, userId);
    return video
}

export default {create}