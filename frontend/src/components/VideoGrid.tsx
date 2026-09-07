import type { VideoListProps } from "../types/VideoListPropsType";
import VideoCard from "./VideoCard";

export default function VideoGrid({ videos, onVideoClick }: VideoListProps) {
  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoCard
          {...video}
          key={video.id}
          onAction={() => onVideoClick(video.id)}
        />
      ))}
    </div>
  );
}
