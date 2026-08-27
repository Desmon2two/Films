import { useParams } from "react-router-dom";
import type Video from "../types/VideoType";
import { fetchVideo } from "../api/videos";
import useRequest from "../hooks/useRequest";

export default function VideoPage() {
  const { id } = useParams();

  const requestState = useRequest<Video>(() => {
    if (!id || typeof id !== "string") throw new Error("Video id invalid");
    return fetchVideo(id);
  }, [id]);

  if (requestState.status === "failure")
    return (
      <>
        <p>{requestState.error.message}</p>
      </>
    );
  if (requestState.status === "loading")
    return (
      <>
        <h1>Video is loading</h1>
      </>
    );
  if (requestState.status === "success")
    return (
      <section>
        <h1>
          The video with title {requestState.data.title} and description{" "}
          {requestState.data.description} of year {requestState.data.year}
        </h1>
      </section>
    );
}
