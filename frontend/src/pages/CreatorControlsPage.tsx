import { useState } from "react";
import { deleteVideo, fetchVideosByUser, uploadVideo } from "../api/videos";
import useAuth from "../auth/useAuth";
import useRequest from "../hooks/useRequest";
import VideoGrid from "../components/VideoGrid";
import type { isVideoSelected } from "../types/isVideoSelectedType";
import type { RequestState } from "../types/RequestStateType";
import normalizeError from "../utils/normalizeError";
import type { CreateVideoForm } from "../types/CreateVideoFormType";
import type Video from "../types/VideoType";

export default function CreatorControlsPage() {
  const [videoData, setVideoData] = useState<CreateVideoForm>({
    title: "",
    description: "",
    year: "",
    coverURL: "",
  });
  const [isSelected, setIsSelected] = useState<isVideoSelected>({
    status: false,
  });
  const [deletionStatus, setDeletionStatus] = useState<RequestState<void>>({
    status: "idle",
  });
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<RequestState<Video>>({
    status: "idle",
  });
  const { state } = useAuth();
  const videosState = useRequest(
    () => fetchVideosByUser(state.user.id),
    [deletionStatus, uploadStatus, state.status],
    state.status === "loggedIn" ||
      deletionStatus.status === "success" ||
      uploadStatus.status === "success",
  );
  async function handleDelete() {
    if (isSelected.status === false) {
      return;
    }
    setDeleteConfirm(false);
    setDeletionStatus({ status: "loading" });
    if (isSelected.status === true) {
      try {
        const result = await deleteVideo(isSelected.videoId);
        setDeletionStatus({ status: "success", data: result });
      } catch (error) {
        setDeletionStatus({ status: "failure", error: normalizeError(error) });
      }
    }
  }
  function handleSelection(id: string) {
    if (isSelected.status === true && isSelected.videoId === id) {
      setIsSelected({ status: false });
    } else {
      setIsSelected({ status: true, videoId: id });
    }
  }
  async function handleUpload(event) {
    event.preventDefault();
    try {
      setUploadStatus({ status: "loading" });
      const result = await uploadVideo(videoData);
      setUploadStatus({ status: "success", data: result });
    } catch (error) {
      setUploadStatus({ status: "failure", error: normalizeError(error) });
    }
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setVideoData((prev) => ({ ...prev, [name]: value }));
  }
  if (videosState.status === "loading") return <p>Loading</p>;
  if (videosState.status === "failure")
    return <p>Something went wrong, try again later</p>;
  if (videosState.status === "success")
    return (
      <div className="controls-page">
        <div className="controls-page__controls">
          <form
            className="controls-page__upload"
            onSubmit={handleUpload}
          >
            <p>Upload video</p>
            <input
              type="text"
              name="coverURL"
              value={videoData.coverURL}
              placeholder="Write coverURL of the video here"
              className="upload__coverURL-input"
              onChange={handleChange}
            />
            <input
              type="text"
              name="title"
              value={videoData.title}
              placeholder="Write title of the video here"
              className="upload__title-input"
              onChange={handleChange}
            />
            <input
              type="text"
              name="description"
              value={videoData.description}
              placeholder="Write description of the video here"
              className="upload__description-input"
              onChange={handleChange}
            />
            <input
              type="text"
              name="year"
              value={videoData.year}
              placeholder="Write year of the video here"
              className="upload__year-input"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="upload__submit button"
            >
              Upload
            </button>
            {uploadStatus.status === "failure" && (
              <p className="upload__error-msg error-msg">
                {String(uploadStatus.error)}
              </p>
            )}
            {uploadStatus.status === "loading" && <p>Uploading...</p>}
            {uploadStatus.status === "success" && <p>Successfully uploaded</p>}
            {uploadStatus.status === "idle" && <></>}
          </form>
          <div className="control-page__delete">
            <p>Delete video</p>
            <button
              className="delete__submit button"
              disabled={isSelected.status === false}
              onClick={() => setDeleteConfirm(true)}
            >
              Delete
            </button>
            <div
              className="controls-page__delete-confirm"
              style={{ display: !deleteConfirm ? 'none' : 'block' }}
            >
              <p className="delete-confirm__warning">
                Are you sure you want to delete?
              </p>
              <div className="delete-confirm__controls">
                <button
                  className=" delete-confirm__left button"
                  onClick={handleDelete}
                >
                  Yes
                </button>
                <button
                  className="delete-confirm__right button"
                  onClick={() => setDeleteConfirm(false)}
                >
                  No
                </button>
              </div>
            </div>
            {deletionStatus.status === "success" && (
              <p>Video deleted successfully</p>
            )}
            {deletionStatus.status === "failure" && (
              <p className="delete__error-msg error-msg">
                Something went wrong and video was not deleted
              </p>
            )}
          </div>
        </div>
        <VideoGrid
          videos={videosState.data}
          onVideoClick={handleSelection}
          selectedVideoId={
            isSelected.status === true ? isSelected.videoId : null
          }
        ></VideoGrid>
      </div>
    );
}
