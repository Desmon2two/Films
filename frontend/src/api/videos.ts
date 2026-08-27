import type VideoResponse from "../types/VideoResponseType";
import type Video from "../types/VideoType";

export async function fetchVideos(page: number, limit: number): Promise<VideoResponse>{
        const response = await fetch(import.meta.env.VITE_SERVER_URL + `/videos?page=${page}&limit=${limit}`);
        const data = await response.json()
    if(!response.ok) throw new Error(data.message)
        return data
}
export async function fetchVideo(id: string): Promise<Video>{
        const response = await fetch(import.meta.env.VITE_SERVER_URL + `/videos/${id}`);
        const data = await response.json()
    if(!response.ok) throw new Error(data.message)
        return data
}