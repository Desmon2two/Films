import { useState } from "react";
import VideoGrid from "../components/VideoGrid";
import PaginationNavigation from "../components/PaginationNavigation";
import useRequest from "../hooks/useRequest";
import { fetchVideos } from "../api/videos";
import type VideoResponse from "../types/VideoResponseType";
import { Filter } from "../components/Filter";
import { useNavigate } from "react-router-dom";
export default function MainPage() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);

  const requestState = useRequest<VideoResponse>(
    () => fetchVideos(page, limit),
    [page, limit],
  );

const navigate = useNavigate();
  function handleClick(id: string) {
    navigate(`/videos/${id}`);
  }
  if (requestState.status === "loading")
    return (
      <>
        <p>Videos will be here soon</p>
      </>
    );
  if (requestState.status === "failure")
    return (
      <>
        <p>{requestState.error.message}</p>
      </>
    );
  if (requestState.status === "success")
    return (
      <main className="main-page">
        <Filter
          limit={limit}
          setLimit={setLimit}
        />
        <VideoGrid
          videos={requestState.data.videos}
          onVideoClick={handleClick}
        />
        <PaginationNavigation
          page={requestState.data.pagination.page}
          totalPages={requestState.data.pagination.totalPages}
          onNext={() => setPage((previous) => previous + 1)}
          onPrevious={() => setPage((previous) => previous - 1)}
        />
      </main>
    );
}
