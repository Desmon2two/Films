import type VideoResponse from "../types/VideoResponseType";

export async function fetchVideos(url: string): Promise<VideoResponse>{
        const response = await fetch(url);
        const data = await response.json()
    if(!response.ok) throw new Error(data.message)
        return data
}