import type VideoResponse from "../types/VideoResponseType";

export async function fetchVideos(page: number, limit: number): Promise<VideoResponse>{
        const response = await fetch(import.meta.env.VITE_SERVER_URL + `/videos?page=${page}&limit=${limit}`);
        const data = await response.json()
    if(!response.ok) throw new Error(data.message)
        return data
}