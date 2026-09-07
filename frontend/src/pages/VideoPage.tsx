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
      <section className="video-page">
        <img
          src=""
          className="video-page__thumbnail"
        >
          {requestState.data.coverURL}
        </img>
        <div className="video-page__content">
          <h1 className="video-page__title">{requestState.data.title}</h1>
          <p className="video-page__description">
            {requestState.data.description}
          </p>
          <p className="video-page__year">{requestState.data.year}</p>
        </div>
      </section>
    );
}
