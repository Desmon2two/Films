import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import normalizeError from "../utils/normalizeError";
import PageSkeleton from "./PageSkeleton";
import searchVideos from "../api/searchVideos";
import type Video from "../types/VideoType";
import type { RequestState } from "../types/RequestStateType";
import VideoList from "../components/VideoList";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [state, setState] = useState<RequestState<Video[]>>({
    status: "loading",
  });
  const navigate = useNavigate();

  useEffect(() => {
    (async function loadSearch() {
      try {
        setState({ status: "loading" });
        const result = await searchVideos(query ?? "");
        setState({ status: "success", data: result });
      } catch (error) {
        setState({ status: "failure", error: normalizeError(error) });
      }
    })();
  }, [query]);

  
  if (state.status === "loading") return <PageSkeleton />;
  if (state.status === "failure")
    return <>{state.error && <p>{state.error.message}</p>}</>;
  if (state.status === "success") {
    return (
      <>
        <VideoList
          videos={state.data}
          onVideoClick={(id) => navigate(`/videos/${id}`)}
        />
      </>
    );
  }
}
