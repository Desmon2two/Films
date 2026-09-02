import type { VideoListProps } from "../types/VideoListPropsType";
import VideoCard from "./VideoCard";

export default function VideoList({ videos, onVideoClick }: VideoListProps) {
  return (
    <div className="videoGrid">
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
