import useRequest from "../hooks/useRequest";
import VideoGrid from "../components/VideoGrid";
import type Video from "../types/VideoType";
import { fetchVideosByUser } from "../api/videos";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function ProfilePage() {
  const { state } = useAuth();

  const userId = state.status === "loggedIn" ? state.user.id : null;
  const videoRequestState = useRequest<Video[]>(
    () => fetchVideosByUser(userId!),
    [userId],
    userId !== null,
  );

  const navigate = useNavigate();
  function handleClick(id: string) {
    navigate(`/videos/${id}`);
  }

  if (state.status === "unknown") return <p>Loading...</p>;
  if (state.status === "loggedOut") return <>User is not logged in</>;
  if (state.status === "loggedIn")
    return (
      <section className="profile">
        <div className="profile__about-me">
          <h1>Profile page</h1>
          <img
          className="profile__profile-pic"
            src={state.user.profilePicture ? state.user.profilePicture : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg"}
            alt="user profile picture"
          />
          <p className="profile__email">Email: {state.user.email}</p>
          <p className="profile__username">Username: {state.user.username}</p>
          <p className="profile__displayName">
            Display name: {state.user.displayName}
          </p>
          <p className="profile__bio">Bio: {state.user.bio}</p>
        </div>
        <Link
          className="profile__change link"
          to="/settings/change-user-data-page"
        >
          Change profile details
        </Link>

        <Link
          className="link"
          to="/creator-controls"
        >
          Creator controls
        </Link>
        {videoRequestState.status === "loading" && <p>Videos are loading...</p>}
        {videoRequestState.status === "success" &&
          (videoRequestState.data.length === 0 ? (
            <p>No videos yet.</p>
          ) : (
            <div className="profile__videos">
              <VideoGrid
                videos={videoRequestState.data}
                onVideoClick={handleClick}
              />
            </div>
          ))}
        {videoRequestState.status === "failure" && (
          <p>Something went wrong, try again later.</p>
        )}
      </section>
    );
}
