import { useEffect, useState } from "react";
import type Video from "../types/VideoType";
import VideoCard from "./VideoCard";
import { fetchVideos } from "../api/videos";
import PaginationNavigation from "./PaginationNavigation";
import type { RequestStateType } from "../types/RequestStateType";

function normalizeError(error:unknown):Error{
  if(error instanceof Error) return error
  return new Error(String(error))
}

export default function VideoGrid() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [requestState, setRequestState] = useState<RequestStateType>({status: "loading"});
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    async function loadVideos() {
      try {
      setRequestState({status: "loading"});
        const result = await fetchVideos(page, limit);
        setVideos(result.videos);
        setTotalPages(result.pagination.totalPages);
        setRequestState({status: "success"});
      } catch (error) {
        setRequestState({status: "failure", error: normalizeError(error)});
      }
    }
    loadVideos();
  }, [page, limit]);

  if (requestState.status === "loading")
    return (
      <>
        <p>Videos will be here soon</p>
      </>
    );
  if (requestState.status === "success")
    return (
      <div className="videoGrid">
        <input type="text" value="20" placeholder="Set the current limit" onChange={element => setLimit(element.target.value)} />
        {videos.map((video) => (
          <VideoCard
            {...video}
            key={video.id}
          />
        ))}
        <PaginationNavigation
          page={page}
          totalPages={totalPages}
          onNext={() => setPage(page + 1)}
          onPrevious={() => setPage(page - 1)}
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
