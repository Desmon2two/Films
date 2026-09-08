import { ApiError } from "../types/ApiErrorType";
import type { CreateVideoForm } from "../types/CreateVideoFormType";
import type VideoResponse from "../types/VideoResponseType";
import type Video from "../types/VideoType";

export async function fetchVideosByUser(id: string): Promise<Video[]> {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + `/videos/byUser/${id}`,
  );
  const data = await response.json();
  if (!response.ok) throw new ApiError(response.status, data.message);
  return data.videos;
}
export async function fetchVideos(
  page: number,
  limit: number,
): Promise<VideoResponse> {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + `/videos?page=${page}&limit=${limit}`,
  );
  const data = await response.json();
  if (!response.ok) throw new ApiError(response.status, data.message);
  return data;
}
export async function fetchVideo(id: string): Promise<Video> {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + `/videos/${id}`,
  );
  const data = await response.json();
  if (!response.ok) throw new ApiError(response.status, data.message);

  return data;
}

export async function uploadVideo({
  title,
  description,
  year,
  coverURL,
}: CreateVideoForm): Promise<Video> {
  const response = await fetch(import.meta.env.VITE_SERVER_URL + `/videos`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ title, description, year, coverURL }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) throw new ApiError(response.status, data.message);

  return data;
}
export async function deleteVideo(id: string): Promise<void> {
  await fetch(import.meta.env.VITE_SERVER_URL + `/videos/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
}
