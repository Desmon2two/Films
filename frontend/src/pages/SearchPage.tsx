import { useNavigate, useSearchParams } from "react-router-dom";
import PageSkeleton from "./PageSkeleton";
import searchVideos from "../api/searchVideos";
import VideoList from "../components/VideoList";
import useRequest from "../hooks/useRequest";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const navigate = useNavigate();

  const requestState = useRequest(() => searchVideos(query ?? ""), [query]);

  if (requestState.status === "loading") return <PageSkeleton />;
  if (requestState.status === "failure")
    return <>{requestState.error && <p>{requestState.error.message}</p>}</>;
  if (requestState.status === "success") {
    return (
      <>
        <VideoList
          videos={requestState.data}
          onVideoClick={(id) => navigate(`/videos/${id}`)}
        />
      </>
    );
  }
}
