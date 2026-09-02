import { ApiError } from "../types/ApiErrorType";

export default async function searchVideos(query: string) {
    const encodedQuery = encodeURIComponent(query)
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + `/videos/search?q=${encodedQuery}`,
  );
  const data = await response.json();
  if (!response.ok) throw new ApiError(response.status, data.message);
  return data.videos;
}
