import { useEffect, useState } from "react";
import type Video from "../types/VideoType";
import VideoCard from "./VideoCard";

export default function VideoGrid() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVideos() {
      try {
        setStatus("loading");
        const result = await fetchVideos("/videos");
        setVideos(result);
        setStatus("success");
      } catch (error: any) {
        setError(error);
        setStatus("failure");
      }
    }
    loadVideos();
  }, []);

  if (status === "loading")
    return (
      <>
        <p>Videos will be here soon</p>
      </>
    );
  if (status === "success")
    return (
      <div className="videoGrid">
        {videos.map((video) => (
          <VideoCard
            {...video}
            key={video.id}
          />
        ))}
      </div>
    );
  if (error) return <>{error}</>;
}
