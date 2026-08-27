import { useState } from "react";
import VideoCard from "./VideoCard";
import { fetchVideos } from "../api/videos";
import PaginationNavigation from "./PaginationNavigation";
import { useNavigate } from "react-router-dom";
import type VideoResponse from "../types/VideoResponseType";
import useRequest from "../hooks/useRequest";

export default function VideoGrid() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);

  const navigate = useNavigate();
  function handleClick(id: string) {
    navigate(`/videos/${id}`);
  }
  const requestState = useRequest<VideoResponse>(
    () => fetchVideos(page, limit),
    [page, limit],
  );

  if (requestState.status === "loading")
    return (
      <>
        <p>Videos will be here soon</p>
      </>
    );
  if (requestState.status === "success")
    return (
      <div className="videoGrid">
        <p>Set how many videos should display on one screen</p>
        <input
          type="text"
          value={limit}
          onChange={(element) => {
            const val = Number(element.target.value);
            if (Number.isNaN(val)) throw new Error("Invalid input");
            setLimit(val);
          }}
        />
        {requestState.data.videos.map((video) => (
          <VideoCard
            {...video}
            key={video.id}
            onAction={() => handleClick(video.id)}
          />
        ))}
        <PaginationNavigation
          page={requestState.data.pagination.page}
          totalPages={requestState.data.pagination.totalPages}
          onNext={() => setPage((previous) => previous + 1)}
          onPrevious={() => setPage((previous) => previous - 1)}
        />
      </div>
    );
  if (requestState.status === "failure")
    return (
      <>
        <p>{requestState.error.message}</p>
      </>
    );
}
